import React from 'react'
import spinner from '../images/Spinner1.gif'

function Spinner () {
  return (
    <div className='d-flex justify-content-center'>
        <img src={spinner} alt="spin" style={{width: "80px", marginTop: "20px"}} />
    </div>
  )
}

export default Spinner