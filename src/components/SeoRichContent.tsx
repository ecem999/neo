import Image from "next/image";
import Link from "next/link";

export default function SeoRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        
        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Doğru İçerik, Optimizasyon, Verimlilik.</h3>
          <p>
            Web siteniz için, hedef kitlenizin markanızı veya ürününüzü arama motorlarında daha kolay bulması için performans odaklı anahtar kelime stratejisi ve içerik optimizasyonu sağlarız.
          </p>
        </div>

        {/* Banner 1 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/seo2.png" 
            alt="Organik Olarak Artan Satış Verimliliği" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Organik Olarak Artan Satış Verimliliği
          </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Organik Olarak Artan Satış Verimliliği</h3>
          <p>
            Markanız için organik olarak artan satış, artan kârlılık ve azalan maliyet verimliliği inşa ederiz. Kalıcı başarı için SEO stratejilerini markanızın hedefleri doğrultusunda şekillendiriyoruz.
          </p>
          <p>
            Neo Brand Digital olarak uzman SEO ekibimizle markanızın dijital varlığını sürdürülebilir bir büyüme ivmesine geçiriyoruz.
          </p>
        </div>

        {/* Banner 2 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/seo3.png" 
            alt="Sürdürülebilir Dijital Başarı" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Sürdürülebilir Dijital Başarı
          </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Teknik ve İçerik SEO Uyumlu Web Siteleri</h3>
          <p>
            Arama motorlarının algoritmalarını yakından takip ediyor, teknik optimizasyonları ve içerik stratejilerini buna göre güncelliyoruz. Böylece web siteniz her zaman üst sıralarda yer alıyor.
          </p>
          <p>
            Doğru ve etkili SEO çalışması arıyorsanız doğru yerdesiniz!
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-12 flex justify-center">
          <Link href="/iletisim" className="bg-primary text-white w-full max-w-md py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg uppercase tracking-wide text-center block">
            Hemen Teklif İste
          </Link>
        </div>
      </div>
    </section>
  );
}
