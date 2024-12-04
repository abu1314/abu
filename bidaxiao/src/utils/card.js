class card {
    constructor(num,huase,color){
        this.num=num,
        this.huase=huase,
        this.color=color
    }
}
let cardAll=[];
function init(){
    for(let n=1;n<11;n++){
        for(let h=0;h<4;h++){
            cardAll.push(new card(n,h,h>1))
        }
    }
}
console.log(cardAll)
