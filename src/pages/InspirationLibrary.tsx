import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardContext } from '../components/DashboardContext';
import { Play, Image as ImageIcon, Video, ArrowLeft, Filter, Sparkles, Heart, Eye } from 'lucide-react';

type Category = 'app' | 'saas' | 'ecommerce';
type Dimension = 'video' | 'image';

export default function InspirationLibrary() {
  const dashboardContext = useContext(DashboardContext);
  const isDashboard = !!dashboardContext;
  const [category, setCategory] = useState<Category>('app');
  const [dimension, setDimension] = useState<Dimension>('image');

  const categories: { id: Category; label: string }[] = [
    { id: 'app', label: 'APP' },
    { id: 'saas', label: 'SaaS' },
    { id: 'ecommerce', label: '电商' },
  ];

  // Generate mock items based on category and dimension
  const generateItems = () => {
    return Array.from({ length: 24 }).map((_, i) => {
      const height = dimension === 'image' ? [300, 400, 500][i % 3] : 300;
      return {
        id: `${category}-${dimension}-${i}`,
        title: `${categories.find(c => c.id === category)?.label} ${dimension === 'video' ? '视频' : '图片'} ${i + 1}`,
        url: dimension === 'video' 
          ? `https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4#t=${(i % 5) * 5}`
          : `https://picsum.photos/seed/${category}${i}/600/${height}`,
        height,
        likes: Math.floor(Math.random() * 1000) + 100,
        views: Math.floor(Math.random() * 5000) + 500,
      };
    });
  };

  const items = generateItems();

  return (
    <div className="bg-[#0f0f11] text-slate-100 min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 pt-12 pb-8 px-8 md:px-12 lg:px-16">
        {!isDashboard && (
          <nav className="mb-8">
            <Link to="/" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 border border-white/10 w-fit backdrop-blur-md">
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">返回首页</span>
            </Link>
          </nav>
        )}
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                <Sparkles size={20} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">灵感库</h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg max-w-xl"
            >
              探索全球顶尖的数字产品设计与营销创意，激发你的下一个爆款灵感。
            </motion.p>
          </div>

          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-xl"
          >
            {/* Category Tabs */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    category === c.id 
                      ? 'bg-white/10 text-white shadow-lg shadow-black/20' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="w-px h-8 bg-white/10 hidden sm:block" />

            {/* Dimension Toggle */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setDimension('video')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  dimension === 'video' 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Video size={16} />
                视频
              </button>
              <button
                onClick={() => setDimension('image')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  dimension === 'image' 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <ImageIcon size={16} />
                图片
              </button>
            </div>
          </motion.div>
        </div>
      </header>
      
      {/* Grid Content */}
      <main className="flex-1 px-8 md:px-12 lg:px-16 pb-24 relative z-10 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${category}-${dimension}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, staggerChildren: 0.05 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6"
          >
            {items.map((item, i) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-xl mb-6"
              >
                {dimension === 'video' ? (
                  <div className="relative aspect-[9/16] bg-black">
                    <video 
                      src={item.url} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                      muted 
                      loop 
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                        <Play size={24} className="ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative bg-zinc-800" style={{ height: item.height }}>
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-zinc-300">
                    <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                      <Heart size={14} />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye size={14} />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
