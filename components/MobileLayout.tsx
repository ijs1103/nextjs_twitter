interface Props {
  children: React.ReactNode;
}

function MobileLayout({ children }: Props) {
  return (
    <div className="min-h-screen max-w-xl mx-auto bg-black">{children}</div>
  );
}

export default MobileLayout;
