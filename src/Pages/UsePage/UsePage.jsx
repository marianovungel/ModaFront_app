import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import Compra from '../../Components/Compra/Compra'
import EditUse from '../../Components/EditUse/EditUse'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import { Context } from '../../Context/Context'
import './style.css'

export default function UsePage() {
    const [showEditCoop, setShowEditCoop] = useState(false)
    const [coop, setCoop] = useState({})
    const localization = useLocation()
    const path = localization.pathname.split("/")[2]
    const { dispatch, user } = useContext(Context)

    const EditCoooop = ()=>{
        if(showEditCoop){
            setShowEditCoop(false)
        }else{
            setShowEditCoop(true)
        }
    }

    const suaFalta = async ()=>{
        Swal.fire({
            title: 'Obrigado Pela Sugestão. A gente Adorou o seu tempo aqui e Sintiremos a sua Falta!',
            width: 600,
            padding: '3em',
            color: '#fff',
            background: '#69C181 url()',
            backdrop: `
              rgba(0,0,123,0.4)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
            `
          })

          hendSairConf()
    }
    const sugestao = async ()=>{
        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Message',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true
          })
          
          if (text) {
            Swal.fire(` OBRIGADO Pela sujestão, a Gente Promete Melhorar pela Próxima!`)
            suaFalta()
          }
          
    }

    const hendSair = ()=>{
        Swal.fire({
            title: 'Sair!',
            text: "Você Tem Certeza?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#69C181',
            confirmButtonText: 'Sim, Sair!'
          }).then((result) => {
            if (result.isConfirmed) {
                
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              sugestao()
            }
          })
    }
    const hendSairConf = ()=>{
        dispatch({type: "LOGOUT"})
    }

    useEffect(()=>{
        const getCoop = async()=>{
            const res = await axios.get(`http://localhost:8000/auth/${path}`)
            setCoop(res.data)
        }
        getCoop()
    }, [path])

  return (
    <div className='fullConteinerCoopPage'>
        <Header />
        <Menu />
        <div className="conteinerCoop">
            <div className="sideBarCoop">
                <div className="descCoop">
                    
                    <div className="enderecoCoop">
                        <span className="textCoop">Endereço</span>
                        <div className="descEndCoop">
                            {coop.endereco}
                        </div>
                    </div>
                    <div className="avaliacoesCoop">
                        <span className="textCoop">Email</span>
                        <div className="descEndCoop">
                            {coop.email}
                        </div>
                    </div>
                    <div className="avaliacoesCoop">
                        <span className="textCoop">Whatsapp</span>
                        <div className="descEndCoop">
                            {coop.whatsapp}
                        </div>
                    </div>
                </div>
                {user._id === path && (
                    <>
                    <button className="buttonCoopEdit" onClick={EditCoooop}>
                        <i className="fa-solid fa-user-pen mW"></i> Editar
                    </button>
                    <button className="buttonCoopSair" onClick={hendSair}>
                        <i className="fa-solid fa-right-from-bracket mW"></i> Logout
                    </button>
                    </>
                )}
            </div>
            <div className="settingCoop">
                <div className="nomeCoopCont">
                    {coop.username}
                </div>
                {showEditCoop && (<EditUse path={path} />)}
                <div className="textCompraH"><h3 className='encostarNaParede'>Compras à Receber</h3></div>
                <Compra text={"Produto"} path={path} />
            </div>
        </div>
    </div>
  )
}
