import React, { useState } from 'react';
import { Modal, Input } from 'antd';
// import "./nftDetails.scss"
interface ExamplesModalI {
    visible: boolean
    onOk: (address: string) => void
    onCancel?: () => void
}

const ExamplesModalJSX = (props: ExamplesModalI) => {
    const [address, setAddress] = useState("");

    const renderFooter = () => {
        return <div className='examplesSureBtn' onClick={() => props.onOk(address.trim())}>转赠</div>
    }
    const handleInputAddressEvent = (e: any) => {
        setAddress(e.target.value)
    }

    return (
        <Modal title="转赠" centered visible={props.visible} footer={renderFooter()} closable={false} onCancel={props.onCancel}>
            <div className='address-input'>
                <input type="text" placeholder="请输入地址" onChange={handleInputAddressEvent} />
            </div>
        </Modal>
    );
};

export default ExamplesModalJSX;