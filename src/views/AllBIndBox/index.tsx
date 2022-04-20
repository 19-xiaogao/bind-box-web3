import React, { useState, useEffect } from 'react'
import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import HeaderJsx from '../../components/views/Header'
import "./allBindBox.scss"
import { formatTime } from "@/utils"
import { queryBindBoxApi } from "@/api/api"
import { useNavigate } from "react-router-dom";

function AllBindBoxJsx() {
    const [bindBoxList, setBindBoxList] = useState([])
    const navigate = useNavigate();

    const getBindBox = async (offset: number, limit: number) => {
        try {
            const result = await queryBindBoxApi(offset, limit)
            setBindBoxList(result)
        } catch (error) {
            console.log(error);
        }
    }

    const handleBindBoxDetailClick = (item: any) => {
        navigate('/bindBoxDetails?id=' + item.id)
    }

    const renderBindList = () => {
        return bindBoxList.map((item: any) => (<div className='box-d' key={item.id} onClick={() => handleBindBoxDetailClick(item)}>
            <div className='box-d-top'>
                <div className='time'>
                    {formatTime(item.release_time)}
                </div>
                <span className='img'>
                    <img src={item.desc.nft_metadatas[0].image}></img>
                </span>
            </div>
            <div className='box-d-bottom'>
                <div className='title'> {item.desc.name}</div>
                <div className='desc'>
                    <span>价格</span>
                    <span>{item.price}</span>
                    <span>发行数量</span>
                    <span>{item.release_number}</span>
                </div>
            </div>
        </div>))
    }

    useEffect(() => {
        getBindBox(0, 9)
    }, [])
    return <div className='root-page'>
        <HeaderJsx />
        <main>
            <div className='r-header'>
                <h2>全部盲盒系列</h2>
                <Input className='search' placeholder='请输入盲盒的名称或者合约地址' prefix={<SearchOutlined />} />
            </div>
            <div className='box-list'>
                {renderBindList()}
            </div>
        </main>
    </div>

}

export default AllBindBoxJsx