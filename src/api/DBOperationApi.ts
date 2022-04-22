import * as ethers from "ethers";
import DBOperation from "./abi/DBOperation.json";
import { createAccessToken, getProvider } from "@/api/initAdmin";
import * as base64 from "js-base64";
import DBchainConfig from "./config";
import { initDRC721Contract } from "./DRC721Api";

const DBOperationContractAddress = "0x53F0b5B7D8E7B86fc79030e1F9048c2c5648F936";

export function initDBOperationContract() {
    const provider = getProvider();
    const Contract = new ethers.Contract(DBOperationContractAddress, DBOperation, provider);
    return Contract;
}

export const DBOperationContract = initDBOperationContract();

async function queryDbChainData(queryParams: any[], isDecode = false) {
    const accessToken = createAccessToken();
    const encodeParams = base64.encode(JSON.stringify(queryParams));
    const result = await DBOperationContract.query_std_querier(
        accessToken,
        DBchainConfig.appCode,
        encodeParams
    );
    const parseResult = JSON.parse(result);
    if (isDecode) {
        return parseResult;
    }
    return parseResult.map((item: any) => ({ ...item, desc: JSON.parse(base64.decode(item.desc)) }));
}

export const queryBindBoxApi = async (offset: number, limit: number) => {
    const queryParams: any = [
        { method: "table", table: "contracts" },
        { method: "offset", value: String(offset) },
        { method: "limit", value: String(limit) },
    ];
    return await queryDbChainData(queryParams);
};

export const queryBindBoxCountApi = async () => {
    const queryParams: any = [{ method: "table", table: "contracts" }, { method: "count" }];
    return await queryDbChainData(queryParams);
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

    return await queryDbChainData(queryParams);
};

export const queryContractApi = async (contract: string) => {
    const queryParams = [
        { method: "table", table: "contracts" },
        {
            method: "where",
            field: "contract_address",
            value: `${contract}`,
            operator: "=",
        },
    ];
    return await queryDbChainData(queryParams);
};

async function balanceOfTickets(contract_address: string, accountAddress: string) {
    const DRC721Contract = initDRC721Contract(contract_address);
    const [count, data] = await DRC721Contract.balanceOfTickets(accountAddress);
    if (!parseInt(count)) return;
    const decodeResult = JSON.parse(base64.decode(data));
    return {
        contract_address,
        count: parseInt(count),
        ...decodeResult,
    };
}

export const queryAllPrivateBindBox = async (accountAddress: string) => {
    const queryParams = [
        {
            method: "table",
            table: "contracts",
        },
        { method: "select", fields: "id,contract_address" },
    ];
    const parseResult = await queryDbChainData(queryParams, true);

    const bindBoxList: any = [];
    try {
        for await (let item of parseResult) {
            const result = await balanceOfTickets(item.contract_address, accountAddress);
            // 测试目前所有合约地址一样，去重
            if (!result) return bindBoxList;
            const isFind = bindBoxList.find((item: any) => item.contract_address);
            if (!isFind) {
                bindBoxList.push({ id: item.id, ...result });
            }
            // bindBoxList.push(result);
        }
    } catch (error) {
        return bindBoxList;
    }
    return bindBoxList;
};
