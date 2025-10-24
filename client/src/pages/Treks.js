import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, MapPin, Clock, Users, Filter } from 'lucide-react';
import { trekService } from '../services/api';

const Treks = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    difficulty: '',
    status: 'upcoming'
  });

  useEffect(() => {
    loadTreks();
  }, [filters]);

  const loadTreks = async () => {
    try {
      setLoading(true);
      const response = await trekService.getAll(filters);
      setTreks(response.data);
    } catch (error) {
      console.error('Error loading treks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      difficult: 'bg-orange-100 text-orange-800',
      extreme: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl font-bold mb-4">Treks & Tours</h1>
          <p className="text-xl text-gray-100">
            Explore our curated collection of adventures
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white shadow-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold">Filters:</span>
            </div>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Types</option>
              <option value="trek">Trek</option>
              <option value="tour">Tour</option>
            </select>

            <select
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
              <option value="extreme">Extreme</option>
            </select>

            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>

            <button
              onClick={() => setFilters({ type: '', difficulty: '', status: 'upcoming' })}
              className="px-4 py-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Treks Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner"></div>
            </div>
          ) : treks.length === 0 ? (
            <div className="text-center py-20">
              <Mountain className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No treks found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or check back later for new adventures
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treks.map((trek) => (
                <div
                  key={trek._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg card-hover"
                >
                  <div className="relative h-56 bg-gradient-to-br from-primary-400 to-primary-600">
                    {trek.images && trek.images[0] ? (
                      <img
                        src={trek.images[0]}
                        alt={trek.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Mountain className="h-20 w-20 text-white" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(trek.difficulty)}`}>
                        {trek.difficulty}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                      <span className="text-primary-600 font-bold">₹{trek.price}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-primary-600 uppercase">
                        {trek.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(trek.startDate).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-semibold text-xl mb-3">{trek.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {trek.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                        {trek.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-primary-600" />
                        {trek.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-primary-600" />
                        {trek.currentParticipants}/{trek.maxParticipants} participants
                      </div>
                    </div>

                    <Link
                      to={`/treks/${trek._id}`}
                      className="block w-full text-center bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition font-semibold"
                    >
                      View Details & Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Treks;
