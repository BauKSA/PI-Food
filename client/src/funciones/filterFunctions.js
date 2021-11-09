export function getFilter(order, array){
    let filter;
    switch(order){
        case 'vegetarian':
            filter = array.filter((a)=>{
                if(a.vegetarian){
                    return a;
                }
            });
            return filter;

        case 'vegan':
            filter = array.filter((a)=>{
                if(a.vegan){
                    return a;
                }
            });
            return filter;

        case 'dairyfree':
            filter = array.filter((a)=>{
                if(a.dairyfree){
                    return a;
                }
            });
            return filter;
        case 'glutenfree':
            filter = array.filter((a)=>{
                if(a.glutenfree){
                    return a;
                }
            });
            return filter;
        default:
            return array;
    }
}

export function setFilter (fi, obj){
    obj.setState({
        ...obj.state,
        pag: 0,
        filter: fi
    })
}