import ServiceDetailHero from "@/components/ServiceDetailHero";
import EmailMarketingRichContent from "@/components/EmailMarketingRichContent";
import OtherServicesTags from "@/components/OtherServicesTags";
import Portfolio from "@/components/Portfolio";

export default function EpostaPazarlamaPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Blobs */}
      <div className="absolute top-[5%] -left-[10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
      <div className="absolute top-[40%] -right-[15%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
      <div className="absolute top-[80%] -left-[10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-primary/20 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />

      <ServiceDetailHero 
        title="Eposta Pazarlama" 
        description="Liste oluşturma, mailing tasarımı ve içerik üretimi ve pazarlama otomasyonu! Birlikte planlamaya hazırız."
        imageSrc="/dijital1.png"
      />
      <EmailMarketingRichContent />
      <OtherServicesTags activeTag="Eposta Pazarlama" />
      <Portfolio />
    </div>
  );
}
