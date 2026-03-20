import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Smartphone, ShoppingBag, Lightbulb, ChevronRight } from 'lucide-react';
import { DashboardContext } from './DashboardContext';

export default function DashboardLayout() {
  const location = useLocation();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const navItems = [
    { id: 'home', icon: Home, label: '首页', path: '/dashboard' },
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
    { id: 'inspiration', icon: Lightbulb, label: '灵感库', path: '/dashboard/inspiration' },
  ];

  return (
    <DashboardContext.Provider value={true}>
      <div className="flex h-screen bg-[#0f0f11] text-white overflow-hidden font-sans">
        {/* Sidebar */}
        <div className="w-20 flex-shrink-0 bg-[#18181b] border-r border-white/5 flex flex-col items-center py-6 relative z-50">
          <div className="mb-8">
            <Link to="/" className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 hover:scale-105 transition-transform cursor-pointer block text-center leading-10">
              AI
            </Link>
          </div>

          <div className="flex flex-col gap-4 w-full px-3 relative">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.subItems && location.pathname.startsWith(item.path));
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
    </DashboardContext.Provider>
  );
}
