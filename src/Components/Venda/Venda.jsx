import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context'
import './style.css'
const host = "http://localhost:8000/"

export default function Venda() {
    const [data, setData] = useState([])
    const { user } = useContext(Context)

    useEffect(()=>{
        const getData = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/compra/coop/${user._id}`)
                setData(res.data)
                console.log(res.data)
            } catch (error) {
            }
        }
        getData()
    }, [user._id])
    
  return (
    <div className='fullContentCompra'>
        {data?.map((compra)=>(
            <div className="cardCompra" key={compra._id}>
                <div className="imgCardCompra">
                    <img src={host+compra.produtoImagem} alt="" className="commpraImg" />
                </div>
                <div className="textCompraCard">
                    <p className="compratExt">{compra.produtoNome}</p>
                    <div className="precoCompra">
                        <span className="chaveCompra">Preço</span>
                        <span className="ValorrCompra">{compra.valor}</span>
                    </div>
                    <div className="precoCompra">
                        <span className="chaveCompra">Quantidade</span>
                        <span className="ValorrCompra">x{compra.quantidade}</span>
                    </div>
                    <div className="precoCompra">
                        <span className="chaveCompra">Valor Total</span>
                        <span className="ValorrCompra">R ${compra.valortotal}</span>
                    </div>
                    <div className="buttonsComprov">
                        {/* <button className='CancelarCompra'>Cancelar</button> */}

                    </div>
                </div>
            </div>

        ))}
    </div>
  )
}
