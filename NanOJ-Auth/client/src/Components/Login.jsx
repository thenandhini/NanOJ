import React, { useState } from 'react'
import '../App.css'
import Axios from 'axios'
const Login = () => {


    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault()
        Axios.post
            ('http://localhost:8000/login', 
            { 
            
            email,
             password ,
            })
            .then(response=>console.log(response))
            .catch(err=>console.log(error))
            console.log(email,password);
            
       
    }


    return (

        <div className='sign-up-container'>

            <form className="sign-up-form" onSubmit={handleSubmit}>

                <h1>Login to Code with NanOJ</h1>


                

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    placeholder='Email'
                    onChange={(event) =>

                        setEmail(event.target.value)} />

                <label htmlFor="password">Password:</label>

                <input
                    type="password"
                    placeholder='Password'
                    onChange={(event) =>
                        setPassword(event.target.value)} />

                <button type='submit'>Login</button>


            </form>

        </div>
    )
}

export default Login