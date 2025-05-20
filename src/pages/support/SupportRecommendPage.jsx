import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

import Step1 from "@/pages/support/components/step/Step1";
import Step2 from "@/pages/support/components/step/Step2";
import Step3 from "@/pages/support/components/step/Step3";
import Step4 from "@/pages/support/components/step/Step4";
import Step5 from "@/pages/support/components/step/Step5";
import Step6 from "@/pages/support/components/step/Step6";
import Step7 from "@/pages/support/components/step/Step7";

const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];

const SupportRecommendPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevCategory = location.state?.category || "consummer";

  const [userInfo, setUserInfo] = useState({});
  const [step, setStep] = useState(0);
  const [recommendResult, setRecommendResult] = useState(null);

  const CurrentStep = steps[step];

  const nextStep = (newData) => {
    setUserInfo((prev) => ({ ...prev, ...newData }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="relative w-full container overflow-y-auto scrollbar-hide">
      <div className="px-5 pt-3 flex justify-between items-center">
        <div className="w-1/3" />
        <img
          onClick={() => navigate(`/support?category=${prevCategory}`)}
          src="/svgs/support/company/xIcon.svg"
          className="w-8 h-8 cursor-pointer"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentStep
            onNext={nextStep}
            onBack={prevStep}
            defaultValue={userInfo}
            userInfo={userInfo}
            setRecommendResult={setRecommendResult}
            recommendResult={recommendResult}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SupportRecommendPage;
