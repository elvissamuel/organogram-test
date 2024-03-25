"use client";
import React, { useEffect, useState } from 'react'
import { createQuestion } from '../api-calls';
import { Toaster, toast } from 'sonner'
import { CreateQuestionResponse } from '../model';

type Props = {}

const Page = (props: Props) => {
  const [accessToken, setAccessToken] = useState("")
  const [clearField, setClearField] = useState(false)

  useEffect(()=>{
    if (typeof window !== 'undefined' && window.localStorage){
      const token = localStorage.getItem("qt-token") ?? ''
      setAccessToken(JSON.parse(token))
      }
  }, [])

  // useEffect(()=>{
  //   if(token){
  //     setAccessToken(JSON.parse(token))
  //   }
  // }, [token])

  const [formData, setFormData] = useState({
    question: '',
    options: ['']
  });

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      question: e.target.value
    });
  };
  
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const newOptions = [...formData.options];
    newOptions[index] = e.target.value;
    setFormData({
      ...formData,
      options: newOptions
    });
  };

  const handleAddOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, '']
    });
  };

  const handleRemoveOption = (index: number): void => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      options: newOptions
    });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => { 
    e.preventDefault();
    console.log(formData);
    const response: CreateQuestionResponse | undefined = await createQuestion(formData, accessToken);
    if (response) {
      toast.success("Question was created successfully!", {position: 'top-right'});
      console.log("question response: ", response);
      setClearField(true)
      setFormData({
        question: '',
        options: ['']
      })

    }
  };

  return (
    <div className='mt-6'>
      <Toaster richColors />
      <div className='w-[90%] md:w-[70%] lg:w-[50%] mx-auto border p-8 flex flex-col gap-4 shadow rounded-lg'>
        <h2 className='font-bold border-t border-b py-2' >CREATE QUESTION</h2>
        <form className='flex flex-col gap-y-6' onSubmit={handleSubmit}>
        <div>
          <label className='block my-2'>Question:</label>
          <input className='border-b bg-slate-50 px-2 outline-none focus:outline-none shadow py-2 w-full' type="text" value={formData.question} onChange={handleQuestionChange} />
        </div>
        <div>
          <label className='my-2 block'>Options:</label>
          <div className='grid md:grid-cols-2 gap-4 '>
            {formData.options.map((option, index) => (
              <div className='flex items-center relative' key={index}>
                <input
                  type="text"
                  className='px-2 rounded-full outline-none focus:outline-none shadow border py-1 w-full'
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                />
                <button className=' absolute right-0' type="button" onClick={() => handleRemoveOption(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7 text-red-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='flex text-sm font-semibold flex-col gap-1 mx-auto w-[70%] md:w-[50%]'>
          {formData.options.length < 5 && (
              <button className='border rounded-full py-2 bg-green-600 hover:bg-green-700 text-white' type="button" onClick={handleAddOption}>Add Option</button>
            )}
          <button className='border rounded-full bg-blue-600 hover:bg-blue-700 text-white py-2' type="submit">Submit</button>
          <a href='/' className='border text-center bg-teal-600 hover:bg-teal-700 text-white rounded-full py-2' type="submit">View all questions</a>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Page