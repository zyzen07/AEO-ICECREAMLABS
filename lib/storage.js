const STORAGE_KEY = 'aeoTrackerFull'

export function saveData(data) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

export function loadData() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  }
  return {}
}

export function clearData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}
