import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings,
  LogOut,
  Stethoscope,
  X
} from 'lucide-react'
import { mockDoctor } from '../lib/mockData'

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Panel Principal' },
  { id: 'calendar', icon: Calendar, label: 'Calendario' },
  { id: 'patients', icon: Users, label: 'Pacientes' },
  { id: 'messages', icon: MessageSquare, label: 'Mensajes' },
  { id: 'analytics', icon: BarChart3, label: 'Estadísticas' },
  { id: 'settings', icon: Settings, label: 'Configuración' },
]

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ activeTab, onTabChange, isOpen = false, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-100 flex flex-col
          lg:translate-x-0 lg:z-30
        `}
      >
      {/* Logo */}
      <div className="flex items-center justify-between gap-3 px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 10 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center"
          >
            <Stethoscope className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="font-bold text-gray-900 font-heading">Milo</h1>
            <p className="text-xs text-gray-500">Panel Médico</p>
          </div>
        </div>
        
        {/* Close button - mobile only */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="lg:hidden w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
        >
          <X className="w-4 h-4 text-gray-600" />
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = activeTab === item.id
          return (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                onTabChange(item.id)
                onClose?.()
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200
                ${isActive 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : ''}`} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600"
                />
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-gray-100" />

      {/* User section */}
      <div className="p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <img
            src={mockDoctor.avatar_url}
            alt={mockDoctor.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{mockDoctor.name}</p>
            <p className="text-xs text-gray-500 truncate">{mockDoctor.specialty}</p>
          </div>
          <LogOut className="w-4 h-4 text-gray-400" />
        </motion.button>
      </div>
    </motion.aside>
    </>
  )
}
