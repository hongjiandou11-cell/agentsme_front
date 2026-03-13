import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductMaterial() {
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState('');
  const [style, setStyle] = useState('Modern');
  const [image, setImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!productName) {
      alert("请输入商品名称");
      return;
    }

    setIsGenerating(true);
    setResultImage(null);

    // Simulate generation
    setTimeout(() => {
      setResultImage(`https://picsum.photos/seed/${productName}/800/600`);
      setIsGenerating(false);
    }, 2000);
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
            <span className="material-symbols-outlined text-primary text-2xl">shopping_bag</span>
            <h2 className="text-xl font-bold tracking-tight">商品素材工作台</h2>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">AI 商品素材生成</h1>
            <p className="text-slate-400 text-sm">输入商品信息，AI 将为您生成高质量的营销素材图。</p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-8">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">label</span>
                商品名称
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="例如: 极简风智能手表"
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">list</span>
                核心卖点
              </label>
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="描述商品的核心优势，例如: 续航30天, 蓝宝石镜面..."
                rows={3}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              ></textarea>
            </div>

            {/* Style Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">palette</span>
                视觉风格
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['Modern', 'Minimal', 'Luxury', 'Tech', 'Nature', 'Vibrant'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                      style === s
                        ? 'bg-primary/20 border-primary text-white shadow-lg shadow-primary/10'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Reference Image */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">image</span>
                参考图 (可选)
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
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                    </div>
                    <p className="text-sm text-slate-300">上传商品实拍图或风格参考图</p>
                  </div>
                )}
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
                  正在生成素材...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">auto_awesome</span>
                  开始生成素材
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
                  生成预览
                </h3>
              </div>
              <div className="flex-1 bg-black/40 flex items-center justify-center p-8 relative overflow-hidden">
                {isGenerating ? (
                  <div className="relative z-10 flex flex-col items-center text-center gap-6 w-full">
                    <div className="size-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary animate-pulse">
                      <span className="material-symbols-outlined text-4xl animate-spin">auto_awesome</span>
                    </div>
                    <p className="text-primary font-medium">AI 正在绘制您的商品素材...</p>
                  </div>
                ) : resultImage ? (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src={resultImage} alt="Result" className="w-full h-auto rounded-xl border border-white/10 shadow-2xl" />
                    <div className="flex gap-4 w-full">
                      <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">download</span>
                        保存素材
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-center gap-4">
                    <div className="size-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500">
                      <span className="material-symbols-outlined text-3xl">image</span>
                    </div>
                    <p className="text-slate-400 text-sm">等待生成预览...</p>
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
