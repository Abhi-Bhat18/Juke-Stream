import React,{useContext,useState,useEffect} from 'react'
import { SidebarContext } from '../Context/SibebarContext'
const Home = () => {
  
  const {showMenu,setShowMenu} = useContext(SidebarContext)
  useEffect(() => {
    if(showMenu) setShowMenu(false)
  }, [])

  return (
    <div className=''>This is home compoent</div>
  )
}

export default Home