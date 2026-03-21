import { Link } from 'react-router-dom';

export default function AppGrowthCase() {
  return (
    <div className="bg-surface-dark text-slate-100 min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border-dark bg-surface-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
            <h2 className="text-xl font-bold tracking-tight">Agents Me</h2>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/">首页</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/dashboard">工作台</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/product-concept">产品概念</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/pricing">产品定价</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20">
            登录
          </button>
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
              通过多 AI 协同的精准获客与留存自动化方案，该社交APP在上线首月即实现百万级新增用户，次日留存率提升 45%。
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
                  autoPlay loop muted playsInline preload="auto"
                  src="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
                />
              </div>
            </div>

            <div className="mb-20">
              <h3 className="text-3xl font-bold text-white mb-12 text-center">核心增长能力</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "target",
                    title: "精准获客引擎",
                    desc: "基于深度学习的社交趋势分析，自动捕捉高价值潜在用户，实现获客成本降低 60%。",
                    tags: ["实时趋势", "智能素材", "ROI 优化"]
                  },
                  {
                    icon: "group_add",
                    title: "用户全生命周期运营",
                    desc: "从新客激活到老客留存，全自动化的触达机制，确保每个环节的用户流失率降至最低。",
                    tags: ["动态画像", "个性化 Push", "自动召回"]
                  },
                  {
                    icon: "trending_up",
                    title: "数据驱动决策中心",
                    desc: "毫秒级处理海量用户行为数据，为运营策略提供实时反馈与自动调整建议。",
                    tags: ["行为建模", "策略闭环", "实时监控"]
                  }
                ].map((item, i) => (
                  <div key={i} className="group p-8 rounded-[2.5rem] bg-surface-card border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="material-symbols-outlined text-6xl">{item.icon}</span>
                    </div>
                    <div className="relative z-10">
                      <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, j) => (
                          <span key={j} className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1 rounded bg-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workspace Execution Flow */}
            <div className="mt-24">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">专业工作台执行流程</h3>
                  <p className="text-slate-400 text-sm">多 AI 协同的自动化执行逻辑，支持可视化编辑与实时监控</p>
                </div>
                <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-full transition-all text-sm font-bold flex items-center gap-2 border border-white/10">
                  进入工作台编辑 <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              
              <div className="bg-[#0a0a0a] rounded-[3rem] border border-white/5 overflow-hidden relative min-h-[600px] flex items-center justify-center p-12">
                {/* Background Grid & Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-blue/10 blur-[120px] rounded-full"></div>

                {/* Flow Visualization */}
                <div className="relative z-10 w-full max-w-5xl">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    
                    {/* Node 1 */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-blue rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                      <div className="relative w-72 bg-surface-card/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="size-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined">person_search</span>
                          </div>
                          <div>
                            <h5 className="font-bold text-white">获客 AI</h5>
                            <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Input Stage</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-xs text-slate-400 mb-1">触发条件</p>
                            <p className="text-sm text-white font-medium">新素材需求 / 流量波动</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-xs text-slate-400 mb-1">执行动作</p>
                            <p className="text-sm text-white font-medium">生成短视频脚本 & 视觉素材</p>
                          </div>
                        </div>
                      </div>
                      {/* Connector Arrow (Desktop) */}
                      <div className="hidden md:block absolute top-1/2 -right-8 translate-x-full -translate-y-1/2">
                        <div className="flex items-center">
                          <div className="w-12 h-px bg-gradient-to-r from-primary to-accent-blue"></div>
                          <div className="size-2 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(0,123,255,0.5)]"></div>
                        </div>
                      </div>
                    </div>

                    {/* Node 2 */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue to-accent-pink rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                      <div className="relative w-72 bg-surface-card/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="size-12 rounded-2xl bg-accent-blue/20 text-accent-blue flex items-center justify-center">
                            <span className="material-symbols-outlined">psychology</span>
                          </div>
                          <div>
                            <h5 className="font-bold text-white">画像 AI</h5>
                            <span className="text-[10px] text-accent-blue font-bold uppercase tracking-widest">Processing</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-xs text-slate-400 mb-1">触发条件</p>
                            <p className="text-sm text-white font-medium">新用户注册 / 行为上报</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-xs text-slate-400 mb-1">执行动作</p>
                            <p className="text-sm text-white font-medium">动态打标 & 偏好模型更新</p>
                          </div>
                        </div>
                      </div>
                      {/* Connector Arrow (Desktop) */}
                      <div className="hidden md:block absolute top-1/2 -right-8 translate-x-full -translate-y-1/2">
                        <div className="flex items-center">
                          <div className="w-12 h-px bg-gradient-to-r from-accent-blue to-accent-pink"></div>
                          <div className="size-2 rounded-full bg-accent-pink shadow-[0_0_10px_rgba(255,0,123,0.5)]"></div>
                        </div>
                      </div>
                    </div>

                    {/* Node 3 */}
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-accent-pink to-primary rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                      <div className="relative w-72 bg-surface-card/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="size-12 rounded-2xl bg-accent-pink/20 text-accent-pink flex items-center justify-center">
                            <span className="material-symbols-outlined">notifications_active</span>
                          </div>
                          <div>
                            <h5 className="font-bold text-white">促活 AI</h5>
                            <span className="text-[10px] text-accent-pink font-bold uppercase tracking-widest">Output Stage</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-xs text-slate-400 mb-1">触发条件</p>
                            <p className="text-sm text-white font-medium">活跃度预警 / 沉默召回</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <p className="text-xs text-slate-400 mb-1">执行动作</p>
                            <p className="text-sm text-white font-medium">发送个性化 Push & 权益触达</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
