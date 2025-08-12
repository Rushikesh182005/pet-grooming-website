import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Clock, DollarSign, CheckCircle } from 'lucide-react';
import api from '../config/api';
import toast from 'react-hot-toast';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/services');
      setServices(response.data);
    } catch (error) {
      toast.error('Failed to load services');
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'grooming', name: 'Grooming' },
    { id: 'bathing', name: 'Bathing' },
    { id: 'styling', name: 'Styling' },
    { id: 'health', name: 'Health' },
    { id: 'other', name: 'Other' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'grooming':
        return <Scissors className="h-6 w-6" />;
      case 'bathing':
        return <CheckCircle className="h-6 w-6" />;
      case 'styling':
        return <Scissors className="h-6 w-6" />;
      case 'health':
        return <CheckCircle className="h-6 w-6" />;
      default:
        return <Scissors className="h-6 w-6" />;
    }
  };

  if (loading) {
    return (
      <div className="section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional pet grooming services tailored to your pet's needs. 
            From basic baths to full grooming packages, we provide comprehensive care.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service._id} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center text-primary-600">
                  {getCategoryIcon(service.category)}
                </div>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {service.category}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{service.duration} min</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-primary-600" />
                  <span className="text-2xl font-bold text-primary-600">
                    ${service.price}
                  </span>
                </div>
              </div>
              
              <Link 
                to="/booking" 
                className="btn-primary w-full text-center"
              >
                Book This Service
              </Link>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services found in this category.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Book Your Appointment?
            </h2>
            <p className="text-gray-600 mb-6">
              Choose from our wide range of services and book your pet's grooming appointment today.
            </p>
            <Link to="/booking" className="btn-primary text-lg px-8 py-3">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
