# <p align="center" id="title">Pinterest Colne</p>

<p align="center"><img src="https://github.com/AhmedDoban/Pinterest-Colne/assets/73547094/e56a412a-05c0-46a5-8101-7f61c8768f20" alt="project-image"></p>

<p id="description" align="center">
A Pinterest clone built using the MERN stack, enabling users to register, log in, and access features like profile management, image sharing, liking, pinning, and deletion. Utilizes JWT-based authentication, MongoDB for data storage, and React.js for dynamic frontend interfaces.

 </p>

# 🚀 <a href="https://pinterest-colne-git-main-ahmeddoban.vercel.app/" > Demo </a>

# Key Features:

- User authentication and profile management
- Image upload, sharing, liking, pinning, and deletion
- Responsive and intuitive user interfaces
- Data security and integrity with JWT-based authentication

## Technologies/Tools Used

- Frontend: React.js, HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Additional Libraries/Tools: Axios, React Router, Mongoose

# 🧐 Features

Here're some of the project's best features

- User Authentication: Secure registration and login functionality.
- Profile Management: Edit profile details, view own posts, secrets, pins, followers, and following.
- Image Sharing: Upload and share images with friends and followers.
- Interactions: Like and pin images for personal collections.
- Image Management: Delete uploaded images if desired.
- Search: Search for images or users within the platform.
- Responsive Design: Ensures seamless user experience across devices.

## Installation

### Requirements

Before proceeding with the installation, make sure you have the following prerequisites installed on your system:

- Node.js
- MongoDB
- npm (Node.js package manager, usually comes with Node.js installation)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AhmedDoban/Pinterest-Colne
   ```

2. **Navigate to the back-end project directory:**

   ```bash
   cd Pinterest Colne-Back-end
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Configure environment variables:**

   Create a `.env` file in the root directory of the project and specify the following environment variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/Pinterest-Colne
   JWT_SECRET_KEY="6e65a3d7e6fea3106aeb99840d7b9f15e811c59e30134cb9567db67cee111df7"
   ```

   Replace `mongodb://localhost:27017/Pinterest-Colne` with your MongoDB connection URI.
   Replace `6e65a3d7e6fea3106aeb99840d7b9f15e811c59e30134cb9567db67cee111df7` with your JWT Secret key.

5. **Start the application:**

   ```bash
   npm run nodemon
   ```

6. **Navigate to the back-end project directory:**

   ```bash
   cd Pinterest Colne-Front-End
   ```

7. **Install dependencies:**

   ```bash
   npm install
   ```

8. **Start the application:**

   ```bash
   npm start
   ```

9. **Access the application:**

   Open a web browser and navigate to `http://localhost:3000` to access the Academic Management System.

10. **Set up admin account:**

    Upon accessing the application for the first time, you'll be prompted to create an admin account. Follow the on-screen instructions to complete the setup.

11. **Enjoy using the Academic Management System!**

    You're all set! Explore the features and functionalities of the system to manage academic activities efficiently.
