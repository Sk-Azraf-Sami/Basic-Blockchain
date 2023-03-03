const EC = require("elliptic").ec;
var ec = new EC("secp256k1");

//Generate Key 
var key = ec.genKeyPair();
const privateKey = key.getPrivate("hex"); //signature or sign
const publicKey = key.getPublic("hex");  // wallet address 
console.log("Private key: ",privateKey);
console.log("Public Key: ",publicKey); 

module.exports = {
    key,
    privateKey,
    publicKey
}; 
