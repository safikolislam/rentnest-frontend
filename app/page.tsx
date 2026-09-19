import Image from 'next/image';
import Link from 'next/link';


const featuredProperties = [
  {
    id: '1',
    title: 'Modern Luxury Apartment',
    location: 'Gulshan, Dhaka',
    price: 450,
    bedrooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    title: 'Cozy Studio Suite',
    location: 'Banani, Dhaka',
    price: 280,
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    title: 'Spacious Family Duplex',
    location: 'Dhanmondi, Dhaka',
    price: 600,
    bedrooms: 4,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      <section className="bg-blue-600 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Find Your Dream Rental Home
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Discover verified rental listings, connect with top landlords, and book your home with ease.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/properties"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-slate-100 transition"
            >
              Browse Properties
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg border border-blue-500 hover:bg-blue-800 transition"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Properties</h2>
            <p className="text-slate-600 dark:text-slate-400">Handpicked places available for rent right now</p>
          </div>
          <Link href="/properties" className="text-blue-600 font-semibold hover:underline">
            View All →
          </Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition"
            >
              <div className="relative w-full h-48">
                <Image sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{property.title}</h3>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${property.price}<span className="text-xs text-slate-500">/mo</span>
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{property.location}</p>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>{property.bedrooms} Beds</span>
                  <span>{property.bathrooms} Baths</span>
                </div>

                <Link
                  href={`/properties/${property.id}`}
                  className="block text-center w-full mt-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
