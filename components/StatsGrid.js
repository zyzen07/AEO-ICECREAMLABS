'use client'

import { useMemo } from 'react'

export default function StatsGrid({ checks, keywords, period }) {
  const stats = useMemo(() => {
    const cutoff = new Date(Date.now() - period * 24 * 60 * 60 * 1000)
    const recentChecks = checks.filter(c => new Date(c.timestamp) > cutoff)
    
    const total = recentChecks.length
    const present = recentChecks.filter(c => c.presence).length
    const score = total > 0 ? Math.round((present / total) * 100) : 0

    // Previous period comparison
    const prevCutoff = new Date(Date.now() - (period * 2) * 24 * 60 * 60 * 1000)
    const prevChecks = checks.filter(c => new Date(c.timestamp) > prevCutoff && new Date(c.timestamp) <= cutoff)
    const prevTotal = prevChecks.length
    const prevPresent = prevChecks.filter(c => c.presence).length
    const prevScore = prevTotal > 0 ? Math.round((prevPresent / prevTotal) * 100) : 0
    const scoreChange = score - prevScore

    // Best engine
    const engines = ['ChatGPT', 'Gemini', 'Claude', 'Perplexity']
    const engineVis = {}
    engines.forEach(engine => {
      const eChecks = recentChecks.filter(c => c.engine === engine)
      const ePresent = eChecks.filter(c => c.presence).length
      engineVis[engine] = eChecks.length ? Math.round((ePresent / eChecks.length) * 100) : 0
    })
    const bestEngine = Object.entries(engineVis).reduce((a, b) => a[1] > b[1] ? a : b, ['N/A', 0])

    // Average citations
    const allCitations = recentChecks.reduce((sum, c) => sum + c.citations_count, 0)
    const avgCites = total > 0 ? (allCitations / total).toFixed(1) : 0
    
    const prevCitations = prevChecks.reduce((sum, c) => sum + c.citations_count, 0)
    const prevAvgCites = prevTotal > 0 ? (prevCitations / prevTotal).toFixed(1) : 0
    const citesChange = parseFloat(avgCites) - parseFloat(prevAvgCites)

    return {
      score,
      scoreChange,
      keywordsCount: keywords.length,
      bestEngine: bestEngine[0],
      bestEngineVis: bestEngine[1],
      avgCites,
      citesChange
    }
  }, [checks, keywords, period])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover">
        <div className="text-sm font-semibold text-gray-600 mb-2">Overall Visibility Score</div>
        <div className="text-4xl font-bold text-primary mb-2">{stats.score}%</div>
        <div className={`text-sm flex items-center space-x-1 ${stats.scoreChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span className="text-lg">{stats.scoreChange >= 0 ? '↑' : '↓'}</span>
          <span>{Math.abs(stats.scoreChange)}% from last period</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover">
        <div className="text-sm font-semibold text-gray-600 mb-2">Keywords Tracked</div>
        <div className="text-4xl font-bold mb-2">{stats.keywordsCount}</div>
        <div className="text-sm text-gray-600">Across 4 AI engines</div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover">
        <div className="text-sm font-semibold text-gray-600 mb-2">Best Performing Engine</div>
        <div className="text-4xl font-bold text-green-600 mb-2">{stats.bestEngine}</div>
        <div className="text-sm flex items-center space-x-1 text-green-600">
          <span className="text-lg">↑</span>
          <span>{stats.bestEngineVis}% visibility</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 card-hover">
        <div className="text-sm font-semibold text-gray-600 mb-2">Avg. Citations</div>
        <div className="text-4xl font-bold mb-2">{stats.avgCites}</div>
        <div className={`text-sm flex items-center space-x-1 ${stats.citesChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span className="text-lg">{stats.citesChange >= 0 ? '↑' : '↓'}</span>
          <span>{Math.abs(stats.citesChange).toFixed(1)} from last period</span>
        </div>
      </div>
    </div>
  )
}
