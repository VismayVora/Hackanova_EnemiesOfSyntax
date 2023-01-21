import React, { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { useParams } from 'react-router-dom'

const Package = () => {
  const { id } = useParams()
  useEffect(() => {
    
  }, [id])
  
  return (
    <div>
      <Navbar />
      
    </div>
  )
}

export default Package