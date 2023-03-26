
import { ViewDataValue } from '../types/View'

export default function isNotOfTypeStatus(value:ViewDataValue) {
    if(value.type !== "status" && typeof value.value === "string")
        return true 
    else 
        return false
}
