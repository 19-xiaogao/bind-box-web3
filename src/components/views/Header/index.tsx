import React, { useEffect, useState, useMemo, useCallback } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { IMetamaskErrResponse } from "@/types/metamask"
import { notificationInfo, notificationSuccess } from "@/utils/index"
import "./header.scss"

const HeaderJsx = () => {

    const [currentAccount, setCurrentAccount] = useState("")
    const navigate = useNavigate();

    const handleConnectMeatMask = async () => {
        const { ethereum } = window
        if (!ethereum) return notificationInfo("您没有安装小狐狸钱包,请先去安装。")
        try {
            const result = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(result)
            notificationSuccess("您同意了网站授权。")
            window.ethIsConnected = true;
        } catch (error: IMetamaskErrResponse | any) {
            if (error.code === 4001) {
                notificationInfo("您拒绝了网站授权。")
                window.ethIsConnected = false;
            }
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                return;
            }
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length !== 0) {
                const account = accounts[0];
                setCurrentAccount(account)
                window.ethIsConnected = true;
            }
        } catch (error) {
            window.ethIsConnected = false;
            console.log(error);
        }
    }


    const handleAvatarClick = () => {
        navigate("/assets");
    }

    //TODO: 优化， 每次都会执行
    const renderHeaderRightBox = useCallback(() => {
        if (!currentAccount) {
            return <div className="h-connect">
                <span onClick={handleConnectMeatMask}>连接MetaMask</span>
            </div>
        }
        return <div className="h-avatar" onClick={handleAvatarClick}>
            <img src="https://storage.googleapis.com/opensea-static/opensea-profile/22.png" alt="" />
        </div>
    }, [currentAccount])

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    return <header className="h-header">
        <div className="h-logo">
            <Link to="/">
                <h2>DBChain 盲盒</h2>
            </Link>

        </div>
        {renderHeaderRightBox()}
    </header>
}

export default HeaderJsx