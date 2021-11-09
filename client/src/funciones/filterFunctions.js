export function getFilter(order, array){
    let filter;
    switch(order){
        case 'vvxd':
            filter = array.filter((a)=>{
                if(!a.glutenfree){
                    return a;
                }
            });
            return filter;

        case 'vvgx':
            filter = array.filter((a)=>{
                if(!a.dairyfree){
                    return a;
                }
            });
            return filter;

        case 'vvxx':
            filter = array.filter((a)=>{
                if(!a.dairyfree && !a.glutenfree){
                    return a;
                }
            });
            return filter;

        case 'vxgd':
            filter = array.filter((a)=>{
                if(!a.vegan){
                    return a;
                }
            });
            return filter;

        case 'vxxd':
            filter = array.filter((a)=>{
                if(!a.vegan && !a.dairyfree){
                    return a;
                }
            });
            return filter;

        case 'vxgx':
            filter = array.filter((a)=>{
                if(!a.vegan && !a.dairyfree){
                    return a;
                }
            });
            return filter;

        case 'vxxx':
            filter = array.filter((a)=>{
                if(!a.dairyfree && !a.vegan && !a.glutenfree){
                    return a;
                }
            });
            return filter;

        case 'xvgd':
            filter = array.filter((a)=>{
                if(!a.vegetarian){
                    return a;
                }
            });
            return filter;

        case 'xvxd':
            filter = array.filter((a)=>{
                if(!a.vegetarian && !a.glutenfree){
                    return a;
                }
            });
            return filter;

        case 'xvgx':
            filter = array.filter((a)=>{
                if(!a.vegetarian && !a.dairyfree){
                    return a;
                }
            });
            return filter;

        case 'xvxx':
            filter = array.filter((a)=>{
                if(!a.vegetarian && !a.glutenfree && !a.dairyfree){
                    return a;
                }
            });
            return filter;

        case 'xxgd':
            filter = array.filter((a)=>{
                if(!a.vegetarian && !a.vegan){
                    return a;
                }
            });
            return filter;

        case 'xxxd':
            filter = array.filter((a)=>{
                if(!a.vegetarian && !a.vegan && !a.glutenfree){
                    return a;
                }
            });
            return filter;

        case 'xxgx':
            filter = array.filter((a)=>{
                if(!a.vegetarian && !a.vegan && !a.dairyfree){
                    return a;
                }
            });
            return filter;

        default:
            return array;
    }
}

export function setFilter (obj){

    let fi = '';
    let filterVege = document.getElementById("filter-vegetarian");
    let filterVegan = document.getElementById("filter-vegan");
    let filterGluten = document.getElementById("filter-glutenfree");
    let filterDairy = document.getElementById("filter-dairyfree");

    if(filterVege.checked && filterVegan.checked){
        if(filterDairy.checked || filterGluten.checked){
            if(filterDairy.checked && filterGluten.checked){
                fi = 'vvgd'
            }else if(filterDairy.checked && !filterGluten.checked){
                fi = 'vvxd'
            }else if(!filterDairy.checked && filterGluten.checked){
                fi = 'vvgx'
            }
        }else{
            fi = 'vvxx'
        }
    }else if(filterVege.checked && !filterVegan.checked){
        if(filterDairy.checked && filterGluten.checked){
            fi = 'vxgd'
        }else if(filterDairy.checked && !filterGluten.checked){
            fi = 'vxxd'
        }else if(!filterDairy.checked && filterGluten.checked){
            fi = 'vxgx'
        }else{
            fi = 'vxxx'
        }
    }else if(!filterVege.checked && filterVegan.checked){
        if(filterDairy.checked && filterGluten.checked){
            fi = 'xvgd'
        }else if(filterDairy.checked && !filterGluten.checked){
            fi = 'xvxd'
        }else if(!filterDairy.checked && filterGluten.checked){
            fi = 'xvgx'
        }else{
            fi = 'xvxx'
        }
    }else if(!filterVege.checked && !filterVegan.checked){
        if(filterDairy.checked && filterGluten.checked){
            fi = 'xxgd'
        }else if(filterDairy.checked && !filterGluten.checked){
            fi = 'xxxd'
        }else if(!filterDairy.checked && filterGluten.checked){
            fi = 'xxgx'
        }else{
            fi = 'xxxx'
        }
    }

    obj.setState({
        ...obj.state,
        pag: 0,
        filter: fi
    })
}