'use client'

export default function Header({ user, onLogout, onRunChecks, onSeedData, canRunChecks }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🎯</span>
          <h1 className="text-2xl font-bold text-primary">AEO Tracker</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden md:block">{user.email}</span>
              <button 
                onClick={onRunChecks}
                disabled={!canRunChecks}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all btn-effect
                  ${canRunChecks 
                    ? 'bg-primary text-white hover:bg-indigo-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                ▶ Run Checks
              </button>
              
              <button 
                onClick={onSeedData}
                className="px-5 py-2.5 bg-secondary text-white rounded-lg font-semibold text-sm hover:bg-purple-700 transition-all btn-effect"
              >
                🌱 Seed Data
              </button>

              <button 
                onClick={onLogout}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-all btn-effect"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
