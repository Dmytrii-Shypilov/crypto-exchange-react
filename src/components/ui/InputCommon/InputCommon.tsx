import s from './common-input.module.scss'

interface InputCommonProps extends React.InputHTMLAttributes<HTMLInputElement>{
  className?: string
  label?: string;
  error?: string

};

const InputCommon: React.FC<InputCommonProps> = ({ label, type, ...props }) => {
  return (
    <>
      {label && <label className={s.label} htmlFor={props.id}>{label}</label>}
      <input className={`${s.input} ${props.className || ''}`} type={type} {...props} />
     {props.error && <span className={s.error}>{props.error}</span>}
    </>
  );
};

export default InputCommon;
