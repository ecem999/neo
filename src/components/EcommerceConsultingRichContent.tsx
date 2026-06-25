import Image from "next/image";
import Link from "next/link";

export default function EcommerceConsultingRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Dijital Mağazanızın Gerçek Potansiyelini Keşfedin</h3>
          <p>
            Bir e-ticaret sitesi kurmak başarının sadece ilk adımıdır. Trafiğinizi satışa döndürmek, sepet terk etme oranlarını düşürmek ve karlılığı artırmak için veriye dayalı stratejilere ihtiyacınız var.
          </p>
        </div>

        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image src="/dijital2.png" alt="Dönüşüm Optimizasyonu" fill className="object-cover z-0" />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Satış ve Dönüşüm Optimizasyonu
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Kullanıcı Yolculuğunu Pürüzsüzleştirin</h3>
          <p>
            Ziyaretçilerinizin sitenize girdiği andan ödeme sayfasına kadar olan yolculuğunu analiz ediyor, tıkanıklık yaratan noktaları ortadan kaldırıyoruz. Hızlı ödeme adımları ve SEO uyumlu ürün sayfalarıyla satış hacminizi organik olarak büyütüyoruz.
          </p>
        </div>

        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image src="/dijital3.png" alt="Pazar Yeri Yönetimi" fill className="object-cover z-0" />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Uçtan Uca Pazar Yeri Yönetimi
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Rekabetin Önünde Olun</h3>
          <p>
            Sadece kendi web sitenizde değil, pazar yerlerinde de markanızı doğru konumlandırıyoruz. Fiyatlandırma, stok entegrasyonu ve kampanya yönetimiyle 360 derece e-ticaret süreçlerinize liderlik ediyoruz.
          </p>
        </div>

        <div className="pt-12 flex justify-center">
          <Link href="/iletisim" className="bg-primary text-white w-full max-w-md py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg uppercase tracking-wide text-center block">
            Hemen Teklif İste
          </Link>
        </div>
      </div>
    </section>
  );
}
