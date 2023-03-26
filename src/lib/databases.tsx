import { BiListUl, BiTable } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { CiViewTimeline } from "react-icons/ci";
import { HiOutlineViewBoards } from "react-icons/hi";
import { RiGalleryLine } from "react-icons/ri";

type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
const databases = [
    { icon: <BiTable />, title:"Table View", description:"Add a table view for a new or existing database", id: 1 },
    { icon: <HiOutlineViewBoards />, title:"Board View", description: "Create a kanband board database view", id: 2},
    {icon: <RiGalleryLine />, title: "Gallery View", description: "Create a gallery database view", id: 3},
    { icon:<BiListUl />, title:"List View", description:"Create a list database view", id: 4},
    { icon:<BsCalendarDate />, title:"Calendar view", description:"Create a calendar database view", id: 5},
    { icon:<CiViewTimeline />, title:"Timeline view", description:"Create a timeline database view" , id: 6}
]

export default databases
export type IDatabases = ArrayElement<typeof databases>