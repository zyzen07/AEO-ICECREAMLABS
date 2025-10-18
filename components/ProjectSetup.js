'use client'

import { useState, useEffect } from 'react'

export default function ProjectSetup({ currentProject, keywords, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    domain: '',
    brand: '',
    competitors: '',
    keywords: ''
  })

  useEffect(() => {
    if (currentProject) {
      setFormData({
        domain: currentProject.domain,
        brand: currentProject.brand,
        competitors: currentProject.competitors.join(', '),
        keywords: keywords.join('\n')
      })
    }
  }, [currentProject, keywords])

  const handleSubmit = (e) => {
    e.preventDefault()
    const project = {
      domain: formData.domain,
      brand: formData.brand,
      competitors: formData.competitors.split(',').map(c => c.trim()).filter(Boolean)
    }
    const projectKeywords = formData.keywords.split('\n').map(k => k.trim()).filter(Boolean)
    onSave(project, projectKeywords)
    setIsEditing(false)
    alert('Project saved!')
  }

  if (!currentProject && !isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8 card-hover">
        <h3 className="text-xl font-bold mb-4">Project Setup</h3>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="font-semibold">No project configured.</p>
          <p className="text-sm text-gray-600">Create a project to start tracking.</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="px-5 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all btn-effect"
        >
          + New Project
        </button>
      </div>
    )
  }

  if (!isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8 card-hover">
        <h3 className="text-xl font-bold mb-4">Project Setup</h3>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="mb-2"><strong>Domain:</strong> {currentProject.domain}</p>
          <p className="mb-2"><strong>Brand:</strong> {currentProject.brand}</p>
          <p><strong>Competitors:</strong> {currentProject.competitors.join(', ') || 'None'}</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
        >
          Edit Project
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Project Setup</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Domain</label>
          <input
            type="text"
            value={formData.domain}
            onChange={(e) => setFormData({...formData, domain: e.target.value})}
            placeholder="example.com"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Brand Name</label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => setFormData({...formData, brand: e.target.value})}
            placeholder="Your Brand"
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Competitors (comma separated)</label>
          <input
            type="text"
            value={formData.competitors}
            onChange={(e) => setFormData({...formData, competitors: e.target.value})}
            placeholder="competitor1.com, competitor2.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-700">Keywords (one per line)</label>
          <textarea
            value={formData.keywords}
            onChange={(e) => setFormData({...formData, keywords: e.target.value})}
            placeholder="best crm software&#10;crm solutions for small business&#10;affordable crm tools"
            required
            rows={5}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-vertical"
          />
        </div>

        <div className="flex space-x-3">
          <button 
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-5 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all btn-effect"
          >
            Save Project
          </button>
        </div>
      </form>
    </div>
  )
}
