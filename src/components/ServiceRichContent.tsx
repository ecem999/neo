import Image from "next/image";
import Link from "next/link";

export default function ServiceRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        
        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Hayal Et, Hedef Belirle, Gerçekleştir.</h3>
          <p>
            Neo Brand Digital olarak dijital strateji yönetimiyle markanızın, kullanıcı kitlesiyle en verimli şekilde etkileşime geçmesi için çalışıyoruz.
          </p>
          <p>
            Hedef kitlenizi potansiyel müşterilerinize dönüştürmek için, dijital mecralarda ihtiyaçlarınıza yönelik öneriler sunar, etkili çözümlerle markanızı doğru zamanda doğru yerde konumlandırırız.
          </p>
        </div>

        {/* Banner 1 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/dijital2.png" 
            alt="Strateji Doğru Adımlarla Başlar" 
            fill
            className="object-cover z-0"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md">
            Strateji Doğru Adımlarla Başlar.
          </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Strateji Doğru Adımlarla Başlar.</h3>
          <p>
            Artık markaların dijital dünyada da bir yol göstericiye ihtiyaçları var...
          </p>
          <p>
            Dijital strateji yönetimi; her adımın dikkate alınması gereken, doğru analiz ve uzmanlık gerektiren bir süreçtir.
          </p>
          <p>
            Neo Brand Digital, bir pusula görevi izleyerek markanızın dijital varlığının oluşması ve gelişmesi için uzman stratejistlerle var gücüyle çalışır.
          </p>
        </div>

        {/* Banner 2 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/dijital3.png" 
            alt="Strateji ve Hedeflerin Güncellenmesi Gerekebilir" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md">
            Strateji ve Hedeflerin Güncellenmesi Gerekebilir.
          </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Strateji ve Hedeflerin Güncellenmesi Gerekebilir.</h3>
          <p>
            Markanız ile çalışmaya başladığımız an, markanızın şu ana kadar dijital dünyada ne gibi şekillerde var olduğunu araştırırız. Yaptığımız çıkarımlar, atacağımız kararlar ve doğru adımlar ile strateji haritanızın ilk basamaklarını belirleriz.
          </p>
          <p>
            Düzenli sunulan raporlar, analizler ve aksiyon haritalarıyla, dijital strateji yönetimini destekleyip geliştirmeye çalışırız.
          </p>
          <p>
            Hedeflenen ve planlanan stratejiler rakiplerin ve piyasanın hamlelerine göre değişmesi gerekebilir. Gündemi yakından takip eden dinamik ekipler aylık güncel stratejilerle yol haritanızı çizeriz.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 pt-4">Dijital Hedefler Değişebilir.</h3>
          <p>
            Her zaman doğrudan yana bir ekip olarak "esneklik" dijital strateji yönetimindeki en önemli kurallarımızdan biridir. Markanızın geleceği ile ilgili hedefleriniz büyüdükçe biz de dijital dünyada hedeflerinizi belirleriz. Burada en önemli nokta; ulaşılabilir ve gerçekçi olmamızdır. Sunduğumuz hizmetlerle dikinen esnekliği ve operasyonlardaki rahatlığı sizlere sağlarız.
          </p>

          <h3 className="text-xl font-bold text-gray-900 pt-4">Analiz, Markanızın Dijitaldeki Geleceğini Belirler.</h3>
          <p>
            Marka ve rakiplerin analizi, sektör incelemesi, pazar araştırması, hedef kitle analizi, dijital reklam modelleme, tasarım, marketing ve SEO gibi başlıklarda yaptığımız çalışmaları; tecrübemizle birleştirip markanızın maksimum verimi almasını sağlarız.
          </p>
          <p>
            Doğru dijital strateji oluşturmak kadar doğru analiz etme yeteneği de olmazsa olmaz kurallarımızdandır!
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
