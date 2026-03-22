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

interface DashboardContextType {
  projects: Project[];
  addProject: (title: string) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'proj-1',
      title: '精彩直播 App 营销全案',
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

  const addProject = (title: string) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      agentState: {
        chatHistory: [],
        nodes: [],
        edges: [],
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

  return (
    <DashboardContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
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
