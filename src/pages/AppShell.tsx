import React, { useState, useRef, useContext } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';
import InspirationModal from '../components/InspirationModal';
import { DashboardContext } from '../components/DashboardContext';

export default function AppShell() {
  const dashboardContext = useContext(DashboardContext);
  const isDashboard = !!dashboardContext;
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
                <span className="material-symbols-outlined text-[18px]">imagesmode</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">截图包装生成</h2>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#18181b]/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">截图包装生成</h1>
              <p className="text-zinc-400 text-sm">上传截图，选择包装模式，AI 自动生成精美展示图。</p>
            </div>
            
            {/* Screenshot Upload */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <span className="material-symbols-outlined text-[14px]">image</span>
                  </div>
                  截图上传 <span className="text-red-500">*</span>
                </label>
                <button 
                  onClick={() => setShowInspiration(true)}
                  className="px-3 py-1.5 text-[12px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full hover:bg-emerald-400/20 transition-all flex items-center gap-1.5"
                >
                  <Leaf size={14} />
                  灵感库
                </button>
              </div>

              <div className="space-y-4">
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
                  <p className="text-xs text-zinc-400 font-medium">点击或拖拽上传截图</p>
                </div>
                
                {(imageFiles.length > 0 || imageUrls.length > 0) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {imageFiles.map((file, idx) => (
                      <div key={`file-${idx}`} className="relative group/img">
                        <img src={URL.createObjectURL(file)} alt="preview" className="w-16 h-16 object-cover rounded-lg border border-white/10" />
                        <button 
                          onClick={() => removeImage(idx, 'file')}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full size-5 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all hover:scale-110"
                        >
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      </div>
                    ))}
                    {imageUrls.map((url, idx) => (
                      <div key={`url-${idx}`} className="relative group/img">
                        <img src={url} alt="preview" className="w-16 h-16 object-cover rounded-lg border border-white/10" referrerPolicy="no-referrer" />
                        <button 
                          onClick={() => removeImage(idx, 'url')}
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

            {/* Packaging Mode */}
            <div>
              <label className="block text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <span className="material-symbols-outlined text-[14px]">category</span>
                </div>
                包装模式
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'device', icon: 'smartphone', label: '设备套壳' },
                  { id: 'marketing', icon: 'campaign', label: '营销图' },
                  { id: 'browser', icon: 'language', label: 'Browser' }
                ].map(mode => (
                  <button 
                    key={mode.id}
                    onClick={() => setPackagingMode(mode.id as any)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                      packagingMode === mode.id 
                        ? 'bg-indigo-600/20 border-indigo-500/50 text-white' 
                        : 'bg-black/20 border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{mode.icon}</span>
                    <span className="text-[11px] font-medium">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Device Model */}
            <div>
              <label className="block text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <span className="material-symbols-outlined text-[14px]">devices</span>
                </div>
                设备型号
              </label>
              <div className="flex gap-1 mb-2 p-1 bg-black/40 rounded-lg border border-white/5">
                {['iphone', 'mac'].map(type => (
                  <button 
                    key={type}
                    onClick={() => setDeviceType(type as any)}
                    className={`flex-1 py-2 rounded-md transition-all text-xs font-medium ${
                      deviceType === type
                        ? 'bg-white/10 text-white'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {type === 'iphone' ? 'iPhone' : 'Mac'}
                  </button>
                ))}
              </div>
              
              <select 
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all"
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
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || (imageFiles.length === 0 && imageUrls.length === 0)}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                isGenerating || (imageFiles.length === 0 && imageUrls.length === 0)
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
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  开始生成
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-7">
          <div className="sticky top-24 h-[calc(100vh-8rem)] bg-[#18181b]/60 backdrop-blur-xl rounded-3xl border border-white/10 flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/20">
              <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-indigo-400 text-[16px]">preview</span>
                效果预览
              </h3>
            </div>
            
            <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
              {isGenerating ? (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <p className="text-indigo-400 text-xs font-medium animate-pulse">正在生成包装图...</p>
                </div>
              ) : resultImages && resultImages.length > 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <img src={resultImages[0]} alt="Result" className="w-full h-auto max-h-full object-contain rounded-2xl border border-white/10" />
                </div>
              ) : (
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-slate-600">
                    <span className="material-symbols-outlined text-xl">smartphone</span>
                  </div>
                  <p className="text-slate-500 text-xs">上传截图后点击生成</p>
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
        type="image"
        onSelect={handleInspirationSelect}
      />
    </motion.div>
  );
}
