import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./personAsset.scss";
import HeaderJsx from "../../components/views/Header";
import { Empty } from "antd"
import { queryAllPrivateBindBox, queryAccountAllNftApi } from "@/api/api";
enum Status {
    bindBox,
    nft
}
function PersonAssetJsx() {
    const [myBindBoxList, setMyBindBoxList] = useState([]);
    const [sidebarValue, setSidebar] = useState(Status.bindBox)
    const [accountAllNft, setAccountAllNft] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        initData(sidebarValue)
    }, []);

    const handleClickSwitchClick = (status: Status) => {
        setSidebar(status)
    }
    const queryMyBindBox = async (accountAddress: string) => {
        try {
            const result = await queryAllPrivateBindBox(accountAddress);
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

    const initData = (status: Status) => {
        if (status === Status.bindBox) {
            return queryMyBindBox(window.ethereum.selectedAddress);
        } else {
            return queryAccountAllNft()
        }
    }
    const renderContent = () => {
        if (sidebarValue === Status.bindBox) {
            return <div className="t-content">{renderBoxList()}</div>
        } else {
            return null
        }
    }

    const handleBindBoxClick = (id: string) => {
        navigate(`/openBindBox?id=${id}`);
    };

    const renderBoxList = () => {

        return myBindBoxList.map((item: any, index) => (
            <div className="b-box" key={index} onClick={() => handleBindBoxClick(item.id)}>
                <div className="img">
                    <img src={item.image} alt="" />
                </div>
                <div className="count">拥有{item.count}个</div>
                <div className="title">
                    <span>{item.name}</span>
                </div>
            </div>
        ));
    };
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
                    <div onClick={() => handleClickSwitchClick(Status.bindBox)}>我的盲盒</div>
                    <div onClick={() => handleClickSwitchClick(Status.nft)}>nft</div>
                </div>
                {myBindBoxList.length === 0 ? <Empty description={false} className="not-data" /> : renderContent()}
                {/* {renderContent()} */}
            </main>
        </div>
    );
}

export default PersonAssetJsx;
