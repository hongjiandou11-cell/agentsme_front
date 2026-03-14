import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Palette, ArrowUp, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const [activeAgent, setActiveAgent] = useState<'app' | 'marketing'>('app');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([]);
  const [promptText, setPromptText] = useState('');
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => {
        const combined = [...prev, ...newFiles];
        return combined.slice(0, 5); // Limit to 5 files
      });
      // Clear template images when user uploads their own
      setSelectedImageUrls([]);
    }
  };

  const removeFile = (index: number, isTemplate: boolean) => {
    if (isTemplate) {
      setSelectedImageUrls(prev => prev.filter((_, i) => i !== index));
    } else {
      setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const appTemplates = [
    {
      title: '社交APP拉新',
      img: 'https://picsum.photos/seed/social-app/600/400',
      description: '制作年轻化、有活力的社交APP拉新视频素材，适合短视频平台投放。',
      prompt: '请帮我制作一个社交APP的拉新视频素材。突出“真实交友”、“同城匹配”的特点，风格要年轻化、有活力，适合在抖音和快手投放。',
      type: 'app'
    },
    {
      title: '工具类APP促活',
      img: 'https://picsum.photos/seed/tool-app/600/400',
      description: '生成效率工具APP的促活推送文案与配图，直击用户痛点。',
      prompt: '我需要一个效率工具APP的促活推送文案和配图。强调“一键清理”、“提升手机速度”的痛点，引导老用户重新打开APP。',
      type: 'app'
    },
    {
      title: 'AI助手APP推广',
      img: 'https://picsum.photos/seed/ai-app/600/400',
      description: '定制AI助手APP的专属营销素材，主打温暖治愈的情感陪伴风格。',
      prompt: '请根据我上传的素材，帮我制作一个顶级的AI助手APP营销素材。我的APP名字叫“傻妞”，可以实现顶级的情感陪伴和每日日报生成，主打温暖治愈风。',
      type: 'app'
    },
    {
      title: '手游预约推广',
      img: 'https://picsum.photos/seed/game-app/600/400',
      description: '生成高燃的手游预约宣传片脚本与视觉素材，提升预约转化。',
      prompt: '为一款二次元动作手游制作预约推广素材。要求画面高燃、节奏感强，突出角色的华丽技能和精美立绘，引导用户点击预约。',
      type: 'app'
    },
    {
      title: '电商APP返利',
      img: 'https://picsum.photos/seed/shop-app/600/400',
      description: '制作电商返利APP的省钱攻略视频，主打“买到即赚到”的心理。',
      prompt: '制作一个电商返利APP的省钱攻略视频。通过真人出镜或动画演示，讲解如何领取大额优惠券并获得返利，突出“省钱神器”的定位。',
      type: 'app'
    },
    {
      title: '在线教育APP拉新',
      img: 'https://picsum.photos/seed/edu-app/600/400',
      description: '生成针对家长痛点的在线教育课程推广素材，主打名师与提分。',
      prompt: '为一款K12在线教育APP制作拉新素材。针对家长“孩子成绩上不去”的焦虑，突出“名师直播课”、“1对1辅导”和“快速提分”的优势。',
      type: 'app'
    },
    {
      title: '运动健身APP促活',
      img: 'https://picsum.photos/seed/fit-app/600/400',
      description: '生成充满能量的健身挑战邀请，激励用户坚持打卡。',
      prompt: '为一个健身APP设计一个“21天马甲线挑战”的促活素材。文案要充满能量，配图要展示健美的身材，激励用户每天打开APP打卡运动。',
      type: 'app'
    },
    {
      title: '旅游攻略APP推广',
      img: 'https://picsum.photos/seed/travel-app/600/400',
      description: '制作唯美的旅游攻略视频，激发用户探索世界的欲望。',
      prompt: '为旅游攻略APP制作一段唯美的风景视频。配合轻快的音乐和实用的旅游小贴士，激发用户下载APP查看完整攻略的欲望。',
      type: 'app'
    },
    {
      title: '外卖APP红包推广',
      img: 'https://picsum.photos/seed/food-app/600/400',
      description: '生成诱人的美食视频与大额红包领取引导，提升下单率。',
      prompt: '制作一个外卖APP的红包推广素材。展示诱人的美食特写，配合“领券立减20元”的醒目字样，引导用户立即下单。',
      type: 'app'
    }
  ];

  const marketingTemplates = [
    {
      title: '小红书种草图文',
      img: 'https://picsum.photos/seed/xiaohongshu/600/400',
      description: '一键完成选品分析，生成包含标题、正文和标签的小红书种草图文。',
      prompt: '请帮我完成美妆产品的选品分析，并生成3篇小红书种草图文。要求包含吸引人的标题、详细的使用体验和热门标签，并自动规划发布时间。',
      type: 'marketing'
    },
    {
      title: '电商大促海报',
      img: 'https://picsum.photos/seed/ecommerce/600/400',
      description: '快速生成极具视觉冲击力的电商大促营销海报及朋友圈文案。',
      prompt: '需要生成一套“双十一”电商大促的营销海报和朋友圈文案。主打“全年最低价”、“限时秒杀”，视觉冲击力要强，突出价格优势。',
      type: 'marketing'
    },
    {
      title: '私域社群转化',
      img: 'https://picsum.photos/seed/community/600/400',
      description: '制定包含群发话术、互动游戏和逼单文案的私域社群转化SOP。',
      prompt: '请帮我制定一个私域社群的转化SOP。包含连续3天的群发话术、互动游戏设计和最终的逼单转化文案，产品是高客单价的在线课程。',
      type: 'marketing'
    },
    {
      title: '直播间话术脚本',
      img: 'https://picsum.photos/seed/live-stream/600/400',
      description: '生成高转化的直播间带货话术，包含开场、讲解和逼单环节。',
      prompt: '为一款护肤品直播间编写带货话术。要求包含吸引人的开场白、产品核心卖点的深度讲解、以及限时限量的逼单环节，节奏感要强。',
      type: 'marketing'
    },
    {
      title: '短视频带货脚本',
      img: 'https://picsum.photos/seed/short-video/600/400',
      description: '定制爆款短视频带货脚本，包含黄金3秒开头与精准转化引导。',
      prompt: '为一个家居好物编写短视频带货脚本。要求前3秒必须抓住眼球，中间展示产品解决痛点的过程，结尾有明确的购买引导。',
      type: 'marketing'
    },
    {
      title: '品牌故事宣传片',
      img: 'https://picsum.photos/seed/brand-story/600/400',
      description: '生成具有情感共鸣的品牌故事脚本，提升品牌溢价与忠诚度。',
      prompt: '为一家手工皮具品牌编写品牌故事脚本。强调“匠心传承”、“岁月留痕”的情感价值，通过细腻的叙事提升品牌的格调。',
      type: 'marketing'
    },
    {
      title: '新品发布会PPT',
      img: 'https://picsum.photos/seed/launch-event/600/400',
      description: '自动规划新品发布会流程，并生成核心页面的视觉设计建议。',
      prompt: '为一款新款智能手表规划发布会流程。包含开场视频构思、核心功能展示页的设计建议、以及价格公布环节的悬念设计。',
      type: 'marketing'
    },
    {
      title: '节日借势营销',
      img: 'https://picsum.photos/seed/holiday/600/400',
      description: '生成针对特定节日的创意营销方案，包含海报、文案与活动。',
      prompt: '为“情人节”设计一个珠宝品牌的借势营销方案。包含创意海报设计思路、走心的情书文案、以及“买一送一”的限时活动策划。',
      type: 'marketing'
    },
    {
      title: 'B2B行业白皮书',
      img: 'https://picsum.photos/seed/b2b/600/400',
      description: '自动搜集行业数据，生成专业的B2B行业白皮书大纲与核心内容。',
      prompt: '为“AI在制造业的应用”编写一份行业白皮书大纲。要求包含市场现状分析、核心技术应用案例、未来趋势预测等专业内容。',
      type: 'marketing'
    }
  ];

  return (
    <div className="bg-background-dark text-slate-100 antialiased min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 text-white">
            <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
            <h2 className="text-xl font-bold tracking-tight">Agents Me</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-white transition-colors text-white" to="/">首页</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/workspace">专业工作台</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/market">Agent 市场</Link>
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

      {/* Hero Section */}
      <main className="hero-gradient min-h-[80vh] flex flex-col items-center px-6 lg:px-20 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 w-full max-w-7xl items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight gradient-text">
                Agents Me
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
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                ></textarea>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-wrap">
                    {/* File Upload Button */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*,video/*" 
                      multiple
                    />
                    
                    {/* Display Template Images */}
                    {selectedImageUrls.map((url, index) => (
                      <div key={`template-${index}`} className="relative group w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                        <img src={url} alt={`Template ${index}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeFile(index, true); }}
                            className="text-white hover:text-rose-400"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Display Uploaded Files */}
                    {selectedFiles.map((file, index) => (
                      <div key={`file-${index}`} className="relative group w-10 h-10 rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                        {file.type.startsWith('image/') ? (
                          <img src={URL.createObjectURL(file)} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-xl text-emerald-400">check</span>
                        )}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeFile(index, false); }}
                            className="text-white hover:text-rose-400"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add More Button (only show if total < 5) */}
                    {(selectedFiles.length + selectedImageUrls.length) < 5 && (
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative group overflow-hidden"
                        title="上传素材 (最多5张)"
                      >
                        <Plus size={20} />
                      </button>
                    )}
                    
                    {/* Templates Button */}
                    <button 
                      onClick={() => setIsTemplatesModalOpen(true)}
                      className="h-10 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-slate-400 hover:text-white transition-colors ml-2"
                    >
                      <Palette size={18} />
                      <span className="text-sm font-medium">Templates</span>
                    </button>

                    {/* Hint Text for Template Image */}
                    {selectedImageUrls.length > 0 && selectedFiles.length === 0 && (
                      <span className="text-xs text-primary animate-pulse flex items-center gap-1 ml-2">
                        <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                        点击替换或添加您自己的素材
                      </span>
                    )}
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
                preload="auto"
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

      {/* Agent2Agent & OpenClaw Section */}
      <section className="px-6 lg:px-20 py-32 bg-[#020202] relative overflow-hidden">
        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-accent-blue/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span className="text-sm font-mono text-slate-300">Powered by OpenClaw</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
              Agent2Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-blue to-accent-pink">裂变分发</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              突破传统营销瓶颈。通过部署在 OpenClaw 上的自主 Agent 网络，实现从 0 到 100 的指数级 APP 增长与全域营销破圈。
            </p>
          </div>

          <div className="relative">
            {/* Animated Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full overflow-hidden">
               <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-slide"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
              {/* Step 1: Network */}
              <div className="relative group rounded-[2.5rem] overflow-hidden bg-surface-dark border border-white/10 hover:border-primary/50 transition-all duration-500 p-8 lg:p-10 shadow-2xl hover:shadow-[0_0_40px_rgba(37,99,235,0.15)] hover:-translate-y-2">
                {/* Background Video */}
                <video 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  autoPlay loop muted playsInline preload="auto"
                  src="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
                />
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#020202]"></div>
                
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="size-16 rounded-2xl bg-black/50 border border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                      <span className="material-symbols-outlined text-primary text-3xl">hub</span>
                    </div>
                    <span className="text-6xl font-black text-white/5 group-hover:text-primary/10 transition-colors duration-500">01</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">Agent2Agent 协同</h3>
                  <p className="text-slate-400 text-base leading-relaxed">
                    Agent 之间建立去中心化的通讯与协作网络，实现跨平台、跨圈层的自主裂变与精准分发。
                  </p>
                </div>
              </div>

              {/* Step 2: Build */}
              <div className="relative group rounded-[2.5rem] overflow-hidden bg-surface-dark border border-white/10 hover:border-accent-blue/50 transition-all duration-500 p-8 lg:p-10 shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:-translate-y-2">
                {/* Background Video */}
                <video 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  autoPlay loop muted playsInline preload="auto"
                  src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                />
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#020202]"></div>
                
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="size-16 rounded-2xl bg-black/50 border border-accent-blue/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                      <span className="material-symbols-outlined text-accent-blue text-3xl">terminal</span>
                    </div>
                    <span className="text-6xl font-black text-white/5 group-hover:text-accent-blue/10 transition-colors duration-500">02</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent-blue transition-colors">OpenClaw 部署</h3>
                  <p className="text-slate-400 text-base leading-relaxed">
                    开发者基于 OpenClaw 架构，快速构建并部署具备自主分发与营销能力的超级 Agent 节点。
                  </p>
                </div>
              </div>

              {/* Step 3: Growth */}
              <div className="relative group rounded-[2.5rem] overflow-hidden bg-surface-dark border border-white/10 hover:border-accent-pink/50 transition-all duration-500 p-8 lg:p-10 shadow-2xl hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] hover:-translate-y-2">
                {/* Background Video */}
                <video 
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  autoPlay loop muted playsInline preload="auto"
                  src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" 
                />
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-[#020202]"></div>
                
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="size-16 rounded-2xl bg-black/50 border border-accent-pink/30 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                      <span className="material-symbols-outlined text-accent-pink text-3xl">rocket_launch</span>
                    </div>
                    <span className="text-6xl font-black text-white/5 group-hover:text-accent-pink/10 transition-colors duration-500">03</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent-pink transition-colors">0-100 增长破圈</h3>
                  <p className="text-slate-400 text-base leading-relaxed">
                    触达海量终端用户，引爆 APP 增长与营销变现。开发者共享生态红利，实现商业价值最大化。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section id="what-you-can-do" className="px-6 lg:px-20 py-32 bg-background-dark relative overflow-hidden">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-accent-pink/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">你可以做什么</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-32">
            {/* APP Growth Section */}
            <div className="flex flex-col lg:flex-row items-center gap-16 p-8 lg:p-12 rounded-[3rem] bg-surface-dark/30 backdrop-blur-sm border border-white/5 relative group overflow-hidden">
              {/* Dynamic Background Image for Section */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                <img 
                  src="https://picsum.photos/seed/growth-bg/1920/1080" 
                  alt="Background" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-10000 linear infinite"
                  referrerPolicy="no-referrer"
                />
              </div>

              <Link to="/case/app-growth" className="lg:w-1/3 space-y-6 relative z-10 group">
                <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full inline-block">Core Focus</span>
                <h3 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-primary transition-colors">APP 增长/打爆</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  基于多 Agent 协同的精准获客与留存自动化方案。通过 AI 驱动的创意生成与投放优化，实现低成本规模化增长。
                </p>
              </Link>
              <div className="lg:w-2/3 grid grid-cols-2 gap-6 w-full relative z-10">
                {[
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                ].map((url, i) => (
                  <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl relative group/vid">
                    <video 
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/vid:opacity-100 transition-opacity"
                      autoPlay loop muted playsInline preload="auto"
                      src={url} 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Ecommerce Section */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16 p-8 lg:p-12 rounded-[3rem] bg-surface-dark/30 backdrop-blur-sm border border-white/5 relative group overflow-hidden">
              {/* Dynamic Background Image for Section */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                <img 
                  src="https://picsum.photos/seed/ecom-bg/1920/1080" 
                  alt="Background" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-10000 linear infinite"
                  referrerPolicy="no-referrer"
                />
              </div>

              <Link to="/case/ecommerce" className="lg:w-1/3 space-y-6 relative z-10 group">
                <span className="text-xs font-bold text-accent-pink uppercase tracking-widest px-3 py-1 bg-accent-pink/10 rounded-full inline-block">Vertical Solution</span>
                <h3 className="text-3xl lg:text-4xl font-bold text-white group-hover:text-accent-pink transition-colors">电商营销</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                  覆盖商品详情、客服引导及促销策略的智能驱动。利用 Agent 矩阵提升转化率，构建全链路营销闭环。
                </p>
              </Link>
              <div className="lg:w-2/3 grid grid-cols-2 gap-6 w-full relative z-10">
                {[
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
                  "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
                ].map((url, i) => (
                  <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl relative group/vid">
                    <video 
                      className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/vid:opacity-100 transition-opacity"
                      autoPlay loop muted playsInline preload="auto"
                      src={url} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Showcase Section REMOVED */}

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
              <Link to="/product-material" className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block">
                立即使用
              </Link>
            </div>
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between border-border-dark">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal" style={{ backgroundImage: "url('https://picsum.photos/seed/mobile-app/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/60"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2 font-display tracking-tight">APP套壳</h4>
                <p className="text-sm text-slate-300">快速构建跨平台应用外壳</p>
              </div>
              <Link to="/app-shell" className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block">
                立即使用
              </Link>
            </div>
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between border-border-dark">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal" style={{ backgroundImage: "url('https://picsum.photos/seed/content-publish/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/60"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2 font-display tracking-tight">内容发布</h4>
                <p className="text-sm text-slate-300">多渠道矩阵自动化分发</p>
              </div>
              <Link to="/content-publish" className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block">
                立即使用
              </Link>
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
              <h2 className="text-2xl font-bold text-white">选择预设模板</h2>
              <button onClick={() => setIsTemplatesModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-8">
              
              {/* APP推广 */}
              {(activeAgent === 'app' || activeAgent === 'vibe') && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">app_shortcut</span>
                    APP推广模板
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appTemplates.map((template, idx) => (
                      <div 
                        key={idx} 
                        className="group cursor-pointer" 
                        onClick={() => {
                          setActiveAgent('app');
                          setPromptText(template.prompt);
                          setSelectedImageUrls([template.img]);
                          setSelectedFiles([]);
                          setIsTemplatesModalOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <div className="rounded-xl overflow-hidden mb-3 border border-white/5 group-hover:border-primary/50 transition-colors aspect-[3/2] relative">
                          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                            <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">使用此模板</span>
                          </div>
                          <img src={template.img} alt={template.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                        </div>
                        <h3 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{template.title}</h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{template.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 营销推广 */}
              {(activeAgent === 'marketing' || activeAgent === 'vibe') && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent-pink">campaign</span>
                    营销推广模板
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketingTemplates.map((template, idx) => (
                      <div 
                        key={idx} 
                        className="group cursor-pointer" 
                        onClick={() => {
                          setActiveAgent('marketing');
                          setPromptText(template.prompt);
                          setSelectedImageUrls([template.img]);
                          setSelectedFiles([]);
                          setIsTemplatesModalOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <div className="rounded-xl overflow-hidden mb-3 border border-white/5 group-hover:border-accent-pink/50 transition-colors aspect-[3/2] relative">
                          <div className="absolute inset-0 bg-accent-pink/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                            <span className="bg-accent-pink text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">使用此模板</span>
                          </div>
                          <img src={template.img} alt={template.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                        </div>
                        <h3 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{template.title}</h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{template.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
