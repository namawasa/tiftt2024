import { useState } from "react"
import html2canvas, { Options } from "html2canvas"

export const useScreenShot = () => {
    const [image, setImage] = useState<string | null>(null)
    const [error, setError] = useState(false)

    const takeScreenShot = async (node: HTMLElement | null, options?: Options) => {
        if(node == null){
            setError(true)
            return ''
        }

        try {
            const canvas = await html2canvas(node, options)
            const croppedCanvas = document.createElement('canvas')
            const croppedCanvasContext = croppedCanvas.getContext('2d')

            const cropPositionTop = 0
            const cropPositionLeft = 0
            const cropWidth = canvas.width
            const cropHeight = canvas.height

            croppedCanvas.width = cropWidth
            croppedCanvas.height = cropHeight

            croppedCanvasContext?.drawImage(
                canvas,
                cropPositionLeft,
                cropPositionTop
            )

            const base64Image = croppedCanvas.toDataURL()

            setImage(base64Image)
            return base64Image
        } catch {
            setError(true)
            return ''
        }
    }

    return {
        image,
        takeScreenShot,
        error
    }
}
