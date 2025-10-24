import React, { useState } from 'react';
import { Users, Map, Briefcase, Settings, LayoutDashboard } from 'lucide-react';
import ManageTreks from '../components/admin/ManageTreks';
import ManageUsers from '../components/admin/ManageUsers';
import ManageBookings from '../components/admin/ManageBookings';

// Dummy components for now
const AdminDashboard = () => <div className="p-6"><h2>Dashboard</h2><p>Welcome to the admin dashboard. Here you can see an overview of your site's activity.</p></div>;

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'treks':
        return <ManageTreks />;
      case 'bookings':
        return <ManageBookings />;
      case 'users':
        return <ManageUsers />;
      default:
        return <AdminDashboard />;
    }
  };

  const NavItem = ({ tabName, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center w-full px-4 py-3 text-left transition-colors duration-200 rounded-lg ${
        activeTab === tabName
          ? 'bg-primary-600 text-white shadow-lg'
          : 'text-gray-600 hover:bg-primary-100 hover:text-primary-700'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-2xl p-4 flex-shrink-0">
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 px-2 font-display">Admin Panel</h2>
          <nav className="flex flex-col space-y-2">
            <NavItem tabName="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem tabName="treks" icon={Map} label="Manage Treks" />
            <NavItem tabName="bookings" icon={Briefcase} label="Manage Bookings" />
            <NavItem tabName="users" icon={Users} label="Manage Users" />
          </nav>
          <div className="mt-auto">
            <NavItem tabName="settings" icon={Settings} label="Settings" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl min-h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
