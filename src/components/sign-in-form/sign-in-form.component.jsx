/*  Trata das formas de entrar no Site.
    Utilizando Email e senha
    ou Autenticação do Google
*/

import { useState } from "react";

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'


import { 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import '../sign-in-form/sign-in-form.styles.scss'

// Trabalhando com "listeners" de inputs simuntânemanete.
// 1. Agrupar todos os campos em um objeto cujo a KEY será o NAME do campo
// e iniciará com value VAZIO

const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () => {

    // 2. O Objeto criado será passado como valor de inicialização do State
    // (por isso o value deve ser vazio) 

    //2.1 formFields contem a referência das variáveis
    //e setFormFields será usado para alterar 
    //o value do objeto principal (defaultFormFields)

    const [ formFields, setFormFields ] = useState(defaultFormFields)

    //Desestruturando as KEYS para conseguir acessar individualmente
    const { email, password } =  formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await signInAuthUserWithEmailAndPassword(
                email, 
                password
            );
            resetFormFields()
        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        //permite acessar todos atributos/props do event
        const { name, value } = event.target;

        //despejou todas as KEYS para atribuir ao name o value do input
        setFormFields({...formFields, [name]:value })
    }
  
    
    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email}
                />
                
                <FormInput 
                    label='Password'
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password}
                />
               <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
               </div>
            </form>
        </div>
    )
}

export default SignInForm;