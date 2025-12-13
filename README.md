<div align="center">

  # 🚛 DRIVEOPS
  ### Intelligent Fleet Management Solution

  <p align="center">
    <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/Node.js-18.0-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/MongoDB-6.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge" />
  </p>

  <p align="center">
    <strong>Streamline Operations • Track in Real-Time • Empower Drivers</strong>
  </p>

  <br />
</div>

---

## 📖 Overview

**DriveOps** is a comprehensive, full-stack fleet management platform engineered to bridge the operational gap between fleet administrators and drivers. By leveraging modern web technologies, DriveOps provides a seamless, dual-portal experience that enhances visibility, improves communication, and optimizes logistics efficiency.

Whether you are managing a fleet of hundreds or driving a single rig, DriveOps puts control at your fingertips.

---

## ✨ Key Features

### 🏢 Admin Command Center
*   **📊 Visual Analytics Dashboard**: Get a bird's-eye view of fleet performance, active trips, and efficiency metrics.
*   **🚛 Fleet Inventory**: Comprehensive management of trucks, including specifications, maintenance history, and status.
*   **👥 Driver Roster**: Manage driver profiles, track performance, and handle job applications.
*   **🗺️ Mission Control**: Create, assign, and monitor trips with precise pickup and dropoff coordination.
*   **📡 Live Telemetry**: Real-time GPS tracking of all active assets on an interactive map.

### 🚚 Driver Cockpit (Mobile-First)
*   **📱 Adaptive Interface**: A responsive, touch-friendly dashboard designed for use on tablets and smartphones.
*   **📍 Active Mission Focus**: Distraction-free view of the current assignment with integrated route visualization.
*   **🧭 Smart Navigation**: One-tap integration with Google Maps for optimized routing (Current Location → Pickup → Dropoff).
*   **🔧 Interactive Maintenance**: Visual truck schematic for quick tire condition reporting (Good, Worn, Critical).
*   **✅ Trip Workflow**: Simple "Swipe-to-Complete" style actions to update trip status instantly.

### 🎨 Experience & Design
*   **Modern Aesthetic**: Built with a clean, minimalist design language using **Tailwind CSS**.
*   **Fluid Motion**: Powered by **Framer Motion** for smooth transitions and engaging micro-interactions.
*   **Immersive Maps**: Deep integration with **Leaflet** for rich, interactive mapping experiences.
*   **Creative Error Handling**: Custom "Lost Signal" 404 page that turns errors into an experience.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | **React (Vite)** | High-performance UI library |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework |
| **State/Effects** | **Framer Motion** | Production-ready animation library |
| **Mapping** | **Leaflet / React-Leaflet** | Open-source JavaScript library for mobile-friendly interactive maps |
| **Icons** | **Lucide React** | Beautiful & consistent icon pack |
| **Backend** | **Node.js & Express** | Scalable server-side runtime |
| **Database** | **MongoDB & Mongoose** | Flexible NoSQL database for complex data structures |
| **Auth** | **JWT** | Secure, stateless authentication |
| **File Storage** | **Multer** | Middleware for handling `multipart/form-data` |

---

## 🚀 Getting Started

### Prerequisites
*   **Node.js** (v16+ recommended)
*   **MongoDB** (Local instance or Atlas Cluster)
*   **Git**

### 📥 Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/driveops.git
cd DriveOps
```

#### 2. Backend Configuration
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` root:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/driveops
JWT_SECRET=your_super_secret_complex_key_here
```

Start the server:
```bash
npm run dev
# Server runs on http://localhost:4000
```

#### 3. Frontend Configuration
Open a new terminal:
```bash
cd frontend
npm install
```

Start the client:
```bash
npm run dev
# Client runs on http://localhost:5173
```

---

## 📱 Usage Guide

### 🔐 Authentication
*   **Registration**: New users can sign up via the `/register` route.
*   **Roles**: The system supports `admin` and `driver` roles.
    *   *Note: First admin user usually needs to be seeded or manually updated in DB.*

### 🖥️ Admin Workflow
1.  Log in as an **Admin**.
2.  Navigate to **Trucks** to add your fleet vehicles.
3.  Go to **Drivers** to approve applications or add drivers.
4.  Use **Trips** to create a new mission and assign a driver/truck pair.
5.  Monitor progress on the **Tracking** page.

### 🚛 Driver Workflow
1.  Log in as a **Driver**.
2.  View the **Dashboard** to see the "Active Mission".
3.  Use the **Wrench Icon** to report vehicle status before departure.
4.  Click **Navigate** to open Google Maps.
5.  Upon arrival, click **Complete Trip** to update the system.

---

## 📂 Project Structure

```
DriveOps/
├── 📂 backend/                 # API & Server Logic
│   ├── 📂 src/
│   │   ├── 📂 config/          # Database & Env Config
│   │   ├── 📂 controllers/     # Route Logic & Responses
│   │   ├── 📂 middlewares/     # Auth, Validation, Uploads
│   │   ├── 📂 models/          # Mongoose Schemas
│   │   ├── 📂 routes/          # API Endpoint Definitions
│   │   └── 📂 services/        # Business Logic Layer
│   └── 📄 server.js            # Application Entry Point
│
└── 📂 frontend/                # React Client Application
    ├── 📂 src/
    │   ├── 📂 assets/          # Static Assets (Images, Icons)
    │   ├── 📂 components/      # Reusable UI Components
    │   ├── 📂 middleware/      # Protected Route Wrappers
    │   ├── 📂 Pages/           # View Components
    │   │   ├── 📂 Admin/       # Admin-specific Views
    │   │   └── 📂 Driver/      # Driver-specific Views
    │   └── 📄 App.jsx          # Main Router Configuration
```

---

## 🔮 Roadmap

- [ ] **Real-time Sockets**: Implement Socket.io for instant location updates without polling.
- [ ] **Maintenance Logs**: Detailed history of tire changes and truck repairs.
- [ ] **Fuel Tracking**: Module for drivers to upload fuel receipts.
- [ ] **Push Notifications**: Alerts for new trip assignments.

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  <sub>Built with ❤️ by Hamza Atig</sub>
</div>
