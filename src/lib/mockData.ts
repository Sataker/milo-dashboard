import { format, subHours, subDays, addHours, startOfDay, setHours, setMinutes } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Mock doctor
export const mockDoctor = {
  id: '1',
  name: 'Dr. Ricardo Mendes',
  email: 'ricardo.mendes@clinica.com.br',
  specialty: 'Cardiologista',
  avatar_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
  google_calendar_connected: false,
  created_at: new Date().toISOString()
}

// Today's date helpers
const today = new Date()
const todayStart = startOfDay(today)

// Mock appointments for today
export const mockAppointments = [
  {
    id: '1',
    doctor_id: '1',
    patient_name: 'Maria Silva',
    appointment_type: 'consultation' as const,
    start_time: setMinutes(setHours(todayStart, 8), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 8), 30).toISOString(),
    status: 'completed' as const,
    notes: 'Check-up de rotina'
  },
  {
    id: '2',
    doctor_id: '1',
    patient_name: 'João Oliveira',
    appointment_type: 'followup' as const,
    start_time: setMinutes(setHours(todayStart, 9), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 9), 30).toISOString(),
    status: 'completed' as const,
    notes: 'Retorno exames'
  },
  {
    id: '3',
    doctor_id: '1',
    patient_name: 'Ana Paula Costa',
    appointment_type: 'consultation' as const,
    start_time: setMinutes(setHours(todayStart, 10), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 10), 45).toISOString(),
    status: 'confirmed' as const,
    notes: 'Primeira consulta - dor no peito'
  },
  {
    id: '4',
    doctor_id: '1',
    patient_name: 'Carlos Eduardo Lima',
    appointment_type: 'procedure' as const,
    start_time: setMinutes(setHours(todayStart, 11), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 12), 0).toISOString(),
    status: 'scheduled' as const,
    notes: 'Eletrocardiograma'
  },
  {
    id: '5',
    doctor_id: '1',
    patient_name: 'Fernanda Rodrigues',
    appointment_type: 'consultation' as const,
    start_time: setMinutes(setHours(todayStart, 14), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 14), 30).toISOString(),
    status: 'scheduled' as const,
    notes: 'Avaliação cardíaca'
  },
  {
    id: '6',
    doctor_id: '1',
    patient_name: 'Roberto Santos',
    appointment_type: 'followup' as const,
    start_time: setMinutes(setHours(todayStart, 15), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 15), 30).toISOString(),
    status: 'scheduled' as const,
    notes: 'Acompanhamento hipertensão'
  },
  {
    id: '7',
    doctor_id: '1',
    patient_name: 'Luciana Ferreira',
    appointment_type: 'consultation' as const,
    start_time: setMinutes(setHours(todayStart, 16), 0).toISOString(),
    end_time: setMinutes(setHours(todayStart, 16), 30).toISOString(),
    status: 'scheduled' as const,
    notes: 'Encaminhamento ortopedista'
  }
]

