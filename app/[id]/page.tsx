import React from 'react'
import AnonForm from '@/components/anon-form'
import RateInput from '@/components/rate-input'

const page = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-primary to-secondary'>
       <RateInput/>
       <AnonForm/>
    </div>
  )
}

export default page