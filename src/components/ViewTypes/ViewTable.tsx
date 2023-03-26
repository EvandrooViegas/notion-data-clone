

import { View, ViewData, ViewDataValue } from "../../types/View";
import { useMemo } from "react";
import useViews from "../../hooks/useViews";
import { useProperties } from "../../hooks/useProperties";
import ActionsSideBar from "../ActionsSideBar";
import getDataTypeIcon from "../../utils/getDataTypeIcon";
import { useStatus } from "../../hooks/useStatus";
import { shallow } from "zustand/shallow";
import { useModal } from "../../hooks/useModal";
import SwitchViewStatus from "../modals/switch-view-status";
import getDate from "../../utils/getDate";
import StatusDataCard from "../status-data-card";

import isOfTypeStatus from "../../utils/is-of-type-status";
import isNotOfTypeStatus from "../../utils/is-not-of-type-status";
import isStatusValueCurrentDate from "../../utils/is-status-value-current-date";
type Props = {} & View;
export default function ViewTable({ id }: Props) {
  const sortPropertiesByName = useViews((state) => state.sortPropertiesByName);
  const sortDataByPropertyName = useViews((state) => state.sortDataByPropertyName);
  const updateViewKey = useViews((state) => state.updateViewKey);
  const updateView = useViews((s) => s.updateView)
  const getView = useViews(s => s.getView)
  const updatePropertyKey = useProperties((state) => state.updatePropertyKey);
  const removeProperty = useProperties((state) => state.removeProperty);
  const view = getView(id)
  const { name, Icon, data, properties } = view

  const handleDataChange = ({ id, type, event, ref }:{ event: React.ChangeEvent<HTMLInputElement> } & ViewDataValue) => {
    const nValue = event.target.value
    const formatedNvalue = function() {
      if(type === "date") return getDate(nValue) 
      else return nValue
    }() 
    const view = getView(ref.viewId)

    const nData:ViewData[] = view.data.map(d => {
        return {
          value: d.value.map(v => {
            if(v.id === id) return  {...v, value: formatedNvalue}
            else return v
          })
        }
    })
    const nView = {...view, data: nData}
    updateView(view.id, nView)

  }
  
  const sortedPropertiesByName = useMemo(() => {
    return sortPropertiesByName(properties);
  }, [properties, data, view]);
  
  const sortedDataByPropertyName = useMemo(() => {
    return sortDataByPropertyName(data);
  }, [properties, data]);

  return (
    <div className="relative">
      {/* HEADER */}
        <ActionsSideBar id={id} />
      <div className="text-2xl font-semibold flex items-center gap-3 group">
        <Icon />
        <input
          type="text"
          defaultValue={name}
          onChange={(e) => updateViewKey({ id, key: "name", newValue: e.target.value })}
          className="outline-none bg-transparent"
        />
        
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
              <tr>
                  <th>id</th>
                  {sortedPropertiesByName.map((property) => (
                    <td key={property.id} className="group cursor-pointer select-none relative">
                      { property.type === "status"  
                         ? <StatusProperty statusId={property.ref.statusId!} propertyId={property.id} /> 
                         : <input
                           type="text"
                           defaultValue={property.name}
                           onChange={(e) => updatePropertyKey({ propertyId: property.id, key: "name", newValue: e.target.value })}
                           className="outline-none bg-transparent text-xl"
                         />
                       }
                      <div className="absolute right-4 text-xl v-center ">
                        <button className="transition opacity-100 group-hover:opacity-0">
                          { getDataTypeIcon(property.type) }
                        </button>
                        <button 
                          onClick={() => removeProperty({ ref: property.ref, propertyId: property.id})} 
                          className="transition opacity-0 group-hover:opacity-100 "
                        >
                          x
                        </button>
                      </div>
                    </td>
                  ))}
              </tr>
          </thead>
          <tbody>    
            {sortedDataByPropertyName.map((data, index) => (
              <tr key={index}>
                  <th>{index}</th>
                  {data.value.map((value) => (
                    <td key={value.id}>
                      <div className="flex items-center gap-3">
                        {isOfTypeStatus(value) && (
                            <StatusDataCard  valueId={value.ref.valueId} isOpenModalOnClick={true} /> 
                        )}
                        {isNotOfTypeStatus(value) && (
                          <input
                            type={value.type}
                            onChange={(event) => handleDataChange({ ...value, event})}
                            value={ value.type === "date" ? getDate(value.value as string) : value.value as string }
                            className="outline-none bg-transparent"
                          />
                        )}
                        {isStatusValueCurrentDate(value) && (
                          <div className="px-2 font-semibold rounded-md bg-red-600 w-fit">
                            Today
                          </div>
                        )}
                      </div>
                  </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type StatusIconProps = {
  statusId: string,
  propertyId: string
}
export function StatusProperty({ statusId, propertyId }:StatusIconProps) {
  const { openModal, closeModal } = useModal((s) => ({ openModal: s.openModal, closeModal: s.closeModal }), shallow)
  const { getStatus } = useStatus((s) => ({ getStatus: s.getStatus }), shallow)
  const status = useMemo(() => getStatus({ statusId }), [statusId])
  const handleUpdateColumnStatus = () => {
      openModal({
        element: <SwitchViewStatus viewId={status.ref.viewId} statusId={status.id} propertyId={propertyId} />,
        data: { title: `Switch <${status.name}>` },
        payload: { viewId: status.ref.viewId }
      })
  }
  return (
    <div className="px-2 py-0.5 text-sm bg-primary rounded-lg w-fit hover:brightness-110" onClick={handleUpdateColumnStatus}>
      {status.name}
    </div>
  )
}


