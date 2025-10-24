# Awara Safar - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

## Installation Steps

### 1. Install Dependencies

Open your terminal in the project root directory and run:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/awara-safar
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration (Optional - for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# Google OAuth (Optional - for Gmail login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URL
CLIENT_URL=http://localhost:3000
```

**Important Notes:**
- Change `JWT_SECRET` to a strong random string
- For email functionality, you need to create a Gmail App Password:
  1. Go to Google Account Settings
  2. Security → 2-Step Verification → App passwords
  3. Generate a new app password for "Mail"
  4. Use that password in `EMAIL_PASSWORD`

### 3. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Otherwise, run:
mongod
```

**Mac/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 4. Run the Application

You have two options:

**Option A: Run both servers concurrently (Recommended)**
```bash
npm run dev
```

**Option B: Run servers separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run client
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## Default Admin Account

To create an admin account, you'll need to manually update a user in MongoDB:

```javascript
// Connect to MongoDB
use awara-safar

// Update a user to admin role
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { role: "admin" } }
)
```

## Testing the Application

### 1. Register a New User
- Go to http://localhost:3000/register
- Fill in the registration form with:
  - Name
  - Email (use a valid Gmail address)
  - Phone (10-digit number)
  - Password (minimum 6 characters)

### 2. Login
- Go to http://localhost:3000/login
- Use your registered credentials

### 3. Browse Treks
- Navigate to "Treks & Tours" page
- View trek details
- Make a booking (requires login)

### 4. Check Dashboard
- After booking, go to "Dashboard"
- View your bookings and their status

## Adding Sample Trek Data

To test the application with sample data, you can add treks via MongoDB:

```javascript
use awara-safar

db.treks.insertMany([
  {
    title: "Himalayan Adventure Trek",
    description: "Experience the majestic Himalayas with this 5-day trek through stunning mountain landscapes.",
    type: "trek",
    difficulty: "moderate",
    duration: "5 Days / 4 Nights",
    price: 8999,
    location: "Himachal Pradesh",
    startDate: new Date("2024-12-01"),
    endDate: new Date("2024-12-05"),
    maxParticipants: 20,
    currentParticipants: 5,
    images: [],
    highlights: [
      "Breathtaking mountain views",
      "Professional trek leaders",
      "Camping under the stars",
      "Local cuisine experience"
    ],
    included: [
      "Accommodation",
      "Meals (breakfast, lunch, dinner)",
      "Trek guide",
      "First aid kit"
    ],
    excluded: [
      "Personal expenses",
      "Travel insurance",
      "Tips for guides"
    ],
    status: "upcoming",
    featured: true,
    createdAt: new Date()
  },
  {
    title: "Coastal Paradise Tour",
    description: "Explore beautiful beaches and coastal towns in this relaxing 3-day tour.",
    type: "tour",
    difficulty: "easy",
    duration: "3 Days / 2 Nights",
    price: 5999,
    location: "Goa",
    startDate: new Date("2024-11-15"),
    endDate: new Date("2024-11-17"),
    maxParticipants: 30,
    currentParticipants: 12,
    images: [],
    highlights: [
      "Beach hopping",
      "Water sports",
      "Local seafood",
      "Sunset views"
    ],
    included: [
      "Hotel accommodation",
      "Breakfast",
      "Transportation",
      "Tour guide"
    ],
    excluded: [
      "Lunch and dinner",
      "Water sports fees",
      "Personal expenses"
    ],
    status: "upcoming",
    featured: true,
    createdAt: new Date()
  }
])
```

## Features Overview

### ✅ Implemented Features

1. **User Authentication**
   - Registration with email and phone
   - Login/Logout functionality
   - JWT-based authentication
   - Protected routes

2. **Trek Management**
   - Browse all treks and tours
   - Filter by type, difficulty, status
   - View detailed trek information
   - Featured treks on homepage

3. **Booking System**
   - Book treks with multiple participants
   - Emergency contact information
   - Special requests
   - Booking management dashboard

4. **Real-time Notifications**
   - Socket.io integration
   - Live notifications for bookings
   - New trek announcements
   - Browser notifications support

5. **Responsive Design**
   - Mobile-friendly interface
   - Tailwind CSS styling
   - Smooth animations
   - Modern UI components

6. **Additional Pages**
   - Home with hero section
   - About page with mission/vision
   - Events with countdown timers
   - Contact form with map integration
   - User dashboard

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check if the port 27017 is available
- Verify MONGODB_URI in .env file

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules client/node_modules
npm run install-all
```

### Socket.io Connection Issues
- Check if backend is running on port 5000
- Verify CORS settings in server/index.js
- Check browser console for errors

## Production Deployment

### Backend Deployment (e.g., Heroku, Railway)
1. Set environment variables in your hosting platform
2. Ensure MongoDB is accessible (use MongoDB Atlas for cloud database)
3. Update CLIENT_URL to your frontend URL

### Frontend Deployment (e.g., Vercel, Netlify)
1. Build the frontend: `cd client && npm run build`
2. Deploy the build folder
3. Update API URLs in client/src/services/api.js and context files

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update` - Update user profile

### Treks
- `GET /api/treks` - Get all treks
- `GET /api/treks/upcoming` - Get upcoming treks
- `GET /api/treks/:id` - Get single trek
- `POST /api/treks` - Create trek (admin only)
- `PUT /api/treks/:id` - Update trek (admin only)
- `DELETE /api/treks/:id` - Delete trek (admin only)

### Bookings
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Notifications
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications` - Create notification (admin)
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

### Contact
- `POST /api/contact` - Send contact form

## Support

For issues or questions:
- Check the README.md file
- Review the code comments
- Check MongoDB logs
- Review browser console for frontend errors
- Check server terminal for backend errors

## Next Steps

1. Add payment gateway integration (Razorpay/Stripe)
2. Implement image upload for treks
3. Add review and rating system
4. Create admin dashboard
5. Add email verification
6. Implement forgot password functionality
7. Add social media sharing
8. Create mobile app version

Happy Trekking! 🏔️
