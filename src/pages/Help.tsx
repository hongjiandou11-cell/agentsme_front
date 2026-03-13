import { Link } from 'react-router-dom';

export default function Help() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-mesh overflow-x-hidden text-tech-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
            <h2 className="text-xl font-bold tracking-tight">智推 Agent 生态</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/">首页</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/workspace">专业工作台</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/market">Agent 市场</Link>
            <div className="relative group">
              <span className="text-sm font-medium text-white cursor-pointer flex items-center gap-1">
                产品中心 <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </span>
              <div className="absolute top-full left-0 mt-2 w-32 bg-[#1c1c1e] border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <Link to="/product-concept" className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">产品概念</Link>
                <Link to="/help" className="block px-4 py-2.5 text-sm text-white bg-white/5 transition-colors">帮助中心</Link>
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

      {/* Hero & Search Section */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text leading-tight">
            我们能为您提供什么帮助？
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            探索智推 Agent 的强大功能，从零开始搭建您的 AI 智能助手，或者通过开发者 API 实现深度定制。
          </p>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-pink rounded-3xl blur-xl opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center h-16 bg-surface-card border border-border-dark rounded-3xl px-6">
              <span className="material-symbols-outlined text-slate-400 mr-4">search</span>
              <input className="w-full bg-transparent border-none text-white placeholder:text-slate-500 focus:ring-0 text-lg focus:outline-none" placeholder="搜索帮助文档、API 指南或常见问题..." type="text"/>
              <kbd className="hidden md:block px-2 py-1 rounded-lg bg-white/5 text-slate-500 text-xs border border-border-dark">ESC</kbd>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-24 space-y-20">
        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Getting Started */}
          <div className="glass-card p-10 rounded-3xl group cursor-pointer border-border-dark hover:border-primary/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">快速入门</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-8">适合新用户的 5 分钟上手指南，包含账号激活与首个 Agent 创建。</p>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xs">chevron_right</span> 注册与登录流程</li>
              <li className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xs">chevron_right</span> 核心概念：什么是 Agent</li>
              <li className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xs">chevron_right</span> 零代码搭建首个助手</li>
            </ul>
          </div>

          {/* Developer Guide */}
          <div className="glass-card p-10 rounded-3xl group cursor-pointer border-border-dark hover:border-accent-pink/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-accent-pink/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-accent-pink text-3xl">terminal</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">开发者指南</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-8">深度定制 API、插件开发协议以及私有化部署相关技术细节。</p>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xs">chevron_right</span> API 参考文档</li>
              <li className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xs">chevron_right</span> SDK 集成示例 (Python/JS)</li>
              <li className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xs">chevron_right</span> Webhook 事件订阅</li>
            </ul>
          </div>

          {/* Merchant Guide */}
          <div className="glass-card p-10 rounded-3xl group cursor-pointer border-border-dark hover:border-accent-blue/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-accent-blue text-3xl">business_center</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">商家/B端手册</h3>
            <p className="text-slate-400 text-base leading-relaxed mb-8">企业级权限管理、商业化分发政策及数据看板使用说明。</p>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xs">chevron_right</span> 团队协作与权限分配</li>
              <li className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xs">chevron_right</span> 商业化授权定价模型</li>
              <li className="flex items-center gap-2 hover:text-primary transition-colors"><span className="material-symbols-outlined text-xs">chevron_right</span> 数据分析与 ROI 追踪</li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-10">
          <div className="flex items-center justify-between border-b border-border-dark pb-6">
            <h3 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-3xl">quiz</span> 常见问题 (FAQ)
            </h3>
            <a className="text-primary text-sm font-medium flex items-center gap-1 hover:underline" href="#">
              查看全部问题 <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-surface-card border border-border-dark hover:border-primary/30 transition-colors">
                <h4 className="font-bold mb-3 text-white text-lg">智推 Agent 支持哪些大模型底座？</h4>
                <p className="text-slate-400 text-base leading-relaxed">目前已适配 GPT-4o, Claude 3.5 Sonnet, 智谱 GLM-4 等主流模型，开发者可根据需求自由切换。</p>
              </div>
              <div className="p-8 rounded-3xl bg-surface-card border border-border-dark hover:border-primary/30 transition-colors">
                <h4 className="font-bold mb-3 text-white text-lg">如何提高 Agent 的响应准确率？</h4>
                <p className="text-slate-400 text-base leading-relaxed">通过 RAG（检索增强生成）挂载私有知识库，并进行 Prompt 精细化调优是提升效果的最佳方式。</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-surface-card border border-border-dark hover:border-primary/30 transition-colors">
                <h4 className="font-bold mb-3 text-white text-lg">我的数据安全如何保障？</h4>
                <p className="text-slate-400 text-base leading-relaxed">我们提供金融级数据隔离方案，所有敏感信息均经过 AES-256 加密，支持企业级 VPC 部署。</p>
              </div>
              <div className="p-8 rounded-3xl bg-surface-card border border-border-dark hover:border-primary/30 transition-colors">
                <h4 className="font-bold mb-3 text-white text-lg">API 调用是否有频次限制？</h4>
                <p className="text-slate-400 text-base leading-relaxed">根据订阅版本（开发者/专业/旗舰）不同，QPS 限制分别为 5, 20, 50 次每秒。高并发场景支持单独申请。</p>
              </div>
            </div>
          </div>
        </div>

        {/* Still Need Help */}
        <div className="relative overflow-hidden rounded-[3rem] p-16 bg-surface-card border border-border-dark text-center">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent-pink/20 blur-3xl rounded-full"></div>
          <h3 className="text-3xl font-bold mb-6 relative z-10 text-white">还有其他问题？</h3>
          <p className="text-slate-400 mb-10 relative z-10 max-w-xl mx-auto text-lg">
            如果您无法在文档中找到答案，请随时联系我们的技术支持团队。我们通常会在 24 小时内回复。
          </p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <button className="btn-primary px-8 py-4 flex items-center gap-2 text-base">
              <span className="material-symbols-outlined text-xl">forum</span>
              联系人工客服
            </button>
            <button className="btn-secondary px-8 py-4 flex items-center gap-2 text-base">
              <span className="material-symbols-outlined text-xl">mail</span>
              发送工单
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
