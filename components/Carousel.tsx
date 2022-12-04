import React, { Children, forwardRef, Ref, useEffect, useRef, useState } from 'react'
import { cloneElement } from 'react'
import { CardProps, CardsProps, CarouselProps } from './types'
import {BiChevronRight, BiChevronLeft} from "react-icons/bi"

type RefType = HTMLDivElement


const Carousel = ({children, space = 8,  speed = "medium", width = 100}: CarouselProps) => {

    const parentRef = useRef<HTMLDivElement | null>(null)
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const childRef = React.createRef<HTMLDivElement>();
    /** Reason for using createRef and not useRef:  https://dev.to/jexperton/ref-forwarding-with-react-function-components-and-typescript-20ip */

    const arrayChildren = Children.toArray(children)
    const [bubbleArray, setBubbleArray] = useState<number[]>([]) 
    const [refWidth, setRefWidth] = useState<number>(0)
    const [mainRefWidth, setMainRefWidth] = useState<number>(0)


    const step = parentRef.current?.clientWidth * 1
    // console.log(scrollRefWidth)

    ///useEffect to calculate the number of pagination bubbles

    useEffect(() => {

      const num = Math.round((scrollRef.current?.scrollWidth / (parentRef.current?.clientWidth * 1)))
      console.log(scrollRef.current?.scrollWidth)

      let newArray = []
      for(let i = 0; i < num; i++){
        newArray.push(i)
      }
      setBubbleArray(newArray)

    }, [scrollRef])
    


    const handlePaginate = (num) => {

      const bubbleNum = (num*step)
      scrollRef.current.scrollLeft = bubbleNum
      // setMainRefWidth(bubbleNum)
      setRefWidth(bubbleNum)

    }


    useEffect(() => {
      console.log(refWidth)
    }, [refWidth])
    


    const handleOffset = (offset: number) => {
      let val
      switch (speed) {
        case speed = "slow":
          scrollRef.current.scrollLeft += ((parentRef.current?.clientWidth * 0.2) * offset)
          val = scrollRef.current.scrollLeft + ((parentRef.current?.clientWidth * 0.2) * offset)
          if (val < 0 ){ setRefWidth(0)}
          else if (val > scrollRef.current?.scrollWidth) {setRefWidth(scrollRef.current?.scrollWidth) }
          else setRefWidth(val)
          break;

        case speed = "medium":
          scrollRef.current.scrollLeft += ((parentRef.current?.clientWidth * 0.75) * offset)
          val = scrollRef.current.scrollLeft + ((parentRef.current?.clientWidth * 0.75) * offset)
          if (val < 0 ){ setRefWidth(0)}
          else if (val > scrollRef.current?.scrollWidth) {setRefWidth(scrollRef.current?.scrollWidth) }
          else setRefWidth(val)
          break;
        case speed = "fast":
          scrollRef.current.scrollLeft += ((parentRef.current?.clientWidth * 1) * offset)
          val = scrollRef.current.scrollLeft + ((parentRef.current?.clientWidth * 1) * offset)
          if (val < 0 ){ setRefWidth(0)}
          else if (val > scrollRef.current?.scrollWidth) {setRefWidth(scrollRef.current?.scrollWidth) }
          else setRefWidth(val)
          break;
        default:
          break;
      }

      // console.log(scrollRef.current?.scrollLeft)

    }


  return (
      <div className={`relative border-2 border-red-400`} style={{width: `${width}%`}} ref={parentRef}>
        {/* BiChevronLeft showed when placed here but the handleOffset fxn did not fire. Find out why */}
          <div ref={scrollRef} className = {`flex flex-row overflow-x-hidden relative scroll-smooth`} style={{columnGap: space}}>
              {
                Children.map(arrayChildren, (child, index) => (
                  <Card ref={childRef}>
                    {cloneElement(child)}
                  </Card>
                ))
              }
          </div>
          <BiChevronLeft className='text-[42px] absolute top-[35%] left-3' onClick={() => handleOffset(-1)} />
          <BiChevronRight className='text-[42px] absolute top-[35%] right-3' onClick={() => handleOffset(1)}/>
          <div className='w-full flex justify-center gap-x-1 mt-4'>
              {
                bubbleArray.map((el, index) => (
                  <div key={index} className={`w-[10px] h-[10px] border border-blue-400 rounded-full ${
                    (Number(`${refWidth/step}`[0]) == el || ((Number(`${refWidth/step}`[0]) == (el + 1)) && el + 1 == bubbleArray.length)) ? "bg-blue-400" : "bg-transparent"
                  }`} onClick={() => handlePaginate(el)}>
                  </div>
                ))
              }
          </div>
          
      </div>
  )
}

export default Carousel








export const Card = forwardRef<RefType, CardProps>(({children}: CardProps, ref) => {

  return(
    <div ref = {ref} className="border border-green-400 inline-block">
      {children}
    </div>
  )
}
)








/**
 * The width of the carousel will take the full width of its containing div.
 */

/***
export const Card = forwardRef<Ref, CardProps>(({children}: CardProps, ref: React.ForwardedRef<HTMLDivElement> ) => {





  // const [width, setWidth] = useState<number>(0)
    

    // useEffect(() => {
    //     // console.log(parentRef.current?.clientWidth)
    //     // console.log(scrollRef.current?.clientWidth)
    //     // setWidth((divPerSlide * childRef.current?.clientWidth) + (divPerSlide * space))
        

    // }, [divPerSlide, space])
 * 
 */