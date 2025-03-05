import React from 'react'
import AnonForm from '@/components/anon-form'
import RateInput from '@/components/rate-input'

const page = () => {
  return (
    <div className='min-h-screen bg-base-100'>
       <RateInput/>
       <AnonForm/>
    </div>
  )
}

export default page