import {FaGithub} from 'react-icons/fa';
import {FiX} from 'react-icons/fi';
import style from './style.module.scss';
import {signIn, signOut, useSession} from 'next-auth/react';

export function SignInButton(){

const { data: session } = useSession();

console.log(session)


    return session ? (
        (
            <button 
            type="button"
            className={style.signInButton}
            onClick={()=>signOut()}
            >
                <FaGithub color="#04d361"/>
            {session.user.name}
            <FiX color="#737380" className={style.closeIcon}/>
            </button>
        )
    ) : (
        (
            <button 
            type="button"
            className={style.signInButton}
            onClick={()=>signIn('github')}
            >
                <FaGithub color="#eba417"/>
            Sign in With Github
            </button>
        )
    )
}