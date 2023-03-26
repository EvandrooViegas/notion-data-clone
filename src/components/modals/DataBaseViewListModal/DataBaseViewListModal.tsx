import useViewListModal from "../../../hooks/useViewListModal"
import useViews from "../../../hooks/useViews"
import icons from "../../../lib/icons"
import getDate from "../../../utils/getDate"
import randomInt from "../../../utils/randomInt"
import ViewsList from "./ViewsList"
export default function DataBaseViewListModal() {
    const { views, createView } = useViews()
    const { hideShowViewsListModal } = useViewListModal()
    const handleCreateView = () => {
        hideShowViewsListModal()
        const iconId = randomInt(0, icons.length - 1)
        const viewId = crypto.randomUUID()
        createView({
            name: `My Tasks ${views.length}`,
            status: [],
            select: [],
            iconId,
            properties: [
                { name: "Task Name", type: "text", id: `${viewId}-1`, ref: { viewId } }, 
                { name: "Duration", type: "number", id: `${viewId}-2`, ref: { viewId } },
                { name: "Assign To", type: "text", id: `${viewId}-3`, ref: { viewId } },
                { name: "Difficulty(1 - 3)", type: "number", id: `${viewId}-4`, ref: { viewId } },
                { name: "Until", type: "date", id: `${viewId}-5`, ref: { viewId } },
            ],
            data: [{
                value: [
                    { id: "2", value: "Eat", type: "text", ref: { valueId: `${viewId}-1`, viewId, propertyId: `${viewId}-1` } },
                    { id: "3", value: "49", type: "number", ref: { valueId: `${viewId}-2`, viewId, propertyId: `${viewId}-2` } },
                    { id: "1", value: "Evandro", type: "text", ref: { valueId: `${viewId}-3`, viewId, propertyId: `${viewId}-3`  } },
                    { id: "4", value: "3", type: "number", ref: { valueId: `${viewId}-4`, viewId, propertyId: `${viewId}-4` } },
                    { id: "5", value: getDate(new Date(), { now: true }), type: "date", ref: { valueId: `${viewId}-5`, viewId, propertyId: `${viewId}-5` } },
                ]
            }],
            id: viewId,
            type: "table"
        })
    
        
    }
    return (
        <div className="m-4">
            <div className="flex justify-center">
                <button className="btn w-full" onClick={handleCreateView}>Create One</button>
            </div>
            <div className="flex flex-col w-full border-opacity-50">
                <div className="divider">Or select a existing one: </div>
            </div>
            <div className="bg-neutral-800 rounded-md overflow-y-auto h-60">
                <ViewsList views={views} />
            </div>
        </div>
    )
}
