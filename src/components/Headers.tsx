import React, { useState, useEffect } from 'react'
import { Button, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

type Props = {
  onOpen: () => void,
  primaryButtonText: string,
  background?: string
}

type authValueObj = {
  firstName: string,
  lastName: string,
  userId: string
}

const Headers: React.FC<Props> = ({ onOpen, primaryButtonText, background }) => {

  const navigate = useNavigate()
  const [authValue, setAuthValue] = useState<authValueObj>()

  const handleLogout = () => {
    localStorage.removeItem('crudauth')
    return navigate('/authentication')
  }

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('crudauth') || '""')
    setAuthValue(auth)
  }, [])

  return (
    <header>
      <div className='username'>
        {
          authValue ?
            <Text
              bgGradient="linear(to-l, #9BB2E5, #698CBF)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              {`${authValue?.firstName?.charAt(0).toUpperCase()}` + `${authValue?.firstName?.substring(1, authValue?.firstName?.length)}`}
              {` ${authValue?.lastName?.charAt(0).toUpperCase()}` + `${authValue?.lastName?.substring(1, authValue?.lastName?.length)}`}
            </Text> : null
        }
      </div>
      <div className='headers__btns'>
        <Button _hover={{ background: 'blue.700', color: 'white' }} color="white" background={background || "green"} onClick={onOpen}>{primaryButtonText}</Button>
        {
          authValue &&
          <Button background="gray.300" _hover={{ background: 'gray.500', color: 'black' }} onClick={handleLogout}>Logout</Button>
        }
      </div>
    </header >
  )
}

export default Headers
