import * as ethers from "ethers";
import DRC751 from "./abi/DRC721.json";
import { getProvider } from "@/api/initAdmin";

import * as base64 from "js-base64";
import { IMetamaskErrResponse } from "@/types/metamask";

// DRC751 abi
const DRC751contractABI = DRC751;
export function initDRC721Contract(contractAddress: string) {
    const provider = getProvider();
    const Contract = new ethers.Contract(contractAddress, DRC751contractABI, provider.getSigner());
    return Contract;
}

export const buyTicketsApi = (count: number, price: number, contractAddress: string) => {
    const DRC721Contract = initDRC721Contract(contractAddress);
    return new Promise((resolve, reject) => {
        DRC721Contract["buyTickets"](count, {
            // gasLimit: 300000,
            value: ethers.utils.parseEther(String(price)),
        })
            .then((result: any) => {
                const provider = getProvider();
                provider.once(result.hash, (receipt) => {
                    if (receipt.transactionHash === result.hash) {
                        resolve(true);
                    }
                });
            })
            .catch((err: IMetamaskErrResponse) => reject(err));
    });
};

export const curSoldTicketsApi = (contractAddress: string) => {
    const DRC721Contract = initDRC721Contract(contractAddress);

    return DRC721Contract._curSoldTickets();
};

export const openBindBoxApi = async (contractAddress: string) => {
    const DRC721Contract = initDRC721Contract(contractAddress);
    return new Promise(async (resolve, reject) => {
        DRC721Contract.safeMint()
            .then((result: any) => {
                DRC721Contract.on("Transfer", async (...args) => {
                    if (args[3].transactionHash === result.hash) {
                        const result = await DRC721Contract.tokenURI(parseInt(args[2]._hex));
                        resolve(JSON.parse(base64.decode(result)));
                    }
                });
            })
            .catch((error: any) => {
                if (error.code === 4001) {
                    reject(error);
                }
            });
    });
};

export const getLatestTokenIdApi = (contractAddress: string) => {
    const DRC721Contract = initDRC721Contract(contractAddress);
    return DRC721Contract.getIds();
};

export const ownerOfAPi = async (contractAddress: string, tokenId: number) => {
    const DRC721Contract = initDRC721Contract(contractAddress);
    return DRC721Contract.ownerOf(tokenId);
};

export const tokenURIAPi = (contractAddress: string, tokenId: number) => {
    const DRC721Contract = initDRC721Contract(contractAddress);
    return DRC721Contract.tokenURI(tokenId);
};

export const transferFromNftApi = async (
    contractAddress: string,
    from: string,
    to: string,
    tokenId: number
) => {
    const DRC721Contract = initDRC721Contract(contractAddress);
    const result = await DRC721Contract.transferFrom(from, to, tokenId);
    try {
        return new Promise((resolve, reject) => {
            DRC721Contract.on("Transfer", async (...args) => {
                if (args[3].transactionHash === result.hash) {
                    resolve({ status: true });
                }
            });
        });
    } catch (error: IMetamaskErrResponse | any) {
        return { ...error, status: false };
    }
};

export const queryGetRulesApi = (contractAddress: string) => {
    const DRC721Contract = initDRC721Contract(contractAddress);
    return DRC721Contract.getRules();
};

export const synthesisApi = async (contractAddress: string, tokenId: number[]) => {
    const DRC721Contract = initDRC721Contract(contractAddress);
    return new Promise(async (resolve, reject) => {
        DRC721Contract.synthesis(tokenId)
            .then((result: any) => {
                DRC721Contract.on("Synthesis", async (...args) => {
                    if (args[1].transactionHash === result.hash) {
                        const result = await DRC721Contract.tokenURI(parseInt(args[0]._hex));
                        resolve(JSON.parse(base64.decode(result)));
                    }
                });
            })
            .catch((error: any) => {
                console.log(error);
                if (error.code === 4001) {
                    reject({ ...error, status: false });
                }
            });
    });
};

export const nftRevertApi = async (contractAddress: string, tokenId: number) => {
    const DRC721Contract = initDRC721Contract(contractAddress);
    const provider = getProvider();
    const result = await DRC721Contract.nftRevert(tokenId);
    console.log(result);
    return new Promise((resolve, reject) => {
        provider.once(result.hash, (receipt) => {
            if (receipt.transactionHash === result.hash) {
                resolve(true);
            }
        });
    });
};
