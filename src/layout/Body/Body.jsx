import cl from './Body.module.css';

export const Body = ({children}) => {
    return (
        <main className={cl.body}>
            {children}
        </main>
    )
}


