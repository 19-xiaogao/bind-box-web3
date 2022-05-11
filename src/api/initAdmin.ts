import bs58 from "bs58";
import * as secp from "ethereum-cryptography/secp256k1";
import * as ethers from "ethers";
import { keccak256 } from "ethereum-cryptography/keccak";
import DBchainConfig from "./config";

// 对应助记词 fence weapon anchor pony mountain float later castle loop tragic embark outdoor
const privKey = new Uint8Array([
    29, 29, 223, 145, 133, 200, 122, 27, 31, 168, 151, 62, 91, 63, 97, 43, 172, 68, 101, 195, 127, 118, 184,
    118, 109, 189, 12, 190, 129, 23, 54, 175,
]);

const pubKey = new Uint8Array([
    3, 109, 131, 204, 159, 146, 9, 109, 32, 136, 146, 211, 155, 209, 237, 13, 112, 254, 245, 99, 114, 13, 132,
    191, 206, 24, 188, 226, 33, 220, 191, 247, 107,
]);

function sign(bytes: any, privateKey: any) {
    const hash = keccak256(new TextEncoder().encode(bytes));
    const [signature] = secp.signSync(hash, privateKey, {
        recovered: true,
        der: false,
    });
    return signature;
}

function signForToken(str: any) {
    var signature = sign(str, privKey);

    var encodedPubKey = bs58.encode(pubKey);
    var encodedSig = bs58.encode(signature);
    var result = `${encodedPubKey}:${str}:${encodedSig}`;
    return result;
}
export function createAccessToken() {
    var time = "" + Date.now();
    var result = signForToken(time);
    return result;
}

export function getProvider() {
    if (window.ethereum) {
        if (window.ethereum.selectedAddress && parseInt(window.ethereum.chainId) === 9000) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            return provider;
        }
    }

    return new ethers.providers.JsonRpcProvider(DBchainConfig.netWork);
}
