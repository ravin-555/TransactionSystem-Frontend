import React from 'react'
import { useState,useRef,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {  register_user } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { div, path } from 'motion/react-client'

const Register = () => {
    const navigate=useNavigate();
    const [error, setError] = useState("")
    const [sucess, setSucess] = useState(null)

    const [cooldown, setCooldown] = useState(false) // To prevent multiple rapid submissions
    const timeref = useRef(null) // To hold the timer reference for cleanup

  const { handleSubmit,register,reset, formState: { errors ,isSubmitting}
   } = useForm()
   const [seconsleft, setSeconsleft] = useState(()=>{
    const expiryTime = localStorage.getItem('api_rate_limit_expiry');
    if(expiryTime){
        const remainingseconds= Math.ceil(Number(expiryTime-Date.now())/1000);
        return (remainingseconds >0? remainingseconds: 0);
    }
   })
   useEffect(() => {
     window.addEventListener('rate-limit',(event)=>{
        const incomingseconds= Number(event.detail.seconds)
        const expiryTimestamp = Date.now()+ (incomingseconds*1000)
        localStorage.setItem('api_rate_limit_expiry',expiryTimestamp.toString())
        if(timeref.current) clearInterval(timeref.current)
        seconsleft(incomingseconds)
     })
   
     return () => {
       window.removeEventListener('rate-limit',(event)=>{
        setSeconsleft(event.detail.seconds)
       });
     }
   }, [])

   // coumtdown timer
   useEffect(() => {
    if(seconsleft>0){
        timeref.current=setInterval(()=>{
            setSeconsleft((prev)=> prev-1)
            setError("Too many attempts. Try again after "+seconsleft+"s")
        },1000)
    }
    else if (seconsleft === 0 && timeref.current) {
        clearInterval(timeref.current);
        localStorage.removeItem('api_rate_limit_expiry'); // Clean up localStorage when cooldown ends
        setError(null) // Clear error message when cooldown ends    
        setCooldown(false) // Reset cooldown state when timer ends
    }
    
   
     return () => {
       clearInterval(timeref.current)
     }
   }, [seconsleft])
   
   

  const Onsubmit = async(data) => {
    if(cooldown) return; // Prevent multiple submits during cooldown
    setCooldown(true); // Set cooldown to true when submission starts   
    try{
        const result = await register_user(data); // Call the register function from the API

        setSucess("Sucessfully registered your Information")
        setTimeout(() => {
            navigate('/',{replace:true}); // navigate after sucesful 
            
        }, 3000);
    
    }catch(err){
        if(err.response){
            setError(err.response.data.message || "Registration Failed")
        }
    }
    setCooldown(false); // Reset cooldown after request completes
    reset(); // reset the form
  }

  return (
      <div className='min-h-screen px-4 bg-[#18042c] flex items-center justify-center'>
            <div className='w-full max-w-sm border border-white/10 bg-white/5 rounded-xl p-6 shadow-lg mx-auto mt-20'>  
                <h1 className='text-xl font-bold text-center mb-6'>Create an Account</h1>
                {error && (
                    <div className='bg-(--danger-light) text-(--danger)  p-2 rounded-md mb-4 text-center'>
                        {error}
                    </div>
                
                )}
                {sucess && (
                    <div className='bg-(--sucess)/20  text-(--sucess) mb-4 p-2 rounded-md text-center'>
                        {sucess}
                    </div>
                )}

                <form className='space-y-4' onSubmit={handleSubmit(Onsubmit)}>
                    <div>
                        <label className='block text-sm font-semibold mb-2'>Name</label>
                        <input type="text" name='name' placeholder='Register your name' autoComplete='name'
                        className='w-full px-3 py-2 rounded-md bg-bg border border-(--border) focus:outline-none focus:ring-2 focus:ring-(--primary)'
                        {...register("name",{
                            required: "Name is required",
                            minLength: {
                                value: 3,message:"Name must be 3 characters or more "
                            }
                        })}
                        />
                        {errors.name &&(
                            <p className='text-(--danger) text-sm mt-1'>
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                {/* email */}
                    <div>
                        <label className='block text-sm font-semibold mb-2'>Email</label>
                        <input type="text" name='email' placeholder='Register your e-mail adress' autoComplete='email'
                        className='w-full px-3 py-2 rounded-md bg-bg border border-(--border) focus:outline-none focus:ring-2 focus:ring-(--primary)'
                        {...register("email",{
                            required: "mail is required",
                            minLength: {
                                value: 8,message:"Email address must be 8 characters or more "
                            }
                        })}
                        />
                        {errors.name &&(
                            <p className='text-(--danger) text-sm mt-1'>
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    
                    <div>
                        <label className='block text-sm font-semibold mb-2'>Password</label>
                        <input type="password" name='password' placeholder='Create password' autoComplete='current-password'
                         className='w-full px-3 py-2 rounded-md bg-bg border border-(--border) focus:outline-none focus:ring-2 focus:ring-(--primary)' 
                         {...register("password",{
                            required:"Password is required",
                            minLength:{value:8,message:"Password must be 8 characters long or more"}
                         })}
                         />
                         {errors.password &&(
                            <p className='text-(--danger) text-sm mt-1'>{errors.password.message}</p>
                         )}
                    </div>
                    <button type='submit' disabled={isSubmitting ||cooldown || seconsleft>0}
                    className='w-full bg-linear-to-r from-[#2701478d] to-[#5e03a4] py-2 rounded-md font-medium cursor-pointer hover:opacity-80 transition disabled:opacity-50'>Create Account</button>
                </form>
            </div>
    </div>
  )
}

export default Register
