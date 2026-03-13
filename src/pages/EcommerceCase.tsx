import { Link } from 'react-router-dom';

export default function EcommerceCase() {
  return (
    <div className="bg-surface-dark text-slate-100 min-h-screen flex flex-col font-sans selection:bg-accent-pink/30 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border-dark bg-surface-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
            <h2 className="text-xl font-bold tracking-tight">智推 Agent 生态</h2>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/">首页</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/workspace">专业工作台</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/market">Agent 市场</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-6 lg:px-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-pink/10 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-accent-pink/20 text-accent-pink text-xs font-bold tracking-widest uppercase mb-6 border border-accent-pink/20">
              Success Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-display tracking-tight">
              电商营销案例：<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink to-accent-blue">双十一美妆爆款打造</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              覆盖商品详情、客服引导及促销策略的智能驱动，帮助某美妆品牌在双十一期间实现销量同比增长 300%，客服响应时间缩短 80%。
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="px-6 lg:px-20 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="order-2 md:order-1 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <video 
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay loop muted playsInline
                  src="https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" 
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold text-white mb-6">痛点与挑战</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-1">cancel</span>
                    <p>大促期间客服压力剧增，人工回复不及时导致订单流失。</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-1">cancel</span>
                    <p>商品详情页转化率低，缺乏针对不同用户群体的个性化卖点展示。</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary shrink-0 mt-1">cancel</span>
                    <p>促销策略复杂，人工计算和配置容易出错，影响用户体验。</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-20">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">解决方案：全链路营销自动化</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-surface-card p-8 rounded-2xl border border-white/5">
                  <div className="size-12 rounded-xl bg-accent-pink/20 text-accent-pink flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined">support_agent</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">智能客服 Agent</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">7x24小时在线，秒级响应用户咨询，自动识别购买意图并推荐相关商品，大幅提升转化率。</p>
                </div>
                <div className="bg-surface-card p-8 rounded-2xl border border-white/5">
                  <div className="size-12 rounded-xl bg-purple-400/20 text-purple-400 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined">auto_awesome_mosaic</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">详情页 Agent</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">根据用户浏览历史和偏好，动态生成个性化的商品详情页，突出核心卖点，提高购买转化。</p>
                </div>
                <div className="bg-surface-card p-8 rounded-2xl border border-white/5">
                  <div className="size-12 rounded-xl bg-orange-400/20 text-orange-400 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined">local_offer</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">促销策略 Agent</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">实时监控库存和销量，自动调整促销策略和优惠券发放，最大化利润空间。</p>
                </div>
              </div>
            </div>

            {/* Workspace Execution Flow */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-white">专业工作台执行流程</h3>
                <Link to="/workspace" className="text-accent-pink hover:text-white transition-colors text-sm flex items-center gap-1">
                  进入工作台编辑 <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden relative min-h-[500px] flex items-center justify-center bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:24px_24px]">
                {/* Mock Flow Nodes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8 w-full max-w-4xl px-8 overflow-x-auto pb-8">
                  
                  {/* Node 1 */}
                  <div className="shrink-0 w-64 bg-surface-card rounded-xl border border-accent-pink/30 p-4 shadow-lg relative z-10">
                    <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-3">
                      <span className="material-symbols-outlined text-accent-pink">support_agent</span>
                      <span className="font-bold text-white text-sm">客服 Agent</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">触发条件：用户咨询</div>
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">动作：意图识别 & 自动回复</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 text-slate-500 material-symbols-outlined">arrow_forward</div>

                  {/* Node 2 */}
                  <div className="shrink-0 w-64 bg-surface-card rounded-xl border border-purple-400/30 p-4 shadow-lg relative z-10">
                    <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-3">
                      <span className="material-symbols-outlined text-purple-400">auto_awesome_mosaic</span>
                      <span className="font-bold text-white text-sm">详情页 Agent</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">触发条件：用户浏览商品</div>
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">动作：动态渲染个性化页面</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 text-slate-500 material-symbols-outlined">arrow_forward</div>

                  {/* Node 3 */}
                  <div className="shrink-0 w-64 bg-surface-card rounded-xl border border-orange-400/30 p-4 shadow-lg relative z-10">
                    <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-3">
                      <span className="material-symbols-outlined text-orange-400">local_offer</span>
                      <span className="font-bold text-white text-sm">促销 Agent</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">触发条件：加入购物车/结算</div>
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">动作：最优优惠券匹配</div>
                    </div>
                  </div>

                </div>
                
                {/* Connecting Line (Mock) */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0"></div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}