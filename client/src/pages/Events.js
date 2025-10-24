import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { trekService } from '../services/api';

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUpcomingEvents();
  }, []);

  const loadUpcomingEvents = async () => {
    try {
      const response = await trekService.getUpcoming();
      setUpcomingEvents(response.data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeUntilEvent = (startDate) => {
    const now = new Date();
    const event = new Date(startDate);
    const diff = event - now;

    if (diff < 0) return 'Event started';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} days`;
    if (hours > 0) return `${hours} hours`;
    return `${minutes} minutes`;
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl text-gray-100">
            Don't miss out on these amazing adventures
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner"></div>
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No upcoming events
              </h3>
              <p className="text-gray-500 mb-6">
                Check back soon for new adventures!
              </p>
              <Link
                to="/treks"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                Browse All Treks
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3 relative h-64 md:h-auto bg-gradient-to-br from-primary-400 to-primary-600">
                      {event.images && event.images[0] ? (
                        <img
                          src={event.images[0]}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Calendar className="h-20 w-20 text-white opacity-50" />
                        </div>
                      )}
                      {/* Countdown Badge */}
                      <div className="absolute top-4 right-4 bg-white rounded-lg px-4 py-2 shadow-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary-600">
                            {getTimeUntilEvent(event.startDate).split(' ')[0]}
                          </div>
                          <div className="text-xs text-gray-600">
                            {getTimeUntilEvent(event.startDate).split(' ')[1]}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-primary-600 uppercase">
                          {event.type}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          event.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          event.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          event.difficulty === 'difficult' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {event.difficulty}
                        </span>
                      </div>

                      <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                        {event.title}
                      </h2>

                      <p className="text-gray-600 mb-6 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                          <div>
                            <div className="text-xs text-gray-500">Start Date</div>
                            <div className="font-semibold">
                              {new Date(event.startDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                          <div>
                            <div className="text-xs text-gray-500">Location</div>
                            <div className="font-semibold">{event.location}</div>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Clock className="h-5 w-5 mr-2 text-primary-600" />
                          <div>
                            <div className="text-xs text-gray-500">Duration</div>
                            <div className="font-semibold">{event.duration}</div>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Users className="h-5 w-5 mr-2 text-primary-600" />
                          <div>
                            <div className="text-xs text-gray-500">Availability</div>
                            <div className="font-semibold">
                              {event.maxParticipants - event.currentParticipants} spots left
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500">Price per person</div>
                          <div className="text-3xl font-bold text-primary-600">
                            ₹{event.price}
                          </div>
                        </div>
                        <Link
                          to={`/treks/${event._id}`}
                          className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                        >
                          View Details & Book
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
            Want to Stay Updated?
          </h2>
          <p className="text-gray-600 mb-6">
            Enable notifications to get real-time updates about new events and important announcements
          </p>
          <button
            onClick={() => {
              if ('Notification' in window) {
                Notification.requestPermission();
              }
            }}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Enable Notifications
          </button>
        </div>
      </section>
    </div>
  );
};

export default Events;
