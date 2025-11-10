import { X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useErrorStore } from '../../store/errorStore';

const ErrorToast = () => {
  const { errors, removeError } = useErrorStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {errors.map((error) => (
          <motion.div
            key={error.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="bg-danger/10 border border-danger/20 rounded-lg p-4 max-w-sm shadow-lg"
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-danger mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-danger">{error.message}</p>
                {error.details && (
                  <p className="text-xs text-danger/70 mt-1">{error.details}</p>
                )}
              </div>
              <button
                onClick={() => removeError(error.id)}
                className="text-danger/70 hover:text-danger"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ErrorToast;