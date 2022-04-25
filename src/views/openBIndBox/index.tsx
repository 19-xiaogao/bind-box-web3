import React, { useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HeaderJsx from "../../components/views/Header";
import { queryBindBoxDetailApi, openBindBoxApi, balanceOfTickets } from "@/api/api";
import { formatTime, notificationInfo } from "@/utils";
import { Spin } from "antd";
import RewardJSX from "./rewardJsx"

import "./openBindBox.scss";
import FooterJSX from "@/components/views/footer";

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
        nft_metadatas: [
            {
                image: "",
            },
        ],
    },
};
const reducer = (state = initValue, action: any) => {
    switch (action.type) {
        case "change":
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

function BindBoxDetailJsx() {
    const [searchParams] = useSearchParams();
    const [bindDetailBox, dispatchBindDetailBox] = useReducer(reducer, initValue);
    const [spinning, setSpinning] = useState(false)
    const [rewardObject, setRewardObject] = useState({ name: '', lever: "", image: "", visible: false })

    const [ticketsCount, setTicketsCount] = useState(0)
    const id = searchParams.get("id") as string;


    const queryBindBoxDetail = async () => {
        const result = await queryBindBoxDetailApi(id);
        dispatchBindDetailBox({ type: "change", payload: result[0] });
        queryTicketsCount(result[0].contract_address, window.ethereum.selectedAddress)
    };

    const handleSureClick = () => {
        setRewardObject({ name: '', lever: "", image: "", visible: false })
    }

    const queryTicketsCount = async (contract_address: string, accountAddress: string) => {
        try {
            const { count } = await balanceOfTickets(contract_address, accountAddress)
            setTicketsCount(Number(count))
        } catch (error) {
            setTicketsCount(0)
        }
    }

    const handleBuyBindBoxClick = async () => {
        if (Number(ticketsCount) === 0) return
        try {
            setSpinning(true)
            const result: any = await openBindBoxApi(bindDetailBox.contract_address)
            setSpinning(false)
            console.log(result.attributes[0].level);

            setRewardObject({ name: result.name, lever: result.attributes[0].level, image: result.image, visible: true })
            queryTicketsCount(bindDetailBox.contract_address, window.ethereum.selectedAddress)
        } catch (error) {
            notificationInfo("未知错误...")
            setSpinning(false)
        }
    };

    useEffect(() => {
        queryBindBoxDetail();
    }, []);

    const renderNftList = () => {
        return bindDetailBox.desc.nft_metadatas.slice(1).map((item: any, key: number) => (
            <div className="box" key={key}>
                <div className="nft">
                    <img src={item.image} alt="" />
                </div>
                <div className="nft-decs">
                    <div>{item.name}</div>
                    <div>{item.attributes[0].level}</div>
                    <div>发行数量 : 30 </div>
                    <div>概率 : {item.attributes[0].probability}</div>
                </div>
            </div>
        ));
    };



    return (
        <div className="root-page">
            <HeaderJsx />
            {rewardObject.visible ? <RewardJSX {...rewardObject} handleSureClick={handleSureClick} /> : null}
            <Spin tip="加载中..." spinning={spinning}>
                <main>
                    <div className="bbd-product">
                        <div className="box-show">
                            <img src={bindDetailBox.desc.nft_metadatas[0].image} alt="" />
                        </div>
                        <div className="box-content">
                            <p className="box-name">{bindDetailBox.desc.name}</p>
                            <div className="box-price-message">
                                <div className="box-price">
                                    <div>拥有当前盲盒</div>
                                    <div>{ticketsCount}个</div>
                                </div>
                            </div>
                            <div className="open-bind-box">
                                {
                                    ticketsCount ? <button onClick={handleBuyBindBoxClick} className="btn">
                                        开启盲盒
                                    </button>
                                        : <button className="soldOut">已开完</button>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="bind-box-decs">
                        <h2>产品详情和描述</h2>
                        <div className="decs-details">
                            <div className="price">
                                <span>发行价</span>
                                <span>{bindDetailBox.price}DBC</span>
                            </div>
                            <div className="count">
                                <span>发行数量</span>
                                <span>{bindDetailBox.release_number}</span>
                            </div>
                            <div className="time">
                                <span>发布日期</span>
                                <span>{formatTime(bindDetailBox.release_time)} </span>
                            </div>
                            <div className="contractAddress">
                                <span>合约地址</span>
                                <span>{bindDetailBox.contract_address} </span>
                            </div>
                        </div>
                        <p className="decs">{bindDetailBox.desc.desc}</p>
                    </div>
                    <div className="rarity-details">
                        <h2>稀有度详情</h2>
                        <div className="rarity-box">{renderNftList()}</div>
                    </div>
                </main>
            </Spin>
            <FooterJSX />

        </div>
    );
}

export default BindBoxDetailJsx;
