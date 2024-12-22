import s from "./fallback.module.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useLocation } from "react-router-dom";

const LoadingFallback: React.FC = () => {
    const path = useLocation().pathname;
    const isTradePath = path.startsWith("/trade") 
  
  return (
    <div className={isTradePath? s.fallback_dark:s.fallback}>
      <LoadingSpinner size="50px" />
    </div>
  );
};

export default LoadingFallback;
