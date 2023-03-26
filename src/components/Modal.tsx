import { IoClose } from "react-icons/io5"
import { createContext, useContext } from "react"

interface IProps {
    isOpen: boolean,
    children: React.ReactNode,
    onClose: () => void,
    title: string
}

type ModalContext = {

} & Partial<IProps>

const modalContext = createContext<ModalContext | null>(null)
export default function Modal({ isOpen, children, onClose, title }:IProps) {
  if(!isOpen) return null  

  return (
    <modalContext.Provider value={{ onClose, title }}>
        <Overlay>
            <div className="
            min-w-[600px]
            bg-neutral-900 rounded-md
            ">
                <Header />
                {children}
            </div>
        </Overlay>
    </modalContext.Provider>
  ) 

}

function Header() {
    const { onClose, title } = useModal()
    return <div className="flex justify-between p-4 border-b border-neutral-800">
        <h4 className="text-xl font-semibold">
            {title}
        </h4>
        <button onClick={onClose}>
            <IoClose />
        </button>
    </div>
}

function Overlay({
    children
}:{ children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 h-screen w-screen flex justify-center items-center bg-black/80">
            {children}
        </div>  
    )
}

function useModal() {
    return { ...useContext(modalContext)! }
}



