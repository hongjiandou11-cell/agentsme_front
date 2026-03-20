import React, { useState, useRef } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';
import InspirationModal from '../components/InspirationModal';
import { useDashboard } from '../components/DashboardContext';

export default function EcommerceVideoClone() {
  const isDashboard = useDashboard();
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
      className="bg-[#0a0a0a] text-slate-100 font-sans min-h-screen flex flex-col"
    >
      {/* Navigation */}
      {!isDashboard && (
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/?scroll=atomic-lab" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 border border-white/10">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">返回首页</span>
            </Link>
            <div className="flex items-center gap-2 text-white">
              <h2 className="text-xl font-bold tracking-tight">电商视频克隆</h2>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">电商视频克隆</h1>
            <p className="text-slate-400 text-sm">提供参考口播视频和商品图，AI将替换商品并重写文案，生成全新带货视频。</p>
          </div>

          <div className="bg-[#121214] p-8 rounded-3xl border border-white/5 space-y-8">
            {/* Reference Video */}
            <div>
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-sm text-primary">movie</span>
                参考视频 <span className="text-red-500">*</span>
                <span className="text-xs text-slate-500 font-normal ml-2">粘贴链接或上传文件</span>
              </label>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => { setVideoUrl(e.target.value); setVideoFile(null); }}
                  placeholder="支持 Envato / YouTube / 抖音 / B站 / Twitter 链接"
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
                />
                
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!videoUrl && !videoFile)}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isAnalyzing || (!videoUrl && !videoFile)
                      ? 'bg-primary/10 text-primary/50 cursor-not-allowed'
                      : 'bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20'
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
              <p className="text-xs text-slate-500 mt-2">支持30秒以内的口播带货视频；支持抖音/YouTube/B站等平台链接</p>
              
              {videoFile && (
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-300 bg-white/5 p-2 rounded-lg border border-white/10 w-fit">
                  <span className="material-symbols-outlined text-green-400 text-[18px]">check_circle</span>
                  <span className="truncate max-w-[200px]">{videoFile.name}</span>
                  <button onClick={() => setVideoFile(null)} className="ml-2 text-slate-500 hover:text-red-400">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              )}
              {analysisError && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {analysisError}
                </p>
              )}
            </div>

            {/* Product Images */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">image</span>
                  商品图 <span className="text-red-500">*</span>
                </label>
                <button 
                  onClick={() => setShowProductImageInspiration(true)}
                  className="px-3 py-1 text-[12px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full hover:bg-emerald-400/20 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                >
                  <Leaf size={14} className="text-emerald-400" />
                  灵感库
                </button>
              </div>

              <div className="space-y-3">
                <div 
                  onClick={() => productImageInputRef.current?.click()}
                  className="w-full border border-dashed border-white/10 hover:border-primary/50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/20 group"
                >
                  <input 
                    type="file" 
                    ref={productImageInputRef} 
                    onChange={(e) => handleImageUpload(e, 'product')} 
                    className="hidden" 
                    accept="image/*" 
                    multiple
                  />
                  <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-3">
                    <span className="material-symbols-outlined">cloud_upload</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-1">上传新的商品图片</p>
                  <p className="text-xs text-slate-500">将替换视频中原有商品</p>
                </div>
                
                {(productImageFiles.length > 0 || productImageUrls.length > 0) && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {productImageFiles.map((file, idx) => (
                      <div key={`file-${idx}`} className="relative group/img">
                        <img src={URL.createObjectURL(file)} alt="preview" className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                        <button 
                          onClick={() => removeImage(idx, 'file', 'product')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      </div>
                    ))}
                    {productImageUrls.map((url, idx) => (
                      <div key={`url-${idx}`} className="relative group/img">
                        <img src={url} alt="preview" className="w-20 h-20 object-cover rounded-xl border border-white/10" referrerPolicy="no-referrer" />
                        <button 
                          onClick={() => removeImage(idx, 'url', 'product')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Person Images */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">person</span>
                  人物图 (选填)
                </label>
                <button 
                  onClick={() => setShowPersonImageInspiration(true)}
                  className="px-3 py-1 text-[12px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full hover:bg-emerald-400/20 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                >
                  <Leaf size={14} className="text-emerald-400" />
                  灵感库
                </button>
              </div>

              <div className="space-y-3">
                <div 
                  onClick={() => personImageInputRef.current?.click()}
                  className="w-full border border-dashed border-white/10 hover:border-primary/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/20 group"
                >
                  <input 
                    type="file" 
                    ref={personImageInputRef} 
                    onChange={(e) => handleImageUpload(e, 'person')} 
                    className="hidden" 
                    accept="image/*" 
                    multiple
                  />
                  <p className="text-sm text-slate-400 group-hover:text-primary transition-colors">上传替换人物图片（可选）</p>
                </div>
                
                {(personImageFiles.length > 0 || personImageUrls.length > 0) && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {personImageFiles.map((file, idx) => (
                      <div key={`file-${idx}`} className="relative group/img">
                        <img src={URL.createObjectURL(file)} alt="preview" className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                        <button 
                          onClick={() => removeImage(idx, 'file', 'person')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      </div>
                    ))}
                    {personImageUrls.map((url, idx) => (
                      <div key={`url-${idx}`} className="relative group/img">
                        <img src={url} alt="preview" className="w-20 h-20 object-cover rounded-xl border border-white/10" referrerPolicy="no-referrer" />
                        <button 
                          onClick={() => removeImage(idx, 'url', 'person')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
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
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">edit_note</span>
                商品卖点 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={productSellingPoints}
                onChange={(e) => setProductSellingPoints(e.target.value)}
                placeholder="描述商品的核心卖点、价格、优惠信息等，AI将基于此重写口播文案..."
                rows={4}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all resize-none"
              ></textarea>
            </div>

            {/* Engine Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">tune</span>
                视频生成引擎
              </label>
              <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setEngine('wanxiang')}
                  className={`py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    engine === 'wanxiang'
                      ? 'bg-[#2563eb] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  万象 (Wanxiang)
                </button>
                <button
                  onClick={() => setEngine('veo')}
                  className={`py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    engine === 'veo'
                      ? 'bg-[#2563eb] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">movie</span>
                  Veo 3.1
                </button>
                <button
                  onClick={() => setEngine('nanobanana2')}
                  className={`py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    engine === 'nanobanana2'
                      ? 'bg-[#2563eb] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  Nano Banana 2
                </button>
                <button
                  onClick={() => setEngine('wan')}
                  className={`py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    engine === 'wan'
                      ? 'bg-[#2563eb] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">brush</span>
                  Wan
                </button>
              </div>
            </div>

              <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                isGenerating 
                  ? 'bg-[#1e3a8a] text-white/70 cursor-not-allowed' 
                  : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white'
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  正在生成中...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">movie</span>
                  生成带货视频
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="bg-[#121214] rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[700px]">
              <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-slate-400">preview</span>
                <h3 className="text-sm font-medium text-slate-300">生成预览</h3>
              </div>
              <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-8 relative overflow-hidden">
                {isGenerating ? (
                  <div className="relative z-10 flex flex-col items-center text-center gap-4 w-full">
                    <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 animate-pulse">
                      <span className="material-symbols-outlined text-3xl animate-spin">settings</span>
                    </div>
                    <div className="w-full max-w-xs space-y-2">
                      <p className="text-slate-300 text-sm">等待生成...</p>
                      <p className="text-slate-500 text-xs">配置左侧参数后点击生成</p>
                    </div>
                  </div>
                ) : resultData ? (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6">
                    <div className="w-full aspect-[9/16] max-h-full bg-black rounded-xl border border-white/10 overflow-hidden relative group">
                      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/ecomresult/450/800')] bg-cover bg-center"></div>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all">
                          <span className="material-symbols-outlined text-3xl ml-1">play_arrow</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                      <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                    </div>
                    <div>
                      <p className="text-slate-300 text-sm">等待生成预览...</p>
                      <p className="text-slate-500 text-xs mt-1">配置左侧参数后点击生成</p>
                    </div>
                  </div>
                )}
              </div>
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
