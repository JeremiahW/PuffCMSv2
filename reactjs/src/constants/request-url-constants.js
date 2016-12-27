var _ROOT = "http://localhost:8080/PuffCMSv2/public/index.php/";

export const POST_GET_CLIENTS = _ROOT + "index/client/get";
export const POST_SAVE_CLIENT = _ROOT + "index/client/save";
export const POST_GET_MEMBERLEVEL = _ROOT + "index/client/getLevels";

export const POST_GET_ITEMS = _ROOT + "index/item/get";
export const POST_SAVE_ITEMS = _ROOT + "index/item/save";

export const POST_SAVE_ORDER = _ROOT + "index/order/save";
export const GET_ORDER_LIST = _ROOT + "index/order/get";
export const GET_ORDER_STATUS = _ROOT + "index/order/getStatus";

export const GET_PREPAID_LIST = _ROOT + "index/prepaid/get";
export const POST_PREPAID = _ROOT + "index/prepaid/save";

export const POST_USER_LOGIN = _ROOT + "index/user/login";
export const GET_USER_STATE = _ROOT + "index/user/state";
export const USER_LOG_OUT = _ROOT + "index/user/logoff";