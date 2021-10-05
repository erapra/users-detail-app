import _ from "lodash";

const paginate=(users,currentPage,displayCount)=>
{
    const startIndex = (currentPage-1)*displayCount;
 
    return _(users).slice(startIndex).take(displayCount).value();

}



export default paginate;