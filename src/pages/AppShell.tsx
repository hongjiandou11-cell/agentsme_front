import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AppShell() {
  const [appName, setAppName] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleGenerate = async () => {
    if (!appName || !targetUrl) {
      alert("请填写必要信息");
      return;
    }

    setIsGenerating(true);
    setIsDone(false);

    // Simulate shell generation
    setTimeout(() => {
      setIsGenerating(false);
      setIsDone(true);
    }, 2500);
  };

  return (
    <div className="bg-background-dark text-slate-100 font-sans min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center justify-center size-10 rounded-full hover:bg-white/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-primary text-2xl">phone_iphone</span>
            <h2 className="text-xl font-bold tracking-tight">APP 套壳工具</h2>
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

            {/* Target URL */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">link</span>
                目标 URL (H5 链接)
              </label>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Icon URL */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">add_photo_alternate</span>
                图标 URL
              </label>
              <input
                type="text"
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                placeholder="https://example.com/icon.png"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Advanced Options */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
              <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">settings</span>
                高级配置
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">启用沉浸式状态栏</span>
                <div className="w-10 h-5 bg-primary rounded-full relative">
                  <div className="absolute right-1 top-1 size-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">禁用右键菜单</span>
                <div className="w-10 h-5 bg-white/10 rounded-full relative">
                  <div className="absolute left-1 top-1 size-3 bg-slate-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                isGenerating 
                  ? 'bg-primary/50 text-white/70 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  正在打包中...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">build</span>
                  开始打包 APP
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="glass-card rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">smartphone</span>
                  手机预览
                </h3>
              </div>
              <div className="flex-1 bg-black/40 flex items-center justify-center p-8 relative">
                {/* Simulated Phone Frame */}
                <div className="w-[280px] h-[500px] bg-black rounded-[3rem] border-8 border-slate-800 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
                  
                  {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-6 text-center">
                      <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-xs text-primary">正在注入原生能力...</p>
                    </div>
                  ) : isDone ? (
                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center">
                      <div className="size-20 rounded-2xl shadow-xl mb-4 overflow-hidden border border-slate-100">
                        <img src={iconUrl || 'https://picsum.photos/seed/icon/200/200'} alt="Icon" className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-slate-900 font-bold mb-2">{appName || 'APP 名称'}</h4>
                      <p className="text-slate-500 text-xs mb-6">打包成功！</p>
                      <button className="w-full py-2 bg-primary text-white rounded-lg text-xs font-bold">下载安装包</button>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
                      <span className="material-symbols-outlined text-slate-700 text-6xl mb-4">apps</span>
                      <p className="text-slate-600 text-xs">配置左侧信息后预览</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
