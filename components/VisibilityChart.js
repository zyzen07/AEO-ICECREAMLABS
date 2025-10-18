'use client'

import { useMemo, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function VisibilityChart({ checks, currentPeriod, onPeriodChange }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const chartData = useMemo(() => {
    const engines = ['ChatGPT', 'Gemini', 'Claude', 'Perplexity']
    const dayData = {}
    
    for (let i = 0; i < currentPeriod; i++) {
      const dayStart = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      dayStart.setHours(0, 0, 0, 0)
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)
      
      const dayChecks = checks.filter(c => {
        const ts = new Date(c.timestamp)
        return ts >= dayStart && ts < dayEnd
      })
      
      engines.forEach(engine => {
        const eChecks = dayChecks.filter(c => c.engine === engine)
        const vis = eChecks.length ? Math.round((eChecks.filter(c => c.presence).length / eChecks.length) * 100) : 0
        const dateKey = dayStart.toLocaleDateString()
        if (!dayData[dateKey]) dayData[dateKey] = {}
        dayData[dateKey][engine] = vis
      })
    }
    
    const labels = Object.keys(dayData).reverse()
    const datasets = engines.map((engine, idx) => ({
      label: engine,
      data: labels.map(label => dayData[label][engine] || 0),
      borderColor: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'][idx],
      backgroundColor: ['rgba(16,185,129,0.1)', 'rgba(59,130,246,0.1)', 'rgba(139,92,246,0.1)', 'rgba(245,158,11,0.1)'][idx],
      fill: true,
      tension: 0.4
    }))
    
    return { labels, datasets }
  }, [checks, currentPeriod])

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
      
      const ctx = chartRef.current.getContext('2d')
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Visibility %'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Days'
              }
            }
          },
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      })
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [chartData])

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Visibility Trend</h2>
        <div className="flex space-x-2">
          {[7, 30, 90].map(period => (
            <button
              key={period}
              onClick={() => onPeriodChange(period)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                ${currentPeriod === period 
                  ? 'bg-gray-100 text-primary' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {period} Days
            </button>
          ))}
        </div>
      </div>
      <div className="relative h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}
