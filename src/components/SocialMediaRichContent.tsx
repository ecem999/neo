import Image from "next/image";
import Link from "next/link";

export default function SocialMediaRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        
        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Strateji, İçerik, Başarı... Etkili Sosyal Medya Yönetimi.</h3>
          <p>
            Sosyal medyada hedef kitlenize nereden ulaşabileceğinizi en iyi şekilde belirler, etkileşim kurar ve dönüşüm gerçekleştirmenizi sağlarız. İçerik takvimlerinizi oluşturur, yaratıcı kampanyalarla hedef kitlenizin sesini duymasını sağlar ve performansla ilgili önemli metrikleri gösteren raporlar hazırlarız.
          </p>
        </div>

        {/* Banner 1 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/sosyal2.png" 
            alt="Markanızın Hedefi, Bizim Çizeceğimiz Stratejiyi Belirler" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Markanızın Hedefi, Bizim Çizeceğimiz Stratejiyi Belirler.
          </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Markanızın Hedefi, Bizim Çizeceğimiz Stratejiyi Belirler.</h3>
          <p>
            Dijital Pazarlama'nın en temel dinamiklerinden olan sosyal medya; hem erişimin gücüyle hem de diğer mecralara oranla düşük bütçe ve hızlı sonuç elde etmesiyle günümüzde markaların kesinlikle varlığını sürdürmesi gereken bir alan...
          </p>
          <p>
            Neo Brand Digital; bu baş döndüren dijital gelişmeleri takip eden, doğru strateji geliştiren ve uygulayan, markanın hedef kitlesini yakalayan ve o kitleyi hep canlı tutan alanında uzman ekibiyle markanızın sosyal medyadaki gücü için çalışır.
          </p>
        </div>

        {/* Banner 2 */}
        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image 
            src="/sosyal3.png" 
            alt="Strateji Oluşturmak İlk İşimiz" 
            fill
            className="object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Strateji Oluşturmak İlk İşimiz.
          </h3>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Strateji Oluşturmak İlk İşimiz.</h3>
          <p>
            Sizin amacınız bizim çizeceğimiz stratejiyi belirler. Markanın kurumsal duruşuyla eşdeğer bir sosyal medya strateji planı oluştururuz. Burada en önemli amacımız markamızın öncelikli ihtiyacını karşılamaktır. Markanızın sosyal medyada var olma ihtiyaçlarına doğru hedeflerin strateji planımızda güncellenecektir.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 pt-4">Doğru İçerik Kraldır!</h3>
          <p>
            Biz bu anlayışı biraz değiştirdik. Her içerik değil, doğru içerik kraldır! Markanız ile tanıştık, sizi dinledik ve anladık, olması ve olmaması gerekenleri tespit ettik... Sıra geldi en can alıcı nokta olan, içerik oluşturmaya. Sizin kimliğinize uygun sosyal medya platformlarında, markanızı dijitalde yansıtan ve hedef kitlenizle birebir iletişime geçeceğiniz yaratıcı içerikler oluştururuz. Sizin tercihinize göre aylık veya haftalık içerik planları oluştururuz. İçerikleri yaratıcı görsel, gif ve videolarla zenginleştirerek onayınıza sunarız ve operasyonu başlatırız!
          </p>

          <h3 className="text-xl font-bold text-gray-900 pt-4">Kriz İle Baş Etmeyi Biliriz!</h3>
          <p>
            Bazen bir yanlış anlaşılma, bazen de bir hata... Markanızın itibarına sarsabilir. Biz sadece böyle yansısızlıklar olduğunda değil sizinle çalışmaya başladığımız andan itibaren bir kriz planı oluştururuz. Olası krizleri ele alır, olmuş olan krizlerden de ders çıkarırız.
          </p>

          <h3 className="text-xl font-bold text-gray-900 pt-4">Sosyal Medyada Başarı, Analiz Edebilmektir!</h3>
          <p>
            Sosyal medya bizim için sadece paylaşım veya takipçi artırdığımız bir alan değil. Aynı zamanda markanızın nerede olduğunu, hedef kitleye daha iyi nasıl hitap edeceğini analizlerle belirliyoruz. Haftalık ve aylık olarak sunduğumuz sosyal medya raporlarıyla sizi doğru bilgilendirmeyi çok seviyoruz!
          </p>
          <p className="font-bold text-gray-900 pt-2">
            Sosyal medya ajansı arayışı içindeyseniz sizin için buradayız!
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
