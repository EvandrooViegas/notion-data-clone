import { useState, useRef } from "react"
import { useModal } from "../../hooks/useModal";
import { dataTypeIcons } from "../../lib/data-type-icons";
import { DataType, Status } from "../../types/View";
import { useProperties } from "../../hooks/useProperties";
import StatusList from "../StatusList";
import useViews from "../../hooks/useViews";
import { shallow } from "zustand/shallow"
import StatusForm from "./status-form";
export default function CreateColumnModal() {
    const [selectedTypeId, setSelectedTypeId] = useState(1)
    const [selectedStatusId, setSelectedStatusId] = useState<null | string>(null)
    const [columnName, setColumnName] = useState("")
    const columnTypes = getColumnTypes()
    const selectedType = columnTypes.find(t => t.id === selectedTypeId)!

    const createNewColumn = useProperties((s) => s.createProperty)
    const { closeModal, modalPayload, openModal } = useModal(s => ({ 
        closeModal: s.closeModal, 
        modalPayload: s.payload, 
        openModal: s.openModal 
    }), shallow)
    const { getView } = useViews((s) => ({ getView: s.getView }), shallow)

    const handleUpdateSelectedType = (id:number) => setSelectedTypeId(id)

    const viewId = modalPayload?.viewId!
    const view = getView(viewId)
    let isStatusType = selectedType.name === "status"
    
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        if(!viewId) return
        if(!columnName) return
        if(!selectedStatusId && isStatusType) return
        const text = columnName
        createNewColumn({
            propertyName: text,
            viewId,
            type: selectedType.name,
            statusId: isStatusType ? selectedStatusId! : ""
        })
        console.log("called")
        closeModal()
    }

    const handleSelect = ({ id }:Status) => {
        setSelectedStatusId((prev) => {
            const selectedStatus = view.status.find(s => s.id === id)  
            setColumnName(selectedStatus?.name!)
            return id
        })
    }

    const handleOpenModalStatusForm = () => openModal({
        element: <StatusForm />,
        payload: { viewId: view.id },
        data: { title: "Create a Status" }
    })
    
    return (
        <form className="form-control w-full p-5 flex flex-col gap-4" onSubmit={handleSubmit}>
            {!selectedStatusId && selectedType.name === "status" &&  <p className="bg-red-600 px-3 py-1 font-semibold rounded-md">Select one status</p> }
            <div>
                <label className="label"><span className="label-text">Column Name: </span></label>
                <input type="text" placeholder="Type here" className="input input-bordered min-w-full" value={columnName} onChange={(e) => setColumnName(e.target.value)} />
                {selectedType.name === "status" && (
                    <div className="flex flex-col gap-2 ">
                        <StatusList view={view} showActions={false} onSelect={handleSelect} selectedStatusId={selectedStatusId} />
                        <button className="btn btn-secondary btn-outline" onClick={handleOpenModalStatusForm}>
                            Create a new one
                        </button>
                        <div className="divider"></div>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap gap-6 p-4 border border-neutral-700 rounded-md">
                {columnTypes.map((iconType) => (
                    <div 
                    key={iconType.name} 
                    onClick={() => handleUpdateSelectedType(iconType.id)} 
                    className={`
                        flex gap-4 items-center text-xl rounded-md
                        border ${iconType.id === selectedTypeId ? "bg-neutral-800" : "bg-neutral-900"} 
                        px-4 py-3 border-neutral-700
                        cursor-pointer    
                        hover:border-neutral-600
                    `}>
                    <span>{iconType.icon}</span>
                    <span>{iconType.name}</span>
                </div>
                ))}
            </div>
            <button className="btn btn-active btn-primary">Create</button>
        </form>
    );
}

function getColumnTypes() {
    const iconsKeys:DataType[] = Object.keys(dataTypeIcons) as DataType[]
    return iconsKeys.map((key, idx) => {
        return {
            name: key,
            icon: dataTypeIcons[key],
            id: idx + 1
        }
    })
}