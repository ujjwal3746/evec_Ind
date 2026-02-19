
import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">Evec.in</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/latest" className="hover:text-emerald-600 transition-colors">Latest</Link>
            <Link to="/tech" className="hover:text-emerald-600 transition-colors">Technology</Link>
            <Link to="/reviews" className="hover:text-emerald-600 transition-colors">Reviews</Link>
          </nav>

          <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors">
            Subscribe
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Evec.in</h2>
              <p className="text-slate-400 max-w-sm mb-6">
                Leading the conversation on electric vehicles, clean energy, and the future of sustainable mobility.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">About Us</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
                <li><Link to="/">Ad Choices</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Newsletter</li>
                <li>RSS Feed</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Evec.in. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
