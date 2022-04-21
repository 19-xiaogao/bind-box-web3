import * as ethers from "ethers";
import DBOperation from "./abi/DBOperation.json";
import { createAccessToken, getProvider } from "@/api/initAdmin";
import * as base64 from "js-base64";
import DBchainConfig from "./config";

const DBOperationContractAddress = "0x53F0b5B7D8E7B86fc79030e1F9048c2c5648F936";
export function initDBOperationContract() {
    const provider = getProvider();
    const Contract = new ethers.Contract(DBOperationContractAddress, DBOperation, provider);
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
    const encodeParams = base64.encode(JSON.stringify(queryParams));
    const result = await DBOperationContract.query_std_querier(
        accessToken,
        DBchainConfig.appCode,
        encodeParams
    );
    const parseResult = JSON.parse(result);
    return parseResult.map((item: any) => ({ ...item, desc: JSON.parse(base64.decode(item.desc)) }));
};

export const queryBindBoxCountApi = async () => {
    const queryParams: any = [{ method: "table", table: "contracts" }, { method: "count" }];
    const accessToken = createAccessToken();
    const encodeParams = base64.encode(JSON.stringify(queryParams));
    const result = await DBOperationContract.query_std_querier(
        accessToken,
        DBchainConfig.appCode,
        encodeParams
    );
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
    const encodeParams = base64.encode(JSON.stringify(queryParams));
    const result = await DBOperationContract.query_std_querier(
        accessToken,
        DBchainConfig.appCode,
        encodeParams
    );
    const parseResult = JSON.parse(result);
    return parseResult.map((item: any) => ({ ...item, desc: JSON.parse(base64.decode(item.desc)) }));
};
