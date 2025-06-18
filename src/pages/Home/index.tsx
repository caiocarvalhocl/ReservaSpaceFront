import { Layout } from '../../components/Layout';
import { Hero } from '../../components/Hero';
import { Space } from '../../components/Space';

export function Home() {
  return (
    <Layout>
      <div className='mx-auto'>
        <Hero />
        <Space />
      </div>
    </Layout>
  );
}
