import s from "./auth-form.module.scss";
import { useFormik } from "formik";
import { useState } from "react";
import { userSignupSchema, userLoginSchema } from "../../schemas";
import Button from "../ui/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { signUpUser, loginUser } from "../../redux/user/user-operations";
import { getUserData } from "../../redux/user/user-selector";
import { AppDispatch } from "../../redux/store";
// import { UserLoginType, UserSignupType } from "../../constants";


const AuthorizationForm: React.FC = () => {
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const {isLoading} = useSelector(getUserData)

  const initialValues = formType === "signup"
  ? { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
  : { email: '', password: '' };
  const dispatch = useDispatch<AppDispatch>()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues,
      validationSchema: (formType === 'signup' ? userSignupSchema : userLoginSchema),
      onSubmit: (values) => {
        if (formType === "signup" && values.firstName && values.lastName && values.confirmPassword) {
          dispatch(
            signUpUser({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
            })
          );
        } else if (formType === 'login') {
          dispatch(
            loginUser({
              email: values.email,
              password: values.password,
            })
          );
        }
        resetForm(); 
      },
    });
    

  const getClassName = (input: keyof typeof values) => {
    return errors[input] && touched[input] ? "input_error" : "input";
  };

  const getTabClass = (tab: "signup" | "login") => {
    return tab === formType ? s.tab_active : s.tab;
  };

  const changeTab = (tabName: "login" | "signup") => {
    resetForm();
    setFormType(tabName);
  };

  const renderInputField = (name: keyof typeof values, label: string, type: string = "text") => {
    return (
      <div className={s.input}>
        <label className="label">{label}</label>
        <input
          className={getClassName(name)}
          name={name}
          type={type}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors[name] && touched[name] && <span className="error">{errors[name]}</span>}
      </div>
    );
  };

 

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.formTabs}>
        <span className={getTabClass("login")} onClick={() => changeTab("login")}>
          Log In
        </span>
        <span className={getTabClass("signup")} onClick={() => changeTab("signup")}>
          Sign Up
        </span>
      </div>

      {formType === "signup" && renderInputField("firstName", "First Name")}
      {formType === "signup" && renderInputField("lastName", "Last Name")}
      
      {renderInputField("email", "Email", "email")}
      {renderInputField("password", "Password", "password")}

      {formType === "signup" && renderInputField("confirmPassword", "Confirm Password", "password")}
      {isLoading && <p>...Loading</p>}
      <div className={s.btnWrapper}>
        <Button width="100%" type='submit'>{formType === "signup" ? "Sign Up" : "Log In"}</Button>
      </div>
    </form>
  );
};

export default AuthorizationForm;
