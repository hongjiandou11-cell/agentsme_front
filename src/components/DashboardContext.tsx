import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AgentNode {
  id: string;
  type: string;
  label: string;
  status: 'pending' | 'running' | 'completed' | 'need_input' | 'failed';
  position: { x: number; y: number };
  data?: any;
}

export interface AgentEdge {
  id: string;
  source: string;
  target: string;
}

export interface Project {
  id: string;
  title: string;
  type: 'agent' | 'app-shell' | 'app-video' | 'ecommerce-video' | 'ecommerce-material';
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
  agentState: {
    chatHistory: any[];
    nodes: AgentNode[];
    edges: AgentEdge[];
    progress: number;
  };
}

export interface HistoryItem {
  id: string;
  type: 'app-shell' | 'app-video' | 'ecommerce-video' | 'ecommerce-material';
  title: string;
  createdAt: string;
  thumbnail?: string;
  status: 'success' | 'failed' | 'processing';
  resultUrl?: string;
}

interface DashboardContextType {
  projects: Project[];
  history: HistoryItem[];
  addProject: (title: string, type?: Project['type']) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addHistoryItem: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'proj-1',
      title: '精彩直播 App 营销全案',
      type: 'agent',
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      agentState: {
        chatHistory: [],
        nodes: [
          { id: '1', type: 'agentNode', label: 'app-screenshot-render', status: 'need_input', position: { x: 60, y: 60 } },
          { id: '2', type: 'agentNode', label: '风格分析', status: 'completed', position: { x: 420, y: 60 } },
          { id: '3', type: 'agentNode', label: '文案改写', status: 'completed', position: { x: 60, y: 300 } },
          { id: '4', type: 'agentNode', label: 'xhs-topic-generator', status: 'completed', position: { x: 420, y: 300 } },
          { id: '5', type: 'agentNode', label: 'app-screenshot-render', status: 'completed', position: { x: 780, y: 300 } },
          { id: '6', type: 'agentNode', label: '视频动效克隆', status: 'completed', position: { x: 60, y: 600 } },
          { id: '7', type: 'agentNode', label: 'GEO全流程', status: 'completed', position: { x: 420, y: 600 } },
          { id: '8', type: 'agentNode', label: '自动发布笔记', status: 'completed', position: { x: 780, y: 600 } },
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2' },
          { id: 'e1-5', source: '1', target: '5' },
          { id: 'e2-5', source: '2', target: '5' },
          { id: 'e2-8', source: '2', target: '8' },
          { id: 'e3-4', source: '3', target: '4' },
        ],
        progress: 100,
      }
    }
  ]);

  const addProject = (title: string, type: Project['type'] = 'agent') => {
    
    // Generate default nodes based on type
    let defaultNodes: AgentNode[] = [];
    let defaultEdges: AgentEdge[] = [];
    
    if (type === 'app-shell') {
      defaultNodes = [
        { id: '1', type: 'agentNode', label: '上传截图', status: 'need_input', position: { x: 60, y: 60 } },
        { id: '2', type: 'agentNode', label: '风格分析与包装', status: 'pending', position: { x: 420, y: 60 } },
        { id: '3', type: 'agentNode', label: '生成展示图', status: 'pending', position: { x: 780, y: 60 } },
      ];
      defaultEdges = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
      ];
    } else if (type === 'ecommerce-video') {
      defaultNodes = [
        { id: '1', type: 'agentNode', label: '参考视频分析', status: 'need_input', position: { x: 60, y: 60 } },
        { id: '2', type: 'agentNode', label: '商品图处理', status: 'need_input', position: { x: 60, y: 300 } },
        { id: '3', type: 'agentNode', label: '文案提取与重写', status: 'pending', position: { x: 420, y: 60 } },
        { id: '4', type: 'agentNode', label: '视频生成', status: 'pending', position: { x: 780, y: 180 } },
      ];
      defaultEdges = [
        { id: 'e1-3', source: '1', target: '3' },
        { id: 'e1-4', source: '1', target: '4' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-4', source: '3', target: '4' },
      ];
    } else if (type === 'app-video') {
      defaultNodes = [
        { id: '1', type: 'agentNode', label: '参考视频分析', status: 'need_input', position: { x: 60, y: 60 } },
        { id: '2', type: 'agentNode', label: 'APP截图处理', status: 'need_input', position: { x: 60, y: 300 } },
        { id: '3', type: 'agentNode', label: '动效提取', status: 'pending', position: { x: 420, y: 60 } },
        { id: '4', type: 'agentNode', label: '视频合成', status: 'pending', position: { x: 780, y: 180 } },
      ];
      defaultEdges = [
        { id: 'e1-3', source: '1', target: '3' },
        { id: 'e1-4', source: '1', target: '4' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-4', source: '3', target: '4' },
      ];
    } else if (type === 'ecommerce-material') {
      defaultNodes = [
        { id: '1', type: 'agentNode', label: '商品图分析', status: 'need_input', position: { x: 60, y: 60 } },
        { id: '2', type: 'agentNode', label: '卖点提取', status: 'pending', position: { x: 420, y: 60 } },
        { id: '3', type: 'agentNode', label: '排版设计', status: 'pending', position: { x: 420, y: 300 } },
        { id: '4', type: 'agentNode', label: '生成素材', status: 'pending', position: { x: 780, y: 180 } },
      ];
      defaultEdges = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e1-3', source: '1', target: '3' },
        { id: 'e2-4', source: '2', target: '4' },
        { id: 'e3-4', source: '3', target: '4' },
      ];
    }

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title,
      type,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      agentState: {
        chatHistory: [],
        nodes: defaultNodes,
        edges: defaultEdges,
        progress: 0,
      }
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'createdAt'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: `hist-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setHistory(prev => [newItem, ...prev]);
  };

  return (
    <DashboardContext.Provider value={{ projects, history, addProject, updateProject, deleteProject, addHistoryItem }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
