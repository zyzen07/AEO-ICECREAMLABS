'use client'

import { useMemo } from 'react'

export default function KeywordsTable({ keywords, checks, period, onDrillDown }) {
  const keywordStats = useMemo(() => {
    const cutoff = new Date(Date.now() - period * 24 * 60 * 60 * 1000)
    const recentChecks = checks.filter(c => new Date(c.timestamp) > cutoff)
    
    const prevCutoff = new Date(Date.now() - (period * 2) * 24 * 60 * 60 * 1000)
    const prevChecks = checks.filter(c => new Date(c.timestamp) > prevCutoff && new Date(c.timestamp) <= cutoff)
    
    return keywords.map(kw => {
      const kwChecks = recentChecks.filter(c => c.keyword === kw)
      const presentCount = kwChecks.filter(c => c.presence).length
      const enginesPresent = Math.round((presentCount / kwChecks.length) * 4) || 0
      
      const positions = kwChecks.filter(c => c.position).map(c => c.position)
      const avgPos = positions.length ? (positions.reduce((a, b) => a + b, 0) / positions.length).toFixed(1) : 'N/A'
      
      const lastCheck = kwChecks.length 
        ? new Date(Math.max(...kwChecks.map(c => new Date(c.timestamp)))).toLocaleString() 
        : 'N/A'
      
      const prevKwChecks = prevChecks.filter(c => c.keyword === kw)
      const prevPresent = prevKwChecks.filter(c => c.presence).length
      
      const trend = presentCount > prevPresent ? 'up' : presentCount < prevPresent ? 'down' : 'stable'
      const trendSymbol = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'
      const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
      
      return { kw, enginesPresent, avgPos, lastCheck, trendSymbol, trendColor }
    })
  }, [keywords, checks, period])

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 animate-fadeIn">
      <h3 className="text-xl font-bold mb-4">Tracked Keywords</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Keyword</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Engines Present</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Avg. Position</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Last Check</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Trend</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {keywordStats.map(stat => (
              <tr 
                key={stat.kw}
                onClick={() => onDrillDown('keyword', stat.kw)}
                className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition"
              >
                <td className="py-3 px-4 font-semibold">{stat.kw}</td>
                <td className="py-3 px-4">{stat.enginesPresent}/4</td>
                <td className="py-3 px-4">{stat.avgPos}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{stat.lastCheck}</td>
                <td className={`py-3 px-4 text-xl ${stat.trendColor}`}>{stat.trendSymbol}</td>
                <td className="py-3 px-4">
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
