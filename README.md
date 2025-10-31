# 🔐 Authify

Authify is a **secure authentication system** built with **React** (frontend) and **Spring Boot** (backend), featuring **JWT authentication** and **MySQL database**.  
It allows users to **register, log in, verify accounts, reset passwords**, and **log out securely**.  


## ✨ Features
- 🔑 User Registration & Login  
- 🧾 JWT Token-based Authentication  
- 📬 OTP-based Account Verification  
- 🔁 Password Reset via OTP  
- 🚪 Logout   
- ⚙️ Toast-based Notifications for OTPs   


## 🖼️ Preview

Here’s how **Authify** looks in action 👇

All project images are available in the [📂 **Preview Folder**](./Preview).

You can find:
- Home Page
- Login Page  
- Register Page  
- Verify Account  
- Reset Password  


## ⚙️ Backend API Endpoints

| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/register` | **POST** | Register a new user |
| `/api/login` | **POST** | Authenticate user and return JWT token |
| `/api/logout` | **POST** | Remove JWT token |
| `/api/user` | **GET** | Get user profile (requires JWT) |
| `/api/send-reset-otp` | **POST** | Send OTP for password reset (shown in toast) |
| `/api/verify-reset-otp` | **POST** | Verify OTP for password reset |
| `/api/reset-password` | **POST** | Update password after OTP verification |
| `/api/send-verify-otp` | **POST** | Send OTP for account verification (shown in toast) |
| `/api/verify-user` | **POST** | Verify user account using OTP |


## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS

**Backend:**
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- MySQL Database
- Maven

**Development Tools:**
- VS Code 
- Eclipse (SpringToolSuite)
- Postman (for API testing)


## 🧩 How to Run Locally

### 🖥️ Backend Setup

1. Clone the repository and navigate to the backend folder:
   ```bash
   git clone https://github.com/RishiChamarthi/Authify.git
   cd Server 
2. Create a MySQL database:
    ```bash
    CREATE DATABASE authify;
3. Configure your application.properties:
    ```bash
    spring.datasource.url=jdbc:mysql://localhost:3306/authify
    spring.datasource.username=your_mysql_username
    spring.datasource.password=your_mysql_password
    spring.jpa.hibernate.ddl-auto=update
    jwt.secret.key=your_jwt_secret_key
4. Run the Spring Boot application:
    ```bash
    mvn spring-boot:run
The backend should now be running on http://localhost:8080


### 💻 Frontend Setup

1. Navigate to the frontend folder:
    ```bash
    cd Client
2. Install dependencies:
    ```bash
    npm install
3. Start the React app:
    ```bash
    npm run dev
The frontend should now run on http://localhost:5173


## 🚀 Future Improvements

- ✉️ Integrate real email service for OTP delivery (e.g., Gmail SMTP, SendGrid)

- 🧍Add role-based access (Admin, User, etc.)