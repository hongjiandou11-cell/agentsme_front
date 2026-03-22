import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Video, Image as ImageIcon, Plus, 
  MonitorPlay, X, Wand2, UploadCloud, Folder, Clock, ArrowRight, ArrowUp, Leaf
} from 'lucide-react';
import { useDashboard } from '../components/DashboardContext';

export default function DashboardHome() {
  const [prompt, setPrompt] = useState('');
  const [activeAI, setActiveAI] = useState<'app' | 'marketing'>('app');
  const navigate = useNavigate();
  const { projects, addProject } = useDashboard();
  
  // Vibe Coding Floating Panel State
  const [vibeVideoUrl, setVibeVideoUrl] = useState<string | null>(null);
  const [vibeMode, setVibeMode] = useState<'video' | 'image'>('video');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([]);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [trendCategory, setTrendCategory] = useState<'video' | 'image' | 'ecommerce' | 'app'>('video');
  const [vibePrompt, setVibePrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setResultData({ success: true });
    }, 3000);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files) as File[];
      const totalFiles = selectedFiles.length + selectedImageUrls.length + newFiles.length;
      
      if (totalFiles > 5) {
        alert('最多只能上传5个素材');
        return;
      }
      
      setSelectedFiles(prev => [...prev, ...newFiles]);
      
      if (!vibeVideoUrl) {
        const file = newFiles[0];
        setVibeVideoUrl(URL.createObjectURL(file as Blob));
        if (file.type.startsWith('image/')) {
          setVibeMode('image');
        } else {
          setVibeMode('video');
        }
      }
    }
  };

  const removeFile = (index: number, isTemplate: boolean) => {
    if (isTemplate) {
      setSelectedImageUrls(prev => prev.filter((_, i) => i !== index));
    } else {
      setSelectedFiles(prev => prev.filter((_, i) => i !== index));
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

        {/* Vibe Coding Layout (Referencing Home.tsx) */}
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
          
          {/* Left Column: Vibe Coding Mockup */}
          <div className="w-full lg:w-1/2 relative group/editor">
            {/* Glowing background effect for emphasis */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-accent-blue/40 to-accent-pink/40 rounded-2xl blur-xl opacity-60 group-hover/editor:opacity-100 transition duration-1000 animate-pulse-slow"></div>
            
            <div className="relative bg-[#0f0f11]/90 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.2)] flex flex-col transition-all">
              
              {/* AI Tabs */}
              <div className="relative z-10 flex items-center gap-6 px-6 pt-4 border-b border-white/10 shrink-0 bg-white/[0.02]">
                <button 
                  onClick={() => setActiveAI('app')}
                  className={`pb-3 text-sm font-medium transition-colors relative ${activeAI === 'app' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  APP AI 助手
                  {activeAI === 'app' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.5)]"></div>}
                </button>
                <button 
                  onClick={() => setActiveAI('marketing')}
                  className={`pb-3 text-sm font-medium transition-colors relative ${activeAI === 'marketing' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  营销 AI 助手
                  {activeAI === 'marketing' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-pink rounded-t-full shadow-[0_-2px_10px_rgba(14,165,233,0.5)]"></div>}
                </button>
              </div>

              <div className="relative z-10 p-6 flex flex-col gap-4 bg-gradient-to-b from-transparent to-white/[0.02]">
                <textarea 
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-lg text-slate-300 resize-none placeholder-slate-600 leading-relaxed min-h-[120px]"
                  placeholder={activeAI === 'app' ? "请你根据我上传的素材，帮我只做一个顶级的app营销素材，我的app名字叫傻妞，是一个ai助手，可以实现顶级的情感陪伴，每日日报生成..." : "请帮我完成选品，素材生成，和小红书的自动发布..."}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                ></textarea>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* File Upload Button */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*,video/*" 
                      multiple
                    />
                    
                    {/* Add More Button */}
                    {(selectedFiles.length + selectedImageUrls.length) < 5 && (
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative group overflow-hidden shadow-lg"
                        title="上传素材 (最多5张)"
                      >
                        <Plus size={20} />
                      </button>
                    )}
                    
                    {/* Templates Button */}
                    <button 
                      onClick={() => setIsTemplatesModalOpen(true)}
                      className="h-10 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-slate-300 hover:text-white transition-colors shadow-lg"
                    >
                      <Leaf size={16} className="text-emerald-400" />
                      <span className="text-sm font-medium">灵感库</span>
                    </button>

                    {/* Display Template Images */}
                    {selectedImageUrls.map((url, index) => (
                      <div key={`template-${index}`} className="relative group w-10 h-10 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                        <img src={url} alt={`Template ${index}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeFile(index, true); }}
                            className="text-white hover:text-rose-400"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Display Uploaded Files */}
                    {selectedFiles.map((file, index) => (
                      <div key={`file-${index}`} className="relative group w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center shadow-lg">
                        {file.type.startsWith('image/') ? (
                          <img src={URL.createObjectURL(file)} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-lg text-emerald-400">check</span>
                        )}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeFile(index, false); }}
                            className="text-white hover:text-rose-400"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    onClick={handleCreateProject}
                    disabled={!prompt.trim()}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shadow-lg hover:-translate-y-0.5 transform"
                  >
                    <ArrowUp size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Video Preview */}
          <div className="w-full lg:w-1/2 relative group/preview mt-8 lg:mt-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent-blue/30 to-accent-pink/30 rounded-3xl blur-xl opacity-50 group-hover/preview:opacity-80 transition duration-1000"></div>
            
            <div className="relative w-full aspect-video bg-[#0a0a0c] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
              {vibeMode === 'video' ? (
                <video 
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  src={vibeVideoUrl || "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"} 
                />
              ) : (
                <img 
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                  src={vibeVideoUrl || 'https://picsum.photos/seed/vibe/1200/800'} 
                  alt="Vibe Preview"
                  referrerPolicy="no-referrer"
                />
              )}
              
              {/* Overlay Controls - Bottom */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-slate-300 font-mono tracking-widest uppercase z-20">
                <span className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  LIVE PREVIEW
                </span>
                <span className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  {vibeMode === 'video' ? '1080P / 60FPS' : '4K / HDR'}
                </span>
              </div>
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
