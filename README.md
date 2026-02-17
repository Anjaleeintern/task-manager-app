<<<<<<< HEAD

=======
# Task Manager App — Scalable Web Application

A full-stack scalable web application with secure authentication and a protected dashboard. Built as part of the Frontend Developer Intern assignment.

---

## 🚀 Live Deployment

Frontend: https://task-manager-app-1-hq23.onrender.com/
Backend API: https://task-manager-app-avc4.onrender.com/ 

GitHub Repository: https://github.com/Anjaleeintern/task-manager-app.git

---

## ✨ Features

### Authentication
- User registration & login
- JWT-based authentication
- Protected dashboard routes
- Secure logout flow

### Dashboard
- User profile display
- Create, read, update, delete tasks
- Tasks grouped by date
- Pending / Completed status
- Search & filter functionality

### Security
- Password hashing using bcrypt
- JWT verification middleware
- User-specific data isolation
- API validation and error handling

### UI/UX
- Responsive design (mobile + desktop)
- Tailwind CSS modern UI
- Smooth transitions and animations

---

## 🧱 Tech Stack

Frontend:
- React.js
- Tailwind CSS
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

Deployment:
- Render (Frontend + Backend)

---

## ⚙️ Installation (Local Setup)

### 1. Clone Repository

git clone https://github.com/Anjaleeintern/task-manager-app.git

cd task-manager-app


### 2. Backend Setup


cd server
npm install


Create `.env`


MONGO_URI=mongodb+srv://anjaleebisen__taskuser:Anjalee%40123@cluster0.tzhk8va.mongodb.net/anjaleebisen__taskuser?retryWrites=true&w=majority
JWT_SECRET=supersecretkey

PORT=5000


Run backend:


npm run dev


### 3. Frontend Setup


cd client
npm install
npm run dev


---

## 📡 API Endpoints

AUTH
POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/profile  

TASKS
GET /api/task  
POST /api/task  
PUT /api/task/:id  
DELETE /api/task/:id  

All task routes require JWT token.

---

## 📈 Production Scaling Strategy

- Stateless JWT authentication
- Cloud database (MongoDB Atlas)
- Modular backend architecture
- Environment-based configuration
- Frontend served via CDN
- API middleware structure
- Horizontal scaling ready
- Microservice migration ready

---

## ✅ Assignment Requirements Covered

✔ React frontend  
✔ Responsive UI  
✔ Authentication system  
✔ Protected dashboard  
✔ CRUD operations  
✔ Database integration  
✔ Secure backend  
✔ Deployment  
✔ API documentation  
✔ Scalable structure  

---

## 👩‍💻 Author

Anjali  
Frontend Developer Intern Candidate
>>>>>>> 08704cd (file added)
