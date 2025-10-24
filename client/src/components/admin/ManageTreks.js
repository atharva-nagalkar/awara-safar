import React, { useState, useEffect } from 'react';
import { trekService } from '../../services/api';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import TrekForm from './TrekForm';

const ManageTreks = () => {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedTrek, setSelectedTrek] = useState(null);

  // Hoisted so it can be reused by handlers
  const fetchTreks = async () => {
    try {
      setLoading(true);
      const apiBody = await trekService.getAll();
      const list = Array.isArray(apiBody?.data) ? apiBody.data : [];
      setTreks(list); // default to [] to avoid runtime errors
    } catch (err) {
      setError('Failed to fetch treks.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreks();
  }, []);

    const handleSave = async (trekData) => {
    try {
      if (selectedTrek) {
        await trekService.update(selectedTrek._id, trekData);
      } else {
        await trekService.create(trekData);
      }
      setShowForm(false);
      setSelectedTrek(null);
      fetchTreks(); // Refresh the list
    } catch (err) {
      setError('Failed to save trek.');
      console.error(err);
    }
  };

  const handleDelete = async (trekId) => {
    if (window.confirm('Are you sure you want to delete this trek?')) {
      try {
        await trekService.delete(trekId);
        fetchTreks(); // Refresh the list
      } catch (err) {
        setError('Failed to delete trek.');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="p-6">Loading treks...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 font-display">Manage Treks</h2>
                <button onClick={() => { setSelectedTrek(null); setShowForm(true); }} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add New Trek
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {(treks || []).map((trek) => (
              <tr key={trek._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{trek.title}</div>
                  <div className="text-sm text-gray-500">{trek.difficulty}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trek.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{trek.price.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      trek.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {trek.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => { setSelectedTrek(trek); setShowForm(true); }} className="text-primary-600 hover:text-primary-900 mr-4">
                    <Edit className="w-5 h-5" />
                  </button>
                                    <button onClick={() => handleDelete(trek._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <TrekForm
          trek={selectedTrek}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedTrek(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageTreks;
