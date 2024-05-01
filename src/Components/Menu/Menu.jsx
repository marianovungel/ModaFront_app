import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'
import './style.css'
const host = "http://localhost:8000/"

export default function Menu({ setDatad }) {
  const [palavra, setPalavra] = useState("")
  const { user } = useContext(Context)

  const pesquisar = async()=>{
    try {
      if(palavra.length > 0){
        const newPesq = await axios.get(`http://localhost:8000/product/pesquisa/${palavra}`)
        setDatad(newPesq.data)
      }else{
        const newPesq = await axios.get(`http://localhost:8000/product/`)
        setDatad(newPesq.data)
      }
    } catch (error) {}
  }

  return (
    <div className='fullContentMenu'>
        <div className="itensMenu">
            <li className="itemContentMenu"><Link to="/" className='a'>Home</Link></li>
            <li className="itemContentMenu"><Link to="/cooperativa">Agências</Link></li>
        </div>
        <div className="serchMenu">
            <input type="text" onChange={(e)=>setPalavra(e.target.value)} placeholder='Pesquisar Produto' className="serchMEnuInput" />
            <button className="serchMenuButton" onClick={pesquisar}>
                <i className="fa-solid fa-magnifying-glass trocarCor"></i>
            </button>
        </div>
        <div className="vazia">
          {user.type === "coop" ? (
            <Link to={`/cooperativa/${user._id}`}>
              <img src={host+user.profilePic} alt="" className="imgProfileUseOrCoop" />  
            </Link>
          ):(
            <Link to={`/user/${user._id}`}>
              <img src={host+user.profilePic} alt="" className="imgProfileUseOrCoop" />  
            </Link>
          )}
        </div>
    </div>
  )
}
