const estimateGas = async (provider, tx) => {
    const gasLimit = await provider.estimateGas(tx);
    const feeData = await provider.getFeeData();
    return gasLimit.mul(feeData.gasPrice);
};
