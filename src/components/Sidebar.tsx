import React from 'react';
import {
  Home,
  GraduationCap,
  MessageSquare,
  Share2,
  CreditCard,
  PlayCircle,
  Zap,
  Bot,
  Star,
  Clock,
  User,
  Shield,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { AppCategory } from '../types';

interface SidebarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  favoritesCount: number;
  recentlyUsedCount: number;
  onOpenProfile: () => void;
  darkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeCategory,
  onSelectCategory,
  favoritesCount,
  recentlyUsedCount,
  onOpenProfile,
  darkMode,
}) => {
  const NAV_ITEMS = [
    { id: 'all', label: 'Home', icon: Home, emoji: '🏠' },
    { id: 'study', label: 'Study & Learning', icon: GraduationCap, emoji: '📚' },
    { id: 'communication', label: 'Communication', icon: MessageSquare, emoji: '💬' },
    { id: 'social', label: 'Social', icon: Share2, emoji: '🌐' },
    { id: 'payments', label: 'Payments', icon: CreditCard, emoji: '💳' },
    { id: 'entertainment', label: 'Entertainment & YouTube', icon: PlayCircle, emoji: '▶️' },
    { id: 'productivity', label: 'Productivity', icon: Zap, emoji: '⚡' },
    { id: 'ai', label: 'AI Tools', icon: Bot, emoji: '🤖' },
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col justify-between w-64 shrink-0 h-[calc(100vh-4.5rem)] sticky top-18 border-r transition-colors py-5 px-3 overflow-y-auto ${
        darkMode
          ? 'bg-slate-950/70 border-slate-800/80 text-slate-300'
          : 'bg-white/80 border-slate-200/80 text-slate-700 shadow-xs'
      }`}
    >
      <div className="space-y-6">
        {/* Core Categories Navigation */}
        <div>
          <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
            Categories & Hubs
          </span>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  type="button"
                  onClick={() => onSelectCategory(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : darkMode
                      ? 'hover:bg-slate-800/70 text-slate-300 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{item.emoji}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Launch collections */}
        <div>
          <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
            Personal Quick Launch
          </span>
          <div className="space-y-1">
            <button
              id="nav-item-favorites"
              type="button"
              onClick={() => onSelectCategory('favorites')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === 'favorites'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : darkMode
                  ? 'hover:bg-slate-800/70 text-slate-300 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star
                  className={`w-4 h-4 ${
                    activeCategory === 'favorites' ? 'fill-slate-950' : 'text-amber-400 fill-amber-400/30'
                  }`}
                />
                <span>My Favorites</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeCategory === 'favorites'
                    ? 'bg-black/20 text-slate-950'
                    : 'bg-amber-400/20 text-amber-400'
                }`}
              >
                {favoritesCount}
              </span>
            </button>

            <button
              id="nav-item-recent"
              type="button"
              onClick={() => onSelectCategory('recent')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === 'recent'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : darkMode
                  ? 'hover:bg-slate-800/70 text-slate-300 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Recently Used</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeCategory === 'recent'
                    ? 'bg-white/20 text-white'
                    : 'bg-cyan-400/20 text-cyan-400'
                }`}
              >
                {recentlyUsedCount}
              </span>
            </button>

            <button
              id="nav-item-profile"
              type="button"
              onClick={onOpenProfile}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === 'profile'
                  ? 'bg-indigo-600 text-white'
                  : darkMode
                  ? 'hover:bg-slate-800/70 text-slate-300 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-indigo-400" />
                <span>Student Profile</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </button>
          </div>
        </div>
      </div>

      {/* Verified Safety Badge in Sidebar */}
      <div className={`p-3.5 rounded-2xl border ${
        darkMode ? 'bg-slate-900/60 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-[11px] mb-1">
          <Shield className="w-3.5 h-3.5 text-indigo-400" />
          <span>SynaseX Verified Hub</span>
        </div>
        <p className="text-[10px] leading-relaxed">
          Zero credential retention. Direct launcher to verified HTTPS institutions.
        </p>
      </div>
    </aside>
  );
};
