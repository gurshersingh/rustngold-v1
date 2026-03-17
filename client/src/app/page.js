import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import About from '@/components/About';
import MenuSection from '@/components/MenuSection';
import Gallery from '@/components/Gallery';
import Hours from '@/components/Hours';
import Enquiry from '@/components/Enquiry';
import Footer from '@/components/Footer';
import PromoModal from '@/components/PromoModal';
import FloatingPromoButton from '@/components/FloatingPromoButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <main>
        <PromoModal />
        <FloatingPromoButton />
        <About />
        <MenuSection />
        <Gallery />
        <Hours />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
