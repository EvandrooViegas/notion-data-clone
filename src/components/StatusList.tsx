import { AiOutlineEdit } from "react-icons/ai"
import { Status, View } from '../types/View'
import NotFound from "../components/NotFound"
import { IoMdClose } from 'react-icons/io'
type Props = {
    view: View,
    showActions?: boolean,
    onRemove?: ({ statusId, viewId }:{ statusId: string, viewId: string }) => void,
    onEdit?: ({ statusId, viewId }:{ statusId: string, viewId: string }) => void,
    onSelect?: (status:Status) => void,
    selectedStatusId?: string | null,
    disabledStatusId?: string
}

export default function StatusList({ view, showActions = false, onRemove, onEdit, onSelect, selectedStatusId = null, disabledStatusId }:Props) {
    const status = view.status
    const hasStatus = status.length > 0
  return (
    <div>
        {hasStatus ? (
                <div className="mt-2 flex flex-col gap-2 max-h-[25rem] overflow-y-auto"> 
                    <div className="divider">Existing Ones: </div>
                    {status.map(s => (
                        <div 
                            onClick={s.id !== disabledStatusId ? () => onSelect?.(s) : () => {}}
                            className={`
                                bg-neutral-800
                                border-2 ${s.id === selectedStatusId ? 'border-neutral-700' : 'border-transparent'}
                                ${disabledStatusId === s.id ? 'opacity-[0.5]' : 'opacity-1'}
                                ${disabledStatusId === s.id ? 'cursor-not-allowed' : 'cursor-pointer'} 
                                px-5 py-2 rounded-md  
                                flex flex-col items-start gap-2
                                cursor-pointer  
                                hover:brightness-110
                            `} 
                            key={s.id}
                        >
                            <div className="flex justify-between items-center w-full gap-20">
                                <span className="font-semibold text-xl">{s.name}</span>
                                <div className="divider flex-1"></div>
                                <span className="text-sm text-neutral-400">{s.values.length} items</span>
                            </div>
                            {showActions && (
                                <div className="flex gap-2 items-center">
                                    <button className="btn btn-sm btn-outline btn-warning gap-2" onClick={() => onRemove?.({ statusId: s.id, viewId: s.ref.viewId })}>
                                        Remove
                                        <IoMdClose />
                                    </button>
                                    <button className="btn btn-sm btn-outline  gap-2" onClick={() => onEdit?.({ statusId: s.id, viewId: s.ref.viewId })}>
                                        Edit
                                        <AiOutlineEdit />
                                    </button>
                                </div>
                            )}
                    </div>
                    ))}
                </div>
            ) : (
                <NotFound text="No Status Found" size="20px" />
            )}
    </div>
  )
}
