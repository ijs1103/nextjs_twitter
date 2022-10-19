import Header from "@components/layout/Header";

interface Props {
  title?: string;
  children: React.ReactNode;
}

function MobileLayout({ title, children }: Props) {
  return (
    <div className="max-w-xl min-h-screen mx-auto bg-black">
      <Header title={title} />
      {children}
    </div>
  );
}

export default MobileLayout;
