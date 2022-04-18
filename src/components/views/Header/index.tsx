import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./header.scss"
import * as ethers from "ethers"
import abi from "../../../abi/DRC721.json";

const HeaderJsx = () => {

    const [currentAccount, setCurrentAccount] = useState("")
    const contractAddress = "0x33cc23476EBE1f8F2E0acA82546b1D22279B477F";

    const contractABI: any = abi.abi;

    const handleConnectMeatMask = async () => {
        const result = await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account)
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
        init()
    }, [])

    async function init() {

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log(ethers.utils.parseEther(String(1)));

        const tx = await wavePortalContract["buyTickets"](1, {
            gasPrice: 1000000000,
            gasLimit: 300000,
            value: ethers.utils.parseEther(String(1))
        })
        const transData = await tx.wait()

        // const buyTickets = await wavePortalContract.buyTickets(1);
        // await buyTickets.wait();

        // const params = {
        //     from: "0xa8433e531575CCCf9E19978800D452807C5E3F64",
        //     to: contractAddress,
        //     // value: '0x1',
        //     // gasPrice: '0x1',
        //     // gas: '0x1',
        //     data:
        //         '0x2f3666370000000000000000000000000000000000000000000000000000000000000001',
        // }
        // console.log(window.ethereum);

        // window.ethereum
        //     .request({
        //         method: 'eth_sendTransaction',
        //         params: [
        //             params
        //         ],
        //     })
        //     .then((result: any) => {
        //     })
        //     .catch((error: any) => {
        //     });
    }



    return <header className="h-header">
        <div className="h-logo">
            <Link to="/">
                <h2>DBChain 盲盒</h2>
            </Link>

        </div>
        <div className="h-connect">
            <span onClick={handleConnectMeatMask}>连接MetaMask</span>
        </div>
    </header>
}

export default HeaderJsx