import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plus, Palette, ArrowUp, X, Wand2, Image as ImageIcon, Music, Type, Video, Brush, PaintBucket, Maximize, Tag, ImagePlus, List, Users, UploadCloud, Megaphone, Square, Camera, Layout, Sparkles, RefreshCw, ArrowRight, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const navigate = useNavigate();
  const [activeAI, setActiveAI] = useState<'app' | 'marketing'>('app');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImageUrls, setSelectedImageUrls] = useState<string[]>([]);
  const [promptText, setPromptText] = useState('');
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [vibeVideoUrl, setVibeVideoUrl] = useState<string | null>(null);
  const [vibeMode, setVibeMode] = useState<'video' | 'image'>('video');
  const [vibePrompt, setVibePrompt] = useState('');
  
  // New state for generation/analysis
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any[] | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<{ resultUrl?: string; logs?: string[] } | null>(null);

  const handleAnalyze = async () => {
    console.log("handleAnalyze called, vibeVideoUrl:", vibeVideoUrl);
    if (!vibeVideoUrl) {
      setAnalysisError("请提供参考视频或图片");
      console.log("handleAnalyze: no vibeVideoUrl");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError(null);

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult([
        { timeRange: '00:00-00:05', visualDescription: '开场特写', cameraMovement: '缓慢推进', animationEffects: '淡入', aiGenerationPrompt: '电影级光影，特写镜头，缓慢推进...' }
      ]);
      setVibePrompt('【视频风格】赛博朋克/电影感\n【转场效果】平滑缩放/淡入淡出\n【画面描述】...');
      console.log("handleAnalyze: analysis complete");
    }, 2000);
  };

  const handleGenerate = async () => {
    console.log("handleGenerate called, vibeVideoUrl:", vibeVideoUrl);
    if (!vibeVideoUrl) {
      alert("请提供参考素材");
      console.log("handleGenerate: no vibeVideoUrl");
      return;
    }

    navigate('/dashboard/agent');
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get('scroll');
    if (scrollTarget === 'atomic-lab') {
      const element = document.getElementById('atomic-lab');
      if (element) {
        // Delay slightly to ensure content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    console.log("vibeVideoUrl changed:", vibeVideoUrl);
  }, [vibeVideoUrl]);

  const handleVibeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setVibeVideoUrl(URL.createObjectURL(file));
      if (file.type.startsWith('image/')) {
        setVibeMode('image');
      } else {
        setVibeMode('video');
      }
    }
  };

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

  const baseVideos = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
  ];

  const masonryPatternAppGrowth = [
    "aspect-[3/4]",
    "aspect-[16/9]",
    "aspect-[9/16]",
    "aspect-[4/3]",
    "aspect-[4/3]",
    "aspect-[9/16]",
    "aspect-[16/9]",
    "aspect-[3/4]",
    "aspect-[16/9]",
    "aspect-[3/4]",
    "aspect-[4/3]",
    "aspect-[9/16]",
    "aspect-[9/16]",
    "aspect-[4/3]",
    "aspect-[3/4]",
    "aspect-[16/9]",
  ];

  const masonryPatternEcommerce = [
    "aspect-[9/16]",
    "aspect-[4/3]",
    "aspect-[3/4]",
    "aspect-[16/9]",
    "aspect-[16/9]",
    "aspect-[3/4]",
    "aspect-[9/16]",
    "aspect-[4/3]",
    "aspect-[3/4]",
    "aspect-[16/9]",
    "aspect-[4/3]",
    "aspect-[9/16]",
    "aspect-[4/3]",
    "aspect-[9/16]",
    "aspect-[16/9]",
    "aspect-[3/4]",
  ];

  // Generate unique-looking videos and images for App Growth
  const appGrowthItems = Array.from({ length: 21 }).map((_, i) => {
    const isVideo = i % 3 !== 0; // 2/3 videos, 1/3 images
    const aspectClass = masonryPatternAppGrowth[i % masonryPatternAppGrowth.length];
    
    let width = 600;
    let height = 600;
    if (aspectClass === 'aspect-[16/9]') { width = 800; height = 450; }
    else if (aspectClass === 'aspect-[9/16]') { width = 450; height = 800; }
    else if (aspectClass === 'aspect-[4/3]') { width = 800; height = 600; }
    else if (aspectClass === 'aspect-[3/4]') { width = 600; height = 800; }

    return {
      type: isVideo ? 'video' : 'image',
      url: isVideo 
        ? `${baseVideos[i % baseVideos.length]}#t=${(i * 3) % 40}`
        : `https://picsum.photos/seed/appgrowth${i}/${width}/${height}`,
      aspectRatioClass: aspectClass
    };
  });

  // Generate unique-looking videos and images for Ecommerce
  const ecommerceItems = Array.from({ length: 21 }).map((_, i) => {
    const isVideo = i % 4 !== 0; // 3/4 videos, 1/4 images
    const aspectClass = masonryPatternEcommerce[i % masonryPatternEcommerce.length];
    
    let width = 600;
    let height = 600;
    if (aspectClass === 'aspect-[16/9]') { width = 800; height = 450; }
    else if (aspectClass === 'aspect-[9/16]') { width = 450; height = 800; }
    else if (aspectClass === 'aspect-[4/3]') { width = 800; height = 600; }
    else if (aspectClass === 'aspect-[3/4]') { width = 600; height = 800; }

    return {
      type: isVideo ? 'video' : 'image',
      url: isVideo 
        ? `${baseVideos[(i + 5) % baseVideos.length]}#t=${(i * 7) % 40}`
        : `https://picsum.photos/seed/ecommerce${i}/${width}/${height}`,
      aspectRatioClass: aspectClass
    };
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-background-dark text-slate-100 antialiased min-h-screen"
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
            <h2 className="text-xl font-bold tracking-tight">Agents Me</h2>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-white transition-colors text-white" to="/">首页</Link>
            <Link className="text-sm font-medium text-slate-400 hover:text-white transition-colors" to="/dashboard">工作台</Link>
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
      <main className="hero-gradient min-h-[80vh] flex flex-col lg:flex-row items-start justify-between px-6 lg:px-20 pt-16 pb-24 gap-12">
        <style>{`
          @keyframes scan-line {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-scan-line {
            animation: scan-line 3s linear infinite;
          }
        `}</style>
        
        {/* Left Column: Text & Vibe Coding Mockup */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-12">
          {/* Text Content */}
          <div className="flex flex-col items-start space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
              Agents Me
            </h1>
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              基于 Vibe Coding 模式，构建高效的 AI A-B-C体系。重新定义商业需求与开发者的共生逻辑。
            </p>
            <div className="pt-2 flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent-blue rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
                <button 
                  onClick={() => document.getElementById('atomic-lab')?.scrollIntoView({ behavior: 'smooth' })}
                  className="relative bg-surface-card border border-white/10 hover:border-primary/50 text-white px-8 py-3 rounded-lg text-sm font-bold flex items-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-lg"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary animate-pulse">explore</span>
                  开启探索
                  <span className="material-symbols-outlined text-[14px] opacity-50 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 ml-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                4项核心能力已上线
              </div>
            </div>
          </div>

          {/* Vibe Coding Mockup */}
          <div className="relative group/editor w-full max-w-2xl">
            {/* Glowing background effect for emphasis */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-accent-blue/40 to-accent-pink/40 rounded-2xl blur-xl opacity-60 group-hover/editor:opacity-100 transition duration-1000 animate-pulse-slow"></div>
            
            <div className="relative bg-[#0f0f11]/90 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.2)] flex flex-col transition-all">
              
              {/* Editor Bottom Layer Visual Effects Removed as requested */}

              {/* AI Tabs */}
              <div className="relative z-10 flex items-center gap-6 px-6 pt-4 border-b border-white/10 shrink-0 bg-white/[0.02]">
                <button 
                  onClick={() => setActiveAI('app')}
                  className={`pb-3 text-sm font-medium transition-colors relative ${activeAI === 'app' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  APP AI 助手
                  {activeAI === 'app' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.5)]"></div>}
                </button>
                <button 
                  onClick={() => setActiveAI('marketing')}
                  className={`pb-3 text-sm font-medium transition-colors relative ${activeAI === 'marketing' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  营销 AI 助手
                  {activeAI === 'marketing' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-pink rounded-t-full shadow-[0_-2px_10px_rgba(14,165,233,0.5)]"></div>}
                </button>
              </div>

              <div className="relative z-10 p-6 flex flex-col gap-4 bg-gradient-to-b from-transparent to-white/[0.02]">
                <textarea 
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-lg text-slate-300 resize-none placeholder-slate-600 leading-relaxed min-h-[120px]"
                  placeholder={activeAI === 'app' ? "请你根据我上传的素材，帮我只做一个顶级的app营销素材，我的app名字叫傻妞，是一个ai助手，可以实现顶级的情感陪伴，每日日报生成..." : "请帮我完成选品，素材生成，和小红书的自动发布..."}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                ></textarea>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
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
                    
                    {/* Add More Button */}
                    {(selectedFiles.length + selectedImageUrls.length) < 5 && (
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative group overflow-hidden shadow-lg"
                        title="上传素材 (最多5张)"
                      >
                        <Plus size={20} />
                      </button>
                    )}
                    
                    {/* Templates Button */}
                    <button 
                      onClick={() => setIsTemplatesModalOpen(true)}
                      className="h-10 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 text-slate-300 hover:text-white transition-colors shadow-lg"
                    >
                      <Leaf size={16} className="text-emerald-400" />
                      <span className="text-sm font-medium">灵感库</span>
                    </button>

                    {/* Display Template Images */}
                    {selectedImageUrls.map((url, index) => (
                      <div key={`template-${index}`} className="relative group w-10 h-10 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                        <img src={url} alt={`Template ${index}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeFile(index, true); }}
                            className="text-white hover:text-rose-400"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Display Uploaded Files */}
                    {selectedFiles.map((file, index) => (
                      <div key={`file-${index}`} className="relative group w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center shadow-lg">
                        {file.type.startsWith('image/') ? (
                          <img src={URL.createObjectURL(file)} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="material-symbols-outlined text-lg text-emerald-400">check</span>
                        )}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeFile(index, false); }}
                            className="text-white hover:text-rose-400"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Submit Button */}
                  <button onClick={() => navigate('/dashboard/agent')} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shadow-lg hover:-translate-y-0.5 transform">
                    <ArrowUp size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Video Preview */}
        <div className="w-full lg:w-1/2 relative group/preview mt-8 lg:mt-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent-blue/30 to-accent-pink/30 rounded-3xl blur-xl opacity-50 group-hover/preview:opacity-80 transition duration-1000"></div>
          
          <div className="relative w-full aspect-video bg-[#0a0a0c] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
            {vibeMode === 'video' ? (
              <video 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                autoPlay 
                loop 
                muted 
                playsInline
                src={vibeVideoUrl || baseVideos[0]} 
              />
            ) : (
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                src={vibeVideoUrl || 'https://picsum.photos/seed/vibe/1200/800'} 
                alt="Vibe Preview"
                referrerPolicy="no-referrer"
              />
            )}
            
            {/* Overlay Controls - Bottom */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-slate-300 font-mono tracking-widest uppercase z-20">
              <span className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                LIVE PREVIEW
              </span>
              <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span>02:45</span>
              </div>
            </div>
          </div>
        </div>
      </main>




      {/* What You Can Do Section */}
      <section id="what-you-can-do" className="px-6 lg:px-20 py-32 bg-background-dark relative overflow-clip">
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
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start relative">
              {/* Sticky Text Content */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-8 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-2xl p-8 lg:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                {/* Decorative glowing orbs */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors duration-700 pointer-events-none"></div>
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent-blue/10 rounded-full blur-[80px] group-hover:bg-accent-blue/20 transition-colors duration-700 pointer-events-none"></div>
                
                <div className="space-y-6 relative z-10">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 border border-primary/20 rounded-full inline-block">Core Focus</span>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white">APP 增长/打爆</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    基于多 AI 协同的精准获客方案。支持 APP 套壳包装、视频克隆等核心能力，通过 AI 驱动的创意生成与投放优化，实现低成本规模化增长。
                  </p>
                </div>
              </div>
              
              {/* Masonry Grid */}
              <div className="w-full lg:w-2/3 relative">
                <div className="columns-2 md:columns-3 gap-4 md:gap-6 pb-12">
                  {appGrowthItems.map((item, i) => (
                    <div key={i} className={`mb-4 md:mb-6 w-full rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl relative group/vid cursor-pointer break-inside-avoid ${item.aspectRatioClass}`}>
                      {item.type === 'video' ? (
                        <video 
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/vid:opacity-70 transition-opacity duration-300"
                          autoPlay loop muted playsInline preload="auto"
                          src={item.url} 
                        />
                      ) : (
                        <img 
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/vid:opacity-70 transition-opacity duration-300"
                          src={item.url} 
                          alt="App Growth"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      {/* Magic Wand Icons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover/vid:opacity-100 transition-all duration-300 z-20 bg-black/40 backdrop-blur-sm">
                        <button 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            if (item.type === 'video') {
                              navigate('/dashboard/app/video', { state: { sourceUrl: item.url } });
                            } else {
                              navigate('/dashboard/app/shell', { state: { sourceUrl: item.url } });
                            }
                          }}
                          className="size-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-primary hover:border-primary hover:scale-110 transition-all shadow-lg flex items-center justify-center group/btn relative"
                        >
                          {item.type === 'video' ? <Wand2 size={18} /> : <ImageIcon size={18} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bottom Fade to hide uneven masonry bottoms */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background-dark to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Ecommerce Section */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-start relative">
              {/* Sticky Text Content */}
              <div className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-8 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-2xl p-8 lg:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                {/* Decorative glowing orbs */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent-pink/20 rounded-full blur-[80px] group-hover:bg-accent-pink/30 transition-colors duration-700 pointer-events-none"></div>
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-colors duration-700 pointer-events-none"></div>
                
                <div className="space-y-6 relative z-10">
                  <span className="text-xs font-bold text-accent-pink uppercase tracking-widest px-3 py-1 bg-accent-pink/10 border border-accent-pink/20 rounded-full inline-block">Vertical Solution</span>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white">电商营销</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    支持复刻带货视频、电商视频克隆及商品营销素材生成。基于 AI 矩阵的智能驱动，提升转化率，构建全链路营销闭环。
                  </p>
                </div>
              </div>
              
              {/* Masonry Grid */}
              <div className="w-full lg:w-2/3 relative">
                <div className="columns-2 md:columns-3 gap-4 md:gap-6 pb-12">
                  {ecommerceItems.map((item, i) => (
                    <div key={i} className={`mb-4 md:mb-6 w-full rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl relative group/vid cursor-pointer break-inside-avoid ${item.aspectRatioClass}`}>
                      {item.type === 'video' ? (
                        <video 
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/vid:opacity-70 transition-opacity duration-300"
                          autoPlay loop muted playsInline preload="auto"
                          src={item.url} 
                        />
                      ) : (
                        <img 
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/vid:opacity-70 transition-opacity duration-300"
                          src={item.url} 
                          alt="Ecommerce"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      {/* Magic Wand Buttons */}
                      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover/vid:opacity-100 transition-all duration-300 z-20 bg-black/40 backdrop-blur-sm">
                        <button 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            if (item.type === 'video') {
                              navigate('/dashboard/ecommerce/video', { state: { sourceUrl: item.url } });
                            } else {
                              navigate('/dashboard/ecommerce/material', { state: { sourceUrl: item.url } });
                            }
                          }}
                          className="size-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-accent-pink hover:border-accent-pink hover:scale-110 transition-all shadow-lg flex items-center justify-center group/btn relative"
                        >
                          {item.type === 'video' ? <Wand2 size={18} /> : <ImageIcon size={18} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bottom Fade to hide uneven masonry bottoms */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background-dark to-transparent pointer-events-none"></div>
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
              <p className="text-slate-400 text-lg">最小化功能单元，快速拼装您的专属 AI 助手</p>
            </div>
            <a className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" href="#">
              查看全部实验 <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Lab Cards */}
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between border-border-dark">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-all duration-700" style={{ backgroundImage: "url('https://picsum.photos/seed/video-clone/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/60"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2 font-display tracking-tight text-center">视频克隆</h4>
                <p className="text-sm text-slate-300 text-center">AI驱动的爆款视频生成</p>
              </div>
              <Link to="/video-clone" className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block">
                立即使用
              </Link>
            </div>
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between border-border-dark">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-all duration-700" style={{ backgroundImage: "url('https://picsum.photos/seed/ecommerce-video/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/10 via-transparent to-black/60"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2 font-display tracking-tight text-center">电商带货视频克隆</h4>
                <p className="text-sm text-slate-300 text-center">专属电商场景的带货视频</p>
              </div>
              <Link to="/ecommerce-video-clone" className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block">
                立即使用
              </Link>
            </div>
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between border-border-dark">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-all duration-700" style={{ backgroundImage: "url('https://picsum.photos/seed/product-design/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/60"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2 font-display tracking-tight text-center">商品素材</h4>
                <p className="text-sm text-slate-300 text-center">一键生成高质量电商视觉</p>
              </div>
              <Link to="/product-material" className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block">
                立即使用
              </Link>
            </div>
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass-card p-8 flex flex-col justify-between border-border-dark">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-110 transition-all duration-700" style={{ backgroundImage: "url('https://picsum.photos/seed/mobile-app/600/800')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/60"></div>
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-2 font-display tracking-tight text-center">APP套壳</h4>
                <p className="text-sm text-slate-300 text-center">快速构建跨平台应用套壳</p>
              </div>
              <Link to="/app-shell" className="relative z-10 w-full btn-secondary py-3 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 text-center block">
                立即使用
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular AI Market Section */}
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
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white">热门 AI 助手市场</h2>
            </div>
            <Link className="px-6 py-3 rounded-full border border-white/10 hover:border-primary/50 text-white text-sm font-semibold flex items-center gap-2 transition-all group/link bg-white/5 hover:bg-white/10" to="/market">
              探索完整市场 <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {/* AI 助手 Item 1 */}
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

            {/* AI 助手 Item 2 */}
            <div className="group relative bg-surface-card rounded-2xl border border-white/5 hover:border-accent-pink/30 transition-all duration-500 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-pink/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-pink scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
              
              <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1">
                  <div className="text-5xl md:text-6xl font-black italic font-display text-white/5 group-hover:text-accent-pink/20 transition-colors duration-500 w-16 text-center">
                    2
                  </div>
                  <div className="size-14 rounded-2xl bg-accent-pink/20 border border-accent-pink/30 flex items-center justify-center text-accent-pink shrink-0 shadow-[0_0_15px_rgba(244,114,182,0.2)] group-hover:scale-110 transition-transform duration-500">
                    <span className="material-symbols-outlined text-3xl">smart_toy</span>
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

            {/* AI 助手 Item 3 */}
            <div onClick={() => navigate('/dashboard/agent')} className="group relative bg-surface-card rounded-2xl border border-white/5 hover:border-green-400/30 transition-all duration-500 overflow-hidden cursor-pointer">
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
              {(activeAI === 'app' || activeAI === 'vibe') && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">app_shortcut</span>
                    APP 灵感模板
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appTemplates.map((template, idx) => (
                      <div 
                        key={idx} 
                        className="group cursor-pointer" 
                        onClick={() => {
                          setVibeMode('video');
                          setVibeVideoUrl(template.img);
                          setVibePrompt(template.prompt);
                          setIsTemplatesModalOpen(false);
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
              {(activeAI === 'marketing' || activeAI === 'vibe') && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent-pink">campaign</span>
                    营销灵感模板
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketingTemplates.map((template, idx) => (
                      <div 
                        key={idx} 
                        className="group cursor-pointer" 
                        onClick={() => {
                          setActiveAI('marketing');
                          setPromptText(template.prompt);
                          setSelectedImageUrls([template.img]);
                          setSelectedFiles([]);
                          setIsTemplatesModalOpen(false);
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
      {/* Vibe Coding Floating Panel */}
      {vibeVideoUrl && (
        <div className="fixed right-6 bottom-6 w-[360px] max-h-[85vh] z-[110] bg-[#1a1a1c]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/20 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              <h3 className="text-sm font-bold text-white">开启创作</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-black/40 p-0.5 rounded-md border border-white/10">
                <button
                  onClick={() => setVibeMode('video')}
                  className={`px-2 py-1 text-[10px] font-medium rounded transition-colors ${vibeMode === 'video' ? 'bg-white/20 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  视频
                </button>
                <button
                  onClick={() => setVibeMode('image')}
                  className={`px-2 py-1 text-[10px] font-medium rounded transition-colors ${vibeMode === 'image' ? 'bg-white/20 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  图片
                </button>
              </div>
              <button 
                onClick={() => {
                  setVibeVideoUrl(null);
                  setVibePrompt('');
                }} 
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 custom-scrollbar">
            
            {/* Generated Result */}
            <div className="space-y-2 shrink-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium text-slate-300">当前生成结果</h4>
                {isGenerating && <span className="text-[10px] text-primary animate-pulse">生成中...</span>}
              </div>
              <div className="aspect-video rounded-lg overflow-hidden bg-black border border-white/10 relative shadow-inner">
                {isGenerating ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-2">
                    <Wand2 size={20} className="text-primary animate-spin" />
                    <span className="text-[10px] text-primary">AI 正在施展魔法...</span>
                  </div>
                ) : resultData ? (
                  <>
                    <video src="https://www.w3schools.com/html/mov_bbb.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="text-[10px] text-slate-500">等待生成...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Reference Sources */}
            <div className="space-y-2 shrink-0">
              <h4 className="text-xs font-medium text-slate-300">参考源</h4>
              <div className="grid grid-cols-2 gap-3">
                {/* Source Video */}
                <div className="space-y-1">
                  <div className="aspect-video rounded-md overflow-hidden bg-black/60 border border-white/10 relative group flex items-center justify-center">
                    {vibeMode === 'video' ? (
                      <video src={vibeVideoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" muted playsInline />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                        <UploadCloud size={16} className="mb-1" />
                        <span className="text-[10px]">添加视频</span>
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      {vibeMode === 'video' && <span className="text-[10px] text-white bg-black/60 px-2 py-1 rounded border border-white/20"><UploadCloud size={12} className="inline mr-1"/>替换</span>}
                      <input type="file" accept="video/*" className="hidden" onChange={handleVibeFileChange} />
                    </label>
                  </div>
                  <div className="text-[10px] text-slate-500 text-center">源视频</div>
                </div>
                {/* Source Image */}
                <div className="space-y-1">
                  <div className="aspect-video rounded-md overflow-hidden bg-black/60 border border-white/10 relative group flex items-center justify-center">
                    {vibeMode === 'image' ? (
                      <img src={vibeVideoUrl || "https://picsum.photos/seed/source-img/400/225"} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" alt="Source Image" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                        <UploadCloud size={16} className="mb-1" />
                        <span className="text-[10px]">添加图片(可多张)</span>
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                      {vibeMode === 'image' && <span className="text-[10px] text-white bg-black/60 px-2 py-1 rounded border border-white/20"><UploadCloud size={12} className="inline mr-1"/>替换</span>}
                      <input type="file" accept="image/*" className="hidden" onChange={handleVibeFileChange} multiple={vibeMode === 'video'} />
                    </label>
                  </div>
                  <div className="text-[10px] text-slate-500 text-center">源图片</div>
                </div>
              </div>
            </div>

            {/* Prompt */}
            <div className="flex-1 flex flex-col space-y-2 min-h-[160px]">
              <h4 className="text-xs font-medium text-slate-300">提示词 (Prompt)</h4>
              <div className="relative flex-1 flex flex-col">
                <textarea 
                  value={vibePrompt}
                  onChange={(e) => setVibePrompt(e.target.value)}
                  placeholder={vibeMode === 'video' ? "例如：把视频色调改成赛博朋克风，并加上动感的电子音乐..." : "例如：极简风桌面收纳盒，纯实木材质，磁吸模块化设计..."}
                  className="flex-1 w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 resize-none shadow-inner"
                />
                <button 
                  onClick={handleAnalyze}
                  className={`absolute bottom-2 right-2 px-2 py-1 rounded flex items-center gap-1 transition-all text-[10px] font-medium ${
                    isAnalyzing ? 'bg-primary/50 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {isAnalyzing ? <Wand2 size={10} className="animate-spin" /> : <Wand2 size={10} />}
                  AI 解析
                </button>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-3 border-t border-white/10 bg-black/20 shrink-0 flex gap-2">
            {vibeMode === 'video' ? (
              <>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !vibePrompt.trim()}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    vibePrompt.trim() && !isGenerating
                      ? 'bg-white/10 text-white hover:bg-white/20' 
                      : 'bg-white/5 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Wand2 size={14} />
                  视频编辑
                </button>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !vibePrompt.trim()}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    vibePrompt.trim() && !isGenerating
                      ? 'bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-primary-hover' 
                      : 'bg-white/5 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Sparkles size={14} />
                  视频继续创作
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !vibePrompt.trim()}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    vibePrompt.trim() && !isGenerating
                      ? 'bg-white/10 text-white hover:bg-white/20' 
                      : 'bg-white/5 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <ImageIcon size={14} />
                  图片编辑
                </button>
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !vibePrompt.trim()}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    vibePrompt.trim() && !isGenerating
                      ? 'bg-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-primary-hover' 
                      : 'bg-white/5 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Video size={14} />
                  作为图片源创作视频
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </motion.div>
  );
}