// Mock leads with funnel stages
export const mockLeads = [
  {
    id: '1',
    doctor_id: '1',
    name: 'Patrícia Almeida',
    phone: '+55 11 99999-1234',
    email: 'patricia@email.com',
    funnel_stage: 1,
    last_message: 'Olá, gostaria de informações sobre consulta',
    last_message_at: subHours(new Date(), 1).toISOString(),
    source: 'whatsapp' as const,
    created_at: subDays(new Date(), 2).toISOString()
  },
  {
    id: '2',
    doctor_id: '1',
    name: 'Marcos Ribeiro',
    phone: '+55 11 98888-5678',
    email: 'marcos.r@email.com',
    funnel_stage: 2,
    last_message: 'Qual o valor da consulta particular?',
    last_message_at: subHours(new Date(), 3).toISOString(),
    source: 'whatsapp' as const,
    created_at: subDays(new Date(), 5).toISOString()
  },
  {
    id: '3',
    doctor_id: '1',
    name: 'Juliana Martins',
    phone: '+55 11 97777-9012',
    funnel_stage: 3,
    last_message: 'Posso agendar para sexta às 10h?',
    last_message_at: subHours(new Date(), 2).toISOString(),
    source: 'website' as const,
    created_at: subDays(new Date(), 3).toISOString()
  },
  {
    id: '4',
    doctor_id: '1',
    name: 'André Souza',
    phone: '+55 11 96666-3456',
    email: 'andre.souza@empresa.com',
    funnel_stage: 4,
    last_message: 'Confirmado! Estarei aí no horário',
    last_message_at: subHours(new Date(), 5).toISOString(),
    source: 'referral' as const,
    created_at: subDays(new Date(), 7).toISOString()
  },
  {
    id: '5',
    doctor_id: '1',
    name: 'Camila Pereira',
    phone: '+55 11 95555-7890',
    funnel_stage: 5,
    last_message: 'Obrigada pela consulta, Dr.!',
    last_message_at: subDays(new Date(), 1).toISOString(),
    source: 'whatsapp' as const,
    created_at: subDays(new Date(), 14).toISOString()
  },
  {
    id: '6',
    doctor_id: '1',
    name: 'Bruno Carvalho',
    phone: '+55 11 94444-1234',
    funnel_stage: 1,
    last_message: 'Boa tarde! Vocês aceitam convênio Unimed?',
    last_message_at: subHours(new Date(), 0.5).toISOString(),
    source: 'whatsapp' as const,
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    doctor_id: '1',
    name: 'Daniela Costa',
    phone: '+55 11 93333-5678',
    funnel_stage: 2,
    last_message: 'Preciso de urgência, tem horário essa semana?',
    last_message_at: subHours(new Date(), 4).toISOString(),
    source: 'whatsapp' as const,
    created_at: subDays(new Date(), 1).toISOString()
  },
  {
    id: '8',
    doctor_id: '1',
    name: 'Eduardo Nunes',
    phone: '+55 11 92222-9012',
    funnel_stage: 3,
    last_message: 'Perfeito, aguardo confirmação',
    last_message_at: subHours(new Date(), 6).toISOString(),
    source: 'website' as const,
    created_at: subDays(new Date(), 4).toISOString()
  }
]

// Mock activities
export const mockActivities = [
  {
    id: '1',
    doctor_id: '1',
    type: 'message' as const,
    description: 'Nova mensagem de Bruno Carvalho via WhatsApp',
    created_at: subHours(new Date(), 0.5).toISOString()
  },
  {
    id: '2',
    doctor_id: '1',
    type: 'appointment' as const,
    description: 'Consulta confirmada com Carlos Eduardo Lima',
    created_at: subHours(new Date(), 1).toISOString()
  },
  {
    id: '3',
    doctor_id: '1',
    type: 'lead_moved' as const,
    description: 'Juliana Martins movida para "Agendando"',
    created_at: subHours(new Date(), 2).toISOString()
  },
  {
    id: '4',
    doctor_id: '1',
    type: 'conversion' as const,
    description: 'Camila Pereira convertida! Consulta realizada',
    created_at: subDays(new Date(), 1).toISOString()
  },
  {
    id: '5',
    doctor_id: '1',
    type: 'message' as const,
    description: 'Nova mensagem de Marcos Ribeiro via WhatsApp',
    created_at: subHours(new Date(), 3).toISOString()
  },
  {
    id: '6',
    doctor_id: '1',
    type: 'appointment' as const,
    description: 'Consulta de Maria Silva concluída',
    created_at: subHours(new Date(), 8).toISOString()
  },
  {
    id: '7',
    doctor_id: '1',
    type: 'lead_moved' as const,
    description: 'André Souza movido para "Confirmado"',
    created_at: subHours(new Date(), 5).toISOString()
  }
]

// Mock metrics
export const mockMetrics = {
  patients_seen: 2,
  messages_received: 12,
  active_leads: 8,
  conversion_rate: 23.5
}

// Funnel stages config
export const funnelStages = [
  { id: 1, name: 'Primeiro Contato', color: '#3A8EF6' },
  { id: 2, name: 'Interessado / Preço', color: '#8B5CF6' },
  { id: 3, name: 'Agendando', color: '#F59E0B' },
  { id: 4, name: 'Confirmado', color: '#10B981' },
  { id: 5, name: 'Atendido / Convertido', color: '#059669' }
]

// Get leads count by stage
export const getLeadsByStage = () => {
  return funnelStages.map(stage => ({
    ...stage,
    count: mockLeads.filter(lead => lead.funnel_stage === stage.id).length
  }))
}

// Get today's leads (received message today)
export const getTodaysLeads = () => {
  const todayStart = startOfDay(new Date())
  return mockLeads.filter(lead => {
    const messageDate = new Date(lead.last_message_at || lead.created_at)
    return messageDate >= todayStart
  }).sort((a, b) => {
    const dateA = new Date(a.last_message_at || a.created_at)
    const dateB = new Date(b.last_message_at || b.created_at)
    return dateB.getTime() - dateA.getTime()
  })
}
