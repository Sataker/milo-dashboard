import { useState } from 'react'
import { Users, MessageSquare, TrendingUp, Target } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { MetricCard } from './components/MetricCard'
import { CalendarConnect } from './components/CalendarConnect'
import { TodaySchedule } from './components/TodaySchedule'
import { LeadsPanel } from './components/LeadsPanel'
import { SalesFunnel } from './components/SalesFunnel'
import { ActivityFeed } from './components/ActivityFeed'
import { mockMetrics } from './lib/mockData'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="lg:ml-64 transition-all duration-300">
        {/* Header */}
        <Header onMenuToggle={() => setSidebarOpen(true)} />

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Google Calendar Connect CTA */}
          <CalendarConnect />

          {/* KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6">
            <MetricCard
              title="Pacientes Atendidos"
              value={mockMetrics.patients_seen}
              icon={Users}
              color="blue"
              trend={{ value: 12, isPositive: true }}
              delay={0.1}
            />
            <MetricCard
              title="Mensajes WhatsApp"
              value={mockMetrics.messages_received}
              icon={MessageSquare}
              color="green"
              trend={{ value: 8, isPositive: true }}
              delay={0.15}
            />
            <MetricCard
              title="Leads Activos"
              value={mockMetrics.active_leads}
              icon={TrendingUp}
              color="purple"
              trend={{ value: 3, isPositive: true }}
              delay={0.2}
            />
            <MetricCard
              title="Tasa de Conversión"
              value={`${mockMetrics.conversion_rate}%`}
              icon={Target}
              color="orange"
              trend={{ value: 5.2, isPositive: true }}
              delay={0.25}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
            {/* Today's Schedule */}
            <TodaySchedule />

            {/* WhatsApp Leads */}
            <LeadsPanel />
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
            {/* Sales Funnel - Takes 2 columns */}
            <div className="lg:col-span-2">
              <SalesFunnel />
            </div>

            {/* Activity Feed */}
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
