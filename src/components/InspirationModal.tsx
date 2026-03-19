import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface InspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'video' | 'image' | 'product';
  onSelect: (url: string) => void;
}

const videoInspirations = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
];

const imageInspirations = [
  'https://picsum.photos/seed/insp1/600/800',
  'https://picsum.photos/seed/insp2/600/800',
  'https://picsum.photos/seed/insp3/800/600',
  'https://picsum.photos/seed/insp4/800/600',
  'https://picsum.photos/seed/insp5/600/600',
  'https://picsum.photos/seed/insp6/600/600',
];

const productInspirations = [
  'https://picsum.photos/seed/prod1/600/600',
  'https://picsum.photos/seed/prod2/600/600',
  'https://picsum.photos/seed/prod3/600/600',
  'https://picsum.photos/seed/prod4/600/600',
  'https://picsum.photos/seed/prod5/600/600',
  'https://picsum.photos/seed/prod6/600/600',
];

export default function InspirationModal({ isOpen, onClose, type, onSelect }: InspirationModalProps) {
  if (!isOpen) return null;

  const items = type === 'video' ? videoInspirations : type === 'product' ? productInspirations : imageInspirations;
  const title = type === 'video' ? '视频' : type === 'product' ? '产品图片' : '图片';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#1a1a1c] border border-white/10 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h3 className="text-xl font-bold text-white">选择灵感{title}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((url, idx) => (
                <div 
                  key={idx} 
                  className="relative group cursor-pointer rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-colors aspect-video bg-black/50"
                  onClick={() => {
                    onSelect(url);
                    onClose();
                  }}
                >
                  {type === 'video' ? (
                    <video 
                      src={`${url}#t=2`} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      muted 
                      loop 
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 2; }}
                    />
                  ) : (
                    <img 
                      src={url} 
                      alt={`Inspiration ${idx}`} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">选择</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
