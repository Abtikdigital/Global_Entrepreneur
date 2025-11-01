import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Calendar, Star, X, Loader2, User, Phone, Mail, Users, MapPin, DollarSign, Hotel, FileText, Plane, Package } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';

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
  flightType?: 'domestic' | 'international';
  flightCountry?: string;
  flightFrom?: string;
  flightTo?: string;
  flightDate?: string;
}

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  packageDetails: PackageDetails | null;
}

interface FormData {
  // Common
  name: string;
  phone: string;
  email: string;
  persons: string;
  destination: string;
  budget: string;
  date: string;
  tourDetails: string;
  tripType?: 'domestic' | 'international';
  // Flight
  flightType?: 'domestic' | 'international';
  flightCountry?: string;
  flightFrom?: string;
  flightTo?: string;
  flightBudget?: string;
  flightDate?: string;
  // Hotels
  hotelLocation?: string;
  hotelCheckIn?: string;
  hotelCheckOut?: string;
  hotelRooms?: string;
  hotelAdults?: string;
  hotelBudget?: string;
}

export function BookingDialog({ isOpen, onClose, packageDetails }: BookingDialogProps) {
  const [activeTab, setActiveTab] = useState<'package' | 'flight' | 'hotels'>('package');
  const [countriesData, setCountriesData] = useState<any>(null);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const prevCountryRef = useRef<string>('');

  useEffect(() => {
    // Fetch countries data
    fetch('/data/countries.json')
      .then((r) => r.json())
      .then((data) => {
        setCountriesData(data);
        if (data?.countries?.length) {
          const countryNames = data.countries.map((c: any) => c.name);
          setAllCountries(countryNames);
        }
      })
      .catch(() => {
        // ignore fetch errors
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      persons: '',
      destination: '',
      budget: '',
      date: '',
      tourDetails: '',
      // flight
      flightType: 'domestic',
      flightCountry: '',
      flightFrom: '',
      flightTo: '',
      flightBudget: '',
      flightDate: '',
      // hotels
      hotelLocation: '',
      hotelCheckIn: '',
      hotelCheckOut: '',
      hotelRooms: '',
      hotelAdults: '',
      hotelBudget: '',
    },
  });

  const flightType = watch('flightType');
  const flightCountry = watch('flightCountry');
  const destination = watch('destination');
  const date = watch('date');
  const flightTo = watch('flightTo');
  const flightDate = watch('flightDate');
  const persons = watch('persons');

  // Sync destination between package and flight tabs (bidirectional)
  useEffect(() => {
    if (destination !== flightTo) {
      if (activeTab === 'package' && destination) {
        setValue('flightTo', destination, { shouldDirty: false });
      } else if (activeTab === 'flight' && flightTo) {
        setValue('destination', flightTo, { shouldDirty: false });
      }
    }
  }, [destination, flightTo, activeTab, setValue]);

  // Sync date between package and flight tabs (bidirectional)
  useEffect(() => {
    if (date !== flightDate) {
      if (activeTab === 'package' && date) {
        setValue('flightDate', date, { shouldDirty: false });
      } else if (activeTab === 'flight' && flightDate) {
        setValue('date', flightDate, { shouldDirty: false });
      }
    }
  }, [date, flightDate, activeTab, setValue]);

  // Reset flight fields when flight type changes
  useEffect(() => {
    if (activeTab === 'flight') {
      if (flightType === 'international') {
        // Clear country field when switching to international
        setValue('flightCountry', '', { shouldDirty: false });
      }
      // Always clear From/To when type changes
      setValue('flightFrom', '', { shouldDirty: false });
      setValue('flightTo', '', { shouldDirty: false });
    }
  }, [flightType, activeTab, setValue]);

  // Reset location fields when country changes for domestic flights
  useEffect(() => {
    if (activeTab === 'flight' && flightType === 'domestic' && flightCountry) {
      // Only reset if country actually changed (not initial set)
      if (prevCountryRef.current && prevCountryRef.current !== flightCountry) {
        setValue('flightFrom', '', { shouldDirty: false });
        setValue('flightTo', '', { shouldDirty: false });
      }
      prevCountryRef.current = flightCountry;
    }
  }, [flightCountry, flightType, activeTab, setValue]);

  // Get location suggestions based on flight type and country
  const flightLocationOptions = useMemo(() => {
    if (!countriesData) return [];
    const opts: string[] = [];

    if (flightType === 'domestic') {
      // For domestic: show states and cities of selected country
      if (flightCountry) {
        const country = countriesData.countries.find((c: any) => c.name === flightCountry);
        if (country && country.states) {
          for (const state of country.states) {
            opts.push(state.name);
            if (Array.isArray(state.cities)) {
              for (const city of state.cities) {
                if (city) opts.push(`${city}, ${state.name}`);
              }
            }
          }
        }
      } else {
        // If no country selected, show all states from all countries
        for (const country of countriesData.countries) {
          if (Array.isArray(country.states)) {
            for (const state of country.states) {
              opts.push(`${state.name}, ${country.name}`);
              if (Array.isArray(state.cities)) {
                for (const city of state.cities) {
                  if (city) opts.push(`${city}, ${state.name}, ${country.name}`);
                }
              }
            }
          }
        }
      }
    } else {
      // For international: show all countries and their major cities
      for (const country of countriesData.countries) {
        opts.push(country.name);
        if (Array.isArray(country.states)) {
          for (const state of country.states) {
            if (Array.isArray(state.cities)) {
              for (const city of state.cities) {
                if (city) opts.push(`${city}, ${country.name}`);
              }
            }
          }
        }
      }
    }

    return Array.from(new Set(opts));
  }, [countriesData, flightType, flightCountry]);

  // Package destination suggestions - show all locations (domestic and international)
  const packageLocationOptions = useMemo(() => {
    if (!countriesData) return [];
    const opts: string[] = [];

    // Show all countries, states, and cities for package destinations
    for (const country of countriesData.countries) {
      opts.push(country.name);
      if (Array.isArray(country.states)) {
        for (const state of country.states) {
          opts.push(state.name);
          if (Array.isArray(state.cities)) {
            for (const city of state.cities) {
              if (city) {
                opts.push(`${city}, ${state.name}`);
                opts.push(`${city}, ${country.name}`);
              }
            }
          }
        }
      }
    }

    return Array.from(new Set(opts));
  }, [countriesData]);

  // Update form when packageDetails changes
  useEffect(() => {
    if (packageDetails) {
      // Handle package destination and date
      if (packageDetails.destination) {
        setValue('destination', packageDetails.destination);
        setValue('flightTo', packageDetails.destination); // Sync to flight tab
      }
      if (packageDetails.date) {
        setValue('date', packageDetails.date);
        setValue('flightDate', packageDetails.date); // Sync to flight tab
      }
      // Handle flight data from hero section
      if (packageDetails.flightFrom || packageDetails.flightTo) {
        setActiveTab('flight');
        if (packageDetails.flightType) setValue('flightType', packageDetails.flightType);
        if (packageDetails.flightCountry) setValue('flightCountry', packageDetails.flightCountry);
        if (packageDetails.flightFrom) setValue('flightFrom', packageDetails.flightFrom);
        if (packageDetails.flightTo) {
          setValue('flightTo', packageDetails.flightTo);
          setValue('destination', packageDetails.flightTo); // Sync to package tab
        }
        if (packageDetails.flightDate) {
          setValue('flightDate', packageDetails.flightDate);
          setValue('date', packageDetails.flightDate); // Sync to package tab
        }
      }
    }
  }, [packageDetails, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const type = activeTab;
      const payload: any = {
        type,
        name: data.name,
        phone: data.phone,
        email: data.email,
      };

      if (type === 'package') {
        Object.assign(payload, {
          persons: data.persons,
          destination: data.destination,
          budget: data.budget,
          date: data.date,
          tourDetails: data.tourDetails,
          packageName: packageDetails?.name,
          packagePrice: packageDetails?.price,
          packageDuration: packageDetails?.duration,
          // Don't include tripType for packages
        });
      }

      if (type === 'flight') {
        Object.assign(payload, {
          flightType: data.flightType,
          country: data.flightCountry,
          from: data.flightFrom,
          to: data.flightTo,
          date: data.flightDate,
          persons: data.persons,
          budget: data.flightBudget,
        });
      }

      if (type === 'hotels') {
        Object.assign(payload, {
          location: data.hotelLocation,
          checkIn: data.hotelCheckIn,
          checkOut: data.hotelCheckOut,
          rooms: data.hotelRooms,
          adults: data.hotelAdults,
          budget: data.hotelBudget,
        });
      }

      const response = await axios.post('/api/booking', payload);
      const result = response.data;

      if (result.isSuccess) {
        await Swal.fire({
          icon: 'success',
          title: 'Submitted Successfully!',
          text: 'Thank you for your interest. We will contact you within 24 hours.',
          confirmButtonColor: '#2563eb',
          confirmButtonText: 'OK',
        });
        handleClose();
      } else {
        throw new Error(result.message || 'Failed to submit');
      }
    } catch (error: any) {
      console.error('Booking submission error:', error);
      let errorMessage = 'There was an error submitting your request. Please try again later or contact us directly.';
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
    }
  };

  const handleClose = () => {
    reset();
    setValue('destination', packageDetails?.destination || '');
    setValue('date', packageDetails?.date || '');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="custom-dialog-overlay" onClick={handleClose}>
      <div className="custom-dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="custom-dialog-header rounded-t-xl" style={{background: 'linear-gradient(to right, #385678, #17947F)'}}>
          <h2 style={{color: 'white'}}>Plan Your Future Journey</h2>
          <button className="custom-dialog-close" onClick={handleClose} style={{color: 'white'}}>
            <X size={24} />
          </button>
        </div>

        <div className="custom-dialog-body">
          {/* Tabs */}
          <div className="px-6 pt-6">
            <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setActiveTab('package')}
                className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                  activeTab === 'package' 
                    ? 'bg-gray-100 font-semibold text-gray-900' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package size={16} />
                Package
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('flight')}
                className={`flex items-center gap-2 px-4 py-2 text-sm border-l border-gray-200 transition-colors ${
                  activeTab === 'flight' 
                    ? 'bg-gray-100 font-semibold text-gray-900' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Plane size={16} />
                Flight
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('hotels')}
                className={`flex items-center gap-2 px-4 py-2 text-sm border-l border-gray-200 transition-colors ${
                  activeTab === 'hotels' 
                    ? 'bg-gray-100 font-semibold text-gray-900' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Hotel size={16} />
                Hotels
              </button>
            </div>
          </div>

          {packageDetails && packageDetails.name && activeTab === 'package' && (
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

          <form onSubmit={handleSubmit(onSubmit)} className="custom-booking-form">
            {/* Common fields */}
            <div className="custom-form-row">
              <div className="custom-form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  {...register('name', { 
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                  className={errors.name ? 'error-input' : ''}
                  autoComplete="name"
                />
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>
              <div className="custom-form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  {...register('phone', { 
                    required: 'Phone is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Please enter a valid 10-digit phone number'
                    }
                  })}
                  className={errors.phone ? 'error-input' : ''}
                  autoComplete="tel"
                />
                {errors.phone && <span className="error-message">{errors.phone.message}</span>}
              </div>
            </div>

            <div className="custom-form-group">
              <label>Email Address *</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address'
                  }
                })}
                className={errors.email ? 'error-input' : ''}
                autoComplete="email"
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            {/* Tab-specific fields */}
            {activeTab === 'package' && (
              <>
                <div className="custom-form-row">
                  <div className="custom-form-group">
                    <label>Number of Persons *</label>
                    <input 
                      type="number" 
                      placeholder="Enter number of persons" 
                      {...register('persons', { 
                        required: 'Number of persons is required',
                        min: { value: 1, message: 'Please enter at least 1 person' }
                      })} 
                      min="1"
                      className={errors.persons ? 'error-input' : ''}
                    />
                    {errors.persons && <span className="error-message">{errors.persons.message}</span>}
                  </div>
                  <div className="custom-form-group">
                    <label>Destination</label>
                    <input type="text" placeholder="Enter destination" list="destination-suggestions" {...register('destination')} />
                    <datalist id="destination-suggestions">
                      {packageLocationOptions.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="custom-form-row">
                  <div className="custom-form-group">
                    <label>Budget Per Person</label>
                    <input type="text" placeholder="Enter budget per person" {...register('budget')} />
                  </div>
                  <div className="custom-form-group">
                    <label>Preferred Travel Date</label>
                    <div className="custom-date-wrapper">
                      <input type="date" {...register('date')} className="custom-date-input" />
                    </div>
                  </div>
                </div>

                <div className="custom-form-group">
                  <label>Tour Related Details</label>
                  <textarea placeholder="Any special requirements or tour related details..." rows={4} {...register('tourDetails')} />
                </div>
              </>
            )}

            {activeTab === 'flight' && (
              <>
                {/* Flight Type Selection - Radio Buttons */}
                <div className="custom-form-group">
                  <label>Flight Type</label>
                  <div className="flex gap-4 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...register('flightType')}
                        value="domestic"
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">Domestic</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...register('flightType')}
                        value="international"
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">International</span>
                    </label>
                  </div>
                </div>
                
                {/* Country field for domestic flights */}
                {flightType === 'domestic' && (
                  <div className="custom-form-group">
                    <label>Country *</label>
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background">
                      <MapPin size={20} className="text-muted-foreground shrink-0" />
                      <input 
                        type="text" 
                        placeholder="Select country" 
                        list="flight-countries" 
                        {...register('flightCountry', { required: flightType === 'domestic' ? 'Country is required for domestic flights' : false })} 
                        className="border-0 bg-transparent p-0 focus-visible:ring-0 flex-1"
                      />
                    </div>
                    <datalist id="flight-countries">
                      {allCountries.map((country) => (
                        <option key={country} value={country} />
                      ))}
                    </datalist>
                    {errors.flightCountry && <span className="error-message">{errors.flightCountry.message}</span>}
                  </div>
                )}

                <div className="custom-form-row">
                  <div className="custom-form-group">
                    <label>From *</label>
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background">
                      <MapPin size={20} className="text-muted-foreground shrink-0" />
                      <input 
                        type="text" 
                        placeholder={flightType === 'domestic' ? 'Source state/city' : 'Source country/city'} 
                        list="from-suggestions" 
                        {...register('flightFrom', { required: 'From is required' })} 
                        className="border-0 bg-transparent p-0 focus-visible:ring-0 flex-1"
                      />
                    </div>
                    <datalist id="from-suggestions">
                      {flightLocationOptions.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                    {errors.flightFrom && <span className="error-message">{errors.flightFrom.message}</span>}
                  </div>
                  <div className="custom-form-group">
                    <label>To *</label>
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background">
                      <MapPin size={20} className="text-muted-foreground shrink-0" />
                      <input 
                        type="text" 
                        placeholder={flightType === 'domestic' ? 'Destination state/city' : 'Destination country/city'} 
                        list="to-suggestions" 
                        {...register('flightTo', { required: 'To is required' })} 
                        className="border-0 bg-transparent p-0 focus-visible:ring-0 flex-1"
                      />
                    </div>
                    <datalist id="to-suggestions">
                      {flightLocationOptions.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                    {errors.flightTo && <span className="error-message">{errors.flightTo.message}</span>}
                  </div>
                </div>
                <div className="custom-form-row">
                  <div className="custom-form-group">
                    <label>Travel Date *</label>
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background custom-date-wrapper">
                      <Calendar size={20} className="text-muted-foreground shrink-0" />
                      <input 
                        type="date" 
                        {...register('flightDate', { required: 'Travel date is required' })} 
                        className="border-0 bg-transparent p-0 focus-visible:ring-0 flex-1 custom-date-input" 
                      />
                    </div>
                    {errors.flightDate && <span className="error-message">{errors.flightDate.message}</span>}
                  </div>
                  <div className="custom-form-group">
                    <label>Passengers *</label>
                    <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-input-background">
                      <Users size={20} className="text-muted-foreground shrink-0" />
                      <input 
                        type="number" 
                        min="1" 
                        placeholder="Total passengers" 
                        {...register('persons', { required: 'Passengers is required' })} 
                        className={`border-0 bg-transparent p-0 focus-visible:ring-0 flex-1 ${errors.persons ? 'error-input' : ''}`}
                      />
                    </div>
                    {errors.persons && <span className="error-message">{errors.persons.message}</span>}
                  </div>
                </div>
                <div className="custom-form-group">
                  <label>Budget</label>
                  <input type="text" placeholder="Overall budget" {...register('flightBudget')} />
                </div>
              </>
            )}

            {activeTab === 'hotels' && (
              <>
                <div className="custom-form-row">
                  <div className="custom-form-group">
                    <label>Location *</label>
                    <input type="text" placeholder="City / Area" list="hotel-suggestions" {...register('hotelLocation', { required: 'Location is required' })} />
                    <datalist id="hotel-suggestions">
                      {packageLocationOptions.map((s) => (
                        <option key={s} value={s} />
                      ))}
                    </datalist>
                  </div>
                  <div className="custom-form-group">
                    <label>Rooms *</label>
                    <input type="number" min="1" placeholder="Number of rooms" {...register('hotelRooms', { required: 'Rooms is required' })} />
                  </div>
                </div>
                <div className="custom-form-row">
                  <div className="custom-form-group">
                    <label>Check-in *</label>
                    <div className="custom-date-wrapper">
                      <input type="date" {...register('hotelCheckIn', { required: 'Check-in is required' })} className="custom-date-input" />
                    </div>
                  </div>
                  <div className="custom-form-group">
                    <label>Check-out *</label>
                    <div className="custom-date-wrapper">
                      <input type="date" {...register('hotelCheckOut', { required: 'Check-out is required' })} className="custom-date-input" />
                    </div>
                  </div>
                </div>
                <div className="custom-form-row">
                  <div className="custom-form-group">
                    <label>Adults *</label>
                    <input type="number" min="1" placeholder="Number of adults" {...register('hotelAdults', { required: 'Adults is required' })} />
                  </div>
                  <div className="custom-form-group">
                    <label>Budget</label>
                    <input type="text" placeholder="Overall budget" {...register('hotelBudget')} />
                  </div>
                </div>
              </>
            )}

            <div className="custom-form-actions">
              <button type="button" onClick={handleClose} className="custom-btn-cancel" disabled={isSubmitting}>Cancel</button>
              <button type="submit" className="custom-btn-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin inline-block mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit'
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
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .custom-dialog-header h2 {
          font-size: 24px;
          font-weight: bold;
          color: white;
          margin: 0;
        }

        .custom-dialog-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          border-radius: 4px;
        }

        .custom-dialog-close:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
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
        .custom-form-group textarea,
        .custom-form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.2s;
          cursor: pointer;
          background-color: white;
        }

        .custom-form-group input:focus,
        .custom-form-group textarea:focus,
        .custom-form-group select:focus {
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
          background: linear-gradient(to right, #385678, #17947F);
          border: none;
          color: white;
        }

        .custom-btn-submit:hover:not(:disabled) {
          background: linear-gradient(to right, #2e465e, #128a79);
          box-shadow: 0 4px 12px rgba(56, 86, 120, 0.4);
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
