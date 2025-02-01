import React from 'react'
import { Button } from '../components'


export default function ChangeSearch({onclick,flights}) {
  return (
    <div  className='flex sm:flex-row flex-col bg-white mb-4 rounded-md justify-between items-center p-4 '>
        <p className='text-gray font-semibold '>{flights} Flights Found</p>
        <div>
            <div className='flex flex-1 gap-3'>
            
                 <Button onClick={onclick} text={'Change Search'}/>
            </div>
        </div>
    </div>
  )
}
