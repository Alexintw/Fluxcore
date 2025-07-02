# FluxCore ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-lightgrey)

FluxCore is a scalable Node.js API boilerplate featuring:

* **Express** server framework
* **MongoDB** persistence layer via Mongoose
* **JWT** authentication & role-based access control
* **Request validation** with express-validator
* **Centralized** error & success response handling
* **Structured logging** with Winston & **metrics** via Prometheus
* **Docker** & Docker Compose for containerized development
* **Automated port cleanup** for a smooth dev workflow
* **FastAPI** Python microservice scaffold (see `python_api/`)
* **concurrently**-powered combined Node.js + Python dev environment

---

## Table of Contents

1. [Features](#features)
2. [更新項目](#更新項目)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)

   * [Node.js](#nodejs)
   * [Python (FastAPI)](#python-fastapi)
   * [Combined](#combined)
6. [Environment Variables](#environment-variables)
7. [Scripts](#scripts)
8. [Folder Structure](#folder-structure)
9. [Contributing](#contributing)
10. [License](#license)

---

## Features

* JWT-based register & login endpoints
* Input validation rules and middleware
* Standardized JSON success & error responses
* Global error handler & asyncHandler wrapper
* Winston request/error logging
* Prometheus metrics at `/metrics`
* `kill-port` integration to free port 5000 on `npm run dev`
* Dockerfile & `docker-compose.yml` for multi-container setup
* FastAPI scaffold (`python_api/`) with sample routes & Pydantic models
* Concurrent startup of Node & Python services via `concurrently`

## 更新項目

* **新增** `python_api/` 目錄，內含 FastAPI 範例應用
* **新增** `dev:python`, `dev:node`, 及 `dev` 三支腳本，透過 `concurrently` 同時啟動 Node.js & Python 服務
* **優化** CORS 設定，避免 `CORS_ORIGINS` 未配置時發生 `.split` 錯誤
* **改進**資料庫連線邏輯，僅在成功連線後啟動伺服器，並在失敗時退出
* **補充** 404 處理中間件，統一回傳 `{ message: 'Not Found' }`
* **優化** `predev` 腳本，強化埠口釋放（殺掉 IPv4/IPv6）
* **修正**端口衝突導致的 `EADDRINUSE` 問題

## Prerequisites

* **Node.js** >= 16.x
* **npm** >= 8.x
* **Python** >= 3.8
* **pip**
* **Docker** & **Docker Compose** (for containerized mode)
* A running **MongoDB** instance or URI

## Installation

```bash
# Clone the repo
git clone https://github.com/Alexintw/Fluxcore.git
cd Fluxcore

# Install Node dependencies
npm install

# Install Python dependencies
cd python_api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# Copy .env example and configure
cp .env.example .env
```

## Usage

### Node.js

```bash
# Frees port 5000 then starts Node.js service in dev mode
npm run dev:node
```

### Python (FastAPI)

```bash
# Activate virtualenv if not already active
cd python_api
source venv/bin/activate

# Start FastAPI with hot reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs available at:

* Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* ReDoc: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### Combined

```bash
# Simultaneously start both Node.js & Python services
npm run dev
```

* Node server: [http://127.0.0.1:5000](http://127.0.0.1:5000)
* FastAPI server: [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Environment Variables

Copy `.env.example` to `.env` and set:

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/fluxcore
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
LOG_LEVEL=info
```

## Scripts

| Script               | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `npm run dev:node`   | Kill port 5000 and start Node.js in dev mode           |
| `npm run dev:python` | Kill port 8000 and start FastAPI with hot reload       |
| `npm run dev`        | Start both services concurrently (uses `concurrently`) |
| `npm start`          | Start production Node.js server (`node server.js`)     |
| `npm run predev`     | Kill port 5000 (used by `dev:node`)                    |

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
├── controllers/
├── middleware/
├── models/
├── routes/
├── validators/
├── swagger.js
├── python_api/          # FastAPI 子專案根目錄
│   ├── .env
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── core/
│       ├── db/
│       ├── models/
│       └── api/
└── update.sh            # 更新腳本
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/YourFeature`)
3. Commit your changes (`git commit -m "feat: ..."`)
4. Push to branch (`git push origin feat/YourFeature`)
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/).

## License

This project is licensed under the [MIT License](LICENSE).
