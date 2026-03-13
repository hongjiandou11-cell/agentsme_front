import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Palette, ArrowUp, X } from 'lucide-react';

export default function Home() {
  const [activeAgent, setActiveAgent] = useState<'app' | 'marketing'>('app');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-background-dark text-slate-100 antialiased min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
            <h2 className="text-xl font-bold tracking-tight">智推 Agent 生态</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-white transition-colors text-white" to="/">首页</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/workspace">专业工作台</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/market">Agent 市场</Link>
            <div className="relative group">
              <span className="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                产品中心 <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </span>
              <div className="absolute top-full left-0 mt-2 w-32 bg-[#1c1c1e] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <Link to="/product-concept" className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">产品概念</Link>
                <Link to="/help" className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">帮助中心</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="btn-primary px-6 py-2.5 text-sm">
            登录
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-gradient min-h-[80vh] flex flex-col items-center px-6 lg:px-20 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 w-full max-w-7xl items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight gradient-text">
                智推 Agent 生态
              </h1>
              <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                基于 Vibe Coding 模式，构建高效的 Agent A-B-C体系。重新定义商业需求与开发者的共生逻辑。
              </p>
              <div className="pt-6 flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent-blue rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                  <button 
                    onClick={() => document.getElementById('atomic-lab')?.scrollIntoView({ behavior: 'smooth' })}
                    className="relative bg-surface-card border border-white/10 hover:border-primary/50 text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-lg"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary animate-pulse">explore</span>
                    探索能力
                    <span className="material-symbols-outlined text-[14px] opacity-50 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 ml-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  4项核心能力已上线
                </div>
              </div>
            </div>

            {/* Vibe Coding Mockup */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#5c4b8b] overflow-hidden shadow-2xl flex flex-col transition-all hover:border-[#7a65b8]">
              {/* Agent Tabs */}
              <div className="flex items-center gap-6 px-4 pt-4 border-b border-white/10 shrink-0">
                <button 
                  onClick={() => setActiveAgent('app')}
                  className={`pb-3 text-sm font-medium transition-colors ${activeAgent === 'app' ? 'text-white border-b-2 border-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  APP Agent
                </button>
                <button 
                  onClick={() => setActiveAgent('marketing')}
                  className={`pb-3 text-sm font-medium transition-colors ${activeAgent === 'marketing' ? 'text-white border-b-2 border-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Marketing Agent
                </button>
              </div>

              <div className="p-4 flex flex-col gap-4">
                <textarea 
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-lg text-slate-200 resize-none placeholder-slate-500/70 leading-relaxed min-h-[120px]"
                  placeholder={activeAgent === 'app' ? "请你根据我上传的素材，帮我只做一个顶级的app营销素材，我的app名字叫傻妞，是一个ai助手，可以实现顶级的情感陪伴，每日日报生成" : "请帮我完成选品，素材生成，和小红书的自动发布"}
                ></textarea>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* File Upload Button */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*,video/*" 
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative group"
                    >
                      {selectedFile ? (
                        <span className="material-symbols-outlined text-xl text-emerald-400">check</span>
                      ) : (
                        <Plus size={20} />
                      )}
                    </button>
                    
                    {/* Templates Button */}
                    <button 
                      onClick={() => setIsTemplatesModalOpen(true)}
                      className="h-10 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                      <Palette size={18} />
                      <span className="text-sm font-medium">Templates</span>
                    </button>
                  </div>
                  
                  {/* Submit Button */}
                  <Link to="/workspace" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                    <ArrowUp size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group animate-float">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-pink rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-card rounded-3xl flex items-center justify-center overflow-hidden min-h-[350px] aspect-video border border-border-dark">
              {/* Replace the src below with your uploaded video URL */}
              <video 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                autoPlay 
                loop 
                muted 
                playsInline
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" 
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] text-slate-400 font-mono tracking-widest uppercase z-10">
                <span>Product Intro 2024</span>
                <span>02:45</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ABC Mode Section */}
      <section className="px-6 lg:px-20 py-32 bg-surface-dark relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">ABC 模式：商业与研发的共生协同</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">精准对接用户营销需求，建立激励机制，让每一行代码产生价值。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-3xl border-primary/20 bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-primary text-5xl mb-8">smart_toy</span>
              <h3 className="text-2xl font-bold mb-4 text-white">A-side Agent 驱动</h3>
              <p className="text-slate-300 text-base leading-relaxed">核心引擎调度。负责全链路的任务拆解、执行与结果校验，实现业务全流程闭环。</p>
            </div>
            <div className="glass-card p-10 rounded-3xl hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-accent-blue text-5xl mb-8">business_center</span>
              <h3 className="text-2xl font-bold mb-4 text-white">B-side 商业需求</h3>
              <p className="text-slate-400 text-base leading-relaxed">精准对齐企业级业务目标，通过 Agent 自动化处理复杂逻辑，提升 operational 效率。</p>
            </div>
            <div className="glass-card p-10 rounded-3xl hover:bg-white/5 transition-all">
              <span className="material-symbols-outlined text-accent-pink text-5xl mb-8">payments</span>
              <h3 className="text-2xl font-bold mb-4 text-white">C-side 开发者佣金</h3>
              <p className="text-slate-400 text-base leading-relaxed">建立公平透明的激励体系。当 Agent 成功解决 B 端业务时，开发者将获得实时佣金结算。</p>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="relative group h-80 rounded-3xl overflow-hidden border border-border-dark shadow-2xl">
              <div className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-100 transition-transform duration-700" data-alt="Digital growth and data analytics pattern" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB92iI8PuFUlwPXvWcIkDimzPa7bM6faYHfCBi9UfZFfI64Vb2kDt_D4hPmdyCrD6Htp5Z40sPOzd5DHAHwScPme7yBo_dx1SV0mMZ99Z24-gDObKHYn9Ie3TdnahnT8-nonMi6qvl2IWJRgyUE5DxZxgZ08IvWlUZ8yyXaGmyMuuwaOOM5Tu6E9asHX8WTwbgG5mVIP7JlO2U324XWx8dYEoJooqx0VgUNtKtsRs55heBpzhBug1hPrL4sWogYva87fgyw1NaKu0wU')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-10 flex flex-col justify-end">
                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Core Focus</span>
                <h4 className="text-3xl font-bold text-white mb-3">APP 增长/打爆</h4>
                <p className="text-slate-300 text-base max-w-sm">基于多 Agent 协同的精准获客与留存自动化方案。</p>
              </div>
            </div>
            <div className="relative group h-80 rounded-3xl overflow-hidden border border-border-dark shadow-2xl">
              <div className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-100 transition-transform duration-700" data-alt="E-commerce marketing abstract concept" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKQA1lU2k3smppSncd7aBRJLLYkm2n3ZLG6Uk82v16m7i2QUhd6fswCGU9Ip_oiTLaNVt6n4B34ndpv79kWJlsO5R2G2CBMZwL5rye_xs6pMBttqNUK9TSqH9OQhTmNQ_ZbsazNXUZk9QaT1ek6Yuu4ujcax8M3NatuNzCH5GXnwiFG2OqxEDLdn3YnacC1k9wErlmjGKz02cEqv3muvB2K8fWFsdi8a8GzCLE87bKU5moRPxxxkBHud532RKIJhxxiWKQhkRGA4_X')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-10 flex flex-col justify-end">
                <span className="text-xs font-bold text-accent-pink uppercase tracking-widest mb-3">Vertical Solution</span>
                <h4 className="text-3xl font-bold text-white mb-3">电商营销</h4>
                <p className="text-slate-300 text-base max-w-sm">覆盖商品详情、客服引导及促销策略的智能驱动。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atomic Lab Section */}
      <section id="atomic-lab" className="px-6 lg:px-20 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4 gradient-text">原子实验室</h2>
              <p className="text-slate-400 text-lg">最小化功能单元，快速拼装您的专属 Agent</p>
            </div>
            <a className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" href="#">
              查看全部实验 <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Lab Cards */}
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between border-border-dark">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal" style={{ backgroundImage: "url('https://picsum.photos/seed/video-clone/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/60"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2 font-display tracking-tight">视频克隆</h4>
                <p className="text-sm text-slate-300">AI驱动的爆款视频生成</p>
              </div>
              <Link to="/video-clone" className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block">
                立即使用
              </Link>
            </div>
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between border-border-dark">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal" style={{ backgroundImage: "url('https://picsum.photos/seed/product-design/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/60"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2 font-display tracking-tight">商品素材</h4>
                <p className="text-sm text-slate-300">一键生成高质量电商视觉</p>
              </div>
              <button className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                立即使用
              </button>
            </div>
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between border-border-dark">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal" style={{ backgroundImage: "url('https://picsum.photos/seed/mobile-app/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/60"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2 font-display tracking-tight">APP套壳</h4>
                <p className="text-sm text-slate-300">快速构建跨平台应用外壳</p>
              </div>
              <button className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                立即使用
              </button>
            </div>
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between border-border-dark">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal" style={{ backgroundImage: "url('https://picsum.photos/seed/content-publish/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/60"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2 font-display tracking-tight">内容发布</h4>
                <p className="text-sm text-slate-300">多渠道矩阵自动化分发</p>
              </div>
              <button className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                立即使用
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Agent Market Section */}
      <section className="px-6 lg:px-20 py-32 bg-surface-dark border-y border-border-dark relative overflow-hidden">
        {/* Immersive Dynamic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Slowly rotating tech grid background */}
          <div 
            className="absolute -inset-[50%] opacity-[0.08] mix-blend-screen animate-[spin_120s_linear_infinite]"
            style={{ 
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABnyzIJ4Gy0UDs5qGthcQhQFKjXun6xMgRDYI6RkvdNTilVMmg4VwCXfGVOgdti8LA_CeYIKxXH8FWGIgZ-MihZdK9UEs2sFEcI4JdQ4wd1eXicuXZBIRxcr_YNceTdR2yRQaqTP4mb-9Qly6H4yQGBDbb4FvSDLa5sm44Umx6LaeQXAVzVgTURXPHctFVPNScZmzVqbjCCeqAkxUvUyKy9aOktZ0znQDj51bim_NqVuCujbfgl9oWnd3r-IfD28XylXnbCYvOg6e2')", 
              backgroundSize: "cover", 
              backgroundPosition: "center"
            }}
          ></div>
          {/* Gradient masks to blend edges smoothly into the section */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-transparent to-surface-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface-dark via-transparent to-surface-dark"></div>
        </div>

        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(19,164,236,0.8)]"></span>
                <span className="text-primary font-mono text-sm uppercase tracking-widest">Live Leaderboard</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white">热门 Agent 市场</h2>
            </div>
            <Link className="px-6 py-3 rounded-full border border-white/10 hover:border-primary/50 text-white text-sm font-semibold flex items-center gap-2 transition-all group/link bg-white/5 hover:bg-white/10" to="/market">
              探索完整市场 <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {/* Agent Item 1 */}
            <div className="group relative bg-surface-card rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
              
              <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1">
                  <div className="text-5xl md:text-6xl font-black italic font-display text-white/5 group-hover:text-primary/20 transition-colors duration-500 w-16 text-center">
                    1
                  </div>
                  <div className="size-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(19,164,236,0.2)] group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-3xl">rocket_launch</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">增长黑客 2.0</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-primary/20 text-primary border border-primary/20">Marketing</span>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-1">自动化社交媒体趋势分析与爆款投放，全链路数据追踪。</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Call Volume</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm animate-pulse">bolt</span>
                      <span className="text-xl font-bold text-white font-mono">12.5k</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end hidden sm:flex">
                    <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Win Rate</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-sm">trending_up</span>
                      <span className="text-xl font-bold text-green-400 font-mono">94.2%</span>
                    </div>
                  </div>
                  <button className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(19,164,236,0.4)] transition-all duration-300">
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward_ios</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Agent Item 2 */}
            <div className="group relative bg-surface-card rounded-2xl border border-white/5 hover:border-accent-pink/30 transition-all duration-500 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-pink/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-pink scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
              
              <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1">
                  <div className="text-5xl md:text-6xl font-black italic font-display text-white/5 group-hover:text-accent-pink/20 transition-colors duration-500 w-16 text-center">
                    2
                  </div>
                  <div className="size-14 rounded-2xl bg-accent-pink/20 border border-accent-pink/30 flex items-center justify-center text-accent-pink shrink-0 shadow-[0_0_15px_rgba(244,114,182,0.2)] group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-3xl">support_agent</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-accent-pink transition-colors">电商客服专家</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-accent-pink/20 text-accent-pink border border-accent-pink/20">Service</span>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-1">全天候智能回复与个性化商品推荐，提升转化率与客单价。</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Call Volume</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-accent-pink text-sm animate-pulse">bolt</span>
                      <span className="text-xl font-bold text-white font-mono">8.2k</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end hidden sm:flex">
                    <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Win Rate</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-sm">trending_up</span>
                      <span className="text-xl font-bold text-green-400 font-mono">89.5%</span>
                    </div>
                  </div>
                  <button className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-accent-pink group-hover:border-accent-pink group-hover:shadow-[0_0_20px_rgba(244,114,182,0.4)] transition-all duration-300">
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward_ios</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Agent Item 3 */}
            <div className="group relative bg-surface-card rounded-2xl border border-white/5 hover:border-green-400/30 transition-all duration-500 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
              
              <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1">
                  <div className="text-5xl md:text-6xl font-black italic font-display text-white/5 group-hover:text-green-400/20 transition-colors duration-500 w-16 text-center">
                    3
                  </div>
                  <div className="size-14 rounded-2xl bg-green-400/20 border border-green-400/30 flex items-center justify-center text-green-400 shrink-0 shadow-[0_0_15px_rgba(74,222,128,0.2)] group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-3xl">code_blocks</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">Vibe 代码助手</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-green-400/20 text-green-400 border border-green-400/20">DevOps</span>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-1">实时代码重构与开发者情绪感知优化，提升研发效能。</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Call Volume</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-sm animate-pulse">bolt</span>
                      <span className="text-xl font-bold text-white font-mono">4.1k</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end hidden sm:flex">
                    <span className="text-xs text-slate-500 font-mono uppercase tracking-wider mb-1">Win Rate</span>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-400 text-sm">trending_up</span>
                      <span className="text-xl font-bold text-green-400 font-mono">98.1%</span>
                    </div>
                  </div>
                  <button className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-green-400 group-hover:border-green-400 group-hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all duration-300">
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward_ios</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Templates Modal */}
      {isTemplatesModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-2xl font-bold text-white">Templates</h2>
              <button onClick={() => setIsTemplatesModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Template Cards */}
                {[
                  { title: 'Data Visualization', img: 'https://picsum.photos/seed/data/600/400' },
                  { title: 'Saas promo video', img: 'https://picsum.photos/seed/saas/600/400' },
                  { title: 'Saas promo video', img: 'https://picsum.photos/seed/saas2/600/400' },
                  { title: 'Explainer Video', img: 'https://picsum.photos/seed/explain/600/400' },
                  { title: 'Educational Videos', img: 'https://picsum.photos/seed/edu/600/400' },
                  { title: 'Montage', img: 'https://picsum.photos/seed/montage/600/400' },
                  { title: 'Business Event', img: 'https://picsum.photos/seed/business/600/400' },
                  { title: 'Design Promo', img: 'https://picsum.photos/seed/design/600/400' },
                  { title: 'Chatbot Promo', img: 'https://picsum.photos/seed/chat/600/400' },
                ].map((template, idx) => (
                  <div key={idx} className="group cursor-pointer" onClick={() => setIsTemplatesModalOpen(false)}>
                    <div className="rounded-xl overflow-hidden mb-3 border border-white/5 group-hover:border-primary/50 transition-colors aspect-[3/2]">
                      <img src={template.img} alt={template.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{template.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
