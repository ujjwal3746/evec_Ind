
import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-black text-lg">E</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-colors">Evec.in</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-600">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/" className="hover:text-emerald-600 transition-colors">Latest</Link>
            <Link to="/" className="hover:text-emerald-600 transition-colors">Technology</Link>
            <Link to="/" className="hover:text-emerald-600 transition-colors">Reviews</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="hidden sm:block bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
              Subscribe
            </button>
            <button className="md:hidden p-2 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 text-white py-16 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-slate-950 font-black">E</span>
                </div>
                <span className="text-2xl font-black tracking-tighter">Evec.in</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                Empowering the transition to sustainable mobility. We provide deep insights into the electric vehicle ecosystem, from battery technology to urban infrastructure.
              </p>
              <div className="flex space-x-4">
                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                 </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Resources</h3>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Market Analysis</Link></li>
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Privacy Center</Link></li>
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Cookie Settings</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Company</h3>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Contact Editorial</Link></li>
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Advertising</Link></li>
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Work With Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Evec.in. All rights reserved.</p>
            <p className="mt-4 md:mt-0">Built for the future of sustainable transportation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
