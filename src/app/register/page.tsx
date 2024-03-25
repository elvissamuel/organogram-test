"use client";

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { registerUserNew } from '../api-calls'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const handleSubmit = async ()=>{
    setLoading(true)
    if(email !== ""){
    const response = await registerUserNew({email: email})
    if(response) {
      toast.success("Registered successfully", {position: 'top-right'})
      setLoading(false)
      setTimeout(() => {
        router.push("/create-question")
      }, 1000);
    }else{
      toast.error("Registration failed")
    }
    }
  }

  useEffect(()=>{
    if(email !== "" && !email.includes("@")){
      setError(true)
    }else{
      setError(false)
    }
  }, [email])

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Toaster richColors />
         <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="block w-full outline-none px-3 rounded-md border-0 py-1.5 pr-10  ring-1 ring-inset ring-slate-200 focus:ring-2 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
              defaultValue="adamwathan"
              aria-invalid="true"
              aria-describedby="email-error"
            />
            {error && <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>}
          </div>
          {error && <p className="mt-2 text-sm text-red-600" id="email-error">
            Not a valid email address.
          </p>}
          <button onClick={()=> handleSubmit()} className='border py-1.5 px-4 my-1 bg-teal-500 text-white text-sm font-semibold'>Submit</button>
        </div>
    </main>
  )
}
