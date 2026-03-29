# Milo - Medical Dashboard

<div align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-green?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</div>

## Overview

Professional medical sales funnel dashboard with a premium white and blue design. Features smooth animations, glassmorphism effects, and a modern UI that doctors love to use.

## Features

- **📊 KPI Metrics**: Patients seen, WhatsApp messages, active leads, conversion rate
- **📅 Today's Schedule**: Hour-by-hour timeline with color-coded appointments
- **💬 WhatsApp Leads**: Live feed of messages with funnel stage indicators
- **📈 Sales Funnel**: Visual 5-stage patient journey with conversion rates
- **🔔 Activity Feed**: Real-time log of actions and updates
- **🔗 Google Calendar**: OAuth integration for appointment sync

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Sora + DM Sans

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your Supabase credentials to .env.local

# Start development server
npm run dev
```

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL from `src/lib/supabase.ts` (setupSQL export) in the SQL editor
3. Copy your project URL and anon key to `.env.local`

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary 500 | `#3A8EF6` | Main accent |
| Primary 800 | `#1255B5` | Deep blue |
| Primary 50 | `#E8F4FF` | Light backgrounds |
| Gray 50 | `#F9FAFB` | Page background |
| Success | `#10B981` | Positive indicators |

## Project Structure

```
src/
├── components/
│   ├── ActivityFeed.tsx
│   ├── CalendarConnect.tsx
│   ├── Header.tsx
│   ├── LeadsPanel.tsx
│   ├── MetricCard.tsx
│   ├── SalesFunnel.tsx
│   ├── Sidebar.tsx
│   └── TodaySchedule.tsx
├── lib/
│   ├── mockData.ts      # Demo data
│   └── supabase.ts      # Database client + types
├── App.tsx
├── main.tsx
└── index.css            # Tailwind + custom styles
```

## License

MIT
