import React from 'react'
import { Button } from '../components'
import { MdOutlineCancel } from 'react-icons/md'

export default function Headline({ status, onClick }) {
    return (
        <div className={`py-2 bg-primary fixed ${status ? "translate-y-0" : "-translate-y-full"} top-[76px]  text-white flex justify-between items-center font-semibold text-base w-full`} >
            ABCDEFHIGKLMNOPQRSTUVWXYZ!!
            <MdOutlineCancel onClick={onClick} className='text-red-600 rounded-full text-xl' />
        </div>
    )
}
