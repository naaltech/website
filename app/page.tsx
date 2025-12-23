"use client";

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { MapPin, Users, Code, Cpu, Globe, Heart, Mail, Phone, MapIcon, Instagram, Linkedin, Github } from "lucide-react"
import { siDiscord } from "simple-icons"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import clubsData from "@/lib/clubs.json"

// Leaflet'i dinamik olarak yükle
let L: any = null;
if (typeof window !== 'undefined') {
  L = require('leaflet');
  
  // Özel Hack Club ikonu tanımla
  const hackClubIcon = L.icon({
    iconUrl: 'https://assets.hackclub.com/icon-rounded.png',
    iconRetinaUrl: 'https://assets.hackclub.com/icon-rounded.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
    shadowSize: [0, 0]
  });
  
  // Default ikonu da güncelle
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://assets.hackclub.com/icon-rounded.png',
    iconRetinaUrl: 'https://assets.hackclub.com/icon-rounded.png',
    shadowUrl: '',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
}

interface Club {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status?: string;
}

export default function HomePage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Popup'ı sayfa yüklendiğinde göster
  useEffect(() => {
    setShowPopup(true);
  }, []);

  // Ana sayfa için metadata'yı dinamik olarak ekle
  useEffect(() => {
    document.title = 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü';
    
    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü - Geleceğin teknolojilerini bugünden keşfeden, üreten ve paylaşan bir topluluk. Yazılım, robotik ve siber güvenlik alanlarında eğitim ve projeler.');
  }, []);

  // Kulüp verilerini yükle
  useEffect(() => {
    try {
      // Airtable formatından dönüştür ve sadece aktif kulüpleri filtrele
      const formattedClubs = clubsData.map((club: any) => ({
        id: club.id,
        name: club.fields["Club Name"] || "Unknown Club",
        latitude: club.fields.Latitude || 0,
        longitude: club.fields.Longitude || 0,
        status: club.fields.Status || "unknown"
      })).filter((club: any) => 
        club.latitude !== 0 && 
        club.longitude !== 0 && 
        club.name !== "Unknown Club" &&
        club.status === "active"
      );
      
      setClubs(formattedClubs);
    } catch (error) {
      console.error('Kulüp verileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Haritayı başlat
  useEffect(() => {
    if (!L || !mapContainerRef.current || clubs.length === 0) return;

    // Eğer harita zaten varsa temizle
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Yeni harita oluştur
    const map = L.map(mapContainerRef.current).setView([39.9334, 32.8597], 2); // Dünya görünümü

    // Harita katmanı ekle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Özel Hack Club ikonu tanımla
    const hackClubIcon = L.icon({
      iconUrl: 'https://assets.hackclub.com/icon-rounded.png',
      iconRetinaUrl: 'https://assets.hackclub.com/icon-rounded.png',
      iconSize: [25, 25],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
      shadowSize: [0, 0]
    });

    // Kulüp markerları ekle
    clubs.forEach((club) => {
      const marker = L.marker([club.latitude, club.longitude], { icon: hackClubIcon }).addTo(map);
      
      marker.bindPopup(`
        <div class="p-3 min-w-[200px]">
          <h3 class="font-bold text-lg text-gray-900 mb-2">${club.name}</h3>
          <p class="text-xs text-green-600 font-semibold mt-2">${club.status}</p>
        </div>
      `);
    });

    mapRef.current = map;

    // Component unmount olduğunda haritayı temizle
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [clubs]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Tasfiye Duyuru Popup'ı */}
      <AlertDialog open={showPopup} onOpenChange={setShowPopup}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-center">
              Önemli Duyuru
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-4 pt-4">
              <p className="text-lg font-semibold text-gray-900">
                Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü tasfiye edilmiştir.
              </p>
              <p className="text-sm text-gray-600">
                Kulübümüz, kuruluşundan bu yana teknoloji tutkunu öğrencilere ev sahipliği yapmış ve birçok başarıya imza atmıştır.
              </p>
              <p className="text-sm text-gray-600">
                Tüm üyelerimize, danışman öğretmenlerimize ve destekçilerimize sonsuz teşekkürler.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="w-full bg-gray-900 hover:bg-gray-800">
              Anladım
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Nevzat Ayaz Anadolu Lisesi
            <span className="block text-gray-600">Teknoloji Kulübü</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Geleceğin teknolojilerini bugünden keşfeden, üreten ve paylaşan bir topluluk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <Link href="/join-us" className="w-full sm:w-auto">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 w-full sm:w-auto px-8">
                Başvuru Yap
              </Button>
            </Link>
            <Link href="mailto:tech@naal.org.tr" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent w-full sm:w-auto px-8"
              >
                İletişim
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Club Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kulübümüz Hakkında</h2>
              <p className="text-gray-600 mb-4">
                Kulübümüz, Nevzat Ayaz Robotik Kulübü olarak 2019 yılında kurulmuştur. 2020 yılında okulumuzun Bilim Kulübü ile birleşerek çalışmalarına Bilim Kulübü Teknoloji Bölümü adıyla devam etmiştir. 2022 yılında ise Bilim Kulübü’nden ayrılarak, Teknoloji Kulübü adıyla yeniden bağımsız bir yapı kazanmıştır.
              </p>
              <p className="text-gray-600 mb-6">
                Kulübümüzün amacı; okul içinde ve dışında yazılım, robotik ve siber güvenlik alanlarında çeşitli faaliyetler düzenlemek, bu alanlara ilgi duyan öğrencileri bir araya getirerek üretken bir topluluk oluşturmaktır.
              </p>
              <p className="text-gray-600 mb-6">
        Tüm çalışmalarımızı, Nevzat Ayaz Anadolu Lisesi bünyesinde resmi olarak sürdürmekteyiz.              
              </p>
              <p className="text-gray-600 mb-6">
        Kulübümüz ayrıca, The Hack Foundation’ın bir projesi olan Hack Club’a üyedir ve "Hack Club Bank" tarafından mali olarak desteklenmektedir.           
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <Image
                src="/hackathon.png"
                alt="Students working in tech lab"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hack Club World Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dünya Çapında Hack Club Toplulukları</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hack Club ağında yer alan aktif kulüplerin konumlarını keşfedin. 
              Her işaret farklı bir okul ve topluluğu temsil ediyor.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Kulüp verileri yükleniyor...</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Toplam <span className="font-semibold text-blue-600">{clubs.length}</span> aktif kulüp
                  </p>
                </div>
                <div 
                  ref={mapContainerRef}
                  className="h-96 w-full rounded-lg border border-gray-200"
                  style={{ minHeight: '400px' }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-600">
              Sıkça sorulan sorulara ve kulübümüzle ilgili merak edilen konulara buradan ulaşabilirsiniz.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">Katılmak için ön bilgi gerekiyor mu?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Katılmak için her dönem başında düzenlenen kayıt formunu doldurmanız yeterlidir. Önceden programlama bilgisi gerekmemektedir - her seviyeden öğrenciyi bekliyoruz.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">Okul dışından katılımcı alıyor musunuz?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
               Maalesef yalnızca Ümraniye Nevzat Ayaz Anadolu Lisesi öğrencilerini kabul edebiliyoruz. Ancak bazı online etkinliklerimiz herkese açıktır. Katılmak istersen, @naaltech Instagram hesabımızı takip ederek duyurularımızdan haberdar olabilirsin.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">Hangi programlama dillerini öğretiyorsunuz?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Python, JavaScript, Java, C++, web geliştirme (HTML, CSS, React) gibi geniş bir teknoloji yelpazesini kapsıyoruz.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">Kulübe kayıt ya da katılım için herhangi bir ücret alınıyor mu?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Kulüp üyeliği ücretsizdir. Ancak, bazı özel etkinlikler ve atölye çalışmaları için küçük katılım ücretleri talep edilebilir.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">Dönem içerisinde katıldığınız yarışmalar oluyor mu?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Evet, dönem içerisinde çeşitli yarışmalara katılıyoruz. Bu yarışmalar, öğrencilerin öğrendiklerini uygulama fırsatı bulduğu ve diğer okullardan öğrencilerle rekabet ettiği etkinliklerdir. Katılmak isteyen öğrenciler için bilgilendirme yapılacaktır.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Sponsors Section */}
      {/*
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Sponsors & Partners</h2>
            <p className="text-gray-600">
              We're grateful for the support of these organizations that help make our programs possible.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=80&width=120"
                alt="Sponsor 1"
                width={120}
                height={80}
                className="grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=80&width=120"
                alt="Sponsor 2"
                width={120}
                height={80}
                className="grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=80&width=120"
                alt="Sponsor 3"
                width={120}
                height={80}
                className="grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=80&width=120"
                alt="Sponsor 4"
                width={120}
                height={80}
                className="grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Donate Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-12 w-12 text-gray-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hedeflerimize Destek Verin</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Bağışlarınız, daha iyi ekipman sağlamamıza, daha fazla etkinlik düzenlememize ve öğrencilerin teknoloji alanında
            başarılı olmaları için fırsatlar yaratmamıza yardımcı oluyor. Her katkı bir fark yaratır.
          </p>
          <a 
            href="https://hcb.hackclub.com/donations/start/naaltech" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">
              Bağış Yap
            </Button>
          </a>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Kulübümüze Katılın</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Teknoloji dünyasında yolculuğunuza başlamaya hazır mısınız? 
            Başvuru formunu doldurarak bize katılın ve geleceğin teknolojilerini birlikte keşfedelim.
          </p>
          <Link href="/join-us">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">
              Başvuru Formu
            </Button>
          </Link>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-6 bg-white border-t ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            <a href="https://instagram.com/naaltech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com/company/naaltech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://discord.gg/vXp2EdEMvr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-500 transition-colors">
              <span className="sr-only">Discord</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d={siDiscord.path} />
              </svg>
            </a>
            <a href="https://github.com/naaltech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
