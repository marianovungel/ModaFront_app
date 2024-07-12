import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Destaque from '../../Components/Destaque/Destaque'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import Produto from '../../Components/Produto/Produto'
import './style.css'

export default function Home() {
  const [datad, setDatad] = useState([])

  useEffect(()=>{
    const getData = async()=>{
        const res = await axios.get("http://localhost:8000/modelo")
        // console.log(res.data)
        setDatad(res.data)
    }
    getData()
}, [])

  return (
    <div className='fullConteinerHome'>
        <Header />
        <Menu setDatad={setDatad} />
        <Destaque />
        <Produto text={"Modelos em Destaque"} datad={datad} />
        <div className="headerHome"></div>
    </div>
  )
}
