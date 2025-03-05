import AnonForm from '@/components/anon-form'
import RateInput from '@/components/rate-input'
import React from 'react'

const page = () => {
  return (
    <div className='bg-base-100 space-y-2 flex flex-col justify-center items-center'>
        <RateInput/>
        <AnonForm/>
    </div>
  )
}

export default page