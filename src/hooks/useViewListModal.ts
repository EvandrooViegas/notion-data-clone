import { create } from "zustand";

type State = {
    isShowViewsListModal: boolean,
    showViewsListModal: () => void,
    hideShowViewsListModal: () => void,
}
const useViewListModal = create<State>((set) => ({
    isShowViewsListModal: false,
    showViewsListModal: () => set(state => ({ ...state, isShowViewsListModal: true })),
    hideShowViewsListModal: () => set(state => ({ ...state, isShowViewsListModal: false }))
}))

export default useViewListModal