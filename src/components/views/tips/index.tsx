import React, { useEffect, useState } from "react";
import { Modal } from 'antd'

const TipsJsx: React.FC<any> = (props) => {
    const [visible, setVisible] = useState<boolean>(false)

    const [isH5, setIsH5] = useState<boolean>(false)
    useEffect(() => {
        const { ethereum } = window
        setIsH5(h5judge())
        const tips = localStorage.getItem('tips')
        if (tips) {
            setVisible(false)
        } else {
            if (ethereum) {
                setVisible(false)
            } else {
                setVisible(true)
            }
        }

    }, [])
    function h5judge() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        return flag
    }

    const handleCloseClick = () => {
        setVisible(false)
        localStorage.setItem('tips', "true")
    }

    return <Modal visible={visible} title="提示" closable={false} footer={null} centered onCancel={handleCloseClick}>
        {
            isH5
                ? <p>你好，请在pc端打开该网页。</p>
                : <p>你好，本网站需要你安装MeatMask钱包，进行消息授权，<a href="https://metamask.io/" target="_blank" >安装地址。</a></p>
        }

    </Modal>
}

export default TipsJsx