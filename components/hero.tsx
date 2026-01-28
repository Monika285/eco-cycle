import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
          <span className="text-sm font-medium text-emerald-700">♻️ Welcome to the circular economy</span>
        </div>

        <h1 className="mb-6 text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">
          Transform Waste Into{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Opportunity
          </span>
        </h1>

        <p className="mb-8 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Connect with artisans and eco-entrepreneurs through our smart upcycling marketplace. Buy, sell, and donate
          reusable materials while tracking your environmental impact.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-emerald-600 text-white text-base hover:bg-emerald-700 h-12">
            Browse Materials
          </Button>
          <Button size="lg" variant="outline" className="border-gray-300 text-base h-12 bg-transparent">
            Sell Your Materials
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">10K+</div>
            <div className="text-sm text-gray-600">Materials Listed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">5K+</div>
            <div className="text-sm text-gray-600">Active Creators</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">50T</div>
            <div className="text-sm text-gray-600">Waste Diverted</div>
          </div>
        </div>
      </div>
    </section>
  )
}
