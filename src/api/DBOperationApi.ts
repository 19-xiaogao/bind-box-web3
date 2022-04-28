import * as ethers from "ethers";
import DBOperation from "./abi/DBOperation.json";
import { createAccessToken, getProvider } from "@/api/initAdmin";
import * as base64 from "js-base64";
import DBchainConfig from "./config";
import { NftMetaDataInterface } from "@/types";
import {
    initDRC721Contract,
    getLatestTokenIdApi,
    ownerOfAPi,
    tokenURIAPi,
    queryGetRulesApi,
} from "./DRC721Api";

const DBOperationContractAddress = "0x536D3b6B9899Df65b4d32072f1Cf34971Ec80229";

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

export const queryBannerApi = async () => {
    const queryParams = [
        { method: "table", table: "contracts" },
        {
            method: "where",
            field: "banner_status",
            value: "1",
            operator: "=",
        },
        ,
    ];
    return await queryDbChainData(queryParams);
};

export const queryBindBoxCountApi = async () => {
    const queryParams = [{ method: "table", table: "contracts" }, { method: "count" }];
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

//查询门票数量(查询盲盒数量)
export async function balanceOfTickets(contract_address: string, accountAddress: string) {
    const DRC721Contract = initDRC721Contract(contract_address);
    const [count, data] = await DRC721Contract.balanceOfTickets(accountAddress);
    if (!parseInt(count)) return null;
    const decodeResult = JSON.parse(base64.decode(data));
    return {
        contract_address,
        count: parseInt(count),
        ...decodeResult,
    };
}

// 查询自己的盲盒
export const queryAllPrivateBindBox = async (accountAddress: string) => {
    const queryParams = [
        {
            method: "table",
            table: "contracts",
        },
        { method: "select", fields: "id,contract_address" },
        {
            method: "where",
            field: "status",
            value: "1",
            operator: "=",
        },
    ];
    const parseResult = await queryDbChainData(queryParams, true);
    const bindBoxList: any = [];
    try {
        for await (let item of parseResult) {
            const result = await balanceOfTickets(item.contract_address, accountAddress);
            // 测试目前所有合约地址一样，去重
            if (!result) return bindBoxList;
            // const isFind = bindBoxList.find((item: any) => item.contract_address);
            // if (!isFind) {
            //     bindBoxList.push({ id: item.id, ...result });
            // }
            bindBoxList.push({ id: item.id, ...result });
        }
    } catch (error) {
        console.log(error);
        return bindBoxList;
    }
    return bindBoxList;
};

//获取用户的所有nft
export const queryAccountAllNftApi = async () => {
    const queryParams = [
        {
            method: "table",
            table: "contracts",
        },
        { method: "select", fields: "id,contract_address" },
        {
            method: "where",
            field: "status",
            value: "1",
            operator: "=",
        },
    ];
    const accountAllNftData = [];
    try {
        const parseResult = await queryDbChainData(queryParams, true);
        for await (let item of parseResult) {
            const result = await getLatestTokenIdApi(item.contract_address);
            const count = parseInt(result._hex);
            for (let i = 1; i <= count; i++) {
                const ownerResult = await ownerOfAPi(item.contract_address, i);
                if (ownerResult.toLowerCase() == window.ethereum.selectedAddress.toLowerCase()) {
                    const tokenUrlResult = await tokenURIAPi(item.contract_address, i);
                    const decodeData = JSON.parse(base64.decode(tokenUrlResult));
                    accountAllNftData.push({
                        ...decodeData,
                        tokenId: i,
                        contractAddress: item.contract_address,
                    });
                }
            }
        }
        return accountAllNftData;
    } catch (error) {
        return accountAllNftData;
    }
};

//查询指定的nft
export const queryNftApi = async (id: number) => {
    try {
        const allNftApi = await queryAccountAllNftApi();
        return allNftApi.find((item) => item.tokenId === id);
    } catch (error) {
        return {};
    }
};

//查询交易记录
export const queryTransferHistory = async (tokenId: number, contractAddress: string) => {
    let prixZero = "0";
    for (let i = 1; i < 63; i++) {
        prixZero += "0";
    }
    const oxTokenId = `0x${prixZero}${tokenId.toString(16)}`;
    const queryParams = [
        {
            method: "table",
            table: "nft_transfer_records",
        },
        {
            method: "where",
            field: "token_id",
            value: oxTokenId,
            operator: "=",
        },
        {
            method: "where",
            field: "contract_address",
            value: `${contractAddress.toLowerCase()}`,
            operator: "=",
        },
    ];
    return await queryDbChainData(queryParams, true);
};

export const classData = (arr: NftMetaDataInterface[]) => {
    const map = new Map();
    for (let i = 0; i < arr.length; i++) {
        const lever = arr[i].attributes[0].level;
        if (map.get(lever)) {
            map.set(lever, map.get(lever) + 1);
            continue;
        }
        map.set(lever, 1);
    }
    return map;
};

export const querySyntheticRules = async () => {
    const result = await queryBindBoxApi(0, 100);

    for await (let item of result) {
        let rulesResult = await queryGetRulesApi(item.contract_address);
        const nfts = await queryAccountAllNftApi();

        const sameClassNft = nfts.filter((v: any) => item.contract_address === v.contractAddress);
        const mapSameClassNft = classData(sameClassNft);

        rulesResult = rulesResult.map((item: any) => ({ ...JSON.parse(base64.decode(item)) }));
        return rulesResult.map((item: NftMetaDataInterface) => ({
            
            level: item.attributes[0].level,
            image: item.image,
            count: mapSameClassNft.get(item.attributes[0].level),
        }));
    }
};
