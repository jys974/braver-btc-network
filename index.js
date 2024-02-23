// 使用crypto-js库来计算SHA256哈希
const SHA256 = require('crypto-js/sha256');

// 定义区块类
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    // 计算块的哈希
    calculateHash() {
        return SHA256(`${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}`).toString();
    }
}

// 定义区块链类
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    // 创建创世区块
    createGenesisBlock() {
        return new Block(0, "01/01/2022", "Genesis block", "0");
    }

    // 获取最新的区块
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // 添加新的区块
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // 验证区块链完整性
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash() || currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// 创建一个简单的区块链实例
let myBlockchain = new Blockchain();
myBlockchain.addBlock(new Block(1, "02/01/2022", { amount: 4 }));
myBlockchain.addBlock(new Block(2, "03/01/2022", { amount: 8 }));

// 输出区块链
console.log(JSON.stringify(myBlockchain, null, 4));

// 验证区块链的完整性
console.log("Is blockchain valid? " + myBlockchain.isChainValid());
