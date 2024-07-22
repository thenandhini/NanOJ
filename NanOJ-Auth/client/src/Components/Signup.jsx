import React, { useState } from 'react'
import '../App.css'
import Axios from 'axios'
const Signup = () => {


    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault()
        Axios.post
            ('http://localhost:8000/signup', 
            { 
            firstname, 
            lastname, 
            email,
             password ,
            })
            .then(response=>console.log(response))
            .catch(err=>console.log(error))
            console.log(firstname,lastname,email,password);
            
       
    }


    return (

        <div className='sign-up-container'>

            <form className="sign-up-form" onSubmit={handleSubmit}>

                <h1>Sign Up to Code with NanOJ</h1>

                <label htmlFor="firstname">Firstname:</label>
                <input
                    type="text"
                    placeholder='Firstname'
                    onChange={(event) =>

                        setFirstName(event.target.value)} />

                <label htmlFor="lastname">Lastname:</label>
                <input
                    type="text"
                    placeholder='Lastname'
                    onChange={(event) =>

                        setLastName(event.target.value)} />

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

                <button type='submit'>Signup</button>


            </form>

        </div>
    )
}

export default Signup