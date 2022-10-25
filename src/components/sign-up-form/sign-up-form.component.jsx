
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

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
            await createUserDocumentFromAuth(user, {displayName})
            alert('User created successfully')
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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type='string' required onChange={handleChange} name='displayName' value={displayName}></input>
                
                <label>Email</label>
                <input type='email' required onChange={handleChange} name='email' value={email}></input>
                
                <label>Password</label>
                <input type='password' required onChange={handleChange} name='password' value={password}></input>
                
                <label>Confirm Password</label>
                <input type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}></input>

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;