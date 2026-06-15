import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../components/icons';
import { cn } from '../lib/utils';

interface MenuItem {
  icon: string;
  label: string;
  active?: boolean;
}

const heroImage = 'https://images.unsplash.com/photo-1526232761262-bc13f90f8441?q=80&w=2070';

const menuItems: Record<string, MenuItem[]> = {
  MENU: [
    { icon: 'Home', label: 'Home', active: true },
    { icon: 'BookMarked', label: 'Watch List' },
    { icon: 'Calendar', label: 'Coming Soon' },
    { icon: 'Compass', label: 'Discovery' },
  ],
  SOCIAL: [
    { icon: 'Users', label: 'Friends' },
    { icon: 'Gamepad', label: 'Parties' },
  ],
  GENERAL: [
    { icon: 'Film', label: 'Media' },
    { icon: 'Settings', label: 'Setting' },
    { icon: 'LogOut', label: 'Logout' },
  ],
};

const newReleases = [
  { id: 1, title: 'La Casa de Papel', image: 'https://images.unsplash.com/photo-1526232761262-bc13f90f8441?w=400&q=80' },
  { id: 2, title: 'Stranger Things', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80' },
  { id: 3, title: 'The Crown', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { id: 4, title: 'Money Heist', image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80' },
  { id: 5, title: 'Dark', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80' },
];

const continueWatching = [
  { id: 1, title: 'Spider-Verse', image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&q=80', progress: 65 },
  { id: 2, title: 'Inception', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&q=80', progress: 30 },
  { id: 3, title: 'Interstellar', image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80', progress: 85 },
];

const popularMovies = [
  { id: 1, title: 'Avatar', genre: 'Sci-Fi', rating: '9.2', image: 'https://images.unsplash.com/photo-1543536448-d209d8d5a699?w=200&q=80' },
  { id: 2, title: 'Avengers', genre: 'Action', rating: '9.0', image: 'https://images.unsplash.com/photo-1569502258058-40882e97fe66?w=200&q=80' },
  { id: 3, title: 'Joker', genre: 'Drama', rating: '8.8', image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=200&q=80' },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black-900 relative">
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 w-60 h-screen bg-black-900 border-r border-white/5 flex flex-col justify-between p-7">
        {/* Logo */}
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary-red" />
            <span className="text-2xl font-extrabold tracking-[-1px] text-white">NurseFlix</span>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-10">
            {Object.entries(menuItems).map(([category, items]) => (
              <div key={category}>
                <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
                  {category}
                </p>
                <div className="flex flex-col gap-1">
                  {items.map((item) => (
                    <button
                      key={item.label}
                      className={cn(
                        'flex items-center gap-4 h-11 px-4 rounded-lg transition-all',
                        item.active
                          ? 'bg-primary-red/18 border-l-3 border-primary-red text-white'
                          : 'text-white/62 hover:bg-white/4 hover:text-white hover:translate-x-1'
                      )}
                    >
                      <Icon
                        name={item.icon as any}
                        size={20}
                        className={cn(item.active ? 'text-primary-red' : '')}
                        active={item.active}
                        filled={item.active}
                      />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-60 min-h-screen">
        {/* Header */}
        <header className="h-22 flex items-center justify-between px-11 border-b border-white/5 bg-black-900/50 backdrop-blur-sm sticky top-0 z-40">
          {/* Tabs */}
          <div className="flex items-center gap-7">
            {['TV Show', 'Movies', 'Animes'].map((tab) => (
              <button
                key={tab}
                className={cn(
                  'text-sm font-medium transition-colors',
                  tab === 'TV Show' ? 'text-white text-base font-bold' : 'text-white/52'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right items */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <div className="h-13 w-[420px] rounded-full bg-white/3 border border-white/5 flex items-center px-5 gap-3 text-white/75">
              <Icon name="Search" size={18} />
              <input
                type="text"
                placeholder="Titles, people, genres"
                className="bg-transparent border-none outline-none text-white/75 text-sm flex-1"
              />
            </div>

            {/* Toggle Night */}
            <button className="h-11 px-4 rounded-full bg-white/4 flex items-center gap-3 text-white/75 hover:bg-white/8 transition-colors">
              <Icon name="Moon" size={18} />
            </button>

            {/* Notifications */}
            <button className="text-white/75 hover:text-white transition-colors">
              <Icon name="Bell" size={22} />
            </button>

            {/* Avatar */}
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-white/12 object-cover"
            />
          </div>
        </header>

        {/* Hero Banner */}
        <section className="relative mt-8 mx-11">
          <div className="relative h-80 rounded-[28px] overflow-hidden shadow-hero">
            <img
              src={heroImage}
              alt="La Casa de Papel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/58 to-black/12" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/72" style={{ top: '45%' }} />

            {/* Content */}
            <div className="absolute left-11 top-14 max-w-[420px]">
              {/* Title */}
              <h1 className="text-6xl font-black leading-[0.9] tracking-[-3px] text-white mb-2">
                LA CASA DE
                <br />
                <span className="text-primary-red">PAPEL</span>
              </h1>
              <p className="text-5xl font-bold text-white mb-4 tracking-wide">Money Heist</p>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm text-white/68 mb-6">
                <span className="px-2 py-1 rounded bg-yellow-400 text-black font-bold text-xs">9.3 IMDb</span>
                <span>2017</span>
                <span>2 Seasons</span>
                <span className="px-2 py-1 rounded border border-white/18 text-xs">16+</span>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <button className="h-13 px-7 rounded-lg bg-primary-red text-white font-bold flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(217,31,39,0.35)] transition-all">
                  <Icon name="Play" size={18} filled className="text-white" />
                  <span>Watch</span>
                </button>
                <button className="w-13 h-13 rounded-lg bg-white/10 border border-white/14 flex items-center justify-center text-white hover:bg-white/16 transition-colors">
                  <Icon name="Plus" size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="p-11 space-y-12">
          {/* New Releases */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">New Releases</h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {newReleases.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.08, y: -8 }}
                  className="netflix-card w-[220px] h-[320px] flex-shrink-0 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-4 right-4 p-4">
                    <p className="font-bold text-white text-sm">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Continue Watching */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Continue Watching</h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {continueWatching.map((item) => (
                <div key={item.id} className="relative w-[320px] h-[140px] rounded-[22px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-semibold text-white text-sm mb-2">{item.title}</p>
                    <div className="h-1 bg-white/8 rounded overflow-hidden">
                      <div
                        className="h-full bg-primary-red"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="fixed right-0 top-0 w-80 h-screen bg-black-850 border-l border-white/05 p-8 overflow-y-auto">
        <h3 className="text-lg font-bold text-white mb-4">Popular Movies</h3>
        <div className="space-y-3 mb-8">
          {popularMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex gap-4 p-3 rounded-2xl hover:bg-white/4 transition-colors cursor-pointer"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-14 h-20 rounded-lg object-cover"
              />
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-white text-sm mb-1">{movie.title}</p>
                <p className="text-xs text-white/60 mb-2">{movie.genre}</p>
                <span className="inline-flex items-center h-5 px-2 rounded bg-yellow-400 text-black text-xs font-bold">
                  {movie.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default DashboardPage;
