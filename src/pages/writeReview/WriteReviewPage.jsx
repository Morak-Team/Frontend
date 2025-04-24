import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SelectTag from "@/pages/writeReview/components/SelectTag";
import WriteText from "@/pages/writeReview/components/WriteText";
import Complete from "@/pages/writeReview/components/Complete";

const WriteReviewPage = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-white overflow-hidden relative">
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
