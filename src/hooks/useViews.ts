
import { create } from "zustand"
import icons from "../lib/icons"
import { Property, View, ViewData, ViewDataValue } from "../types/View"
import { getStorage } from "../utils/getStorage"
import { setStorage } from "../utils/setStorage"



type State = {
    views: View[],
    createView: (newView:Omit<View, "Icon">) => void,
    removeView: (viewId:View["id"]) => void,
    getView: (id:string) => View,
    sortPropertiesByName: (properties:View["properties"]) => View["properties"],
    sortDataByPropertyName: (data:ViewData[]) => ViewData[],
    getProperty: (data:ViewDataValue) => Property ,
    updateViewKey: <T extends keyof View>({ id, key, newValue }: { id: View["id"], key:T, newValue:View[T]  }) => void,
    updateView: (id:View["id"], newValue:View) => void,
    getViews: () => View[]
}

const storageViews = getStorage<View[]>("views") || []
const getKey = (property:Property) => `${property.name}-${property.type}-${property.id}`

const useViews = create<State>((set, get) =>({
    views: storageViews.map((v) => ({...v, Icon: icons.find(i => i.id === v.iconId)!.icon})),
    getViews: () => {
        return get().views
    },
    createView: (viewWithoutIcon) => {
   
        const newView = {...viewWithoutIcon, Icon: icons.find(i => i.id === viewWithoutIcon.iconId)!.icon} 
        set(currState => {
            setStorage<View[]>("views", (prevViews) => {
                if(prevViews) return [...prevViews, newView]
                return [newView]
            })
            return {...currState, views: [...currState.views, newView]}
        })

    },
    removeView: (viewId) => {

        set(currState => {
            const filtredViews = currState.views.filter(v => v.id !== viewId)
            setStorage("views", filtredViews)
            return {...currState, views: filtredViews}
        })

    },
    sortPropertiesByName: (properties) => {
        const sorted = [...properties].sort((a, b) => {
            const aKey = getKey(a)
            const bKey = getKey(b)

            if(aKey > bKey) return 1
            else if(aKey < bKey) return -1 
            else return 0
        })
        return sorted
    },
    getProperty: (data) => {
        const { getView } = get()
        const view = getView(data.ref.viewId)
        return view?.properties.find(p => p.id === data.ref?.propertyId)!
    },
    sortDataByPropertyName: (data) => {
        
        const getProperty = get().getProperty
        const sortedData = data.map(data => {
            return {

                value: [...data.value].sort((a, b) => {
                    const aProperty = getProperty(a)
                    const aKey = getKey(aProperty)
                    const bProperty = getProperty(b)
                    const bKey = getKey(bProperty)

                    if(aKey > bKey) return 1
                    else if (aKey < bKey) return - 1
                    else return 0
                        
                })
            }
            
        })
        return sortedData
    },
    getView: (id) => {
        const { views } = get()
        return views.find(v => v.id === id)!
    },
    updateViewKey: ({ id, key, newValue }) => {
      
        const { getView, views } = get()
        const view = getView(id)
        const newView = {...view}
        newView[key] = newValue
        const newViews = [...views.filter(v => v.id !== id)]
        newViews.push(newView)

        set(s => ({...s, views: newViews}))
        setStorage("views", newViews)
   

    },
    updateView: (id, nView) => {
 
        const { views } = get()
        const nViews = views.map((v) => v.id === id ? nView : v)
        set((state) => ({ ...state, views: nViews }))
        setStorage("views", nViews)


    }
}))
export default useViews