import { useRef, useState } from 'react';
import EyeBall from './components/EyeBall';
import { Point } from './common-types';
import { getAngleAndDirection } from './utils/getAngleAndDirection';
import MenuBar, { Value } from './components/MenuBar';


const App = () => {
  const [flyPosition, setFlyPosition] = useState<Point>({ x: 100, y: 100 });
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const timeRef = useRef<any>(undefined);
  const [menuValue, setMenuValue] = useState<Value>({ cat: true, eye: true, fly: true, frame: true });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    clearTimeout(timeRef.current)

    timeRef.current = setTimeout(() => {
      const { clientX: x, clientY: y } = event;
      const { direction, distance } = getAngleAndDirection(flyPosition, { x, y });
      if (distance < 10) return;
      setFlyPosition({ x, y });
      setDirection(direction);
    }, 160);
  };

  const getItemsClassName = (value: keyof Value) => {

    if (value == 'frame') {
      return !menuValue.frame ? 'opacity-0' : ''
    }

    if (value == 'cat') {
      return !menuValue.cat ? 'opacity-0' : ''
    }

    if (value == 'fly') {
      return !menuValue.fly ? 'opacity-0' : ''
    }

    if (value == 'eye') {
      return !menuValue.eye ? 'opacity-0' : ''
    }
  }

  return (
    <div
      className='relative w-screen h-screen bg-[#B1BEEB] overflow-hidden'
      onMouseMove={handleMouseMove}
    >

      <div className='absolute w-[480px] h-[480px] m-auto left-0 right-0 top-0 bottom-0' >

        <img className={`absolute h-full transition-all duration-500 ease-in-out ${getItemsClassName('frame')}`} src='./photo-frame.svg' />
        <div className={`absolute w-[311px] h-[311px] left-[78px] top-[78px] bg-[#6D8084] transition-all duration-500 ease-in-out ${getItemsClassName('frame')}`} />
        <EyeBall className={`${getItemsClassName('eye')}`} position={{ left: 223, top: 185 }} socketColor={'#A6965C'} size={40} pupilSize={30} type='right' />
        <EyeBall className={`${getItemsClassName('eye')}`} position={{ left: 135, top: 185 }} socketColor={'#A6965C'} size={40} pupilSize={30} type='left' />
        <img className={`absolute left-[78px] bottom-[90px] h-[280px] transition-all duration-500 ease-in-out ${getItemsClassName('cat')}`} src='./cat.svg' />

      </div>
      <div
        className={`absolute inline-flex justify-center items-center w-0 h-0  transition-all duration-1000 ease-in-out ${getItemsClassName('fly')}`}
        style={{ left: flyPosition.x, top: flyPosition.y }}
      >
        <div
          className='absolute w-[80px] h-[80px] border border-gray-100 shrink-0 text-lg text-gray-50 border-none'
        >
          <img src='./bee.gif' className={`absolute w-full ${direction == 'right' ? 'scale-[-1_1]' : ''} `} />
        </div>
      </div>
      <MenuBar
        className='absolute bottom-[52px] m-auto left-0 right-0'
        onChange={setMenuValue}
        value={menuValue}
      />
    </div>
  )
}


export default App
