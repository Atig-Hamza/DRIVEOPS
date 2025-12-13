# 🚛 DriveOps - Fleet Management System

**DriveOps** is a modern, full-stack fleet management solution designed to streamline trucking operations. It bridges the gap between fleet administrators and drivers through a dual-portal interface, offering real-time tracking, trip management, and vehicle maintenance monitoring.

## ✨ Features

### 🏢 Admin Portal
*   **Dashboard Overview**: Visual analytics of fleet performance and active trips.
*   **Fleet Management**: Add, update, and monitor trucks and their specifications.
*   **Driver Management**: Manage driver profiles and assignments.
*   **Trip Planning**: Create and assign trips with pickup/dropoff locations.
*   **Real-time Tracking**: View the live location of trucks on an interactive map.
*   **Application Management**: Handle driver job applications.

### 🚚 Driver Portal
*   **Mobile-First Dashboard**: Optimized interface for drivers on the go.
*   **Active Mission View**: Clear details of the current assignment with route visualization.
*   **Navigation Integration**: One-click routing via Google Maps (Current Location -> Pickup -> Dropoff).
*   **Vehicle Status**: Interactive visual interface to report tire conditions (Good, Worn, Needs Replacement).
*   **Trip Management**: Mark trips as completed directly from the dashboard.

### 🎨 UI/UX
*   **Modern Design**: Clean, minimalist aesthetic using Tailwind CSS.
*   **Interactive Maps**: Powered by Leaflet for detailed route and location visualization.
*   **Smooth Animations**: Enhanced user experience with Framer Motion.
*   **Creative 404 Page**: Custom "Lost Signal" error page with immersive animations.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: [React](https://reactjs.org/) (Vite)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Maps**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **HTTP Client**: Axios

### Backend
*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
*   **Authentication**: JWT (JSON Web Tokens)
*   **File Handling**: Multer

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v14+ recommended)
*   MongoDB (Local or Atlas connection string)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd DriveOps
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
MONGO_URI=mongodb://localhost:27017/driveops
JWT_SECRET=your_super_secret_key
PORT=4000
```

Start the backend server:
```bash
npm run dev
```
The server will run on `http://localhost:4000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## 📱 Usage

1.  **Register/Login**: Create an account. By default, new users might be assigned the 'driver' role (depending on implementation). Admin accounts can be set up directly in the database or via a specific registration flow.
2.  **Admin**: Access `/admin/dashboard` to manage the fleet.
3.  **Driver**: Access `/driver/dashboard` to view assigned trips and manage vehicle status.

## 📂 Project Structure

```
DriveOps/
├── backend/            # Node.js/Express API
│   ├── src/
│   │   ├── config/     # DB and App configuration
│   │   ├── controllers/# Request handlers
│   │   ├── middlewares/# Auth and upload middlewares
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API routes
│   │   └── services/   # Business logic
│   └── server.js       # Entry point
│
└── frontend/           # React Client
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── Pages/      # Application pages (Admin & Driver)
    │   ├── assets/     # Images and icons
    │   └── App.jsx     # Main component & Routing
```

## 📄 License
This project is licensed under the ISC License.