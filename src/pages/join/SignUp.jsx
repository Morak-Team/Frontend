import { useState } from "react";
import NameStep from "./components/NameStep";
import ProfileImageStep from "./components/ProfileImageStep";

const SignUpPage = () => {
  const [step, setStep] = useState(1);

  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () => setStep((prev) => prev - 1);

  return (
    <div className="relative w-full h-screen bg-white">
      {step === 1 && <NameStep onNext={goNext} />}
      {step === 2 && <ProfileImageStep onNext={goNext} onBack={goBack} />}
      {/* {step === 3 && <LocationStep onNext={goNext} onBack={goBack} />}
      {step === 4 && <OwnerStep onNext={goNext} onBack={goBack} />} */}
    </div>
  );
};

export default SignUpPage;
