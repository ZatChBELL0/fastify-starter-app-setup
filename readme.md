# Fastify Starter App

A simple and clean starter template for building high-performance Node.js applications using the [Fastify](https://www.fastify.io/) framework. This repository provides a basic project structure to get you up and running quickly.

## Features

- **Fastify Ready:** A lightweight setup for one of the fastest Node.js web frameworks.
- **JavaScript Based:** Written in pure JavaScript (ESM-ready).
- **Structured:** Organized into `routes`, `controllers`, `models`, and `plugins` for clear separation of concerns.
- **Minimalist:** No unnecessary bloat. Add only the packages you need.

---

## Project Structure

The repository is organized to keep concerns separate and maintainable:

```
├── controllers/          # Business logic handlers
│   ├── authController.js     # User authentication & password reset
│   └── thumbnailController.js # Thumbnail CRUD operations
├── models/              # Mongoose data models
│   ├── user.js             # User schema with auth fields
│   └── thumbnail.js        # Thumbnail schema with user reference
├── plugins/             # Custom Fastify plugins
│   ├── mongodb.js          # Database connection decorator
│   └── jwt.js              # JWT authentication decorator
├── routes/              # API route definitions
│   ├── authRoute.js        # /api/auth/* endpoints
│   └── thumbnailRoute.js   # /api/thumbnail/* endpoints (protected)
├── uploads/             # Static file storage
└── server.js            # Main application entry point
```

---

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) (or `yarn` / `pnpm`)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone [https://github.com/ZatChBELL0/fastify-starter-app-setup.git](https://github.com/ZatChBELL0/fastify-starter-app-setup.git)
    cd fastify-starter-app-setup
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **(Optional) Set up environment variables:**
    If your project uses environment variables (e.g., for `PORT` or database credentials), create a `.env` file in the root directory. You can copy the `package.json`'s `PORT` or add your own.

    Example `.env` file:

    ```
    PORT=3000
    HOST=0.0.0.0
    ```

---

## Available Scripts

Based on your `package.json`, here are the scripts you can run:

- **Run the development server (with auto-reload):**
  This command uses `nodemon` to watch for file changes and restart the server automatically.

  ```sh
  npm run dev
  ```

- **Run the production server:**
  This command starts the application using `node`.

  ```sh
  npm start
  ```

- **Run the server using PM2:**
  This command starts the application using `pm2`, a process manager for production environments.
  ```sh
  npm run start:pm2
  ```

## How to Use

1.  **Define a Route:** Add a new file in the `/routes` directory (e.g., `user.js`).
2.  **Create a Controller:** Add the corresponding business logic in the `/controllers` directory.
3.  **Register the Route:** Import and register your new route in `server.js` or a dedicated plugin.

**Example: Adding a root route**

In `/routes/index.js` (if you create it):

```javascript
async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
}

export default routes;
```
