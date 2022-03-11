type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <main className='grid items-start justify-center px-6 bg-very-light-gray-background min-h-screen'>
      {children}
    </main>
  );
}

export default Layout;
