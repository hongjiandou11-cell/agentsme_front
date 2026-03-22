import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Video, Image as ImageIcon, Plus, 
  MonitorPlay, X, Wand2, UploadCloud, MessageSquare, Settings, Play, Save,
  Send, CheckCircle2, CircleDashed, AlertCircle, Eye, Copy, Check
} from 'lucide-react';
import { useDashboard } from '../components/DashboardContext';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Handle,
  Position,
  NodeChange,
  EdgeChange,
  Connection,
  Edge,
  Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node Component
const CustomAgentNode = ({ data }: any) => {
  const { title, subtitle, status, statusText, tag, content, width = 320 } = data;
  return (
    <div 
      className={`bg-[#121214] border rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all hover:border-indigo-500/50 ${
        status === 'need_input' ? 'border-amber-500/30' : 
        status === 'completed' ? 'border-emerald-500/30' : 'border-white/10'
      }`}
      style={{ width }}
    >
      <Handle type="target" position={Position.Left} className="w-2 h-2 !bg-zinc-500 !border-none" />
      
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 shrink-0 ${status === 'completed' ? 'text-emerald-500' : status === 'need_input' ? 'text-amber-500' : 'text-blue-500'}`}>
            {status === 'completed' ? <CheckCircle2 size={16} /> : status === 'need_input' ? <AlertCircle size={16} /> : <CircleDashed size={16} />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
            <p className="text-[10px] text-zinc-500 font-mono">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
            status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 
            status === 'need_input' ? 'bg-amber-500/10 text-amber-400' : 
            'bg-blue-500/10 text-blue-400'
          }`}>
            {statusText}
          </span>
          {tag && (
            <span className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 text-[9px] font-bold uppercase tracking-wider">
              {tag}
            </span>
          )}
        </div>
      </div>
      
      {/* Body */}
      <div className="p-4 flex-1">
        {content}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">In ✓</span>
          <span className="text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">Out ✓</span>
          <span className="text-[10px] text-zinc-500 font-mono">agent_output</span>
        </div>
        <button className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
          <Eye size={12} />
          查看详情
        </button>
      </div>

      <Handle type="source" position={Position.Right} className="w-2 h-2 !bg-zinc-500 !border-none" />
    </div>
  );
};

const nodeTypes = {
  agentNode: CustomAgentNode,
};

