import {  DataType, ViewDataValue } from "../types/View";
import { TbCircleNumber9 } from "react-icons/tb"
import { BsCalendarDate, BsGraphUp, BsTextParagraph } from "react-icons/bs";
import { CgSelect } from "react-icons/cg"
import { dataTypeIcons } from "../lib/data-type-icons";



export default function getDataTypeIcon(type:DataType) {
    const icon = dataTypeIcons[type]
    return icon
}