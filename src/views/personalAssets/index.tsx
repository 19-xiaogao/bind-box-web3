import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import "./personAsset.scss"
import HeaderJsx from '../../components/views/Header'
import { queryAllPrivateBindBox, getProvider } from "@/api/api"
import * as ethers from "ethers"
function PersonAssetJsx() {
    const [myBindBoxList, setMyBindBoxList] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        queryMyBindBox(window.ethereum.selectedAddress)

        // provider.on(filter, (result) => {
        //     console.log(result);
        // });
    }, [])

    const queryMyBindBox = async (accountAddress: string) => {
        try {
            const result = await queryAllPrivateBindBox(accountAddress)
            console.log(result);
            setMyBindBoxList(result)

        } catch (error) {
            setMyBindBoxList([])
        }
    }

    const handleBindBoxClick = (id: string, count: string) => {
        navigate(`/openBindBox?id=${id}&count=${count}`)
    }

    const renderBoxList = () => {
        return myBindBoxList.map((item: any, index) => (<div className='b-box' key={index} onClick={() => handleBindBoxClick(item.id, item.count)}>
            <div className='img'>
                <img src={item.image} alt="" />
            </div>
            <div className='count'>拥有{item.count}个</div>
            <div className='title'>
                <span>
                    {item.name}
                </span>
            </div>
        </div>))
    }
    return <div className='root-page'>
        <HeaderJsx />
        <div className='p-header'>
            <div className='content'>
                <div className='avatar'>
                    <img src="https://storage.googleapis.com/opensea-static/opensea-profile/22.png" alt="" />
                </div>
                <p>{window.ethereum.selectedAddress}</p>
            </div>
        </div>
        <main className='table'>
            <div className='sidebar'>
                <div>我的盲盒</div>
                <div>nft</div>
            </div>
            <div className='t-content'>
                {renderBoxList()}
            </div>
        </main>
    </div>
}

export default PersonAssetJsx