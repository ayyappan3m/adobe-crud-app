# Adobe Take-Home Assignment – CRUD Web App (Node.js + Docker + JWT)

This is a containerized web application implementing basic CRUD operations, JWT-based user authentication, and rate limiting. Built using Node.js and Express, and ready for deployment to AWS, Azure, or GCP.

---

## 📁 Project Structure


---

## ⚙️ Prerequisites

- Node.js
- Docker
- Postman (for API testing)
- Cloud CLI tools (optional): gcloud, aws-cli, or Azure CLI

---

## 🚀 Getting Started (Local Development without Docker)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/adobe-crud-app.git
cd adobe-crud-app
```

2. Install dependencies
```bash
npm install
```

3. Create a .env file
```bash
JWT_SECRET=#privatekey
```

4. Run the app locally
```bash
node index.js
```

Server will start on: http://localhost:3000


## Running with Docker

1. Build Docker image
```bash
docker build -t adobe-crud-app .
```

2. Run Docker container
```bash
docker run -p 3000:3000 --env-file .env adobe-crud-app
```
