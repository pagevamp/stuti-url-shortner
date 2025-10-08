# url-shortener-stuti

# URL Shortener API

**URL Shortener API** built with [NestJS](https://nestjs.com/) and managed with [pnpm](https://pnpm.io/).
It allows users to shorten long URLs into compact links that redirect to their original destinations.

---

## Features

* Shorten long URLs into compact and shareable links
* Redirect users to the original destination
* Store and manage shortened URLs in a database
* Analyze the user information such as ipAddress, country, browser, device, os and userAgent

---

## Tech Stack

| Category                 | Technology       |
| ------------------------ | ---------------- |
| **Runtime**              | Node.js          |
| **Framework**            | NestJS           |
| **Package Manager**      | pnpm             |
| **Language**             | TypeScript       |
| **Linting & Formatting** | ESLint, Prettier |

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/pagevamp/stuti-url-shortner
cd stuti-url-shortner
```

### 2. Install dependencies

Using **pnpm**:

```bash
pnpm install
```

If you don’t have pnpm installed:

```bash
npm install -g pnpm
```

---

## Configuration

Create a `.env` file in the project root (or copy from `.env.example`) and set up your environment variables:

```bash
PORT=3000
DB_HOST=host
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=database

```

---

## Running the Application

Run the command ```pnpm start``` to run the project 

| Environment     | Command                         | Description                 |
| --------------- | ------------------------------- | --------------------------- |
| **Development** | `pnpm start:dev`                | Start the app in watch mode |
| **Production**  | `pnpm build && pnpm start:prod` | Build and run compiled code |
| **Debug Mode**  | `pnpm start:debug`              | Run with debugging enabled  |

---

## Development Tools

* **Nest CLI:** for scaffolding and building features
* **Prettier:** for consistent code formatting
* **ESLint:** for static code analysis and code style enforcement

---

