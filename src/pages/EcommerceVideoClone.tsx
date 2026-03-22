import React, { useState, useRef, useContext } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';
import InspirationModal from '../components/InspirationModal';
import { DashboardContext } from '../components/DashboardContext';

export default function EcommerceVideoClone() {
  const dashboardContext = useContext(DashboardContext);
  const isDashboard = !!dashboardContext;
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState(location.state?.sourceUrl || '');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);
  const [productImageUrls, setProductImageUrls] = useState<string[]>([]);

  const [personImageFiles, setPersonImageFiles] = useState<File[]>([]);
  const [personImageUrls, setPersonImageUrls] = useState<string[]>([]);

  const [productSellingPoints, setProductSellingPoints] = useState('');
  const [engine, setEngine] = useState<'wanxiang' | 'nanobanana' | 'veo' | 'remotion' | 'nanobanana2' | 'wan'>('wanxiang');

  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any[] | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<{ resultUrl?: string; logs?: string[] } | null>(null);

  const [showVideoInspiration, setShowVideoInspiration] = useState(false);
  const [showProductImageInspiration, setShowProductImageInspiration] = useState(false);
  const [showPersonImageInspiration, setShowPersonImageInspiration] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const productImageInputRef = useRef<HTMLInputElement>(null);
  const personImageInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 30 * 1024 * 1024) {
        alert("视频大小不能超过 30MB");
        return;
      }
      setVideoFile(file);
      setVideoUrl('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'person') => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (type === 'product') {
        setProductImageFiles(prev => [...prev, ...filesArray]);
      } else {
        setPersonImageFiles(prev => [...prev, ...filesArray]);
      }
    }
  };

  const removeImage = (index: number, type: 'file' | 'url', category: 'product' | 'person') => {
    if (category === 'product') {
      if (type === 'file') {
        setProductImageFiles(prev => prev.filter((_, i) => i !== index));
      } else {
        setProductImageUrls(prev => prev.filter((_, i) => i !== index));
      }
    } else {
      if (type === 'file') {
        setPersonImageFiles(prev => prev.filter((_, i) => i !== index));
      } else {
        setPersonImageUrls(prev => prev.filter((_, i) => i !== index));
      }
    }
  };

  const handleAnalyze = async () => {
    if (!videoUrl && !videoFile) {
      setAnalysisError("请上传参考视频或输入 URL");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError(null);

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult([
        { timeRange: '00:00-00:05', visualDescription: '开场特写', cameraMovement: '缓慢推进', animationEffects: '淡入', aiGenerationPrompt: '电影级光影，特写镜头，缓慢推进...' }
      ]);
      setProductSellingPoints('【卖点1】...\n【卖点2】...');
    }, 2000);
  };

  const { addHistoryItem, updateProject, projects } = dashboardContext || { addHistoryItem: () => {}, updateProject: () => {}, projects: [] };
  const projectId = location.state?.projectId;

  const handleGenerate = async () => {
    if (!videoUrl && !videoFile) {
      alert("请提供参考视频");
      return;
    }

    setIsGenerating(true);
    setResultData(null);

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      const mockResult = 'https://picsum.photos/seed/ecomresult/450/800';
      setResultData({ resultUrl: mockResult });
      
      addHistoryItem({
        type: 'ecommerce-video',
        title: `电商视频克隆 - ${engine}`,
        thumbnail: mockResult,
        status: 'success',
        resultUrl: mockResult
      });

      if (projectId) {
        const project = projects.find(p => p.id === projectId);
        if (project) {
          const updatedNodes = project.agentState.nodes.map(n => ({ ...n, status: 'completed' as const }));
          updateProject(projectId, {
            status: 'completed',
            agentState: {
              ...project.agentState,
              nodes: updatedNodes,
              progress: 100
            }
          });
        }
      }
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0f0f11] text-slate-100 font-sans min-h-screen flex flex-col relative overflow-y-auto"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[120px]"></div>
      </div>

      {/* Navigation */}
      {!isDashboard && (
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0f0f11]/80 backdrop-blur-xl px-6 lg:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
              <h2 className="text-xl font-bold tracking-tight">Agents Me</h2>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/">首页</Link>
              <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/dashboard">工作台</Link>
              <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/product-concept">产品概念</Link>
              <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/pricing">产品定价</Link>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-5 space-y-6 relative group/editor">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-accent-blue/40 to-accent-pink/40 rounded-3xl blur-xl opacity-60 group-hover/editor:opacity-100 transition duration-1000 animate-pulse-slow"></div>
          
          <div className="relative bg-[#0f0f11]/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(37,99,235,0.2)] space-y-8 flex flex-col transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">电商带货视频克隆</h1>
                <p className="text-zinc-400 text-sm">提供参考口播视频和商品图，AI将替换商品并重写文案，生成全新带货视频。</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <span className="material-symbols-outlined text-2xl">shopping_bag</span>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 gap-6">
              {/* Reference Video */}
              <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <span className="material-symbols-outlined text-[14px]">movie</span>
                  </div>
                  参考视频 <span className="text-red-500">*</span>
                  <span className="text-xs text-slate-500 font-normal ml-2">粘贴链接或上传文件</span>
                </label>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => { setVideoUrl(e.target.value); setVideoFile(null); }}
                    placeholder="粘贴视频链接"
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || (!videoUrl && !videoFile)}
                    className={`px-5 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      isAnalyzing || (!videoUrl && !videoFile)
                        ? 'bg-indigo-500/10 text-indigo-500/50 cursor-not-allowed border border-indigo-500/10'
                        : 'bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 border border-indigo-500/30'
                    }`}
                  >
                    {isAnalyzing ? (
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    )}
                    AI 解析
                  </button>

                  <button 
                    onClick={() => videoInputRef.current?.click()}
                    className="px-5 py-3 rounded-xl text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">upload</span>
                    上传视频
                  </button>
                  <input 
                    type="file" 
                    ref={videoInputRef} 
                    onChange={handleVideoUpload} 
                    className="hidden" 
                    accept="video/*" 
                  />
                  
                  <button 
                    onClick={() => setShowVideoInspiration(true)}
                    className="px-5 py-3 rounded-xl text-sm font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 hover:bg-emerald-400/20 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                  >
                    <Leaf size={18} className="text-emerald-400" />
                    灵感库
                  </button>
                </div>
                
                {videoFile && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-300 bg-white/5 p-2 rounded-lg border border-white/10 w-fit">
                    <span className="material-symbols-outlined text-green-400 text-[18px]">check_circle</span>
                    <span className="truncate max-w-[200px]">{videoFile.name}</span>
                    <button onClick={() => setVideoFile(null)} className="ml-2 text-slate-500 hover:text-red-400">
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Product Images */}
              <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-400">
                      <span className="material-symbols-outlined text-[14px]">image</span>
                    </div>
                    商品图 <span className="text-red-500">*</span>
                  </label>
                  <button 
                    onClick={() => setShowProductImageInspiration(true)}
                    className="px-3 py-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full hover:bg-emerald-400/20 transition-all flex items-center gap-1.5"
                  >
                    <Leaf size={12} />
                    灵感
                  </button>
                </div>

                <div className="space-y-3">
                  <div 
                    onClick={() => productImageInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-black/20 hover:bg-black/40 group"
                  >
                    <input 
                      type="file" 
                      ref={productImageInputRef} 
                      onChange={(e) => handleImageUpload(e, 'product')} 
                      className="hidden" 
                      accept="image/*" 
                      multiple
                    />
                    <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:bg-indigo-500 transition-all duration-300 mb-2">
                      <span className="material-symbols-outlined text-lg">cloud_upload</span>
                    </div>
                    <p className="text-xs font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">上传商品图片</p>
                  </div>
                  
                  {(productImageFiles.length > 0 || productImageUrls.length > 0) && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {productImageFiles.map((file, idx) => (
                        <div key={`file-${idx}`} className="relative group/img">
                          <img src={URL.createObjectURL(file)} alt="preview" className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                          <button 
                            onClick={() => removeImage(idx, 'file', 'product')}
                            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full size-5 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all hover:scale-110"
                          >
                            <span className="material-symbols-outlined text-[12px]">close</span>
                          </button>
                        </div>
                      ))}
                      {productImageUrls.map((url, idx) => (
                        <div key={`url-${idx}`} className="relative group/img">
                          <img src={url} alt="preview" className="w-16 h-16 object-cover rounded-lg border border-white/10" referrerPolicy="no-referrer" />
                          <button 
                            onClick={() => removeImage(idx, 'url', 'product')}
                            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full size-5 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all hover:scale-110"
                          >
                            <span className="material-symbols-outlined text-[12px]">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Selling Points */}
              <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                <label className="block text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <span className="material-symbols-outlined text-[14px]">edit_note</span>
                  </div>
                  商品卖点 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={productSellingPoints}
                  onChange={(e) => setProductSellingPoints(e.target.value)}
                  placeholder="描述商品核心卖点..."
                  rows={3}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                ></textarea>
              </div>

              {/* Engine Selection */}
              <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                <label className="block text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <span className="material-symbols-outlined text-[14px]">tune</span>
                  </div>
                  视频生成引擎
                </label>
                <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-xl border border-white/5">
                  {[
                    { id: 'wanxiang', label: '万象 (Wanxiang)', icon: 'shopping_bag' },
                    { id: 'veo', label: 'Veo 3.1', icon: 'movie' },
                    { id: 'nanobanana2', label: 'Nano Banana 2', icon: 'bolt' },
                    { id: 'wan', label: 'Wan', icon: 'brush' }
                  ].map(eng => (
                    <button
                      key={eng.id}
                      onClick={() => setEngine(eng.id as any)}
                      className={`py-2.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                        engine === eng.id
                          ? 'bg-indigo-600/20 border border-indigo-500/50 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{eng.icon}</span>
                      {eng.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating || (!videoUrl && !videoFile) || (productImageFiles.length === 0 && productImageUrls.length === 0) || !productSellingPoints}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 mt-4 ${
                isGenerating || (!videoUrl && !videoFile) || (productImageFiles.length === 0 && productImageUrls.length === 0) || !productSellingPoints
                  ? 'bg-white/5 text-zinc-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:-translate-y-0.5'
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  生成中...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  开始生成
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-7 relative group/preview">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent-blue/20 to-accent-pink/20 rounded-3xl blur-xl opacity-50 group-hover/preview:opacity-80 transition duration-1000"></div>
          
          <div className="sticky top-24 h-[calc(100vh-8rem)] min-h-[600px] bg-[#0a0a0c] rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
            {/* Preview Header */}
            <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-sm font-medium text-zinc-400 font-mono tracking-wider">PREVIEW</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden bg-[#09090b]">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              {isGenerating ? (
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-indigo-400">
                      <span className="material-symbols-outlined text-3xl animate-pulse">auto_awesome</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">AI 正在生成视频</h3>
                  <p className="text-zinc-400 text-sm max-w-sm">正在分析参考视频动效，替换商品素材并合成全新带货视频，这可能需要几分钟时间...</p>
                </div>
              ) : resultData ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 z-10">
                  <div className="w-full aspect-[9/16] max-h-full bg-black rounded-2xl border border-white/10 overflow-hidden relative group shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/ecomresult/450/800')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110">
                        <span className="material-symbols-outlined text-4xl ml-1">play_arrow</span>
                      </button>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center opacity-40 relative z-10">
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                    <span className="material-symbols-outlined text-5xl text-zinc-500">shopping_cart</span>
                  </div>
                  <p className="text-zinc-400 text-sm font-medium">配置左侧参数后点击生成</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <InspirationModal 
        isOpen={showVideoInspiration} 
        onClose={() => setShowVideoInspiration(false)} 
        type="video" 
        onSelect={(url) => { setVideoUrl(url); setVideoFile(null); }} 
      />
      
      <InspirationModal 
        isOpen={showProductImageInspiration} 
        onClose={() => setShowProductImageInspiration(false)} 
        type="product" 
        onSelect={(url) => setProductImageUrls(prev => [...prev, url])} 
      />

      <InspirationModal 
        isOpen={showPersonImageInspiration} 
        onClose={() => setShowPersonImageInspiration(false)} 
        type="image" 
        onSelect={(url) => setPersonImageUrls(prev => [...prev, url])} 
      />
    </motion.div>
  );
}
