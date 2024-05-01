import React from 'react'
import './style.css'
const host = "http://localhost:8000/"

export default function Header() {
  return (
    <div className='fullConteinerHeader'>
        <img src={`${host}uploads/logo-sem-fundo.png`} className='imgHeader' alt="" />
    </div>
  )
}
