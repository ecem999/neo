import Image from "next/image";
import Link from "next/link";

export default function WebDesignRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        
        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Dijital Dünyadaki Vitrininiz: Web Siteniz</h3>
          <p>
            Kullanıcıların markanızla dijital dünyada kurduğu ilk temas noktası olan web siteniz, sadece bir adres değil; aynı zamanda kurumsal kimliğinizin ve vizyonunuzun en önemli yansımasıdır. Biz, bu yansımayı en kusursuz haliyle inşa etmek için çalışıyoruz.
          </p>
          <p>
            Standart kalıpların ötesine geçerek, markanızın ruhunu yansıtan ve kullanıcı beklentilerini maksimum düzeyde karşılayan, estetik ile teknolojinin harmanlandığı projeler üretiyoruz.
          </p>
        </div>

        {/* Banner 1 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/web2.png" 
            alt="Kullanıcı Odaklı UI/UX Deneyimi" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Kusursuz UI/UX Tasarım Deneyimi
          </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Hedef Kitleye Uygun Tasarım Mimarisi</h3>
          <p>
            Başarılı bir web sitesi sadece iyi görünmekle kalmaz, aynı zamanda kullanıcısına pürüzsüz bir gezinme deneyimi sunar. UI (Kullanıcı Arayüzü) ve UX (Kullanıcı Deneyimi) tasarım süreçlerimizde, ziyaretçilerinizin sitenizde kolayca aradığını bulmasını ve dönüşüm hunisinde sorunsuzca ilerlemesini hedefliyoruz.
          </p>
          <p>
            Her tıklamanın, her formun ve her görselin arkasında derin bir strateji yatar. Karmaşıklıktan uzak, sade, modern ve kullanıcı dostu arayüzlerle markanızın dijital itibarını güçlendiriyoruz.
          </p>
        </div>

        {/* Banner 2 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/web3.png" 
            alt="Mobil Uyumluluk ve Yüksek Performans" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Mobil Uyumluluk ve Yüksek Performans
          </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Her Ekrandan Kusursuz Erişim</h3>
          <p>
            Trafiğin büyük bir kısmının mobil cihazlardan geldiği günümüz dünyasında, "Responsive" (mobil uyumlu) olmayan bir tasarım düşünülemez. Geliştirdiğimiz tüm web projelerinde; telefondan tablete, masaüstü bilgisayardan dev ekranlara kadar her cihazda esnek ve kusursuz çalışan yapılar kuruyoruz.
          </p>
          <p>
            Sadece tasarımla yetinmiyor; güncel kodlama standartları, hızlı yüklenme süreleri ve SEO uyumlu altyapılarla desteklenen, arama motorlarının da çok sevdiği güvenli web siteleri geliştiriyoruz.
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
