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
      setResultData({ resultUrl: 'success' });
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
          <div className="flex items-center gap-4">
            <Link to="/?scroll=atomic-lab" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 border border-white/5">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="text-sm font-medium">返回首页</span>
            </Link>
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">电商带货视频克隆</h2>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#18181b]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8">
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
              <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
                <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <span className="material-symbols-outlined text-[14px]">movie</span>
                  </div>
                  参考视频 <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => { setVideoUrl(e.target.value); setVideoFile(null); }}
                    placeholder="粘贴视频链接"
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                  
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || (!videoUrl && !videoFile)}
                    className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                      isAnalyzing || (!videoUrl && !videoFile)
                        ? 'bg-white/5 text-zinc-500 cursor-not-allowed'
                        : 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30'
                    }`}
                  >
                    {isAnalyzing ? (
                      <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    ) : (
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    )}
                    AI 解析
                  </button>

                  <button 
                    onClick={() => videoInputRef.current?.click()}
                    className="px-4 py-2.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">upload</span>
                    上传
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
                    className="px-4 py-2.5 rounded-lg text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 hover:bg-emerald-400/20 transition-all flex items-center gap-2"
                  >
                    <Leaf size={14} className="text-emerald-400" />
                    灵感
                  </button>
                </div>
                
                {videoFile && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-zinc-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10 w-fit">
                    <span className="material-symbols-outlined text-emerald-400 text-[14px]">check_circle</span>
                    <span className="truncate max-w-[200px]">{videoFile.name}</span>
                    <button onClick={() => setVideoFile(null)} className="ml-2 text-zinc-500 hover:text-red-400">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Product Images */}
              <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
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
              <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
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
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
                ></textarea>
              </div>

              {/* Engine Selection */}
              <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
                <label className="block text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-orange-500/20 flex items-center justify-center text-orange-400">
                    <span className="material-symbols-outlined text-[14px]">tune</span>
                  </div>
                  视频生成引擎
                </label>
                <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
                  {[
                    { id: 'wanxiang', label: '万象 (Wanxiang)', icon: 'shopping_bag' },
                    { id: 'veo', label: 'Veo 3.1', icon: 'movie' },
                    { id: 'nanobanana2', label: 'Nano Banana 2', icon: 'bolt' },
                    { id: 'wan', label: 'Wan', icon: 'brush' }
                  ].map(eng => (
                    <button
                      key={eng.id}
                      onClick={() => setEngine(eng.id as any)}
                      className={`py-2 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
                        engine === eng.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">{eng.icon}</span>
                      {eng.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                isGenerating 
                  ? 'bg-white/5 text-zinc-500 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  生成中...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">movie</span>
                  生成带货视频
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 h-[calc(100vh-8rem)] bg-[#18181b]/60 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2 bg-black/20">
              <span className="material-symbols-outlined text-indigo-400 text-[16px]">preview</span>
              <h3 className="font-semibold text-white text-sm">生成预览</h3>
            </div>
            <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
              {isGenerating ? (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <p className="text-indigo-400 text-xs font-medium animate-pulse">正在生成视频...</p>
                </div>
              ) : resultData ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-full aspect-[9/16] max-h-full bg-black rounded-xl border border-white/10 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/ecomresult/450/800')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30">
                        <span className="material-symbols-outlined text-2xl ml-1">play_arrow</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-slate-600">
                    <span className="material-symbols-outlined text-xl">shopping_cart</span>
                  </div>
                  <p className="text-slate-500 text-xs">等待生成预览...</p>
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
