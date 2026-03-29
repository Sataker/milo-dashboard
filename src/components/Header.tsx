import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Bell, Search, Sun, Moon, Menu } from 'lucide-react'
import { useState } from 'react'
import { mockDoctor } from '../lib/mockData'

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [isDark, setIsDark] = useState(false)
  const now = new Date()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Mobile menu button + Welcome */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onMenuToggle}
            className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </motion.button>

          <div>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900"
            >
              <span className="hidden sm:inline">¡Hola, </span>
              <span className="sm:hidden">¡Hola!</span>
              <span className="hidden sm:inline">Dr. {mockDoctor.name.split(' ')[1]}! 👋</span>
            </motion.h1>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-xs sm:text-sm text-gray-500 capitalize hidden sm:block"
            >
              {format(now, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
            </motion.p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search - hidden on mobile */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar paciente..."
              className="w-48 lg:w-64 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>

          {/* Search button - mobile only */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </motion.button>

          {/* Theme toggle - hidden on small mobile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDark(!isDark)}
            className="hidden sm:flex w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 items-center justify-center transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </motion.button>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 ml-1 sm:ml-2 border-l border-gray-200 cursor-pointer"
          >
            <img
              src={mockDoctor.avatar_url}
              alt={mockDoctor.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-primary-100"
            />
            <div className="hidden xl:block">
              <p className="text-sm font-semibold text-gray-900">{mockDoctor.name}</p>
              <p className="text-xs text-gray-500">{mockDoctor.specialty}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
