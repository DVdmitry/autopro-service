import { HeroHome } from '@/components/home/HeroHome';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { WhyUs } from '@/components/home/WhyUs';
import { Reviews } from '@/components/home/Reviews';
import { CtaBanner } from '@/components/home/CtaBanner';

export default function Home() {
  return (
    <main>
      <HeroHome />
      <ServicesPreview />
      <WhyUs />
      <Reviews />
      <CtaBanner />
    </main>
  );
}
