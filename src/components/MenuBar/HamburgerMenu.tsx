import React, { useState } from 'react'



interface HamburgerMenuProps {
    onClick?(): void
    value?: boolean
}

const HamburgerMenu = ({ onClick, value }: HamburgerMenuProps) => {

    return (
        <button
            className='absolute cursor-pointer inline-flex items-center justify-center w-[92px] h-[92px] rounded-full border border-white bg-[#CAD0E5]'
            onClick={onClick}
        >
            <span className={`absolute inline-flex items-center justify-center bg-[#D5DCF4] h-[60px] w-[60px] rounded-full`}>
                {
                    value ?
                        <img className={`h-[24px]`} src='./menu-button.svg' />
                        :
                        <img className={`h-[24px]`} src='./close-button.svg' />
                }
            </span>
        </button>
    )
}


export default HamburgerMenu