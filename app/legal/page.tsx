import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { FileText, Shield, Users, AlertCircle, Mail, ExternalLink, Building } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yasal Belgeler',
  description: 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü kulüp tüzüğü, davranış kuralları, güvenlik protokolleri ve Hack Club mali sponsorluk belgeleri.',
  keywords: ['kulüp tüzüğü', 'davranış kuralları', 'güvenlik kuralları', 'hack club', 'fiscal sponsorship'],
  openGraph: {
    title: 'Yasal Belgeler | Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü',
    description: 'Teknoloji kulübü yasal belgeleri, politikalar ve yönergeler',
  },
}

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Yasal Belgeler</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Teknoloji Kulübü üyelerimiz ve faaliyetlerimiz için önemli yasal bilgiler, politikalar ve yönergeler.
          </p>
        </div>
      </section>

      {/* Legal Documents Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12 max-w-6xl mx-auto">
            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <FileText className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Kulüp Tüzüğü</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-gray-600">Kulübümüzün resmi tüzük ve yönetmeliği</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Building className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Mali Sponsorluk</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">Hack Club mali sponsorluk belgeleri</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Davranış Kuralları</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">Üyeler için beklenen davranış ve etik kuralları</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <AlertCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Güvenlik Kuralları</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">Laboratuvar ve ekipman kullanım güvenliği</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardHeader className="text-center">
                <Mail className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Üyelik Başvuru</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">Kulübe üyelik başvuru formu</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Kulüp Tüzüğü */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Kulüp Tüzüğü
              </CardTitle>
              <CardDescription>Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü Resmi Tüzüğü</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Tüzük İçeriği</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-2">
                  <li><strong>A – Genel Hükümler:</strong> Kulübün adı, amacı ve faaliyet alanları</li>
                  <li><strong>B – Kulüp Üyeliği:</strong> Üyelik koşulları, haklar ve sorumluluklar</li>
                  <li><strong>C – Kulüp Organları:</strong> Yönetim yapısı ve görev dağılımı</li>
                  <li><strong>D – Defter ve Evraklar:</strong> Kayıt tutma ve dokümantasyon</li>
                  <li><strong>E – Çeşitli Hükümler:</strong> Diğer önemli kurallar ve prosedürler</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Tam Tüzük Dokümanı</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Kulüp tüzüğünün tam metnini incelemek ve detaylı bilgi almak için:
                </p>
                <a 
                  href="https://drive.google.com/file/d/13CRHrLPIWo8jSA_qAyJHc7Vv244oNwzy/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <FileText className="h-4 w-4" />
                  Kulüp Tüzüğünü İncele
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Önemli Not</h4>
                <p className="text-sm text-yellow-800">
                  Tüm kulüp üyeleri bu tüzüğü okumak ve kurallara uymakla yükümlüdür. 
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Hack Club Fiscal Sponsorship */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Hack Club Fiscal Sponsorship
              </CardTitle>
              <CardDescription>Mali sponsorluk ve vergi muafiyeti belgeleri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Mali Sponsorluk Durumu</h3>
                <p className="text-green-800 mb-4">
                  Kulübümüz, The Hack Foundation (Hack Club) tarafından mali olarak desteklenmektedir. 
                  Bu, kulübümüzün 501(c)(3) vergi muafiyeti statüsünden yararlanmasını sağlar.
                </p>
                <ul className="list-disc list-inside text-green-800 space-y-2">
                  <li>Bağışlar vergiden düşülebilir</li>
                  <li>Şeffaf mali yönetim</li>
                  <li>Hack Club Bank sistemi ile güvenli fon yönetimi</li>
                  <li>Uluslararası finansal işlemler desteği</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Mali Belgeler</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Hack Club fiscal sponsorship kapsamındaki resmi belgeler:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <a 
                    href="https://drive.google.com/file/d/1Jzs34mLhugLQko0gXMV54HCEcg1_zWZb/view?usp=sharing"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Verification Letter
                  </a>
                  <a 
                    href="https://drive.google.com/file/d/1cmiBF5sfKpVJaQ7DghWnjVHh3vo09e-i/view?usp=sharing"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Fiscal Sponsorship Confirmation
                  </a>
                  <a 
                    href="https://drive.google.com/file/d/1VF-E4u8Vt9suZxg0VdwVUzs4e6FlA5tw/view?usp=sharing"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Certificate of Status
                  </a>
                  <a 
                    href="https://drive.google.com/file/d/1OPCDRGJQMfN0ymmmyv0RKEvOlYP0MO_u/view?usp=sharing"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    IRS 501(c)(3) Certificate
                  </a>
                  <a 
                    href="https://drive.google.com/file/d/1yhqNWn9uo14H6roIU6eDL4p-k_5PqMa-/view?usp=sharing"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Hack Club W-9 Form
                  </a>
                  <a 
                    href="https://drive.google.com/file/d/1JOTGcIMSLCN8DkvHZoXfJjHnwjtRFWFf/view?usp=sharing"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Hack Foundation 990
                  </a>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Bağış Yapın</h4>
                <p className="text-sm text-blue-800 mb-3">
                  501(c)(3) statümüz sayesinde yapacağınız bağışlar vergiden düşülebilir. 
                  Bağışlarınız doğrudan kulüp faaliyetlerimizi destekler.
                </p>
                <a 
                  href="https://hcb.hackclub.com/donations/start/naaltech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  Hack Club Bank üzerinden bağış yapın
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Davranış Kuralları */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Davranış Kuralları
              </CardTitle>
              <CardDescription>Kulüp üyelerinden beklenen davranış standartları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Temel Kurallar</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-2">
                  <li>Herkese saygılı ve nazik davran.</li>
                  <li>İletişiminde düşünceli ol.</li>
                  <li>Yıkıcı, kışkırtıcı ya da dışlayıcı davranışlardan kaçın.</li>
                  <li>Herhangi bir sorunla karşılaşırsan, kulüp danışman öğretmenine veya kulüp yürütme ekibine haber ver.</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Detaylı Davranış Kuralları</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Kulübümüzün tam davranış kuralları dokümanını incelemek için:
                </p>
                <a 
                  href="https://drive.google.com/file/d/1ycNpqLvlb4mPEAnLnmDZrSjIIBFGBd6y/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <FileText className="h-4 w-4" />
                  Tam Davranış Kuralları Dokümanı
                </a>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Kural İhlalleri</h4>
                <p className="text-sm text-yellow-800">
                  Davranış kurallarının ihlali uyarı, geçici uzaklaştırma veya kulüpten kalıcı çıkarma ile sonuçlanabilir. 
                  Tüm disiplin işlemleri kulüp danışman öğretmeni ile birlikte değerlendirilir. Gereken durumlarda okul idaresi ve rehberlik servisi ile işbirliği yapılır.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Güvenlik Kuralları
              </CardTitle>
              <CardDescription>Laboratuvar çalışmaları ve ekipman kullanımı için güvenlik protokolleri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Genel Güvenlik Kuralları</h3>
                <ul className="list-disc list-inside text-blue-800 space-y-2">
                  <li>Laboratuvar faaliyetleri sırasında mutlaka kulüp danışman öğretmeni bulunmalıdır</li>
                  <li>Herhangi bir kaza, yaralanma veya ekipman hasarını derhal bildiriniz</li>
                  <li>Çalışma alanlarını temiz ve düzenli tutarak kazaları önleyiniz</li>
                  <li>Acil çıkış yolları, yangın söndürücüler ve ilk yardım kitlerinin yerlerini biliniz</li>
                  <li>Laboratuvara yiyecek ve içecek getirmeyiniz</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Ekipman Güvenliği</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Teknoloji kulübü ekipmanlarını kullanırken dikkat edilmesi gerekenler:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Herhangi bir ekipmanı kullanmadan önce uygun eğitimi alınız</li>
                  <li>Kullanım öncesi ekipmanları kontrol ediniz, arıza varsa bildiriniz</li>
                  <li>Ekipmanları sadece amaçlanan şekilde ve belirtilen sınırlar içinde kullanınız</li>
                  <li>Kullanım sonrası ekipmanları kapatıp uygun şekilde saklayınız</li>
                  <li>3D yazıcı, lehimleme istasyonu gibi özel ekipmanlar için ek güvenlik kurallarına uyunuz</li>
                </ul>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Elektriksel Güvenlik</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Elektronik projeler ve devre çalışmaları için önemli kurallar:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Devreler aktifken elektriksel bileşenlerle çalışmayınız</li>
                  <li>Uygun araçları kullanınız ve gerekli güvenlik ekipmanlarını takınız</li>
                  <li>Sıvıları elektriksel ekipman ve bağlantılardan uzak tutunuz</li>
                  <li>Elektriksel tehlike veya endişelerinizi derhal danışman öğretmene bildiriniz</li>
                  <li>Arduino, Raspberry Pi gibi geliştirme kartlarını kullanırken güç kaynaklarına dikkat ediniz</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Acil Durum Prosedürleri</h4>
                <p className="text-sm text-yellow-800">
                  <strong>Yangın durumunda:</strong> Derhal tahliye edin ve acil servisleri arayın<br/>
                  <strong>Elektriksel acil durumlarda:</strong> Güvenliyse elektriği kesin<br/>
                  <strong>Yaralanma durumunda:</strong> Eğitimli iseniz ilk yardım yapın, değilse derhal yardım isteyin<br/>
                  <strong>Tüm olayları</strong> kulüp danışmanı ve okul idaresine bildirin
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </section>

      {/* Üyelik Başvuru Formu */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Üyelik Başvuru Formu
              </CardTitle>
              <CardDescription>Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü Üyelik Başvuru Formu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Başvuru Süreci</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Form Seçin</h4>
                      <p className="text-blue-700 text-sm">Dijital form (online başvuru) veya fiziksel form (indirip yazdırarak) seçeneklerinden birini tercih edin.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Formu Doldur</h4>
                      <p className="text-blue-700 text-sm">Seçtiğiniz forma göre üyelik başvuru formunu eksiksiz olarak doldurun.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Teslim Edin</h4>
                      <p className="text-blue-700 text-sm">Dijital form otomatik olarak gönderilir. Fiziksel formu doldurduysanız kulüp sekreterine teslim edin.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">4</div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Değerlendirme</h4>
                      <p className="text-blue-700 text-sm">Başvurunuz kulüp yönetim kurulu tarafından incelenir</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">5</div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Sonuç Bildirilir</h4>
                      <p className="text-blue-700 text-sm">Başvuru sonucu e-posta veya telefon numaranız aracılığıyla bildirilir</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/join-us"
                >
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
                    <Mail className="h-4 w-4 mr-2" />
                    Dijital Form (Online Başvuru)
                  </Button>
                </Link>
                <Link 
                  href="https://drive.google.com/file/d/1ktWXiVtVRq4WHPkZ_1KU02EGvY2ITrzO/view" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Fiziksel Form (İndir/Yazdır)
                  </Button>
                </Link>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">Önemli Bilgilendirme</h4>
                    <p className="text-amber-800 text-sm">
                      Bu form sadece Nevzat Ayaz Anadolu Lisesi öğrencileri için geçerlidir. Başvuru yapmadan önce 
                      kulüp tüzüğünü ve davranış kurallarını okumanızı önemle tavsiye ederiz.
                    </p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
