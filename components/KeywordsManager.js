'use client'

import { useState } from 'react'

export default function KeywordsManager({ keywords, onAdd, onRemove, hasProject }) {
  const [newKeywords, setNewKeywords] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!hasProject) {
      alert('Create project first')
      return
    }
    const kws = newKeywords.split(',').map(k => k.trim()).filter(k => k && !keywords.includes(k))
    if (kws.length > 0) {
      onAdd(kws)
      setNewKeywords('')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8 card-hover">
      <h3 className="text-xl font-bold mb-4">Keywords</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {keywords.map((kw, i) => (
          <div key={i} className="bg-gray-200 px-3 py-1.5 rounded-full flex items-center space-x-2 text-sm">
            <span>{kw}</span>
            <button 
              onClick={() => onRemove(i)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Add More Keywords (comma separated)
          </label>
          <input
            type="text"
            value={newKeywords}
            onChange={(e) => setNewKeywords(e.target.value)}
            placeholder="new keyword 1, new keyword 2"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>
        <button 
          type="submit"
          className="px-5 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all btn-effect"
        >
          Add Keywords
        </button>
      </form>
    </div>
  )
}
