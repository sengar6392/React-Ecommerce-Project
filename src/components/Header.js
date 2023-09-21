import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Nav from './Nav'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from '../redux/slice/productsSlice'
const Header = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (
    <MainHeader>
        <NavLink to="/">
            <img src="./images/logo.png" alt="my logo png" className='logo'/>
        </NavLink>
        <Nav/>
    </MainHeader>
  )
}

const MainHeader = styled.header` 
 height: 10rem;
 background-color:${({theme})=>theme.colors.bg};
 display:flex;
 justify-content: space-between;
 align-items: center;
 position: relative;
.logo{
 height: 18rem;
}
@media (max-width:${({theme})=>theme.media.mobile}) { 
} 
`;
export default Header