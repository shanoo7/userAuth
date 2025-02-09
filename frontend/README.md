# 🔒 User Authentication

A secure Node.js API for user authentication using **JWT** (JSON Web Tokens).

---

## Features

**Signup**: Create a new account.
**Login**: Get a JWT token for accessing protected routes.
**Reset Password**: Send reset link to email.
**Change Password**: Update password after login.
**Protected Routes**: Access only with valid JWT.
**Error Handling**: Clear error messages for developers.

---

## Prerequisites
- Node.js & npm installed
- Express
- MongoDB database
- `.env` file for environment variables
- Email service (like Gmail) for password reset

---

## Installation
1. **Clone the repo**  
   `git clone https://github.com/shanoo7/userAuth.git`

2. **Install dependencies**  
   `npm install`

## Environment Variables  
Create a `.env` file in the root directory and add :  

```env
PORT = ""
MONGO_DB_URI = ""
JWT_KEY = ""
EMAIL_USER= ""
EMAIL_PASS= ""
EMAIL_PORT= ""

