import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Smartphone, ShoppingBag, Lightbulb, ChevronRight, Wand2, Play, Image as ImageIcon, LayoutGrid, Monitor, ShoppingCart, Clock } from 'lucide-react';
import { DashboardProvider, useDashboard } from './DashboardContext';

function DashboardLayoutContent() {
  const location = useLocation();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const { projects } = useDashboard();

  // Find the most recently active project, or just the first one
  const activeProject = projects.length > 0 ? projects[0] : null;
  const agentPath = activeProject ? `/dashboard/projects/${activeProject.id}` : '/dashboard/agent';

  const navItems = [
    { id: 'home', icon: Home, label: '首页', path: '/dashboard' },
    { id: 'agent', icon: Wand2, label: 'Agent', path: agentPath },
    { 
      id: 'app', 
      icon: Smartphone, 
      label: 'APP', 
      path: '/dashboard/app',
      subItems: [
        { label: 'APP 套壳', path: '/dashboard/app/shell' },
        { label: 'APP 视频克隆', path: '/dashboard/app/video' },
      ]
    },
    { 
      id: 'ecommerce', 
      icon: ShoppingBag, 
      label: '电商', 
      path: '/dashboard/ecommerce',
      subItems: [
        { label: '商品图制作', path: '/dashboard/ecommerce/material' },
        { label: '电商带货视频创作', path: '/dashboard/ecommerce/video' },
      ]
    },
    { 
      id: 'inspiration', 
      icon: Lightbulb, 
      label: '灵感库', 
      path: '/dashboard/inspiration'
    },
    { id: 'market', icon: LayoutGrid, label: '市场', path: '/dashboard/market' },
    {
      id: 'history',
      icon: Clock,
      label: '历史记录',
      path: '/dashboard/history'
    }
  ];

  return (
    <div className="flex h-screen bg-[#0f0f11] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-20 flex-shrink-0 bg-[#18181b] border-r border-white/5 flex flex-col items-center py-6 relative z-50">
        <div className="mb-8">
          <Link to="/" className="flex items-center justify-center text-white hover:opacity-80 transition-opacity" title="Agents Me">
            <span className="material-symbols-outlined text-primary text-3xl">deployed_code</span>
          </Link>
        </div>

        <Link 
          to="/dashboard/agent"
          className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all mb-6 group relative"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          {/* Tooltip */}
          <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
            新建项目
          </div>
        </Link>

        <div className="flex flex-col gap-4 w-full px-3 relative">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.subItems && location.pathname.startsWith(item.path)) || (item.id === 'agent' && location.pathname.startsWith('/dashboard/projects'));
            const isHovered = hoveredTab === item.id;

            return (
              <div 
                key={item.id}
                className="relative w-full"
                onMouseEnter={() => setHoveredTab(item.id)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <Link
                  to={item.subItems ? item.subItems[0].path : item.path}
                  className={`w-full flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-200 relative z-10 ${
                    isActive 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={22} className="mb-1.5" />
                  <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                </Link>

                {/* Submenu Popover */}
                {item.subItems && isHovered && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 pl-2 z-50 py-4">
                    <div className="w-48 bg-[#18181b] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden">
                      {item.subItems.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.path}
                          onClick={() => setHoveredTab(null)}
                          className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                            location.pathname === sub.path 
                              ? 'bg-white/10 text-white font-medium' 
                              : 'text-zinc-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {sub.label}
                          <ChevronRight size={14} className="opacity-50" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#0f0f11]">
        <Outlet />
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <DashboardLayoutContent />
    </DashboardProvider>
  );
}
