import React, { useEffect, useState } from 'react'
import './style.css'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
var KEY ="pk_test_51Mejt5DzHiXLpKW7t2j0Hs1MJsqQdi9MZWwgZDvKlFWp0fHUPwZCR3TVQSP6JiQhTFz7DZuPt9xrnVSpmajq006M00EpoULyUo"

export default function Pay() {
    const [stripeToken, setStripeToken] = useState(null)

    const onToken = (token)=>{
        setStripeToken(token)
        
    }

    useEffect(()=>{
        const pagamento = async()=>{
            console.log(stripeToken.id)
            try {
                const res = await axios.post("http://localhost:8000/pay/payment", {
                    tokenId: stripeToken.id,
                    amount: 20000,
                })
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        stripeToken && pagamento()
    }, [stripeToken])
  return (
    <div className='fullPay'>
        <StripeCheckout
            name= "Menor-Preço"
            image="./logo-sem-fundo.png"
            description="O seu Total é 20 USD"
            amount={1000000}
            stripeKey={KEY}
            token={onToken}
        >
            <button className='contPay'>Pay</button>
        </StripeCheckout>
    </div>
  )
}
