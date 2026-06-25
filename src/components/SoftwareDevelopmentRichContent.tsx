import Image from "next/image";
import Link from "next/link";

export default function SoftwareDevelopmentRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Fikirlerinizi Dijital Gerçekliğe Dönüştürüyoruz</h3>
          <p>
            Standart hazır paketler yerine, işletmenizin iş akışına tam uyum sağlayan özel yazılım çözümleri geliştiriyoruz. Hem güvenli hem de yüksek performanslı mimarilerle dijital dönüşümünüze hız katıyoruz.
          </p>
        </div>

        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image src="/dijital2.png" alt="Ölçeklenebilir Teknolojik Altyapılar" fill className="object-cover z-0" />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Ölçeklenebilir Sistem Mimarisi
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Geleceğe Hazır Kodlama Altyapısı</h3>
          <p>
            Projenizi, en yeni teknolojiler ve modern framework'ler kullanarak inşa ediyoruz. Bu sayede uygulamanız sadece bugün değil, artan kullanıcı trafiğiyle gelecekte de sorunsuz çalışacak şekilde ölçeklenebiliyor.
          </p>
        </div>

        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image src="/dijital3.png" alt="Mobil Uyumluluk" fill className="object-cover z-0" />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
            %100 Mobil ve Platform Uyumluluğu
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Kusursuz Kullanıcı Deneyimi</h3>
          <p>
            Masaüstü, tablet ve mobil cihazlarda aynı mükemmel performansı sunan (cross-platform ve responsive) sistemler geliştiriyoruz. İhtiyacınız olan CRM, ERP veya mobil uygulamaları hızla ve hatasız teslim ediyoruz.
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
