import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col relative z-10">
        {/* Global Background Blobs */}
        <div className="absolute top-[5%] -left-[10%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/50 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] bg-primary/50 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
        <div className="absolute top-[80%] -left-[10%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] bg-primary/50 blur-[120px] lg:blur-[150px] rounded-full pointer-events-none -z-10 aspect-square" />
        
        {children}
      </main>
      <Footer />
    </>
  );
}
