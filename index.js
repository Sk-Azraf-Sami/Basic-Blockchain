const sha256 = require("crypto-js/sha256");

//create Block
class Block {
    
    constructor(timestamp,transactions,previousHash=""){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash; 
        this.hash = this.calculateHash(); 
        this.nonce=0; 
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }
        //console.log("Mine Done: ",this.hash); 
    }

    calculateHash(){
        return sha256 (this.timestamp +
             JSON.stringify(this.transactions) + 
             this.previousHash + 
             this.nonce).toString();
    }
}

//create Transaction 
class Transaction{
    constructor(fromAddress,toAddress,amount){
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;  
    }
}

//create BlockChain
class BlockChain {
    constructor(){
        this.chain = [this.generateGenesisBlock()]; // initialize array with first element 
        this.difficulty = 5; //declare by default difficulty 
        this.pendingTransactions = []; 
        this.miningReward=10; 
    }

    generateGenesisBlock(){ //create first block 
        return new Block("2023-02-28","Genesis","0000");
    }

    getHashofLastBlock(){
        return this.chain[this.chain.length-1]; 
    }

    createTransaction(transactionObj){
        this.pendingTransactions.push(transactionObj); 
    }

    minePendingTransaction(minerAddress){
        let block = new Block(Date.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);
        this.chain.push(block); 
        this.pendingTransactions = [new Transaction(null,minerAddress,this.miningReward)];
    }
    
    /*addBlock(newBlock){
        newBlock.previousHash=this.getHashofLastBlock().hash;
        //newBlock.hash=newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty); 
        this.chain.push(newBlock);
    }*/

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
    //In one chain, there are many blocks and in one block there are many transactions 
    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const transaction of block.transactions){
               
                if(transaction.fromAddress === address){
                    balance = balance - transaction.amount;  
                }

                if(transaction.toAddress === address){
                    balance = transaction.amount + balance; 
                }
            }
        }
        return balance; 
    }
}

const josscoin = new BlockChain();

/*const block = new Block("2023-02-28",{amount: 5});
josscoin.addBlock(block);

const block2 = new Block("2023-02-22",{amount: 10});
josscoin.addBlock(block2);*/
josscoin.createTransaction(new Transaction("sami","biva",100)); //sami=> -100+70=-30
josscoin.createTransaction(new Transaction("biva","sami",70)); //biva=> 100 -70 = 30 
josscoin.minePendingTransaction("azraf");
console.log(josscoin); 
console.log(josscoin.getBalanceOfAddress("azraf")); 
console.log(josscoin.getBalanceOfAddress("sami")); 
console.log(josscoin.getBalanceOfAddress("biva")); 

josscoin.minePendingTransaction("azraf");
console.log(josscoin.getBalanceOfAddress("azraf"));

//console.log("After Invalid Change of Data");
//josscoin.chain[1].data="HACKED";
//console.log(josscoin.checkValidationofBlock());

//console.log(Array(6).join("0"));