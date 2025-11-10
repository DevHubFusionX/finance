import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{backgroundColor: '#F7FAFC'}}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(74, 85, 104, 0.1)'}}>
          <Search className="w-16 h-16" style={{color: '#4A5568'}} />
        </div>

        <h1 className="text-6xl font-bold mb-4" style={{color: '#2D3748'}}>404</h1>
        <h2 className="text-2xl font-semibold mb-4" style={{color: '#2D3748'}}>Page Not Found</h2>
        <p className="text-lg mb-8 leading-relaxed" style={{color: '#4A5568'}}>
          The page you're looking for seems to have wandered off. 
          Let's get you back to your financial journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-colors"
              style={{backgroundColor: '#2D3748', color: '#F7FAFC'}}
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </motion.button>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold border transition-colors"
            style={{borderColor: 'rgba(74, 85, 104, 0.2)', color: '#4A5568'}}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;