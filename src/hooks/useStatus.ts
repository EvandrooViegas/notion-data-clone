import { create } from "zustand";
import { Property, Status, StatusValue, View, ViewData } from "../types/View";
import { useProperties } from "./useProperties";
import useViews from "./useViews";

type State = {
    status: Status[],
    addStatusToView: ({ nStatus }:{ nStatus: Status }) => void,
    removeStatusFromView: ({ statusId, viewId }: { statusId: string, viewId: string }) => void,
    getStatus: ({ statusId }:{ statusId: string }) => Status,
    updateStatusFromView: ({ nStatus }:{ nStatus: Status }) => void,
    updateStatus: ({ views }:{ views: View[] }) => void,
    getStatusValue: ({ valueId }: { valueId: string }) => StatusValue | undefined
}

const { getView, updateView, updateViewKey, views } = useViews.getState()
let subUseViews;

export const useStatus = create<State>((set, get) => ({
    status: views.reduce((acc:Status[], view) => [...acc, ...view.status], []),
    addStatusToView: ({ nStatus }) => {
        const { createProperty } = useProperties.getState()
 
        const viewId = nStatus.ref.viewId
        const view = getView(viewId)
        const statusName = nStatus.name
        const nView:View = { ...view, status: view.status ? [...view.status, nStatus ] : [nStatus] }
        updateView(viewId, nView)
        createProperty({ 
            propertyName: statusName, 
            viewId, type: "status", 
            status: nStatus, 
            statusId: nStatus.id 
        })
    },
    removeStatusFromView: ({ statusId, viewId }) => {
        const { removeProperty } = useProperties.getState()
    
        const view = getView(viewId)
        const nStatus = view.status.filter(s => s.id !== statusId)
        const linkedProperty = view.properties.find(p => p.ref.statusId === statusId)
        //only run if linkedProperty exists 
        if(!linkedProperty) return 
        removeProperty({ ref: linkedProperty?.ref, propertyId: linkedProperty.id })
        updateViewKey({ id: viewId, key: "status", newValue: nStatus  })
    },
    getStatus: ({ statusId }) => {
        const { status } = get()
        return status.find(s => s.id === statusId)!
    },
    updateStatusFromView: ({ nStatus }) => {
        const view = views.find(v => v.id === nStatus.ref.viewId)
        if(!view) return 
        const linkedProperty = view.properties.find(p => p.ref.statusId === nStatus.id)
        if(!linkedProperty) return
        const nProperty:Property = {...linkedProperty, name: nStatus.name}
        const nProperties:Property[] = view.properties.map((p) => p.id === linkedProperty.id ? nProperty : p) 
        const nView:View = {
            ...view,
            status: [ ...view.status.filter(s => s.id !== nStatus.id), nStatus],
            properties: nProperties
        }
        updateView(nView.id, nView)
    },
    updateStatus({ views }) {
        set(s => ({ ...s, status: views.reduce((acc:Status[], view) => [...acc, ...view.status], []) }))
    },
    getStatusValue({ valueId }) {
        const { status } = get()
        const values = status.reduce((acc:StatusValue[], curr) => {
            return [...acc, ...curr.values]
        }, [])
        return values.find(v => v.id === valueId)
    },
}))

subUseViews = useViews.subscribe((state) => {
    const { updateStatus } = useStatus.getState()
    updateStatus({ views: state.views })
})