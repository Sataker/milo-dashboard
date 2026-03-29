import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Stethoscope
} from 'lucide-react'
import { mockDoctor } from '../lib/mockData'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'schedule', label: 'Agenda', icon: Calendar },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'messages', label: 'Mensagens', icon: MessageSquare },
  { id: 'funnel', label: 'Funil', icon: TrendingUp },
  { id: 'settings', label: 'Configurações', icon: Settings },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 z-50 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      style={{ boxShadow: '4px 0 24px rgba(0, 0, 0, 0.03)' }}
    >
      {/* Logo */}
      <div className={`flex items-center gap-3 p-6 border-b border-gray-100 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-xl font-bold text-gray-900">Milo</h1>
            <p className="text-xs text-gray-500">Medical Dashboard</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onTabChange(item.id)}
              className={`w-full sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-3' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
              {!collapsed && (
                <span className={`font-medium ${isActive ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {/* Doctor profile */}
      <div className={`p-4 border-t border-gray-100 ${collapsed ? 'flex justify-center' : ''}`}>
        <div className={`flex items-center gap-3 ${collapsed ? 'flex-col' : ''}`}>
          <img
            src={mockDoctor.avatar_url}
            alt={mockDoctor.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-100"
          />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {mockDoctor.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {mockDoctor.specialty}
              </p>
            </div>
          )}
          {!collapsed && (
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
