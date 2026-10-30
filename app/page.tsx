"use client";

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HeartIcon } from "@heroicons/react/24/outline"
import type { Map as LeafletMap } from "leaflet"
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
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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
          <Accordion className="w-full">
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
          <HeartIcon className="h-12 w-12 text-gray-600 mx-auto mb-6" />
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
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
              </svg>
            </a>
            <a href="https://linkedin.com/company/naaltech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/*
            <a href="https://discord.gg/vXp2EdEMvr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-500 transition-colors">
              <span className="sr-only">Discord</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </a>
            */}
            <a href="https://github.com/naaltech" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
