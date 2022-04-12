import React from 'react'
import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import HeaderJsx from '../../components/views/Header'
import "./allBindBox.scss"
function AllBindBoxJsx() {

    return <div className=' root-page'>
        <HeaderJsx />
        <div className='a-all-box'>
            <div className='r-header'>
                <h2>全部盲盒系列</h2>
                <Input className='search' placeholder='请输入盲盒的名称或者合约地址' prefix={<SearchOutlined />} />
            </div>
            <div className='box-list'>
                <div className='box-d'>
                    <div className='box-d-top'>
                        <div className='time'>
                            2022-04-11
                        </div>
                        <span className='img'>
                            <img src='https://public.nftstatic.com/static/nft/res/1a213b59260446cda3414e32b7a60d82.png'></img>
                        </span>
                    </div>
                    <div className='box-d-bottom'>
                        <div className='title'>Egg-citing Easter Extravaganza</div>
                        <div className='desc'>
                            <span>头</span>
                            <span>BinanceNFT</span>
                            <span>发行数量</span>
                            <span>63,000</span>
                        </div>
                    </div>
                </div>
                <div className='box-d'>
                    <div className='box-d-top'>
                        <div className='time'>
                            2022-04-11
                        </div>
                        <span className='img'>
                            <img src='https://public.nftstatic.com/static/nft/res/1a213b59260446cda3414e32b7a60d82.png'></img>
                        </span>
                    </div>
                    <div className='box-d-bottom'>
                        <div className='title'>Egg-citing Easter Extravaganza</div>
                        <div className='desc'>
                            <span>头</span>
                            <span>BinanceNFT</span>
                            <span>发行数量</span>
                            <span>63,000</span>
                        </div>
                    </div>
                </div>
                <div className='box-d'>
                    <div className='box-d-top'>
                        <div className='time'>
                            2022-04-11
                        </div>
                        <span className='img'>
                            <img src='https://public.nftstatic.com/static/nft/res/1a213b59260446cda3414e32b7a60d82.png'></img>
                        </span>
                    </div>
                    <div className='box-d-bottom'>
                        <div className='title'>Egg-citing Easter Extravaganza</div>
                        <div className='desc'>
                            <span>头</span>
                            <span>BinanceNFT</span>
                            <span>发行数量</span>
                            <span>63,000</span>
                        </div>
                    </div>
                </div>
                <div className='box-d'>
                    <div className='box-d-top'>
                        <div className='time'>
                            2022-04-11
                        </div>
                        <span className='img'>
                            <img src='https://public.nftstatic.com/static/nft/res/1a213b59260446cda3414e32b7a60d82.png'></img>
                        </span>
                    </div>
                    <div className='box-d-bottom'>
                        <div className='title'>Egg-citing Easter Extravaganza</div>
                        <div className='desc'>
                            <span>头</span>
                            <span>BinanceNFT</span>
                            <span>发行数量</span>
                            <span>63,000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default AllBindBoxJsx