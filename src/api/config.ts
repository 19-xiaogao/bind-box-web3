const developmentNetWork = "http://192.168.0.58:8545";

const prodNetWork = "http://ctrlpanel.dbchain.cloud:8545";

const netWork = import.meta.env.MODE === "development" ? developmentNetWork : prodNetWork;

export default {
    appCode: "FLFHYQ1AET",
    netWork: netWork,
};
