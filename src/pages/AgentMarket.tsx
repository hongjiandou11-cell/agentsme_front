import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function AgentMarket() {
  const [activeTab, setActiveTab] = useState<'url' | 'manual'>('url');
  
  const agents = [
    {
      id: 'brand-ad-creator',
      name: 'brand-ad-creator',
      desc: '顶级品牌广告创作 Agent。上传商品图片，AI 基于奢侈级视觉公式（Chiaroscuro 灯光 + 微距摄影 + 超现实升格）自动生成 9 宫格分镜剧本、关键帧图片，可选生成 Veo 3.1 视频片段。完全尊重产品的 Logo、外形、材质细节。',
      tags: ['品牌广告分镜创作'],
      rating: '5.0',
      calls: '0',
      latency: '0ms',
      cost: '$0.2',
      status: '在线'
    },
    {
      id: 'cobalt-downloader',
      name: 'cobalt-downloader',
      desc: '基于 Cobalt 的通用媒体下载 Agent，支持将 YouTube / TikTok / Twitter / Instagram / Bilibili 等平台 URL 转为可下载链接并完成下载',
      tags: ['URL 媒体下载'],
      rating: '5.0',
      calls: '0',
      latency: '0ms',
      cost: '$0.05',
      status: '在线'
    },
    {
      id: 'app-promo-designer',
      name: 'app-promo-designer',
      desc: 'App Store 营销图自动设计 — 智能匹配模板、生成文案、渲染宣传图。支持 iPhone/iPad 多种模板风格。',
      tags: ['App 营销图渲染', '营销模板浏览'],
      rating: '5.0',
      calls: '0',
      latency: '0ms',
      cost: '$0.12',
      status: '在线'
    },
    {
      id: 'xhs-md2img',
      name: 'xhs-md2img',
      desc: '小红书 Markdown 转图片 Agent：将 Markdown 格式的文案渲染为小红书风格的精美卡片图片，支持多主题配色、自动分页、封面生成、代码高亮。适用于将长文内容转化为适合小红书发布的多图笔记。',
      tags: ['Markdown 转小红书卡片图片'],
      rating: '5.0',
      calls: '0',
      latency: '0ms',
      cost: '$0.06',
      status: '在线'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col overflow-y-auto custom-scrollbar bg-[#0f0f11]"
    >
      {/* Header */}
      <div className="px-8 py-8 shrink-0">
        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Agent 市场</h1>
        <p className="text-sm text-slate-400">已注册 19 个 Agent | 注册新 Agent 或测试技能匹配</p>
      </div>

      <div className="px-8 pb-8 max-w-[1600px] w-full space-y-8">
        {/* Top Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Register Agent Panel */}
          <div className="bg-[#18181b] rounded-2xl border border-white/5 p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6 text-white">
              <span className="material-symbols-outlined text-primary text-xl">add_circle</span>
              <h2 className="text-lg font-bold">注册 Agent</h2>
            </div>
            
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setActiveTab('url')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'url' ? 'bg-primary text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                通过 URL
              </button>
              <button 
                onClick={() => setActiveTab('manual')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'manual' ? 'bg-primary text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'}`}
              >
                手动填写
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">AGENT CARD 地址</label>
                <input 
                  type="text" 
                  placeholder="https://agent.example.com/.well-known/agent.json"
                  className="w-full bg-[#121214] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">每次调用费用 ($)</label>
                <input 
                  type="text" 
                  defaultValue="0"
                  className="w-full bg-[#121214] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors mt-2">
                通过 URL 注册
              </button>
            </div>
          </div>

          {/* Skill Match Panel */}
          <div className="bg-[#18181b] rounded-2xl border border-white/5 p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6 text-white">
              <span className="material-symbols-outlined text-primary text-xl">search</span>
              <h2 className="text-lg font-bold">技能匹配</h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">所需技能（逗号分隔）</label>
                <input 
                  type="text" 
                  placeholder="内容创作, 小红书, 文案"
                  className="w-full bg-[#121214] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                查找最佳 Agent
              </button>
            </div>
          </div>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-[#18181b] rounded-2xl border border-white/5 p-6 flex flex-col h-full shadow-lg hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-mono rounded border border-indigo-500/20">REMOTE</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3">{agent.name}</h3>
              <p className="text-sm text-slate-400 mb-4 flex-1">{agent.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white/5 text-slate-300 text-[11px] rounded-lg border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-6 border-t border-b border-white/5 py-4">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">{agent.rating}</span>
                  <span className="text-[10px] text-slate-500">评分</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">{agent.calls}</span>
                  <span className="text-[10px] text-slate-500">调用</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">{agent.latency}</span>
                  <span className="text-[10px] text-slate-500">延迟</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white">{agent.cost}</span>
                  <span className="text-[10px] text-slate-500">费用</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs text-slate-400">{agent.status}</span>
                </div>
                <button className="px-4 py-1.5 rounded-lg border border-rose-500/30 text-rose-400 text-xs hover:bg-rose-500/10 transition-colors">
                  移除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
