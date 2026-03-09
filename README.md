# 🏥 Healthcare Management Backend API

A scalable **Healthcare Management Backend API** built using **Node.js, Express, TypeORM, and PostgreSQL**.
This project provides REST APIs for managing patients, doctors, appointments, and prescriptions with authentication and role-based authorization.

---

# 🚀 Features

* 🔐 JWT Authentication
* 👤 Role-Based Authorization (Admin / Doctor / Patient)
* 🧑‍⚕️ Doctor Management
* 🧑 Patient Management
* 📅 Appointment Scheduling
* 💊 Prescription Management
* 🔍 Pagination, Filtering, Sorting, Search
* ⚡ Global Error Handling
* 📦 Modular Architecture

---

# 🛠 Tech Stack

Backend

* Node.js
* Express.js

Database

* PostgreSQL
* TypeORM

Authentication

* JWT (JSON Web Token)

Other Tools

* dotenv
* bcrypt
* class-validator

---

# 📂 Project Structure

src
│
├── config
│   └── datasource.ts
│
├── entities
│   ├── user.entities.ts
│   ├── patient.entities.ts
│   ├── doctor.entities.ts
│   ├── appointment.entities.ts
│   └── prescription.entities.ts
│
├── modules
│   ├── auth
│   ├── patient
│   ├── doctor
│   ├── appointment
│   └── prescription
│
├── middlewares
│   ├── auth.middleware.ts
│   ├── validate.middleware.ts
│   └── role.middleware.ts
│
├── utils
│
└── app.ts

---

# ⚙️ Installation

Clone the repository

git clone https://github.com/your-username/healthcare-backend.git

Go to project folder

cd healthcare-backend

Install dependencies

npm install

Run development server

npm run dev

---

# 🔑 Environment Variables

Create `.env` file in root directory

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=healthcare
JWT_SECRET=your_secret_key

---

# 📡 API Modules

Auth

* Register User
* Login User

Patient

* Create Patient
* Get Patients
* Update Patient
* Delete Patient

Doctor

* Create Doctor
* Get Doctors
* Update Doctor

Appointment

* Book Appointment
* Update Appointment Status
* Get Appointments

Prescription

* Create Prescription
* Get Prescriptions

---

# 📈 Future Improvements

* API Documentation using Swagger

---

# 👨‍💻 Author

Sandip Sonagra

GitHub
https://github.com/Sandip-1401
