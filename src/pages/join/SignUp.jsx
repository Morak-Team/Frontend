import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NameStep from "./components/NameStep";
import ProfileImageStep from "./components/ProfileImageStep";
import LocationStep from "./components/LocationStep";
import OwnerStep from "./components/OwnerStep";
import GoHome from "./components/GoHome";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const goNext = () => setStep((prev) => prev + 1);
  const goBack = () => setStep((prev) => prev - 1);
  const goLogin = () => navigate("/auth");
  const goHome = () => navigate("/");

  return (
    <div className="relative w-full h-screen bg-white">
      {step === 1 && <NameStep onNext={goNext} onBack={goLogin} />}
      {step === 2 && <ProfileImageStep onNext={goNext} onBack={goBack} />}
      {step === 3 && <LocationStep onNext={goNext} onBack={goBack} />}
      {step === 4 && <OwnerStep onNext={goNext} onBack={goBack} />}
      {step === 5 && <GoHome onNext={goHome} onBack={goBack} />}
    </div>
  );
};

export default SignUpPage;
