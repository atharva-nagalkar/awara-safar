import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Users, Calendar, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { trekService, bookingService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const TrekDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    numberOfPeople: 1,
    specialRequests: '',
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    }
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    loadTrek();
  }, [id]);

  const loadTrek = async () => {
    try {
      const response = await trekService.getById(id);
      setTrek(response.data);
    } catch (error) {
      console.error('Error loading trek:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/treks/${id}` } });
      return;
    }

    setBookingLoading(true);
    try {
      await bookingService.create({
        trek: id,
        ...booking
      });
      alert('Booking successful! Check your dashboard for details.');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!trek) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Trek not found</h2>
          <button
            onClick={() => navigate('/treks')}
            className="mt-4 text-primary-600 hover:text-primary-700"
          >
            Back to Treks
          </button>
        </div>
      </div>
    );
  }

  const spotsLeft = trek.maxParticipants - trek.currentParticipants;
  const isAvailable = spotsLeft > 0 && trek.status === 'upcoming';

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-96 bg-gradient-to-br from-primary-400 to-primary-600">
        {trek.images && trek.images[0] ? (
          <img
            src={trek.images[0]}
            alt={trek.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <MapPin className="h-32 w-32 text-white opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <button
          onClick={() => navigate('/treks')}
          className="absolute top-8 left-8 bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-primary-600 uppercase">
                  {trek.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  trek.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  trek.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  trek.difficulty === 'difficult' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {trek.difficulty}
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
                {trek.title}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                  <span>{trek.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2 text-primary-600" />
                  <span>{trek.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2 text-primary-600" />
                  <span>{trek.currentParticipants}/{trek.maxParticipants}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                  <span>{new Date(trek.startDate).toLocaleDateString()}</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8">
                {trek.description}
              </p>

              {/* Highlights */}
              {trek.highlights && trek.highlights.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-bold mb-4">Highlights</h2>
                  <ul className="space-y-2">
                    {trek.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Included/Excluded */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {trek.included && trek.included.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-green-600">
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {trek.included.map((item, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {trek.excluded && trek.excluded.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-red-600">
                      What's Not Included
                    </h3>
                    <ul className="space-y-2">
                      {trek.excluded.map((item, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <XCircle className="h-4 w-4 text-red-600 mr-2 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Itinerary */}
              {trek.itinerary && trek.itinerary.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold mb-4">Itinerary</h2>
                  <div className="space-y-4">
                    {trek.itinerary.map((day, index) => (
                      <div key={index} className="border-l-4 border-primary-600 pl-4">
                        <h4 className="font-semibold text-lg">Day {day.day}: {day.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  ₹{trek.price}
                </div>
                <div className="text-gray-600">per person</div>
              </div>

              {isAvailable ? (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-green-800 text-sm font-semibold text-center">
                      {spotsLeft} spots left!
                    </p>
                  </div>

                  {!showBookingForm ? (
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                    >
                      Book Now
                    </button>
                  ) : (
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Number of People
                        </label>
                        <input
                          type="number"
                          min="1"
                          max={spotsLeft}
                          value={booking.numberOfPeople}
                          onChange={(e) => setBooking({ ...booking, numberOfPeople: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          value={booking.specialRequests}
                          onChange={(e) => setBooking({ ...booking, specialRequests: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          rows="3"
                        ></textarea>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3">Emergency Contact</h4>
                        <input
                          type="text"
                          placeholder="Name"
                          value={booking.emergencyContact.name}
                          onChange={(e) => setBooking({
                            ...booking,
                            emergencyContact: { ...booking.emergencyContact, name: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
                          required
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={booking.emergencyContact.phone}
                          onChange={(e) => setBooking({
                            ...booking,
                            emergencyContact: { ...booking.emergencyContact, phone: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-2"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Relation"
                          value={booking.emergencyContact.relation}
                          onChange={(e) => setBooking({
                            ...booking,
                            emergencyContact: { ...booking.emergencyContact, relation: e.target.value }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between mb-2">
                          <span>Price per person:</span>
                          <span>₹{trek.price}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Number of people:</span>
                          <span>{booking.numberOfPeople}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span className="text-primary-600">
                            ₹{trek.price * booking.numberOfPeople}
                          </span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={bookingLoading}
                        className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
                      >
                        {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBookingForm(false)}
                        className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-800 font-semibold">
                    {trek.status === 'completed' ? 'Trek Completed' : 'Fully Booked'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrekDetail;
