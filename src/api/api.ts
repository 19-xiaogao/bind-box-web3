import * as ethers from "ethers";
import DRC751 from "./abi/DRC721.json";
import DBOperation from "./abi/DBOperation.json";
import { createAccessToken } from "@/api/initAdmin";
import { encode, decode } from "js-base64";

const DBchainConfig = {
    appCode: "DYJGN3ZTBY",
    netWork: "http://192.168.0.58:8545",
};

// DRC751 abi
const DRC751contractABI = DRC751;
// DRC751 合约地址
const DRC751contractAddress = "0x5906De49949881C44D18325F65c9f45E12eBC47b";

function getProvider() {
    if (window.ethIsConnected) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return signer;
    }
    return new ethers.providers.JsonRpcProvider(DBchainConfig.netWork);
}

export function initDRC721Contract() {
    const provider = getProvider();
    const Contract = new ethers.Contract(DRC751contractAddress, DRC751contractABI, provider);
    return Contract;
}
export const DRC721Contract = initDRC721Contract();

const DBOperationContractABI = DBOperation;
const DBOperationContractAddress = "0x53F0b5B7D8E7B86fc79030e1F9048c2c5648F936";
export function initDBOperationContract() {
    const provider = getProvider();
    const Contract = new ethers.Contract(DBOperationContractAddress, DBOperationContractABI, provider);
    return Contract;
}

export const DBOperationContract = initDBOperationContract();

export const queryBindBoxApi = async (offset: number, limit: number) => {
    const queryParams: any = [
        { method: "table", table: "contracts" },
        { method: "offset", value: String(offset) },
        { method: "limit", value: String(limit) },
    ];
    const accessToken = createAccessToken();
    const encodeParams = encode(JSON.stringify(queryParams));
    const result = await DBOperationContract.query_std_querier(
        accessToken,
        DBchainConfig.appCode,
        encodeParams
    );
    const parseResult = JSON.parse(result);
    return parseResult.map((item: any) => ({ ...item, desc: JSON.parse(decode(item.desc)) }));
};

export const queryBindBoxCountApi = async () => {
    const queryParams: any = [{ method: "table", table: "contracts" }, { method: "count" }];
    const accessToken = createAccessToken();
    const encodeParams = encode(JSON.stringify(queryParams));
    const result = await DBOperationContract.query_std_querier(
        accessToken,
        DBchainConfig.appCode,
        encodeParams
    );
    console.log(result);
    return JSON.parse(result);
};

export const queryBindBoxDetailApi = async (id: string) => {
    const queryParams = [
        { method: "table", table: "contracts" },
        {
            method: "where",
            field: "id",
            value: `${id}`,
            operator: "=",
        },
    ];

    const accessToken = createAccessToken();
    const encodeParams = encode(JSON.stringify(queryParams));
    const result = await DBOperationContract.query_std_querier(
        accessToken,
        DBchainConfig.appCode,
        encodeParams
    );
    const parseResult = JSON.parse(result);
    return parseResult.map((item: any) => ({ ...item, desc: JSON.parse(decode(item.desc)) }));
};
