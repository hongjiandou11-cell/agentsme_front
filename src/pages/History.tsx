import React from 'react';
import { motion } from 'motion/react';
import { useDashboard } from '../components/DashboardContext';
import { Clock, Image as ImageIcon, Video, Smartphone, ShoppingBag } from 'lucide-react';

export default function History() {
  const { history } = useDashboard();

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'app-shell': return { label: 'APP 截图包装', icon: <Smartphone size={14} />, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' };
      case 'app-video': return { label: 'APP 视频克隆', icon: <Video size={14} />, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' };
      case 'ecommerce-video': return { label: '电商带货视频', icon: <ShoppingBag size={14} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' };
      case 'ecommerce-material': return { label: '商品图制作', icon: <ImageIcon size={14} />, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' };
      default: return { label: '生成记录', icon: <Clock size={14} />, color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-500/20' };
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0f0f11] text-white p-8 md:p-12 lg:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">生成历史</h1>
            <p className="text-zinc-400 text-sm">查看所有通过原子能力生成的视频和图片记录。</p>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-[#18181b] border border-white/5 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-medium text-zinc-300 mb-2">暂无生成记录</h3>
            <p className="text-sm text-zinc-500">使用左侧菜单中的原子能力生成内容后，记录将显示在这里。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {history.map((item) => {
              const typeInfo = getTypeInfo(item.type);
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#18181b] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors group flex flex-col"
                >
                  <div className="aspect-video bg-black relative overflow-hidden">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700">
                        {typeInfo.icon}
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-medium border backdrop-blur-md flex items-center gap-1 ${typeInfo.bg} ${typeInfo.color}`}>
                        {typeInfo.icon}
                        {typeInfo.label}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium text-sm text-zinc-200 mb-2 line-clamp-2 flex-1" title={item.title}>
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Clock size={12} />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                      {item.status === 'success' ? (
                        <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">成功</span>
                      ) : item.status === 'failed' ? (
                        <span className="text-[10px] text-red-400 bg-red-400/10 px-2 py-0.5 rounded">失败</span>
                      ) : (
                        <span className="text-[10px] text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded animate-pulse">生成中</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
