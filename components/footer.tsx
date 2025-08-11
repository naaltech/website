import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">naaltech</h3>
            <p className="text-gray-600 text-sm">
              Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Sayfalar</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-gray-900">
                  Ekibimiz
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-gray-900">
                  Yasal Belgeler
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-gray-900">
                  Başvuru
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">İletişim</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Nevzat Ayaz Anadolu Lisesi</p>
              <p>İnkılap Mah. Yelkenciler Sok. No: 1</p>
              <p>Ümraniye, İstanbul, Türkiye</p>
              <p>
                <a href="mailto:tech@naal.org.tr" className="hover:text-gray-900 underline">
                  tech@naal.org.tr
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-6 pt-6 text-center text-sm text-gray-500">
          <p className="mb-2">&copy; {new Date().getFullYear()} Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü. | Bu proje <a href="https://raw.githubusercontent.com/naaltech/website/refs/heads/main/LICENSE" className="hover:text-gray-600 underline">GPLv3</a> ile lisanslanmıştır.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-xs text-gray-400">
            <p>
              Fiscally sponsored by <a href="https://the.hackfoundation.org/" className="hover:text-gray-600 underline">The Hack Foundation</a>, a 501(c)(3) nonprofit (EIN: 81-2908499)</p>
            <span className="hidden sm:inline">•</span>
            <p>
              Açık Kaynak: <a href="https://github.com/naaltech/website" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 underline">GitHub</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

