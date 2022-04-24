import React from "react";
import { Modal } from "antd"
import "./openBindBox.scss";

interface RewardInterface {
    image?: string
    lever?: string
    name?: string
    visible: boolean
    handleSureClick: () => void
}
export default (props: RewardInterface) => {
    return <Modal title={null} visible={true} footer={null} closable={false} centered>
        <div className="reward">
            <p>恭喜🎉你获得:</p>
            <div className="reward-box">
                <div className="reward-box-img">
                    <img src={props.image} alt="" />
                </div>
                <div className="level">{props.lever}</div>
                <div className="name">{props.name}</div>
            </div>
            <div className="sure" onClick={props.handleSureClick}>确定</div>
        </div>
    </Modal>
}