import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className={`grid items-start px-8 bg-very-light-gray-background
                        dark:bg-very-dark-blue-background
                        min-h-screen 
                        lg:px-24 lg:auto-rows-min
                        2xl:px-60
                        `}>
        {children}
      </main>
    </>
  );
}

export default Layout;
