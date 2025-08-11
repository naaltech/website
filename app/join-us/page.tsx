"use client";

import { useEffect } from 'react'
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import Head from 'next/head'

export default function BasvuruPage() {
  // Tally embed script yükle
  useEffect(() => {
    // Metadata'yı dinamik olarak ekle
    document.title = 'Başvuru Yap | Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü';
    
    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', "Nevzat Ayaz Anadolu Lisesi Teknoloji Kulübü'ne katılın! Başvuru formunu doldurun ve teknoloji dünyasında yolculuğunuza başlayın.");

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'başvuru, üyelik, teknoloji kulübü, katılım, form');

    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Kulübümüze Katılın
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Teknoloji dünyasında yolculuğunuza başlamaya hazır mısınız? 
            Aşağıdaki formu doldurarak bizimle iletişime geçin.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <iframe
              data-tally-src="https://tally.so/embed/meMMLk?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Kulüp Başvuru Formu"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
