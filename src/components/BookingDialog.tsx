import React, { useState } from 'react';
import { Calendar, Star, X, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

interface PackageDetails {
  name?: string;
  image?: string;
  duration?: string;
  rating?: number;
  price?: string;
  highlights?: string;
  includes?: string[];
  destination?: string;
  date?: string;
}

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  packageDetails: PackageDetails | null;
}

export function BookingDialog({ isOpen, onClose, packageDetails }: BookingDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    persons: '',
    destination: packageDetails?.destination || '',
    budget: '',
    date: packageDetails?.date || '',
    tourDetails: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Update form when packageDetails changes
  React.useEffect(() => {
    if (packageDetails) {
      setFormData(prev => ({
        ...prev,
        destination: packageDetails.destination || prev.destination,
        date: packageDetails.date || prev.date,
      }));
    }
  }, [packageDetails]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.persons.trim()) {
      newErrors.persons = 'Number of persons is required';
    } else if (parseInt(formData.persons) < 1) {
      newErrors.persons = 'Please enter at least 1 person';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields correctly',
        confirmButtonColor: '#2563eb',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/booking', {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        persons: formData.persons,
        destination: formData.destination,
        budget: formData.budget,
        date: formData.date,
        tourDetails: formData.tourDetails,
        packageName: packageDetails?.name,
        packagePrice: packageDetails?.price,
        packageDuration: packageDetails?.duration,
      });

      const data = response.data;

      if (data.isSuccess) {
        await Swal.fire({
          icon: 'success',
          title: 'Booking Submitted Successfully!',
          text: 'Thank you for your interest. We will contact you within 24 hours.',
          confirmButtonColor: '#2563eb',
          confirmButtonText: 'OK',
        });
        handleClose();
      } else {
        throw new Error(data.message || 'Failed to submit booking');
      }
    } catch (error: any) {
      console.error('Booking submission error:', error);
      
      let errorMessage = 'There was an error submitting your booking. Please try again later or contact us directly.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      await Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: errorMessage,
        confirmButtonColor: '#dc2626',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      persons: '',
      destination: '',
      budget: '',
      date: '',
      tourDetails: '',
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="custom-dialog-overlay" onClick={handleClose}>
      <div className="custom-dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="custom-dialog-header rounded-t-xl">
          <h2>Plan Your Future Journey</h2>
          <button className="custom-dialog-close" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        <div className="custom-dialog-body">
          {packageDetails && packageDetails.name && (
            <div className="custom-package-info">
              {packageDetails.image && (
                <div className="custom-package-image">
                  <img src={packageDetails.image} alt={packageDetails.name || 'Package'} />
                </div>
              )}
              
              <h3>{packageDetails.name}</h3>
              {packageDetails.duration && (
                <p>
                  <Calendar size={16} className="inline" /> {packageDetails.duration}
                </p>
              )}
              {packageDetails.price && (
                <div className="custom-package-price">
                  <span>{packageDetails.price}</span>
                  <span>/person</span>
            </div>
              )}
              {packageDetails.highlights && (
                <div className="custom-package-section">
                  <p>
                    <Star size={16} className="inline" /> Highlights
                  </p>
                  <p>{packageDetails.highlights}</p>
            </div>
              )}
              {packageDetails.includes && packageDetails.includes.length > 0 && (
                <div className="custom-package-section">
                  <p>Package Includes:</p>
                  <div className="custom-includes-grid">
                {packageDetails.includes.map((item, idx) => (
                      <div key={idx} className="custom-include-item">
                        <span>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
              )}
          </div>
        )}

          <form onSubmit={handleSubmit} className="custom-booking-form">
            <div className="custom-form-row">
              <div className="custom-form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                  className={errors.name ? 'error-input' : ''}
              />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
              <div className="custom-form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                  className={errors.phone ? 'error-input' : ''}
              />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="custom-form-group">
              <label>Email Address *</label>
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error-input' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="custom-form-row">
              <div className="custom-form-group">
                <label>Number of Persons *</label>
                <input 
                  type="number" 
                name="persons"
                placeholder="Enter number of persons"
                value={formData.persons}
                onChange={handleChange}
                min="1"
                  className={errors.persons ? 'error-input' : ''}
                />
                {errors.persons && <span className="error-message">{errors.persons}</span>}
              </div>
              <div className="custom-form-group">
                <label>Destination</label>
                <input type="text" name="destination" placeholder="Enter destination" value={formData.destination} onChange={handleChange} />
              </div>
            </div>

            <div className="custom-form-row">
              <div className="custom-form-group">
                <label>Budget Per Person</label>
                <input type="text" name="budget" placeholder="Enter budget per person" value={formData.budget} onChange={handleChange} />
              </div>
              <div className="custom-form-group">
                <label>Preferred Travel Date</label>
                <div className="custom-date-wrapper">
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="custom-date-input" />
                </div>
            </div>
            </div>

            <div className="custom-form-group">
              <label>Tour Related Details</label>
              <textarea name="tourDetails" placeholder="Any special requirements or tour related details..." rows={4} value={formData.tourDetails} onChange={handleChange} />
            </div>

            <div className="custom-form-actions">
              <button type="button" onClick={handleClose} className="custom-btn-cancel" disabled={isSubmitting}>Cancel</button>
              <button type="submit" className="custom-btn-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin inline-block mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Booking'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .custom-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.2s ease-in-out;
          overflow-y: auto;
          overflow-x: hidden;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .custom-dialog-content {
          background: white;
          border-radius: 16px;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.3s ease-out;
          overflow: hidden;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .custom-dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
        }

        .custom-dialog-header h2 {
          font-size: 24px;
          font-weight: bold;
          color: #111827;
          margin: 0;
        }

        .custom-dialog-close {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .custom-dialog-close:hover {
          color: #111827;
        }

        .custom-dialog-body {
          padding: 0;
          overflow-y: auto;
          flex: 1;
        }

        .custom-package-info {
          padding: 24px;
          background: linear-gradient(to right, #eff6ff, #ecfeff);
          border: 2px solid #bfdbfe;
          border-radius: 12px;
          margin: 24px;
        }

        .custom-package-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .custom-package-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .custom-package-info h3 {
          font-size: 20px;
          font-weight: bold;
          color: #111827;
          margin: 0 0 12px 0;
        }

        .custom-package-info p {
          font-size: 14px;
          color: #4b5563;
          margin: 0 0 16px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .custom-package-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
          padding: 12px;
          background: white;
          border-radius: 8px;
          border: 1px solid #bfdbfe;
          margin-bottom: 16px;
        }

        .custom-package-price span:first-child {
          font-size: 28px;
          font-weight: bold;
          color: #2563eb;
        }

        .custom-package-price span:last-child {
          font-size: 14px;
          color: #6b7280;
        }

        .custom-package-section {
          margin-bottom: 16px;
        }

        .custom-package-section p {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .custom-package-section p:has-text {
          font-weight: normal;
          font-style: italic;
          background: white;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #bfdbfe;
        }

        .custom-includes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 8px;
          margin-top: 8px;
        }

        .custom-include-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: #374151;
          background: white;
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #bfdbfe;
        }

        .custom-include-item span:first-child {
          color: #059669;
          font-weight: bold;
          font-size: 16px;
          flex-shrink: 0;
        }

        .custom-booking-form {
          padding: 24px;
        }

        .custom-form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        @media (max-width: 1024px) {
          .custom-form-row {
            grid-template-columns: 1fr;
          }
        }

        .custom-form-group {
          margin-bottom: 16px;
        }

        .custom-form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
        }

        .custom-form-group input,
        .custom-form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.2s;
          cursor: pointer;
        }

        .custom-form-group input:focus,
        .custom-form-group textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .custom-date-input {
          cursor: pointer;
          position: relative;
        }

        .custom-date-input::-webkit-calendar-picker-indicator {
          cursor: pointer;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          right: 0;
          opacity: 0;
          cursor: pointer;
        }

        .custom-date-input::-moz-calendar-picker-indicator {
          cursor: pointer;
        }

        .custom-date-input::-webkit-inner-spin-button {
          display: none;
        }

        .custom-date-input::-webkit-clear-button {
          display: none;
        }

        .custom-form-actions {
          display: flex;
          flex-direction: row;
          gap: 12px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
        }
        
        @media (max-width: 1024px) {
          .custom-form-actions {
            flex-direction: column;
          }
        }

        .custom-btn-cancel,
        .custom-btn-submit {
          flex: 1;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }

        .custom-btn-cancel {
          background: white;
          border: 2px solid #d1d5db;
          color: #111827;
        }

        .custom-btn-cancel:hover {
          background: #f9fafb;
        }

        .custom-btn-submit {
          background: linear-gradient(to right, #2563eb, #06b6d4);
          border: none;
          color: white;
        }

        .custom-btn-submit:hover:not(:disabled) {
          background: linear-gradient(to right, #1e40af, #0891b2);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
        }
        
        .custom-btn-submit:disabled,
        .custom-btn-cancel:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .error-input {
          border-color: #dc2626 !important;
        }
        
        .error-message {
          color: #dc2626;
          font-size: 12px;
          margin-top: 4px;
          display: block;
        }

        @media (max-width: 640px) {
          .custom-dialog-content {
            margin: 10px;
            max-height: 95vh;
          }

          .custom-dialog-header h2 {
            font-size: 20px;
          }

          .custom-form-row {
            grid-template-columns: 1fr;
          }

          .custom-package-info {
            margin: 16px;
            padding: 16px;
          }

          .custom-includes-grid {
            grid-template-columns: 1fr;
          }

          .custom-package-image {
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}
