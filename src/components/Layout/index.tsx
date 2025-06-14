import { Footer } from '../Footer';
import { Header } from '../Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='w-full sm:w-10/12 flex mx-auto max-w-full'>{children}</div>
      <Footer />
    </>
  );
}
