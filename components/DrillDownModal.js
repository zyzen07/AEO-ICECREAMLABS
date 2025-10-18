'use client'

import { useMemo, useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default function DrillDownModal({ data, checks, period, onClose }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const engines = ['ChatGPT', 'Gemini', 'Claude', 'Perplexity']

  const { chartData, tableData, title } = useMemo(() => {
    if (data.type === 'keyword') {
      const kw = data.value
      const kwChecks = checks.filter(c => c.keyword === kw)
      const cutoff = new Date(Date.now() - period * 24 * 60 * 60 * 1000)
      const filteredChecks = kwChecks.filter(c => new Date(c.timestamp) > cutoff)
      
      // Chart: Avg position over days
      const dayData = {}
      for (let i = 0; i < period; i++) {
        const dayStart = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        dayStart.setHours(0, 0, 0, 0)
        const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)
        const dayPos = filteredChecks.filter(c => {
          const ts = new Date(c.timestamp)
          return ts >= dayStart && ts < dayEnd && c.position
        }).map(c => c.position)
        dayData[dayStart.toLocaleDateString()] = dayPos.length 
          ? dayPos.reduce((a, b) => a + b, 0) / dayPos.length 
          : null
      }
      const labels = Object.keys(dayData).reverse()
      const chartData = {
        labels,
        datasets: [{
          label: 'Avg Position',
          data: labels.map(label => dayData[label]),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.1)',
          fill: true,
          tension: 0.4
        }]
      }
      
      // Table: Latest per engine
      const tableData = engines.map(engine => {
        const latest = filteredChecks
          .filter(c => c.engine === engine)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0] || {}
        return {
          engine,
          position: latest.position || 'N/A',
          presence: latest.presence ? 'Yes' : 'No',
          snippet: latest.answer_snippet ? latest.answer_snippet.substring(0, 50) + '...' : 'N/A',
          citations: latest.citations_count || 0,
          urls: (latest.observed_urls || []).join(', '),
          timestamp: latest.timestamp ? new Date(latest.timestamp).toLocaleDateString() : 'N/A'
        }
      })
      
      return { chartData, tableData, title: `Details for "${kw}"` }
    }
    
    return { chartData: null, tableData: [], title: 'Details' }
  }, [data, checks, period])

  useEffect(() => {
    if (chartRef.current && chartData) {
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
            y: { beginAtZero: true }
          },
          plugins: {
            legend: { position: 'top' }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto mx-4 p-8 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="relative h-64 mb-6">
          <canvas ref={chartRef}></canvas>
        </div>
        
        <h4 className="text-xl font-bold mb-4">Engine Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Engine</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Position</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Presence</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Snippet</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Citations</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">URLs</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(row => (
                <tr key={row.engine} className="border-t border-gray-100">
                  <td className="py-3 px-4 font-semibold">{row.engine}</td>
                  <td className="py-3 px-4">{row.position}</td>
                  <td className="py-3 px-4">{row.presence}</td>
                  <td className="py-3 px-4 text-sm">{row.snippet}</td>
                  <td className="py-3 px-4">{row.citations}</td>
                  <td className="py-3 px-4 text-sm">{row.urls}</td>
                  <td className="py-3 px-4 text-sm">{row.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
