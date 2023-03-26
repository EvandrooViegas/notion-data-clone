import { IconType } from "react-icons/lib"

export type ViewDataValueRef = {
    selectId?: string,
    statusId?: string,
    valueId: string,
    viewId: string,
    propertyId: string
}




export type DataType = "select" | "status" | "number" | "text" | "date"

export type ViewTypes = "table"
export type StatusValueRef = {
    statusId: Status["id"]
}

export type StatusValue = {
    id: string,
    text: string,
    ref: StatusValueRef,
    type: "status",
    color: string
} 

export type StatusRef = {
    viewId: View["id"]
}

export type Status = {
    id: string,
    name: string,
    type: "status",
    values: StatusValue[],
    ref: StatusRef
} 

export type SelectValue = {
    id: string,
    ref: string,
    text: string,
    color: string
}

export type Select = {
    id: string,
    name: string,
    type: "select",
    values: SelectValue[]
}

export type PropertyRef = {
    viewId: View["id"],
    statusId?: string,
}

export type Property = {
    ref: PropertyRef,
    id: string,
    name: string,
    type: DataType
}

export type ViewDataValue = {
    id: string,
    properties?: DataType[],
    type: DataType
    ref: ViewDataValueRef,
    value: string | StatusValue
}
export type ViewData = {
    value: ViewDataValue[]
}

export type View = {
    name: string,
    status: Status[],
    select: Select[],
    properties: Property[]
    image?: string,
    iconId: number,
    Icon: IconType,
    id: string,
    type: ViewTypes
    data: ViewData[],
  
}