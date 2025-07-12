import React from 'react'
import { IoAlertCircleOutline } from "react-icons/io5";

function Notfound() {
    return (
        <div className='w-full h-full'>
            <div className='flex flex-col sm:flex-row justify-center items-center gap-x-3'>
                <IoAlertCircleOutline className='size-15' />
                <p className='text-xl'>No Blogs Found!</p>
            </div>
        </div>
    )
}

export default Notfound