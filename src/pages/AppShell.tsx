import React, { useState, useRef } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';
import InspirationModal from '../components/InspirationModal';
import { useDashboard } from '../components/DashboardContext';

export default function AppShell() {
  const isDashboard = useDashboard();
  const location = useLocation();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(location.state?.sourceUrl ? [location.state.sourceUrl] : []);
  const [packagingMode, setPackagingMode] = useState<'device' | 'marketing' | 'browser'>('device');
  const [deviceType, setDeviceType] = useState<'iphone' | 'mac'>('iphone');
  const [deviceModel, setDeviceModel] = useState('iPhone 17 Pro 橙色');
  const [backgroundType, setBackgroundType] = useState<'gradient' | 'solid' | 'transparent'>('gradient');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImages, setResultImages] = useState<string[] | null>(null);
  const [showInspiration, setShowInspiration] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...filesArray]);
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

  const handleInspirationSelect = (url: string) => {
    setImageUrls(prev => [...prev, url]);
  };

  const handleGenerate = async () => {
    if (imageFiles.length === 0 && imageUrls.length === 0) {
      alert("请上传截图");
      return;
    }

    setIsGenerating(true);
    setResultImages(null);

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setResultImages(['https://picsum.photos/seed/appshell/800/600']);
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
      {isDashboard ? (
        <div className="border-b border-white/5 bg-[#0a0a0a] px-6 py-4 flex items-center gap-8">
          <NavLink 
            to="/dashboard/app/shell" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors pb-1 border-b-2 ${
                isActive ? 'text-white border-primary' : 'text-zinc-400 hover:text-white border-transparent'
              }`
            }
          >
            APP 套壳
          </NavLink>
          <NavLink 
            to="/dashboard/app/video" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors pb-1 border-b-2 ${
                isActive ? 'text-white border-primary' : 'text-zinc-400 hover:text-white border-transparent'
              }`
            }
          >
            APP 视频克隆
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
              <h2 className="text-xl font-bold tracking-tight">截图包装生成</h2>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">截图包装生成</h1>
            <p className="text-slate-400 text-sm">上传截图，选择包装模式，AI 自动生成精美展示图。</p>
          </div>

          <div className="bg-[#121214] p-8 rounded-3xl border border-white/5 space-y-8">
            
            {/* Screenshot Upload */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">image</span>
                  截图上传 <span className="text-red-500">*</span>
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
                    isDragging ? 'text-primary font-medium' : 'text-slate-300 group-hover:text-primary'
                  }`}>
                    {isDragging ? '松开鼠标上传图片' : '点击或拖拽上传截图（可多张）'}
                  </p>
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

            {/* Packaging Mode */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                包装模式
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button 
                  onClick={() => setPackagingMode('device')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                    packagingMode === 'device' 
                      ? 'bg-[#1e3a8a]/30 border-[#3b82f6] text-white' 
                      : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">smartphone</span>
                  <span className="text-sm font-medium">设备套壳</span>
                  <span className="text-[10px] text-slate-500">iPhone / Mac 设备框</span>
                </button>
                <button 
                  onClick={() => setPackagingMode('marketing')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                    packagingMode === 'marketing' 
                      ? 'bg-[#1e3a8a]/30 border-[#3b82f6] text-white' 
                      : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">campaign</span>
                  <span className="text-sm font-medium">营销图</span>
                  <span className="text-[10px] text-slate-500">渐变背景+卖点文案</span>
                </button>
                <button 
                  onClick={() => setPackagingMode('browser')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all ${
                    packagingMode === 'browser' 
                      ? 'bg-[#1e3a8a]/30 border-[#3b82f6] text-white' 
                      : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">language</span>
                  <span className="text-sm font-medium">Browser</span>
                  <span className="text-[10px] text-slate-500">浏览器窗口框</span>
                </button>
              </div>
            </div>

            {/* Device Model */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                设备型号
              </label>
              <div className="flex gap-3 mb-4">
                <button 
                  onClick={() => setDeviceType('iphone')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    deviceType === 'iphone'
                      ? 'bg-[#1e3a8a]/30 border-[#3b82f6] text-white'
                      : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">smartphone</span>
                  <span className="text-sm">iPhone</span>
                </button>
                <button 
                  onClick={() => setDeviceType('mac')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    deviceType === 'mac'
                      ? 'bg-[#1e3a8a]/30 border-[#3b82f6] text-white'
                      : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">laptop_mac</span>
                  <span className="text-sm">Mac</span>
                </button>
              </div>
              
              <div className="relative">
                <select 
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-primary/50 transition-all"
                >
                  {deviceType === 'iphone' ? (
                    <>
                      <option value="iPhone 17 Pro 橙色">iPhone 17 Pro 橙色</option>
                      <option value="iPhone 17 Pro 钛金属">iPhone 17 Pro 钛金属</option>
                      <option value="iPhone 16 Pro Max">iPhone 16 Pro Max</option>
                    </>
                  ) : (
                    <>
                      <option value="MacBook Pro 16 M3">MacBook Pro 16 M3</option>
                      <option value="MacBook Air 15">MacBook Air 15</option>
                      <option value="iMac 24">iMac 24</option>
                    </>
                  )}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Background Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                背景类型
              </label>
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setBackgroundType('gradient')}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    backgroundType === 'gradient'
                      ? 'bg-[#3b82f6] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  渐变背景
                </button>
                <button
                  onClick={() => setBackgroundType('solid')}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    backgroundType === 'solid'
                      ? 'bg-[#3b82f6] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  纯色背景
                </button>
                <button
                  onClick={() => setBackgroundType('transparent')}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    backgroundType === 'transparent'
                      ? 'bg-[#3b82f6] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  透明背景
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || (imageFiles.length === 0 && imageUrls.length === 0)}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                isGenerating || (imageFiles.length === 0 && imageUrls.length === 0)
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
                  开始生成
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
                <h3 className="text-sm font-medium text-slate-300">效果预览</h3>
              </div>
              
              <div className="flex-1 bg-[#0a0a0a] flex items-center justify-center p-8 relative overflow-hidden">
                {isGenerating ? (
                  <div className="relative z-10 flex flex-col items-center text-center gap-4 w-full">
                    <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 animate-pulse">
                      <span className="material-symbols-outlined text-3xl animate-spin">settings</span>
                    </div>
                    <div className="w-full max-w-xs space-y-2">
                      <p className="text-slate-300 text-sm">正在生成包装图...</p>
                      <p className="text-slate-500 text-xs">这可能需要几秒钟时间</p>
                    </div>
                  </div>
                ) : resultImages && resultImages.length > 0 ? (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src={resultImages[0]} alt="Result" className="w-full h-auto max-h-full object-contain rounded-xl shadow-2xl" />
                    <div className="flex gap-4 w-full justify-center">
                      <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 text-white">
                        <span className="material-symbols-outlined text-sm">download</span>
                        下载图片
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                      <span className="material-symbols-outlined text-2xl">smartphone</span>
                    </div>
                    <p className="text-slate-500 text-sm">上传截图后点击生成</p>
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
        type="image"
        onSelect={handleInspirationSelect}
      />
    </motion.div>
  );
}
