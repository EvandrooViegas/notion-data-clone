import { create } from 'zustand'
import { generateUncategorizedStatusOption } from '../components/modals/status-form'
import { DataType, Property, Status, View, ViewData } from '../types/View'
import getUncategorizedId from '../utils/getUncategorizedId'
import useViews from './useViews'

type State = {
    properties: Property[],
    updatePropertyKey: <T extends keyof Property>({ propertyId, key, newValue }: { propertyId: string, key: T, newValue: Property[T] }) => void,
    getProperty: (id:Property["id"]) => Property,
    removeProperty: ({ ref, propertyId }:{ ref:Property["ref"], propertyId: Property["id"] }) => void,
    createProperty: ({ propertyName, viewId, type, status, statusId }:{ propertyName: string, viewId: string, type: DataType, status?:Status, statusId: string }) => void
}

export const useProperties = create<State>((set, get) => ({
    properties: (() => {
        const { views } = useViews.getState()

        return views.reduce((acc:Property[], v) => [...acc, ...v.properties], [])
    })(),
    updatePropertyKey: ({ propertyId, key, newValue }) => {
        const { getView, updateView } = useViews.getState()

        const { getProperty } = get()
        const property = getProperty(propertyId)
        const viewId = property.ref.viewId
        const propertyView = getView(viewId)
        const newProperty = {...property}
        property[key] = newValue
        const newView = {...propertyView, property: newProperty}
        updateView(viewId, newView)
    },
    removeProperty: ({ propertyId, ref }) => {
        const { getView, updateView } = useViews.getState()

        const view = getView(ref.viewId)
        const viewId = view.id
        const nData:ViewData[] = view.data.map(data => ({ value: data.value.filter(v => v.ref.propertyId !== propertyId)})) 
        const nProperties:Property[] = view.properties.filter(p => p.id !== propertyId)
        const nView:View = { ...view, properties: nProperties, data: nData}
        updateView(viewId, nView)
    },
    getProperty: (id) => {
        const { properties } = get()
        return properties.find(p => p.id === id)!
    },
    createProperty: ({ viewId, propertyName, type, status, statusId }) => {
        const { getView, updateView } = useViews.getState()
        
        const isStatus = type === "status" && status
        const nPropertyId = crypto.randomUUID()
        const newProperty = { 
            name: propertyName, 
            type, 
            id: nPropertyId, 
            ref: { viewId, statusId: status?.id } 
        } satisfies Property
        const view = getView(viewId)

        //code for status 

        const uncategorizedId = getUncategorizedId(statusId)
        const uncatorizedOption = generateUncategorizedStatusOption({ uncategorizedId, statusId })

        const nData:ViewData[] = view.data.map((data) => {
            return {
                value: [
                    ...data.value,
                    { 
                        id: crypto.randomUUID(),
                        value: isStatus ? uncatorizedOption : "---",
                        type,
                        ref: {
                            valueId: isStatus ? uncatorizedOption.id : crypto.randomUUID(),
                            viewId,
                            statusId,
                            propertyId: nPropertyId
                        }
                    }
                ]
            }
        })

        const nView: View = {...view, properties: [newProperty, ...view.properties], data: nData}
 
        updateView(viewId, nView)
    }
}))

