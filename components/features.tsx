import { Card } from "@/components/ui/card"

const features = [
  {
    icon: "🏪",
    title: "Centralized Marketplace",
    description: "One platform for selling and donating reusable materials—plastics, textiles, electronics, and wood.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Matching",
    description:
      "Smart algorithms connect you with the right buyers and sellers based on location, quantity, and material type.",
  },
  {
    icon: "🛍️",
    title: "Upcycled Products",
    description: "Discover beautiful eco-friendly products created from reclaimed materials by talented artisans.",
  },
  {
    icon: "📊",
    title: "Impact Tracking",
    description: "See your real-world contribution: waste saved, CO₂ avoided, and products upcycled in one dashboard.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How EcoCycle Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to participate in the circular economy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-8 border-gray-200 hover:border-emerald-200 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
