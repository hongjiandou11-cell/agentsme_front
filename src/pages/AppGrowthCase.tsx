import { Link } from 'react-router-dom';

export default function AppGrowthCase() {
  return (
    <div className="bg-surface-dark text-slate-100 min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white">
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
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20">
              Success Story
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-display tracking-tight">
              APP 增长/打爆案例：<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-blue">某社交APP的冷启动奇迹</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              通过多 Agent 协同的精准获客与留存自动化方案，该社交APP在上线首月即实现百万级新增用户，次日留存率提升 45%。
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="px-6 lg:px-20 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">痛点与挑战</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-pink shrink-0 mt-1">cancel</span>
                    <p>冷启动阶段获客成本极高，传统买量渠道ROI持续走低。</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-pink shrink-0 mt-1">cancel</span>
                    <p>用户画像不清晰，导致推送内容匹配度低，新用户流失严重。</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-accent-pink shrink-0 mt-1">cancel</span>
                    <p>缺乏自动化的促活机制，运营人员手动干预效率低下。</p>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <video 
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay loop muted playsInline
                  src="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
                />
              </div>
            </div>

            <div className="mb-20">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">解决方案：多 Agent 协同矩阵</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-surface-card p-8 rounded-2xl border border-white/5">
                  <div className="size-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined">person_search</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">获客 Agent</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">自动分析各大社交平台热点，生成符合目标群体口味的拉新素材，并进行A/B测试优化投放策略。</p>
                </div>
                <div className="bg-surface-card p-8 rounded-2xl border border-white/5">
                  <div className="size-12 rounded-xl bg-accent-blue/20 text-accent-blue flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">画像 Agent</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">实时收集新用户行为数据，动态构建用户画像，为个性化内容推荐提供精准的数据支持。</p>
                </div>
                <div className="bg-surface-card p-8 rounded-2xl border border-white/5">
                  <div className="size-12 rounded-xl bg-green-400/20 text-green-400 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined">notifications_active</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">促活 Agent</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">基于用户画像和活跃度模型，在最佳时机自动触发个性化Push和短信，有效召回流失用户。</p>
                </div>
              </div>
            </div>

            {/* Workspace Execution Flow */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-white">专业工作台执行流程</h3>
                <Link to="/workspace" className="text-primary hover:text-white transition-colors text-sm flex items-center gap-1">
                  进入工作台编辑 <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="bg-[#1a1a1a] rounded-3xl border border-white/10 overflow-hidden relative min-h-[500px] flex items-center justify-center bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:24px_24px]">
                {/* Mock Flow Nodes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8 w-full max-w-4xl px-8 overflow-x-auto pb-8">
                  
                  {/* Node 1 */}
                  <div className="shrink-0 w-64 bg-surface-card rounded-xl border border-primary/30 p-4 shadow-lg relative z-10">
                    <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-3">
                      <span className="material-symbols-outlined text-primary">person_search</span>
                      <span className="font-bold text-white text-sm">获客 Agent</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">触发条件：新素材需求</div>
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">动作：生成短视频脚本</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 text-slate-500 material-symbols-outlined">arrow_forward</div>

                  {/* Node 2 */}
                  <div className="shrink-0 w-64 bg-surface-card rounded-xl border border-accent-blue/30 p-4 shadow-lg relative z-10">
                    <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-3">
                      <span className="material-symbols-outlined text-accent-blue">psychology</span>
                      <span className="font-bold text-white text-sm">画像 Agent</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">触发条件：新用户注册</div>
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">动作：打标签 & 偏好分析</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 text-slate-500 material-symbols-outlined">arrow_forward</div>

                  {/* Node 3 */}
                  <div className="shrink-0 w-64 bg-surface-card rounded-xl border border-green-400/30 p-4 shadow-lg relative z-10">
                    <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-3">
                      <span className="material-symbols-outlined text-green-400">notifications_active</span>
                      <span className="font-bold text-white text-sm">促活 Agent</span>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">触发条件：活跃度下降</div>
                      <div className="text-xs text-slate-400 bg-black/20 p-2 rounded">动作：发送个性化Push</div>
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