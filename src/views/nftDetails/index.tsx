
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Collapse } from 'antd';
import FooterJSX from "@/components/views/footer";
import HeaderJsx from "@/components/views/Header";
import { context } from "@/components/hooks/globalContent";
import ExamplesModalJSX from "./examplesModal";
import { notificationInfo, notificationSuccess, msFormatTime } from "@/utils";
import { queryNftApi, transferFromNftApi, queryTransferHistory } from "@/api/api"
import { IMetamaskErrResponse } from "@/types/metamask";
import "./nftDetails.scss"


const { Panel } = Collapse;
const initValue = {
    name: "",
    contractAddress: "",
    desc: "",
    tokenId: 0,
    image: "",
    attributes: [{ level: "" }]
}

export const NftDetailJsx = () => {
    const [searchParams] = useSearchParams();
    const [nftDetails, setNftDetails] = useState<typeof initValue>(initValue)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [transferHistory, setTransferHistory] = useState([])

    const id = searchParams.get("id") as string;

    const contextValue = useContext(context)

    const navigate = useNavigate()
    const handleExamplesClick = () => {
        setIsModalVisible(true)
    }

    const handleExamplesOk = async (address: string) => {
        if (address.length !== 42) return notificationInfo("地址格式错误,请输入ethereum地址")
        if (window.ethereum.selectedAddress.toLowerCase() === address.toLowerCase()) return notificationInfo("请勿填写自己的地址")
        try {
            contextValue.handleSetGlobalLoading(true)
            setIsModalVisible(false)
            const result: any = await transferFromNftApi(nftDetails.contractAddress, window.ethereum.selectedAddress, address, nftDetails.tokenId)
            if (result.status) {
                contextValue.handleSetGlobalLoading(false)
                notificationSuccess("赠送成功")
                setTimeout(() => { navigate('/assets') }, 2000)
            }
        } catch (error: IMetamaskErrResponse | any) {
            if (error.code === 4001) {
                contextValue.handleSetGlobalLoading(false)
                return notificationInfo("您取消了转赠。")
            }
        }
    }

    const handleExamplesClose = () => {
        setIsModalVisible(false)
    }

    const renderTransferHistory = () => {
        return transferHistory.map((item: any) => (<div className="trading-history-list" key={item.id}>
            <span>{parseInt(item.from) === 0 ? "-" : item.from}</span>
            <span>{item.to}</span>
            <span>{msFormatTime(item.created_at)}</span>
        </div>))
    }
    useEffect(() => {
        queryNftApi(Number(id)).then((res: typeof initValue) => {
            setNftDetails(res)
            queryTransferHistory(res.tokenId, res.contractAddress).then(res => {
                setTransferHistory(res)
            })
        })
    }, [])
    return <div className="root-page">
        <HeaderJsx />
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
                        {renderTransferHistory()}
                    </div>
                </Panel>
            </Collapse>
        </main>
        <ExamplesModalJSX visible={isModalVisible} onOk={handleExamplesOk} onCancel={handleExamplesClose} />
        <FooterJSX />
    </div>
}

export default NftDetailJsx