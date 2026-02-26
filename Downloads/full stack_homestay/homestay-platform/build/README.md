# Homestay Platform - React Application

A comprehensive platform connecting travelers with homestay options and providing information about nearby tourist attractions.

## Advanced Features

### 🔐 Authentication System
- **Separate Login & Register Pages** with form validation
- Email and password-based authentication
- Role-based access control (Admin, Host, Tourist, Guide)
- Secure user registration with password confirmation

### 💳 Payment Integration
- **Payment Modal** for all bookings
- Credit/Debit card details collection
- Check-in and check-out date selection
- Secure payment confirmation flow

### 📊 Analytics Dashboard (Admin)
- Real-time platform statistics
- Total users, homestays, and bookings tracking
- Revenue monitoring
- Active users analytics
- Visual stat cards with icons

### 🔔 Notifications System
- Real-time notification panel
- Booking alerts
- Payment confirmations
- Review notifications
- Read/unread status tracking

### 🔍 Advanced Search & Filters
- Location-based search
- Price range filtering
- Room count filtering
- Rating-based filtering
- Amenities multi-select filter
- Apply and reset filter options

### ⭐ Reviews & Ratings
- User review submission
- Star rating system (1-5 stars)
- Review display with user details
- Date-stamped reviews

### ❤️ Wishlist Feature
- Save favorite homestays
- Quick access to saved properties
- Remove from wishlist option

## Features by Role

### 👨💼 Admin Dashboard
- Platform analytics and insights
- Manage platform users (activate/block/delete)
- Approve/reject homestay listings
- Manage tourist attractions content
- Monitor platform activity

### 🏠 Homestay Host Dashboard
- List and manage homestays
- Add new homestay properties with detailed forms
- View and manage booking requests
- Accept/reject guest bookings
- Real-time notifications for bookings and payments

### 🧳 Tourist Dashboard
- Advanced search with multiple filters
- View homestay details with ratings and amenities
- Secure payment processing for bookings
- View and manage bookings
- Wishlist management
- Explore nearby tourist attractions
- Write reviews for stayed properties

### 🗺️ Local Guide Dashboard
- Share local insights and tips
- Add recommendations for restaurants, activities, and attractions
- Provide personalized travel advice
- Track engagement (likes on insights)

## Project Structure

```
src/
├── components/
│   ├── Admin/
│   │   ├── AdminDashboard.js
│   │   ├── AdminDashboard.css
│   │   ├── ManageUsers.js
│   │   ├── ManageUsers.css
│   │   ├── ManageHomestays.js
│   │   ├── ManageContent.js
│   │   ├── Analytics.js
│   │   └── Analytics.css
│   ├── Host/
│   │   ├── HostDashboard.js
│   │   ├── MyHomestays.js
│   │   ├── AddHomestay.js
│   │   └── Bookings.js
│   ├── Tourist/
│   │   ├── TouristDashboard.js
│   │   ├── SearchHomestays.js
│   │   ├── MyBookings.js
│   │   ├── Attractions.js
│   │   ├── Wishlist.js
│   │   ├── AdvancedFilter.js
│   │   └── AdvancedFilter.css
│   ├── Guide/
│   │   ├── GuideDashboard.js
│   │   ├── LocalInsights.js
│   │   └── Recommendations.js
│   └── Common/
│       ├── Login.js
│       ├── Register.js
│       ├── Auth.css
│       ├── Header.js
│       ├── Header.css
│       ├── PaymentModal.js
│       ├── PaymentModal.css
│       ├── Notifications.js
│       ├── Notifications.css
│       ├── Reviews.js
│       └── Reviews.css
├── App.js
└── App.css
```

## Installation & Setup

1. Navigate to the project directory:
```bash
cd homestay-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Usage

1. **Register**: Create a new account by selecting your role and providing details
2. **Login**: Use your email and password to access the platform
3. **Navigate**: Use the sidebar to access different features based on your role
4. **Book with Payment**: Select a homestay, fill payment details, and confirm booking
5. **Manage**: Hosts can manage properties, tourists can track bookings

## User Roles

- **Admin**: Full platform management with analytics
- **Homestay Host**: Property and booking management with notifications
- **Tourist**: Search, filter, book with payment, wishlist, and reviews
- **Local Guide**: Share insights and recommendations

## Technologies Used

- React 18
- CSS3
- React Hooks (useState)
- Component-based architecture
- Modal-based UI patterns

## Key Components

- **PaymentModal**: Secure payment processing interface
- **AdvancedFilter**: Multi-criteria search filtering
- **Analytics**: Real-time dashboard statistics
- **Notifications**: Alert system for all users
- **Reviews**: Rating and feedback system
- **Wishlist**: Save favorite properties

## Future Enhancements

- Backend API integration with Node.js/Express
- Database integration (MongoDB/PostgreSQL)
- Real payment gateway (Stripe/Razorpay)
- Image upload and gallery
- Google Maps integration
- Email/SMS notifications
- Chat system between hosts and guests
- Multi-language support
- Mobile responsive optimization
- Progressive Web App (PWA)

## License

This project is created for educational purposes.
