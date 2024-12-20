import s from "./spinner.module.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={s.container}>
      <span className={s.spinner}></span>
    </div>
  );
};

export default LoadingSpinner;
