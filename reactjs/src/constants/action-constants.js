import keyMirror from "keymirror";

var ActionConstants = keyMirror({
    CLIENT_INIT:null,
    CLIENT_SEARCH:null,
    CLIENT_EDIT:null,
    CLIENT_ADD:null,
    CLIENT_MODIFY_COMPLETE:null,
    INIT_MEMBER_LEVEL:null,

    ITEM_ADD:null,
    ITEM_DELETE:null,
    ITEM_EDIT:null,
    ITEM_GET:null,
    ITEM_SEARCH:null,
    ITEM_SAVE:null,

    ORDER_SUBMIT:null,
    ORDER_ITEM_ADD:null,
    ORDER_ITEM_REMOVE:null,
    ORDER_ITEM_UPDATED:null,
    ORDER_PRINT:null,
    ORDER_SEARCH:null,
    ORDER_GET_CLIENT_BY_NAME:null,
    ORDER_GET_FINAL_ITEMS:null,
    ORDER_GET_AVAILABLE_ITEMS:null,
    ORDER_DELETE:null,

    ORDER_SEARCH:null,
    ORDER_SEARCH_INIT:null,

    ORDER_LIST_ITEM_CHANGED:null,

    PREPAID_SAVE:null,
    PREPAID_GET_LIST:null,
    PREPAID_GET_DETAILED:null,

    PRINT_ORDER_REVIEW:null,
    PRINT_PREPAID_RECEIPT_REVIEW:null,
    PRINT_COMPLETED:null,
 });

export {ActionConstants};