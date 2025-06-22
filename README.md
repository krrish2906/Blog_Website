# QuickBlog - Blog Website

QuickBlog is a modern blogging platform where users can:
- 📝 Create blog posts with images (stored on ImageKit cloud)
- 🔍 Search and filter published blogs
- 💬 Comment on other users' blogs (with approval system)
- 🤖 Generate blog content using Google Gemini AI

---

## 🚀 Tech Stack

**Frontend**
- ReactJS
- Tailwind CSS
- Quill (rich text editor)
- Moment (date/time formatting)

**Backend**
- Node.js
- Express.js
- MongoDB
- ImageKit (cloud image storage)
- Google Gemini AI (blog generation)
- Multer (file uploads)

---

## 📦 Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/krrish2906/Blog_Website
cd Blog_Website
```

### 2️⃣ Install dependencies
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 3️⃣ Setup environment variables
Create a `.env` file in your `backend/` folder with:
```
MONGODB_URI=your_mongo_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Run the app
```bash
# Start backend server
cd backend
npm run dev

# Start frontend app
cd ../frontend
npm start
```

---

## 🌐 API Overview

### 🔑 **User Routes**

| Method | Endpoint                 | Description                                   |
| ------ | ------------------------ | --------------------------------------------- |
| POST   | `/api/v1/user/signup`    | Register a new user                           |
| POST   | `/api/v1/user/login`     | Login user                                    |
| GET    | `/api/v1/user/dashboard` | Get logged-in user dashboard data (protected) |

---

### 📝 **Blog Routes**

| Method | Endpoint                          | Description                                         |
| ------ | --------------------------------- | --------------------------------------------------- |
| POST   | `/api/v1/blog/create`             | Create a new blog post with image (protected)       |
| PATCH  | `/api/v1/blog/toggle-publish/:id` | Toggle publish status of blog (protected)           |
| DELETE | `/api/v1/blog/delete/:id`         | Delete a blog post (protected)                      |
| GET    | `/api/v1/blog/:id`                | Get a single blog by ID                             |
| GET    | `/api/v1/blogs`                   | Get all published blogs                             |
| GET    | `/api/v1/user/blogs`              | Get all blogs created by logged-in user (protected) |
| POST   | `/api/v1/blog/gemini/generate`    | Generate blog content using Gemini AI (protected)   |

---

### 💬 **Comment Routes**

| Method | Endpoint                             | Description                                             |
| ------ | ------------------------------------ | ------------------------------------------------------- |
| POST   | `/api/v1/comment/create`             | Create a comment on a blog (protected)                  |
| GET    | `/api/v1/blog/:blogId/comments`      | Get all comments for a blog                             |
| DELETE | `/api/v1/comment/:commentId`         | Delete a comment (protected)                            |
| PATCH  | `/api/v1/comment/:commentId/approve` | Approve a comment (protected)                           |
| GET    | `/api/v1/user/comments`              | Get all comments for logged-in user's blogs (protected) |

---

## 📌 Features

✅ User registration & login  
✅ Create, edit, delete, publish/unpublish blogs  
✅ Upload images to cloud (ImageKit)  
✅ AI-powered blog generation (Google Gemini)  
✅ Comment system with approval  
✅ Search & filter published blogs  

---