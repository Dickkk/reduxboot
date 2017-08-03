
const dicReducer = function(state , action) {
    if(state==undefined)
    {
        //初始化
        state={
            diclist:[{pr_code:'cif_per_inf.income_lvl',content:'[2000,80000]'}],
            total:8
        }
    }
        let list = state.diclist;
        switch (action.type) {
            case 'dic_init':
                return Object.assign({}, state,{diclist:action.diclist});
            case 'dic_search':
                return Object.assign({}, state,{diclist:action.diclist.filter((item,index)=>{
                    if(index<10){
                        return true;
                    } else {
                        return false;
                    }}),total:action.diclist.length});
        }
        return state;
}

export default dicReducer;