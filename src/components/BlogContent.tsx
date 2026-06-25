import Image from "next/image";

interface BlogContentProps {
  content: string;
  imageSrc: string;
}

export default function BlogContent({ content, imageSrc }: BlogContentProps) {
  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10 pb-12">
      <div className="w-full aspect-[21/9] bg-gray-200 rounded-3xl overflow-hidden shadow-md relative mb-12">
        <Image 
          src={imageSrc} 
          alt="Blog Content Image" 
          fill
          className="object-cover"
        />
      </div>
      <div 
        className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed space-y-6" 
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </div>
  );
}
