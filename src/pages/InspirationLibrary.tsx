import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useDashboard } from '../components/DashboardContext';

export default function InspirationLibrary() {
  const isDashboard = useDashboard();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'image';

  const images = Array.from({ length: 20 }).map((_, i) => `https://picsum.photos/seed/image${i}/600/800`);
  const videos = Array.from({ length: 20 }).map((_, i) => `https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4#t=${i * 5}`);

  const items = type === 'video' ? videos : images;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#0a0a0a] text-slate-100 min-h-screen p-8"
    >
      {!isDashboard && (
        <nav className="mb-8">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 border border-white/10 w-fit">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">返回首页</span>
          </Link>
        </nav>
      )}
      <h1 className="text-3xl font-bold text-white mb-8 capitalize">{type} 灵感库</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, i) => (
          <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            {type === 'video' ? (
              <video src={item} className="w-full h-full object-cover" controls />
            ) : (
              <img src={item} alt="Inspiration" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
