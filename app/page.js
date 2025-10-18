import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🎯</span>
            <h1 className="text-2xl font-bold text-indigo-600">AEO Tracker</h1>
          </div>
          <div className="flex space-x-3">
            <Link 
              href="/login"
              className="px-5 py-2.5 text-indigo-600 font-semibold hover:text-indigo-700 transition-all"
            >
              Sign In
            </Link>
            <Link 
              href="/signup"
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all btn-effect"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-white rounded-full shadow-xl mb-6 animate-fadeIn">
            <span className="text-6xl">🎯</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 animate-fadeIn">
            AEO Tracker
          </h1>
          <p className="text-2xl text-gray-700 mb-4 animate-fadeIn">
            Monitor your AI search visibility across
          </p>
          <p className="text-xl text-gray-600 mb-8">
            ChatGPT • Gemini • Claude • Perplexity
          </p>
          <div className="flex justify-center space-x-4 animate-fadeIn">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 transition-all btn-effect shadow-lg"
            >
              Get Started Free 🚀
            </Link>
            <Link 
              href="/login"
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all btn-effect shadow-lg border-2 border-indigo-600"
            >
              Sign In →
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center card-hover transform transition-all hover:scale-105">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Real-Time Tracking</h3>
            <p className="text-gray-600">Monitor your visibility across 4 major AI search engines in real-time</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center card-hover transform transition-all hover:scale-105">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Keyword Analysis</h3>
            <p className="text-gray-600">Track performance for unlimited keywords and get detailed insights</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center card-hover transform transition-all hover:scale-105">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Actionable Insights</h3>
            <p className="text-gray-600">Get AI-powered recommendations to improve your search presence</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">Why Track AI Search Visibility?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold text-indigo-600 mb-2">85%</div>
              <p className="text-gray-600">of users trust AI-generated answers</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-indigo-600 mb-2">4+</div>
              <p className="text-gray-600">major AI search engines to monitor</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-indigo-600 mb-2">24/7</div>
              <p className="text-gray-600">continuous visibility tracking</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses tracking their AI search visibility
          </p>
          <Link 
            href="/signup"
            className="inline-block px-10 py-5 bg-indigo-600 text-white rounded-lg font-bold text-xl hover:bg-indigo-700 transition-all btn-effect shadow-2xl"
          >
            Start Tracking Now - It's Free! 🎉
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl text-center">
          <p className="text-gray-600">
            © 2025 AEO Tracker. Monitor your AI search visibility with confidence.
          </p>
        </div>
      </footer>
    </div>
  )
}
