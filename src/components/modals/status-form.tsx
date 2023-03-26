import { useRef, useState } from "react"
import { BsPlusCircleDotted } from "react-icons/bs"
import { useError } from "../../hooks/useError"
import { useModal } from "../../hooks/useModal"
import { useStatus } from "../../hooks/useStatus"
import { Status, StatusValue } from "../../types/View"
import getRandomColor from "../../utils/get-random-color"
import getUncategorizedId from "../../utils/getUncategorizedId"
import StatusDataCard from "../status-data-card"




type Props = {
    options?: StatusValue[],
    statusText?: string,
    existingStatusId?: string,
    onBeforeClose?: () => void
}


export const generateUncategorizedStatusOption = ({ 
    uncategorizedId,
    statusId
}: {
    uncategorizedId: string,
    statusId: string
}):StatusValue => ({ 
    id:  uncategorizedId, 
    text: "uncategorized", 
    ref: { statusId }, 
    type: "status", 
    color: "#aaa" 
})
export default function StatusForm({ 
    options , 
    statusText = "",
    existingStatusId,
    onBeforeClose
}:Props) {
    const [nStatusText, setnStatusText] = useState(statusText)
    const [statusOptionText, setStatusOptionText] = useState("")
    const statusId = useRef(existingStatusId ?? crypto.randomUUID())
    const uncategorizedId = getUncategorizedId(statusId.current)
    const uncategorizedOption = generateUncategorizedStatusOption({ 
        uncategorizedId, 
        statusId: statusId.current 
    })

    const defaultOptions:StatusValue[] = [uncategorizedOption]
    const [statusOptions, setStatusOptions] = useState<StatusValue[]>(options || defaultOptions)
    const [statusMsgErr] = useError({ 
        condition: statusOptions.length > 0 === false,
        message: "You must create at least, one option to your status"
     })

    const modalPayload = useModal((s) => s.payload)
    const closeModal = useModal((s) => s.closeModal)

    const addStatusToView = useStatus(s => s.addStatusToView)
    const updateStatusFromView = useStatus(s => s.updateStatusFromView)

    const isEditing = options?.length! > 0 || statusText
    
    const handleAddOption = () => {
        //make sure that status has a text
        if(!statusOptionText) return 
        const newOption:StatusValue = { 
            text: statusOptionText, 
            id: crypto.randomUUID(), 
            color: getRandomColor(), 
            ref: { statusId: statusId.current }, 
            type: "status" 
        }
        setStatusOptionText("")
        setStatusOptions([newOption, ...statusOptions])
    }
    const removeOption = (id:string) => {
        //make sure that uncatorized option cannot be deleted
        if(id === uncategorizedId) return 
        setStatusOptions([...statusOptions.filter(opt => opt.id !== id)])
    }
    const handleSubmit = (e:React.FormEvent) => {
      e.preventDefault()
      if(!nStatusText) return
      // make sure that options arr has at least one element
      // make sure that there isnt any errors 
      if(statusMsgErr) return 
      const nStatus:Status = { 
        name: nStatusText, 
        values: statusOptions, 
        type: "status", 
        id: statusId.current, 
        ref: { viewId: modalPayload?.viewId!  }
      }
      isEditing ? updateStatusFromView({ nStatus }) : addStatusToView({ nStatus })
      closeModal()
      onBeforeClose?.()
    }

  return (
    <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        {statusMsgErr && (
            <p className="border border-red-600 px-4 py-1 rounded-md">{statusMsgErr}</p>
        )}
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text">Status Name: </span>
            </label>
            <input 
                autoFocus
                type="text" 
                placeholder="Type here" 
                className="input input-bordered w-full" 
                value={nStatusText} 
                onChange={(e) => setnStatusText(e.target.value)} 
            />
        </div>
        <div className="flex gap-3 justify-between">
            <input 
                type="text" 
                placeholder="Option Name: " 
                value={statusOptionText} 
                onChange={(e) => setStatusOptionText(e.target.value)} 
                className="input input-bordered input-sm w-full" 
            />
            <button className="btn btn-sm btn-outline btn-primary gap-2" onClick={handleAddOption} type="button">
                add
                <BsPlusCircleDotted />
            </button>
        </div>
        <div className="flex flex-wrap gap-4 p-5 border border-dashed border-neutral-700 max-w-xl rounded-md" >
            {statusOptions.map((option) => 
                <StatusDataCard value={option} valueId={option.id} onClick={() => removeOption(option.id)} />
                // <StatusOption {...option} key={option.id} removeOption={removeOption} />
            )}
        </div>
        <button className="btn btn-primary">{isEditing ? "Update" : "Create"}</button>
    </form>
  )
}

