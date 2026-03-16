import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function AppShell() {
  const [appName, setAppName] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<'local' | 'url'>('local');
  const [templateType, setTemplateType] = useState<'mobile' | 'desktop'>('mobile');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIconFile(e.target.files[0]);
      setIconUrl(''); // Clear URL if local file is selected
    }
  };

  const handleGenerate = async () => {
    if (!appName || (!iconFile && !iconUrl)) {
      alert("请填写APP名称并上传图标");
      return;
    }

    setIsGenerating(true);
    setIsDone(false);

    // Simulate shell generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsDone(true);
    }, 3000);
  };

  const displayIcon = iconFile ? URL.createObjectURL(iconFile) : (iconUrl || 'https://picsum.photos/seed/icon/200/200');

  return (
    <div className="bg-background-dark text-slate-100 font-sans min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center justify-center size-10 rounded-full hover:bg-white/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-primary text-3xl">phone_iphone</span>
            <h2 className="text-2xl font-bold tracking-tight">APP 套壳工具</h2>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">快速 APP 套壳</h1>
            <p className="text-slate-400 text-sm">将您的 H5 页面或 Web 应用快速打包成原生体验的 APP。</p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-8">
            {/* App Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">badge</span>
                APP 名称
              </label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="例如: 我的智能助手"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* AppStore URL */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">storefront</span>
                AppStore 链接 <span className="text-slate-500 text-xs font-normal">(可选)</span>
              </label>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="例如: https://apps.apple.com/app/id..."
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Icon Upload */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">add_photo_alternate</span>
                  APP 素材
                </label>
                <div className="flex bg-black/20 rounded-lg p-1">
                  <button 
                    onClick={() => setUploadType('local')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${uploadType === 'local' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    本地上传
                  </button>
                  <button 
                    onClick={() => setUploadType('url')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${uploadType === 'url' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    URL链接
                  </button>
                </div>
              </div>
              
              {uploadType === 'local' ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-white/10 hover:border-primary/50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/20 group"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*" 
                  />
                  {iconFile ? (
                    <div className="flex items-center gap-4">
                      <img src={URL.createObjectURL(iconFile)} alt="Selected Icon" className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
                      <div className="text-left">
                        <p className="text-sm text-white font-medium truncate max-w-[200px]">{iconFile.name}</p>
                        <p className="text-xs text-emerald-400 mt-1">点击重新上传</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">upload</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-1">点击或拖拽上传图标</p>
                      <p className="text-xs text-amber-400/80">💡 提示：请尽可能上传 1024x1024 的高清图片，以保证打包质量</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={iconUrl}
                    onChange={(e) => { setIconUrl(e.target.value); setIconFile(null); }}
                    placeholder="https://example.com/icon.png"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                  <p className="text-xs text-amber-400/80">💡 提示：请尽可能提供高清图片的链接</p>
                </div>
              )}
            </div>

            {/* Template Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">devices</span>
                模版类型
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setTemplateType('mobile')}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                    templateType === 'mobile' 
                      ? 'bg-primary/10 border-primary text-white shadow-[0_0_20px_rgba(37,99,235,0.15)]' 
                      : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">smartphone</span>
                  <span className="text-sm font-medium">手机 APP</span>
                </button>
                <button 
                  onClick={() => setTemplateType('desktop')}
                  className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                    templateType === 'desktop' 
                      ? 'bg-primary/10 border-primary text-white shadow-[0_0_20px_rgba(37,99,235,0.15)]' 
                      : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">desktop_windows</span>
                  <span className="text-sm font-medium">电脑桌面端</span>
                </button>
              </div>
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                isGenerating 
                  ? 'bg-primary/50 text-white/70 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-0.5'
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  正在创作中...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">magic_button</span>
                  开始创作
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="glass-card rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[700px]">
              <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">{templateType === 'mobile' ? 'smartphone' : 'desktop_windows'}</span>
                  {templateType === 'mobile' ? '手机预览' : '桌面端预览'}
                </h3>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
              </div>
              
              <div className="flex-1 bg-black/40 flex items-center justify-center p-8 relative overflow-hidden">
                {/* Background Glow */}
                {isDone && <div className="absolute inset-0 bg-primary/5 blur-[100px] animate-pulse-slow"></div>}

                {templateType === 'mobile' ? (
                  /* Mobile Mockup */
                  <div className="w-[300px] h-[600px] bg-black rounded-[3rem] border-[12px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col transition-all duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-3xl z-20"></div>
                    
                    {isGenerating ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10 p-6 text-center">
                        <div className="relative size-24 mb-8">
                          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-3xl animate-pulse">build</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">正在创作中...</h3>
                        <p className="text-sm text-slate-400">正在为您打包原生应用体验</p>
                        
                        {/* Progress Bar Simulation */}
                        <div className="w-48 h-1.5 bg-white/10 rounded-full mt-8 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-accent-blue w-full animate-[slideRight_2s_ease-in-out_infinite]" style={{ transformOrigin: 'left' }}></div>
                        </div>
                      </div>
                    ) : isDone ? (
                      <div className="absolute inset-0 bg-slate-50 flex flex-col relative z-10">
                        {/* App Header */}
                        <div className="pt-12 pb-4 px-6 bg-white shadow-sm flex items-center gap-3 z-20">
                          <img src={displayIcon} alt="Icon" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                          <h4 className="text-slate-900 font-bold text-lg truncate">{appName || '未命名应用'}</h4>
                        </div>
                        {/* App Content (Iframe simulation) */}
                        <div className="flex-1 bg-slate-100 relative overflow-hidden">
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <div className="size-24 rounded-3xl shadow-xl mb-6 overflow-hidden border-2 border-white bg-white">
                              <img src={displayIcon} alt="Icon" className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mb-2">{appName || 'APP 名称'}</h2>
                            <p className="text-slate-500 text-sm mb-8">套壳应用已生成完毕</p>
                            
                            <div className="w-full space-y-3">
                              <button className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">download</span>
                                下载 iOS 包
                              </button>
                              <button className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">android</span>
                                下载 Android 包
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
                        <div className="size-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                          <span className="material-symbols-outlined text-slate-500 text-4xl">touch_app</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">等待创作</h3>
                        <p className="text-slate-500 text-sm">配置左侧信息后，点击开始创作预览效果</p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Desktop Mockup */
                  <div className="w-full max-w-[500px] h-[350px] bg-slate-900 rounded-xl border border-slate-700 shadow-2xl relative overflow-hidden flex flex-col transition-all duration-500">
                    <div className="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    </div>
                    
                    {isGenerating ? (
                      <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 z-10 p-6 text-center">
                        <div className="relative size-20 mb-6">
                          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-2xl animate-pulse">build</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">正在创作中...</h3>
                        <p className="text-sm text-slate-400">正在为您打包桌面端应用</p>
                      </div>
                    ) : isDone ? (
                      <div className="flex-1 bg-slate-50 flex flex-col relative z-10">
                        <div className="flex-1 flex items-center justify-center p-8">
                          <div className="flex items-center gap-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
                            <div className="size-24 rounded-2xl shadow-md overflow-hidden shrink-0">
                              <img src={displayIcon} alt="Icon" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-black text-slate-800 mb-1 truncate">{appName || 'APP 名称'}</h2>
                              <p className="text-slate-500 text-sm mb-4">桌面端应用已就绪</p>
                              <button className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">download</span>
                                下载安装包
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
                        <div className="size-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                          <span className="material-symbols-outlined text-slate-500 text-3xl">desktop_windows</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">等待创作</h3>
                        <p className="text-slate-500 text-sm">配置左侧信息后，点击开始创作预览效果</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
