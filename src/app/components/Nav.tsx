"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../assets/imgs/question-time-high-resolution-logo.png'
import { usePathname } from 'next/navigation';

type Props = {}

const Nav = (props: Props) => {
  const path = usePathname()

  return (
    <div>
      <nav className='flex items-center justify-around border'>
          <div className='h-[80px]'>
            <Image className='object-fill w-full h-full' src={logo} alt='logo' />
          </div>

          {path.includes('create') ? <Link  className='shadow text-sm font-semibold p-2 rounded-lg' href='/'>View all question</Link>
           : 
           path.includes('register') ? null :
           <Link className='shadow text-sm font-semibold p-2 rounded-lg' href="/create-question">Add New Questions</Link>}
        </nav>
    </div>
  )
}

export default Nav