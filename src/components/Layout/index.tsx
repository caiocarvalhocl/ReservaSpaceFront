import { Footer } from '../Footer';
import { Header } from '../Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='w-full sm:w-10/12 flex mx-auto min-h-screen max-w-full'>{children}</div>
      <Footer />
    </>
  );
}
