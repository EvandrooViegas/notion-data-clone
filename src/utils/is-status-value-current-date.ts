import { ViewDataValue } from "../types/View"
import getDate from "./getDate"

export default function isStatusValueCurrentDate(value:ViewDataValue) {
    if(value.type === "date" && typeof value.value === "string" && getDate(value.value) === getDate(new Date()))
        return true 
    else 
        return false
}