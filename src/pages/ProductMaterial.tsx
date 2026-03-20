import React, { useState, useRef } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';
import InspirationModal from '../components/InspirationModal';
import { useDashboard } from '../components/DashboardContext';

export default function ProductMaterial() {
  const isDashboard = useDashboard();
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
      className="bg-[#0a0a0a] text-slate-100 font-sans min-h-screen flex flex-col"
    >
      {/* Navigation */}
      {isDashboard ? (
        <div className="border-b border-white/5 bg-[#0a0a0a] px-6 py-4 flex items-center gap-8">
          <NavLink 
            to="/dashboard/ecommerce/material" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors pb-1 border-b-2 ${
                isActive ? 'text-white border-primary' : 'text-zinc-400 hover:text-white border-transparent'
              }`
            }
          >
            商品图制作
          </NavLink>
          <NavLink 
            to="/dashboard/ecommerce/video" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors pb-1 border-b-2 ${
                isActive ? 'text-white border-primary' : 'text-zinc-400 hover:text-white border-transparent'
              }`
            }
          >
            电商带货视频创作
          </NavLink>
        </div>
      ) : (
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/?scroll=atomic-lab" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 border border-white/10">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">返回首页</span>
            </Link>
            <div className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
              <h2 className="text-xl font-bold tracking-tight">商品素材工作台</h2>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">AI 商品详情页生成</h1>
            <p className="text-slate-400 text-sm">上传产品图，AI 分析卖点并生成电商详情页素材。</p>
          </div>

          <div className="bg-[#121214] p-8 rounded-3xl border border-white/5 space-y-8">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">sell</span>
                商品名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="例如: 极简风桌面收纳盒"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            {/* Product Images */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">add_photo_alternate</span>
                  产品图片 <span className="text-xs text-slate-500 font-normal ml-2">AI 将分析图片提取卖点和品牌风格</span>
                </label>
                <button 
                  onClick={() => setShowInspiration(true)}
                  className="px-3 py-1 text-[12px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full hover:bg-emerald-400/20 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(52,211,153,0.2)]"
                >
                  <Leaf size={14} className="text-emerald-400" />
                  灵感库
                </button>
              </div>

              <div className="space-y-3">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full border border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors group ${
                    isDragging 
                      ? 'border-primary bg-primary/10' 
                      : 'border-white/10 hover:border-primary/50 bg-black/20'
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
                  <div className={`size-12 rounded-full flex items-center justify-center transition-colors mb-3 ${
                    isDragging
                      ? 'bg-primary/20 text-primary'
                      : 'bg-white/5 text-slate-400 group-hover:text-primary group-hover:bg-primary/10'
                  }`}>
                    <span className="material-symbols-outlined">cloud_upload</span>
                  </div>
                  <p className={`text-sm transition-colors ${
                    isDragging ? 'text-primary font-medium' : 'text-slate-400 group-hover:text-primary'
                  }`}>
                    {isDragging ? '松开鼠标上传图片' : '点击或拖拽上传产品图片（可多张）'}
                  </p>
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
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">format_list_bulleted</span>
                核心卖点 <span className="text-xs text-slate-500 font-normal ml-2">选填，不填则 AI 自动分析</span>
              </label>
              <textarea
                value={coreFeatures}
                onChange={(e) => setCoreFeatures(e.target.value)}
                placeholder="例如: 纯实木材质，磁吸模块化设计，多场景适配..."
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all resize-none"
              ></textarea>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">group</span>
                目标人群 <span className="text-xs text-slate-500 font-normal ml-2">选填</span>
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="例如: 25-35岁都市白领女性"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            {/* Image Style */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                图片风格
              </label>
              <div className="flex flex-wrap gap-3">
                {styleOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setImageStyle(opt.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                      imageStyle === opt.id
                        ? 'bg-[#1e3a8a]/30 border-[#3b82f6] text-white'
                        : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{opt.icon}</span>
                    <span className="text-sm">{opt.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Count */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                生成张数
              </label>
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
                {countOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setGenerateCount(opt.value)}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      generateCount === opt.value
                        ? 'bg-[#1e3a8a]/50 text-white shadow-md border border-[#3b82f6]/50'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
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
                  生成 {generateCount} 张{imageStyle}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-6">
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
                      <p className="text-slate-300 text-sm">正在生成详情页素材...</p>
                      <p className="text-slate-500 text-xs">这可能需要几秒钟时间</p>
                    </div>
                  </div>
                ) : resultImages && resultImages.length > 0 ? (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-start gap-6 overflow-y-auto custom-scrollbar pr-2">
                    <div className={`grid gap-4 w-full ${resultImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                      {resultImages.map((img, idx) => (
                        <img key={idx} src={img} alt={`Result ${idx}`} className="w-full h-auto rounded-xl shadow-2xl border border-white/10" />
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
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                      <span className="material-symbols-outlined text-2xl">view_carousel</span>
                    </div>
                    <div>
                      <p className="text-slate-300 text-sm">配置左侧参数后开始生成</p>
                      <p className="text-slate-500 text-xs mt-2">支持营销图/白底图/实拍图/详情页/小红书风格</p>
                    </div>
                  </div>
                )}
              </div>
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
