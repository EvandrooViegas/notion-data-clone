import { IDatabases } from "../lib/databases"

type IProps =  {
    onDatabaseSelect: (id:IDatabases["id"]) => void,
} & IDatabases
export default function DataBaseCard({ title, description, icon, id, onDatabaseSelect }:IProps) {
  return (
    <li 
      className="text-sm grid grid-cols-[1fr_7fr] items-center px-4 py-2 hover:bg-neutral-600 cursor-pointer"
      onClick={() => onDatabaseSelect(id)} 
    >
        <div className="text-2xl">
          {icon}
        </div>
        <div>
          <span>{title}</span>
          <p className="text-xs text-neutral-400">{description}</p>
        </div>
    </li>
  )
}
