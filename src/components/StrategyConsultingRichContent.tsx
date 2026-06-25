import Image from "next/image";
import Link from "next/link";

export default function StrategyConsultingRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Kurumsal Dijital Zekanızı Güçlendirin</h3>
          <p>
            Kendi ekibinizle ilerlemek istiyor ancak dijital dünyadaki hızlı değişimlere yetişmekte zorlanıyorsanız, deneyimlerimizi sizinle paylaşıyoruz. Markanızın büyüme hedeflerine uygun stratejik yol haritaları çiziyoruz.
          </p>
        </div>

        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image src="/dijital2.png" alt="Süreç Optimizasyonu" fill className="object-cover z-0" />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Verimli Süreç Optimizasyonu
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Zaman ve Bütçe Tasarrufu</h3>
          <p>
            Pazarlama departmanınızın iş akışlarını analiz ediyor, hangi araçların kullanılacağı ve hangi metriklerin takip edileceği konusunda operasyonel mentörlük sağlıyoruz. Böylece deneme yanılma maliyetlerini ortadan kaldırıyoruz.
          </p>
        </div>

        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image src="/dijital3.png" alt="Know-How ve Mentörlük" fill className="object-cover z-0" />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Ekibinize Know-How Desteği
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Liderlik ve Dijital Rehberlik</h3>
          <p>
            Veri okuryazarlığı, kampanya analitiği ve dijital trendler konusunda ekibinizi eğitiyor, kapasitelerini artırıyoruz. Siz ana işinize odaklanırken, arka planda markanızın dijital beyni olarak çalışıyoruz.
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
