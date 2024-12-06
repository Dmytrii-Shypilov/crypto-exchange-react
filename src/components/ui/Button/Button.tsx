import { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode,
    width: string,
    color: 'green' | 'red'
}

const Button: React.FC<ButtonProps> = ({children, width}) => {
    
    return <button style={{color: width}}>{children}</button>
}

export default Button
