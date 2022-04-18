import React, { useState } from 'react'
import "./personAsset.scss"
import HeaderJsx from '../../components/views/Header'
import { Tabs, } from 'antd';
const { TabPane } = Tabs;
function PersonAssetJsx() {

    return <div className='root-page'>
        <HeaderJsx />
        <div className='p-header'>
            <div className='content'>
                <div className='avatar'>
                    <img src="https://storage.googleapis.com/opensea-static/opensea-profile/22.png" alt="" />
                </div>
                <p>0xa8437***3F64</p>
            </div>
        </div>
        <main className='table'>
            <div className='sidebar'>
                <div>我的盲盒</div>
                <div>nft</div>
            </div>
            <div className='t-content'>
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

export default PersonAssetJsx