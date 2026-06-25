import Image from "next/image";
import Link from "next/link";

export default function AdManagementRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        
        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Bütçenizi Değil, Etkinizi Büyütün</h3>
          <p>
            Dijital dünyada herkes konuşuyor ama sadece doğru stratejiye sahip olanlar duyuluyor. Sizin için sadece tıklama almıyor, bu tıklamaları doğrudan satışa ve marka sadakatine dönüştürüyoruz.
          </p>
          <p>
            Performans odaklı reklam kampanyalarımızla, bütçenizi en verimli kanallara yönlendiriyor ve yatırım getirinizi (ROI) maksimum seviyeye çıkarıyoruz.
          </p>
        </div>

        {/* Banner 1 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/ad2.png" 
            alt="Doğru Kitle, Doğru Zaman" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Doğru Kitle, Doğru Zaman
          </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Veriye Dayalı Dönüşüm Optimizasyonu</h3>
          <p>
            Reklam vermek artık sadece bir görsel ve metinden ibaret değil. Gelişmiş piksel takipleri, A/B testleri ve mikro hedeflemeler sayesinde, ürününüzle gerçekten ilgilenen kullanıcıları buluyoruz.
          </p>
          <p>
            Sürekli optimize edilen algoritmalarımızla "acaba çalışır mı?" devrini kapatıp, "ne kadar kazandırır?" sorusuna odaklanıyoruz. Hedefimiz, maliyetlerinizi düşürürken dönüşüm oranlarınızı zirveye taşımaktır.
          </p>
        </div>

        {/* Banner 2 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/ad3.png" 
            alt="Çok Kanallı Bütünleşik Medya" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Çok Kanallı Bütünleşik Medya
          </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">360 Derece Görünürlük</h3>
          <p>
            Kullanıcıların dijital yolculuğu tek bir platformla sınırlı değil. Google'da arama yaparken, Instagram'da gezinirken veya bir haber sitesini okurken karşılarına doğru mesajla çıkıyoruz.
          </p>
          <p>
            Çapraz kanal (cross-channel) pazarlama stratejilerimizle, markanızın dijital ayak izini büyütüyor ve potansiyel müşterilerinize en etkili dokunuşları yapıyoruz.
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
