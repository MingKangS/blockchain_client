
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = ({size = 20}) => {
  
  return (
    <FaSpinner className="loading-spinner" style={{fontSize: size}}/>
  );
};

export default LoadingSpinner;
