import s from "./button.module.scss";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
  width?: string;

};

const Button: React.FC<ButtonProps> = ({ children, width, ...props }) => {
  return (
    <button {...props} className={s.btn} style={{ width: width ? width : "auto" }}>
      {children}
    </button>
  );
};

export default Button;
