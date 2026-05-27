# ✈️ TripVerse

> **The ultimate collaborative travel planner designed to bring your wanderlust, itineraries, and travel companions together in perfect harmony.**

TripVerse is born out of a simple, human frustration: *planning group trips is messy*. Between endless group chats, scattered itinerary links, and back-of-the-napkin math to split dinner bills, the joy of travel gets bogged down in logistics. 

TripVerse changes all that. It’s a clean, modern, MERN-stack collaborative travel platform where you can build day-by-day itineraries, split expenses effortlessly, and invite your favorite travel buddies to coordinate in real time.

---

## ✨ Features That Make Planning Enjoyable

### 🗺️ Day-by-Day Itinerary Planner
*   Add, edit, or remove activities with custom locations, descriptions, and exact start/end times.
*   Automatic chronological sorting so you always know what’s next on your adventure.
*   Clean, timeline-style card layout built for quick readability on the go.

### 💰 The Smart Ledger (Expense Splitter)
*   Log shared travel costs (Transport, Food, Stays, and more) instantly.
*   Automatic cost-per-person split calculations based on the number of companions in your trip group.
*   Clear history of who paid what and when so you can settle up stress-free.

### 👥 Smart Companion Invitations
*   Ditch the raw database IDs. Our **debounced search auto-completes** user details as you type.
*   Easily lookup travel buddies by their Full Name, `@username`, or Email and add them to the trip with a single click.

### 🔒 Modern Security & Robust Sessions
*   Extended JWT session management ensures your sessions remain secure without logging you out every few minutes.
*   Protected client-side routing keeps your dashboards and travel plans secure from unauthorized viewings.

---

## 🛠️ The Tech Behind the Journey

TripVerse is built using the robust and modern **MERN** stack:

| Layer | Technology | Key Highlights |
| :--- | :--- | :--- |
| **Frontend** | **React 19 & Vite** | Lightning-fast Hot Module Replacement (HMR), component architecture. |
| **Styling** | **Tailwind CSS v4** | Highly responsive, beautiful modern typography, smooth micro-transitions. |
| **Backend** | **Express.js & Node.js** | Modular routers, structured RESTful API, robust JWT middleware. |
| **Database** | **MongoDB & Mongoose** | Flexible schema, relational population (`.populate()`) for multi-document lookups. |

---

## 🚀 Setting Up Your Planning Headquarters

Follow these straightforward steps to get TripVerse running on your local machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) and [MongoDB](https://www.mongodb.com/) installed or access to a MongoDB Atlas cluster.

### 2. Clone the Repository
```bash
git clone https://github.com/KishnavDalmia/TripVerse.git
cd TripVerse
```

### 3. Server Configuration & Setup
1.  Navigate into the `server` directory:
    ```bash
    cd server
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` root and add your configuration details:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=your_jwt_access_secret_key
    REFRESH_TOKEN_SECRET=your_jwt_refresh_secret_key
    ```
4.  Start your development server:
    ```bash
    node index.js
    ```
    *The server will spin up on `http://localhost:5000` with an active database connection.*

---

### 4. Client Setup & Development Server
1.  Open a new terminal and navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
3.  Launch the Vite development server:
    ```bash
    npm run dev
    ```
    *Open your browser and visit `http://localhost:5173` to start planning!*

---

## 🧭 Project Roadmap & Code Architecture

For a detailed view of the code architecture, critical bug fixes, and feature validation plans performed to complete this release, please refer to our internal release artifacts:

*   **[Roadmap & Implementation Details](file:///C:/Users/kishn/.gemini/antigravity/brain/778a55c6-e707-484b-8d5c-7f2ceac596ed/implementation_plan.md):** Deep-dive on structural changes.
*   **[Verified Feature Walkthrough](file:///C:/Users/kishn/.gemini/antigravity/brain/778a55c6-e707-484b-8d5c-7f2ceac596ed/walkthrough.md):** Production compilation results and exact route mapping details.

---

## ❤️ Built with passion
*Designed to make the journey as delightful as the destination.* Happy traveling! 🌍✈️
