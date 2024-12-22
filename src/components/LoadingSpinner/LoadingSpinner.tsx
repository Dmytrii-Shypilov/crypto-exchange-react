import s from "./spinner.module.scss";

const LoadingSpinner: React.FC<{size: string}> = ({size}) => {
  return (
    <div className={s.container}>
      <span className={s.spinner} style={{width: size, height: size}}></span>
    </div>
  );
};

export default LoadingSpinner;
