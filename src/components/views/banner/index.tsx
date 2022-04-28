import React, { useEffect, useState } from "react";
import { queryBannerApi } from "@/api/api"
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom"
import "./banner.scss"
import { formatTime } from "@/utils"
function BannerJsx() {
    const [bannerList, setBannerList] = useState([])
    const navigate = useNavigate()
  
    useEffect(() => {
        getBannerList()
    }, [])

    const getBannerList = async () => {
        try {
            const result = await queryBannerApi()
            setBannerList(result)
        } catch (error) {
            setBannerList([])
        }
    }
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const handleBannerClick = (id: string) => {
        navigate("/bindBoxDetails?id=" + id);
    }
    const renderBannerList = () => {
        return bannerList.map((item: any) => (<div className="banner-list" key={item.id} onClick={() => handleBannerClick(item.id)}>
            <div className="b-mask"></div>
            <div className="b-decs">
                <span className="b-name">{item.desc.name}</span>
                <div className="sale-time">
                    <span className="b-s-ti">销售开始时间</span>
                    <span className="b-s-t">{formatTime(item.release_time)}</span>
                </div>
                <span className="b-issue">发行数量:{item.release_number}</span>
                <span className="b-price">售价:{item.price}DBC</span>
            </div>
            <img src={item.desc.nft_metadatas[0].image} alt="" />
        </div>))
    }

    return (
        <Carousel autoplay>
            {renderBannerList()}
        </Carousel>
    );
}

export default BannerJsx;
