import { Link } from 'react-router-dom';

export default function Workspace() {
  return (
    <div className="bg-surface-dark text-slate-100 min-h-screen flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-border-dark bg-surface-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
            <h2 className="text-xl font-bold tracking-tight">智推 Agent 生态</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/">首页</Link>
            <Link className="text-sm font-medium hover:text-white transition-colors text-white" to="/workspace">专业工作台</Link>
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
      
      <main className="flex flex-1 overflow-hidden">
        {/* Left Section: AI Chat Interface (Glassmorphism) */}
        <aside className="w-1/3 max-w-md border-r border-border-dark flex flex-col bg-surface-card/40 relative z-20">
          {/* Chat Header */}
          <div className="p-6 border-b border-border-dark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-100">工作流助手</h3>
                <p className="text-xs text-primary flex items-center gap-1"><span className="size-1.5 rounded-full bg-primary animate-pulse"></span> AI 正在处理中</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-white">
              <span className="material-symbols-outlined">history</span>
            </button>
          </div>
          
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* AI Message */}
            <div className="flex gap-3 items-start">
              <div className="size-8 rounded-lg bg-surface-card flex items-center justify-center shrink-0 border border-border-dark">
                <span className="material-symbols-outlined text-sm text-primary">auto_awesome</span>
              </div>
              <div className="glass-card p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm leading-relaxed text-slate-200 border-border-dark">您好！我已经初始化了您的工作流。<b>内容 Agent</b> 目前正在分析源数据。我应该继续生成分发节点吗？</div>
            </div>
            
            {/* User Message */}
            <div className="flex gap-3 items-start justify-end">
              <div className="btn-primary p-4 rounded-2xl rounded-tr-none max-w-[85%] text-sm leading-relaxed text-white shadow-lg shadow-primary/20">是的，将它们连接到分发 Agent 节点，并将优先级设置为高。</div>
              <div className="size-8 rounded-lg bg-surface-card flex items-center justify-center shrink-0 border border-border-dark">
                <span className="material-symbols-outlined text-sm text-slate-400">person</span>
              </div>
            </div>
            
            {/* AI Message */}
            <div className="flex gap-3 items-start">
              <div className="size-8 rounded-lg bg-surface-card flex items-center justify-center shrink-0 border border-border-dark">
                <span className="material-symbols-outlined text-sm text-primary">auto_awesome</span>
              </div>
              <div className="glass-card p-4 rounded-2xl rounded-tl-none max-w-[85%] text-sm leading-relaxed text-slate-200 border-border-dark">明白。正在建立内容 Agent 与分发 Agent 之间的桥梁... <div className="mt-3 flex items-center gap-2 text-xs text-primary bg-primary/10 p-2 rounded-lg"> <span className="material-symbols-outlined text-xs">sync</span> 正在画布中更新执行路径 </div></div>
            </div>
          </div>
          
          {/* Input Box */}
          <div className="p-6">
            <div className="glass-card p-2 rounded-2xl flex items-end gap-2 focus-within:border-primary/50 transition-all border-border-dark">
              <textarea className="w-full bg-transparent border-none focus:ring-0 text-sm py-2 px-3 resize-none text-slate-100 placeholder-slate-500 focus:outline-none" placeholder="输入命令或提问..." rows={1}></textarea>
              <button className="btn-primary p-2 rounded-xl transition-colors">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </aside>
        
        {/* Right Section: Workflow Canvas */}
        <section className="flex-1 relative bg-[radial-gradient(#2a2a2a_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden flex items-center justify-center">
          {/* Canvas Controls */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            <button className="glass-card p-2 rounded-xl text-slate-300 hover:text-white border-border-dark"><span className="material-symbols-outlined">add</span></button>
            <button className="glass-card p-2 rounded-xl text-slate-300 hover:text-white border-border-dark"><span className="material-symbols-outlined">remove</span></button>
            <button className="glass-card p-2 rounded-xl text-slate-300 hover:text-white mt-4 border-border-dark"><span className="material-symbols-outlined">navigation</span></button>
          </div>
          
          {/* Node Flow Container */}
          <div className="relative flex flex-col items-center gap-24 p-20 w-full max-w-4xl">
            {/* Node 1: Input Source */}
            <div className="relative z-10 glass-card p-1 rounded-3xl w-64 neon-glow border-border-dark">
              <div className="bg-surface-card rounded-[22px] p-5"><div className="flex items-center justify-between mb-4"> <span className="material-symbols-outlined text-primary">database</span> <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">状态：空闲</span> </div> <h4 className="font-bold text-slate-100">数据源</h4> <div className="mt-4 grid grid-cols-2 gap-2"> <div className="bg-white/5 p-2 rounded-lg border border-border-dark"> <p className="text-[10px] text-slate-400">吞吐量</p> <p className="text-xs font-mono">1.2 TB</p> </div> <div className="bg-white/5 p-2 rounded-lg border border-border-dark"> <p className="text-[10px] text-slate-400">延迟</p> <p className="text-xs font-mono">14ms</p> </div> </div></div>
            </div>
            
            {/* Connection Line 1-2 */}
            <div className="absolute top-44 h-24 w-0.5 bg-border-dark"></div>
            
            {/* Node 2: Content Agent */}
            <div className="relative z-10 glass-card p-1 rounded-3xl w-72 ring-2 ring-primary/40 neon-glow animate-pulse-slow border-border-dark">
              <div className="bg-surface-card rounded-[22px] p-5"><div className="flex items-center justify-between mb-4"> <span className="material-symbols-outlined text-accent-pink animate-pulse">neurology</span> <span className="text-[10px] font-bold text-primary uppercase tracking-tighter animate-pulse">运行中</span> </div> <h4 className="font-bold text-slate-100">内容 Agent</h4> <p className="text-[11px] text-slate-400 mt-1">生成逻辑与上下文解析</p> <div className="mt-6 space-y-2"> <div className="flex justify-between text-[10px]"> <span className="text-slate-400">处理进度</span> <span className="text-primary">82%</span> </div> <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden"> <div className="bg-gradient-to-r from-primary to-accent-pink h-full w-[82%] shimmer-progress"></div> </div> </div></div>
              {/* Node Ports */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-primary bg-surface-dark"></div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-primary bg-surface-dark"></div>
            </div>
            
            {/* Connection Line 2-3 (Waterfall) */}
            <div className="absolute top-[26.5rem] h-24 w-0.5 bg-gradient-to-b from-primary to-accent-pink animate-flow-v"></div>
            
            {/* Node 3 & 4 Horizontal Split */}
            <div className="flex gap-24 relative">
              {/* Distribution Agent */}
              <div className="relative z-10 glass-card p-1 rounded-3xl w-64 border-border-dark">
                <div className="bg-surface-card rounded-[22px] p-5"><div className="flex items-center justify-between mb-4"> <span className="material-symbols-outlined text-primary">insights</span> <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">空闲</span> </div> <h4 className="font-bold text-slate-100">分析 Agent</h4> <div className="mt-4 grid grid-cols-1 gap-1"> <div className="flex items-center gap-2 text-[10px]"> <span className="size-2 rounded-full bg-slate-700"></span> <span className="text-slate-400">用户留存监控</span> </div> <div className="flex items-center gap-2 text-[10px]"> <span className="size-2 rounded-full bg-slate-700"></span> <span className="text-slate-400">情绪分析</span> </div> </div></div>
              </div>
              
              {/* Analytics Agent */}
              <div className="relative z-10 glass-card p-1 rounded-3xl w-64 border-border-dark">
                <div className="bg-surface-card rounded-[22px] p-5"><div className="flex items-center justify-between mb-4"> <span className="material-symbols-outlined text-primary">insights</span> <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">空闲</span> </div> <h4 className="font-bold text-slate-100">分析 Agent</h4> <div className="mt-4 grid grid-cols-1 gap-1"> <div className="flex items-center gap-2 text-[10px]"> <span className="size-2 rounded-full bg-slate-700"></span> <span className="text-slate-400">用户留存监控</span> </div> <div className="flex items-center gap-2 text-[10px]"> <span className="size-2 rounded-full bg-slate-700"></span> <span className="text-slate-400">情绪分析</span> </div> </div></div>
              </div>
              
              {/* SVG for complex connections */}
              <svg className="absolute -top-12 left-1/2 -translate-x-1/2 w-full h-24 overflow-visible pointer-events-none" style={{ zIndex: 0 }}>
                <path className="svg-flow-path opacity-60" d="M 0 0 L 0 40 L -160 40 L -160 80" fill="none" stroke="#2563EB" strokeWidth="2"></path>
                <path className="svg-flow-path opacity-60" d="M 0 0 L 0 40 L 160 40 L 160 80" fill="none" stroke="#2563EB" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
          
          {/* Execution Overlay */}
          <div className="absolute bottom-8 left-8 glass-card py-4 px-8 rounded-3xl flex items-center gap-8 border-border-dark">
            <div className="flex items-center gap-3">
              <button className="size-12 rounded-full flex items-center justify-center text-white btn-primary">
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
              <div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Workflow</p>
                <p className="text-sm font-semibold">Live Execution</p>
              </div>
            </div>
            <div className="h-8 w-px bg-border-dark"></div>
            <div className="flex gap-6">
              <div className="flex flex-col"><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">工作流</p> <p className="text-sm font-semibold">实时执行</p></div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">错误量</span>
                <span className="text-xs font-mono text-rose-500 font-bold">0</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
