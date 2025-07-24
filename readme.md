# 🔌 Power Plant API

A scalable and production-ready Node.js/TypeScript API for publicly available U.S. power plant data (eGRID source). Built with Express, TypeScript, Swagger, and deployable via Docker.

---

## 🔧 Features

- 🔁 Load eGRID Excel from EPA (remote)
- 📊 Filter by state, generation, or top-N
- ✅ RESTful routes + input validation
- 🔐 API key authentication (Bearer token)
- 📄 Complete Swagger docs via `/api/docs`
- 🐳 Dockerfile for containerized deployment

---

## 📦 Install & Run

local development

npm run build
npm run start or npm run dev

deployment

Build docker image and run container:

docker build -t power-plant-api .
docker run -p 3000:3000 power-plant-api

