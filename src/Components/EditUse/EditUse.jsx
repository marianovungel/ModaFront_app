import axios from 'axios';
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import { Context } from '../../Context/Context'
import './style.css'
import {useNavigate} from 'react-router-dom'
const host = "http://localhost:8000/"

//upload img
async function postImage({file, filename}) {
  const formData = new FormData();
  formData.append("file", file)
  formData.append("name", filename)

  const result = await axios.post('http://localhost:8000/pic', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}

export default function EditUse() {
  const [email, setEmail] = useState("")
  const [desc, setDesc] = useState("")
  const [zap, setZap] = useState("")
  const [file, setFile] = useState(null)
  let navigate = useNavigate()
  

  const { user } = useContext(Context)
  const { dispatch } = useContext(Context)

  const handleSubmit = async ()=>{
    const filename = Date.now();
    const data = await postImage({file, filename})
    return data.picture.src;
}

  const Update = async (e)=>{
    e.preventDefault()
    dispatch({ type: "UPDATE_START"})
    const newPost = {
        whatsapp: zap,
        email: email,
        endereco: desc
      };
      if(file){
          const URL = await handleSubmit()
          newPost.profilePic = URL;
      }
      try{
        const userUpdate = await axios.put(`http://localhost:8000/auth/${user._id}`, newPost)
        await dispatch({ type: "UPDATE_SUCCESS", payload: userUpdate.data})
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Atualizado com sucesso!'
        })
        navigate('/')

      }catch(err){
        dispatch({ type: "UPDATE_FAILURE"})
        alert(err)
      }
}


  return (
    <div className='fullEditCoopConteiner'>
        <div className="imgEditConteiner">
        {file ? (
                    <img 
                    className="getImgCoop" 
                    src={file && URL.createObjectURL(file)} 
                    alt="" 
                />):(
                  <img src={host+user.profilePic} alt=""  className="getImgCoop" />

                )}
            <input type="file" onChange={(e)=>setFile(e.target.files[0])} name='imgff' id='imgff' alt="" className='imgAtual' />
            <label htmlFor="imgff" className='labalImgCoop'><i className="fa-solid fa-upload"></i> Imagem</label>
            
        </div>
        <div className="dataCoopFuull">
            <div className="sobreAllInputs">
                <h3 className='marginTextCoop'>Editar Usuário</h3>
                <input type="text" placeholder='Whatsapp' onChange={(e)=>setZap(e.target.value)} className='inpData' />
                <input type="text" placeholder='Endereço' onChange={(e)=>setDesc(e.target.value)} className='inpData' />
                <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className='inpData' />
            </div>
            <button className="fonfirmEditCoop inpData" onClick={Update}>Salvar</button>
        </div>
    </div>
  )
}
