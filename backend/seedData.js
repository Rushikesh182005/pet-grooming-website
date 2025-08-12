const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
require('dotenv').config({ path: './config.env' });

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pet-grooming');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Service.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'admin@petgrooming.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    // Create sample services
    const services = [
      {
        name: 'Basic Grooming',
        description: 'Complete grooming service including bath, brush, nail trim, and ear cleaning',
        price: 45,
        duration: 60,
        category: 'grooming'
      },
      {
        name: 'Deluxe Grooming',
        description: 'Premium grooming with extra attention to detail, including de-shedding treatment',
        price: 65,
        duration: 90,
        category: 'grooming'
      },
      {
        name: 'Bath & Brush',
        description: 'Thorough bath with premium shampoo and complete brush out',
        price: 35,
        duration: 45,
        category: 'bathing'
      },
      {
        name: 'Nail Trim',
        description: 'Professional nail trimming and filing',
        price: 15,
        duration: 15,
        category: 'health'
      },
      {
        name: 'Ear Cleaning',
        description: 'Deep ear cleaning and inspection',
        price: 12,
        duration: 15,
        category: 'health'
      },
      {
        name: 'Haircut & Style',
        description: 'Custom haircut and styling based on breed standards',
        price: 55,
        duration: 75,
        category: 'styling'
      },
      {
        name: 'Puppy Grooming',
        description: 'Gentle first-time grooming experience for puppies',
        price: 40,
        duration: 45,
        category: 'grooming'
      },
      {
        name: 'Senior Pet Care',
        description: 'Specialized grooming for senior pets with extra care and attention',
        price: 50,
        duration: 60,
        category: 'grooming'
      }
    ];

    for (const serviceData of services) {
      const service = new Service(serviceData);
      await service.save();
    }
    console.log('Sample services created');

    console.log('Seed data completed successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@petgrooming.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Seed data error:', error);
    process.exit(1);
  }
};

seedData();
