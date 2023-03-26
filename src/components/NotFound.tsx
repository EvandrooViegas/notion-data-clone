import { BiHide } from "react-icons/bi"
type Props = {
  size?: string,
  text?: string
}
export default function NoFound({ 
  size = "30px",
  text = "No Views Found"
}:Props) {
  return (
    <div className={`flex flex-col items-center justify-center h-full w-full`}>
        <p style={{ fontSize: size }}>{text}</p>
        <BiHide size={size}color="white" />
    </div>
  )
}
