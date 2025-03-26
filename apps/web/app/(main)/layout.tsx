import HomeNavbar from "@/components/home/home-nav";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <HomeNavbar />
      {children}
    </main>
  );
}
