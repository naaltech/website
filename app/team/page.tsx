import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from 'next'

// Team data
const formerVicePresidents = [
  {
    id: 1,
    name: "Batuhan Kurtul",
    period: "2023-2024",
    graduation: "Mezuniyet 2025",
    image: "/photos/batuhan.png"
  },
  {
    id: 2,
    name: "Eren Yıldız", 
    period: "2023-2024",
    graduation: "Mezuniyet 2026",
    image: "/photos/erenyildiz.png"
  },
  {
    id: 3,
    name: "Onur Eltuğral",
    period: "2022-2023", 
    graduation: "Mezuniyet 2024",
    image: "/photos/onur.png"
  },
  {
    id: 4,
    name: "Mustafa Yiğit Gökgöz",
    period: "2021-2022", 
    graduation: "Mezuniyet 2023",
    image: "/photos/yigit.png"
  }
]

const formerPresidents = [
  {
    id: 1,
    name: "Eren Uysal",
    period: "2023-2024",
    graduation: "Mezuniyet 2025",
    image: "/photos/erenuysal.png"
  },
  {
    id: 2,
    name: "Erdem Hacısalihoğlu",
    period: "2021-2023",
    graduation: "Mezuniyet 2024", 
    image: "/photos/erdem.png"
  },
  {
    id: 3,
    name: "Yiğit Tarık Hakan",
    period: "2019-2021",
    graduation: "Mezuniyet 2022",
    image: "/photos/tarik.png"
  }
]

export const metadata: Metadata = {
  title: 'Ekibimiz',
  description: 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü yönetim ekibi, eski kulüp başkanları ve başkan yardımcıları. Teknoloji kulübümüzü yöneten özverili bireylerle tanışın.',
  keywords: ['kulüp yönetimi', 'başkan', 'başkan yardımcısı', 'mezunlar', 'ekip', 'liderlik'],
  openGraph: {
    title: 'Ekibimiz | Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü',
    description: 'Teknoloji kulübümüzü yöneten ekip ve mezunlarımız',
  },
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ekibimiz</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Teknoloji Kulübümüzü yöneten özverili bireylerle ve başarımızın yolunu açan mezunlarımızla tanışın.
          </p>
        </div>
      </section>

      {/* Current Board Members */}
      {/*<section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mevcut Yönetim Kurulu Üyeleri</h2>
            <p className="text-gray-600">2025-2026 döneminde kulübümüzü yöneten liderlik ekibi</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Club President"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 grayscale"
                />
                <CardTitle>Elif Yılmaz</CardTitle>
                <CardDescription>Club President</CardDescription>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  12th Grade
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Leading the club with passion for AI and machine learning. Organized 15+ workshops this year.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span>elif.yilmaz@student.nahs.edu.tr</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Vice President"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 grayscale"
                />
                <CardTitle>Mehmet Kaya</CardTitle>
                <CardDescription>Vice President</CardDescription>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  11th Grade
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Specializes in web development and cybersecurity. Manages our partnership programs.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span>mehmet.kaya@student.nahs.edu.tr</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Secretary"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 grayscale"
                />
                <CardTitle>Zeynep Demir</CardTitle>
                <CardDescription>Secretary</CardDescription>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  11th Grade
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Keeps us organized and manages communications. Expert in mobile app development.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span>zeynep.demir@student.nahs.edu.tr</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Treasurer"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 grayscale"
                />
                <CardTitle>Can Özkan</CardTitle>
                <CardDescription>Treasurer</CardDescription>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  10th Grade
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Manages club finances and sponsorships. Passionate about fintech and blockchain.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span>can.ozkan@student.nahs.edu.tr</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Events Coordinator"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 grayscale"
                />
                <CardTitle>Ayşe Şahin</CardTitle>
                <CardDescription>Events Coordinator</CardDescription>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  11th Grade
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Organizes hackathons and competitions. Specializes in game development and UX design.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span>ayse.sahin@student.nahs.edu.tr</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Technical Lead"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 grayscale"
                />
                <CardTitle>Burak Yıldız</CardTitle>
                <CardDescription>Technical Lead</CardDescription>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  12th Grade
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Leads technical workshops and mentors junior members. Expert in robotics and IoT.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span>burak.yildiz@student.nahs.edu.tr</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Former Presidents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Eski Kulüp Başkanları</h2>
            <p className="text-gray-600">Kulübümüzün temellerini atan ve yönetmiş olan eski başkanlarımız</p>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl">
              {formerPresidents.map((person) => (
                <Card key={person.id} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Image
                        src={person.image}
                        alt={`Former President ${person.name}`}
                        width={80}
                        height={80}
                        className="rounded-full mx-auto mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{person.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{person.period}</p>
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-3">
                        <Calendar className="h-3 w-3" />
                        <span>{person.graduation}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Former Vice Presidents */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Eski Kulüp Başkan Yardımcıları</h2>
            <p className="text-gray-600">Kulübümüzün gelişiminde önemli rol oynayan eski başkan yardımcılarımız</p>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-4xl">
              {formerVicePresidents.map((person) => (
                <Card key={person.id} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Image
                        src={person.image}
                        alt={`Former Vice President ${person.name}`}
                        width={80}
                        height={80}
                        className="rounded-full mx-auto mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{person.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{person.period}</p>
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-3">
                        <Calendar className="h-3 w-3" />
                        <span>{person.graduation}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Advisors */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Faculty Advisors</h2>
            <p className="text-gray-600">The dedicated teachers who guide and support our club activities</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Faculty Advisor"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 grayscale"
                />
                <CardTitle>Dr. Fatma Özdemir</CardTitle>
                <CardDescription>Primary Faculty Advisor</CardDescription>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  Computer Science
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  PhD in Computer Science from Boğaziçi University. Specializes in software engineering and has been
                  guiding our club for 5 years.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span>f.ozdemir@nahsschool.edu.tr</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Faculty Advisor"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 grayscale"
                />
                <CardTitle>Murat Kılıç</CardTitle>
                <CardDescription>Technical Advisor</CardDescription>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  Mathematics
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  MSc in Applied Mathematics from ITU. Focuses on algorithms and competitive programming. Coaches our
                  competition teams.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span>m.kilic@nahsschool.edu.tr</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>*/}

      <Footer />
    </div>
  )
}
