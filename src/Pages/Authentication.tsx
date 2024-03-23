import React, { useState, useEffect } from 'react'
import { Text } from '@chakra-ui/react'
import { RiArrowDownSFill } from 'react-icons/ri'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import Headers from '../components/Headers'
import { useDisclosure } from '@chakra-ui/react'
import OverlayModal from '../components/Modal'
import InputField from '../components/InputField'

type textValue = {
  firstName: '',
  lastName: ''
}

const Authentication: React.FC = () => {

  const navigate = useNavigate()

  const { isOpen: isRegisterOpen, onClose: onRegisterClose, onOpen: onRegisterOpen } = useDisclosure()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [text, setText] = useState<textValue>({
    firstName: '',
    lastName: ''
  })

  const { firstName, lastName } = text

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText({ ...text, [e.target.name]: e.target.value })
  }

  const fetchAllUsers = async (): Promise<any> => {
    try {
      setLoading(true)
      const res = await fetch("http://localhost:8000/apiv1/get-all-users/", {
        method: 'GET'
      })
      const data = await res.json()
      setLoading(false)
      setUsers(data?.users)
    } catch (error) {
      console.log(error)
    }
  }


  const fetchRegisterUser = async (e: React.FormEvent): Promise<any> => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch("http://localhost:8000/apiv1/add-new-user/", {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          "firstName": firstName,
          "lastName": lastName
        }),
        redirect: 'follow'
      })

      const data = await res.json()
      setLoading(false)
      if (data?.status === true) {
        onRegisterClose()
        setText({
          firstName: "",
          lastName: ""
        })
        fetchAllUsers()
        return alert(data?.message)
      }
      return alert(data?.error)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = (user: string) => {
    localStorage.setItem('crudauth', JSON.stringify(user))
    return navigate('/')

  }

  useEffect(() => {
    (async () => {
      await fetchAllUsers()
    })()
  }, [])

  if (loading) {
    return <Loader />
  }


  return (
    <section className='container__full' style={{ height: '100vh', overflow: 'hidden', background: 'linear-gradient(90deg, hsla(221, 59%, 75%, 1) 0%, hsla(216, 40%, 58%, 1) 100%)' }}>
      <Headers onOpen={onRegisterOpen} primaryButtonText='Register user' background='#9BB2E5' />
      <div className='box'>
        <div className='line__box'>
          <Text
            bgGradient="linear(to-l, #9BB2E5, #698CBF)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            Welcome to Stock Inventory
          </Text>
        </div>
        <div className='line__box'>
          <div className='inner__line__box'>
            <Text
              bgGradient="linear(to-l, #9BB2E5, #698CBF)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              Log In As
            </Text>
          </div>
          <div className='inner__line__box'>
            <div className="tutorial">
              <ul>
                <li>
                  <p style={{ display: 'flex', justifyContent: 'center' }}>Select User <RiArrowDownSFill style={{ alignSelf: 'center' }} /></p>
                  <ul>
                    {
                      users?.map((ele, idx) => {
                        return (
                          <li onClick={() => handleLogin(ele)} key={idx}>{ele?.firstName.charAt(0).toUpperCase() + ele?.firstName.substring(1, ele?.firstName.length)} {ele?.lastName.charAt(0).toUpperCase() + ele?.lastName.substring(1, ele?.lastName.length)} <span>{ele?.userId}</span></li>
                        )
                      })
                    }
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

{/* Pop up modal for register user */}
      <OverlayModal isOpen={isRegisterOpen} onClose={onRegisterClose} onSubmit={fetchRegisterUser} modalTitle='Register New User' primaryButtonText='Add User'>
        <InputField name='firstName' type="text" value={firstName} placeholder="Firstname" onChange={handleChange} required={true} />
        <InputField name='lastName' type="text" value={lastName} placeholder="Lastname" onChange={handleChange} required={true} />
      </OverlayModal>
    </section>
  )
}

export default Authentication