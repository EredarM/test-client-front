import Loading from "../component/common/loading";
import React from "react";

const STATUS_LOADING: Status = "loading";
const STATUS_IDLE: Status = "idle";
const STATUS_FAILED: Status = "failed";

export const resolveStatus = (item: Omit<ApiResponse<any>, 'data'>): React.JSX.Element => {
    if (item.status === STATUS_LOADING || item.status === STATUS_IDLE) {
        return <Loading />;
    }
    if (item.status === STATUS_FAILED) {
        if (item.error?.code === '404') {
        }

    }
    return (<></>);
};