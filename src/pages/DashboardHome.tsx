import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Video, Image as ImageIcon, Plus, 
  MonitorPlay, X, Wand2, UploadCloud
} from 'lucide-react';

export default function DashboardHome() {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('create');
  
  const tabs = [
    { id: 'create', label: '创作' },
    { id: 'monitor', label: '监控' },
    { id: 'settings', label: '设置' },
  ];
  
  // Vibe Coding Floating Panel State
  const [vibeVideoUrl, setVibeVideoUrl] = useState<string | null>(null);
  const [vibeMode, setVibeMode] = useState<'video' | 'image'>('video');
  const [vibePrompt, setVibePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultData, setResultData] = useState<{ resultUrl?: string; logs?: string[] } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!vibeVideoUrl) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setVibePrompt('【视频风格】赛博朋克/电影感\n【转场效果】平滑缩放/淡入淡出\n【画面描述】...');
    }, 2000);
  };

  const handleGenerate = async () => {
    if (!vibeVideoUrl) return;
    setIsGenerating(true);
    setResultData(null);
    setTimeout(() => {
      setIsGenerating(false);
      setResultData({ resultUrl: 'success' });
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setVibeVideoUrl(URL.createObjectURL(file));
      if (file.type.startsWith('image/')) {
        setVibeMode('image');
      } else {
        setVibeMode('video');
      }
    }
  };

  const featuredCards = [
    {
      title: 'Veo 3.1',
      image: 'https://picsum.photos/seed/veo/600/400',
    },
    {
      title: 'Nano Banana 2',
      image: 'https://picsum.photos/seed/nano/600/400',
    },
    {
      title: 'Remotion',
      image: 'https://picsum.photos/seed/remotion/600/400',
    },
    {
      title: 'Wan',
      image: 'https://picsum.photos/seed/wan/600/400',
    },
    {
      title: 'Kling 3.0',
      image: 'https://picsum.photos/seed/kling/600/400',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#0f0f11] text-white p-8 md:p-12 lg:p-16">
      <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-white border-b-2 border-primary'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight text-center">
          任意视频，告诉你的 Agent 即可创建
        </h1>

        {/* Omni-Prompt Area */}
        <div className="w-full max-w-4xl bg-[#18181b] border border-white/10 rounded-2xl p-6 shadow-2xl mb-16">
          {/* Input Area */}
          <div className="flex gap-4">
            {/* Reference Upload Box */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 flex-shrink-0 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group"
            >
              <Plus size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
              <span className="text-xs text-zinc-500 group-hover:text-zinc-300">参考</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*,video/*" 
            />

            {/* Textarea */}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="用 AI 助手与参考素材规划任意长度视频。&#10;上传 1-5 张参考图或视频并用 @ 引用以创建互动。例如：用 @Image 1 作首帧、@Image 2 作尾帧，让她们像 @Video 1 那样跳舞。"
              className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-zinc-300 placeholder:text-zinc-600 leading-relaxed min-h-[96px]"
            />
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-zinc-400 flex items-center gap-1.5 transition-colors">
                Standard <span className="text-yellow-500">👑</span> ▾
              </button>
              <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-zinc-400 flex items-center gap-1.5 transition-colors">
                <Video size={14} /> 16:9 ▾
              </button>
              <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-zinc-400 flex items-center gap-1.5 transition-colors">
                480p ▾
              </button>
              <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-zinc-400 flex items-center gap-1.5 transition-colors">
                <MonitorPlay size={14} /> 15s ▾
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <Sparkles size={12} /> 7.5
              </span>
              <button className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Cards */}
        <div className="w-full max-w-6xl mb-16">
          <h2 className="text-lg font-bold mb-6">最新</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {featuredCards.map((card, idx) => (
              <div 
                key={idx} 
                className="group cursor-pointer"
                onClick={() => {
                  setVibeVideoUrl(card.image);
                  setVibeMode('video');
                }}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-zinc-800">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight">{card.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atomic Lab Section */}
        <div className="w-full max-w-6xl mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold mb-1">原子实验室</h2>
              <p className="text-zinc-400 text-sm">最小化功能单元，快速拼装您的专属 Agent</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Lab Cards */}
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#18181b] p-6 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('https://picsum.photos/seed/video-clone/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-black/80"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-2 tracking-tight text-center">视频克隆</h4>
                <p className="text-xs text-zinc-300 text-center">AI驱动的爆款视频生成</p>
              </div>
              <Link to="/dashboard/app/video" className="relative z-10 w-full bg-white/10 hover:bg-white/20 py-2.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block backdrop-blur-sm">
                立即使用
              </Link>
            </div>
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#18181b] p-6 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('https://picsum.photos/seed/ecommerce-video/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-black/80"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-2 tracking-tight text-center">电商带货视频克隆</h4>
                <p className="text-xs text-zinc-300 text-center">专属电商场景的带货视频</p>
              </div>
              <Link to="/dashboard/ecommerce/video" className="relative z-10 w-full bg-white/10 hover:bg-white/20 py-2.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block backdrop-blur-sm">
                立即使用
              </Link>
            </div>
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#18181b] p-6 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('https://picsum.photos/seed/product-design/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-black/80"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-2 tracking-tight text-center">商品素材</h4>
                <p className="text-xs text-zinc-300 text-center">一键生成高质量电商视觉</p>
              </div>
              <Link to="/dashboard/ecommerce/material" className="relative z-10 w-full bg-white/10 hover:bg-white/20 py-2.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block backdrop-blur-sm">
                立即使用
              </Link>
            </div>
            <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#18181b] p-6 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-all duration-700" style={{ backgroundImage: "url('https://picsum.photos/seed/mobile-app/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-black/80"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-2 tracking-tight text-center">APP套壳</h4>
                <p className="text-xs text-zinc-300 text-center">快速构建跨平台应用套壳</p>
              </div>
              <Link to="/dashboard/app/shell" className="relative z-10 w-full bg-white/10 hover:bg-white/20 py-2.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block backdrop-blur-sm">
                立即使用
              </Link>
            </div>
          </div>
        </div>

        {/* Vibe Coding Floating Panel */}
        {vibeVideoUrl && (
          <div className="fixed right-6 bottom-6 w-[360px] max-h-[85vh] z-[110] bg-[#1a1a1c]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/20 shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-400" />
                <h3 className="text-sm font-bold text-white">开启创作</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex bg-black/40 p-0.5 rounded-md border border-white/10">
                  <button
                    onClick={() => setVibeMode('video')}
                    className={`px-2 py-1 text-[10px] font-medium rounded transition-colors ${vibeMode === 'video' ? 'bg-white/20 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                  >
                    视频
                  </button>
                  <button
                    onClick={() => setVibeMode('image')}
                    className={`px-2 py-1 text-[10px] font-medium rounded transition-colors ${vibeMode === 'image' ? 'bg-white/20 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                  >
                    图片
                  </button>
                </div>
                <button 
                  onClick={() => {
                    setVibeVideoUrl(null);
                    setVibePrompt('');
                  }} 
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 custom-scrollbar">
              
              {/* Generated Result */}
              <div className="space-y-2 shrink-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-medium text-zinc-300">当前生成结果</h4>
                  {isGenerating && <span className="text-[10px] text-indigo-400 animate-pulse">生成中...</span>}
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-black border border-white/10 relative shadow-inner">
                  {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-2">
                      <Wand2 size={20} className="text-indigo-400 animate-spin" />
                      <span className="text-[10px] text-indigo-400">AI 正在施展魔法...</span>
                    </div>
                  ) : resultData ? (
                    <>
                      <video src="https://www.w3schools.com/html/mov_bbb.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="text-[10px] text-zinc-500">等待生成...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Reference Sources */}
              <div className="space-y-2 shrink-0">
                <h4 className="text-xs font-medium text-zinc-300">参考源</h4>
                <div className="grid grid-cols-2 gap-3">
                  {/* Source Video */}
                  <div className="space-y-1">
                    <div className="aspect-video rounded-md overflow-hidden bg-black/60 border border-white/10 relative group flex items-center justify-center">
                      {vibeMode === 'video' ? (
                        <video src={vibeVideoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" muted playsInline />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
                          <UploadCloud size={16} className="mb-1" />
                          <span className="text-[10px]">添加视频</span>
                        </div>
                      )}
                      <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        {vibeMode === 'video' && <span className="text-[10px] text-white bg-black/60 px-2 py-1 rounded border border-white/20"><UploadCloud size={12} className="inline mr-1"/>替换</span>}
                        <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                    <div className="text-[10px] text-zinc-500 text-center">源视频</div>
                  </div>
                  {/* Source Image */}
                  <div className="space-y-1">
                    <div className="aspect-video rounded-md overflow-hidden bg-black/60 border border-white/10 relative group flex items-center justify-center">
                      {vibeMode === 'image' ? (
                        <img src={vibeVideoUrl || "https://picsum.photos/seed/source-img/400/225"} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Source Image" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
                          <UploadCloud size={16} className="mb-1" />
                          <span className="text-[10px]">添加图片(可多张)</span>
                        </div>
                      )}
                      <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        {vibeMode === 'image' && <span className="text-[10px] text-white bg-black/60 px-2 py-1 rounded border border-white/20"><UploadCloud size={12} className="inline mr-1"/>替换</span>}
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} multiple={vibeMode === 'video'} />
                      </label>
                    </div>
                    <div className="text-[10px] text-zinc-500 text-center">源图片</div>
                  </div>
                </div>
              </div>

              {/* Prompt */}
              <div className="flex-1 flex flex-col space-y-2 min-h-[160px]">
                <h4 className="text-xs font-medium text-zinc-300">提示词 (Prompt)</h4>
                <div className="relative flex-1 flex flex-col">
                  <textarea 
                    value={vibePrompt}
                    onChange={(e) => setVibePrompt(e.target.value)}
                    placeholder={vibeMode === 'video' ? "例如：把视频色调改成赛博朋克风，并加上动感的电子音乐..." : "例如：极简风桌面收纳盒，纯实木材质，磁吸模块化设计..."}
                    className="flex-1 w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 resize-none shadow-inner"
                  />
                  <button 
                    onClick={handleAnalyze}
                    className={`absolute bottom-2 right-2 px-2 py-1 rounded flex items-center gap-1 transition-all text-[10px] font-medium ${
                      isAnalyzing ? 'bg-indigo-500/50 text-white' : 'bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {isAnalyzing ? <Wand2 size={10} className="animate-spin" /> : <Wand2 size={10} />}
                    AI 解析
                  </button>
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="p-3 border-t border-white/10 bg-black/20 shrink-0 flex gap-2">
              {vibeMode === 'video' ? (
                <>
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !vibePrompt.trim()}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      vibePrompt.trim() && !isGenerating
                        ? 'bg-white/10 text-white hover:bg-white/20' 
                        : 'bg-white/5 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    <Wand2 size={14} />
                    视频编辑
                  </button>
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !vibePrompt.trim()}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      vibePrompt.trim() && !isGenerating
                        ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:bg-indigo-500' 
                        : 'bg-white/5 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles size={14} />
                    视频继续创作
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !vibePrompt.trim()}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      vibePrompt.trim() && !isGenerating
                        ? 'bg-white/10 text-white hover:bg-white/20' 
                        : 'bg-white/5 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    <ImageIcon size={14} />
                    图片编辑
                  </button>
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !vibePrompt.trim()}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      vibePrompt.trim() && !isGenerating
                        ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:bg-indigo-500' 
                        : 'bg-white/5 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    <Video size={14} />
                    作为图片源创作视频
                  </button>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
