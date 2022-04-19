import * as ethers from "ethers";
import DRC751 from "./DRC721.json";

// DRC751 abi
export const contractABI = DRC751.abi;

// DRC751 合约地址
export const contractAddress = "0x33cc23476EBE1f8F2E0acA82546b1D22279B477F";

export function initDRC751Contract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

    return wavePortalContract;
}
