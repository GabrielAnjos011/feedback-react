import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas'
import { useState } from "react";
import { Loading } from "../Loading";
import { backgroundPosition } from "html2canvas/dist/types/css/property-descriptors/background-position";

interface ScreenshotButtonProps {
    onScreenshotTook: (screenshot: string | null) => void;
    screenshot: string | null;
}

export function ScreenshotButton({ screenshot, onScreenshotTook }: ScreenshotButtonProps) {
    const [isTakeScreenshot, setIsTakeScreenshot] = useState(false)

    async function handleTakeScreenshot() {
        setIsTakeScreenshot(true)

        const canvas = await html2canvas(document.querySelector('html')!)
        const base64image = canvas.toDataURL('image/png')

        onScreenshotTook(base64image)
        setIsTakeScreenshot(false)
    }

    if(screenshot) {
        return (
            <button
                type="button"
                onClick={() => onScreenshotTook(null)}
                className="p-1 h-10 w-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={{
                    backgroundImage: `url(${screenshot})`,
                    // backgroundPosition: 'right bottom',
                    // backgroundSize: 180
                }}
            >
                <Trash weight="fill"/>
            </button>
        )
    }

    return (
        <button
                type="button"
                onClick={handleTakeScreenshot}
                className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-emerald-700"
            >
                { isTakeScreenshot ? <Loading/> : <Camera className="w-6 h-6 text-zinc-100"/>}
            </button>
    )
}