const commonData = {
    width: 300,
    height: 300,
    addRandomString: ()=>{
        let dictionary= "0123456789abcdefghijklmnopqrstuvwxyz";
        let randomString= ""
        for(let x=0; x<10;x++){
            randomString +=dictionary[parseInt(Math.random()*100) % dictionary.length];
        }
        randomString +="_";
	    return randomString;
    },
    smallImgName:function(){
        return "_"+this.width + "_" +this.height;
    }
}

module.exports = commonData;