// Default nodes and edges for the "no project selected" view
const defaultNodes: Node[] = [
  {
    id: '1',
    type: 'agentNode',
    position: { x: 60, y: 60 },
    data: {
      title: "app-screenshot-render",
      subtitle: "app-promo-designer.app-screenshot-render",
      status: "need_input",
      statusText: "NEED INPUT",
      tag: "TASK_STATUS",
      content: (
        <div className="bg-black/40 border border-white/5 rounded-lg p-3">
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
            <MonitorPlay size={12} /> app_name: 抖音
          </div>
        </div>
      )
    }
  },
  {
    id: '2',
    type: 'agentNode',
    position: { x: 420, y: 60 },
    data: {
      title: "风格分析",
      subtitle: "visual-creator.image-style-analysis",
      status: "completed",
      statusText: "DONE",
      tag: "IMAGE_ANALYSIS",
      content: (
        <div className="text-xs text-zinc-300 leading-relaxed">
          <div className="flex items-center gap-1.5 text-zinc-500 mb-2"><Check size={12}/> 已完成动作</div>
          style: 现代都市、活力温馨、沉浸式娱乐。整体风格融合了简洁的应用界面设计和充满生活气息的真人直播内容，营造出亲切、互动的线上社交与娱乐氛围。
        </div>
      )
    }
  },
  {
    id: '3',
    type: 'agentNode',
    position: { x: 60, y: 300 },
    data: {
      title: "文案改写",
      subtitle: "copywriter-pro.copy-rewrite",
      status: "completed",
      statusText: "DONE",
      tag: "COPY",
      content: (
        <div className="text-xs text-zinc-300 leading-relaxed">
          <div className="flex items-center gap-1.5 text-zinc-500 mb-2"><Check size={12}/> 已完成动作</div>
          请基于以下视觉分析结果，撰写一份结构化的《App 核心卖点分析报告》：- 视觉风格：现代都市、活力温馨、沉浸式娱乐，暖色调。- 核心文案：“精彩直...
          <br/><br/>
          根据您的需求，我为您提供几个不同侧重点的口语化版本：
        </div>
      )
    }
  },
  {
    id: '4',
    type: 'agentNode',
    position: { x: 420, y: 300 },
    data: {
      title: "xhs-topic-generator",
      subtitle: "red-content-strategist.xhs-topic-generator",
      status: "completed",
      statusText: "DONE",
      tag: "XHS_TOPIC_PLAN",
      content: (
        <div className="text-xs text-zinc-300 leading-relaxed">
          <div className="flex items-center gap-1.5 text-zinc-500 mb-2"><Check size={12}/> 已完成动作</div>
          product: 沉浸式直播 App（精彩直播）
        </div>
      )
    }
  },
  {
    id: '5',
    type: 'agentNode',
    position: { x: 780, y: 300 },
    data: {
      title: "app-screenshot-render",
      subtitle: "app-promo-designer.app-screenshot-render",
      status: "completed",
      statusText: "DONE",
      tag: "APP_PROMO_GALLERY",
      width: 380,
      content: (
        <>
          <div className="text-xs text-zinc-300 leading-relaxed mb-4">
            <div className="flex items-center gap-1.5 text-zinc-500 mb-2"><Check size={12}/> 已完成动作</div>
            app_name: 精彩直播
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[1,2,3,4,5].map(i => (
              <img key={i} src={`https://picsum.photos/seed/app${i}/120/260`} className="w-full rounded border border-white/10" alt={`Slide ${i}`} referrerPolicy="no-referrer" />
            ))}
          </div>
        </>
      )
    }
  },
  {
    id: '6',
    type: 'agentNode',
    position: { x: 60, y: 600 },
    data: {
      title: "视频动效克隆",
      subtitle: "remotion-clone-agent.remotion-clone-run",
      status: "completed",
      statusText: "DONE",
      tag: "VIDEO_PREVIEW",
      content: (
        <div className="text-xs text-zinc-300 leading-relaxed">
          <div className="flex items-center gap-1.5 text-zinc-500 mb-2"><Check size={12}/> 已完成动作</div>
          product_name: 精彩直播
        </div>
      )
    }
  },
  {
    id: '7',
    type: 'agentNode',
    position: { x: 420, y: 600 },
    data: {
      title: "GEO全流程",
      subtitle: "geo-optimizer.geo-full-pipeline",
      status: "completed",
      statusText: "DONE",
      tag: "COPY",
      content: (
        <div className="text-xs text-zinc-300 leading-relaxed">
          <div className="flex items-center gap-1.5 text-zinc-500 mb-2"><Check size={12}/> 已完成动作</div>
          精彩直播是一款沉浸式直播间搭建与内容工具，主打现代都市活力风格。通过 AI 技术帮助新手主播 0 成本打造高质感直播间，解决留人难痛点，提升互动...
          <br/><br/>
          <span className="text-indigo-400"># GEO 全流程优化报告 — 精彩直播</span>
        </div>
      )
    }
  },
  {
    id: '8',
    type: 'agentNode',
    position: { x: 780, y: 600 },
    data: {
      title: "自动发布笔记",
      subtitle: "xhs-auto-note-agent.xhs-note-auto-create",
      status: "completed",
      statusText: "DONE",
      tag: "BUNDLE",
      content: (
        <>
          <div className="text-xs text-zinc-300 leading-relaxed">
            <div className="flex items-center gap-1.5 text-zinc-500 mb-2"><Check size={12}/> 已完成动作</div>
            0成本开播！3步打造高质感沉浸式直播间💅
          </div>
          <div className="mt-4 bg-black/40 rounded-lg border border-white/5 h-24 flex items-end justify-end p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-zinc-300 relative z-10 backdrop-blur-sm">3</span>
          </div>
        </>
      )
    }
  }
];

const defaultEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
  { id: 'e1-5', source: '1', target: '5', animated: true, style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
  { id: 'e2-5', source: '2', target: '5', animated: true, style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
  { id: 'e2-8', source: '2', target: '8', animated: true, style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
];

const blankNodes: Node[] = [
  {
    id: 'start',
    type: 'agentNode',
    position: { x: 250, y: 250 },
    data: {
      title: "等待指令",
      subtitle: "system.awaiting_input",
      status: "need_input",
      statusText: "READY",
      tag: "SYSTEM",
      content: (
        <div className="text-xs text-zinc-300 leading-relaxed">
          <div className="flex items-center gap-1.5 text-amber-400 mb-2"><AlertCircle size={12}/> 请在左侧输入您的目标</div>
          Agent 已就绪，等待分配任务...
        </div>
      )
    }
  }
];

const blankEdges: Edge[] = [];

export default function Agent() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject, addProject } = useDashboard();
  const [prompt, setPrompt] = useState('');

  const project = projectId ? projects.find(p => p.id === projectId) : null;
  const isDefaultView = !project;
  const isDemoProject = project?.id === 'proj-1' || isDefaultView;
  
  const title = project ? project.title : 'Agent 工作流';
  const progress = project ? project.agentState.progress : 0;

  // React Flow state
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Sync with project state
  useEffect(() => {
    if (isDefaultView) {
      setNodes(blankNodes);
      setEdges(blankEdges);
    } else if (project) {
      if (project.id === 'proj-1' && project.agentState.nodes.length <= 8) {
        setNodes(defaultNodes);
        setEdges(defaultEdges);
      } else if (project.agentState.nodes.length === 0) {
        setNodes(blankNodes);
        setEdges(blankEdges);
      } else {
        // Map project nodes to React Flow nodes
        const projectNodes: Node[] = project.agentState.nodes.map((n, i) => ({
          id: n.id,
          type: 'agentNode',
          position: n.position || { x: 60 + (i % 3) * 360, y: 60 + Math.floor(i / 3) * 240 },
          data: {
            title: n.label,
            subtitle: `agent.task.${n.type}`,
            status: n.status,
            statusText: n.status.toUpperCase(),
            tag: "TASK",
            content: (
              <div className="text-xs text-zinc-300 leading-relaxed">
                {n.status === 'completed' && <div className="flex items-center gap-1.5 text-zinc-500 mb-2"><Check size={12}/> 已完成动作</div>}
                {n.status === 'running' && <div className="flex items-center gap-1.5 text-blue-400 mb-2"><CircleDashed size={12} className="animate-spin"/> 正在执行...</div>}
                {n.status === 'need_input' && <div className="flex items-center gap-1.5 text-amber-400 mb-2"><AlertCircle size={12}/> 等待输入...</div>}
                {n.status === 'pending' && <div className="flex items-center gap-1.5 text-zinc-500 mb-2">等待前置任务完成</div>}
              </div>
            )
          }
        }));

        const projectEdges: Edge[] = project.agentState.edges.map(e => ({
          id: e.id,
          source: e.source,
          target: e.target,
          animated: true,
          style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }
        }));

        setNodes(projectNodes);
        setEdges(projectEdges);
      }
    }
  }, [projectId, project?.agentState.nodes, project?.agentState.edges]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } } as Edge, eds)),
    []
  );

  const handleSave = () => {
    if (project) {
      // Map React Flow nodes back to project nodes to save positions
      const updatedNodes = project.agentState.nodes.map(pn => {
        const rfNode = nodes.find(n => n.id === pn.id);
        return rfNode ? { ...pn, position: rfNode.position } : pn;
      });
      
      const updatedEdges = edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target
      }));

      updateProject(project.id, {
        agentState: {
          ...project.agentState,
          nodes: updatedNodes,
          edges: updatedEdges
        }
      });
      alert('保存成功！');
    }
  };

  const handleAddNode = () => {
    if (!project) return;
    
    const newNodeId = `node-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: 'process',
      label: '新任务节点',
      status: 'pending' as const,
      position: { x: 100, y: 100 }
    };

    updateProject(project.id, {
      agentState: {
        ...project.agentState,
        nodes: [...project.agentState.nodes, newNode]
      }
    });
  };

  const handleSend = () => {
    if (!prompt.trim()) return;
    
    if (isDefaultView) {
      // Create new project
      const newProject = addProject(prompt.substring(0, 20) + (prompt.length > 20 ? '...' : ''));
      navigate(`/dashboard/projects/${newProject.id}`);
    } else {
      // Handle existing project chat
      setPrompt('');
      alert('消息已发送');
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#0f0f11] text-white overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-[#18181b]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Wand2 size={18} />
          </div>
          <h1 className="font-bold text-lg tracking-tight">{title}</h1>
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-zinc-400 ml-2">Beta</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard/agent')}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors flex items-center gap-2 border border-indigo-500/20"
          >
            <Plus size={16} />
            新建项目
          </button>
          {!isDefaultView && (
            <button 
              onClick={handleAddNode}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors flex items-center gap-2 border border-indigo-500/20"
            >
              <Plus size={16} />
              添加节点
            </button>
          )}
          <button className="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2">
            <Settings size={16} />
            设置
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-1.5 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20"
          >
            <Save size={16} />
            保存
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Chat */}
        <div className="w-[400px] border-r border-white/10 bg-[#121214] flex flex-col shrink-0 z-20 shadow-2xl">
          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {isDemoProject && !isDefaultView ? (
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-zinc-300 leading-relaxed">
                  基于您提供的 App 截图，我已为您完成了全套营销素材的制作及多平台推广方案的规划。以下是详细成果：
                </p>
                
                <h3 className="text-white font-bold mt-6 mb-3 text-base">1. 核心卖点分析报告</h3>
                <ul className="space-y-2 text-zinc-400 text-sm list-none pl-0">
                  <li><strong className="text-zinc-200">视觉风格：</strong>现代都市、活力温馨、沉浸式娱乐。采用暖色调与柔和光影，营造亲切互动的社交氛围。</li>
                  <li><strong className="text-zinc-200">核心卖点：</strong></li>
                  <li><strong className="text-zinc-200">0 成本开播：</strong>通过 AI 技术轻松搭建高质感虚拟背景直播间。</li>
                  <li><strong className="text-zinc-200">沉浸式体验：</strong>强调高颜值主播互动与生活化场景共鸣，提升留存率。</li>
                  <li><strong className="text-zinc-200">高情绪价值：</strong>顺应 2026 直播趋势，从“吵闹叫卖”转向感官强化的沉浸式内容。</li>
                </ul>

                <h3 className="text-white font-bold mt-8 mb-3 text-base">2. App Store 营销图 (共 5 张)</h3>
                <p className="text-zinc-400 text-sm mb-4">
                  我为您渲染了一套符合 iPhone 6.9" 规格的彩色主题营销图，您可以直接用于应用商店上架：
                </p>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {[1,2,3,4,5].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/app${i}/120/260`} className="w-full rounded border border-white/10" alt={`Slide ${i}`} referrerPolicy="no-referrer" />
                  ))}
                </div>
                <div className="text-xs text-indigo-400 flex gap-2 flex-wrap">
                  <a href="#" className="hover:underline">查看 Slide 1</a> | 
                  <a href="#" className="hover:underline">查看 Slide 2</a> | 
                  <a href="#" className="hover:underline">查看 Slide 3</a> | 
                  <a href="#" className="hover:underline">查看 Slide 4</a> | 
                  <a href="#" className="hover:underline">查看 Slide 5</a>
                </div>

                <h3 className="text-white font-bold mt-8 mb-3 text-base">3. 动态宣传视频</h3>
                <p className="text-zinc-400 text-sm mb-3">
                  基于上述营销图，我制作了一个 3D 隧道动效的 App 推广视频：
                </p>
                <a href="#" className="text-sm text-indigo-400 hover:underline flex items-center gap-1.5 bg-indigo-500/10 w-fit px-3 py-1.5 rounded-lg">
                  <Video size={14} /> 点击预览动效视频
                </a>

                <h3 className="text-white font-bold mt-8 mb-3 text-base">4. 多平台推广方案</h3>
                <div className="bg-white/5 rounded-xl p-4 text-sm text-zinc-300 space-y-3 border border-white/5">
                  <p><strong className="text-white">小红书 (XHS) 种草笔记：</strong></p>
                  <p>标题：0成本也能播？我这高质感直播间全靠它！✨</p>
                  <p className="text-zinc-400">内容：针对新手主播痛点，分享如何利用“精彩直播” App 快速起号...</p>
                </div>
              </div>
            ) : isDefaultView ? (
              <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                  <Wand2 size={32} />
                </div>
                <h2 className="text-xl font-bold text-white">新建 Agent 工作流</h2>
                <p className="text-sm text-center max-w-xs">
                  描述你的目标，Agent 会自动规划并执行任务流。
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
                <MessageSquare size={48} className="opacity-20" />
                <p className="text-sm">项目已创建，请输入指令开始工作流</p>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/10 bg-[#18181b]">
            <div className="relative bg-[#27272a] rounded-xl border border-white/5 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all shadow-inner">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="描述你的目标，模型会直接执行，不再预匹配或预生成 workflow..."
                className="w-full bg-transparent border-none rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none resize-none min-h-[80px]"
              />
              <div className="absolute left-3 top-3.5 text-zinc-500">
                <MonitorPlay size={16} />
              </div>
              <button 
                onClick={handleSend}
                className="absolute right-3 bottom-3 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Center Canvas with React Flow */}
        <div className="flex-1 relative bg-[#0a0a0c]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            className="bg-[#0a0a0c]"
            colorMode="dark"
          >
            <Background color="#ffffff" gap={32} size={1} opacity={0.05} />
            <Controls className="!bg-[#18181b] !border-white/10 !fill-white" />
            <MiniMap 
              className="!bg-[#18181b] !border-white/10" 
              nodeColor={(n) => {
                if (n.data?.status === 'completed') return '#10b981';
                if (n.data?.status === 'need_input') return '#f59e0b';
                return '#3b82f6';
              }}
              maskColor="rgba(0, 0, 0, 0.7)"
            />
          </ReactFlow>

          {/* Bottom Status Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#18181b]/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl z-20 pointer-events-none">
            <div className="flex items-center gap-2 text-sm text-zinc-300 font-medium">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              {isDefaultView ? 8 : nodes.length} 子任务
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-300 font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              {isDefaultView ? 7 : nodes.filter(n => n.data?.status === 'completed').length} 完成
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-300 font-medium">
              <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
              {isDefaultView ? 1 : nodes.filter(n => n.data?.status === 'failed').length} 失败
            </div>
            <div className="text-sm text-zinc-400 border-l border-white/10 pl-6 font-medium">
              进度 {progress}%
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
              {isDefaultView ? 'error' : project?.status || 'active'}
            </div>
            <div className="text-sm text-zinc-500 font-mono">
              {projectId || 'b35a9068'}
            </div>
          </div>
        </div>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .react-flow__handle {
          width: 8px;
          height: 8px;
          background: #71717a;
          border: none;
        }
      `}</style>
    </div>
  );
}
