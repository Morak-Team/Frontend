import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SelectTag from "@/pages/writeReview/components/SelectTag";
import WriteText from "@/pages/writeReview/components/WriteText";
import Complete from "@/pages/writeReview/components/Complete";
import useUIStore from "@/store/uiStore";

const WriteReviewPage = () => {
  const [step, setStep] = useState(1);
  const { setIsWriteReview } = useUIStore();

  useEffect(() => {
    setIsWriteReview(true);
    return () => {
      setIsWriteReview(false);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white relative">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full h-full overflow-y-auto px-4 scrollbar-hide"
          >
            <SelectTag onNext={() => setStep(2)} />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <WriteText onNext={() => setStep(3)} onBack={() => setStep(1)} />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <Complete />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WriteReviewPage;
