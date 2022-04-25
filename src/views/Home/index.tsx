import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterJSX from "@/components/views/footer";
import HeaderJsx from "@/components/views/Header";
import BannerJsx from "@/components/views/banner";
import { queryBindBoxApi } from "@/api/api";
import "./home.scss";

const HomeJsx = () => {
    const [bindBoxList, setBindBoxList] = useState([]);
    const navigate = useNavigate();

    const getBindBox = async () => {
        try {
            const result = await queryBindBoxApi(0, 4);
            setBindBoxList(result);
        } catch (error) {
            console.log(error);
        }
    };
    const handleAllBindBoxClick = () => {
        navigate("/allBindBox");
    };
    const handleBindBoxClick = (id: string) => {
        navigate("/bindBoxDetails?id=" + id);
    };

    useEffect(() => {
        getBindBox();
    }, []);

    const renderBindList = () => {
        return bindBoxList.map((item: any) => (
            <div className="b-box" key={item.id} onClick={() => handleBindBoxClick(item.id)}>
                <div className="img">
                    <img src={item.desc.nft_metadatas[0].image} alt="" />
                </div>
                <div className="title">
                    <span>{item.desc.name}</span>
                </div>
            </div>
        ));
    };

    return (
        <div className="root-page">
            <HeaderJsx />
            <BannerJsx />
            <main>
                <div className="recommended">
                    <h1>推荐盲盒</h1>
                    <h3 onClick={handleAllBindBoxClick}>全部盲盒系列 》</h3>
                </div>
                <div className="re-bind-box">{renderBindList()}</div>
                {/* <div className='recommended'>
                <h1>热门盲盒</h1>
                <h3>全部盲盒系列 》</h3>
            </div>
            <div className='re-bind-box'>
                <div className='b-box'>
                    <div className='title'>
                        <span>
                            Galaxy Blitz NFT Planets
                        </span>
                    </div>
                </div>
                <div className='b-box'>
                    <div className='title'>
                        <span>
                            Galaxy Blitz NFT Planets
                        </span>
                    </div>
                </div>
                <div className='b-box'>
                    <div className='title'>
                        <span>
                            Galaxy Blitz NFT Planets
                        </span>
                    </div>
                </div>
                <div className='b-box'>
                    <div className='title'>
                        <span>
                            Galaxy Blitz NFT Planets
                        </span>
                    </div>
                </div>
            </div> */}
            </main>
            <FooterJSX />
        </div>
    );
};
export default HomeJsx;
