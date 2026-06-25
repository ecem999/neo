import Image from "next/image";
import Link from "next/link";

export default function EmailMarketingRichContent() {
  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-left text-gray-700 space-y-12">
        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Müşterilerinizin Kutusunda Değil, Aklında Yer Edinin</h3>
          <p>
            E-posta pazarlama, doğru kullanıldığında yatırım getirisi (ROI) en yüksek dijital pazarlama kanallarından biridir. Sadece e-posta göndermekle kalmıyor, hedef kitlenizle bağ kuran, kişiselleştirilmiş bültenler hazırlıyoruz.
          </p>
        </div>

        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image src="/dijital2.png" alt="Otomasyon ve Kişiselleştirme" fill className="object-cover z-0" />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <h3 className="relative z-10 text-white text-3xl md:text-5xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Akıllı Otomasyon Kurguları
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Sepette Kalanları Kazanca Dönüştürün</h3>
          <p>
            Müşterilerinize doğru zamanda doğru mesajı iletmek için e-posta otomasyon sistemleri kuruyoruz. Hoş geldin serileri, sepet terk etme hatırlatmaları ve özel gün indirimleriyle dönüşüm oranlarınızı katlıyoruz.
          </p>
        </div>

        <div className="relative w-full h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-md flex items-center justify-center">
          <Image src="/dijital3.png" alt="Yüksek Açılma Oranları" fill className="object-cover z-0" />
          <div className="absolute inset-0 bg-black/20 z-0"></div>
          <h3 className="relative z-10 text-white text-2xl md:text-4xl font-bold text-center tracking-wide drop-shadow-md px-4">
            Yüksek Açılma ve Tıklanma Oranları
          </h3>
        </div>

        <div className="space-y-4 text-lg leading-relaxed">
          <h3 className="text-xl font-bold text-gray-900">Verilerle Büyüyen Stratejiler</h3>
          <p>
            Spam kutusuna düşmeyen, merak uyandıran konu başlıkları ve tıklamaya teşvik eden içeriklerle mailing kampanyalarınızı optimize ediyor, her gönderimde raporlarla başarıyı kanıtlıyoruz.
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
