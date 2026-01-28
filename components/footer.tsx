import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                <span className="text-sm font-bold text-white">EC</span>
              </div>
              <span className="text-lg font-bold text-white">EcoCycle</span>
            </div>
            <p className="text-sm text-gray-400">Transforming waste into opportunity through smart upcycling.</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Browse Materials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Sell Materials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Upcycled Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Impact Report
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2026 EcoCycle. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-white transition">
              Twitter
            </Link>
            <Link href="#" className="hover:text-white transition">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-white transition">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
