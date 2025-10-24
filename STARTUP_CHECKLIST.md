# 🚀 Awara Safar - Startup Checklist

Use this checklist to get your application running quickly!

## ✅ Pre-Installation

- [ ] **Node.js installed** (v16 or higher)
  - Check: `node --version`
  - Download: https://nodejs.org/

- [ ] **MongoDB installed** (v5 or higher)
  - Check: `mongod --version`
  - Download: https://www.mongodb.com/try/download/community

- [ ] **Git installed** (optional)
  - Check: `git --version`
  - Download: https://git-scm.com/

## 📦 Installation Steps

### 1. Install Dependencies
```bash
npm run install-all
```
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed

### 2. Configure Environment

Create `.env` file in root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/awara-safar
JWT_SECRET=change_this_to_a_random_string_min_32_chars
JWT_EXPIRE=7d
NODE_ENV=development
```

- [ ] `.env` file created
- [ ] JWT_SECRET changed to unique value
- [ ] MongoDB URI configured

**Optional (for email features):**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

- [ ] Email configuration added (if needed)

### 3. Start MongoDB

**Windows:**
```bash
# MongoDB should start automatically if installed as service
# Or run: mongod
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

- [ ] MongoDB is running
- [ ] Can connect to `mongodb://localhost:27017`

### 4. Start the Application

**Development Mode (Two Ports):**
```bash
npm run dev
```

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] No errors in terminal

**Production Mode (Single Port):**
```bash
npm run build
npm start
```

- [ ] Frontend built successfully
- [ ] Application running on http://localhost:5000

## 🧪 Test the Application

### Basic Tests

- [ ] **Homepage loads**
  - Visit http://localhost:3000 (dev) or http://localhost:5000 (prod)
  - Hero section displays
  - Navigation works

- [ ] **User Registration**
  - Go to `/register`
  - Fill form with valid data
  - Registration successful

- [ ] **User Login**
  - Go to `/login`
  - Use registered credentials
  - Login successful
  - Redirected to homepage

- [ ] **Browse Treks**
  - Go to `/treks`
  - Page loads without errors
  - Filters work (if data exists)

- [ ] **Contact Form**
  - Go to `/contact`
  - Form displays
  - Map loads

- [ ] **Dashboard**
  - Login first
  - Go to `/dashboard`
  - Dashboard loads
  - Shows user info

## 📊 Add Sample Data

Connect to MongoDB and add sample treks:

```bash
# Open MongoDB shell
mongosh

# Switch to database
use awara-safar

# Add sample trek
db.treks.insertOne({
  title: "Test Trek",
  description: "A test trek for development",
  type: "trek",
  difficulty: "moderate",
  duration: "2 Days / 1 Night",
  price: 2999,
  location: "Test Location",
  startDate: new Date("2024-12-01"),
  endDate: new Date("2024-12-02"),
  maxParticipants: 20,
  currentParticipants: 0,
  images: [],
  highlights: ["Beautiful views", "Great experience"],
  included: ["Meals", "Guide"],
  excluded: ["Transport"],
  status: "upcoming",
  featured: true,
  createdAt: new Date()
})
```

- [ ] Sample trek added
- [ ] Trek appears on homepage
- [ ] Trek appears in treks list

## 🔧 Troubleshooting

### MongoDB Connection Error
- [ ] MongoDB service is running
- [ ] Port 27017 is not blocked
- [ ] Connection string in `.env` is correct

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules client/node_modules
npm run install-all
```

### CSS Warnings (index.css)
- These are just IDE warnings for Tailwind CSS
- They don't affect functionality
- Safe to ignore

### Build Errors
```bash
# Clear cache and rebuild
cd client
rm -rf node_modules build
npm install
npm run build
cd ..
```

## 🎯 Next Steps

After successful setup:

1. **Create Admin Account**
   ```javascript
   // In MongoDB shell
   use awara-safar
   db.users.updateOne(
     { email: "your_email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

2. **Add More Trek Data**
   - See SETUP_GUIDE.md for sample data
   - Or create through admin interface

3. **Customize Branding**
   - Update colors in `client/tailwind.config.js`
   - Change logo and favicon
   - Update contact information

4. **Enable Notifications**
   - Click "Enable Notifications" on Events page
   - Test real-time updates

5. **Test Booking Flow**
   - Login as user
   - Book a trek
   - Check dashboard
   - Verify booking appears

## 🚀 Ready for Production?

Before deploying:

- [ ] All features tested
- [ ] Sample data removed
- [ ] Environment variables configured
- [ ] MongoDB Atlas setup (for cloud)
- [ ] Email configuration tested
- [ ] JWT_SECRET is strong and unique
- [ ] Read DEPLOYMENT_GUIDE.md

## ✨ Success!

If all checkboxes are marked, your Awara Safar application is ready!

**Development:** `npm run dev`  
**Production:** `npm run build && npm start`

Happy Trekking! 🏔️
