import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Context } from '../../Context/Context'
import './style.css'
const host = "http://localhost:8000/"

export default function Compra() {
    const [data, setData] = useState([])
    const { user } = useContext(Context)

    useEffect(()=>{
        const getData = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/compra/my/${user._id}`)
                setData(res.data)
                console.log(res.data)
            } catch (error) {
            }
        }
        getData()
    }, [user._id])
    const LiberarGrana = ()=>{
        Swal.fire({
            title: `Você Tem Certeza?`,
            text: `Ao confirmar, você estarais liberando o Pagamento da compra à Cooperativa!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, Confirmar!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Liberado!',
                'Pagamento Liberado Com Sucesso!.',
                'success'
              )
            }
          })
    }
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
                        <button className='LiberarMassa' onClick={LiberarGrana}>Recebido</button>
                    </div>
                </div>
            </div>

        ))}
    </div>
  )
}
