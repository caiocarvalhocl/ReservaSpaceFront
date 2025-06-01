import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Space } from './components/Space';

export function App() {
  return (
    <>
      <Header />
      <div className='bg-cyan-50 min-w-full min-h-screen'>
        <Hero />
        <Space />
      </div>
      <Footer />
    </>
  );
}
