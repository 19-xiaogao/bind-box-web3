import { notification } from "antd";
import dayjs from "dayjs";
export function notificationInfo(desc: string) {
    notification.info({ message: "提示!", description: desc, placement: "bottomRight" });
}

export function notificationSuccess(desc: string) {
    notification.success({ message: "成功!", description: desc, placement: "bottomRight" });
}

export function notificationError(desc: string) {
    notification.error({ message: "错误!", description: desc, placement: "bottomRight" });
}

export const formatTime = (time: string) => {
    return dayjs(Number(time) * 1000).format("YYYY-MM-DD");
};
