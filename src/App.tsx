import React from 'react'
import Pomodoro from './components/Pomodoro'

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl text-center">
        <Pomodoro />
      </div>
    </div>
  )
}