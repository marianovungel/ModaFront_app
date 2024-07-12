import React, { useContext, useState } from 'react'
import './style.css'
import axios from 'axios';
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';

//upload img
import { imageDb } from '../../services/firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const handleClick = async (URL)=>{
    try {
       const imgRef = ref(imageDb, `files/${v4()}`)
       uploadBytes(imgRef, URL)
       const snapshot = await uploadBytes(imgRef, URL)
       const downloadURL = await getDownloadURL(snapshot.ref);
       return (downloadURL)
    } catch (error) {
        console.log(error)
    }
}
//upload img
async function postImage({image, description}) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)

    const result = await handleClick(image)
    console.log(result)
  return result;
}


export default function FormCad({ setShow }) {

    const [profilePic, setprofilePic] = useState(null)
    const [banner, setBanner] = useState(null)
    const [nome, setNome] = useState("")
    const [altura, setAltura] = useState("")
    const [categoria, setcategoria] = useState("")
    const [cor_cabelo, setcor_cabelo] = useState("")
    const [cor_olhos, setcor_olhos] = useState("")
    const [cor_pele, setcor_pele] = useState("")
    const [cpf, setcpf] = useState("")
    const [genero, setgenero] = useState("")
    const [nome_completo, setnome_completo] = useState("")
    const [orientacao_sexual, setorientacao_sexual] = useState("")
    const [peso, setpeso] = useState("")
    const [preco, setpreco] = useState("")
    const [sexo, setsexo] = useState("")
    const [tipo_cabelo, settipo_cabelo] = useState("")
    const [tipo_corpo, settipo_corpo] = useState("")
    // const [show, setShow] = useState(setShow)
// agencia_id
// agencia_name

    const { user } = useContext(Context)

    const SetShow = ()=>{
        setShow(true)
    }

    const handleSubmitAdd = async (e)=>{
        e.preventDefault()
        const newPost = {
            agencia_id:user._id,
            agencia_name:user.nome,
            nome,
            altura,
            categoria,
            cor_cabelo,
            cor_olhos,
            cor_pele,
            cpf,
            genero,
            nome_completo, 
            orientacao_sexual, 
            peso,
            preco,
            sexo, 
            tipo_cabelo,
            tipo_corpo
        };
    
        var imgPopap = ""
        if(banner){
          try{
            const description = Date.now() + banner.name;
            const result = await postImage({image: banner, description})
            imgPopap = result
            newPost.banner = result;
          }catch(err){}
        }
        if(profilePic){
          try{
            const description = Date.now() + profilePic.name;
            const result = await postImage({image: profilePic, description})
            imgPopap = result
            newPost.profilePic = result;
          }catch(err){}
        }
        try{
        //   const {data: ress} =  await api.post("/desapego", newPost);
          const response = await axios.post("http://localhost:8000/modelo/criar", newPost)
          console.log(response)
          
          Swal.fire({
            title: "Modelo",
            text: "Modelo cadastrado com Sucesso!",
            imageUrl: `${imgPopap}`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
          window.location.reload()
          
        }catch(err){}
      }

    

  return (
    <div className='FullcontentFormCad'>
        <div className="FormCad">
            <div className="imgCadForm">
                
                {profilePic && (
                    <img 
                    className="imgFormAtual" 
                    src={profilePic && URL.createObjectURL(profilePic)}
                    alt="" 
                />)}
                {banner && (
                    <img 
                    className="imgFormAtual" 
                    src={banner && URL.createObjectURL(banner)} 
                    alt="" 
                />)}
                <input type="file" onChange={(e)=>setBanner(e.target.files[0])} name='imgffbanner' id='imgffbanner' alt="" className='imgAtual' />
                <label htmlFor="imgffbanner" className='labelImgCad'><i className="fa-regular fa-image imar"></i> Banner</label>
                <input type="file" onChange={(e)=>setprofilePic(e.target.files[0])} name='imgff' id='imgff' alt="" className='imgAtual' />
                <label htmlFor="imgff" className='labelImgCad'><i className="fa-regular fa-image imar"></i> Foto de perfil</label>
                {/* <img src="" alt="" className="imgForm" /> */}
            </div>
            <div className="nomeFormProd">
                <input type="text" className="nomeatual" placeholder='Nome Completo' onChange={(e)=>setnome_completo(e.target.value)} />
            </div>
            <div className="nomeFormProd">
                <input type="text" className="nomeatual" placeholder='Apelido' onChange={(e)=>setNome(e.target.value)} />
            </div>
            <div className="nomeFormProd">
                <input type="text" className="nomeatual" placeholder='Categoria' onChange={(e)=>setcategoria(e.target.value)} />
            </div>
            <div className="precoAtual">
                <input type="text" className="precoAtualFo" placeholder='Preço' onChange={(e)=>setpreco(e.target.value)} />
                <input type="text" className="precoAtualFo" placeholder='Altura' onChange={(e)=>setAltura(e.target.value)} />
            </div>
            <div className="precoAtual">
                <input type="text" className="precoAtualFo" placeholder='Cabelo-Cor' onChange={(e)=>setcor_cabelo(e.target.value)} />
                <input type="text" className="precoAtualFo" placeholder='Olhos-Cor' onChange={(e)=>setcor_olhos(e.target.value)} />
            </div>
            <div className="precoAtual">
                <input type="text" className="precoAtualFo" placeholder='Pele-Cor' onChange={(e)=>setcor_pele(e.target.value)} />
                <input type="text" className="precoAtualFo" placeholder='Cabelo-Tipo' onChange={(e)=>settipo_cabelo(e.target.value)} />
            </div>
            <div className="precoAtual">
                <input type="text" className="precoAtualFo" placeholder='CPF' onChange={(e)=>setcpf(e.target.value)} />
                <input type="text" className="precoAtualFo" placeholder='Orientacao-Sexual' onChange={(e)=>setorientacao_sexual(e.target.value)} />
            </div>
            <div className="precoAtual">
                <input type="text" className="precoAtualFo" placeholder='Peso' onChange={(e)=>setpeso(e.target.value)} />
                <input type="text" className="precoAtualFo" placeholder='Sexo' onChange={(e)=>setsexo(e.target.value)} />
            </div>
            <div className="precoAtual">
                <input type="text" className="precoAtualFo" placeholder='Genero' onChange={(e)=>setgenero(e.target.value)} />
                <input type="text" className="precoAtualFo" placeholder='Corpo-Tipo' onChange={(e)=>settipo_corpo(e.target.value)} />
            </div>
            <div className="buttonSubmitAtual">
                <button className="buttonFormCad" onClick={handleSubmitAdd}>Cadastrar</button>
            </div>
        </div>
        <button className='buttonBackAbsolut'>
            <i className="fa-regular fa-circle-xmark voltarForm" onClick={SetShow}></i>
        </button>
    </div>
  )
}
