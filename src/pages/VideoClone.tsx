import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function VideoClone() {
  const [videoUploadType, setVideoUploadType] = useState<'local' | 'url'>('local');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [imageUploadType, setImageUploadType] = useState<'local' | 'url'>('local');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [resolution, setResolution] = useState('1080p');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [prompt, setPrompt] = useState('');
  
  const [useAudio, setUseAudio] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any[] | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<{ resultUrl?: string; logs?: string[] } | null>(null);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

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
      setImageUrl('');
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
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
    <div className="bg-background-dark text-slate-100 font-sans min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors flex items-center justify-center size-10 rounded-full hover:bg-white/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-primary text-3xl">movie_edit</span>
            <h2 className="text-2xl font-bold tracking-tight">视频克隆工作台</h2>
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
            {/* Reference Video */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">movie</span>
                  参考视频
                </label>
                <div className="flex bg-black/20 rounded-lg p-1">
                  <button 
                    onClick={() => setVideoUploadType('local')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${videoUploadType === 'local' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    本地上传
                  </button>
                  <button 
                    onClick={() => setVideoUploadType('url')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${videoUploadType === 'url' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    URL链接
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                {videoUploadType === 'local' ? (
                  <div 
                    onClick={() => videoInputRef.current?.click()}
                    className="flex-1 border-2 border-dashed border-white/10 hover:border-primary/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/20 group"
                  >
                    <input 
                      type="file" 
                      ref={videoInputRef} 
                      onChange={handleVideoUpload} 
                      className="hidden" 
                      accept="video/*" 
                    />
                    {videoFile ? (
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-400">check_circle</span>
                        <span className="text-sm text-white truncate max-w-[200px]">{videoFile.name}</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary mb-1">upload</span>
                        <p className="text-xs text-slate-300">点击上传视频</p>
                        <p className="text-[10px] text-amber-400/80 mt-1">最大支持 30MB</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => { setVideoUrl(e.target.value); setVideoFile(null); }}
                    placeholder="输入视频链接 (例如: https://...)"
                    className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                )}
                
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!videoUrl && !videoFile)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    isAnalyzing || (!videoUrl && !videoFile)
                      ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  {isAnalyzing ? (
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  ) : (
                    <span className="material-symbols-outlined">analytics</span>
                  )}
                  AI 解析
                </button>
              </div>
              {analysisError && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {analysisError}
                </p>
              )}
            </div>

            {/* Reference Images */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">image</span>
                  参考图片 (支持多张)
                </label>
                <div className="flex bg-black/20 rounded-lg p-1">
                  <button 
                    onClick={() => setImageUploadType('local')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${imageUploadType === 'local' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    本地上传
                  </button>
                  <button 
                    onClick={() => setImageUploadType('url')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${imageUploadType === 'url' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    URL链接
                  </button>
                </div>
              </div>

              {imageUploadType === 'local' ? (
                <div className="space-y-3">
                  <div 
                    onClick={() => imageInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-white/10 hover:border-primary/50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/20 group"
                  >
                    <input 
                      type="file" 
                      ref={imageInputRef} 
                      onChange={handleImageUpload} 
                      className="hidden" 
                      accept="image/*" 
                      multiple
                    />
                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-2">
                      <span className="material-symbols-outlined">cloud_upload</span>
                    </div>
                    <p className="text-sm text-slate-300">点击或拖拽上传图片</p>
                  </div>
                  
                  {imageFiles.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {imageFiles.map((file, idx) => (
                        <div key={idx} className="relative group/img">
                          <img src={URL.createObjectURL(file)} alt="preview" className="w-20 h-20 object-cover rounded-lg border border-white/10" />
                          <button 
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full size-5 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                          >
                            <span className="material-symbols-outlined text-[12px]">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => { setImageUrl(e.target.value); setImageFiles([]); }}
                  placeholder="输入图片链接 (例如: https://...)"
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              )}
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
                <div className="grid grid-cols-2 gap-1 bg-black/20 p-1 rounded-xl border border-white/10">
                  {[
                    { label: '16:9', value: '16:9' },
                    { label: '9:16', value: '9:16' },
                    { label: '4:3', value: '4:3' },
                    { label: '3:4', value: '3:4' },
                  ].map((ratio) => (
                    <button
                      key={ratio.value}
                      onClick={() => setAspectRatio(ratio.value)}
                      className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
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

            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">edit_note</span>
                生成提示词 (Prompt)
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="【视频风格】例如：赛博朋克、水墨画、写实电影&#10;【转场效果】例如：平滑缩放、淡入淡出、故障风&#10;【画面描述】详细描述您希望生成的视频内容..."
                rows={5}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none font-mono text-sm leading-relaxed"
              ></textarea>
            </div>

            {/* Audio Upload */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">audio_file</span>
                  添加背景音乐 (可选)
                </h4>
                <button 
                  onClick={() => setUseAudio(!useAudio)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${useAudio ? 'bg-primary' : 'bg-white/10'}`}
                >
                  <div className={`absolute top-1 size-3 bg-white rounded-full transition-transform ${useAudio ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
              
              {useAudio && (
                <div className="pt-2">
                  <div 
                    onClick={() => audioInputRef.current?.click()}
                    className="w-full border border-dashed border-white/20 hover:border-primary/50 rounded-xl p-4 flex items-center justify-center cursor-pointer transition-colors bg-black/20 group"
                  >
                    <input 
                      type="file" 
                      ref={audioInputRef} 
                      onChange={handleAudioUpload} 
                      className="hidden" 
                      accept="audio/mp3,audio/wav" 
                    />
                    {audioFile ? (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span className="material-symbols-outlined">music_note</span>
                        <span className="text-sm truncate max-w-[200px]">{audioFile.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400 group-hover:text-primary">
                        <span className="material-symbols-outlined text-lg">upload</span>
                        <span className="text-sm">点击上传音频 (MP3/WAV)</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Result Display */}
            {analysisResult && analysisResult.length > 0 && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-3">
                <h4 className="text-sm font-medium text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  AI 视频分镜解析结果
                </h4>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {analysisResult.map((scene, index) => (
                    <div key={index} className="bg-black/20 p-3 rounded-lg border border-white/5 text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {scene.timeRange}
                        </span>
                      </div>
                      <p className="text-slate-300 mb-1"><strong className="text-slate-400">画面:</strong> {scene.visualDescription}</p>
                      <p className="text-slate-300 mb-1"><strong className="text-slate-400">运镜:</strong> {scene.cameraMovement}</p>
                      <p className="text-slate-300 mb-1"><strong className="text-slate-400">动效:</strong> {scene.animationEffects}</p>
                      <p className="text-slate-300"><strong className="text-slate-400">Prompt:</strong> {scene.aiGenerationPrompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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
                    <div className={`w-full bg-black rounded-xl border border-white/10 overflow-hidden relative group ${aspectRatio === '16:9' ? 'aspect-video' : aspectRatio === '9:16' ? 'aspect-[9/16] max-h-full w-auto' : aspectRatio === '4:3' ? 'aspect-[4/3]' : 'aspect-[3/4] max-h-full w-auto'}`}>
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
