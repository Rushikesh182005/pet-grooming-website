# Pet Grooming Website - MERN Stack

A fully functional pet grooming business website built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring a modern, responsive design and comprehensive admin panel.

## Features

### Public Website
- **Home Page**: Hero section, features, services preview, testimonials
- **Services Page**: Display all grooming services with filtering by category
- **Gallery Page**: Image gallery with category filtering and modal view
- **Booking Form**: Complete appointment booking system with service selection
- **Contact Page**: Contact information and FAQ section

### Admin Panel (JWT Protected)
- **Dashboard Overview**: Statistics and recent bookings
- **Services Management**: Add, edit, delete grooming services
- **Bookings Management**: View, update status, and manage appointments
- **Gallery Management**: Upload, organize, and delete gallery images

### Technical Features
- **Authentication**: JWT-based admin login system
- **File Upload**: Image upload for gallery with multer
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live status updates and notifications
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **express-validator** - Input validation

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pet-grooming-website
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pet-grooming
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Database Setup**
   
   Make sure MongoDB is running locally or update the MONGODB_URI to point to your MongoDB instance.

5. **Seed Data**
   
   Run the seed script to populate the database with initial data:
   ```bash
   cd backend
   node seedData.js
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Production Mode

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd backend
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user

### Services
- `GET /api/services` - Get all active services
- `GET /api/services/all` - Get all services (admin)
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/:id` - Get booking by ID (admin)
- `PUT /api/bookings/:id/status` - Update booking status (admin)
- `PUT /api/bookings/:id` - Update booking (admin)
- `DELETE /api/bookings/:id` - Delete booking (admin)

### Gallery
- `GET /api/gallery` - Get all active gallery images
- `GET /api/gallery/all` - Get all gallery images (admin)
- `POST /api/gallery` - Upload image (admin)
- `PUT /api/gallery/:id` - Update gallery item (admin)
- `DELETE /api/gallery/:id` - Delete gallery item (admin)

## Default Admin Credentials

After running the seed script, you can login with:
- **Email**: admin@petgrooming.com
- **Password**: admin123

## Project Structure

```
pet-grooming-website/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── uploads/         # Uploaded images
│   ├── server.js        # Main server file
│   ├── seedData.js      # Database seeding
│   └── config.env       # Environment variables
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   └── index.js     # App entry point
│   └── package.json
└── package.json         # Root package.json
```

## Features in Detail

### Booking System
- Multi-service selection with automatic price calculation
- Date and time slot selection
- Customer and pet information collection
- Special requests and notes
- Email notifications (can be extended)

### Admin Dashboard
- Real-time statistics overview
- Booking management with status updates
- Service CRUD operations
- Gallery management with image upload
- Responsive admin interface

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- Input validation and sanitization
- File upload security

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying the color scheme in `tailwind.config.js`
- Updating component styles in the respective files
- Adding custom CSS classes

### Content
- Update business information in the footer and contact pages
- Modify service categories and descriptions
- Add your own gallery images
- Customize the booking form fields

### Configuration
- Update environment variables for different environments
- Modify MongoDB connection settings
- Adjust file upload limits and allowed types
- Configure JWT token expiration

## Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Update environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `build` folder to platforms like Netlify, Vercel, or AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Note**: This is a demo application. For production use, make sure to:
- Change default admin credentials
- Use strong JWT secrets
- Implement proper email functionality
- Add rate limiting
- Set up proper logging
- Configure CORS properly
- Use HTTPS in production
