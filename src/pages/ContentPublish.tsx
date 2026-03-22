import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function ContentPublish() {
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [publishTime, setPublishTime] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const togglePlatform = (p: string) => {
    if (platforms.includes(p)) {
      setPlatforms(platforms.filter(item => item !== p));
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  const handlePublish = async () => {
    if (!content || platforms.length === 0) {
      alert("请填写内容并选择发布平台");
      return;
    }

    setIsPublishing(true);
    setIsSuccess(false);

    // Simulate publishing
    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccess(true);
    }, 2000);
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
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 border border-white/10">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">返回首页</span>
          </Link>
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-primary text-2xl">send</span>
            <h2 className="text-xl font-bold tracking-tight">内容发布助手</h2>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">一键内容发布</h1>
            <p className="text-slate-400 text-sm">编写内容，AI 助手将为您同步分发至各大主流社交平台。</p>
          </div>

          <div className="bg-[#121214] p-8 rounded-3xl border border-white/5 space-y-8">
            {/* Content Text */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">edit_note</span>
                发布内容
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="在此输入您的文案内容..."
                rows={6}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              ></textarea>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">share</span>
                目标平台
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['小红书', '抖音', '视频号', '微博', '知乎', 'B站'].map((p) => (
                  <button
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={`py-3 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                      platforms.includes(p)
                        ? 'bg-primary/20 border-primary text-white'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    {platforms.includes(p) && <span className="material-symbols-outlined text-xs">check_circle</span>}
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule Time */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                定时发布 (可选)
              </label>
              <input
                type="datetime-local"
                value={publishTime}
                onChange={(e) => setPublishTime(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
                isPublishing 
                  ? 'bg-primary/50 text-white/70 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
              }`}
            >
              {isPublishing ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  正在同步发布中...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">send</span>
                  立即发布
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Status Area */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="bg-[#121214] rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">analytics</span>
                  发布状态监控
                </h3>
              </div>
              <div className="flex-1 bg-black/40 p-8 overflow-y-auto custom-scrollbar">
                {isPublishing ? (
                  <div className="space-y-6">
                    {platforms.map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                          </div>
                          <span className="text-sm text-white">{p}</span>
                        </div>
                        <span className="text-xs text-primary">发布中...</span>
                      </div>
                    ))}
                  </div>
                ) : isSuccess ? (
                  <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-green-400/10 border border-green-400/20 text-center mb-8">
                      <span className="material-symbols-outlined text-green-400 text-5xl mb-2">check_circle</span>
                      <h4 className="text-white font-bold">发布成功</h4>
                      <p className="text-slate-400 text-xs mt-1">内容已同步至选定平台</p>
                    </div>
                    {platforms.map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-green-400/10 flex items-center justify-center text-green-400">
                            <span className="material-symbols-outlined text-sm">done</span>
                          </div>
                          <span className="text-sm text-white">{p}</span>
                        </div>
                        <Link to="#" className="text-xs text-primary hover:underline">查看链接</Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                    <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                      <span className="material-symbols-outlined text-3xl">cloud_queue</span>
                    </div>
                    <p className="text-slate-400 text-sm">暂无发布任务</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
