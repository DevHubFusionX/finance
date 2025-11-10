import Navbar from '../components/layout/Navbar';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
