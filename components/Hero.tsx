
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden px-4 py-20 text-center">
      <Image
        src="/houseRent.jpg"
        alt="Hero background"
        unoptimized
        priority
        fill
        loading="eager"
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/60" />

      <div className="relative mx-auto max-w-4xl space-y-6 text-white">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          Find Your Dream Rental Home
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-blue-100 md:text-xl">
          Discover verified rental listings, connect with top landlords, and
          book your home with ease.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/properties"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow transition hover:bg-slate-100"
          >
            Browse Properties
          </Link>
          <Link
            href="/auth/register"
            className="rounded-lg border border-blue-500 bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            List Your Property
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;