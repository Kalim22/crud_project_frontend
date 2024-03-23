import React from 'react'
import { CircularProgress } from '@chakra-ui/react'

const Loader:React.FC = () => {
  return (
    <div className='loader__container'>
    <CircularProgress isIndeterminate color='green.300' />
    </div>
  )
}

export default Loader
