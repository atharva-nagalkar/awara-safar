import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, MapPin, Clock, Users } from 'lucide-react';
import { trekService } from '../services/api';

const Treks = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSections();
  }, []);

  // Animations (safe guards)
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap) return;
    if (ScrollTrigger && gsap.registerPlugin) gsap.registerPlugin(ScrollTrigger);

    // Header fade/slide
    gsap.from('.treks-header-title', { y: 24, opacity: 0, duration: 0.8, ease: 'power2.out' });
    gsap.from('.treks-header-sub', { y: 16, opacity: 0, duration: 0.8, delay: 0.1, ease: 'power2.out' });

    if (ScrollTrigger) {
      // Upcoming grid cards
      gsap.utils.toArray('.upcoming-grid .trek-card').forEach((el, i) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          rotate: i % 2 === 0 ? -1.5 : 1.5,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });
      // Past grid cards
      gsap.utils.toArray('.past-grid .trek-card').forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -24 : 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });
    }
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      const [upc, pst] = await Promise.all([
        trekService.getAll({ status: 'upcoming' }),
        trekService.getAll({ status: 'completed' })
      ]);
      setUpcoming(Array.isArray(upc.data) ? upc.data : []);
      setPast(Array.isArray(pst.data) ? pst.data : []);
    } catch (error) {
      console.error('Error loading treks:', error);
    } finally {
      setLoading(false);
    }
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
          <h1 className="treks-header-title font-display text-5xl font-bold mb-4">Trek</h1>
          <p className="treks-header-sub text-xl text-gray-100">
            Explore our curated collection of adventures
          </p>
        </div>
      </section>

      {/* Sections */}

      {/* Upcoming Treks */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 upcoming-grid">
          <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">Upcoming Treks</h2>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner"></div>
            </div>
          ) : upcoming.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="trek-card bg-white rounded-xl overflow-hidden shadow-lg card-hover">
                <div className="relative h-56 bg-gray-200">
                  <img src="/rajgad.jpg" alt="Rajgad Trek" className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor('moderate')}`}>moderate</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                    <span className="text-primary-600 font-bold">₹1499</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary-600 uppercase">trek</span>
                    <span className="text-xs text-gray-500">1–2 Nov</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Rajgad</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">Let’s escape the city and conquer the mighty Rajgad. Travel • Food • First-Aid • Guide included.</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-primary-600" /> Pune District
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-primary-600" /> 2 Days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map((trek) => (
                <div
                  key={trek._id}
                  className="trek-card bg-white rounded-xl overflow-hidden shadow-lg card-hover"
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

      {/* Past Treks */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 past-grid">
          <h2 className="text-3xl font-display font-bold mb-6 text-gray-900">Past Treks</h2>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner"></div>
            </div>
          ) : past.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="trek-card bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="h-56 bg-gray-200">
                  <img src="/kalsubai.jpg" alt="Kalsubai Trek" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Kalsubai</h3>
                  <p className="text-gray-600 text-sm mb-2">Ahmednagar District</p>
                  <p className="text-gray-600 text-sm">Maharashtra’s highest peak—an exhilarating climb with breathtaking Sahyadri views and unforgettable sunrise moments.</p>
                </div>
              </div>
              <div className="trek-card bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="h-56 bg-gray-200">
                  <img src="/kalmandavi.jpg" alt="Kalmandavi Waterfall Trek" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Kalmandavi Waterfall</h3>
                  <p className="text-gray-600 text-sm mb-2">Nashik Region</p>
                  <p className="text-gray-600 text-sm">A refreshing monsoon trail through lush forests leading to the roaring Kalmandavi cascade—perfect for nature lovers and photographers.</p>
                </div>
              </div>
              <div className="trek-card bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="h-56 bg-gray-200">
                  <img src="/harishchandragad.jpg" alt="Harishchandragad Trek" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">Harishchandragad</h3>
                  <p className="text-gray-600 text-sm mb-2">Ahmednagar District</p>
                  <p className="text-gray-600 text-sm">A classic Sahyadri fort trek known for its Konkankada cliff and stunning sunsets. Perfect for monsoon and winter seasons.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {past.map((trek) => (
                <div key={trek._id} className="trek-card bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="relative h-56 bg-gray-200">
                    {trek.images && trek.images[0] ? (
                      <img src={trek.images[0]} alt={trek.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Mountain className="h-20 w-20 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{trek.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{trek.location}</p>
                    <p className="text-gray-600 text-sm line-clamp-2">{trek.description}</p>
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
