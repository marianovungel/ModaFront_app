import React from 'react'
import Coops from '../../Components/Coops/Coops'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import './style.css'

export default function Coop() {
  return (
    <div className='fullConteinerHome'>
        <Header />
        <Menu />
        <Coops text={"Agências"} />
        <div className="headerHome"></div>
    </div>
  )
}