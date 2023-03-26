import colors from "../lib/colors"
import randomInt from "./randomInt"

export default function getRandomColor() {
    const randomIdx = randomInt(0, colors.length - 1)
    return colors[randomIdx]
}