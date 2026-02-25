# Setup & Installation Guide

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v14 or higher): [Download](https://nodejs.org)
- **npm** (comes with Node.js)
- **MongoDB** (v4.4 or higher): [Download](https://www.mongodb.com/try/download/community)
- **Git**: [Download](https://git-scm.com)
- **Code Editor**: VS Code recommended

## Project Structure

```
digital_library/
├── server/          # Backend application
├── client/          # Frontend application
├── docs/            # Documentation
└── README.md        # Project overview
```

---

## Backend Setup

### Step 1: Navigate to Server Directory

```bash
cd server
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`

### Step 3: Create Environment File

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/digital_library

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_chars

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Admin Configuration
ADMIN_EMAIL=admin@digitallibrary.com
ADMIN_PASSWORD=secure_admin_password
```

### Step 4: Start MongoDB

**On Windows (if installed locally):**
```bash
mongod
```

**Using MongoDB Atlas (Cloud):**
- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create cluster and get connection string
- Update `MONGODB_URI` in `.env`

### Step 5: Start Backend Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Expected output:
```
Server is running on port 5000
MongoDB connected successfully
```

### Verify Backend

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "Server is running",
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

---

## Frontend Setup

### Step 1: Navigate to Client Directory

```bash
cd client
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File (Optional)

Create a `.env` file in the `client` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Start Frontend Development Server

```bash
npm start
```

The application will open automatically at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

---

## Database Setup

### Initial Data Population

Create seed file at `server/scripts/seedData.js`:

```javascript
const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const categories = [
      {
        name: 'Mathematics',
        description: 'Mathematical resources and studies',
        icon: '📐',
        subcategories: ['Algebra', 'Geometry', 'Calculus']
      },
      {
        name: 'Science',
        description: 'Science resources and materials',
        icon: '🔬',
        subcategories: ['Physics', 'Chemistry', 'Biology']
      },
      // Add more categories
    ];

    await Category.insertMany(categories);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedCategories();
```

Run the seed script:
```bash
node server/scripts/seedData.js
```

### MongoDB Collections

The application will automatically create these collections:

- **users**: User accounts and profiles
- **resources**: Educational resources
- **reviews**: User reviews and ratings
- **categories**: Resource categories
- **feedback**: User feedback and reports

### Indexes

Text indexes are created automatically for search functionality.

---

## Cloudinary Setup (Optional)

For file upload functionality:

1. Create account at [Cloudinary](https://cloudinary.com)
2. Get API credentials from dashboard
3. Add to `.env` file:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

---

## Docker Setup (Optional)

### Using Docker Compose

1. Ensure Docker and Docker Compose are installed
2. Create `docker-compose.yml` in project root:

```yaml
version: '3.8'
services:
  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: digital_library

  server:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://mongo:27017/digital_library
      PORT: 5000
    depends_on:
      - mongo

  client:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: http://localhost:5000/api
```

3. Start all services:
```bash
docker-compose up
```

4. Stop all services:
```bash
docker-compose down
```

---

## Testing

### Backend Tests

```bash
cd server
npm test
```

### Frontend Tests

```bash
cd client
npm test
```

### Test Coverage

```bash
npm test -- --coverage
```

---

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
- Ensure MongoDB service is running
- Check MongoDB URI in `.env`
- Verify MongoDB is installed

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Kill process using port 5000
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Module Not Found

**Error**: `Cannot find module 'express'`

**Solution**:
```bash
npm install
```

### CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
- Verify CORS settings in backend `server.js`
- Check API URL in frontend `.env`
- Ensure frontend and backend are both running

### Database Seeding Issues

**Solution**:
```bash
# Clear database
# Connect to MongoDB and run:
# db.dropDatabase()

# Then reseed
node server/scripts/seedData.js
```

---

## Development Workflow

### 1. Code Organization

```
backend/
├── models/         # Database schemas
├── routes/         # API endpoints
├── middleware/     # Custom middleware
└── scripts/        # Utility scripts

frontend/
├── components/     # Reusable components
├── pages/          # Page components
├── api/            # API integration
└── styles/         # CSS files
```

### 2. Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to repository
git push origin feature/new-feature

# Create pull request
```

### 3. Code Style

- Use ESLint for JavaScript linting
- Follow Node.js conventions for backend
- Follow React best practices for frontend
- Use meaningful variable and function names

---

## Performance Optimization

### Backend

```bash
# Install compression
npm install compression

# Install helmet for security
npm install helmet
```

### Frontend

```bash
# Optimize images
npm install image-webpack-loader

# Analyze bundle size
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

---

## Deployment

### Deploy Backend

**Heroku:**
```bash
heroku create digital-library-api
git push heroku main
```

**AWS:**
- Use EC2 with Node.js
- Set up RDS for MongoDB
- Configure environment variables

### Deploy Frontend

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
- Connect GitHub repository
- Set build command: `npm run build`
- Set publish directory: `build/`

---

## Maintenance

### Regular Tasks

1. **Database Maintenance**
   - Monitor database size
   - Create regular backups
   - Archive old records

2. **Security Updates**
   - Keep dependencies updated: `npm audit fix`
   - Review security logs
   - Update SSL certificates

3. **Performance Monitoring**
   - Monitor server metrics
   - Check API response times
   - Track user analytics

4. **Backup Strategy**
   - Daily database backups
   - Version control backups
   - File storage backups

---

## Useful Commands

```bash
# Backend
cd server
npm install              # Install dependencies
npm start               # Production server
npm run dev             # Development server
npm test                # Run tests
npm audit               # Security audit

# Frontend
cd client
npm install             # Install dependencies
npm start               # Development server
npm run build           # Production build
npm test                # Run tests
npm run eject           # Eject from create-react-app

# General
git status              # Check git status
git log                 # View commit history
npm outdated            # Check for outdated packages
```

---

## Support & Resources

- **Node.js Docs**: [nodejs.org](https://nodejs.org/docs)
- **React Docs**: [react.dev](https://react.dev)
- **MongoDB Docs**: [mongodb.com/docs](https://docs.mongodb.com)
- **Express Docs**: [expressjs.com](https://expressjs.com)

---

**Setup Guide Version**: 1.0  
**Last Updated**: February 2026
