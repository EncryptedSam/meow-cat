interface StickerButtonProps {
    right?: number
    left?: number
    className?: string
    type?: 'cat' | 'frame' | 'eye' | 'fly'
    isActive?: boolean
    onClick?(): void
}

const StickerButton = ({ left, right, className, onClick, type, isActive, }: StickerButtonProps) => {



    return (
        <button
            className={`absolute cursor-pointer text-4xl bg-[#D5DCF4] h-[60px] w-[60px] rounded-full inline-flex items-center justify-center transition-all duration-500 ease-in-out ${className}`}
            style={{ left, right }}
            onClick={onClick}
        >
            {
                type == 'cat' &&
                <img className={`h-[38px] ${isActive ? '' : 'opacity-[0.3]'}`} src='./cat-button.svg' />
            }
            {
                type == 'frame' &&
                <img className={`h-[45px] ${isActive ? '' : 'opacity-[0.3]'}`} src='./frame-button.svg' />
            }
            {
                type == 'fly' &&
                <img className={`h-[38px] ${isActive ? '' : 'opacity-[0.3]'}`} src='./fly-button.svg' />
            }
            {
                type == 'eye' &&
                <img className={`h-[38px] ${isActive ? '' : 'opacity-[0.3]'}`} src='./eye-button.svg' />
            }
        </button>
    )
}
export default StickerButton;