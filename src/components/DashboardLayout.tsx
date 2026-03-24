import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, Smartphone, ShoppingBag, Send, Lightbulb, LayoutGrid, 
  History, Settings, Shield, Key, BarChart, LogOut, Hexagon, Wand2, ChevronRight,
  Sparkles, ArrowRight, X
} from 'lucide-react';
import { DashboardProvider } from './DashboardContext';

function DashboardLayoutContent() {
  const location = useLocation();
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    app: false,
    ecommerce: false
  });

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sidebarGroups = [
    {
      title: '工具',
      items: [
        { 
          id: 'app', 
          icon: Smartphone, 
          label: 'APP', 
          path: '/dashboard/app',
          subItems: [
            { id: 'app-shell', label: 'APP 套壳', path: '/dashboard/app/shell' },
            { id: 'app-video', label: 'APP 视频克隆', path: '/dashboard/app/video' }
          ]
        },
        { 
          id: 'ecommerce', 
          icon: ShoppingBag, 
          label: '电商', 
          path: '/dashboard/ecommerce',
          subItems: [
            { id: 'ecommerce-material', label: '商品图制作', path: '/dashboard/ecommerce/material' },
            { id: 'ecommerce-video', label: '电商带货视频克隆', path: '/dashboard/ecommerce/video' }
          ]
        },
        { id: 'publish', icon: Send, label: '内容发布', path: '/dashboard/publish' },
      ]
    },
    {
      title: '资源',
      items: [
        { id: 'inspiration', icon: Lightbulb, label: '灵感库', path: '/dashboard/inspiration' },
        { id: 'market', icon: LayoutGrid, label: '市场', path: '/dashboard/market' },
      ]
    },
    {
      title: '管理',
      items: [
        { id: 'history', icon: History, label: '历史记录', path: '/dashboard/history' },
        { id: 'settings', icon: Settings, label: '设置', path: '/dashboard/settings' },
      ]
    },
    {
      title: '管理员',
      items: [
        { id: 'admin', icon: Shield, label: '运营后台', path: '/dashboard/admin' },
        { id: 'apikeys', icon: Key, label: 'API Keys', path: '/dashboard/apikeys' },
        { id: 'stats', icon: BarChart, label: '爬虫统计', path: '/dashboard/stats' },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white overflow-hidden font-sans">
      {/* Top Banner */}
      {isBannerVisible && (
        <div className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2.5 flex items-center justify-between shrink-0 relative z-[60] shadow-md">
          <div className="flex-1"></div> {/* Spacer for centering */}
          <div className="flex items-center gap-3 text-sm font-medium">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 border border-white/10 text-[11px] font-bold tracking-wider uppercase">
              <Sparkles size={12} className="text-yellow-300" />
              Platform Upgrade
            </div>
            <div className="hidden sm:block w-px h-3 bg-white/30"></div>
            <span className="hidden sm:inline text-sm">Agents Me x OpenClaw 能力开放</span>
            <span className="sm:hidden text-xs">Agents Me x OpenClaw 能力开放</span>
            <button className="ml-2 px-3 py-1 bg-white text-indigo-600 hover:bg-zinc-100 rounded-full text-xs font-bold transition-colors flex items-center gap-1 shadow-sm">
              查看详情 <ArrowRight size={12} />
            </button>
          </div>
          <div className="flex-1 flex justify-end">
            <button onClick={() => setIsBannerVisible(false)} className="text-white/70 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 bg-[#0a0a0c] border-r border-white/5 flex flex-col h-full relative z-50">
        
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/5 shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">
              <Hexagon size={18} className="text-blue-400" />
            </div>
            <span className="font-bold text-lg tracking-wide text-white">Agents Me</span>
          </Link>
        </div>

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 flex flex-col gap-6">
          
          {/* Top Links */}
          <div className="flex flex-col gap-1">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                location.pathname === '/dashboard' 
                  ? 'bg-blue-500/10 text-blue-400' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <Home size={18} />
              <span className="text-sm font-medium">首页</span>
            </Link>
            <Link
              to="/dashboard/agent"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                location.pathname.startsWith('/dashboard/agent') || location.pathname.startsWith('/dashboard/projects')
                  ? 'bg-blue-500/10 text-blue-400' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
              }`}
            >
              <Wand2 size={18} />
              <span className="text-sm font-medium">Agent</span>
            </Link>
          </div>

          {/* Groups */}
          {sidebarGroups.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="px-3 text-[11px] font-medium text-zinc-600 mb-1">{group.title}</div>
              {group.items.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isExpanded = expandedItems[item.id] !== false; // default true if not explicitly collapsed

                const ItemContent = (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className={isActive ? 'text-blue-400' : 'text-zinc-500 group-hover/item:text-zinc-300'} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {hasSubItems ? (
                      <ChevronRight size={14} className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''} ${isActive ? 'text-blue-400' : 'text-zinc-500 group-hover/item:text-zinc-300'}`} />
                    ) : (
                      group.title === '工具' && (
                        <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-50 transition-opacity" />
                      )
                    )}
                  </>
                );

                const itemClassName = `flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group/item w-full ${
                  isActive 
                    ? 'bg-blue-500/10 text-blue-400' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`;

                return (
                  <div key={item.id} className="flex flex-col gap-1">
                    {hasSubItems ? (
                      <button
                        onClick={(e) => toggleExpand(item.id, e)}
                        className={itemClassName}
                      >
                        {ItemContent}
                      </button>
                    ) : (
                      <Link to={item.path} className={itemClassName}>
                        {ItemContent}
                      </Link>
                    )}

                    {/* Sub Items */}
                    {hasSubItems && isExpanded && (
                      <div className="flex flex-col gap-1 pl-9 pr-2 mt-0.5">
                        {item.subItems!.map(sub => {
                          const isSubActive = location.pathname === sub.path;
                          return (
                            <Link
                              key={sub.id}
                              to={sub.path}
                              className={`flex items-center px-3 py-2 rounded-lg transition-all text-sm ${
                                isSubActive
                                  ? 'bg-blue-500/20 text-blue-400 font-medium'
                                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                              }`}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer User Area */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <div className="flex items-center justify-between px-2 mb-4">
            <span className="text-sm text-zinc-400">Demo2</span>
          </div>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={18} />
            <span className="text-sm font-medium">退出登录</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#050505]">
        <Outlet />
      </div>
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
