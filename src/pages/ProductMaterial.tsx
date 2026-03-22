import React, { useState, useRef, useContext } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';
import InspirationModal from '../components/InspirationModal';
import { DashboardContext } from '../components/DashboardContext';

export default function ProductMaterial() {
  const dashboardContext = useContext(DashboardContext);
  const isDashboard = !!dashboardContext;
  const location = useLocation();
  const [productName, setProductName] = useState('');
  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);
  const [productImageUrls, setProductImageUrls] = useState<string[]>(location.state?.sourceUrl ? [location.state.sourceUrl] : []);
  const [coreFeatures, setCoreFeatures] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [imageStyle, setImageStyle] = useState('营销图');
  const [generateCount, setGenerateCount] = useState(4);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImages, setResultImages] = useState<string[] | null>(null);
  const [showInspiration, setShowInspiration] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setProductImageFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files).filter((f: any) => f.type.startsWith('image/'));
      setProductImageFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number, type: 'file' | 'url') => {
    if (type === 'file') {
      setProductImageFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      setProductImageUrls(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleInspirationSelect = (url: string) => {
    setProductImageUrls(prev => [...prev, url]);
  };

  const { addHistoryItem, updateProject, projects } = dashboardContext || { addHistoryItem: () => {}, updateProject: () => {}, projects: [] };
  const projectId = location.state?.projectId;

  const handleGenerate = async () => {
    if (!productName) {
      alert("请输入商品名称");
      return;
    }
    if (productImageFiles.length === 0 && productImageUrls.length === 0) {
      alert("请上传产品图片");
      return;
    }

    setIsGenerating(true);
    setResultImages(null);

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      const mockResults = Array(generateCount).fill(0).map((_, i) => `https://picsum.photos/seed/${productName}${i}/800/800`);
      setResultImages(mockResults);
      
      addHistoryItem({
        type: 'ecommerce-material',
        title: `商品素材 - ${productName}`,
        thumbnail: mockResults[0],
        status: 'success',
        resultUrl: mockResults[0]
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

  const styleOptions = [
    { id: '营销图', icon: 'campaign' },
    { id: '白底图', icon: 'crop_free' },
    { id: '实拍图', icon: 'photo_camera' },
    { id: '详情页', icon: 'view_day' },
    { id: '小红书', icon: 'auto_awesome' }
  ];

  const countOptions = [
    { value: 1, label: '1张' },
    { value: 4, label: '4 张（推荐）' },
    { value: 8, label: '8 张' }
  ];

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

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative bg-[#0f0f11]/90 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-[0_0_50px_rgba(37,99,235,0.2)] space-y-8 flex flex-col transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">AI 商品详情页生成</h1>
                <p className="text-zinc-400 text-sm">上传产品图，AI 分析卖点并生成电商详情页素材。</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                <span className="material-symbols-outlined text-2xl">sell</span>
              </div>
            </div>

            {/* Product Name */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <label className="block text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <span className="material-symbols-outlined text-[14px]">sell</span>
                </div>
                商品名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="例如: 极简风桌面收纳盒"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>

            {/* Product Images */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <span className="material-symbols-outlined text-[14px]">add_photo_alternate</span>
                  </div>
                  产品图片 <span className="text-xs text-slate-500 font-normal ml-2">AI 将分析图片提取卖点和品牌风格</span>
                </label>
              </div>

              <div className="space-y-3">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group ${
                    isDragging 
                      ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' 
                      : 'border-white/10 hover:border-indigo-500/50 bg-black/20 hover:bg-black/40'
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    accept="image/*" 
                    multiple
                  />
                  <div className={`size-12 rounded-xl flex items-center justify-center transition-all duration-300 mb-3 ${
                    isDragging
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white/5 text-zinc-500 group-hover:text-white group-hover:bg-indigo-500'
                  }`}>
                    <span className="material-symbols-outlined text-xl">cloud_upload</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-medium">点击或拖拽上传产品图片（可多张）</p>
                </div>
                
                {(productImageFiles.length > 0 || productImageUrls.length > 0) && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {productImageFiles.map((file, idx) => (
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
                    {productImageUrls.map((url, idx) => (
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

            {/* Core Features */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <label className="block text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <span className="material-symbols-outlined text-[14px]">format_list_bulleted</span>
                </div>
                核心卖点 <span className="text-xs text-slate-500 font-normal ml-2">选填，不填则 AI 自动分析</span>
              </label>
              <textarea
                value={coreFeatures}
                onChange={(e) => setCoreFeatures(e.target.value)}
                placeholder="例如: 纯实木材质，磁吸模块化设计，多场景适配..."
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
              ></textarea>
            </div>

            {/* Target Audience */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <label className="block text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <span className="material-symbols-outlined text-[14px]">group</span>
                </div>
                目标人群 <span className="text-xs text-slate-500 font-normal ml-2">选填</span>
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="例如: 25-35岁都市白领女性"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>

            {/* Image Style */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <label className="block text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <span className="material-symbols-outlined text-[14px]">style</span>
                </div>
                图片风格
              </label>
              <div className="flex flex-wrap gap-3">
                {styleOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setImageStyle(opt.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                      imageStyle === opt.id
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                        : 'bg-black/40 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{opt.icon}</span>
                    <span className="text-sm font-medium">{opt.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Count */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
              <label className="block text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <span className="material-symbols-outlined text-[14px]">filter_none</span>
                </div>
                生成张数
              </label>
              <div className="flex bg-black/40 p-1.5 rounded-xl border border-white/10">
                {countOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setGenerateCount(opt.value)}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      generateCount === opt.value
                        ? 'bg-indigo-500/20 text-indigo-400 shadow-md border border-indigo-500/30'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
                isGenerating 
                  ? 'bg-indigo-500/50 text-white/70 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5'
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
                  生成 {generateCount} 张{imageStyle}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-7">
          <div className="sticky top-24 h-[calc(100vh-8rem)] bg-[#18181b]/60 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/20">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-indigo-400 text-[16px]">preview</span>
                效果预览
              </h3>
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
                      <h4 className="text-lg font-medium text-white">正在生成详情页素材...</h4>
                      <p className="text-slate-400 text-sm">AI 正在分析商品卖点并进行排版设计</p>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-2/3 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ) : resultImages && resultImages.length > 0 ? (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-start gap-6 overflow-y-auto custom-scrollbar pr-2">
                    <div className={`grid gap-4 w-full ${resultImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {resultImages.map((img, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                          <img src={img} alt={`Result ${idx}`} className="w-full h-auto" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">download</span>
                              下载
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 w-full justify-center mt-auto pt-4">
                      <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 text-white">
                        <span className="material-symbols-outlined text-sm">download</span>
                        全部下载
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-center gap-5">
                    <div className="size-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 shadow-inner">
                      <span className="material-symbols-outlined text-3xl">view_carousel</span>
                    </div>
                    <div>
                      <p className="text-slate-300 font-medium">配置左侧参数后开始生成</p>
                      <p className="text-slate-500 text-sm mt-2 max-w-xs">支持营销图/白底图/实拍图/详情页/小红书风格</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      </main>
      
      {/* Inspiration Modal */}
      <InspirationModal
        isOpen={showInspiration}
        onClose={() => setShowInspiration(false)}
        type="product"
        onSelect={handleInspirationSelect}
      />
    </motion.div>
  );
}
