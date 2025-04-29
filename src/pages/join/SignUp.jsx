import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import NameStep from "./components/NameStep";
import ProfileImageStep from "./components/ProfileImageStep";
import LocationStep from "./components/LocationStep";
import OwnerStep from "./components/OwnerStep";
import GoHome from "./components/GoHome";
import { signup } from "@apis/member/signup";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    name: "",
    profileImageColor: "",
    location: "",
    role: "",
  });

  const goNext = (data = {}) => {
    setSignupData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const goBack = () => setStep((prev) => prev - 1);
  const goLogin = () => navigate("/auth");
  const goHome = () => navigate("/");

  const handleSignup = async (role) => {
    const finalData = {
      ...signupData,
      role: role.toUpperCase(),
      profileColor: signupData.profileImageColor,
    };
    try {
      await signup(finalData);
      setStep((prev) => prev + 1);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  // 애니메이션 설정
  const variants = {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <NameStep onNext={(name) => goNext({ name })} onBack={goLogin} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <ProfileImageStep
              onNext={(profileImageColor) => goNext({ profileImageColor })}
              onBack={goBack}
            />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <LocationStep
              onNext={(location) => goNext({ location })}
              onBack={goBack}
            />
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="step4"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <OwnerStep onNext={(role) => handleSignup(role)} onBack={goBack} />
          </motion.div>
        )}
        {step === 5 && (
          <motion.div
            key="step5"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <GoHome onNext={goHome} onBack={goBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
