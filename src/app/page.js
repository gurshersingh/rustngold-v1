// my-restaurant-app/src/app/page.jsx
import { SITE } from '@/data';
import Header from '@/components/Header';
import MenuSection from '@/components/MenuSection';
import Gallery from '@/components/Gallery';
import Enquiry from '@/components/Enquiry';

export default function Home() {
  return (
    <div className="site">
      <Header />
      <main>
        <MenuSection />
        <Gallery />
        <Enquiry />
      </main>
    </div>
  );
}