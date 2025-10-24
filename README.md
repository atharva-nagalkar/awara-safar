# Awara Safar - Trekking & Touring Website

A modern, interactive website for Awara Safar trekking and touring group with real-time notifications, user authentication, and booking management.

## Features

- 🏔️ **Trek & Tour Listings** - Browse and book upcoming adventures
- 🔐 **Authentication** - Secure login with Gmail and phone number
- 🔔 **Real-time Notifications** - Live updates using Socket.io
- 📅 **Event Countdowns** - Track upcoming treks and tours
- 🗺️ **Map Integration** - Location details for contact page
- 📱 **Responsive Design** - Works seamlessly on all devices
- 💳 **Booking Management** - User dashboard for managing registrations

## Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Lucide React (icons)
- Socket.io Client
- Axios

### Backend
- Node.js & Express
- MongoDB & Mongoose
- Socket.io
- JWT Authentication
- Nodemailer

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Update MongoDB URI and JWT secret

3. **Start MongoDB:**
   ```bash
   mongod
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

5. **For production (single port):**
   ```bash
   npm run build
   npm start
   ```
   - Everything on: `http://localhost:5000`

📖 **Detailed Setup:** See [SETUP_GUIDE.md](./SETUP_GUIDE.md)  
🚀 **Deployment:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `EMAIL_USER` - Gmail address for sending notifications
- `EMAIL_PASSWORD` - Gmail app password
- `GOOGLE_CLIENT_ID` - Google OAuth client ID (optional)
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret (optional)

## Project Structure

```
awara-safar/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── context/        # React context
│       ├── services/       # API services
│       └── App.js
├── server/                 # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── controllers/       # Route controllers
│   └── index.js
└── package.json

```

## Usage

### For Users
1. Sign up with Gmail and phone number
2. Browse available treks and tours
3. Register for events
4. Receive real-time notifications
5. Manage bookings from your dashboard

### For Admins
- Add/edit/delete treks and tours
- Manage user registrations
- Send notifications to users
- View analytics and reports

## License

MIT License - feel free to use this project for your own purposes.

## Contact

For questions or support, visit the Contact page on the website.
