import * as yup from 'yup'

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


export const userSignupSchema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().email('Please enter a valid email').required('Required'),
    password: yup.string().min(8).matches(passwordRules, {message: 'Please create stromger password'}).required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Required')
})

export const userLoginSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Required'),
    password: yup.string().min(8).matches(passwordRules, {message: 'Please create stromger password'}).required('Required'),
})
