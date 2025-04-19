import { useState } from "react"
import StickerButton from "./StickerButton"
import HamburgerMenu from "./HamburgerMenu"


export type Value = { fly: boolean, frame: boolean, cat: boolean, eye: boolean }

interface Props {
    className?: string
    isOpen?: boolean
    value?: Value
    onChange?(value: Value): void
}

const MenuBar = ({ className, onChange, value }: Props) => {
    const [isCollapse, setIsCollapse] = useState<boolean>(true);

    const handleStickerButtonClick = (v: Partial<Value>) => {
        if (typeof onChange != 'function') return
        if (typeof value != 'object') return
        onChange({ ...value, ...v })
    }

    return (
        <div className={`flex h-[92px] w-[392px] items-center justify-center ${className}`} >
            <div
                className='absolute flex items-center h-[76px] w-[392px] bg-[#CAD0E5] border border-white rounded-full transition-all duration-500 ease-in-out'
                style={{ width: isCollapse ? 92 : 392 }}
            >
                <StickerButton
                    type='frame'
                    onClick={() => { handleStickerButtonClick({ frame: !value?.frame }) }}
                    isActive={value?.frame}
                    left={8}
                />
                <StickerButton
                    type='eye'
                    onClick={() => { handleStickerButtonClick({ eye: !value?.eye }) }}
                    isActive={value?.eye}
                    left={isCollapse ? 8 : 78}
                />
                <StickerButton
                    type='cat'
                    onClick={() => { handleStickerButtonClick({ cat: !value?.cat }) }}
                    isActive={value?.cat}
                    right={isCollapse ? 8 : 78}
                />
                <StickerButton
                    type='fly'
                    onClick={() => { handleStickerButtonClick({ fly: !value?.fly }) }}
                    isActive={value?.fly}
                    right={8}
                />
            </div>
            <HamburgerMenu onClick={() => { setIsCollapse(!isCollapse) }} value={isCollapse} />
        </div>
    )
}

export default MenuBar