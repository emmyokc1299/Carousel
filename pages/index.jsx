import Carousel, { Card } from "../components/Carousel";



export default function Home() {

  const arr = new Array(10).fill("")

  return (
    <div className="redBorder w-screen h-screen flex items-center justify-center">
      <div className="max-w-[600px] ">
          <Carousel space={60} divPerSlide = {5} speed = "slow">
            {
              arr.map((el, index) => (

                <div className='w-[200px] h-[100px] border border-blue-300'>nnb</div>
              ))
            }
              
          </Carousel>
      </div>

      

    </div>
  )
}
