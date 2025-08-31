# 🩸 Blood Bank Management – Full Stack Web Application  

## 📂 Project Overview  
A modern **full-stack web application** to manage blood bank operations—donor registration, blood stock tracking, and request handling—built with a **C# ASP.NET Core Web API** backend and a **React + Vite** frontend.  

## 🏗️ Tech Stack  

| Layer       | Technology                  |
|-------------|------------------------------|
| Backend     | ASP.NET Core Web API (C#)   |
| Frontend    | React + Vite                |
| Styling     | (TailwindCSS / CSS Modules) |
| Linting     | ESLint                      |
| DB          | (SQL Server / Others)       |  

---

## ✨ Features  
- Donor registration & management  
- Blood request processing  
- Real-time blood stock monitoring  
- Clean REST API endpoints  
- Fast development with Vite HMR  
- Enforced coding standards via ESLint  

---
## 🎥 Demo Video  
👉 [Watch Demo Video](https://youtu.be/hCxrEmwsWFg)  

[![Watch the demo video](assets/screenshots/video-thumbnail.png)](https://youtu.be/hCxrEmwsWFg)  

---

## 🖼️ Screenshots  

| Dashboard | Donor List | Request Page |
|-----------|------------|--------------|
| ![Dashboard](assets/c:\Users\SHAJIB\Downloads\Screenshot 2025-08-31 051615/dashboard.png) | ![Donor List](assets/screenshots/donor-list.png) | ![Request Page](assets/screenshots/request-page.png) |  

---
## ⚙️ Setup & Installation  

### 🔹 1. Clone Repository  
```bash
git clone https://github.com/Sonia66Hub/Blood-Bank-Management-System-APIWithReact.git
cd bloodbank
```  

### 🔹 2. Run Backend (API)  
1. Open `BloodBankWebAPI.sln` in **Visual Studio 2022**.  
2. Press **F5** to run the API.  
   - Runs on `http://localhost:5000` (HTTP)  
   - Runs on `https://localhost:5001` (HTTPS)  

### 🔹 3. Run Frontend (React + Vite)  
```bash
cd frontend
npm install
npm run dev
```  
👉 Runs at: `http://localhost:5173`  

### 🔹 4. Connect Frontend → Backend  
Update API base URL inside frontend config:  
```js
// src/config.js
export const API_BASE = "https://localhost:5001/api";
```  

Example call:  
```js
fetch(`${API_BASE}/donors`)
  .then(res => res.json())
  .then(data => console.log(data));
```  

---

## 🧹 Code Quality (Linting)  
Run ESLint:  
```bash
npm run lint
```  

---

## 📦 Build & Deployment  

### Frontend:  
```bash
npm run build
```  
- Output in `/dist`  

### Backend:  
- Publish from Visual Studio → **Build > Publish**  

---

## 🚀 Future Improvements  
- JWT-based authentication 🔐  
- Role-based access (Admin / Donor / Hospital)  
- Automated email/SMS notifications 📩  
- Dashboard with charts 📊  

---

## 🤝 Contribution Guide  
1. Fork the repo 🍴  
2. Create feature branch: `git checkout -b feature-name`  
3. Commit changes: `git commit -m "Added new feature"`  
4. Push branch: `git push origin feature-name`  
5. Create Pull Request 🎉  

---

## 📜 License  
MIT License © 2025  
