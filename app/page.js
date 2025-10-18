'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import ProjectSetup from '@/components/ProjectSetup'
import KeywordsManager from '@/components/KeywordsManager'
import StatsGrid from '@/components/StatsGrid'
import VisibilityChart from '@/components/VisibilityChart'
import EngineTable from '@/components/EngineTable'
import KeywordsTable from '@/components/KeywordsTable'
import Recommendations from '@/components/Recommendations'
import DrillDownModal from '@/components/DrillDownModal'
import { loadData, saveData } from '@/lib/storage'
import { generateSeedData, simulateChecks } from '@/lib/dataGenerator'

export default function Home() {
  const [currentProject, setCurrentProject] = useState(null)
  const [keywords, setKeywords] = useState([])
  const [checks, setChecks] = useState([])
  const [showDashboard, setShowDashboard] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentPeriod, setCurrentPeriod] = useState(7)
  const [drillDownData, setDrillDownData] = useState(null)

  // Load data on mount
  useEffect(() => {
    const data = loadData()
    if (data.currentProject) {
      setCurrentProject(data.currentProject)
      setKeywords(data.keywords || [])
      setChecks(data.checks || [])
      if (data.checks && data.checks.length > 0) {
        setShowDashboard(true)
      }
    }
  }, [])

  // Save data whenever it changes
  useEffect(() => {
    if (currentProject) {
      saveData({ currentProject, keywords, checks })
    }
  }, [currentProject, keywords, checks])

  const handleProjectSave = (project, projectKeywords) => {
    setCurrentProject(project)
    setKeywords(projectKeywords)
    if (checks.length === 0) {
      setShowDashboard(true)
    }
  }

  const handleAddKeywords = (newKeywords) => {
    const uniqueKeywords = [...new Set([...keywords, ...newKeywords])]
    setKeywords(uniqueKeywords)
  }

  const handleRemoveKeyword = (index) => {
    const kw = keywords[index]
    const newKeywords = keywords.filter((_, i) => i !== index)
    const newChecks = checks.filter(c => c.keyword !== kw)
    setKeywords(newKeywords)
    setChecks(newChecks)
  }

  const handleSeedData = async () => {
    if (!currentProject || keywords.length === 0) {
      alert('Setup project and keywords first')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const newChecks = generateSeedData(keywords, currentProject)
      setChecks(newChecks)
      setShowDashboard(true)
      setLoading(false)
      alert(`Seeded 14 days of data! (${newChecks.length} checks generated)`)
    }, 1000)
  }

  const handleRunChecks = async () => {
    if (!currentProject || keywords.length === 0) return
    setLoading(true)
    setTimeout(() => {
      const newChecks = simulateChecks(keywords, currentProject)
      setChecks([...checks, ...newChecks])
      setShowDashboard(true)
      setLoading(false)
      alert(`Generated ${newChecks.length} new checks!`)
    }, 1500)
  }

  const handleDrillDown = (type, value) => {
    setDrillDownData({ type, value })
  }

  const closeDrillDown = () => {
    setDrillDownData(null)
  }

  return (
    <div className={loading ? 'loading' : ''}>
      <Header 
        onRunChecks={handleRunChecks}
        onSeedData={handleSeedData}
        canRunChecks={currentProject && keywords.length > 0}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Setup Section */}
        <ProjectSetup 
          currentProject={currentProject}
          keywords={keywords}
          onSave={handleProjectSave}
        />

        {/* Keywords Manager */}
        <KeywordsManager 
          keywords={keywords}
          onAdd={handleAddKeywords}
          onRemove={handleRemoveKeyword}
          hasProject={!!currentProject}
        />

        {/* Dashboard */}
        {showDashboard && (
          <>
            <div className="mb-8 animate-fadeIn">
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-600">Monitor your AI search visibility across major engines</p>
            </div>

            <StatsGrid 
              checks={checks}
              keywords={keywords}
              period={currentPeriod}
            />

            <VisibilityChart 
              checks={checks}
              currentPeriod={currentPeriod}
              onPeriodChange={setCurrentPeriod}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <EngineTable 
                checks={checks}
                period={currentPeriod}
                onDrillDown={handleDrillDown}
              />
              
              <Recommendations 
                checks={checks}
                keywords={keywords}
                currentProject={currentProject}
                period={currentPeriod}
              />
            </div>

            <KeywordsTable 
              keywords={keywords}
              checks={checks}
              period={currentPeriod}
              onDrillDown={handleDrillDown}
            />
          </>
        )}
      </main>

      {drillDownData && (
        <DrillDownModal 
          data={drillDownData}
          checks={checks}
          period={currentPeriod}
          onClose={closeDrillDown}
        />
      )}
    </div>
  )
}
