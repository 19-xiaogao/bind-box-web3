import React, { useEffect } from "react"
import "./header.scss"

const HeaderJsx = () => {
    const handleConnectMeatMask = async () => {
        const result = await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    return <header className="h-header">
        <div className="h-logo">
            <h2>DBChain 盲盒</h2>
        </div>
        <div className="h-connect">
            <span onClick={handleConnectMeatMask}>连接MetaMask</span>
        </div>
    </header>
}

export default HeaderJsx