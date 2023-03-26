import { create } from "zustand";
import { View } from "../types/View";

type ModalData = {
    title: string
}
type Payload = {
    viewId: View["id"]
}
type State = {
    isOpen: boolean,
    element: React.ReactNode | null,
    openModal: ({ element, data, payload }:{ element: React.ReactNode, data:ModalData, payload:Payload }) => void,
    data: ModalData,
    closeModal: () => void,
    payload: Payload | null
}
export const useModal = create<State>((set, get) => ({
    isOpen: false,
    element: null,
    payload: null,
    data: { title: "" },
    openModal: ({ element, data, payload }) => set((state) => ({ ...state, isOpen: true, element, data, payload })),
    closeModal: () => {
        set((state) => ({ ...state, isOpen: false, element: null, data: { title: "" }, payload: null }))
    }
}))