const {Block, Transaction, BlockChain} = require("./index"); 
const {ec} = require("./keygen"); 

const josscoin = new BlockChain();

//User1: 
var key1 = ec.genKeyPair();
const walletNumber1 = key1.getPublic("hex");
const privateKey1 = key1.getPrivate("hex"); 

//User2:
var key2 = ec.genKeyPair();
const walletNumber2 = key2.getPublic("hex");
const privateKey2 = key2.getPrivate("hex");

//transaction1 
const tx1 = new Transaction(walletNumber1,walletNumber2,100); 
tx1.signTransaction(key1); //transfer from walletNumber1, so use key1 
josscoin.addTransaction(tx1); 

//transaction2: 
const tx2 = new Transaction(walletNumber2,walletNumber1,50);
tx2.signTransaction(key2);
josscoin.addTransaction(tx2);

josscoin.minePendingTransaction(walletNumber1); 
console.log("WalletNumber1: ",josscoin.getBalanceOfAddress(walletNumber1)); 
console.log("WalletNumber2: ",josscoin.getBalanceOfAddress(walletNumber2)); 

//console.log("WalletNumber: ",walletNumber);
//console.log("Private key: ",privateKey); 
//console.log(josscoin.getBalanceOfAddress(walletNumber));

josscoin.minePendingTransaction(walletNumber1); 
console.log("WalletNumber1: ",josscoin.getBalanceOfAddress(walletNumber1)); //get mining reward 
console.log("WalletNumber2: ",josscoin.getBalanceOfAddress(walletNumber2)); 


//Hacking Detection 
/*josscoin.chain[1].transactions[1] = "HACKED";*/
console.log(josscoin.checkValidationofBlock()); //!Error: get false 