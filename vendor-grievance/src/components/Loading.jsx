import React from 'react'
import Loader from './images/Loading.gif'
function Loading({minh}) {
  return (
    <div className='loadingGif' style={{minHeight : minh}}>
      <img src= {Loader}  alt="" className="loader"  />
    </div>
  )
}

export default Loading;