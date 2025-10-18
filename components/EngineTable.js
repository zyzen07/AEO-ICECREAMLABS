'use client'

import { useMemo } from 'react'

export default function EngineTable({ checks, period, onDrillDown }) {
  const engines = ['ChatGPT', 'Gemini', 'Claude', 'Perplexity']

  const engineStats = useMemo(() => {
    const cutoff = new Date(Date.now() - period * 24 * 60 * 60 * 1000)
    const recentChecks = checks.filter(c => new Date(c.timestamp) > cutoff)
    
    return engines.map(engine => {
      const eChecks = recentChecks.filter(c => c.engine === engine)
      const vis = eChecks.length ? Math.round((eChecks.filter(c => c.presence).length / eChecks.length) * 100) : 0
      const avgCites = eChecks.length ? (eChecks.reduce((sum, c) => sum + c.citations_count, 0) / eChecks.length).toFixed(1) : 0
      
      let status = 'Excellent'
      let badgeClass = 'bg-green-100 text-green-800'
      if (vis < 70) { status = 'Good'; badgeClass = 'bg-blue-100 text-blue-800' }
      if (vis < 50) { status = 'Fair'; badgeClass = 'bg-yellow-100 text-yellow-800' }
      if (vis < 30) { status = 'Poor'; badgeClass = 'bg-red-100 text-red-800' }
      
      return { engine, vis, avgCites, status, badgeClass }
    })
  }, [checks, period])

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 animate-fadeIn">
      <h3 className="text-xl font-bold mb-4">Engine Breakdown</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Engine</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Visibility</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Citations</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {engineStats.map(stat => (
              <tr 
                key={stat.engine}
                onClick={() => onDrillDown('engine', stat.engine)}
                className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition"
              >
                <td className="py-3 px-4 font-semibold">{stat.engine}</td>
                <td className="py-3 px-4">{stat.vis}%</td>
                <td className="py-3 px-4">{stat.avgCites}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stat.badgeClass}`}>
                    {stat.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
