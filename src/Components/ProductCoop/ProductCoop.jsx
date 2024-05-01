import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const host = "http://localhost:8000/"

export default function ProductCoop({text, path}) {
    const [data, setData] = useState([])

    useEffect(()=>{
        const getData = async()=>{
            const res = await axios.get(`http://localhost:8000/product/coop/${path}`)
            setData(res.data)
        }
        getData()
    }, [path])
  return (
    <div className='fullContentProductCoop'>
        <h5 className="headeProduct">{text}</h5>
        
        <div className="productContent">
            {data.map((data)=>(
                <Link to={`/produto/${data?._id}`} className="cardProductNew" key={data?._id}>
                <img src={host+data?.profilePic} alt="" className="imgCardProductnew" />
                <h6 className="nameProductNew">{data?.nome}</h6>
                <div className="precoCardNew">
                    <span className="PrecoProductnew atualnew">R ${data?.precoatual}</span>
                    <span className="PrecoProductnew deshednew">R ${data?.precoanterior}</span>
                </div>
            </Link>
            ))}

        </div>
    </div>
  )
}
