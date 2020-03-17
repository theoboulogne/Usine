const proba = (probabilite) => {
    if(Math.random()<probabilite){
        return 1;
    }
    else return 0;
};
exports.proba = proba;