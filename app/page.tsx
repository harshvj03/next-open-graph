export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
            Your Dream Car Awaits
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
            Discover unbeatable deals on new and certified pre-owned vehicles. Special financing available.
          </p>
          <div className="pt-8">
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
              View Inventory
            </button>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
            <p className="text-slate-600">Browse our extensive collection of top-quality vehicles</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Best Financing</h3>
            <p className="text-slate-600">Competitive rates and flexible payment options</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Expert Service</h3>
            <p className="text-slate-600">Professional team dedicated to your satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}
