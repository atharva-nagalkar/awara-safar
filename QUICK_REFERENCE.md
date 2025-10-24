# 🎯 Awara Safar - Quick Reference

## 🚀 Commands

### Development
```bash
npm run dev              # Start both frontend & backend
npm run server           # Start backend only
npm run client           # Start frontend only
```

### Production
```bash
npm run build            # Build frontend for production
npm start                # Start production server (single port)
npm run install-all      # Install all dependencies
```

## 🌐 URLs

### Development
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

### Production
- Everything: http://localhost:5000
- API: http://localhost:5000/api

## 📁 Key Files

### Configuration
- `.env` - Environment variables
- `package.json` - Backend dependencies & scripts
- `client/package.json` - Frontend dependencies
- `client/tailwind.config.js` - Tailwind CSS config

### Backend
- `server/index.js` - Main server file
- `server/models/` - MongoDB schemas
- `server/routes/` - API endpoints
- `server/middleware/auth.js` - Authentication

### Frontend
- `client/src/App.js` - Main React app
- `client/src/pages/` - Page components
- `client/src/components/` - Reusable components
- `client/src/context/` - React Context (Auth, Notifications)
- `client/src/services/api.js` - API service layer

## 🔑 Environment Variables

### Required
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/awara-safar
JWT_SECRET=your_secret_key_min_32_characters
NODE_ENV=development
```

### Optional (Email)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update` - Update profile

### Treks
- `GET /api/treks` - Get all treks
- `GET /api/treks/upcoming` - Get upcoming treks
- `GET /api/treks/:id` - Get single trek
- `POST /api/treks` - Create trek (admin)
- `PUT /api/treks/:id` - Update trek (admin)
- `DELETE /api/treks/:id` - Delete trek (admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Notifications
- `GET /api/notifications` - Get notifications
- `POST /api/notifications` - Create notification (admin)
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read

### Contact
- `POST /api/contact` - Send contact form

## 🗄️ MongoDB Collections

- `users` - User accounts
- `treks` - Trek/tour listings
- `bookings` - User bookings
- `notifications` - User notifications

## 🎨 Pages & Routes

- `/` - Home page
- `/about` - About page
- `/treks` - Trek listings
- `/treks/:id` - Trek details
- `/events` - Upcoming events
- `/contact` - Contact form
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User dashboard (protected)
- `/profile` - User profile (protected)

## 🔧 Common Tasks

### Create Admin User
```javascript
// In MongoDB shell (mongosh)
use awara-safar
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Add Sample Trek
```javascript
db.treks.insertOne({
  title: "Mountain Trek",
  description: "Amazing mountain experience",
  type: "trek",
  difficulty: "moderate",
  duration: "3 Days",
  price: 4999,
  location: "Himalayas",
  startDate: new Date("2024-12-01"),
  endDate: new Date("2024-12-03"),
  maxParticipants: 20,
  currentParticipants: 0,
  status: "upcoming",
  featured: true,
  createdAt: new Date()
})
```

### Clear Database
```javascript
use awara-safar
db.users.deleteMany({})
db.treks.deleteMany({})
db.bookings.deleteMany({})
db.notifications.deleteMany({})
```

### Check Logs
```bash
# Development - check terminal output

# Production with PM2
pm2 logs awara-safar

# Heroku
heroku logs --tail
```

## 🐛 Troubleshooting

### MongoDB not connecting
```bash
# Check if MongoDB is running
mongosh
# or
mongo

# Start MongoDB
mongod
```

### Port in use
```bash
npx kill-port 5000
npx kill-port 3000
```

### Dependencies issues
```bash
rm -rf node_modules client/node_modules
npm run install-all
```

### Build fails
```bash
cd client
rm -rf build node_modules
npm install
npm run build
```

## 📚 Documentation

- **Setup Guide**: `SETUP_GUIDE.md` - Detailed installation
- **Deployment Guide**: `DEPLOYMENT_GUIDE.md` - Production deployment
- **Startup Checklist**: `STARTUP_CHECKLIST.md` - Step-by-step setup
- **README**: `README.md` - Project overview

## 🎯 Features Checklist

- ✅ User authentication (email + phone)
- ✅ Trek/tour browsing with filters
- ✅ Booking system
- ✅ Real-time notifications (Socket.io)
- ✅ User dashboard
- ✅ Responsive design
- ✅ Contact form with map
- ✅ Event countdowns
- ✅ Single-port deployment ready

## 🚀 Deployment Platforms

- **Heroku**: Easy, free tier available
- **Railway**: Modern, auto-deploy
- **Render**: Simple, free tier
- **VPS**: Full control (DigitalOcean, AWS, etc.)

## 📞 Support

Check these files for help:
1. `STARTUP_CHECKLIST.md` - Getting started
2. `SETUP_GUIDE.md` - Detailed setup
3. `DEPLOYMENT_GUIDE.md` - Production deployment
4. `README.md` - Project overview

## 🎉 Quick Start (TL;DR)

```bash
# 1. Install
npm run install-all

# 2. Configure .env file
# (copy from .env.example)

# 3. Start MongoDB
mongod

# 4. Run
npm run dev

# 5. Visit
# http://localhost:3000
```

That's it! 🏔️
