const engines = ['ChatGPT', 'Gemini', 'Claude', 'Perplexity']

export function generateSeedData(keywords, currentProject) {
  const checks = []
  const now = new Date('2025-10-18')
  
  for (let day = 0; day < 14; day++) {
    const dayDate = new Date(now.getTime() - day * 24 * 60 * 60 * 1000)
    keywords.forEach(keyword => {
      engines.forEach(engine => {
        const presenceProb = 0.5 + (day / 14) * 0.5 // Improve over time
        const presence = Math.random() < presenceProb
        const position = presence ? Math.floor(Math.random() * 5) + 1 : null
        const snippet = presence 
          ? `${currentProject.brand} is prominently featured for "${keyword}" in ${engine} responses.`
          : `No strong presence for ${currentProject.brand} on "${keyword}" in ${engine}.`
        const citations = presence ? Math.floor(Math.random() * 4) + 1 : 0
        const urls = presence 
          ? [currentProject.domain, ...(currentProject.competitors.slice(0, Math.floor(Math.random() * 2)))] 
          : []
        
        checks.push({
          keyword,
          engine,
          position,
          presence,
          answer_snippet: snippet,
          citations_count: citations,
          observed_urls: urls,
          timestamp: dayDate.toISOString()
        })
      })
    })
  }
  
  return checks
}

export function simulateChecks(keywords, currentProject) {
  const checks = []
  const now = new Date()
  
  keywords.forEach(keyword => {
    engines.forEach(engine => {
      const presence = Math.random() > 0.2 // 80% chance
      const position = presence ? Math.floor(Math.random() * 4) + 1 : null
      const snippet = presence 
        ? `${currentProject.brand} ranks highly for "${keyword}" on ${engine}.`
        : `${currentProject.brand} needs optimization for "${keyword}" on ${engine}.`
      const citations = presence ? Math.floor(Math.random() * 3) + 1 : 0
      const urls = presence ? [currentProject.domain, currentProject.competitors[0] || ''] : []
      
      checks.push({
        keyword,
        engine,
        position,
        presence,
        answer_snippet: snippet,
        citations_count: citations,
        observed_urls: urls,
        timestamp: now.toISOString()
      })
    })
  })
  
  return checks
}
