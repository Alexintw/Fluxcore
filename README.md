# FluxCore

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

FluxCore is a scalable Node.js API boilerplate featuring:

* **Express** server framework
* **MongoDB** persistence layer via Mongoose
* **JWT** authentication & role-based access
* **Request validation** with express-validator
* **Centralized** error & success response handling
* **Structured logging** (Winston) & **metrics** (Prometheus)
* **Docker** & Docker Compose for containerized development
* **Automated port cleanup** for a smooth dev workflow

---

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)

   * [Local](#local)
   * [Docker](#docker)
5. [Environment Variables](#environment-variables)
6. [Scripts](#scripts)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

* JWT-based register & login endpoints
* Input validation rules and middleware
* Standardized JSON success & error responses
* Global error handler, asyncHandler wrapper
* Winston request/error logging
* Prometheus metrics at `/metrics`
* `kill-port` integration to free port 5000 on `npm run dev`
* Dockerfile & `docker-compose.yml` for multi-container setup

## Prerequisites

* **Node.js** >= 16.x
* **npm** >= 8.x
* **Docker** & **Docker Compose** (for containerized mode)
* A running **MongoDB** instance or URI

## Installation

```bash
# Clone the repo
git clone https://github.com/YourUserName/fluxcore.git
cd fluxcore

# Install dependencies
npm install

# Copy .env.example to .env and fill in values
cp .env.example .env
```

## Usage

### Local

```bash
# Frees port 5000 then starts in dev mode
npm run dev
```

### Docker

```bash
# Build & start containers
docker compose up --build
```

Access API at `http://localhost:5000` (or mapped host port) and metrics at `/metrics`.

## Environment Variables

Create a `.env` file in project root with:

```ini
PORT=5000
MONGO_URI=mongodb://mongo:27017/fluxcore
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
LOG_LEVEL=info
```

## Scripts

| Script           | Description                                |
| ---------------- | ------------------------------------------ |
| `npm run dev`    | Kill port 5000 (if needed) & start dev     |
| `npm start`      | Start production server (`node server.js`) |
| `npm run predev` | Kill port 5000                             |

## Folder Structure

```text
fluxcore/
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js
├── config/
│   ├── db.js
│   ├── auth.js
│   └── logger.js
├── middleware/
│   ├── auth.js
│   ├── asyncHandler.js
│   ├── errorHandler.js
│   ├── responseHandler.js
│   └── validate.js
├── models/
│   └── User.js
├── routes/
│   ├── auth.js
│   └── users.js
├── controllers/
│   ├── authController.js
│   └── userController.js
└── validators/
    └── userValidator.js
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/YourFeature`)
3. Commit your changes (`git commit -m "feat: add ..."`)
4. Push to branch (`git push origin feat/YourFeature`)
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/).

## License

MIT License

Copyright (c) 2025 Alex Ko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.