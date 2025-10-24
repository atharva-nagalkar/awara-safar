import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Calendar, Users, Award, ArrowRight, MapPin, Clock } from 'lucide-react';
import { trekService } from '../services/api';

const Home = () => {
  const [featuredTreks, setFeaturedTreks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedTreks();
  }, []);

  const loadFeaturedTreks = async () => {
    try {
      const response = await trekService.getAll({ featured: true });
      setFeaturedTreks(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error loading featured treks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
            Adventure Awaits
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Discover the thrill of trekking with Awara Safar. Your journey to unforgettable experiences starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/treks"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
            >
              Explore Treks
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/events"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center justify-center"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Upcoming Trek Promo: Rajgad */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Upcoming: Rajgad Trek</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {`Let’s escape the city and conquer the mighty Rajgad 🏔️✨\nJoin us for an unforgettable trekking experience with Awara Safar! 🚶‍♂️🌿\n📅 1st–2nd Nov | 💰 ₹1499 only\nTravel • Food • First-Aid • Guide — Everything’s sorted! 🔥\nTag your trek buddies and get ready for adventure 💪`}
              </p>
              <div className="mt-6">
                <Link to="/treks" className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition">
                  Book Rajgad
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <Mountain className="h-24 w-24 text-white opacity-80" />
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Why Choose Awara Safar?
            </h2>
            <p className="text-gray-600 text-lg">
              We make your adventure dreams come true with professional guidance and care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 card-hover">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Expert Guides</h3>
              <p className="text-gray-600">
                Experienced trek leaders ensure your safety and enjoyment
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 card-hover">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Regular Events</h3>
              <p className="text-gray-600">
                Weekly treks and tours to amazing destinations
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 card-hover">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Community</h3>
              <p className="text-gray-600">
                Join a vibrant community of adventure enthusiasts
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-xl transition-all duration-300 card-hover">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Best Value</h3>
              <p className="text-gray-600">
                Affordable packages without compromising on quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Treks Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Featured Treks
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked adventures for the ultimate experience
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTreks.map((trek) => (
                <div
                  key={trek._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg card-hover"
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600">
                    {trek.images && trek.images[0] ? (
                      <img
                        src={trek.images[0]}
                        alt={trek.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Mountain className="h-16 w-16 text-white" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-primary-600 font-semibold">
                        ₹{trek.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{trek.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {trek.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {trek.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      {trek.duration}
                    </div>
                    <Link
                      to={`/treks/${trek._id}`}
                      className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/treks"
              className="inline-flex items-center bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              View All Treks
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-display text-4xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Join thousands of adventurers who have discovered their passion with Awara Safar
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
