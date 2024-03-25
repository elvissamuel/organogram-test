"use client";

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { deleteSingleQuestion, getAllQuestions, registerUserNew } from './api-calls'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import logo from '../assets/imgs/question-time-high-resolution-logo.png'
import { toast, Toaster } from 'sonner';
import DialogueBox from './components/DialogueBox';

type QuestionData = [string, { question: string; options: string[] }][];

export default function Home() {
  const [myToken, setMyToken] = useState<string>("")
  const [allQuestions, setAllQuestions] = useState<QuestionData>()
  const [openDialogue, setOpenDialogue] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string | null }>({});
  // const token = localStorage.getItem("qt-token")
  const router = useRouter()

  useEffect(()=>{
    if (typeof window !== 'undefined' && window.localStorage){
      const token = localStorage.getItem("qt-token")
      if(!token){
        router.push('/register')
      }
      setMyToken(JSON.parse(token!))
      }
  }, [router])

  // useEffect(()=>{
  //   if (token){
  //     setMyToken(JSON.parse(token))
  //   }else{
  //     setMyToken("")
  //   }
  // }, [token])
  const {data, isLoading, refetch, isError} = useQuery({
    queryKey: ['All_Questions'],
    queryFn: async () => {
      const questions = await getAllQuestions(myToken);
      console.log('all questions: ', questions)
      setAllQuestions(Object.entries(questions))
      return questions
    }, 
    enabled: myToken !== ""
  })

  const handleOptionSelect = (questionId: string, option: string) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [questionId]: option
    }));
  };

  const deleteQuestion = async (id:string)=>{
    const response = await deleteSingleQuestion(id, myToken)
    if(response){
      toast.success('Question was deleted successfully', {position: 'top-right'})
      refetch()
    }else{
      toast.error("Couldn't delete question.", {position:'top-right'} )
    }
  }
  
  // useEffect(()=>{
  //   if(myToken !== ""){
  //     router.push("/register")
  //     return
  //   }
  // }, [myToken, router])

  // if (typeof window !== 'undefined' && window.localStorage){
  //   const token = localStorage.getItem("qt-token")
  //   router.push('/register')

    // if(!token){
    // }
    // setMyToken(JSON.parse(token!))
    // }
  
    
  return (

    <main className="flex flex-col items-center justify-between  py-6">
      <Toaster richColors />
      <h2 className='text-3xl font-bold my-6'>ALL QUESTIONS</h2>
      <div className='w-[90%] md:w-2/3 flex flex-col gap-y-6'>
        {allQuestions && allQuestions?.length !== 0 ? allQuestions.map(([questionId, { question, options }]) => (
          <div className='bg-slate-50 p-4 rounded-2xl shadow relative border' key={questionId}>
            {openDialogue && <DialogueBox handleDelete={deleteQuestion} questionId={questionId} setOpen={setOpenDialogue} open={openDialogue} />}
            <div className='absolute top-2 right-3 cursor-pointer' onClick={()=>setOpenDialogue((prev)=>!prev)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-red-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className='font-semibold'>{question}</h3>
            <ul className='flex flex-col gap-y-2 mt-3'>
              {options.map((option, index) => (
                <li key={index}>
                  <label className='flex gap-2'>
                    <input
                      type="radio"
                      name={questionId}
                      value={option}
                      checked={selectedOptions[questionId] === option}
                      onChange={() => handleOptionSelect(questionId, option)}
                    />
                    {option}
                    {selectedOptions[questionId] === option && <span>&#10003;</span>}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )) : <div className='text-black mx-auto text-center mt-4'>There are no questions to display, kindly add new questions</div>}
      </div>
    </main>
  )
}
