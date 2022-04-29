import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./personAsset.scss";
import HeaderJsx from "../../components/views/Header";
import { Button, Empty } from "antd"
import { queryAllPrivateBindBox, queryAccountAllNftApi, querySyntheticRules, synthesisApi } from "@/api/api";
import FooterJSX from "@/components/views/footer";
import { notificationInfo } from "@/utils";
enum Status {
    bindBox,
    nft,
    synthetic
}
function PersonAssetJsx() {
    const [myBindBoxList, setMyBindBoxList] = useState([]);
    const [sidebarValue, setSidebar] = useState(Status.bindBox)
    const [accountAllNft, setAccountAllNft] = useState([])
    const [synthsRules, setSynthsRules] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        queryMyBindBox(window.ethereum.selectedAddress)
        querySyntheticRules().then((res) => {

            setSynthsRules(res)
        })
    }, []);

    const handleSwitchClick = (status: Status) => {
        setSidebar(status)
        if (status === Status.bindBox) {
            return queryMyBindBox(window.ethereum.selectedAddress);
        } else {
            return queryAccountAllNft()
        }
    }

    const queryMyBindBox = async (accountAddress: string) => {
        try {
            const result = await queryAllPrivateBindBox(accountAddress);
            console.log(result);

            setMyBindBoxList(result);
        } catch (error) {
            setMyBindBoxList([]);
        }
    };

    const queryAccountAllNft = async () => {
        try {
            const accountAllResult: any = await queryAccountAllNftApi()
            setAccountAllNft(accountAllResult)
        } catch (error) {
            setAccountAllNft([])
        }
    }


    const handleBindBoxClick = (id: string) => {
        console.log(id);

        navigate(`/openBindBox?id=${id}`);
    };

    const renderBoxList = () => {
        return <div className="t-content">
            {myBindBoxList.map((item: any, index) => (
                <div className="b-box" key={index} onClick={() => handleBindBoxClick(item.id)}>
                    <div className="img">
                        <img src={item.image} alt="" />
                    </div>
                    <div className="count">拥有{item.count}个</div>
                    <div className="title">
                        <span>{item.name}</span>
                    </div>
                </div>
            ))}
        </div >

    };
    const handleNftClick = (id: number) => {
        navigate(`/nftDetailJsx?id=${id}`);

    }

    const renderAccountsNftList = () => {
        return <div className="t-content">
            {accountAllNft.map((item: any, index) => (
                <div className="b-box" key={index} onClick={() => handleNftClick(item.tokenId)}>
                    <div className="img">
                        <img src={item.image} alt="" />
                    </div>
                    <div className="count" style={{ color: "#f5c253" }}>{item.attributes[0].level}</div>
                    <div className="title">
                        <span >{item.name}</span>
                    </div>
                </div>
            ))}
        </div>
    }
    const showDisabledBtn = (rules: any): boolean | undefined => {
        return !!rules.find((item: any) => item.count === 0)
    }

    const handleSyntheticBtn = (contract_address: string, rules: []) => {
        console.log(contract_address);
        const tokenIds = rules.map((item: any) => item.tokenId[0])

        synthesisApi(contract_address, tokenIds).then((res: any) => {
            console.log(res);
        }).catch(err => {
            if (err.code === 4001) {
                notificationInfo("您取消了合成")
            }
        })
    }

    const renderSynthetic = () => {
        return <div className="synthetic-content">
            {synthsRules.map((item: any) => (
                <div className="s-box-list" key={item.id}>
                    <div className="synthetic-lever-box">
                        {item.rules.map((v: any, index: number) => (
                            <>
                                <div className="syn-nft">
                                    {!v.count ? <div className="syn-mask"></div> : null}
                                    <img src={v.image} alt="" />
                                    <span className="syn-level">{v.level}</span>
                                    <span className="syn-count">拥有{v.count}个</span>
                                </div>
                                {index + 1 === item.rules.length ? null : <div className="sync-add">+</div>}
                            </>
                        ))}
                        <div className="sync-add">=</div>
                        <div className="syn-btn">
                            <Button className="question-make" block disabled={showDisabledBtn(item.rules)} onClick={() => handleSyntheticBtn(item.contract_address, item.rules)}>合成</Button>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    }

    const renderSpecifiedElement = () => {
        if (sidebarValue === Status.bindBox) {
            return renderBoxList()
        } else if (sidebarValue === Status.nft) {
            return renderAccountsNftList()
        } else {
            return renderSynthetic()
        }
    }

    return (
        <div className="root-page">
            <HeaderJsx />
            <div className="p-header">
                <div className="content">
                    <div className="avatar">
                        <img
                            src="https://storage.googleapis.com/opensea-static/opensea-profile/22.png"
                            alt=""
                        />
                    </div>
                    <p>{window.ethereum.selectedAddress}</p>
                </div>
            </div>
            <main className="table">
                <div className="sidebar">
                    <div onClick={() => handleSwitchClick(Status.bindBox)} className={sidebarValue === Status.bindBox ? "cover" : ''}>我的盲盒</div>
                    <div onClick={() => handleSwitchClick(Status.nft)} className={sidebarValue === Status.nft ? "cover" : ''}>nft</div>
                    <div onClick={() => handleSwitchClick(Status.synthetic)} className={sidebarValue === Status.synthetic ? "cover" : ""}>NFT合成</div>
                </div>
                {/* {myBindBoxList.length === 0 ? <Empty description={false} className="not-data" /> : renderContent()} */}
                {renderSpecifiedElement()}
            </main>
            <FooterJSX />

        </div>
    );
}

export default PersonAssetJsx;
