import React from 'react'
import { Button } from '../components'
import { MdSearch } from 'react-icons/md'
import dayjs from 'dayjs'


export default function ChangeSearch({ tripDetail, onclick, flights }) {
  (tripDetail)
  return (
    <div className='flex sm:flex-row flex-col bg-white mb-4 rounded-md justify-between gap-2 md:items-center p-4 '>
      <div>
        <p className='text-text font-semibold pb-1'>{flights} Flights Found</p>

        <p className='flex items-end gap-3 text-text text-sm'>
          <span>Departure Date: {dayjs(tripDetail.departureDate).format('ddd-DD-MMM-YYYY')}</span> |
          <span>{tripDetail.tripType == "Return" ? "Round Trip" : "One Way"}</span>
        </p>

      </div>
      <div>
        <div className='flex flex-1 gap-3'>

          <Button icon={<MdSearch />} onClick={onclick} text={'Change Search'} />
        </div>
      </div>
    </div>
  )
}
