

import s from './container.module.scss'

const Container: React.FC<{children: React.ReactNode}> = ({children})=> {
    return <div className={s.container}>{children}</div>
}

export default Container