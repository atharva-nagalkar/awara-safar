import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Calendar, Users, Award, ArrowRight, MapPin, Clock } from 'lucide-react';
import { trekService, contactService } from '../services/api';

const Home = () => {
  const [featuredTreks, setFeaturedTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  // Booking modal state
  const [showBooking, setShowBooking] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [booking, setBooking] = useState({ name: '', age: '', email: '', phone: '', address: '' });

  useEffect(() => {
    loadFeaturedTreks();
  }, []);

  // Hero slider
  const heroImages = useMemo(
    () => [
      '/hero/1.jpg',
      '/hero/2.jpg',
      '/hero/3.jpg',
      '/hero/4.jpg'
    ],
    []
  );
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [heroImages.length]);

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

  // Animations (ensure GSAP is ready; retry if loading late)
  useEffect(() => {
    let attempts = 0;
    const init = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap) {
        if (attempts < 10) {
          attempts += 1;
          setTimeout(init, 150);
        }
        return;
      }
      if (ScrollTrigger && gsap.registerPlugin) gsap.registerPlugin(ScrollTrigger);

      gsap.from('.anim-hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 });
      gsap.from('.anim-hero-sub', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 });
      gsap.from('.anim-hero-ctas > *', { y: 10, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 });

      if (ScrollTrigger) {
        gsap.to('.parallax-y', {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.utils.toArray('.anim-fade-up').forEach((el) => {
          gsap.from(el, {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 80%' }
          });
        });
      }
    };
    init();
  }, []);


  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingSubmitting(true);
    setBookingError('');
    setBookingSuccess(false);
    try {
      const message = `New Rajgad Trek Booking\n\nName: ${booking.name}\nAge: ${booking.age}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nAddress: ${booking.address}`;
      await contactService.send({
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        subject: 'Rajgad Trek Booking',
        message
      });
      setBookingSuccess(true);
      setBooking({ name: '', age: '', email: '', phone: '', address: '' });
    } catch (err) {
      setBookingError(err?.response?.data?.message || 'Failed to submit booking. Please try again.');
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section: Auto-sliding images */}
      <section className="hero-section relative h-[75vh] md:h-[80vh] flex items-center justify-center text-white mt-16 md:mt-20">
        <div className="relative w-full h-full">
          {/* Slides container */}
          <div className="relative h-full overflow-hidden">
            {heroImages.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt="Awara Safar hero"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  idx === slide ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            {/* dark overlay */}
            <div className="parallax-y absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-5xl">
              <h1 className="anim-hero-title font-display text-5xl md:text-7xl font-bold mb-6">
                Adventure Awaits
              </h1>
              <p className="anim-hero-sub text-xl md:text-2xl mb-8 text-gray-100">
                Discover the thrill of trekking with Awara Safar. Your journey to unforgettable experiences starts here.
              </p>
              <div className="anim-hero-ctas flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
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
                  Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="font-display text-2xl font-bold text-gray-900">Book Rajgad Trek</h3>
            </div>
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required name="name" value={booking.name} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input required type="number" min="1" name="age" value={booking.age} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" name="email" value={booking.email} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input required name="phone" value={booking.phone} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea required name="address" value={booking.address} onChange={handleBookingChange} rows="3" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowBooking(false)} className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
                <button type="submit" disabled={bookingSubmitting} className="px-5 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60">{bookingSubmitting ? 'Submitting...' : 'Submit Booking'}</button>
              </div>
              {bookingError && <div className="text-red-600 text-sm">{bookingError}</div>}
              {bookingSuccess && <div className="text-green-600 text-sm">Thank you! We have received your booking.</div>}
            </form>
          </div>
        </div>
      )}

      {/* Upcoming Trek Promo: Rajgad */}
      <section className="py-20 bg-white anim-fade-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Upcoming: Rajgad Trek</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {`Let’s escape the city and conquer the mighty Rajgad 🏔️✨\nJoin us for an unforgettable trekking experience with Awara Safar! 🚶‍♂️🌿\n📅 1st–2nd Nov | 💰 ₹1499 only\nTravel • Food • First-Aid • Guide — Everything’s sorted! 🔥\nTag your trek buddies and get ready for adventure 💪`}
              </p>
              <div className="mt-6">
                <button onClick={() => setShowBooking(true)} className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition">
                  Book Rajgad
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="h-64 md:h-80 rounded-xl overflow-hidden bg-gray-200">
              <img
                src="/rajgad.jpg"
                alt="Rajgad Trek"
                className="w-full h-full object-cover"
              />
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
