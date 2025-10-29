// my-restaurant-app/src/app/page.jsx
import Header from '@/components/Header';
import MenuSection from '@/components/MenuSection';
import Gallery from '@/components/Gallery';
import Enquiry from '@/components/Enquiry';
import PromoModal from '@/components/PromoModal';
import FloatingPromoButton from '@/components/FloatingPromoButton';
export default function Home() {
  return (
    <div className="site">
      <Header />
      <main>
        <PromoModal /> {/* New Promo Popup */}
        <FloatingPromoButton />
        <MenuSection />
        <Gallery />
        <Enquiry />
      </main>
    </div>
  );
}