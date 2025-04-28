import Navbar from "@/components/home/navbar";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto md:w-9/12 w-11/12">
      <div className="mt-4">
        <Navbar />
      </div>
      {children}
    </main>
  );
}
