# Fastify Starter App Setup

A clean, minimalist, and production-ready starter template for building high-performance Node.js applications with [Fastify](https://fastify.dev/) and [TypeScript](https://www.typescriptlang.org/). This setup is pre-configured with essential tools for a modern development workflow.

---

## Features

- ⚡ **High-Performance Server:** Built on **Fastify**, one of the fastest Node.js web frameworks available.
- 🔒 **Type-Safe Code:** Full **TypeScript** integration for robust, maintainable, and error-free code.
- ✅ **Testing Ready:** Pre-configured with **Vitest** for incredibly fast and modern unit/integration testing.
- 📜 **Linting & Formatting:** Includes **ESLint** and **Prettier** setups to enforce a consistent code style and catch bugs early.
- 🚀 **Developer Experience:** Comes with **`ts-node-dev`** for automatic server restarts on file changes (hot-reloading).
- 📦 **Modern JS:** Uses **ES Modules** (ESM) syntax (`import`/`export`).
- 🌐 **Environment Variables:** Ready-to-use setup with **`dotenv`** for managing environment variables.

---

## Tech Stack

- **Framework:** [Fastify](https://fastify.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Test Runner:** [Vitest](https://vitest.dev/)
- **Linter:** [ESLint](https://eslint.org/)
- **Formatter:** [Prettier](https://prettier.io/)
- **Dev Server:** [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- **Environment:** [Node.js](https://nodejs.org/)

---

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/ZatChBELL0/fastify-starter-app-setup.git](https://github.com/ZatChBELL0/fastify-starter-app-setup.git)
    cd fastify-starter-app-setup
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. You can copy the example file first.
    ```bash
    cp .env.example .env
    ```
    Now, edit the `.env` file with your specific configuration (like `PORT`).

### Available Scripts

- **Run the development server (with hot-reloading):**

  ```bash
  npm run dev
  ```

- **Build the project for production:**

  ```bash
  npm run build
  ```

- **Run the production build:**

  ```bash
  npm run start
  ```

- **Run tests:**

  ```bash
  npm run test
  ```

- **Check linting:**

  ```bash
  npm run lint
  ```

- **Format code:**
  ```bash
  npm run format
  ```

---

## Project Structure
