import React, { useContext, useState } from 'react'
import './style.css'
import axios from 'axios';
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';

//upload img
async function postImage({file, filename}) {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("name", filename)
  
    const result = await axios.post('http://localhost:8000/pic', formData, { headers: {'Content-Type': 'multipart/form-data'}})
    return result.data
  }


export default function FormCad({ setShow }) {

    const [file, setFile] = useState(null)
    const [nome, setNome] = useState("")
    const [desc, setDesc] = useState("")
    const [precoatual, setPrecoatual] = useState("")
    const [precoanterior, setPrecoanterior] = useState("")
    const { user } = useContext(Context)

    const handleSubmit = async ()=>{
        const filename = Date.now();
        const data = await postImage({file, filename})
        return data.picture.src;
    }

    const cadastrarProduct = async()=>{
        try {
            const URL = await handleSubmit()
            const modelProdct = {
                nome,
                desc,
                precoatual,
                precoanterior,
                profilePic: URL,
                idcoop:user._id
            }
            await axios.post("http://localhost:8000/product/criar", modelProdct)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Produto cadastrado com SUCESSO!',
                showConfirmButton: false,
                timer: 3000
              })
              SetShow()
        } catch (error) {
            console.log(error)
        }
    }

    const SetShow = ()=>{
        setShow(true)
    }

  return (
    <div className='FullcontentFormCad'>
        <div className="FormCad">
            <div className="imgCadForm">
                
                {file && (
                    <img 
                    className="imgFormAtual" 
                    src={file && URL.createObjectURL(file)} 
                    alt="" 
                />)}
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} name='imgff' id='imgff' alt="" className='imgAtual' />
                <label htmlFor="imgff" className='labelImgCad'><i className="fa-regular fa-image imar"></i> Imagem</label>
                {/* <img src="" alt="" className="imgForm" /> */}
            </div>
            <div className="nomeFormProd">
                <input type="text" className="nomeatual" placeholder='Nome' onChange={(e)=>setNome(e.target.value)} />
            </div>
            <div className="nomeFormProd">
                <input type="text" className="nomeatual" placeholder='Descrição' onChange={(e)=>setDesc(e.target.value)} />
            </div>
            <div className="precoAtual">
                <input type="number" className="precoAtualFo" placeholder='Preço Atual' onChange={(e)=>setPrecoatual(e.target.value)} />
                <input type="number" className="precoAtualFo" placeholder='Preço Anterior' onChange={(e)=>setPrecoanterior(e.target.value)} />
            </div>
            <div className="buttonSubmitAtual">
                <button className="buttonFormCad" onClick={cadastrarProduct}>Cadastrar</button>
            </div>
        </div>
        <button className='buttonBackAbsolut'>
            <i className="fa-regular fa-circle-xmark voltarForm" onClick={SetShow}></i>
        </button>
    </div>
  )
}
