import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
import Swal from 'sweetalert2'
import { Context } from '../../Context/Context'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import FormEditProduct from '../FormEditProduct/FormEditProduct'
import StripeCheckout from 'react-stripe-checkout';
// const host = "http://localhost:8000/"
var KEY ="pk_test_51Mejt5DzHiXLpKW7t2j0Hs1MJsqQdi9MZWwgZDvKlFWp0fHUPwZCR3TVQSP6JiQhTFz7DZuPt9xrnVSpmajq006M00EpoULyUo"

const keys = 3


export default function ProductBay({data}) {
    const [activeEdit, setActiveEdit] = useState(true)
    const [showCardBay, setShowCardBay] = useState(true)
    const [quantidade, setQuantidade] = useState(1)
    const [novaQuant, setNovaQuant] = useState(1)
    const [total, setTotal] = useState(data && quantidade*data?.preco)
    const { user } = useContext(Context)
    let navigate = useNavigate()
    

    useEffect(()=>{
        const makeBannerModele = ()=>{
            const backGroundBanner = document.getElementById("makeBanner")
            backGroundBanner.style.backgroundImage = 'url("' + data?.banner + '")';
        }
        setTotal(quantidade*data?.preco)
        makeBannerModele()
    }, [quantidade, data?.preco, data?.banner])

    const pagamento = async(token)=>{
        try {
            const res = await axios.post("http://localhost:8000/pay/payment", {
                tokenId: token.id,
                amount: total,
            })
            if(res.data){
                await axios.post("http://localhost:8000/compra/criar", {
                    idproduto: data?._id,
                    produtoNome: data?.nome,
                    produtoImagem: data?.profilePic,
                    iduser: user?._id,
                    idcoop: data?.idcoop,
                    valor:data?.preco,
                    valortotal:total,
                    quantidade: quantidade,
                    estado:"pago" 
                })
                Swal.fire({
                    title: 'Compra realizada com Sucesso. A Cooperativa será Paga Assim que Confirmares o Recebimento Do Produto!',
                    width: 600,
                    padding: '3em',
                    color: '#fff',
                    background: `#69C181 url()`,
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("../logo-sem-fundo.png")
                      left top
                      no-repeat
                    `
                  })

                  navigate(`/user/${user._id}`)
                
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Cancelado!',
                    text: 'Compra cancelada com Sucesso!',
                    footer: '<a href="">Você pode Tentar Novamente?</a>'
                  })
            }
            // navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    const onToken = (token)=>{
        token && pagamento(token)
    }
    
    const SetDit = async()=>{
        if(activeEdit){
            setActiveEdit(false)
        }else{
            setActiveEdit(true)
        }
    }


    const confirmDelect = async ()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                DeleteProduct()
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                )
                navigate('/')
            }
          })
        
    }
    const DeleteProduct = async ()=>{
        try {
            const res = await axios.delete(`http://localhost:8000/product/${data?._id}`, {
                headers:{idcoop: user._id}
            })
            console.log(res)
        } catch (error) {
            alert(error)
        }
    }
    const pagarCardAgora = ()=>{
        if(showCardBay){
            setShowCardBay(false)
        }else{
            setShowCardBay(true)
        }
    }
    const updateValor = ()=>{
        setQuantidade((prev)=>novaQuant)
        setTotal((prev)=>novaQuant*data?.preco)
    }
  return (
    <div className='fullContentProdBay'>
        {activeEdit ? (

            <div className='FullSecundaryContainer' >
                <div className="contentImgProdBay" id='makeBanner'>
                    <img src={data?.profilePic} alt="" className="prodbay" />
                    <div className="dataBanner">
                        <b className="dataBannerItemFirst">{data?.agencia_name}</b>
                        <h1 className="dataBannerItemSecundy">{data?.nome_completo}</h1>
                    </div>
                </div>
                {showCardBay ? (
                <div className="contentdataProdbay">
                    <li className="nome">
                        <span className='nomePro'>Nome: </span><span className='ValorNome'>{data?.nome}</span>
                    </li>
                    <li className="dinheiro">
                        <span className='vAtual'>R ${data?.preco}</span><span className='vAnte'>R ${data?.preco}</span>
                    </li>
                    {/* <li className="descGrup">
                        <span className='nomePro'>descrição:</span>
                        <span className='Valordesc'>
                            <p>Aqui Na plataforma, há modelos de diversas categorias  . Venha Aproveitar Favoritar as agências que tu mais gostas para que cada modelo que tu deseja contratar seus serviços, Em um click você terá tudo que deseja ao seu dispor.</p>
                            <p>{data.desc}</p>
                        </span>
                    </li> */}
                    <div className="containerItensDetilles">
                        <div className="rightContainer">
                            <b>Categoria</b> <i>{data?.categoria}</i>
                        </div>
                        <div className="leftContainer">
                            <b>Altura</b> <i>{data?.altura} (m)</i>
                        </div>  
                    </div>
                    <div className="containerItensDetilles">
                        <div className="rightContainer">
                            <b>Cabelo-Cor</b> <i>{data?.cor_cabelo}</i>
                        </div>
                        <div className="leftContainer">
                            <b>Olhos-Cor</b> <i>{data?.cor_olhos}</i>
                        </div>  
                    </div>
                    <div className="containerItensDetilles">
                        <div className="rightContainer">
                            <b>Pele-Cor</b> <i>{data?.cor_pele}</i>
                        </div>
                        <div className="leftContainer">
                            <b>Genero</b> <i>{data?.genero}</i>
                        </div>  
                    </div>
                    <div className="containerItensDetilles">
                        <div className="rightContainer">
                            <b>CPF</b> <i>{data?.cpf}</i>
                        </div>
                        <div className="leftContainer">
                            <b>Orientacao-Sexual</b> <i>{data?.orientacao_sexual}</i>
                        </div>  
                    </div>
                    <div className="containerItensDetilles">
                        <div className="rightContainer">
                            <b>Peso</b> <i>{data?.peso} kg</i>
                        </div>
                        <div className="leftContainer">
                            <b>Sexo</b> <i>{data?.sexo}</i>
                        </div>  
                    </div>
                    <div className="containerItensDetilles">
                        <div className="rightContainer">
                            <b>Cabelo-Tipo</b> <i>{data?.tipo_cabelo}</i>
                        </div>
                        <div className="leftContainer">
                            <b>Corpo-Tipo</b> <i>{data?.tipo_corpo}</i>
                        </div>  
                    </div>
                    {data.agencia_id === user._id && (
                        <>
                        {user.type === "coop" && (
                        <li className="buttonsGrup">
                            <button className='DeliteBuu' onClick={SetDit}>Editar</button>
                            <button className='delitBoo' onClick={confirmDelect}>Deletar</button>
                        </li>
                        )}
                        </>
                    )}
                    {user.cpf && (
                    <li className="comprarFirstStap">
                        {keys === 100 && (<input type="number" onChange={(e)=>setQuantidade(e.target.value)} className='compraValor' placeholder='Quantidade' />)}
                        <button className='buCompFirstStap' onClick={pagarCardAgora}>CONTRATAR</button>
                    </li>
                    )}
                </div>):(
                    <div id="bayCArd" >
                        <li className="nome">
                            <span className='nomePro'>Nome: </span><span className='ValorNome'>{data.nome}</span>
                        </li>
                        <li className="dinheiro">
                            <span className='vAtual'>R ${data.preco}</span><span className='vAnte'>R ${data.precoanterior}</span>
                        </li>
                        <div className="totalProduct">
                            <div className="result">
                                <span className="precoatualnew">R ${data.preco}</span>
                                <span className="quantinew">*</span>
                                <span className="quantinew">{quantidade}</span>
                                <span className="quantinew">=</span>
                                <span className="resultadonew">R $</span>
                                <span className="resultadonew">{total}</span>
                                <span className="resultadonew">,00 Total</span>
                            </div>
                            <div className="buttonSetValors">
                                <input type="number"  placeholder="HORAS" onChange={(e)=>setNovaQuant(e.target.value)} className="numeroquanti" /> 
                                <button className="setAllValors" onClick={updateValor}>Atualizar</button>
                            </div>
                        </div>
                        <div className="ppay">
                            <StripeCheckout
                                name= "WORLD FASHION MODELS"
                                image="../logo.png"
                                description={`O seu Total é R $${total}`}
                                amount={total}
                                stripeKey={KEY}
                                token={onToken}
                            >
                                <button className='ComprarAgora'><i className="fa-brands fa-cc-mastercard"></i> <i className="fa-brands fa-cc-visa marginCardBay"></i> CONTRATAR AGORA</button>
                            </StripeCheckout>
                        </div>
                        
                    </div>
                )}
            </div>
        ):(
            <FormEditProduct data={data} setActiveEdit={setActiveEdit} />
        )}
    </div>
  )
}
