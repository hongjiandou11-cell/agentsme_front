import React, { useState, useRef, useContext } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';
import InspirationModal from '../components/InspirationModal';
import { DashboardContext } from '../components/DashboardContext';

export default function VideoClone() {
  const dashboardContext = useContext(DashboardContext);
  const isDashboard = !!dashboardContext;
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState(location.state?.sourceUrl || '');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [productName, setProductName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [engine, setEngine] = useState<'remotion' | 'veo' | 'nanobanana2' | 'wan'>('remotion');

  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any[] | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<{ resultUrl?: string; logs?: string[] } | null>(null);

  const [showVideoInspiration, setShowVideoInspiration] = useState(false);
  const [showImageInspiration, setShowImageInspiration] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number, type: 'file' | 'url') => {
    if (type === 'file') {
      setImageFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      setImageUrls(prev => prev.filter((_, i) => i !== index));
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
      setPrompt('【视频风格】赛博朋克/电影感\n【转场效果】平滑缩放/淡入淡出\n【画面描述】...');
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
      const mockResult = 'https://picsum.photos/seed/result/450/800';
      setResultData({ resultUrl: mockResult });
      
      addHistoryItem({
        type: 'app-video',
        title: `APP 视频克隆 - ${engine}`,
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
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">AI 视频克隆</h1>
                <p className="text-zinc-400 text-sm">提供参考视频和APP截图，AI将分析动效并用您的截图重新生成视频。</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <span className="material-symbols-outlined text-2xl">movie</span>
              </div>
            </div>

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
                  placeholder="支持 Envato / YouTube / 抖音 / B站 / Twitter 链接"
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
              {analysisError && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {analysisError}
                </p>
              )}
            </div>

            {/* Reference Images */}
            <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <span className="material-symbols-outlined text-[14px]">image</span>
                  </div>
                  APP 截图 <span className="text-red-500">*</span>
                </label>
                <button 
                  onClick={() => setShowImageInspiration(true)}
                  className="px-3 py-1 text-[12px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full hover:bg-emerald-400/20 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                >
                  <Leaf size={14} className="text-emerald-400" />
                  灵感库
                </button>
              </div>

              <div className="space-y-3">
                <div 
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/20 group"
                >
                  <input 
                    type="file" 
                    ref={imageInputRef} 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    accept="image/*" 
                    multiple
                  />
                  <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-3">
                    <span className="material-symbols-outlined">cloud_upload</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-1">点击上传截图（可多张）</p>
                  <p className="text-xs text-slate-500">这些截图将替换参考视频中的画面内容</p>
                </div>
                
                {(imageFiles.length > 0 || imageUrls.length > 0) && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {imageFiles.map((file, idx) => (
                      <div key={`file-${idx}`} className="relative group/img">
                        <img src={URL.createObjectURL(file)} alt="preview" className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                        <button 
                          onClick={() => removeImage(idx, 'file')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      </div>
                    ))}
                    {imageUrls.map((url, idx) => (
                      <div key={`url-${idx}`} className="relative group/img">
                        <img src={url} alt="preview" className="w-20 h-20 object-cover rounded-xl border border-white/10" referrerPolicy="no-referrer" />
                        <button 
                          onClick={() => removeImage(idx, 'url')}
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

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">inventory_2</span>
                产品名称 <span className="text-slate-500 font-normal">（选填）</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="例如：我的APP"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">edit</span>
                创意简述 <span className="text-slate-500 font-normal">（选填）</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="描述您希望的视频风格、氛围或特殊要求..."
                rows={4}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all resize-none"
              ></textarea>
            </div>

            {/* Engine Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">tune</span>
                生成引擎
              </label>
              <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setEngine('remotion')}
                  className={`py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                    engine === 'remotion'
                      ? 'bg-[#2563eb] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">code</span>
                  Remotion
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
              <p className="text-xs text-slate-500 mt-2">
                {engine === 'remotion' ? 'Remotion：基于模板的精确动效克隆，适合 App/Web 展示视频' : 'Veo 3.1：基于 AI 视频生成大模型，适合创意和氛围感视频'}
              </p>
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
                  <span className="material-symbols-outlined">auto_awesome</span>
                  开始克隆视频
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-7 relative group/preview">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent-blue/30 to-accent-pink/30 rounded-3xl blur-xl opacity-50 group-hover/preview:opacity-80 transition duration-1000"></div>
          
          <div className="sticky top-24 h-[calc(100vh-8rem)] bg-[#0a0a0c] rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl relative">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2 bg-black/40">
              <span className="material-symbols-outlined text-indigo-400 text-[16px]">preview</span>
              <h3 className="font-semibold text-white text-sm">效果预览</h3>
            </div>
              <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-8 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_70%)]"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                {isGenerating ? (
                  <div className="relative z-10 flex flex-col items-center text-center gap-6 w-full max-w-sm">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                      <div className="size-20 rounded-2xl bg-[#18181b] border border-white/10 flex items-center justify-center text-primary relative z-10 shadow-2xl">
                        <span className="material-symbols-outlined text-4xl animate-spin">settings</span>
                      </div>
                    </div>
                    <div className="space-y-3 w-full">
                      <h4 className="text-lg font-medium text-white">正在克隆视频...</h4>
                      <p className="text-slate-400 text-sm">AI 正在分析参考视频动效并合成新画面</p>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2/3 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ) : resultData ? (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6">
                    <div className="w-full aspect-[9/16] max-h-full bg-black rounded-2xl border border-white/10 overflow-hidden relative group shadow-2xl">
                      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/result/450/800')] bg-cover bg-center"></div>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <button className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all shadow-xl">
                          <span className="material-symbols-outlined text-3xl ml-1">play_arrow</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 text-white">
                        <span className="material-symbols-outlined text-sm">download</span>
                        下载视频
                      </button>
                      <button className="px-6 py-2.5 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">share</span>
                        分享
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-center gap-5">
                    <div className="size-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 shadow-inner">
                      <span className="material-symbols-outlined text-3xl">movie</span>
                    </div>
                    <div>
                      <p className="text-slate-300 font-medium">等待生成</p>
                      <p className="text-slate-500 text-sm mt-2 max-w-xs">配置左侧参数后点击生成，AI 将为您克隆视频动效</p>
                    </div>
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
        isOpen={showImageInspiration} 
        onClose={() => setShowImageInspiration(false)} 
        type="image" 
        onSelect={(url) => setImageUrls(prev => [...prev, url])} 
      />
    </motion.div>
  );
}

