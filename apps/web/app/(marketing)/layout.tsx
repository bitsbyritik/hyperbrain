import Navbar from "@/components/home/navbar";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-full mx-auto w-full max-w-11/12 md:w-9/12 px-4 md:px-12 lg:px-20">
      <div className="mt-4">
        <Navbar />
      </div>
      {children}
    </main>
  );
}
