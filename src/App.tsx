
import Modal from "./components/Modal"
import DataBaseViewListModal from "./components/modals/DataBaseViewListModal/DataBaseViewListModal"
import ViewList from "./components/ViewTypes/ViewList"
import { useModal } from "./hooks/useModal"
import useViewListModal from "./hooks/useViewListModal"
export default function App() {
  const { isShowViewsListModal, hideShowViewsListModal, showViewsListModal } = useViewListModal()
  const closeModal = useModal((s) => s.closeModal)
  const isModalOpen = useModal((s) => s.isOpen)
  const modalChildren = useModal((s) => s.element)
  const modalData = useModal((s) => s.data)
  return (
    <div className="flex flex-col justify-center mx-auto max-w-[1000px]">
      <button className="btn w-fit mx-auto my-4" onClick={showViewsListModal}>
        Create a new View
      </button>

      <ViewList />
      <Modal isOpen={isShowViewsListModal} title="Create Or Select a view" onClose={hideShowViewsListModal}>
        <DataBaseViewListModal />
      </Modal>
      <Modal isOpen={isModalOpen} title={modalData.title} onClose={closeModal}>
        {modalChildren}
      </Modal>
    </div>
  )
}


