import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { uploadService } from '../../services/api';

const TrekForm = ({ trek, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'trek',
    difficulty: 'easy',
    duration: '',
    price: '',
    location: '',
    startDate: '',
    endDate: '',
    maxParticipants: '',
    status: 'upcoming',
    featured: false,
    highlights: '',
    included: '',
    excluded: '',
    images: [],
  });
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (trek) {
      setFormData({
        ...trek,
        startDate: trek.startDate ? new Date(trek.startDate).toISOString().split('T')[0] : '',
        endDate: trek.endDate ? new Date(trek.endDate).toISOString().split('T')[0] : '',
        highlights: trek.highlights ? trek.highlights.join(', ') : '',
        included: trek.included ? trek.included.join(', ') : '',
        excluded: trek.excluded ? trek.excluded.join(', ') : '',
        images: trek.images || [],
      });
    } else {
      // Reset form for new trek
      setFormData({
        title: '', description: '', type: 'trek', difficulty: 'easy', duration: '',
        price: '', location: '', startDate: '', endDate: '', maxParticipants: '', status: 'upcoming',
        featured: false, highlights: '', included: '', excluded: '', images: [],
      });
    }
  }, [trek]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      price: Number(formData.price),
      maxParticipants: Number(formData.maxParticipants),
      highlights: formData.highlights.split(',').map(s => s.trim()),
      included: formData.included.split(',').map(s => s.trim()),
      excluded: formData.excluded.split(',').map(s => s.trim()),
      images: formData.images,
    };
    onSave(dataToSave);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadService.uploadTrekImage(file);
      if (res?.success && res.url) {
        setFormData(prev => ({ ...prev, images: [...(prev.images || []), res.url] }));
      }
    } catch (err) {
      console.error('Image upload failed', err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleAddImageUrl = () => {
    const url = imageUrlInput.trim();
    if (!url) return;
    setFormData(prev => ({ ...prev, images: [...(prev.images || []), url] }));
    setImageUrlInput('');
  };

  const handleRemoveImage = (idx) => {
    setFormData(prev => ({ ...prev, images: (prev.images || []).filter((_, i) => i !== idx) }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold font-display text-gray-800">{trek ? 'Edit Trek' : 'Add New Trek'}</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-4">
              <InputField name="title" label="Title" value={formData.title} onChange={handleChange} required />
              <TextAreaField name="description" label="Description" value={formData.description} onChange={handleChange} required />
              <InputField name="location" label="Location" value={formData.location} onChange={handleChange} required />
              <InputField name="duration" label="Duration (e.g., 5 Days)" value={formData.duration} onChange={handleChange} required />
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField name="price" label="Price (₹)" type="number" value={formData.price} onChange={handleChange} required />
                <InputField name="maxParticipants" label="Max Participants" type="number" value={formData.maxParticipants} onChange={handleChange} required />
              </div>
              <InputField name="startDate" label="Start Date" type="date" value={formData.startDate} onChange={handleChange} required />
              <InputField name="endDate" label="End Date" type="date" value={formData.endDate} onChange={handleChange} required />
              <div className="grid grid-cols-2 gap-4">
                <SelectField name="type" label="Type" value={formData.type} onChange={handleChange} options={['trek', 'tour']} />
                <SelectField name="difficulty" label="Difficulty" value={formData.difficulty} onChange={handleChange} options={['easy', 'moderate', 'difficult', 'extreme']} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SelectField name="status" label="Status" value={formData.status} onChange={handleChange} options={['upcoming', 'ongoing', 'completed', 'cancelled']} />
                <CheckboxField name="featured" label="Featured Trek" checked={formData.featured} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <TextAreaField name="highlights" label="Highlights (comma-separated)" value={formData.highlights} onChange={handleChange} rows={2} />
            <TextAreaField name="included" label="Included (comma-separated)" value={formData.included} onChange={handleChange} rows={2} />
            <TextAreaField name="excluded" label="Excluded (comma-separated)" value={formData.excluded} onChange={handleChange} rows={2} />
          </div>

          <div className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
            <div className="flex items-center space-x-4">
              <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
              <span className="text-sm text-gray-500">{uploading ? 'Uploading...' : 'Upload to Cloudinary'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Or paste image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="button" onClick={handleAddImageUrl} className="px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700">Add</button>
            </div>
            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img src={url} alt="trek" className="w-full h-32 object-cover rounded-lg border" />
                    <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute top-2 right-2 bg-white/90 text-red-600 rounded-full p-1 shadow hover:bg-white">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-6 border-t mt-6">
            <button type="button" onClick={onCancel} className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 mr-4">Cancel</button>
            <button type="submit" className="px-6 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700">Save Trek</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper components for form fields
const InputField = ({ name, label, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input id={name} name={name} {...props} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
  </div>
);

const TextAreaField = ({ name, label, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea id={name} name={name} {...props} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
  </div>
);

const SelectField = ({ name, label, options, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select id={name} name={name} {...props} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
      {options.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
    </select>
  </div>
);

const CheckboxField = ({ name, label, ...props }) => (
  <div className="flex items-center h-full pt-6">
    <input id={name} name={name} type="checkbox" {...props} className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" />
    <label htmlFor={name} className="ml-2 block text-sm text-gray-900">{label}</label>
  </div>
);

export default TrekForm;
