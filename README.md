# 🎓 FS University (Project Z)

[![GitHub Stars](https://img.shields.io/github/stars/venom001e/FSU-Project-Z?style=flat&color=yellow)](https://github.com/venom001e/FSU-Project-Z/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/venom001e/FSU-Project-Z?style=flat&color=orange)](https://github.com/venom001e/FSU-Project-Z/forks)
[![GitHub Issues](https://img.shields.io/github/issues/venom001e/FSU-Project-Z?style=flat&color=red)](https://github.com/venom001e/FSU-Project-Z/issues)
[![GitHub License](https://img.shields.io/github/license/venom001e/FSU-Project-Z?style=flat&color=blue)](LICENSE)

> **A modern and powerful form-building platform designed for universities, schools, and educational institutions.**

---

## 🚀 Overview

**FS University (Project Z)** is a next-generation form builder and survey system, tailored for the needs of educational institutions.  
It enables admins, teachers, and staff to **create, manage, and analyze** forms effortlessly while ensuring **security, reliability, and scalability**.

---

## ✨ Features

- 📝 **Custom Form Builder** – Multiple field types, drag-and-drop, conditional logic  
- 🔐 **Secure Authentication** – User login & role-based access using NextAuth  
- 🗄 **Database Layer** – Powered by Prisma + PostgreSQL for seamless data handling  
- 📊 **Response Management** – Collect, view, and export student/teacher responses  
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile  
- ⚡ **Self-Hosting or Cloud** – Deploy on Vercel, Railway, or your own server  

---

## 📂 Project Structure

FSU-Project-Z/
├── app/ # Frontend & backend (Next.js 13+ App Router)
├── components/ # UI components
├── config/ # Global configurations
├── lib/ # Utilities & helpers
├── opensurvey-main/ # Core survey logic
├── prisma/ # Database schema & migrations
├── public/ # Static assets
├── scripts/ # Deployment & seed scripts
├── types/ # TypeScript definitions
└── ...

yaml
Copy code

---

## ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/venom001e/FSU-Project-Z.git
   cd FSU-Project-Z
Install Dependencies

bash
Copy code
npm install
# or
yarn install
Configure Environment Variables
Create a .env file in the root folder and add:

ini
Copy code
DATABASE_URL=your_postgres_database_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
Setup Database

bash
Copy code
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
Run Development Server

bash
Copy code
npm run dev
Open http://localhost:3000 in your browser 🎉

🌍 Deployment
Easily deploy on Vercel or Railway.
Make sure to set environment variables (DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET) in your hosting platform.

📸 Screenshots (Optional)
You can add screenshots or GIFs of your project here for better presentation.

🛠 Tech Stack
⚡ Next.js 13+ (App Router) – Fullstack React framework

🎨 Tailwind CSS – Styling & responsive design

🔐 NextAuth.js – Authentication

🗄 Prisma ORM + PostgreSQL – Database

🚀 Vercel – Deployment

🤝 Contribution
Contributions are welcome! 🙌

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

👨‍💻 Author
GitHub: @venom001e

Project Repo: FSU-Project-Z

“Empowering education through simplicity, technology, and innovation.” 🚀

yaml
Copy code

