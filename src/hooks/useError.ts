type Props = {
    condition: boolean,
    message: string
}
export function useError({ condition, message }:Props) {
    const errMessage = condition ? message : ""   
    return [errMessage, condition]
}