import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Scissors, Heart, Star, Clock, Shield } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Loving Care',
      description: 'We treat every pet like family with gentle, loving care.'
    },
    {
      icon: <Scissors className="h-8 w-8" />,
      title: 'Professional Grooming',
      description: 'Expert grooming services by certified professionals.'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safe & Clean',
      description: 'Sterilized equipment and clean environment for your pet\'s safety.'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Convenient Hours',
      description: 'Flexible scheduling to fit your busy lifestyle.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      pet: 'Golden Retriever - Max',
      text: 'Amazing service! Max always comes back happy and looking great.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      pet: 'Persian Cat - Luna',
      text: 'Professional and caring staff. Luna is always comfortable here.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      pet: 'Poodle - Bella',
      text: 'The best grooming experience we\'ve ever had. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Professional Pet Grooming
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Give your furry friend the care they deserve with our professional grooming services. 
                From basic baths to full grooming packages, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking" className="btn-secondary text-lg px-8 py-3">
                  Book Appointment
                </Link>
                <Link to="/services" className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600">
                  View Services
                </Link>
              </div>
            </div>
            <div className="text-center">
              <PawPrint className="h-64 w-64 mx-auto text-primary-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional pet grooming services with a focus on safety, comfort, and quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From basic grooming to specialized treatments, we offer a wide range of services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                <Scissors className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Basic Grooming</h3>
              <p className="text-gray-600 mb-4">
                Complete grooming service including bath, brush, nail trim, and ear cleaning.
              </p>
              <p className="text-2xl font-bold text-primary-600">$45</p>
            </div>
            
            <div className="card text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary-600">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Deluxe Grooming</h3>
              <p className="text-gray-600 mb-4">
                Premium grooming with extra attention to detail and de-shedding treatment.
              </p>
              <p className="text-2xl font-bold text-secondary-600">$65</p>
            </div>
            
            <div className="card text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                <PawPrint className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Puppy Grooming</h3>
              <p className="text-gray-600 mb-4">
                Gentle first-time grooming experience designed specifically for puppies.
              </p>
              <p className="text-2xl font-bold text-primary-600">$40</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary text-lg px-8 py-3">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.pet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Pamper Your Pet?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Book your appointment today and give your furry friend the care they deserve.
          </p>
          <Link to="/booking" className="btn-secondary text-lg px-8 py-3">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
