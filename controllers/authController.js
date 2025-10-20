const User = require("../models/user.js");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

exports.register = async (request, reply) => {
  try {
    //validate body
    const { name, email, password, country } = request.body;
    //validate fileds
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ name, email, password: hashedPassword, country });
    await user.save();
    reply.code(201).send({ message: "User registered successfully" });
  } catch (err) {
    reply.send(err);
  }
};

exports.login = async (request, reply) => {
  try {
    //validate body
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return reply.code(404).send({ message: "Invalid email or password" });
    }
    //validate fields

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return reply.code(404).send({ message: "Invalid email or password" });
    }
    const token = request.server.jwt.sign({ id: user._id });
    reply.send({ token });
  } catch (err) {
    reply.send(err);
  }
};

exports.forgotPassword = async (request, reply) => {
  try {
    const { email } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      return reply.notFound("User not found");
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetPasswordExpire;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:${process.env.PORT}/api/auth/reset-password/${resetToken}`;
    reply.send({ resetUrl });
  } catch (err) {
    reply.send(err);
  }
};

exports.resetPassword = async (request, reply) => {
  const resetToken = request.params.token;
  const { newPassword } = request.body;

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });
  if (!user) {
    return reply.badRequest("User not found");
  }

  //hash the password

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  user.resetPasswordExpiry = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  reply.send({ message: "Password reset is successful" });
};

exports.logout = async (request, reply) => {
  //JWT are stateless, use strategy like refresh token or blacklist token or more. frontend logic
  reply.send({ message: "User logged out" });
};
