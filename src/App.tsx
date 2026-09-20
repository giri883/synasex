import React, { useState, useEffect } from 'react';
import { StudentUser, AppItem, RecentlyUsedItem, NotificationItem } from './types';
import { APPS_DATA } from './data/appsData';
import { LandingPage } from './components/LandingPage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { DashboardView } from './components/DashboardView';
import { SignUpModal } from './components/SignUpModal';
import { SignInModal } from './components/SignInModal';
import { ProfileModal } from './components/ProfileModal';
import { ToastContainer, ToastData } from './components/Toast';
import { Footer } from './components/Footer';

const INITIAL_USER: StudentUser = {
  fullName: 'Saran Giri',
  email: 'girisaran370@gmail.com',
  college: 'Indian Institute of Technology (IIT)',
  course: 'Computer Science & Engineering',
  yearOfStudy: '3rd Year',
  avatar: 'S',
  bio: 'Competitive coding, full-stack architectures & machine learning explorer',
  joinDate: 'Sept 2025',
};

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Semester Timetable Synchronized',
    message: 'New assignment submission deadlines updated on Google Classroom.',
    time: '15m ago',
    read: false,
    category: 'academic',
  },
  {
    id: 'notif-2',
    title: 'AI Tool Hub Updated',
    message: 'Added direct access to Claude and Perplexity academic research engines.',
    time: '2h ago',
    read: false,
    category: 'system',
  },
  {
    id: 'notif-3',
    title: 'Payment Security Reminder',
    message: 'SynaseX never asks for UPI PINs or card CVVs. Always verify official bank URLs.',
    time: '1d ago',
    read: true,
    category: 'security',
  },
];

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('synasex_dark_mode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // User state
  const [user, setUser] = useState<StudentUser | null>(() => {
    const saved = localStorage.getItem('synasex_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Current view: 'landing' or 'dashboard'
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>(() => {
    const savedUser = localStorage.getItem('synasex_user');
    return savedUser ? 'dashboard' : 'landing';
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('synasex_favorites');
    return saved ? JSON.parse(saved) : ['leetcode', 'github', 'chatgpt', 'google-classroom', 'gmail', 'youtube-main'];
  });

  // Recently used state
  const [recentlyUsed, setRecentlyUsed] = useState<RecentlyUsedItem[]>(() => {
    const saved = localStorage.getItem('synasex_recent');
    return saved
      ? JSON.parse(saved)
      : [
          { appId: 'gmail', timestamp: Date.now() - 1000 * 60 * 12 },
          { appId: 'leetcode', timestamp: Date.now() - 1000 * 60 * 45 },
          { appId: 'chatgpt', timestamp: Date.now() - 1000 * 60 * 120 },
          { appId: 'google-classroom', timestamp: Date.now() - 1000 * 60 * 240 },
        ];
  });

  // Active Category filter
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEFAULT_NOTIFICATIONS);

  // Toasts state
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('synasex_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem('synasex_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('synasex_user');
    }
  }, [user]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('synasex_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist recently used
  useEffect(() => {
    localStorage.setItem('synasex_recent', JSON.stringify(recentlyUsed));
  }, [recentlyUsed]);

  // Toast trigger helper
  const addToast = (type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastData = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Open App handler
  const handleOpenApp = (app: AppItem) => {
    // Record to recently used
    setRecentlyUsed((prev) => {
      const filtered = prev.filter((item) => item.appId !== app.id);
      return [{ appId: app.id, timestamp: Date.now() }, ...filtered].slice(0, 15);
    });

    // Notify user with toast
    addToast(
      'info',
      `Launching ${app.name}`,
      `Redirecting to official portal: ${new URL(app.url).hostname}`
    );

    // Open official URL in new window safely
    window.open(app.url, '_blank', 'noopener,noreferrer');
  };

  // Toggle Favorite handler
  const handleToggleFavorite = (appId: string) => {
    const app = APPS_DATA.find((a) => a.id === appId);
    const appName = app ? app.name : 'App';

    setFavorites((prev) => {
      if (prev.includes(appId)) {
        addToast('info', 'Favorite Removed', `Unpinned ${appName} from your favorites.`);
        return prev.filter((id) => id !== appId);
      } else {
        addToast('success', 'Favorite Pinned', `Added ${appName} to your quick launch favorites!`);
        return [...prev, appId];
      }
    });
  };

  // Auth Handlers
  const handleSignUpSuccess = (newUser: StudentUser) => {
    setUser(newUser);
    setIsSignUpOpen(false);
    setCurrentView('dashboard');
    addToast('success', 'Welcome to SynaseX!', `Account created for ${newUser.fullName}.`);
  };

  const handleSignInSuccess = (loggedInUser: StudentUser) => {
    setUser(loggedInUser);
    setIsSignInOpen(false);
    setCurrentView('dashboard');
    addToast('success', 'Signed In', `Welcome back to your hub, ${loggedInUser.fullName.split(' ')[0]}!`);
  };

  const handleExploreDemo = () => {
    setUser(INITIAL_USER);
    setCurrentView('dashboard');
    addToast('info', 'Demo Hub Active', 'Browsing SynaseX with full student privileges.');
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
    setCurrentView('landing');
    addToast('info', 'Signed Out', 'You have been safely signed out of SynaseX.');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div
      className={`min-h-screen font-body flex flex-col transition-colors duration-300 ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Toast notifications container */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
        darkMode={darkMode}
      />

      {/* Auth Modals */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={() => {
          setIsSignUpOpen(false);
          setIsSignInOpen(true);
        }}
        onSuccess={handleSignUpSuccess}
        darkMode={darkMode}
      />

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => {
          setIsSignInOpen(false);
          setIsSignUpOpen(true);
        }}
        onSuccess={handleSignInSuccess}
        darkMode={darkMode}
      />

      {/* Profile Modal */}
      {user && (
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          onUpdateUser={(updated) => {
            setUser(updated);
            addToast('success', 'Profile Updated', 'Student profile details saved.');
          }}
          onLogout={handleLogout}
          favoriteApps={APPS_DATA.filter((a) => favorites.includes(a.id))}
          onOpenApp={handleOpenApp}
          onRemoveFavorite={handleToggleFavorite}
          darkMode={darkMode}
        />
      )}

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
          if (currentView !== 'dashboard') setCurrentView('dashboard');
        }}
        favoritesCount={favorites.length}
        recentlyUsedCount={recentlyUsed.length}
        onOpenProfile={() => {
          if (user) {
            setIsProfileOpen(true);
          } else {
            setIsSignInOpen(true);
          }
        }}
        darkMode={darkMode}
      />

      {/* Render based on currentView */}
      {currentView === 'landing' ? (
        <LandingPage
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onOpenSignIn={() => setIsSignInOpen(true)}
          onExploreDemo={handleExploreDemo}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />
      ) : (
        /* Main Student Dashboard */
        <div className="flex flex-col min-h-screen">
          <Navbar
            user={user}
            onOpenProfile={() => setIsProfileOpen(true)}
            onLogout={handleLogout}
            onOpenSignIn={() => setIsSignInOpen(true)}
            onOpenSignUp={() => setIsSignUpOpen(true)}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            mobileMenuOpen={isMobileMenuOpen}
          />

          <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Sidebar */}
            <Sidebar
              activeCategory={activeCategory}
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                setSearchQuery('');
              }}
              favoritesCount={favorites.length}
              recentlyUsedCount={recentlyUsed.length}
              onOpenProfile={() => {
                if (user) {
                  setIsProfileOpen(true);
                } else {
                  setIsSignInOpen(true);
                }
              }}
              darkMode={darkMode}
            />

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 py-6 lg:pl-8">
              <DashboardView
                user={user || INITIAL_USER}
                apps={APPS_DATA}
                favorites={favorites}
                recentlyUsed={recentlyUsed}
                onToggleFavorite={handleToggleFavorite}
                onOpenApp={handleOpenApp}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                darkMode={darkMode}
              />
            </main>
          </div>

          <Footer darkMode={darkMode} />
        </div>
      )}
    </div>
  );
}
