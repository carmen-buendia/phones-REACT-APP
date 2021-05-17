import {useState, useEffect} from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('http://localhost:5000/api/infor',token, {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
            
        }
    },[token]);

                // fetch('http://localhost:5000/api/infor',{
                //     method: "GET",
                //     headers: {
                //         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTIxNTA1ZWM0ZGYyMTNmODAwYTgwYSIsImlhdCI6MTYyMTI1NTIwMCwiZXhwIjoxNjIxMjU1ODYwfQ.bq4U35C4Z8mEppN5PyPRdo55cPam5-MuxH0Ysb-1q6k'
                //     }
                // })
                // .then(res => res.json())
                // .then(data => console.log(data))

                // setIsLogged(true)
                // res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                // setCart(res.data.cart)
    //         } catch (err) {
    //             alert(err.response.data.msg)
    //         }
    //         getUser()
    //     }

    //     // if(token){
    //     }
    // },[token])

    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('http://localhost:5000/api/addcart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to cart.")
        }
    }

    return {
        // token: [token, setToken],
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }
}

export default UserAPI;