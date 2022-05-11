const developmentNetWork = "http://192.168.0.58:8545";

const prodNetWork = "https://ctrlpanel.dbchain.cloud/ws";

const netWork = import.meta.env.MODE === "development" ? developmentNetWork : prodNetWork;

export default {
    appCode: "DUJRW81UEH",
    netWork,
};
