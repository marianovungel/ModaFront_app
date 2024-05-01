import axios from 'axios'
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { Context } from '../../Context/Context'
import './style.css'
const host = "http://localhost:8000/"


export default function Login() {
    const [user, setUser] = useState("")
    const [senha, setSenha] = useState("")
    const [cpf, setCpf] = useState("")
    const [type, setType] = useState("Coop")
    const [create, setCreate] = useState("Coop")
    const [colorCoop, setColorCoop] = useState("cooperativaLogin")
    const [colorUse, setColorUse] = useState("UserLogin")
    const { dispatch } = useContext(Context)

    const setCreateForm = ()=>{
        setCreate("Use")
    }
    const setLoginForm = ()=>{
        setCreate("Coop")
    }
    const setTypeCoop = ()=>{
        setType("Coop")
        setColorCoop("cooperativaLogin")
        setColorUse("UserLogin")
    }
    const setTypeUse = ()=>{
        setType("Use")
        setColorCoop("UserLogin")
        setColorUse("cooperativaLogin")
    }
    const CadastrarCoop = async()=>{
        try {
            await axios.post("http://localhost:8000/coop/criar",{
                nome: user,
                senha: senha,
                cnpj: cpf
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cooperativa criada com SUCESSO!',
                showConfirmButton: false,
                timer: 3000
              })
            setCreate("Coop")
        } catch (error) {
            console.log(error)
        }
    }
    const CadastrarUser = async()=>{
        try {
            const coopUse = await axios.post("http://localhost:8000/auth/criar",{
                username: user,
                password: senha,
                cpf: cpf,
                email: ""
            })
            console.log(coopUse)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuário cadastrado com SUCESSO!',
                showConfirmButton: false,
                timer: 3000
              })
            setCreate("Coop")
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch({ type: "LOGIN_START"})
        try{
            const res = await axios.post("http://localhost:8000/coop/login", {
                nome: user,
                senha: senha,
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data})
            window.location.replace("/");
        }catch(err){
            dispatch({ type: "LOGIN_FAILURE"})
        }
    }
    const handleUser = async (e)=>{
        e.preventDefault();
        dispatch({ type: "LOGIN_START"})
        try{
            const res = await axios.post("http://localhost:8000/auth/login", {
                username: user,
                password: senha,
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data})
            window.location.replace("/");
        }catch(err){
            dispatch({ type: "LOGIN_FAILURE"})
        }
    }

  return (
    <div className='fullContentLogin'>
        <div className="imgContentLogin5">
            {create === "Coop" ? 
            (<div className="Cadastrar" onClick={setCreateForm}>Cadastrar</div>):(
                <div className="Cadastrar" onClick={setLoginForm}>Login</div>
            )}
        </div>
        <div className="loginForm">
            <div className="logo">
                <img src={`${host}uploads/logo-sem-fundo.png`} alt="" className="logoLoginImg" />
            </div>
            {create === "Coop" ? (<h1 className="Login">Login</h1>):(
                <h1 className="Login">Cadastrar</h1>
            )}
            {create === "Coop" ? (
                <div className="formLogin">
                    <div className="shoose">
                        <div className="cooperativaLogin" id={colorCoop} onClick={setTypeCoop}>Agência</div>
                        <div className="UserLogin" id={colorUse} onClick={setTypeUse}>Usuário</div>
                    </div>
                    <div className="inputs">
                        <input type="text" placeholder={type === "Coop" ? "Agência" : "Usuário"} className='input Cooperativa' onChange={(e)=>setUser(e.target.value)} />
                        <input type="text" placeholder='Senha' className='input Senha'  onChange={(e)=>setSenha(e.target.value)} />
                        {type === "Coop" ? (
                            <button className='input btnLogin' onClick={handleSubmit}>Entrar</button>
                            ):(
                            <button className='input btnLogin' onClick={handleUser}>Entrar</button>
                        )}
                    </div>
                    <div className="termo">
                        <span className='termoText'>Termo</span>
                        <b>&</b>
                        <span className='termoText'>Política de usuabilidade</span>
                    </div>
                </div>

            ):(
              <div className="formLogin">
                    <div className="shoose">
                        <div className="cooperativaLogin" id={colorCoop} onClick={setTypeCoop}>Agência</div>
                        <div className="UserLogin" id={colorUse} onClick={setTypeUse}>Usuário</div>
                    </div>
                    <div className="inputs">
                        <input type="text" placeholder={type === "Coop" ? "Agência" : "Usuário"} className='input Cooperativa' onChange={(e)=>setUser(e.target.value)} />
                        <input type="text" placeholder={type === "Coop" ? "CNPJ" : "CPF"} className='input Cooperativa' onChange={(e)=>setCpf(e.target.value)} />
                        {/* <input type="text" placeholder={type === "Coop" ? "Email" : "Email"} className='input Cooperativa' onChange={(e)=>setUser(e.target.value)} /> */}
                        <input type="text" placeholder='Senha' className='input Senha'  onChange={(e)=>setSenha(e.target.value)} />
                        {type === "Coop" ? (
                            <button className='input btnLogin' onClick={CadastrarCoop}>Cadastar</button>
                            ):(
                            <button className='input btnLogin' onClick={CadastrarUser}>Cadastar</button>
                        )}
                    </div>
                </div>  
            )}
        </div>
    </div>
  )
}
