import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, User, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { CDN_LINK } from '../services/axiosInstance';

export default function AppLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    setMounted(true);
  }, [isAuthenticated, navigate]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <span className="flex items-center gap-2">
              <img src="/Group 289360.png" alt="Vyb Logo" className="w-8 h-8" />
              Vyb
            </span>
          </h1>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium hidden sm:inline">{user.userName}</span>
                <img 
                  src={CDN_LINK + user.profilePicture} 
                  alt={user.userName}
                  className="w-8 h-8 rounded-full object-cover" 
                />
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      
      <nav className="sticky bottom-0 z-10 bg-background border-t border-border p-2 sm:p-3">
        <div className="container mx-auto">
          <div className="flex justify-around items-center">
            <button 
              onClick={() => navigate('/feed')}
              className={`p-3 rounded-lg flex flex-col items-center ${
                location.pathname === '/feed' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Home size={24} />
              <span className="text-xs mt-1">Feed</span>
            </button>
            
            <button 
              onClick={() => navigate('/explore')}
              className={`p-3 rounded-lg flex flex-col items-center ${
                location.pathname === '/explore' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Search size={24} />
              <span className="text-xs mt-1">Explore</span>
            </button>
            
            <button 
              onClick={() => navigate('/profile')}
              className={`p-3 rounded-lg flex flex-col items-center ${
                location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <User size={24} />
              <span className="text-xs mt-1">Profile</span>
            </button>
            
            <button 
              onClick={logout}
              className="p-3 rounded-lg flex flex-col items-center text-muted-foreground"
            >
              <LogOut size={24} />
              <span className="text-xs mt-1">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}