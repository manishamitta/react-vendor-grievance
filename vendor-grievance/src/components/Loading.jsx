import React from 'react'
import Loader from './images/Loading.gif'
function Loading({height,width}) {
  return (
    <div className='loadingGif'>
      <img src= {Loader}  alt="" className="loader"  />
    </div>
  )
}

export default Loading;