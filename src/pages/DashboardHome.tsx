import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, ArrowUp, Smartphone, Video, Image as ImageIcon, PlayCircle, 
  FileText, Palette, Share2, BarChart2, Search, TrendingUp, Lightbulb,
  Clock, Sparkles, X, Wand2, UploadCloud, Gamepad2, Globe, ShoppingBag,
  ArrowRight, CheckCircle2, Loader2
} from 'lucide-react';
import { useDashboard } from '../components/DashboardContext';

export default function DashboardHome() {
  const [prompt, setPrompt] = useState('');
  const [activeAgentTab, setActiveAgentTab] = useState<'app' | 'ecommerce'>('app');
  const navigate = useNavigate();
  const { projects, addProject } = useDashboard();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Vibe Coding Floating Panel State
  const [vibeVideoUrl, setVibeVideoUrl] = useState<string | null>(null);
  const [vibeMode, setVibeMode] = useState<'video' | 'image'>('video');
  const [vibePrompt, setVibePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultData, setResultData] = useState<{ resultUrl?: string; logs?: string[] } | null>(null);

  const presetPrompts = [
    { id: 1, icon: Gamepad2, text: '生成互动小游戏' },
    { id: 2, icon: Globe, text: '搭建企业官网' },
    { id: 3, icon: BarChart2, text: '分析行业趋势' },
    { id: 4, icon: Video, text: '创作营销视频' },
    { id: 5, icon: ShoppingBag, text: '电商爆款文案' },
  ];

  const capabilities = [
    { id: 1, title: 'APP 套壳', desc: '基于多 Agent 协同的截图包装与设备壳方案。', icon: Smartphone, bgGradient: 'from-[#1A2528] to-[#0B0E10]', iconColor: 'text-[#3B6C72]', image: 'https://picsum.photos/seed/mobile-app/600/800' },
    { id: 2, title: 'APP 视频克隆', desc: '参考视频与截图的自动化动效复刻。', icon: Video, bgGradient: 'from-[#251A30] to-[#0B0E10]', iconColor: 'text-[#6D5A8C]', image: 'https://picsum.photos/seed/video-clone/600/800' },
    { id: 3, title: '商品图制作', desc: '高转化详情页与电商主图智能生成。', icon: ImageIcon, bgGradient: 'from-[#30251A] to-[#0B0E10]', iconColor: 'text-[#9C8A70]', image: 'https://picsum.photos/seed/product-design/600/800' },
    { id: 4, title: '电商带货视频', desc: '一键替换商品，批量生成带货短视频。', icon: PlayCircle, bgGradient: 'from-[#1A2030] to-[#0B0E10]', iconColor: 'text-[#5A6A8C]', image: 'https://picsum.photos/seed/ecommerce-video/600/800' },
    { id: 5, title: '营销文案生成', desc: '精准对齐业务目标的爆款文案创作。', icon: FileText, bgGradient: 'from-[#1A2A25] to-[#0B0E10]', iconColor: 'text-[#4A7A6A]', image: 'https://picsum.photos/seed/mobile-app/600/800' },
    { id: 6, title: '品牌广告创作', desc: '符合品牌视觉规范的广告素材矩阵。', icon: Palette, bgGradient: 'from-[#301A25] to-[#0B0E10]', iconColor: 'text-[#8C5A6A]', image: 'https://picsum.photos/seed/product-design/600/800' },
    { id: 7, title: '社媒内容发布', desc: '多平台矩阵账号的一键分发与管理。', icon: Share2, bgGradient: 'from-[#1A252A] to-[#0B0E10]', iconColor: 'text-[#4A7A86]', image: 'https://picsum.photos/seed/video-clone/600/800' },
    { id: 8, title: '数据分析洞察', desc: '全链路投放数据追踪与 ROI 优化建议。', icon: BarChart2, bgGradient: 'from-[#301A35] to-[#0B0E10]', iconColor: 'text-[#8C5A8C]', image: 'https://picsum.photos/seed/ecommerce-video/600/800' },
    { id: 9, title: '竞品素材采集', desc: '全网爆款视频与优质素材的智能监控。', icon: Search, bgGradient: 'from-[#1A1A30] to-[#0B0E10]', iconColor: 'text-[#5A5A8C]', image: 'https://picsum.photos/seed/video-clone/600/800' },
    { id: 10, title: '智能选品助手', desc: '基于大数据的蓝海商品挖掘与趋势预测。', icon: TrendingUp, bgGradient: 'from-[#252A30] to-[#0B0E10]', iconColor: 'text-[#6A7A8C]', image: 'https://picsum.photos/seed/product-design/600/800' },
  ];

  const hotCases = [
    { id: 1, image: 'https://picsum.photos/seed/case1/400/500' },
    { id: 2, image: 'https://picsum.photos/seed/case2/400/500' },
    { id: 3, image: 'https://picsum.photos/seed/case3/400/500' },
    { id: 4, image: 'https://picsum.photos/seed/case4/400/500' },
  ];

  const handleCreateProject = () => {
    if (!prompt.trim()) return;
    const newProject = addProject(prompt.trim());
    navigate(`/dashboard/projects/${newProject.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCreateProject();
    }
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

  return (
    <div className="flex-1 overflow-y-auto bg-[#0B0E14] text-white relative min-h-screen">
      
      {/* Deep Tech Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-16 pb-24 flex flex-col items-center">
        
        {/* Slogan Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141A] border border-white/5 mb-6">
            <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-blue-400"></div>
            </div>
            <span className="text-xs font-medium text-zinc-300 tracking-wider">Agents Me</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            从创意到增长，AI 端到端赋能
          </h1>
          <p className="text-base text-zinc-500 max-w-2xl mx-auto">
            素材制作 · 内容发布 · 营销推广 —— 全链路一站完成
          </p>
        </motion.div>

        {/* Omni-Prompt Console */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-4xl bg-[#12141A] border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
        >
          {/* Tabs */}
          <div className="flex items-center border-b border-white/5 px-6 pt-4 gap-8">
            <button 
              onClick={() => setActiveAgentTab('app')}
              className={`pb-3 text-sm font-medium transition-colors relative ${activeAgentTab === 'app' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              APP Agent
              {activeAgentTab === 'app' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_-2px_10px_rgba(59,130,246,0.4)]"></div>}
            </button>
            <button 
              onClick={() => setActiveAgentTab('ecommerce')}
              className={`pb-3 text-sm font-medium transition-colors relative ${activeAgentTab === 'ecommerce' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              电商营销Agent
              {activeAgentTab === 'ecommerce' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_-2px_10px_rgba(59,130,246,0.4)]"></div>}
            </button>
          </div>
          
          {/* Textarea */}
          <div className="p-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={activeAgentTab === 'app' ? "请描述你的 APP 营销需求，例如：帮我制作一个社交APP的推广素材..." : "请描述你的电商营销需求，例如：帮我生成一套春季女装的带货短视频..."}
              className="w-full bg-transparent border-none outline-none resize-none text-sm text-zinc-200 placeholder:text-zinc-600 leading-relaxed min-h-[100px]"
            />
          </div>
          
          {/* Footer */}
          <div className="px-6 pb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                title="上传附件"
              >
                <Plus size={16} />
              </button>
              <button className="h-9 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
                <Lightbulb size={14} className="text-blue-400" />
                灵感库
              </button>
              <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
            </div>
            
            <button 
              onClick={handleCreateProject}
              disabled={!prompt.trim()}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-zinc-300 hover:text-white border border-white/5 transition-all"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </motion.div>

        {/* Preset Prompts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full max-w-4xl mt-4 flex flex-wrap items-center justify-center gap-3"
        >
          {presetPrompts.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setPrompt(preset.text)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#12141A] border border-white/5 hover:border-white/10 hover:bg-white/5 text-zinc-400 hover:text-zinc-200 transition-all text-sm"
            >
              <preset.icon size={14} />
              <span>{preset.text}</span>
            </button>
          ))}
        </motion.div>

        {/* Core Capabilities Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-base font-bold text-white tracking-wide">核心能力</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {capabilities.map((cap) => (
              <div key={cap.id} className={`group relative h-44 rounded-2xl overflow-hidden bg-gradient-to-br ${cap.bgGradient} border border-white/10 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1`}>
                
                {/* Background Image */}
                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-50 transition-all duration-700" style={{ backgroundImage: `url('${cap.image}')` }}></div>
                
                {/* Subtle technical background pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                
                {/* Large Abstract Graphic */}
                <div className={`absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-all duration-700 transform group-hover:scale-105 ${cap.iconColor}`}>
                  <cap.icon size={120} strokeWidth={1} />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-center items-center text-center z-10">
                  <h3 className="text-lg font-bold text-white mb-2 tracking-wide">{cap.title}</h3>
                  <p className="text-xs text-zinc-200/90 line-clamp-2 leading-relaxed">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Tasks */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full mt-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-base font-bold text-white tracking-wide">最近任务</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-4 snap-x [&::-webkit-scrollbar]:hidden">
            {projects.length > 0 ? projects.map((project) => (
              <Link 
                key={project.id} 
                to={`/dashboard/projects/${project.id}`}
                className="snap-start shrink-0 w-[280px] md:w-[320px] group flex flex-col justify-between p-5 rounded-xl bg-[#12141A]/80 border border-white/5 hover:bg-[#12141A] hover:border-blue-500/30 transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                    project.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                    project.status === 'active' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                    'bg-zinc-500/10 border-zinc-500/20 text-zinc-400'
                  }`}>
                    {project.status === 'completed' ? <CheckCircle2 size={18} /> : 
                     project.status === 'active' ? <Loader2 size={18} className="animate-spin" /> : 
                     <Clock size={18} />}
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 duration-300">
                    <span className="text-[10px] font-medium text-blue-400">进入</span>
                    <ArrowRight size={14} className="text-blue-400" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                    <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                    <span>Agent 工作流</span>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="w-full text-center py-12 text-zinc-500 text-sm bg-[#12141A]/40 rounded-xl border border-white/5 flex flex-col items-center gap-3">
                <Wand2 size={24} className="text-zinc-600" />
                暂无最近任务，在上方输入需求开始创建
              </div>
            )}
          </div>
        </motion.div>

        {/* Hot Cases */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full mt-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-base font-bold text-white tracking-wide">热门案例</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotCases.map((item) => (
              <div key={item.id} className="aspect-[4/3] rounded-xl overflow-hidden relative group cursor-pointer border border-white/5">
                <img 
                  src={item.image} 
                  alt={`Hot Case ${item.id}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Vibe Coding Floating Panel */}
      {vibeVideoUrl && (
        <div className="fixed right-8 bottom-8 w-[380px] max-h-[85vh] z-[110] bg-[#12141A]/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Sparkles size={12} className="text-blue-400" />
              </div>
              <h3 className="text-sm font-bold text-white">Vibe 创作</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/5">
                <button
                  onClick={() => setVibeMode('video')}
                  className={`px-3 py-1 text-[10px] font-medium rounded-md transition-all ${vibeMode === 'video' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                >
                  视频
                </button>
                <button
                  onClick={() => setVibeMode('image')}
                  className={`px-3 py-1 text-[10px] font-medium rounded-md transition-all ${vibeMode === 'image' ? 'bg-white/10 text-white shadow-sm' : 'text-zinc-500 hover:text-white'}`}
                >
                  图片
                </button>
              </div>
              <button 
                onClick={() => {
                  setVibeVideoUrl(null);
                  setVibePrompt('');
                }} 
                className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 custom-scrollbar">
            
            {/* Generated Result */}
            <div className="space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">当前结果</h4>
                {isGenerating && <span className="text-[10px] text-blue-400 animate-pulse font-medium">生成中...</span>}
              </div>
              <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/5 relative shadow-inner group">
                {isGenerating ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3 backdrop-blur-sm">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md animate-pulse"></div>
                      <Wand2 size={24} className="text-blue-400 animate-spin relative z-10" />
                    </div>
                    <span className="text-xs text-blue-400 font-medium">AI 正在施展魔法...</span>
                  </div>
                ) : resultData ? (
                  <>
                    <video src="https://www.w3schools.com/html/mov_bbb.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0B0E14]">
                    <span className="text-xs text-zinc-600 font-medium">等待生成...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Reference Sources */}
            <div className="space-y-3 shrink-0">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">参考源</h4>
              <div className="grid grid-cols-2 gap-4">
                {/* Source Video */}
                <div className="space-y-2">
                  <div className="aspect-video rounded-xl overflow-hidden bg-[#0B0E14] border border-white/5 relative group flex items-center justify-center">
                    {vibeMode === 'video' ? (
                      <video src={vibeVideoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" muted playsInline />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-zinc-600 group-hover:text-zinc-400 transition-colors">
                        <UploadCloud size={18} className="mb-1.5" />
                        <span className="text-[10px] font-medium">添加视频</span>
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      {vibeMode === 'video' && <span className="text-[10px] font-medium text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5"><UploadCloud size={12} />替换</span>}
                      <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                  <div className="text-[10px] font-medium text-zinc-500 text-center">源视频</div>
                </div>
                {/* Source Image */}
                <div className="space-y-2">
                  <div className="aspect-video rounded-xl overflow-hidden bg-[#0B0E14] border border-white/5 relative group flex items-center justify-center">
                    {vibeMode === 'image' ? (
                      <img src={vibeVideoUrl || "https://picsum.photos/seed/source-img/400/225"} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Source Image" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-zinc-600 group-hover:text-zinc-400 transition-colors">
                        <UploadCloud size={18} className="mb-1.5" />
                        <span className="text-[10px] font-medium">添加图片</span>
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      {vibeMode === 'image' && <span className="text-[10px] font-medium text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5"><UploadCloud size={12} />替换</span>}
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} multiple={vibeMode === 'video'} />
                    </label>
                  </div>
                  <div className="text-[10px] font-medium text-zinc-500 text-center">源图片</div>
                </div>
              </div>
            </div>

            {/* Prompt */}
            <div className="flex-1 flex flex-col space-y-3 min-h-[160px]">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">提示词</h4>
              <div className="relative flex-1 flex flex-col">
                <textarea 
                  value={vibePrompt}
                  onChange={(e) => setVibePrompt(e.target.value)}
                  placeholder={vibeMode === 'video' ? "例如：把视频色调改成赛博朋克风，并加上动感的电子音乐..." : "例如：极简风桌面收纳盒，纯实木材质，磁吸模块化设计..."}
                  className="flex-1 w-full bg-[#0B0E14] border border-white/5 rounded-xl p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none shadow-inner transition-all"
                />
                <button 
                  onClick={handleAnalyze}
                  className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs font-medium ${
                    isAnalyzing ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {isAnalyzing ? <Wand2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                  AI 解析
                </button>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-white/5 bg-white/[0.02] shrink-0 flex gap-3">
            {vibeMode === 'video' ? (
              <>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !vibePrompt.trim()}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    vibePrompt.trim() && !isGenerating
                      ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' 
                      : 'bg-white/5 text-zinc-600 cursor-not-allowed border border-transparent'
                  }`}
                >
                  <Wand2 size={16} />
                  编辑
                </button>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !vibePrompt.trim()}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    vibePrompt.trim() && !isGenerating
                      ? 'bg-blue-600 text-white hover:bg-blue-500' 
                      : 'bg-white/5 text-zinc-600 cursor-not-allowed border border-transparent'
                  }`}
                >
                  <Sparkles size={16} />
                  继续创作
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !vibePrompt.trim()}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    vibePrompt.trim() && !isGenerating
                      ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' 
                      : 'bg-white/5 text-zinc-600 cursor-not-allowed border border-transparent'
                  }`}
                >
                  <ImageIcon size={16} />
                  编辑
                </button>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !vibePrompt.trim()}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    vibePrompt.trim() && !isGenerating
                      ? 'bg-blue-600 text-white hover:bg-blue-500' 
                      : 'bg-white/5 text-zinc-600 cursor-not-allowed border border-transparent'
                  }`}
                >
                  <Video size={16} />
                  生成视频
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
