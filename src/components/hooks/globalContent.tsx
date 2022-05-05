import React, { createContext, useState } from 'react'
import { Spin } from "antd"

interface ContextI {
    loading: boolean
    handleSetGlobalLoading: (loading: boolean) => void
}

export const context = createContext<ContextI>({
    loading: false,
    handleSetGlobalLoading: (loading: boolean) => { }
})
export const { Provider, Consumer } = context;

const style = {
    top: "50vh",
    transform: " translateY(-50%)"
}


const ContextJSX: React.FunctionComponent = (props) => {
    const [loading, setLoading] = useState(false);
    const handleSetGlobalLoading = (loading: boolean) => setLoading(loading);

    const initValue = {
        loading,
        handleSetGlobalLoading
    }
    return <Provider value={initValue} >
        <Spin spinning={loading} tip="加载中..." size="large" style={style}>
            {props.children}
        </Spin>
    </Provider>
}

export default ContextJSX





