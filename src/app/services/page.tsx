import { ServicesPage } from '@/components/services/ServicesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — AutoPro Service Gdynia',
  description: 'Full range of car services: oil change, brakes, diagnostics, tires, AC, engine, transmission, bodywork, detailing.',
};

export default function Page() {
  return <ServicesPage />;
}
