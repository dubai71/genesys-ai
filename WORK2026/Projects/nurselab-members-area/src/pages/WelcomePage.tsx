import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Icon } from '../components/icons';

const heroImage = 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=2070&auto=format&fit=crop';

const miniCards = [
  { id: 1, title: 'Spider-Verse', image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80' },
  { id: 2, title: 'Into the Spider-Verse', image: 'https://images.unsplash.com/photo-1614726365723-49cfae935db6?w=400&q=80' },
  { id: 3, title: 'Across the Spider-Verse', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80' },
  { id: 4, title: 'Beyond the Spider-Verse', image: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=400&q=80' },
];

export const WelcomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Blurred background */}
      <div
        className="absolute inset-0 opacity-65"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(28px)',
          transform: 'scale(1.08)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Navbar */}
      <nav className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
        <div
          className="glass-pill h-16 px-6 flex items-center justify-between"
          style={{ width: 'min(1120px, calc(100% - 80px))' }}
        >
          {/* Left side */}
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-white/85 hover:bg-white/12 hover:text-white transition-all transform hover:scale-105">
              <Icon name="ArrowLeft" size={18} />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-white/85 hover:bg-white/12 hover:text-white transition-all transform hover:scale-105">
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>

          {/* Search */}
          <div className="h-11 w-[430px] rounded-full bg-black/28 border border-white/12 flex items-center px-5 gap-3 text-white/82">
            <Icon name="Search" size={18} className="text-white/60" />
            <input
              type="text"
              placeholder="Spider-Man: Across the Spider-Verse"
              className="bg-transparent border-none outline-none text-white/82 text-sm w-full placeholder:text-white/68"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button className="text-white/85 hover:text-white transition-colors">
              <Icon name="HelpCircle" size={20} />
            </button>
            <button className="text-white/85 hover:text-white transition-colors">
              <Icon name="Bell" size={20} />
            </button>
            <div className="w-px h-7 bg-white/24" />
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="User avatar"
              className="w-9 h-9 rounded-full border border-white/22 object-cover"
            />
            <span className="text-sm font-medium text-white">John Doe</span>
            <Icon name="ChevronRight" size={16} className="text-white/70" />
          </div>
        </div>
      </nav>

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
        style={{
          width: 'min(1160px, calc(100% - 96px))',
          height: '690px',
        }}
      >
        <div className="glass-card h-full w-full overflow-hidden relative">
          {/* Hero Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/68 to-black/28" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/72" style={{ top: '45%' }} />

          {/* Content */}
          <div className="absolute left-18 top-44 max-w-[520px] z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center h-[34px] px-[18px] rounded-full bg-white/10 border border-white/22 backdrop-blur-glass-sm mb-8"
            >
              <span className="text-sm font-medium text-white">New Trending</span>
            </motion.div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl font-bold text-white mb-4 tracking-[-0.5px]"
            >
              NETFLIX
            </motion.p>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-5xl font-extrabold leading-[0.95] tracking-[-1.8px] text-white mb-6"
              style={{ fontSize: 'clamp(32px, 5vw, 58px)' }}
            >
              Spider-Man:
              <br />
              Across the Spider-Verse
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-base text-white/72 leading-relaxed mb-7 max-w-[500px]"
            >
              After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood
              Spider-Man is catapulted across the multiverse, where he encounters a team
              of Spider-People charged with protecting its very existence.
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3 mb-8"
            >
              {['Action', 'Adventure', 'Animation'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center h-8 px-4 rounded-full bg-black/24 border border-white/18 backdrop-blur-glass-sm text-sm font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <Link to="/dashboard" className="btn-primary h-14 px-7 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                  <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                    <path d="M0 0L8 5L0 10V0Z" fill="currentColor" />
                  </svg>
                </div>
                <span>Watch Now</span>
              </Link>
              <button className="btn-secondary h-14 px-6 flex items-center gap-3">
                <Icon name="Download" size={20} />
                <span>Download</span>
              </button>
            </motion.div>
          </div>

          {/* Side navigation buttons */}
          <div className="absolute right-8 bottom-1/2 translate-y-1/2 flex flex-col gap-3 z-20">
            <button className="w-14 h-14 rounded-full bg-black/22 border border-white/22 backdrop-blur-glass-lg flex items-center justify-center text-white hover:bg-white/16 hover:scale-105 transition-all">
              <Icon name="ChevronLeft" size={24} />
            </button>
            <button className="w-14 h-14 rounded-full bg-black/22 border border-white/22 backdrop-blur-glass-lg flex items-center justify-center text-white hover:bg-white/16 hover:scale-105 transition-all">
              <Icon name="ChevronRight" size={24} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mini carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute left-18 right-18 bottom-20 z-40"
      >
        <div className="flex gap-5">
          {miniCards.map((card, _index) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.06, y: -4 }}
              className="w-[190px] h-24 rounded-2xl overflow-hidden relative bg-white/8 border border-white/10 shadow-[0_12px_34px_rgba(0,0,0,0.35)]"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-sm font-medium text-white">
                {card.title}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom floating menu */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50">
        <div className="glass-pill-dpd h-16 px-6 flex items-center gap-[18px]">
          <Link to="/dashboard" className="w-10 h-10 rounded-full flex items-center justify-center text-white/82 hover:bg-white/22 hover:text-white transition-colors">
            <Icon name="Home" size={22} active filled />
          </Link>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/82 hover:bg-white/22 hover:text-white transition-colors">
            <Icon name="Compass" size={22} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/82 hover:bg-white/22 hover:text-white transition-colors">
            <Icon name="Grid3X3" size={22} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/82 hover:bg-white/22 hover:text-white transition-colors">
            <Icon name="Circle" size={22} />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-white/82 hover:bg-white/22 hover:text-white transition-colors">
            <Icon name="User" size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
