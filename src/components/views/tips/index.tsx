import React, { useEffect, useState } from "react";
import { Modal } from 'antd'

const TipsJsx: React.FC<any> = (props) => {
    const [visible, setVisible] = useState<boolean>(false)
    useEffect(() => {
        const { ethereum } = window

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

    const handleCloseClick = () => {
        setVisible(false)
        localStorage.setItem('tips', "true")
    }

    return <Modal visible={visible} title="提示" closable={false} footer={null} centered onCancel={handleCloseClick}>
        <p>你好，本网站需要你安装MeatMask钱包，进行消息授权，<a href="https://metamask.io/" target="_blank" >安装地址。</a></p>
    </Modal>
}

export default TipsJsx