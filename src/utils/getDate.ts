type FormatDate = string | number | Date 
type FormatOptions = {}
const defaultOptions = {}
function formater(date:FormatDate) {
    const newDate = new Date(date)

    return `${newDate.getFullYear()}-${newDate.getMonth() + 1 <= 9 ? '0' : ''}${newDate.getMonth() + 1}-${newDate.getDate() <= 9 ? '0' : ''}${newDate.getDate()}`

}

export default function getDate(date:FormatDate, options:FormatOptions = defaultOptions) {
    
    return formater(date)
}