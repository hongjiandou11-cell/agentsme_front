import { Link } from 'react-router-dom';

export default function ProductConcept() {
  return (
    <div className="bg-background-dark text-slate-100 font-sans selection:bg-primary/30 min-h-screen">
      <style>{`
        .glow-border {
            position: relative;
        }
        .glow-border::after {
            content: '';
            position: absolute;
            inset: -1px;
            background: linear-gradient(45deg, #13a4ec, #8b5cf6, transparent);
            z-index: -1;
            border-radius: inherit;
            opacity: 0.3;
        }
        .glass-panel {
            background: rgba(17, 28, 34, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(35, 60, 72, 0.5);
        }
        .hero-gradient {
            background: radial-gradient(circle at center, rgba(19, 164, 236, 0.15) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 100%);
        }
      `}</style>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
            <h2 className="text-xl font-bold tracking-tight">Agents Me</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/">首页</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/market">Agent 市场</Link>
            <Link className="text-sm font-medium hover:text-white transition-colors text-white" to="/product-concept">产品概念</Link>
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
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 hero-gradient">
          <div className="absolute inset-0 z-0 opacity-20" data-alt="Cinematic deep space nebula with glowing digital networks" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPEN6SFzqX_XDjLkhD1K4rk2P4O2BtsByz1cCObLEM5giIA6zwCPJLKNlQM_eesJxvwZI5g-uG-ZWQ7BQ8dtrmMd0bLD0v7MK2hCcmvl5wF5GtiB-Q78W6-DVffqHYMsiZNTFd7qGfIhiq4pwRP3Vi3sjp9_b-8OPIKhP4w4xnKzMaCMw1XO73EdZOynYzRwY3WkT4qyU9hTxZY2eYHf7suGxeq7fM8hNrq2JYCYAYIKOFfEghpuu8lUNYWXwiSOHcVIBHFSSjgyw8')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-8 gradient-text">
              AI 增长母舰：从传统营销<br />到分布式算力收割
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              打破传统营销的生产力桎梏，以 Agent2Agent 协议重构流量分发逻辑。通过去中心化的智能代理集群，实现营销内容的高频迭代与自动化价值闭环。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="w-full sm:w-auto px-10 py-4 btn-primary text-lg inline-block text-center">
                立即启动增长引擎
              </button>
              <button className="w-full sm:w-auto px-10 py-4 btn-secondary text-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">play_circle</span>
                观看技术演示
              </button>
            </div>
          </div>
        </section>
        {/* Section 1: The Problem */}
        <section className="py-24 bg-background-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-primary font-display font-bold tracking-widest uppercase text-sm">Industrial Pain Points</span>
                <h2 className="text-4xl font-display font-bold mt-4 text-white italic">落后的生产关系制约增长</h2>
              </div>
              <p className="text-slate-500 max-w-xs text-sm border-l border-primary/30 pl-4">
                传统营销链路在面对海量个性化流量需求时，表现出极高的熵增与极低的能效比。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-10 rounded-3xl border-l-4 border-l-accent-pink">
                <div className="text-accent-pink mb-6"><span className="material-symbols-outlined font-light text-5xl">groups_3</span></div>
                <h3 className="text-2xl font-bold mb-4 text-white">低效的人工链路</h3>
                <p className="text-slate-400 leading-relaxed text-base">传统作业模式依赖人力堆砌，创意、脚本、拍摄、剪辑流程割裂，响应迟缓，无法追随分钟级的热点变化。</p>
              </div>
              <div className="glass-card p-10 rounded-3xl border-l-4 border-l-accent-pink">
                <div className="text-accent-pink mb-6"><span className="material-symbols-outlined font-light text-5xl">policy</span></div>
                <h3 className="text-2xl font-bold mb-4 text-white">繁琐的内容审核</h3>
                <p className="text-slate-400 leading-relaxed text-base">多级人工审核机制导致内容时效性丧失。在算法时代，延迟即意味着流量的归零与转化率的断崖式下跌。</p>
              </div>
              <div className="glass-card p-10 rounded-3xl border-l-4 border-l-accent-pink">
                <div className="text-accent-pink mb-6"><span className="material-symbols-outlined font-light text-5xl">handshake</span></div>
                <h3 className="text-2xl font-bold mb-4 text-white">高昂的商务沟通成本</h3>
                <p className="text-slate-400 leading-relaxed text-base">传统 KOL/渠道采购依赖人工谈判，周期长、暗箱化、黑盒化，导致协作效率极低，无法实现大规模颗粒化分发。</p>
              </div>
            </div>
          </div>
        </section>
        {/* Section 2: Core Tech */}
        <section className="py-24 bg-surface-dark relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary font-display font-bold tracking-widest uppercase text-sm">Technological Core</span>
                <h2 className="text-4xl font-display font-bold mt-4 text-white mb-8">1:100 Agent 闪电战：<br />重构创作与分发效率</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="size-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">auto_fix_high</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">异构内容创作体系</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">秒级调度 100+ 细分创作 Agent，涵盖 Vlog、技术测评、剧情演绎等多元风格。根据目标受众画像，自动生成极具渗透力的内容矩阵。</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="size-14 shrink-0 rounded-2xl bg-accent-pink/10 flex items-center justify-center text-accent-pink">
                      <span className="material-symbols-outlined text-3xl">bolt</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">毫秒级自动握手协议</h4>
                      <p className="text-slate-400 text-base leading-relaxed">基于 Agent2Agent 协议，直接与 100+ KOL 数字孪生体进行算力握手。省去人工商务谈判，实现内容与渠道的最优路径匹配。</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative animate-float">
                <div className="aspect-square glass-card rounded-[2.5rem] overflow-hidden p-4 border border-border-dark">
                  <img alt="Abstract visualization of a decentralized neural network network grid" className="w-full h-full object-cover rounded-2xl opacity-80" data-alt="Futuristic digital network visualization with glowing nodes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABnyzIJ4Gy0UDs5qGthcQhQFKjXun6xMgRDYI6RkvdNTilVMmg4VwCXfGVOgdti8LA_CeYIKxXH8FWGIgZ-MihZdK9UEs2sFEcI4JdQ4wd1eXicuXZBIRxcr_YNceTdR2yRQaqTP4mb-9Qly6H4yQGBDbb4FvSDLa5sm44Umx6LaeQXAVzVgTURXPHctFVPNScZmzVqbjCCeqAkxUvUyKy9aOktZ0znQDj51bim_NqVuCujbfgl9oWnd3r-IfD28XylXnbCYvOg6e2" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 p-6 glass-panel rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Operations</span>
                      <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        Active Sync
                      </span>
                    </div>
                    <div className="text-2xl font-display font-bold text-white tracking-tight">124,832 Agents Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section 3: Tech Moat */}
        <section className="py-24 bg-background-dark">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <span className="text-primary font-display font-bold tracking-widest uppercase text-sm">Intelligence Moat</span>
            <h2 className="text-4xl font-display font-bold mt-4 text-white">流量加速：Agent 的“群体演化”与算法对齐</h2>
          </div>
          <div className="max-w-5xl mx-auto px-6">
            <div className="relative glass-panel rounded-3xl p-10 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-left">
                  <p className="text-slate-300 leading-relaxed mb-6">
                    我们不仅是在发布内容，而是在构建生态。
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      <span className="text-sm text-slate-400">利用 AI Agent 模拟真实用户生态，触发平台社交加权逻辑。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      <span className="text-sm text-slate-400">通过群体协同行为，直接对齐平台推荐算法，最大化自然流获取。</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      <span className="text-sm text-slate-400">毫秒级反馈环：Agent 实时感知流量波动，动态修正后续策略。</span>
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video bg-primary/20 rounded-xl border border-primary/30 flex items-center justify-center flex-col p-4">
                    <div className="text-3xl font-display font-bold text-primary mb-1">4.8x</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-tighter">Reach Multiplier</div>
                  </div>
                  <div className="aspect-video bg-accent-pink/10 rounded-2xl border border-accent-pink/20 flex items-center justify-center flex-col p-4">
                    <div className="text-4xl font-display font-bold text-accent-pink mb-1">-92%</div>
                    <div className="text-xs text-slate-400 uppercase tracking-tighter">Human Overhead</div>
                  </div>
                  <div className="col-span-2 aspect-[3/1] bg-white/5 rounded-2xl border border-border-dark flex items-center justify-center overflow-hidden">
                    <div className="w-full px-6">
                      <div className="flex justify-between text-xs text-slate-500 mb-3">
                        <span>Evolution Progress</span>
                        <span>Agent Alpha v9.2</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-accent-pink w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section 4: ROI & Efficiency */}
        <section className="py-24 bg-surface-dark relative overflow-hidden border-t border-border-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative animate-float">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent-blue/20 rounded-[40px] blur-2xl opacity-50"></div>
                <div className="relative glass-card rounded-3xl p-8 border-white/10 aspect-square flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/roi/800/800" alt="ROI Visualization" className="w-full h-full object-cover rounded-2xl opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-primary font-display font-bold tracking-widest uppercase text-sm">ROI & Efficiency</span>
                <h2 className="text-4xl font-display font-bold mt-4 text-white mb-8">增长闭环：算力驱动的投资回报</h2>
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-default">
                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">visibility</span>
                      调度官视角 (Orchestrator Mode)
                    </h4>
                    <p className="text-slate-400 text-sm">企业主只需设定增长指标，AI 自动完成从内容策略到流量收割的全程调度。</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-default">
                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">token</span>
                      Token 消耗与流量收益挂钩
                    </h4>
                    <p className="text-slate-400 text-sm">将不可控的人力薪酬支出，转化为精准可控的 Token 算力成本，每一分预算均可追溯其流量贡献。</p>
                  </div>
                  <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-default">
                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">hub</span>
                      分布式算力替代人力成本
                    </h4>
                    <p className="text-slate-400 text-sm">利用闲置 GPU 算力驱动 Agent 运行，彻底摆脱传统营销公司的沉重人力包袱。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Ecosystem */}
        <section className="py-24 bg-background-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-primary font-display font-bold tracking-widest uppercase text-sm">Developer Ecosystem</span>
              <h2 className="text-4xl font-display font-bold mt-4 text-white">B+C 开发者生态：佣金制 Agent 互联协议</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel p-10 rounded-3xl text-center flex flex-col items-center">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-4xl">account_balance_wallet</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">训练即资产</h3>
                <p className="text-slate-400 text-sm leading-relaxed">开发者训练出的高转化 Agent 可作为数字资产上架，每次被企业调用均产生分红回报。</p>
              </div>
              <div className="glass-panel p-10 rounded-3xl text-center flex flex-col items-center border-t-2 border-t-primary/40">
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6 shadow-[0_0_20px_rgba(19,164,236,0.2)]">
                  <span className="material-symbols-outlined text-4xl">payments</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">被动收益机制</h3>
                <p className="text-slate-400 text-sm leading-relaxed">构建 7x24 小时运行的自动赚钱机器，让代码在全网流量分发中产生持续复利。</p>
              </div>
              <div className="glass-panel p-10 rounded-3xl text-center flex flex-col items-center">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-4xl">sell</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">能力竞价机制</h3>
                <p className="text-slate-400 text-sm leading-relaxed">通过高效的底层协议，表现最优的 Agent 将获得更多的调度机会与算力倾斜。</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 opacity-50"></div>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="glass-panel p-12 md:p-20 rounded-[40px] text-center border border-white/10 glow-border">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">准备好登入增长母舰了吗？</h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                加入 2,000+ 领先企业与开发者阵营，以前所未有的算力效率重构您的业务增长蓝图。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="w-full sm:w-auto px-12 py-5 rounded-full bg-primary text-white font-bold text-lg shadow-2xl shadow-primary/40 hover:scale-105 transition-all inline-block text-center">
                  登入工作台 (Workspace)
                </button>
                <button className="w-full sm:w-auto px-12 py-5 rounded-full border border-slate-700 bg-white/5 text-white font-bold text-lg hover:bg-white/10 transition-all">
                  查看行业解决方案
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border-dark bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-slate-800 flex items-center justify-center rounded text-slate-400">
                <span className="material-symbols-outlined text-sm">rocket</span>
              </div>
              <span className="text-slate-500 font-display font-bold text-sm tracking-tight">GROWTH MOTHER SHIP © 2024</span>
            </div>
            <div className="flex items-center gap-8 text-slate-500 text-sm">
              <a className="hover:text-primary transition-colors" href="#">服务协议</a>
              <a className="hover:text-primary transition-colors" href="#">隐私政策</a>
              <a className="hover:text-primary transition-colors" href="#">开发者文档</a>
              <a className="hover:text-primary transition-colors" href="#">联系我们</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
