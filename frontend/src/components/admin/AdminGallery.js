import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import api from '../../config/api';
import toast from 'react-hot-toast';

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    isActive: true,
    order: 0
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await api.get('/api/gallery/all');
      setImages(response.data);
    } catch (error) {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select an image file');
      return;
    }

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('image', selectedFile);
    uploadData.append('title', formData.title);
    uploadData.append('description', formData.description);
    uploadData.append('category', formData.category);

    try {
      await api.post('/api/gallery', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Image uploaded successfully');
      setShowUploadForm(false);
      resetForm();
      fetchGallery();
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await api.delete(`/api/gallery/${id}`);
        toast.success('Image deleted successfully');
        fetchGallery();
      } catch (error) {
        toast.error('Failed to delete image');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'other',
      isActive: true,
      order: 0
    });
    setSelectedFile(null);
  };

  if (loading) {
    return <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Gallery</h1>
        <button
          onClick={() => setShowUploadForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Upload className="h-5 w-5" />
          <span>Upload Image</span>
        </button>
      </div>

      {showUploadForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="input-field"
                >
                  <option value="grooming">Grooming</option>
                  <option value="bathing">Bathing</option>
                  <option value="styling">Styling</option>
                  <option value="before-after">Before & After</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="input-field"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="input-field"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={uploading}
                className="btn-primary disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUploadForm(false);
                  resetForm();
                }}
                className="btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative aspect-square">
              <img
                src={`http://localhost:5000${image.imageUrl}`}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => handleDelete(image._id)}
                  className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
              {image.description && (
                <p className="text-sm text-gray-600 mb-2">{image.description}</p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 capitalize">{image.category}</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  image.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {image.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No images in gallery</p>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
