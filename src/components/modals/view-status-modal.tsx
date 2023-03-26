import { useModal } from "../../hooks/useModal"
import useViews from "../../hooks/useViews"
import { Status } from "../../types/View"
import NotFound from "../NotFound"
import StatusForm from "./status-form"
import { IoMdClose } from "react-icons/io"
import { useStatus } from "../../hooks/useStatus"
import { useState } from "react"
import StatusList from "../StatusList"

export default function ViewStatusModal() {
    const modalPayload = useModal(s => s.payload)
    const openModal = useModal(s => s.openModal)
    const getView = useViews(s => s.getView)
    const views = useViews(s => s.views)
    const removeStatusFromView = useStatus(s => s.removeStatusFromView) 
    const viewId = modalPayload?.viewId!
    const [view, setView] = useState(getView(viewId))


    const handleOpenModalStatusForm = () => openModal({
        element: <StatusForm />,
        payload: { viewId: view.id },
        data: { title: "Create a Status" }
    })
    const handleRemoveStatus = ({ statusId, viewId }:{ statusId: string, viewId: string }) => {
        removeStatusFromView({ statusId, viewId })
        setView(getView(viewId))
    }
    const handleEditStatus = ({ viewId, statusId }:{ viewId: string, statusId: string }) => {
        const view = views.find(v => v.id === viewId)
        const selectedStatus = view?.status.find(s => s.id === statusId)
        openModal({
            data: { title: "Edit Status" },
            element: <StatusForm options={selectedStatus?.values} statusText={selectedStatus?.name} existingStatusId={statusId} />,
            payload: { viewId }
        })
    }
    return (
        <div className="p-4">
            <button className="btn btn-active btn-primary w-full" onClick={handleOpenModalStatusForm}>
                Create a Status
            </button>
            <StatusList view={view} showActions={true} onRemove={handleRemoveStatus} onEdit={handleEditStatus} />
        </div>
    )
}