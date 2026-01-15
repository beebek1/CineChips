🎬 CineChips – Movie Ticket Booking Platform

A modern movie ticket booking web application built with a clean UI, real-time seat selection, and role-based access.


⸻

🚀 Overview

CineChips is a full-stack movie booking website where users can browse movies, select seats visually, and book tickets seamlessly. The platform is designed with scalability in mind, separating user and admin responsibilities while keeping the UI simple and intuitive.

This project focuses on:
	•	Realistic seat-selection experience 🎟️
	•	Clean frontend architecture (React + Tailwind)
	•	Secure authentication using JWT 🔐

⸻

✨ Features

👤 User
	•	Sign up / Sign in
	•	JWT-based authentication
	•	Browse movies & schedules
	•	Interactive seat selection
	•	Visual seat status (Available / Selected / Booked)
	•	Responsive UI

🛠️ Admin (Role-based)
	•	Add & manage movies
	•	Manage show timings
	•	Control seat availability

⸻

🧠 Tech Stack

Frontend
	•	⚛️ React (Vite)
	•	🎨 Tailwind CSS
	•	🔁 React Router
	•	🔔 React Hot Toast

Backend
	•	🟢 Node.js
	•	🚂 Express.js
	•	🗄️ Sequelize / Database
	•	🔐 JWT Authentication

⸻

📂 Project Structure

CineChips/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│   └── main.jsx
│
└── README.md


⸻

🎟️ Seat Booking UI Logic
	•	Seats are rendered dynamically from structured layout data
	•	Multiple seat sections with gaps (cinema-style)
	•	Seat status:
	•	🟩 Available
	•	🟨 Selected
	•	⬛ Booked
	•	State-driven UI updates using React hooks

⸻

🔐 Authentication Flow
	1.	User logs in → JWT received from backend
	2.	Token stored in localStorage
	3.	Token decoded & validated on frontend
	4.	Conditional UI rendering based on login state
	5.	Protected routes for admin actions

⸻

🧪 Getting Started

Clone the repository

git clone https://github.com/your-username/cinechips.git

Backend setup

cd backend
npm install
npm run dev

Frontend setup

cd frontend
npm install
npm run dev


⸻

⚠️ Disclaimer

This project is built for learning and academic purposes. Some security choices (like storing JWT in localStorage) are acceptable here but may require stronger alternatives in production.

⸻

📸 Screenshots (Coming Soon)
	•	Home Page
	•	Seat Selection
	•	Authentication Flow
	•	Admin Dashboard

⸻

💡 Future Improvements
	•	Payment gateway integration
	•	Real-time seat locking
	•	Movie ratings & reviews
	•	Email ticket confirmation

⸻

👨‍💻 Author

Aayush
Computer Science Student | Full-Stack Learner

⸻

⭐ If you like this project, give it a star and feel free to fork it!