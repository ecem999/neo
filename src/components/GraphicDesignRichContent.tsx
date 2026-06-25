import Image from "next/image";
import Link from "next/link";

export default function GraphicDesignRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        
        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Saniyeler İçinde Etkileyin.</h3>
          <p>
            İlk izlenim her şeydir. Markanızın mesajını uzun cümleler yerine, güçlü ve akılda kalıcı görsellerle anlatıyoruz.
          </p>
          <p>
            Kreatif ekibimiz; estetiği stratejiyle birleştirerek, markanızı rakiplerinden ayıracak eşsiz bir görsel dil inşa eder.
          </p>
        </div>

        {/* Banner 1 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/grafik2.png" 
            alt="Dinamik, Modern ve Akılda Kalıcı" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Dinamik, Modern ve Akılda Kalıcı
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Harekete Geçiren Görsel İletişim</h3>
          <p>
            İster kurumsal kimlik, ister sosyal medya tasarımı, ister dijital reklam banner'ı... Ürettiğimiz her tasarım, hedef kitleyi harekete geçirmek üzere kurgulanır.
          </p>
          <p>
            Renk psikolojisi ve tipografi uzmanlığımızla, markanızın hikayesini en net ve çarpıcı şekilde ekrana yansıtıyoruz.
          </p>
        </div>

        {/* Banner 2 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/grafik3.png" 
            alt="Hareketin Gücü: Video Prodüksiyon" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Hareketin Gücü: Video Prodüksiyon
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Videoyla Mesajınızı Büyütün</h3>
          <p>
            Dijital tüketimin zirvesi: Video içerikler. Sıkıcı metinleri geride bırakıp, hikayenizi dinamik kurgular, hareketli grafikler ve kısa formatlı yaratıcı videolarla anlatıyoruz.
          </p>
          <p>
            Sizi izlenmeye, paylaşılmaya ve konuşulmaya değer kılıyoruz.
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
