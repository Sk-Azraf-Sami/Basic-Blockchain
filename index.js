const sha256 = require("crypto-js/sha256");

//create Block
class Block {
    
    constructor(timestamp,data,previousHash=""){
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash; 
        this.hash = this.calculateHash(); 
        this.nonce=0; 
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }
    }

    calculateHash(){
        return sha256 (this.timestamp +
             JSON.stringify(this.data) + 
             this.previousHash + 
             this.nonce).toString();
    }
}

//create BlockChain
class BlockChain {
    constructor(){
        this.chain = [this.generateGenesisBlock()]; // initialize array with first element 
    }

    generateGenesisBlock(){ //create first block 
        return new Block("2023-02-28","Genesis","0000");
    }

    getHashofLastBlock(){
        return this.chain[this.chain.length-1]; 
    }
    
    addBlock(newBlock){
        newBlock.previousHash=this.getHashofLastBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValidationofBlock(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false; 
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false; 
            }
        }
        return true; 
    }
}

const josscoin = new BlockChain();
const block = new Block("2023-02-28",{amount: 5});

josscoin.addBlock(block);
console.log(josscoin.checkValidationofBlock()); 

console.log("After Invalid Change of Data");
josscoin.chain[1].data="HACKED";
console.log(josscoin.checkValidationofBlock());

//console.log(Array(6).join("0"));