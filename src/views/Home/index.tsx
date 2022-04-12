import React from 'react'
import { Carousel } from 'antd';

import HeaderJsx from '../../components/views/Header'
import BannerJsx from "../../components/views/banner"
import "./home.scss"
const HomeJsx = () => {
    return <div className='root-page'>
        <HeaderJsx />
        <BannerJsx />
        <main className='body'>
            <div className='recommended'>
                <h1>推荐盲盒</h1>
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
            </div>
            <div className='recommended'>
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
            </div>
        </main>
    </div>
}
export default HomeJsx