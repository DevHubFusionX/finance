import Navbar from '../components/layout/Navbar';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <HowItWorks />
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
