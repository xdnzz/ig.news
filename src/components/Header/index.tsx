import styles from './style.module.scss';
import {SignInButton} from '../SignInButton/'

export function Header(){
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.png" alt="ig.news"/>
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Posts</a>
                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}