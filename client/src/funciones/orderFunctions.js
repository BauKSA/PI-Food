export function getOrder(order, array){
    switch(order){
        case 'AZ':
            array.sort((a, b)=>{
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            return array;
        case 'ZA':
            array.sort((a, b)=>{
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                }
                return 0;
            });
            return array;
        case '100':
            array.sort((a, b)=>{
                if (a.score > b.score) {
                    return 1;
                }
                if (a.score < b.score) {
                    return -1;
                }
                return 0;
            });
            return array;
        case '000':
            array.sort((a, b)=>{
                if (a.score > b.score) {
                    return -1;
                }
                if (a.score < b.score) {
                    return 1;
                }
                return 0;
            });
            return array;
        default:
            return array;
    }
}

export function setOrder (or, obj){
    obj.setState({
        ...obj.state,
        order: or
    })
}