
import { useState } from "react";

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

import '../sign-up-form/sign-up-form.styles.scss'


// Trabalhando com "listeners" de inputs simuntânemanete.
// 1. Agrupar todos os campos em um objeto cujo a KEY será o NAME do campo
// e iniciará com value VAZIO

const defaultFormFields = {
    displayName: '',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () => {

    // 2. O Objeto criado será passado como valor de inicialização do State
    // (por isso o value deve ser vazio) 

    //2.1 formFields contem a referência das variáveis
    //e setFormFields será usado para alterar 
    //o value do objeto principal (defaultFormFields)

    const [ formFields, setFormFields ] = useState(defaultFormFields)

    //Desestruturando as KEYS para conseguir acessar individualmente
    const { displayName, email, password, confirmPassword } =  formFields;

    console.log('🔥 Hit')
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('Password do not match')
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );


            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields()
        
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot creation user, email already in use')
            } else {
                console.log('User creation encountered an error',error)
            }
        }


    }

    const handleChange = (event) => {
        //permite acessar todos atributos/props do event
        const { name, value } = event.target;

        //despejou todas as KEYS para atribuir ao name o value do input
        setFormFields({...formFields, [name]:value })
    }
  
    
    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName}
                />
                
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
                
                <FormInput
                    label='Confirm Password'
                    type='password'
                    required 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword}
                />

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;