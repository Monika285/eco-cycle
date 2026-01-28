export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "List Materials",
      description: "Upload details of your reusable materials with photos and specifications.",
    },
    {
      number: "2",
      title: "Smart Matching",
      description: "Our AI connects you with interested buyers and artisans in your area.",
    },
    {
      number: "3",
      title: "Complete Transaction",
      description: "Negotiate, finalize the deal, and arrange pickup or delivery.",
    },
    {
      number: "4",
      title: "Track Impact",
      description: "Watch your environmental contribution grow in real-time.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Started in 4 Steps</h2>
          <p className="text-xl text-gray-600">From listing to impact tracking, it's simple and rewarding</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white text-2xl font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{step.title}</h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">{step.description}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 h-1 bg-emerald-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
