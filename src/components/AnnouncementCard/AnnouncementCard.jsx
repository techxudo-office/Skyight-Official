import React from 'react'
import { CardLayoutContainer } from '../CardLayout/CardLayout'

export default function AnnouncementCard() {
    return (
        <CardLayoutContainer>
            <div className='p-5 flex '>
                <div className='flex-1 flex-col flex'>
                    <p className='p-3 rounded-md border border-primary bg-bluebg text-text'>Featured</p>


                </div>
                <div>
                    <img src="https://storage.googleapis.com/ag-production-storage/flyNas.png?Expires=1739561744&GoogleAccessId=aeroglobe-production%40projectx-298909.iam.gserviceaccount.com&Signature=kTJyE7HvFngGtEvkV1VLNUI45UNCCocvMa%2BePyUXYJKcp%2F77kTjKBl10%2BjLJO5N%2BoH5mBnPwPEEXlzzCoBLEfWQ7c7kq0qlaZZMtjXSJz0to71xmymRmBsV0w9GjPhh6Kr6SHFij1tV0KQcg48zoYFNdeW66kmFd6PHg9W12JdCc707nak7RitYTTkf9wS%2B8FnBi5sxzxnxA8bxEkZNafV1LcXfOaCr%2FhctYGnHEjPon9l%2BeqIEYc2TEkBMTj8CzptyyB3h02%2BTBrexaEs%2FnoO9I1KQwMK272rIWXJaS9jIEb7oPDRoFuvlm%2FaSiTH1jA4pgS5GBGwmV5yuNcQ8Fmw%3D%3D" alt="" />
                </div>
            </div>

        </CardLayoutContainer>
    )
}
