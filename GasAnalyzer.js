/**
 * @file GasAnalyzer.js
 * @description Advanced gas estimation engine for Base and Optimism L2 networks.
 */

const { ethers } = require("ethers");

class GasAnalyzer {
    constructor(rpcUrl, chainName) {
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        this.chainName = chainName;
        this.baseFeeMultiplier = 1.2; // Safety margin
    }

    async getComprehensiveGasPrice() {
        try {
            const feeData = await this.provider.getFeeData();
            const block = await this.provider.getBlock("latest");
            
            console.log(`Analyzing gas for ${this.chainName}...`);
            
            return {
                baseFee: ethers.utils.formatUnits(feeData.lastBaseFeePerGas, "gwei"),
                maxPriorityFee: ethers.utils.formatUnits(feeData.maxPriorityFeePerGas, "gwei"),
                suggestedMaxFee: ethers.utils.formatUnits(
                    feeData.maxFeePerGas.mul(120).div(100), "gwei"
                ),
                blockNumber: block.number
            };
        } catch (error) {
            console.error("Analysis failed:", error);
            return null;
        }
    }

    async calculateBridgeCost(gasLimit) {
        const stats = await this.getComprehensiveGasPrice();
        if (!stats) return "Error";

        const totalGwei = ethers.BigNumber.from(gasLimit).mul(
            ethers.utils.parseUnits(stats.suggestedMaxFee, "gwei")
        );
        
        return ethers.utils.formatEther(totalGwei);
    }
}

module.exports = GasAnalyzer;
