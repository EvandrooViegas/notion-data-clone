import React from 'react'
import { IoClose } from 'react-icons/io5'
import useViews, { View as IView } from '../../../hooks/useViews'

interface IProps extends IView {}
export default function View({ name, image, Icon, id }:IProps) {
  const { removeView } = useViews()
  return (
    <li className='flex justify-between items-center font-semibold px-4 py-3 mx-2 bg-zinc-700 rounded-md md:bg-zinc-800 cursor-pointer'>
        <div className='flex items-center gap-4'>
          <p><Icon /></p>
          <p>{ name }</p>
        </div>
        <div>
          <button onClick={() => removeView(id)}>
            <IoClose />
          </button>
        </div>
    </li>
  )
}
