import React from 'react';
import { Mountain, Heart, Target, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold mb-6">About Awara Safar</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            We are a passionate group of adventurers dedicated to creating unforgettable trekking and touring experiences
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                Awara Safar was born from a simple idea: to share the joy of exploration and adventure with everyone. What started as a small group of friends trekking on weekends has grown into a vibrant community of adventure enthusiasts.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that the mountains have a way of teaching us about ourselves, building resilience, and creating bonds that last a lifetime. Every trek we organize is carefully planned to ensure safety, enjoyment, and memorable experiences.
              </p>
              <p className="text-gray-600">
                Today, we're expanding beyond treks to include tours and cultural experiences, always staying true to our core values of adventure, community, and sustainability.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg h-96 flex items-center justify-center p-6">
                <img src="/awarasafarlogo.jpg" alt="Awara Safar Logo" className="h-64 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To make adventure accessible to everyone and create a community of responsible travelers who respect nature and local cultures.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Values</h3>
              <p className="text-gray-600">
                Safety first, environmental consciousness, community building, and creating authentic experiences that transform lives.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4">Our Community</h3>
              <p className="text-gray-600">
                A diverse group of adventure lovers from all walks of life, united by the love for exploration and the great outdoors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-5xl font-bold mb-2">3</div>
              <div className="text-primary-100">Treks Organized</div>
            </div>
            <div>
              <div className="font-display text-5xl font-bold mb-2">30+</div>
              <div className="text-primary-100">Happy Trekkers</div>
            </div>
            <div>
              <div className="font-display text-5xl font-bold mb-2">3+</div>
              <div className="text-primary-100">Destinations</div>
            </div>
            <div>
              <div className="font-display text-5xl font-bold mb-2">7</div>
              <div className="text-primary-100">Months Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg">
              Experienced guides and organizers passionate about adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Pranav Surve', role: 'Trek Leader', img: '/pranavsurve.jpg' },
              { name: 'Yash Gade', role: 'Coordinator', img: '/yashgade.jpg' },
              { name: 'Harshal Salunkhe', role: 'Operations', img: '/harshalsalunkhe.jpg' }
            ].map((m) => (
              <div key={m.name} className="text-center">
                <img src={m.img} alt={m.name} className="rounded-full w-48 h-48 object-cover mx-auto mb-4 border-4 border-primary-100" />
                <h3 className="font-semibold text-xl mb-1">{m.name}</h3>
                <p className="text-primary-600 mb-2">{m.role}</p>
                <p className="text-gray-600 text-sm">
                  Passionate about the outdoors and creating safe, memorable treks.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
