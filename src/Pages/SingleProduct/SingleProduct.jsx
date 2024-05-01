import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import ProductBay from '../../Components/ProductBay/ProductBay'
import { Context } from '../../Context/Context'
import './style.css'

export default function SingleProduct() {
    const [show, setShow] = useState(true)
    const [coop, setCoop] = useState({})
    const [data, setData] = useState({})
    const localization = useLocation()
    const path = localization.pathname.split("/")[2]
    
    const { user } = useContext(Context)

    useEffect(()=>{
        const getCoopProduct = async(idcoop)=>{
            const response = await axios.get(`http://localhost:8000/coop/${idcoop}`)
            setCoop(response.data)
        }
        const getProdct = async()=>{
            const res = await axios.get(`http://localhost:8000/product/${path}`)
            getCoopProduct(res.data.idcoop)
            setData(res.data)
            
        }
        getProdct()
    }, [path])


    const SetShow = ()=>{
        if(show){
            setShow(false)
        }else{
            setShow(true)
        }
    }

  return (
    <div className='fullConteinerCoopPage'>
        <Header />
        <Menu />
        <div className="conteinerCoop">
            <div className="sideBarCoop">
                <div className="descCoop">
                    <div className="avaliacoesCoop">
                        <span className="textCoop">Avaliações</span>
                        <div className="starCoop">
                            <span className='numCoop'>4.85</span>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                    </div>
                    <div className="enderecoCoop">
                        <span className="textCoop">Endereço</span>
                        <div className="descEndCoop">
                            {coop?.sobre}
                        </div>
                    </div>
                    <div className="avaliacoesCoop">
                        <span className="textCoop">Horário</span>
                        <div className="descEndCoop">{coop?.horario}</div>
                    </div>
                </div>
                {user?._id === data.idcoop && (
                <button className="buttonCoop" onClick={SetShow}>
                    <i className="fa-regular fa-pen-to-square mW"></i> Cradastrar
                </button>
                )}
            </div>
            <div className="settingCoop">
                <div className="nomeCoopCont">{coop?.nome}</div>
                {/* criar novo componente para produto */}
                <ProductBay data={data} />
            </div>
        </div>
    </div>
  )
}
