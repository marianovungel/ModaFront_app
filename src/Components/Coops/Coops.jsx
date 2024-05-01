import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const host = "http://localhost:8000/"

export default function Coops({text}) {
    const [data, setData] = useState([])

    useEffect(()=>{
        const getData = async()=>{
            const res = await axios.get("http://localhost:8000/coop")
            setData(res.data)
        }
        getData()
    }, [])
  return (
    <div className='fullContentProductCop'>
        <h5 className="headeProduct">{text}</h5>
        
        <div className="productContent">
        {data?.map((post)=>(
            <Link className="titleColor" to={`/produto/${post?._id}`} key={post?._id}>
                {/* onClick={() => history.push(`/post/${post?.id}`, post)}  key={post?.photo} */}
            <div className="Produto" key={post?._id}>
                <div className='imgProduto' id='Produto'>
                    <img className='imagemCard sizePhoto' src={host+post?.profilePic} alt=' '/>
                </div>
                <div className='nomePreco'>
                    <h5 className='valorNome'>{post?.nome}</h5>
                </div>
            </div>
            </Link>
        ))}
        </div>
    </div>
  )
}
