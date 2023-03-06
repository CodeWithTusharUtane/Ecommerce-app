import React, { useEffect, useState } from 'react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import {sliderImage} from '../Data/SliderData' 


const Slider = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideIndex = sliderImage.length;
  
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideIndex - 1 ?  0 :currentSlide + 1)
  }
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideIndex - 1 : currentSlide -1)
  }

  useEffect(() => {
    setCurrentSlide(0)
  }, [])
  
  

  useEffect(()=>{
    if( autoScroll ){
      function auto () {
        slideInterval = setInterval(nextSlide, intervalTime)
      }
      auto()
    }
    return () => clearInterval(slideInterval)
  },[currentSlide, slideInterval, autoScroll])

  return (
    <div>
      <AiOutlineArrowLeft className='prev'  onClick={prevSlide}/>
      <AiOutlineArrowRight className='next' onClick={nextSlide} />

      {sliderImage.map((item, index)=>{
        const {image, title, desc} = item;;
        return(
          <div key={index}>

              {index === currentSlide && (
                <>
                  <img src={image} alt="slide" className='w-64'/>
                  <div>
                    <h2>{title}</h2>
                    <p>{desc}</p>
                    <hr />
                    <a href="#product" className='bg-blue-400 text-white'>
                      Shop Now
                    </a>
                  </div>
                </>
              )}

          </div>
        )
      })}
    </div>
  )
}

export default Slider