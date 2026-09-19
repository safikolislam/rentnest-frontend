import Link from "next/link";
import { Home, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaXTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <Home className="w-6 h-6 text-blue-500" />
              RentNest
            </Link>
            <p className="text-sm text-slate-400">
              Find your dream rental home with ease. Verified listings, trusted landlords.
            </p>
            {/* Social Icons from react-icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white transition"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-black hover:text-white transition"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-pink-600 hover:text-white transition"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-blue-700 hover:text-white transition"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 hover:text-white transition"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-500 transition">Home</Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-blue-500 transition">Browse Properties</Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-blue-500 transition">List Your Property</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/login" className="hover:text-blue-500 transition">Login</Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-blue-500 transition">Register</Link>
              </li>
              <li>
                <Link href="/dashboard/tenant" className="hover:text-blue-500 transition">Tenant Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/landlord" className="hover:text-blue-500 transition">Landlord Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                support@rentnest.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} RentNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;