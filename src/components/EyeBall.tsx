import { useRef } from 'react'
import useMousePosition from '../hooks/useMousePosition';
import { getIntermediatePoint } from '../utils/getIntermediatePoint';

interface EyeBallProps {
    size: number
    pupilSize: number
    socketColor: string
    type: 'left' | 'right'
    position: { left: number, top: number }
    distance?: number
    opacity?: number
    className?: string
}

type Coord = { x: undefined | number, y: undefined | number }


const EyeBall = ({ size, pupilSize, socketColor, type, position, distance, opacity, className }: EyeBallProps) => {
    const { x, y } = useMousePosition();
    const originRef = useRef<HTMLDivElement>(null);

    const point: Coord = { x: undefined, y: undefined }

    if (originRef.current) {
        const originEl = originRef.current;
        let { left, top, width, height } = originEl.getBoundingClientRect();

        let pointA = { x: width, y: height };
        let pointB = { x: x - left, y: y - top };

        let pointC = getIntermediatePoint(pointA, pointB, distance ?? 14)

        point.x = pointC.x
        point.y = pointC.y
    }

    return (
        <div
            className={`absolute inline-block rounded-full left-[800px] top-[400px] transition-all duration-500 ease-in-out ${className}`}
            style={{ width: size, height: size, backgroundColor: socketColor, ...position, opacity }}
        >
            <div
                ref={originRef}
                className='absolute inline-flex justify-center items-center w-0 h-0'
                style={{ left: size / 2, top: size / 2 }}
            >
                <div

                    className='absolute inline-flex justify-center items-center w-0 h-0 delay-[250ms] transition-all duration-1000 ease-in-out'
                    style={{ left: point.x ?? 0, top: point.y ?? 0 }}
                >
                    <div
                        className='inline-flex justify-center items-center shrink-0 rounded-full'
                        style={{ width: pupilSize, height: pupilSize }}
                    >
                        {
                            type == 'left' &&
                            <img className='shrink-0 h-full' src='./left-eye.svg' />
                        }
                        {
                            type == 'right' &&
                            <img className='shrink-0 h-full' src='./right-eye.svg' />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default EyeBall
