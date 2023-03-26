
import { View } from "../../types/View";
import ViewTable from "./ViewTable";

type Props = {
    view: View
} 
export default function ViewCard(props:Props) {
    const viewType = props.view.type 
    if(viewType === "table") return <ViewTable {...props.view} />
    return null
}