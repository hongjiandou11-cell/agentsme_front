import { Link } from 'react-router-dom';
import { useDashboard } from '../components/DashboardContext';

export default function Market() {
  const isDashboard = useDashboard();

  return (
    <div className="bg-background-dark text-slate-100 antialiased min-h-screen">
      <div className="hero-gradient absolute inset-0 pointer-events-none"></div>
      
      {/* Top Navigation */}
      {!isDashboard && (
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
              <h2 className="text-xl font-bold tracking-tight">Agents Me</h2>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/">首页</Link>
              <Link className="text-sm font-medium hover:text-white transition-colors text-white" to="/market">Agent 市场</Link>
              <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/product-concept">产品概念</Link>
              <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/pricing">产品定价</Link>
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
      )}

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-16">
        {/* Developer Console Header */}
        <section className="glass-card rounded-[2.5rem] p-10 relative overflow-hidden border-border-dark">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-9xl scale-[5]">terminal</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold gradient-text">开发者控制台 <span className="text-primary/40 text-lg font-mono ml-2">/dev/register</span></h2>
              <p className="text-base mt-2 mb-4 line-clamp-2 text-slate-400">注册并分发您的智能体到全球生态系统，实时监控调用性能与收益。</p>
            </div>
            <div className="flex gap-4">
              <button className="btn-secondary px-6 py-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">docs</span>
                <span>接入文档</span>
              </button>
              <button className="btn-primary px-6 py-3 text-sm">全部领域</button>
            </div>
          </div>
          
          <div className="mt-10 grid md:grid-cols-2 gap-8 relative z-10">
            <div className="bg-black/40 rounded-2xl p-8 border border-border-dark">
              <div className="flex gap-2 mb-6">
                <button className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium border border-primary/30">URL 导入</button>
                <button className="px-4 py-2 text-slate-400 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">手动输入</button>
              </div>
              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2 block">Endpoint URL</span>
                  <div className="flex items-center bg-background-dark border border-white/10 rounded-lg px-4 py-3 focus-within:border-primary/50 transition-all">
                    <span className="material-symbols-outlined text-slate-500 mr-3">link</span>
                    <input className="bg-transparent border-none p-0 text-sm focus:ring-0 w-full font-mono text-primary/80" placeholder="https://api.your-agent.com/v1/invoke" type="text"/>
                  </div>
                </label>
                <button className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-lg text-sm font-bold transition-all uppercase tracking-wider">
                  验证并初始化
                </button>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-2xl p-8 border border-border-dark flex flex-col justify-center">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-accent-pink/10 rounded-2xl">
                  <span className="material-symbols-outlined text-accent-pink text-2xl">bolt</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-xl text-white">快速同步 OpenAPI</h4>
                  <p className="text-base mt-2 mb-4 line-clamp-2 text-slate-400">支持从 Swagger, Postman 或直接从代码库同步定义。我们将自动生成能力标签并配置调用逻辑。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skill Matching */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-primary">filter_list</span>
              能力与领域
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary px-6 py-2.5 text-sm">全部领域</button>
            <button className="btn-secondary px-6 py-2.5 text-sm">数据分析</button>
            <button className="btn-secondary px-6 py-2.5 text-sm">创意写作</button>
            <button className="btn-secondary px-6 py-2.5 text-sm">自动化工作流</button>
            <button className="btn-secondary px-6 py-2.5 text-sm">多模态生成</button>
            <button className="btn-secondary px-6 py-2.5 text-sm">代码辅助</button>
            <button className="btn-secondary px-6 py-2.5 text-sm">金融风控</button>
            <div className="flex-grow"></div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-mono bg-white/5 px-4 py-2 rounded-lg border border-border-dark">
              <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
              2,481 个在线智能体
            </div>
          </div>
        </section>

        {/* Agent Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card rounded-3xl p-8 group border-border-dark">
            <div className="flex justify-between items-start mb-6">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-primary/40 to-accent-pink/40 flex items-center justify-center border border-white/10 shadow-lg">
                <span className="material-symbols-outlined text-3xl text-white">analytics</span>
              </div>
              <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                Verified
              </div>
            </div>
            <h4 className="text-xl font-bold group-hover:text-primary transition-colors text-white">Quantum Insight Engine</h4>
            <p className="text-sm mt-3 mb-6 line-clamp-2 text-slate-400 leading-relaxed">深度财务报表分析与预测，支持实时抓取全球股市动态，生成多维度可视化报告。</p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-border-dark">FinTech</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-border-dark">Real-time</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-border-dark">ReportGen</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-auto border-t border-border-dark pt-6">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Rating</p>
                <p className="text-sm font-bold text-white">4.9 / 5.0</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Latency</p>
                <p className="text-sm font-bold text-white">1.2s</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Calls</p>
                <p className="text-sm font-bold text-white">12.5k+</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Cost</p>
                <p className="text-sm font-bold text-white">$0.02 / call</p>
              </div>
            </div>
            <button className="w-full mt-8 py-3.5 btn-secondary group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
              立即部署
            </button>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-3xl p-8 group border-border-dark">
            <div className="flex justify-between items-start mb-6">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-orange-400/40 to-red-500/40 flex items-center justify-center border border-white/10 shadow-lg">
                <span className="material-symbols-outlined text-3xl text-white">draw</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                <span className="material-symbols-outlined text-xs">new_releases</span>
                Trending
              </div>
            </div>
            <h4 className="text-xl font-bold group-hover:text-primary transition-colors text-white">Visual Muse AI</h4>
            <p className="text-sm mt-3 mb-6 line-clamp-2 text-slate-400 leading-relaxed">基于提示词生成高精度UI设计草图，支持一键导出 Figma 格式与 Tailwind 代码。</p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-border-dark">Design</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-border-dark">Figma</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-border-dark">UI/UX</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-auto border-t border-border-dark pt-6">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Rating</p>
                <p className="text-sm font-bold text-white">4.7 / 5.0</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Latency</p>
                <p className="text-sm font-bold text-white">3.5s</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Calls</p>
                <p className="text-sm font-bold text-white">8.2k</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Cost</p>
                <p className="text-sm font-bold text-white">$0.05 / call</p>
              </div>
            </div>
            <button className="w-full mt-8 py-3.5 btn-secondary group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
              立即部署
            </button>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-3xl p-8 group border-border-dark">
            <div className="flex justify-between items-start mb-6">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-green-400/40 to-primary/40 flex items-center justify-center border border-white/10 shadow-lg">
                <span className="material-symbols-outlined text-3xl text-white">code_blocks</span>
              </div>
              <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-400 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-yellow-500/20">
                <span className="material-symbols-outlined text-xs">star</span>
                Top Rated
              </div>
            </div>
            <h4 className="text-xl font-bold group-hover:text-primary transition-colors text-white">DevFlow Automator</h4>
            <p className="text-sm mt-3 mb-6 line-clamp-2 text-slate-400 leading-relaxed">自动审查 GitHub Pull Requests，寻找逻辑漏洞并建议性能优化代码，兼容 20+ 编程语言。</p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-border-dark">DevOps</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-border-dark">GitHub</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-300 font-mono border border-border-dark">Security</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-auto border-t border-border-dark pt-6">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Rating</p>
                <p className="text-sm font-bold text-white">5.0 / 5.0</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Latency</p>
                <p className="text-sm font-bold text-white">0.8s</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Calls</p>
                <p className="text-sm font-bold text-white">45k+</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Cost</p>
                <p className="text-sm font-bold text-white">$0.01 / call</p>
              </div>
            </div>
            <button className="w-full mt-8 py-3.5 btn-secondary group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
              立即部署
            </button>
          </div>
        </section>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 py-8">
          <button className="p-2 bg-white/5 border border-border-dark rounded-xl hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <div className="flex gap-2">
            <button className="btn-primary px-5 py-2 text-sm">1</button>
            <button className="size-10 bg-white/5 border border-border-dark rounded-xl hover:bg-white/10 transition-colors">2</button>
            <button className="size-10 bg-white/5 border border-border-dark rounded-xl hover:bg-white/10 transition-colors">3</button>
            <span className="flex items-end px-2 pb-2 text-slate-500">...</span>
            <button className="size-10 bg-white/5 border border-border-dark rounded-xl hover:bg-white/10 transition-colors">12</button>
          </div>
          <button className="p-2 bg-white/5 border border-border-dark rounded-xl hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </main>

      {/* Footer Stats (Floating Bar) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-card/90 backdrop-blur-2xl border border-border-dark px-8 py-4 rounded-full shadow-2xl flex items-center gap-10 z-50">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">lan</span>
          <span className="text-xs font-mono"><span className="text-primary font-bold">156</span> Total Nodes</span>
        </div>
        <div className="h-4 w-px bg-border-dark"></div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-accent-pink">speed</span>
          <span className="text-xs font-mono"><span className="text-accent-pink font-bold">99.99%</span> Uptime</span>
        </div>
        <div className="h-4 w-px bg-border-dark"></div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-green-500">payments</span>
          <span className="text-xs font-mono"><span className="text-green-500 font-bold">$1.2M</span> Ecosystem Volume</span>
        </div>
      </div>
    </div>
  );
}
