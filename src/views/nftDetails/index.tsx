
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Collapse, Spin } from 'antd';
import FooterJSX from "@/components/views/footer";
import HeaderJsx from "@/components/views/Header";
import ExamplesModalJSX from "./examplesModal";
import { queryNftApi, transferFromNftApi } from "@/api/api"
import "./nftDetails.scss"
import { notificationInfo, notificationSuccess } from "@/utils";
import { IMetamaskErrResponse } from "@/types/metamask";

const { Panel } = Collapse;
const initValue = {
    name: "",
    contractAddress: "",
    desc: "",
    tokenId: 0,
    image: "",
    attributes: [{ lever: "" }]
}

export const NftDetailJsx = () => {
    const [searchParams] = useSearchParams();
    const [nftDetails, setNftDetails] = useState<any>(initValue)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [spinning, setSpinning] = useState(false)

    const id = searchParams.get("id") as string;
    const navigate = useNavigate()
    const handleExamplesClick = () => {
        setIsModalVisible(true)
    }
    const handleExamplesOk = async (address: string) => {
        if (address.length !== 42) return notificationInfo("地址格式错误,请输入ethereum地址")
        if (window.ethereum.selectedAddress.toLowerCase() === address.toLowerCase()) return notificationInfo("请勿填写自己的地址")
        try {
            setSpinning(true)
            setIsModalVisible(false)
            const result: any = await transferFromNftApi(nftDetails.contractAddress, window.ethereum.selectedAddress, address, nftDetails.tokenId)
            if (result.status) {
                setSpinning(false)
                notificationSuccess("赠送成功")
                setTimeout(() => { navigate('/assets') }, 2000)
            }
        } catch (error: IMetamaskErrResponse | any) {
            if (error.code === 4001) {
                setSpinning(false)
                return notificationInfo("您取消了转赠。")
            }
        }
    }

    const handleExamplesClose = () => {
        setIsModalVisible(false)
    }


    useEffect(() => {
        queryNftApi(Number(id)).then(res => {
            setNftDetails(res)
        })
    }, [])
    return <div className="root-page">
        <HeaderJsx />
        <Spin tip="加载中..." spinning={spinning}>
            <main>
                <div className="bbd-product">
                    <div className="box-show">
                        <img src={nftDetails.image} alt="" />
                    </div>
                    <div className="box-content">
                        <p className="box-name">{nftDetails.name}</p>
                        <div className="box-price-message">
                            <div className="box-price">
                                <div>等级</div>
                                <div>{nftDetails.attributes[0].level}</div>
                            </div>
                            <div className="box-end-time">
                                <div className="time-title">TokenId</div>
                                <div className="time-show">
                                    <div className="day">
                                        <span>{nftDetails.tokenId}</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="box-price-message">
                            <div className="box-price">
                                <div>合约地址</div>
                                <div>{nftDetails.contractAddress}</div>
                            </div>
                        </div>
                        <div className="open-bind-box">
                            <button className="btn" onClick={handleExamplesClick}>转赠</button>
                        </div>
                    </div>
                </div>
                <div className="bind-box-decs">
                    <h2>产品详情和描述</h2>
                    <div className="decs-details">
                        <p className="decs">{nftDetails.desc}</p>
                    </div>
                </div>
                <Collapse expandIconPosition="right" bordered={false} className="site-collapse-custom-collapse">
                    <Panel header="转赠记录" key="1">
                        <div className="trading-history-header">
                            <span>From</span>
                            <span>To</span>
                            <span>Date</span>
                        </div>
                        <div className="trading-history-content">
                            <div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div>
                            <div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div>
                            <div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div>
                            <div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div>
                            <div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div>
                            <div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div>
                            <div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div>
                            <div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div><div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div><div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div><div className="trading-history-list">
                                <span>ox12312312</span>
                                <span>ox12312aa</span>
                                <span>2022-11-23</span>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </main>
            <ExamplesModalJSX visible={isModalVisible} onOk={handleExamplesOk} onCancel={handleExamplesClose} />
            <FooterJSX />
        </Spin>
    </div>
}

export default NftDetailJsx