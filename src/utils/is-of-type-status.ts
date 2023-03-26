import { ViewDataValue } from "../types/View";

export default function isOfTypeStatus(value:ViewDataValue) {
    if(value.type === "status" && typeof value.value !== "string") 
        return true 
    else 
        return false
}
