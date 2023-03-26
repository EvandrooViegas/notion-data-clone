import { useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import { useModal } from '../../hooks/useModal'
import { useStatus } from '../../hooks/useStatus'
import useViews from '../../hooks/useViews'
import { Property, Status, View } from '../../types/View'
import StatusList from "../StatusList"
import StatusForm from './status-form'
type Props = {
    viewId: string,
    statusId: string,
    propertyId: string
}
export default function SwitchViewStatus({ viewId, statusId, propertyId }:Props) {
    const { getView, updateView } = useViews(s => ({ getView: s.getView, updateView: s.updateView }), shallow)
    const { openModal, closeModal } = useModal(s => ({ openModal: s.openModal, closeModal: s.closeModal }), shallow)
    const { getStatus } = useStatus(s => ({ getStatus: s.getStatus }), shallow)
    const view = useMemo(() => getView(viewId), [viewId])
    const status = useMemo(() => getStatus({ statusId }), [statusId])
    const handleOpenModalStatusForm = () => {
        const onBeforeClose = () => {
            openModal({
                element: <SwitchViewStatus viewId={viewId} statusId={statusId} propertyId={propertyId} />,
                data: { title: `Switch <${status.name}>` },
                payload: { viewId }
            })
        }
        openModal({
            element: <StatusForm onBeforeClose={onBeforeClose} />,
            data: { title: "Create or Edit a Status" },
            payload: { viewId }
        })
    }
    const handleOnSelect = (newStatus:Status) => {
        if(newStatus.id === statusId) return
        const nProperties:Property[] = view.properties.map(p => {
            if(p.ref.statusId === statusId && p.id === propertyId) {
                return { 
                    ...p, 
                    name: newStatus.name, 
                    ref: { ...p.ref, statusId: newStatus.id } 
                }
            }
            else return p
        })
        const nView:View = { ...view, properties: nProperties }
        updateView(viewId, nView)
        closeModal()
    }
  return (
    <div className="p-4">
        <button className="btn btn-active btn-primary w-full" onClick={handleOpenModalStatusForm}>
            Create a Status
        </button>
        <StatusList view={view} onSelect={handleOnSelect} disabledStatusId={statusId} />
    </div>
  )
}
