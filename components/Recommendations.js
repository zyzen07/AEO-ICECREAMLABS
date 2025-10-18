'use client'

import { useMemo } from 'react'

export default function Recommendations({ checks, keywords, currentProject, period }) {
  const recommendations = useMemo(() => {
    const cutoff = new Date(Date.now() - period * 24 * 60 * 60 * 1000)
    const recentChecks = checks.filter(c => new Date(c.timestamp) > cutoff)
    const engines = ['ChatGPT', 'Gemini', 'Claude', 'Perplexity']
    let recs = []
    
    keywords.forEach(kw => {
      const missing = engines.filter(engine => 
        !recentChecks.some(c => c.keyword === kw && c.engine === engine && c.presence)
      )
      if (missing.length > 1) {
        recs.push({
          type: 'warning',
          icon: '⚠️',
          title: `Missing on ${missing.join(', ')} for "${kw}"`,
          desc: 'Optimize content for better coverage.'
        })
      }
      
      const kwChecks = recentChecks.filter(c => c.keyword === kw)
      const avgCites = kwChecks.length 
        ? kwChecks.reduce((sum, c) => sum + c.citations_count, 0) / kwChecks.length 
        : 0
      if (avgCites < 2 && kwChecks.length > 0) {
        recs.push({
          type: 'info',
          icon: 'ℹ️',
          title: `Low citations (${avgCites.toFixed(1)}) for "${kw}"`,
          desc: 'Build more backlinks and authoritative sources.'
        })
      }
    })
    
    return recs.slice(0, 5)
  }, [checks, keywords, period])

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 animate-fadeIn">
      <h3 className="text-xl font-bold mb-4">Recommendations</h3>
      <div className="space-y-3">
        {recommendations.length === 0 ? (
          <div className="text-gray-600 text-sm">No recommendations at this time. Great job!</div>
        ) : (
          recommendations.map((rec, idx) => (
            <div 
              key={idx}
              className={`flex space-x-3 p-4 rounded-lg border-l-4 ${
                rec.type === 'warning' 
                  ? 'bg-yellow-50 border-yellow-500' 
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="text-2xl">{rec.icon}</div>
              <div className="flex-1">
                <div className="font-semibold mb-1">{rec.title}</div>
                <div className="text-sm text-gray-600">{rec.desc}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
