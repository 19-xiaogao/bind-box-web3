import * as ethers from "ethers";
import DRC751 from "./abi/DRC721.json";
import { createAccessToken, getProvider } from "@/api/initAdmin";
import { encode, decode } from "js-base64";

// DRC751 abi
const DRC751contractABI = DRC751;
// DRC751 合约地址
const DRC751contractAddress = "0x5906De49949881C44D18325F65c9f45E12eBC47b";

export function initDRC721Contract(contractAddress: string) {
    const provider = getProvider();
    const Contract = new ethers.Contract(contractAddress, DRC751contractABI, provider);
    return Contract;
}
// const DRC721Contract = initDRC721Contract();

export const buyTicketsApi = (count: number, price: number, contractAddress: string) => {
    const DRC721Contract = initDRC721Contract(contractAddress);

    return DRC721Contract["buyTickets"](count, {
        gasLimit: 300000,
        value: ethers.utils.parseEther(String(price)),
    });
};

export const curSoldTicketsApi = (contractAddress: string) => {
    const DRC721Contract = initDRC721Contract(contractAddress);
    console.log(DRC721Contract);
    return DRC721Contract._curSoldTickets();
};
