# AI-Powered Personal Finance Dashboard

An interactive expense tracker that analyzes spending patterns using AI, generates insights, and visualizes financial trends with interactive charts.

## Features

- 📊 Interactive expense tracking and categorization
- 🤖 AI-powered spending insights and forecasts
- 📈 Beautiful data visualizations with charts
- 💰 Income and expense management
- 🎯 Budget tracking and alerts
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components
│   ├── charts/         # Chart components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services
├── store/              # Zustand store
├── utils/              # Utility functions
├── types/              # Type definitions
└── data/               # Mock data and constants
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint