import { Card } from "@/components/ui/card"

export function Impact() {
  const impacts = [
    { label: "Plastic Diverted", value: "2.5K Tons", color: "from-blue-500 to-cyan-500" },
    { label: "Textiles Rescued", value: "1.8K Tons", color: "from-purple-500 to-pink-500" },
    { label: "E-Waste Processed", value: "890 Tons", color: "from-orange-500 to-red-500" },
    { label: "CO₂ Avoided", value: "15.4K Tons", color: "from-green-500 to-emerald-500" },
  ]

  return (
    <section id="impact" className="py-20 px-4 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Impact, Real Numbers</h2>
          <p className="text-xl text-gray-600">Join thousands making a difference in the circular economy</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {impacts.map((impact, idx) => (
            <Card key={idx} className="p-8 border-gray-200 overflow-hidden relative">
              <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${impact.color}`}></div>
              <div className="relative z-10">
                <p className="text-sm font-medium text-gray-600 mb-2">{impact.label}</p>
                <p className="text-4xl font-bold text-gray-900">{impact.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-12 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Personal Dashboard</h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Track your unique contribution to sustainability. See exactly how much waste you've diverted, CO₂ you've
            saved, and products you've helped upcycle. Every transaction contributes to a healthier planet.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-sm">
                ✓
              </span>
              Real-time impact metrics
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-sm">
                ✓
              </span>
              Monthly impact reports
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-sm">
                ✓
              </span>
              Community leaderboards
            </li>
          </ul>
        </Card>
      </div>
    </section>
  )
}
