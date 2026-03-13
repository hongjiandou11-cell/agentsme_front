import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function VideoClone() {
  const [videoUrl, setVideoUrl] = useState('');
  const [resolution, setResolution] = useState('1080p');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultData, setResultData] = useState<{ resultUrl?: string; logs?: string[] } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!videoUrl) {
      alert("请输入参考视频 URL");
      return;
    }

    setIsGenerating(true);
    setResultData(null);

    try {
      const response = await fetch('/api/agent/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentType: 'video_clone',
          payload: {
            videoUrl,
            resolution,
            aspectRatio,
            prompt,
            // Note: In a real app, you'd need to upload the file first or convert to base64
            hasImage: !!image 
          }
        })
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        setResultData(result.data);
      } else {
        alert(result.error || "生成失败");
      }
    } catch (error) {
      console.error("调用失败", error);
      alert("服务器请求失败");
    } finally {
      setIsGenerating(false);
    }
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
            <span className="material-symbols-outlined text-primary text-2xl">movie_edit</span>
            <h2 className="text-xl font-bold tracking-tight">视频克隆工作台</h2>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">AI 视频克隆</h1>
            <p className="text-slate-400 text-sm">输入参考视频、图片及描述，AI 将为您生成风格一致的高质量视频。</p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-8">
            {/* Video URL */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">link</span>
                参考视频 URL
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="输入视频链接 (例如: https://...)"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Resolution */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">high_quality</span>
                  分辨率
                </label>
                <div className="flex bg-black/20 p-1 rounded-xl border border-white/10">
                  {['720p', '1080p'].map((res) => (
                    <button
                      key={res}
                      onClick={() => setResolution(res)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                        resolution === res
                          ? 'bg-primary text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">aspect_ratio</span>
                  画面比例
                </label>
                <div className="flex bg-black/20 p-1 rounded-xl border border-white/10">
                  {[
                    { label: '16:9 (横屏)', value: '16:9' },
                    { label: '9:16 (竖屏)', value: '9:16' },
                  ].map((ratio) => (
                    <button
                      key={ratio.value}
                      onClick={() => setAspectRatio(ratio.value)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                        aspectRatio === ratio.value
                          ? 'bg-primary text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reference Image */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">image</span>
                参考图片 (可选)
              </label>
              <div className="border-2 border-dashed border-white/10 hover:border-primary/50 rounded-2xl p-8 text-center transition-colors bg-black/10 relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {image ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-green-400 text-4xl">check_circle</span>
                    <span className="text-sm text-slate-300">{image.name}</span>
                    <span className="text-xs text-slate-500">点击或拖拽重新上传</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">点击或拖拽图片至此</p>
                      <p className="text-xs text-slate-500 mt-1">支持 JPG, PNG, WEBP 格式</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">edit_note</span>
                生成提示词 (Prompt)
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="详细描述您希望生成的视频内容、风格、氛围等..."
                rows={4}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              ></textarea>
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
                  正在生成中...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">auto_awesome</span>
                  开始生成视频
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
                  <span className="material-symbols-outlined text-sm">preview</span>
                  效果预览
                </h3>
                <span className="px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-white/10 text-slate-400">
                  {resolution} • {aspectRatio}
                </span>
              </div>
              <div className="flex-1 bg-black/40 flex items-center justify-center p-8 relative overflow-hidden">
                {isGenerating ? (
                  <div className="relative z-10 flex flex-col items-center text-center gap-6 w-full">
                    <div className="size-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary animate-pulse">
                      <span className="material-symbols-outlined text-4xl animate-spin">settings</span>
                    </div>
                    <div className="w-full max-w-xs space-y-2">
                      <p className="text-primary font-medium">AI 正在处理您的请求...</p>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-1/2 animate-[pulse_2s_ease-in-out_infinite] rounded-full"></div>
                      </div>
                      <p className="text-slate-500 text-xs font-mono mt-4">
                        [Agent] 正在解析视频特征...
                      </p>
                    </div>
                  </div>
                ) : resultData ? (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6">
                    <div className="w-full aspect-video bg-black rounded-xl border border-white/10 overflow-hidden relative group">
                      {/* Simulated Video Player */}
                      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/result/800/450')] bg-cover bg-center"></div>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all">
                          <span className="material-symbols-outlined text-3xl ml-1">play_arrow</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 w-full">
                      <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">download</span>
                        下载视频
                      </button>
                      <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">share</span>
                        分享
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/videopreview/800/800')] opacity-20 bg-cover bg-center blur-sm"></div>
                    <div className="relative z-10 flex flex-col items-center text-center gap-4">
                      <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined text-3xl">movie</span>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">等待生成...</p>
                        <p className="text-slate-600 text-xs mt-1">配置左侧参数后点击生成</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
