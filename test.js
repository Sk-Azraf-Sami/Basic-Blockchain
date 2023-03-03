const {Block, Transaction, BlockChain} = require("./index"); 
const {key,privateKey, publicKey} = require("./keygen"); 

const walletNumber = publicKey; 
const josscoin = new BlockChain(); 
const tx1 = new Transaction(walletNumber,"randomAddress",100); 
tx1.signTransaction(key); 
josscoin.addTransaction(tx1); 
josscoin.minePendingTransaction(walletNumber); 

console.log("WalletNumber: ",walletNumber);
console.log("Private key: ",privateKey); 
console.log(josscoin.getBalanceOfAddress(walletNumber)); 

josscoin.minePendingTransaction(walletNumber); 
console.log(josscoin.getBalanceOfAddress(walletNumber)); 