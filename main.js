const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2020", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash(); // always need to calculate new hash 
        this.chain.push(newBlock);
    }
}

let erwinCoin = new BlockChain();
erwinCoin.addBlock(new Block(1, "03/03/2020", {amount: 4}));
erwinCoin.addBlock(new Block(2, "03/03/2020", {amount: 5}));

// view how block chain look like 
console.log(JSON.stringify(erwinCoin, null, 4));