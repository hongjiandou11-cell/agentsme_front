import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Video, Image as ImageIcon, Plus, 
  MonitorPlay, X, Wand2, UploadCloud, Folder, Clock, ArrowRight
} from 'lucide-react';
import { useDashboard } from '../components/DashboardContext';

export default function DashboardHome() {
  const [prompt, setPrompt] = useState('');
  const [trendCategory, setTrendCategory] = useState<'video' | 'image' | 'ecommerce' | 'app'>('video');
  const navigate = useNavigate();
  const { projects, addProject } = useDashboard();
  
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
    navigate('/dashboard/agent');
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

  const handleCreateProject = () => {
    if (!prompt.trim()) return;
    
    const newProject = addProject(prompt.trim(), 'agent');
    navigate(`/dashboard/projects/${newProject.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateProject();
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
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight text-center">
          任意视频，告诉 AI 即可创建
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
              onKeyDown={handleKeyDown}
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
              <button 
                onClick={handleCreateProject}
                disabled={!prompt.trim()}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center text-white transition-colors"
              >
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
                  navigate('/dashboard/projects/proj-1');
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

        {/* Recent Projects */}
        <div className="w-full max-w-6xl mb-16">
          <h2 className="text-lg font-bold mb-8">最近项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => {
              let linkTo = `/dashboard/projects/${project.id}`;
              if (project.type === 'app-shell') linkTo = '/dashboard/app/shell';
              if (project.type === 'app-video') linkTo = '/dashboard/app/video';
              if (project.type === 'ecommerce-video') linkTo = '/dashboard/ecommerce/video';
              if (project.type === 'ecommerce-material') linkTo = '/dashboard/ecommerce/material';

              return (
              <Link 
                key={project.id} 
                to={linkTo}
                state={{ projectId: project.id, prompt: project.title }}
                className="group bg-[#18181b] border border-white/5 hover:border-indigo-500/30 rounded-xl p-5 transition-all hover:shadow-lg hover:shadow-indigo-500/5 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1 flex-1 pr-4">
                    {project.title}
                  </h3>
                  <span className={`text-[10px] px-2 py-1 rounded-full border ${
                    project.status === 'active' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                    project.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                  }`}>
                    {project.status === 'active' ? '进行中' : project.status === 'completed' ? '已完成' : '已暂停'}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                    <span>Agent 进度</span>
                    <span>{project.agentState.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${project.agentState.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <span>进入工作流</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>

        {/* Popular Assets */}
        <div className="w-full max-w-6xl mb-16">
          <h2 className="text-lg font-bold mb-8">热门素材</h2>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
              {['video', 'image', 'ecommerce', 'app'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTrendCategory(cat as any)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    trendCategory === cat 
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                >
                  {cat === 'video' ? '视频' : cat === 'image' ? '图片' : cat === 'ecommerce' ? '电商' : 'APP'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden bg-zinc-800 border border-white/5 cursor-pointer">
                <div className="aspect-[4/5]">
                  <img 
                    src={`https://picsum.photos/seed/${trendCategory}${i}/400/500`} 
                    alt={`Trend ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
                    {trendCategory === 'video' ? '爆款短视频模板' : trendCategory === 'image' ? '高质量摄影图' : trendCategory === 'ecommerce' ? '电商主图设计' : 'APP 界面包装'} {i}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <span className="flex items-center gap-1"><Sparkles size={12} className="text-emerald-400" /> {Math.floor(Math.random() * 5000) + 1000}</span>
                    <span className="flex items-center gap-1"><Video size={12} /> {Math.floor(Math.random() * 1000) + 100}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vibe Coding Floating Panel */}
        {vibeVideoUrl && (
          <div className="fixed right-6 bottom-6 w-[360px] max-h-[85vh] z-[110] bg-[#1a1a1c]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/20 shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <h3 className="text-sm font-bold text-white">开启创作</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex bg-black/40 p-0.5 rounded-md border border-white/10">
                  <button
                    onClick={() => setVibeMode('video')}
                    className={`px-2 py-1 text-[10px] font-medium rounded transition-colors ${vibeMode === 'video' ? 'bg-white/20 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    视频
                  </button>
                  <button
                    onClick={() => setVibeMode('image')}
                    className={`px-2 py-1 text-[10px] font-medium rounded transition-colors ${vibeMode === 'image' ? 'bg-white/20 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                  >
                    图片
                  </button>
                </div>
                <button 
                  onClick={() => {
                    setVibeVideoUrl(null);
                    setVibePrompt('');
                  }} 
                  className="text-slate-400 hover:text-white p-1"
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
                  <h4 className="text-xs font-medium text-slate-300">当前生成结果</h4>
                  {isGenerating && <span className="text-[10px] text-primary animate-pulse">生成中...</span>}
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-black border border-white/10 relative shadow-inner">
                  {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-2">
                      <Wand2 size={20} className="text-primary animate-spin" />
                      <span className="text-[10px] text-primary">AI 正在施展魔法...</span>
                    </div>
                  ) : resultData ? (
                    <>
                      <video src="https://www.w3schools.com/html/mov_bbb.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="text-[10px] text-slate-500">等待生成...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Reference Sources */}
              <div className="space-y-2 shrink-0">
                <h4 className="text-xs font-medium text-slate-300">参考源</h4>
                <div className="grid grid-cols-2 gap-3">
                  {/* Source Video */}
                  <div className="space-y-1">
                    <div className="aspect-video rounded-md overflow-hidden bg-black/60 border border-white/10 relative group flex items-center justify-center">
                      {vibeMode === 'video' ? (
                        <video src={vibeVideoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" muted playsInline />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                          <UploadCloud size={16} className="mb-1" />
                          <span className="text-[10px]">添加视频</span>
                        </div>
                      )}
                      <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        {vibeMode === 'video' && <span className="text-[10px] text-white bg-black/60 px-2 py-1 rounded border border-white/20"><UploadCloud size={12} className="inline mr-1"/>替换</span>}
                        <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                    <div className="text-[10px] text-slate-500 text-center">源视频</div>
                  </div>
                  {/* Source Image */}
                  <div className="space-y-1">
                    <div className="aspect-video rounded-md overflow-hidden bg-black/60 border border-white/10 relative group flex items-center justify-center">
                      {vibeMode === 'image' ? (
                        <img src={vibeVideoUrl || "https://picsum.photos/seed/source-img/400/225"} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Source Image" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                          <UploadCloud size={16} className="mb-1" />
                          <span className="text-[10px]">添加图片(可多张)</span>
                        </div>
                      )}
                      <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        {vibeMode === 'image' && <span className="text-[10px] text-white bg-black/60 px-2 py-1 rounded border border-white/20"><UploadCloud size={12} className="inline mr-1"/>替换</span>}
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} multiple={vibeMode === 'video'} />
                      </label>
                    </div>
                    <div className="text-[10px] text-slate-500 text-center">源图片</div>
                  </div>
                </div>
              </div>

              {/* Prompt */}
              <div className="flex-1 flex flex-col space-y-2 min-h-[160px]">
                <h4 className="text-xs font-medium text-slate-300">提示词 (Prompt)</h4>
                <div className="relative flex-1 flex flex-col">
                  <textarea 
                    value={vibePrompt}
                    onChange={(e) => setVibePrompt(e.target.value)}
                    placeholder={vibeMode === 'video' ? "例如：把视频色调改成赛博朋克风，并加上动感的电子音乐..." : "例如：极简风桌面收纳盒，纯实木材质，磁吸模块化设计..."}
                    className="flex-1 w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 resize-none shadow-inner"
                  />
                  <button 
                    onClick={handleAnalyze}
                    className={`absolute bottom-2 right-2 px-2 py-1 rounded flex items-center gap-1 transition-all text-[10px] font-medium ${
                      isAnalyzing ? 'bg-primary/50 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
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
                        : 'bg-white/5 text-slate-500 cursor-not-allowed'
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
                        ? 'bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-primary-hover' 
                        : 'bg-white/5 text-slate-500 cursor-not-allowed'
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
                        : 'bg-white/5 text-slate-500 cursor-not-allowed'
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
                        ? 'bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-primary-hover' 
                        : 'bg-white/5 text-slate-500 cursor-not-allowed'
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
