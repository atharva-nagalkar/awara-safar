# Awara Safar - Deployment Guide

## 🚀 Single Port Deployment

The application is now configured to run on a **single port** in production, making deployment much simpler. The backend serves the React frontend as static files.

## Development vs Production

### Development (Two Ports)
- **Frontend**: http://localhost:3000 (React Dev Server)
- **Backend**: http://localhost:5000 (Express API)
- Run with: `npm run dev`

### Production (Single Port)
- **Everything**: http://your-domain.com:5000 (or just port 80/443)
- Backend serves API at `/api/*` routes
- Backend serves React app for all other routes
- Run with: `npm start`

## 📦 Deployment Options

### Option 1: Heroku (Recommended for Beginners)

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create awara-safar
   ```

4. **Add MongoDB Atlas**
   ```bash
   # Sign up at https://www.mongodb.com/cloud/atlas
   # Create a free cluster
   # Get connection string
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
   heroku config:set JWT_SECRET="your_super_secret_key"
   heroku config:set JWT_EXPIRE=7d
   heroku config:set EMAIL_USER="your_email@gmail.com"
   heroku config:set EMAIL_PASSWORD="your_app_password"
   ```

6. **Deploy**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push heroku main
   ```

7. **Open App**
   ```bash
   heroku open
   ```

### Option 2: Railway.app

1. **Go to Railway.app**
   - Visit https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add MongoDB**
   - Click "New" → "Database" → "Add MongoDB"
   - Copy the connection string

4. **Set Environment Variables**
   - Go to your project settings
   - Add variables:
     ```
     NODE_ENV=production
     MONGODB_URI=<your_railway_mongodb_url>
     JWT_SECRET=your_super_secret_key
     JWT_EXPIRE=7d
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASSWORD=your_app_password
     ```

5. **Deploy**
   - Railway automatically deploys on git push
   - Get your URL from the dashboard

### Option 3: Render.com

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - New → Web Service
   - Connect your repository
   - Configure:
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`

3. **Add MongoDB**
   - Use MongoDB Atlas (free tier)
   - Get connection string

4. **Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=<your_mongodb_atlas_url>
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically

### Option 4: VPS (DigitalOcean, AWS, etc.)

1. **Setup Server**
   ```bash
   # SSH into your server
   ssh root@your-server-ip
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install MongoDB
   # Follow: https://docs.mongodb.com/manual/installation/
   
   # Install PM2 (Process Manager)
   npm install -g pm2
   ```

2. **Clone Repository**
   ```bash
   cd /var/www
   git clone your-repo-url awara-safar
   cd awara-safar
   ```

3. **Install Dependencies**
   ```bash
   npm run install-all
   ```

4. **Build Frontend**
   ```bash
   npm run build
   ```

5. **Configure Environment**
   ```bash
   nano .env
   # Add your environment variables
   ```

6. **Start with PM2**
   ```bash
   pm2 start server/index.js --name awara-safar
   pm2 save
   pm2 startup
   ```

7. **Setup Nginx (Optional)**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🗄️ MongoDB Setup (MongoDB Atlas)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Click "Create Cluster"

3. **Setup Database Access**
   - Database Access → Add New Database User
   - Create username and password
   - Give read/write permissions

4. **Setup Network Access**
   - Network Access → Add IP Address
   - For development: Add "0.0.0.0/0" (Allow from anywhere)
   - For production: Add your server's IP

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `awara-safar`

## 📧 Email Configuration (Gmail)

1. **Enable 2-Step Verification**
   - Go to Google Account Settings
   - Security → 2-Step Verification
   - Turn it on

2. **Create App Password**
   - Security → App passwords
   - Select app: Mail
   - Select device: Other (Custom name)
   - Generate password
   - Copy the 16-character password

3. **Use in Environment Variables**
   ```
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   ```

## 🔒 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use MongoDB Atlas with IP whitelist
- [ ] Enable HTTPS (use Let's Encrypt for free SSL)
- [ ] Set `NODE_ENV=production`
- [ ] Don't commit `.env` file
- [ ] Use strong database passwords
- [ ] Enable CORS only for your domain
- [ ] Set up rate limiting (optional)
- [ ] Enable MongoDB authentication
- [ ] Regular backups of database

## 🧪 Testing Production Build Locally

Before deploying, test the production build:

```bash
# Build the frontend
npm run build

# Set environment to production
# Windows:
set NODE_ENV=production
# Mac/Linux:
export NODE_ENV=production

# Start the server
npm start

# Visit http://localhost:5000
```

## 📊 Monitoring

### Check Application Status

```bash
# Heroku
heroku logs --tail

# Railway
# Check logs in dashboard

# VPS with PM2
pm2 logs awara-safar
pm2 status
```

### Common Issues

**Issue: Cannot connect to MongoDB**
- Check connection string
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

**Issue: 502 Bad Gateway**
- Check if Node.js process is running
- Verify PORT environment variable
- Check server logs

**Issue: Static files not loading**
- Ensure `npm run build` was successful
- Check if `client/build` directory exists
- Verify `NODE_ENV=production` is set

**Issue: Socket.io not connecting**
- Check CORS configuration
- Ensure WebSocket support on hosting platform
- Verify firewall rules

## 🔄 Continuous Deployment

### GitHub Actions (Heroku)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Heroku

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "awara-safar"
          heroku_email: "your-email@example.com"
```

### Auto-Deploy on Git Push

Most platforms (Heroku, Railway, Render) automatically deploy when you push to your main branch.

## 📱 Custom Domain

### Heroku
```bash
heroku domains:add www.awarasafar.com
# Follow DNS configuration instructions
```

### Railway/Render
- Go to settings
- Add custom domain
- Configure DNS records as instructed

## 🎯 Post-Deployment

1. **Test All Features**
   - User registration/login
   - Trek browsing
   - Booking system
   - Notifications
   - Contact form

2. **Create Admin Account**
   ```javascript
   // Connect to MongoDB
   use awara-safar
   
   // Update user to admin
   db.users.updateOne(
     { email: "your_email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

3. **Add Sample Data**
   - Use the sample trek data from SETUP_GUIDE.md
   - Or create treks through admin interface

4. **Monitor Performance**
   - Check response times
   - Monitor error logs
   - Track user registrations

## 🆘 Support

If you encounter issues:
1. Check application logs
2. Verify environment variables
3. Test MongoDB connection
4. Review SETUP_GUIDE.md
5. Check hosting platform documentation

## 🎉 Success!

Your Awara Safar website is now live and ready to help adventurers book their next trek!

**Remember to:**
- Keep dependencies updated
- Monitor server resources
- Backup database regularly
- Test new features before deploying
- Keep security best practices in mind
