import React, { useEffect, useReducer, useState } from 'react'
import { useSearchParams } from "react-router-dom"
import HeaderJsx from '../../components/views/Header'
import { queryBindBoxDetailApi, buyTicketsApi, curSoldTicketsApi } from "@/api/api"
import { formatTime, notificationInfo, notificationSuccess } from "@/utils"
import { InputNumber } from 'antd';
import { IMetamaskErrResponse } from "@/types/metamask"
import "./bindBoxDetails.scss"

const initValue = {
    contract_address: "",
    created_at: "",
    id: "",
    price: "",
    release_number: "",
    release_time: "",
    tx_hash: "",
    desc: {
        desc: "",
        name: "",
        nft_metadatas: [{
            image: ""
        }]
    }
}
const reducer = (state = initValue, action: any) => {
    switch (action.type) {
        case "change":
            return { ...state, ...action.payload };
        default:
            return state;
    }
}


function BindBoxDetailJsx() {
    const [searchParams] = useSearchParams()
    const [bindDetailBox, dispatchBindDetailBox] = useReducer(reducer, initValue)
    const [numberRemainCounts, setNumberRemainCounts] = useState(0)
    const [buyCount, setBuyCount] = useState(1)
    const id = searchParams.get('id') as string

    const queryBindBoxDetail = async () => {
        const result = await queryBindBoxDetailApi(id)
        dispatchBindDetailBox({ type: "change", payload: result[0] })

        const bindBoxCountsResult = await curSoldTicketsApi(result[0].contract_address)
        const numberRemaining = Number(result[0].release_number) - parseInt(bindBoxCountsResult._hex)

        setNumberRemainCounts(numberRemaining)
    }

    const handleBuyBindBoxClick = async () => {
        if (!window.ethIsConnected) {
            return notificationInfo("请先授权该网站。")
        }
        try {
            const result = await buyTicketsApi(buyCount, bindDetailBox.price * buyCount, bindDetailBox.contract_address)
            notificationSuccess("购买成功,区块上链中...")
        } catch (error: IMetamaskErrResponse | any) {
            if (error.code === 4001) {
                notificationInfo("您拒绝了购买。")
            }
        }
    }
    const handleInputNumberChange = (value: number) => {
        setBuyCount(value)
    }

    useEffect(() => {
        queryBindBoxDetail()
    }, [])


    const renderNftList = () => {
        return bindDetailBox.desc.nft_metadatas.slice(1).map((item: any, key: number) => (<div className='box' key={key}>
            <div className='nft'>
                <img src={item.image} alt="" />
            </div>
            <div className='nft-decs'>
                <div>{item.name}</div>
                <div>{item.attributes[0].level}</div>
                {/* <div>发行数量 : {item.name} </div> */}
                <div>概率 : {item.attributes[0].probability}</div>
            </div>
        </div>))
    }

    return <div className='root-page'>
        <HeaderJsx />
        <main>
            <div className='bbd-product'>
                <div className='box-show'>
                    <img src={bindDetailBox.desc.nft_metadatas[0].image} alt="" />
                </div>
                <div className='box-content'>
                    <p className='box-name'>
                        {bindDetailBox.desc.name}
                    </p>
                    {/* <div className='box-source'>
                        <div className='publisher'>
                            <div className='p-owner'>
                                <img src="https://public.nftstatic.com/static/nft/zipped/cf66bd860fb147199032c4711a75d3c7_zipped.jpeg" />
                            </div>
                            <div className='names'>
                                <div>发布者</div>
                                <div>GalaxyBlitz</div>
                            </div>
                        </div>
                        <div className='publisher'>
                            <div className='p-owner'>
                                <img src="https://public.nftstatic.com/static/nft/zipped/cf66bd860fb147199032c4711a75d3c7_zipped.jpeg" />
                            </div>
                            <div className='names'>
                                <div>发布者</div>
                                <div>GalaxyBlitz</div>
                            </div>
                        </div>
                    </div> */}
                    <div className='box-price-message'>
                        <div className='box-price'>
                            <div>当前出价</div>
                            <div>{bindDetailBox.price}DBC</div>
                            <div>剩余数量 {numberRemainCounts} 个</div>
                        </div>
                        <div className='box-end-time'>
                            <div className='time-title'>拍卖开启时间</div>
                            <div className='time-show'>
                                <div className='day'>
                                    <span>00</span>
                                    <span>天</span>
                                </div>
                                <div className='day'>
                                    <span>00</span>
                                    <span>小时</span>
                                </div>
                                <div className='day'>
                                    <span>00</span>
                                    <span>分</span>
                                </div>
                                <div className='day'>
                                    <span>00</span>
                                    <span>秒</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='open-bind-box'>
                        <InputNumber min={1} max={numberRemainCounts} defaultValue={1} className="input" onChange={handleInputNumberChange} />
                        <button onClick={handleBuyBindBoxClick} className="btn">购买</button>
                    </div>
                </div>
            </div>
            <div className='bind-box-decs'>
                <h2>产品详情和描述</h2>
                <div className='decs-details'>
                    <div className='price'>
                        <span>发行价</span>
                        <span>{bindDetailBox.price}DBC</span>
                    </div>
                    <div className='count'>
                        <span>发行数量</span>
                        <span>{bindDetailBox.release_number}</span>
                    </div>
                    <div className='time'>
                        <span>发布日期</span>
                        <span>{formatTime(bindDetailBox.release_time)} </span>
                    </div>
                    <div className='contractAddress'>
                        <span>合约地址</span>
                        <span>{bindDetailBox.contract_address} </span>
                    </div>
                </div>
                <p className='decs'>
                    {bindDetailBox.desc.desc}
                </p>
            </div>
            <div className='rarity-details'>
                <h2>稀有度详情</h2>
                <div className='rarity-box'>
                    {renderNftList()}
                </div>
            </div>
        </main>
    </div>
}

export default BindBoxDetailJsx