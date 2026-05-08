import Link from 'next/link';
import { Users } from 'lucide-react';

export default function CarCard({ car }) {
  return (
    <div className="bg-space-gray rounded-cards overflow-hidden transition-all duration-300 hover:bg-storm-gray border border-deep-graphite group">
      <div className="relative h-48 overflow-hidden bg-pitch-black">
        <img
          src={car.images?.[0] || '/placeholder-car.jpg'}
          alt={car.name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
        />
        {!car.available && (
          <div className="absolute top-4 right-4 bg-red-500/90 backdrop-blur-md text-white px-3 py-1 rounded-buttons text-sm font-semibold tracking-wide">
            Unavailable
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-[20px] font-semibold text-cloud-white leading-tight">{car.name}</h3>
        </div>
        <p className="text-cool-gray text-[14px] mb-4">
          {car.brand} • {car.year}
        </p>

        <div className="flex items-center space-x-4 mb-6">
          <span className="flex items-center text-[14px] text-ghost-white/80">
            <Users className="w-4 h-4 mr-1.5 text-highlight-blue" />
            {car.seats} Seats
          </span>
          <span className="text-[14px] text-ghost-white/80 capitalize bg-pitch-black px-2 py-0.5 rounded-standard">
            {car.transmission}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-[24px] font-semibold text-cloud-white">
              ₹{car.pricePerDay}
            </span>
            <span className="text-cool-gray text-[14px]">/day</span>
          </div>

          <Link
            href={`/cars/${car._id}`}
            className={`px-5 py-2 rounded-buttons text-[14px] font-semibold transition ${
              car.available
                ? 'bg-interactive-blue text-cloud-white hover:bg-vivid-blue'
                : 'bg-storm-gray text-cool-gray cursor-not-allowed'
            }`}
          >
            {car.available ? 'View Details' : 'Unavailable'}
          </Link>
        </div>
      </div>
    </div>
  );
}