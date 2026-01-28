import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-teal-600">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Join the Movement?</h2>
        <p className="text-xl text-emerald-50 mb-8 leading-relaxed">
          Start buying, selling, or donating materials today. Build your impact, connect with creators, and shape a more
          sustainable future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 text-base h-12 font-semibold">
            Create Free Account
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 text-base h-12 font-semibold bg-transparent"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
