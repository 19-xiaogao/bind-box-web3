import React from "react"
import "./header.scss"

const HeaderJsx = () => {
    return <div className="h-header">
        <div className="h-logo">
            <h1>DBChain 盲盒</h1>
        </div>
        <div className="h-connect">
            <div>连接钱包</div>
        </div>
    </div>
}

export default HeaderJsx