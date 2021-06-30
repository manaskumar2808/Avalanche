
const itemIndex = (gallery) => {
    for(let key in gallery) {
        if(gallery[key].type === 'video') {
            return 0;
        }
    }
    return 1;
}

export default itemIndex;