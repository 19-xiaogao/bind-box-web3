export enum BindBoxStatus {
    notShow = "0",
    show = "1",
}
export enum SelectStatus {
    bindBox = "0",
    nft ="1",
    synthetic ="2",
}

export interface NFtAttributesInterface {
    level: string;
    probability: string;
}
export interface NftMetaDataInterface {
    image: string;
    name: string;
    desc: string;
    tokenId?: number;
    attributes: NFtAttributesInterface[];
}

export interface BindBoxDetailInterface {
    desc: string;
    name: string;
    nft_metadatas: NftMetaDataInterface[];
}

export interface BindBoxInterface {
    id: string;
    contract_address: string;
    created_at: string;
    created_by: string;
    desc: BindBoxDetailInterface;
    price: number;
    release_time: string;
    release_number: string;
    status: BindBoxStatus;
    tx_hash: string;
}
