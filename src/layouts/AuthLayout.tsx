import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AuthLayout() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-background text-foreground shadow-md"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 items-center justify-center p-8"
        >
          <div className="max-w-md text-white text-center">
            <img src="/Group 289360.png" alt="Vyb Logo" className="w-24 h-24 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-6">Welcome to Vyb</h1>
            <p className="text-lg opacity-90">
              Connect with your community, share your vibe, and discover amazing content.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 flex items-center justify-center p-8"
        >
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </motion.div>
      </div>
    </div>
  );
}