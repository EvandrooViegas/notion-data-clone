import React, { useMemo } from 'react'
import { useModal } from '../../hooks/useModal'
import { useStatus } from '../../hooks/useStatus'
import useViews from '../../hooks/useViews'
import { StatusValue, View, ViewData } from '../../types/View'
import StatusDataCard from '../status-data-card'

type Props = {
  valueId: string,
  statusId: string,
  viewId?: string
}
export default function SwitchViewStatusData({ valueId, statusId, viewId }:Props) {
  const getView = useViews(s => s.getView)
  const updateView = useViews(s => s.updateView)
  const getStatus = useStatus(s => s.getStatus)
  const closeModal = useModal(s => s.closeModal)
  const status = useMemo(() => getStatus({ statusId }), [statusId])
  const view = useMemo(() => getView(status.ref.viewId), [status.ref.viewId])
  const statusValues = status.values
  const handleValueSelect = (nValue:StatusValue) =>  {
    const nData:ViewData[] = view.data.map(d => ({
        ...d,
        value: d.value.map(v => {
          if(v.ref.valueId === valueId) 
            return { 
              ...v, 
              value: nValue, 
              ref: { ...v.ref, valueId: nValue.id } 
            }
          
          else 
            return v
        })
      })
    )
    const nView:View = { ...view, data: nData }
    updateView(view.id, nView)
    closeModal()
  }
  return (
    <div className='flex flex-col gap-1 px-4 py-4'>
      {statusValues.map((value) => (
        <StatusDataCard value={value} key={value.id} />
        // <div 
        //  key={value.id}
        //  className='py-2 px-3 font-semibold rounded-md cursor-pointer' 
        //  style={{ backgroundColor: value.color }}
        //  onClick={() => handleValueSelect(value)}
        // >
        //   {value.text}
        // </div>
      ))}
    </div>
  )
}
