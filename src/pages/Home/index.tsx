import { Layout } from '../../components/Layout';
import { Hero } from '../../components/Hero';
import { Space } from '../../components/Space';

export function Home() {
  return (
    <Layout>
      <div className='bg-cyan-50 min-w-full min-h-screen'>
        <Hero />
        <Space />
      </div>
    </Layout>
  );
}
