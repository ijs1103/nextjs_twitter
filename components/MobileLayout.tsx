import Header from "@components/Header";

interface Props {
  children: React.ReactNode;
}

function MobileLayout({ children }: Props) {
  return (
    <div className="min-h-screen max-w-xl mx-auto bg-black">
      <Header />
      {children}
    </div>
  );
}

export default MobileLayout;
