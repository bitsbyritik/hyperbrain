export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full lg:w-2/5 lg:-ml-44 border-x border-border h-full">
        {children}
      </div>
    </div>
  );
}
