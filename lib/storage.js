const STORAGE_KEY_PREFIX = 'aeoTrackerFull_'

export function saveData(userId, data) {
  if (typeof window !== 'undefined' && userId) {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${userId}`, JSON.stringify(data))
  }
}

export function loadData(userId) {
  if (typeof window !== 'undefined' && userId) {
    const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}${userId}`)
    return data ? JSON.parse(data) : {}
  }
  return {}
}

export function clearData(userId) {
  if (typeof window !== 'undefined' && userId) {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${userId}`)
  }
}
