'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CarCard from '@/components/CarCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function CarsPage() {
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get('location') || '';
  
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    transmission: '',
    minPrice: '',
    maxPrice: '',
    location: initialLocation,
  });

  // Sync filters if URL changes (e.g. from hero search)
  useEffect(() => {
    const location = searchParams.get('location');
    if (location && location !== filters.location) {
      setFilters(prev => ({ ...prev, location }));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.transmission) queryParams.append('transmission', filters.transmission);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.location) queryParams.append('location', filters.location);
      queryParams.append('available', 'true');

      const response = await fetch(`/api/cars?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      transmission: '',
      minPrice: '',
      maxPrice: '',
      location: '',
    });
  };

  return (
    <div className="bg-pitch-black min-h-screen pt-12 pb-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-heading font-semibold mb-12 tracking-tight text-cloud-white"
        >
          Browse Cars
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-space-gray p-8 rounded-cards border border-deep-graphite sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-semibold text-cloud-white">Filters</h2>
                <button
                  onClick={resetFilters}
                  className="text-highlight-blue text-[14px] hover:underline"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[14px] font-medium text-ghost-white mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 bg-pitch-black text-ghost-white border-none rounded-inputs focus:ring-2 focus:ring-interactive-blue outline-none appearance-none cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="luxury">Luxury</option>
                    <option value="sports">Sports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-ghost-white mb-2">
                    Transmission
                  </label>
                  <select
                    name="transmission"
                    value={filters.transmission}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 bg-pitch-black text-ghost-white border-none rounded-inputs focus:ring-2 focus:ring-interactive-blue outline-none appearance-none cursor-pointer"
                  >
                    <option value="">All Types</option>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-ghost-white mb-2">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 bg-pitch-black text-ghost-white border-none rounded-inputs focus:ring-2 focus:ring-interactive-blue outline-none placeholder-cool-gray"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-full px-4 py-3 bg-pitch-black text-ghost-white border-none rounded-inputs focus:ring-2 focus:ring-interactive-blue outline-none placeholder-cool-gray"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-ghost-white mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 bg-pitch-black text-ghost-white border-none rounded-inputs focus:ring-2 focus:ring-interactive-blue outline-none placeholder-cool-gray"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cars Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-highlight-blue"></div>
                <p className="mt-4 text-cool-gray">Loading cars...</p>
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-20 bg-space-gray rounded-cards border border-deep-graphite">
                <p className="text-[20px] text-cloud-white mb-2">No cars found</p>
                <p className="text-[14px] text-cool-gray">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {cars.map((car, idx) => (
                    <motion.div
                      key={car._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <CarCard car={car} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}