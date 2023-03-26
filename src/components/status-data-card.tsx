import { shallow } from "zustand/shallow"
import { useModal } from "../hooks/useModal"
import { useStatus } from "../hooks/useStatus"
import useViews from "../hooks/useViews"
import { useMemo } from "react"
import SwitchViewStatusData from "./modals/switch-view-status-data"
import { StatusValue } from "../types/View"
type StatusDataProps = {
    value?: StatusValue,
    onClick?: () => void,
    valueId?: string,
    isOpenModalOnClick?: boolean, //open data list modal on click event
}
export default function StatusDataCard({ 
    valueId,
    value: propsValue, 
    isOpenModalOnClick = false,
    onClick
}:StatusDataProps) {
    //zustand hooks
    const { getStatus, getStatusValue } = useStatus(s => ({ getStatus: s.getStatus, getStatusValue: s.getStatusValue }), shallow)
    const { openModal } = useModal(s => ({ openModal: s.openModal }), shallow)
    const { getView } = useViews(s => ({ getView: s.getView }), shallow)
    //get the value 
    valueId = propsValue?.id ?? valueId! 
    const value =  propsValue ?? getStatusValue({ valueId })
    //make sure the value is valid
    if(!value) return null
   

    const status = useMemo(() => getStatus({ statusId: value.ref.statusId }), [valueId])
    const view = useMemo(() => getView(status.ref.viewId), [valueId])

    const handleClick = () => {
        onClick?.()
        if (isOpenModalOnClick) 
            openModal({
                element: <SwitchViewStatusData valueId={valueId} viewId={view.id} statusId={status.id} />,
                data: { title: "Select your new Data" },
                payload: { viewId: view.id }
            })
        // do other stuff
    }
    return (
        <div 
         className="
            transition
            flex items-center gap-1.5
            px-3 py-1 rounded-md font-semibold 
            border border-dashed border-neutral-500
            cursor-pointer  
            hover:scale-90
         " onClick={handleClick}
        >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: value.color }}>

            </div>
            <span>
                {value.text}
            </span>
        </div>
    )
}