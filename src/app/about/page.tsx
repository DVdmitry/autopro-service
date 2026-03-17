import { AboutPage } from '@/components/about/AboutPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team — AutoPro Service Gdynia',
  description: 'Meet our team of 8 certified mechanics. Each specialist has years of hands-on experience.',
};

export default function Page() {
  return <AboutPage />;
}
