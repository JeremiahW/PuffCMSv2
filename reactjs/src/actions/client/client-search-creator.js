import {Dispatcher} from "flux";
import {ActionConstants} from "../../constants/action-constants";

class DispatcherClientSearch extends Dispatcher{
    ClientSearchAction(data){
        this.dispatch({
            actionType: ActionConstants.CLIENT_SEARCH,
            data:data
        })
    }

    ClientInitAction(data){
        this.dispatch({
            actionType: ActionConstants.CLIENT_INIT,
            data:data
        })
    }
}

const AppDispatcher = new DispatcherClientSearch();
export default AppDispatcher;