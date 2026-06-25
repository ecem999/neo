import Image from "next/image";
import Link from "next/link";

export default function ContentWritingRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        
        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Kelimelerin Gücüyle Zirveye Tırmanın</h3>
          <p>
            Arama motorlarında üst sıralara çıkmanın sırrı robotlara değil, insanlara dokunan kaliteli içerikten geçer. Biz, markanızın hikayesini hem Google'ın algoritmalarına hem de hedef kitlenizin kalbine uygun şekilde yazıyoruz.
          </p>
          <p>
            Her bir kelimeyi stratejik olarak seçiyor, okunabilirliği yüksek ve organik trafik çekme potansiyeli maksimum metinler üretiyoruz.
          </p>
        </div>

        {/* Banner 1 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/icerik2.png" 
            alt="SEO Uyumlu Özgün Metinler" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
            SEO Uyumlu, Organik ve Çarpıcı
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Marka Dilinizi Dijitale Taşıyoruz</h3>
          <p>
            Sıradan, tekrar eden veya sadece anahtar kelime doldurulmuş metinler okuyucuyu sıkar ve sitenizden uzaklaştırır. Biz; blog yazılarından ürün açıklamalarına, web sitesi metinlerinden kategori yazılarına kadar her satırda markanızın kendine özgü sesini yansıtıyoruz.
          </p>
          <p>
            İçeriklerimiz sayesinde ziyaretçileriniz sitenizde daha uzun süre vakit geçirir ve bu durum dönüşüm oranlarınıza doğrudan pozitif yansır.
          </p>
        </div>

        {/* Banner 2 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/icerik3.png" 
            alt="İkna Eden, Dönüştüren İçerikler" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Sadece Okunan Değil, Dönüştüren Kelimeler
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Sonuç Odaklı İçerik Stratejisi</h3>
          <p>
            Sadece yazıp bırakmıyoruz. İçeriklerin performansını ölçümlüyor, trendleri analiz ediyor ve sürekli taze kalan bir içerik döngüsü yaratıyoruz. Bilgi veren, ikna eden ve güven inşa eden içerik yapımızla sektörünüzde otorite olmanızı sağlıyoruz.
          </p>
          <p>
            Gelin, markanızın hikayesini dijitalin en etkili diliyle baştan yazalım.
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
