import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: "基础版",
      price: "0",
      description: "适合个人开发者和初创团队进行初步探索",
      features: [
        "每月 100 次 AI 调用",
        "基础视频克隆功能",
        "标准商品素材生成",
        "社区支持",
        "1GB 云端存储空间"
      ],
      buttonText: "免费开始",
      highlight: false
    },
    {
      name: "专业版",
      price: "299",
      description: "为追求高效增长的专业团队量身定制",
      features: [
        "每月 2,000 次 AI 调用",
        "高级 4K 视频克隆",
        "无限量商品素材生成",
        "优先技术支持",
        "10GB 云端存储空间",
        "多 AI 协同工作流"
      ],
      buttonText: "立即订阅",
      highlight: true
    },
    {
      name: "企业版",
      price: "定制",
      description: "满足大型企业复杂业务场景的深度定制需求",
      features: [
        "无限次 AI 调用",
        "私有化部署支持",
        "专属客户经理",
        "SLA 服务保障",
        "无限云端存储空间",
        "定制化 AI 开发"
      ],
      buttonText: "联系我们",
      highlight: false
    }
  ];

  return (
    <div className="bg-surface-dark text-slate-100 min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border-dark bg-surface-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
            <h2 className="text-xl font-bold tracking-tight">Agents Me</h2>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/">首页</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/product-concept">产品概念</Link>
            <Link className="text-sm font-medium text-white transition-colors" to="/pricing">产品定价</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20">
            登录
          </button>
        </div>
      </nav>

      <main className="flex-1 py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              透明的<span className="gradient-text">定价方案</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              无论您是个人开发者还是大型企业，我们都有适合您的方案。助力您的业务实现智能化飞跃。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${
                  plan.highlight 
                    ? 'bg-surface-card border-primary/30 shadow-2xl shadow-primary/10 scale-105 z-10' 
                    : 'bg-surface-card/50 border-white/5 hover:border-white/10'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </div>
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price === '定制' ? '' : '¥'}</span>
                  <span className="text-6xl font-bold text-white">{plan.price}</span>
                  {plan.price !== '定制' && <span className="text-slate-500">/月</span>}
                </div>
                <div className="flex-1 space-y-4 mb-10">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                      {feature}
                    </div>
                  ))}
                </div>
                <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  plan.highlight 
                    ? 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20' 
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Preview */}
          <div className="mt-32 p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">需要更大规模的定制？</h3>
            <p className="text-slate-400 mb-8">我们的专家团队可以为您提供专属的 AI 解决方案和私有化部署建议。</p>
            <button className="text-primary font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
              咨询专家团队 <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-dark py-12 px-6 lg:px-20 text-center text-slate-500 text-sm">
        <p>© 2024 Agents Me. All rights reserved.</p>
      </footer>
    </div>
  );
}
