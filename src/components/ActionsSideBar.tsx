import React from 'react'
import { BiTrash } from 'react-icons/bi'
import { TbColumnInsertRight } from "react-icons/tb"
import { useModal } from '../hooks/useModal'
import useViews from '../hooks/useViews'
import { View } from '../types/View'
import getDataTypeIcon from '../utils/getDataTypeIcon'
import CreateColumnModal from './modals/CreateColumnModal'
import ViewStatusModal from './modals/view-status-modal'

type Props = {
    id: View["id"]
}
type Payload = {
    viewId: View["id"]
}
export default function ActionsSideBar({ id }:Props) {
    const removeView = useViews(state => state.removeView)
    const openModal = useModal((s) => s.openModal)
    const getView = useViews((s) => s.getView)

    const view = getView(id)

    const handleCreateColumn = () => openModal({
        element: <CreateColumnModal />,
        data: { title: `Create a new Column to ${view.name} view` },
        payload: { viewId: id } 
    })
     
    const handleOpenStatusModal = () => openModal({
        element: <ViewStatusModal />,
        data: { title: "Create Or Edit Status" },
        payload: { viewId: id }
    })
    return (
        <div className='
            group transition   
            w-[50px] text-xl flex flex-col gap-4
            absolute top-0 bottom-0 -left-10 
            opacity-0 hover:opacity-100
        '>
            <Button onClick={() => removeView(id)}>
                <BiTrash />
            </Button>

            <Button onClick={handleCreateColumn}>
                <TbColumnInsertRight />
            </Button>

            <Button onClick={handleOpenStatusModal}>
                {getDataTypeIcon("status")}
            </Button>
            
            <Button>
                {getDataTypeIcon("select")}
            </Button>
            
        </div>
    )
}

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    children : React.ReactNode
}
function Button({ children, ...props }:ButtonProps) {
    return (
        <button {...props} className="rounded-full transition hover:bg-neutral-800 flex justify-center items-center h-10 w-10">
            { children }
        </button>
    )
}