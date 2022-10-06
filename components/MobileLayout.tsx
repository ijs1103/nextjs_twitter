import Header from "@components/Header";

interface Props {
  children: React.ReactNode;
}

function MobileLayout({ children }: Props) {
  return (
    <div className="max-w-xl min-h-screen mx-auto bg-black">
      <Header />
      {children}
    </div>
  );
}

export default MobileLayout;
