import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import HeaderJsx from "../../components/views/Header";
import "./allBindBox.scss";
import { formatTime } from "@/utils";
import { queryBindBoxApi, queryContractApi } from "@/api/api";
import { useNavigate } from "react-router-dom";

function AllBindBoxJsx() {
    const [bindBoxList, setBindBoxList] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const getBindBox = async (offset: number, limit: number) => {
        try {
            const result = await queryBindBoxApi(offset, limit);
            setBindBoxList(result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e: any) => {
        setSearchValue(e.target.value);
    };
    const handleKeyDown = async (e: any) => {
        const keyNum = window.event ? e.keyCode : e.which;
        if (searchValue.trim() === "") return;
        if (keyNum === 13) {
            const result = await queryContractApi(searchValue);
            setBindBoxList(result);
        }
    };
    const isShowTime = (time: string) => {
        return Date.now() / 1000 - Number(time) < 0;
    };

    const renderShowTime = (time: string) => {
        return isShowTime(time) ? <div className="time">{formatTime(time)}</div> : null;
    };

    const handleBindBoxDetailClick = (item: any) => {
        navigate("/bindBoxDetails?id=" + item.id);
    };

    const renderBindList = () => {
        return bindBoxList.map((item: any) => (
            <div className="box-d" key={item.id} onClick={() => handleBindBoxDetailClick(item)}>
                <div className="box-d-top">
                    {renderShowTime(item.release_time)}
                    <span className="img">
                        <img src={item.desc.nft_metadatas[0].image}></img>
                    </span>
                </div>
                <div className="box-d-bottom">
                    <div className="title"> {item.desc.name}</div>
                    <div className="desc">
                        <span>价格</span>
                        <span>{item.price}</span>
                        <span>发行数量</span>
                        <span>{item.release_number}</span>
                    </div>
                </div>
            </div>
        ));
    };

    useEffect(() => {
        getBindBox(0, 9);
    }, []);
    return (
        <div className="root-page">
            <HeaderJsx />
            <main>
                <div className="r-header">
                    <h2>全部盲盒系列</h2>
                    <Input
                        className="search"
                        value={searchValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="请输入盲盒的名称或者合约地址"
                        prefix={<SearchOutlined />}
                    />
                </div>
                <div className="box-list">{renderBindList()}</div>
            </main>
        </div>
    );
}

export default AllBindBoxJsx;
