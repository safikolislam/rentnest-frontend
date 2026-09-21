import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <section className="relative py-20 px-4 text-center overflow-hidden">
      
        <div className="absolute inset-0 -z-10">
          <Image 
            src="/assets/house-rent-hero.jpg" 
            alt="Hero background" 
            fill 
            priority
            className="object-cover object-center"
          />
    
          <div className="absolute inset-0 bg-black/60" />
        </div>

  
        <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-white">
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
    </div>
  );
};

export default Hero;