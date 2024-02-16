import React from 'react';
import Icon from './logo5.png'

function Logo({width='200px'}) {
  return (
    <img className='rounded-md' src={Icon} alt="Logo" width={width} />
  )
}

export default Logo;