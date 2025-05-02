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


##API Endpoints (Use Postman to Test)

1. Register a New User
```bash
POST http://localhost:3000/register
```
Body (raw JSON):
```bash
{
  "username": "ayyappan",
  "password": "test123"
}
```
2. Login to Get JWT Token
```bash
POST http://localhost:3000/login
```
Body (raw JSON):
```bash
{
  "username": "ayyappan",
  "password": "test123"
}
```
➡️ Response:
```bash
{
  "token": "<your-jwt-token>"
}
```
3. Use JWT in Authorization Header
```bash
Authorization: Bearer <your-jwt-token>
```

4. Get All Items
```bash
GET http://localhost:3000/items
```

5. Create a New Item
```bash
POST http://localhost:3000/items
```
Body (raw JSON):
```bash
{
  "name": "Laptop",
  "price": 1200
}
```
6. Update an Item
```bash
PUT http://localhost:3000/items/0
```
Body (raw JSON):
```bash
{
  "name": "Laptop Pro",
  "price": 1500
}
```
7. Delete an Item
```bash
DELETE http://localhost:3000/items/0
```


🔒 Rate Limiting
Requests are limited to 100 per 15 minutes per IP

Exceeding the limit returns 429 Too Many Requests


##1. Docker image for Cloud Run’s architecture

```bash
docker build --platform=linux/amd64 -t gcr.io/YOUR_PROJECT_ID/adobe-crud-app .
```

2. Push the updated image to Google Container Registry
```bash
docker push gcr.io/YOUR_PROJECT_ID/adobe-crud-app
```

3. Redeploy to Cloud Run
```bash
gcloud run deploy adobe-crud-app \
  --image gcr.io/YOUR_PROJECT_ID/adobe-crud-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

After that, you should get a live public URL like:
```bash
https://adobe-crud-app-xxxx.a.run.app
```


Also Here I have attached some attachements for reference


My GCP service URL: https://adobe-crud-app-965876148462.us-central1.run.app
