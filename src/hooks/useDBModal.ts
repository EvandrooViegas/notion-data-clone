import { create } from "zustand";

type State = {
    isShowDBModal: boolean,
    showDBModal: () => void,
    hideDBModal: () => void,
    updateDBModal: (text: string) => void
}
const useDBModal = create<State>((set) => ({
    isShowDBModal: false,
    showDBModal: () => set(state => ({ ...state, isShowDBModal: true })),
    hideDBModal: () => set(state => ({ ...state, isShowDBModal: false })),
    updateDBModal: (text:string) => set(state => ({ ...state, isShowDBModal: text === "/" }))
}))

export default useDBModal