import Image from "next/image";

interface ServiceDetailHeroProps {
  title: string;
  description: string;
  imageSrc: string;
}

export default function ServiceDetailHero({ title, description, imageSrc }: ServiceDetailHeroProps) {
  return (
    <section className="pt-32 pb-12 relative z-10 text-center">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a202c] mb-6 tracking-tight">{title}</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
