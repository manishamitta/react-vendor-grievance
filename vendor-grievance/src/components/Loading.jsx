import React from 'react'
import Loader from './images/Loading.gif'
function Loading() {
  return (
    <div className='loadingGif'>
      <img src= {Loader}  style={{heigth : "50px" , width:"50px"}}alt="" className="loader"  />
    </div>
  )
}

export default Loading;