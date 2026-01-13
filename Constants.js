/**
 * Network Configuration Constants for L2 Bridge Estimator
 */

export const SUPPORTED_NETWORKS = {
    ETHEREUM: {
        chainId: 1,
        name: "Mainnet",
        explorer: "https://etherscan.io"
    },
    BASE: {
        chainId: 8453,
        name: "Base",
        explorer: "https://basescan.org"
    },
    OPTIMISM: {
        chainId: 10,
        name: "Optimism",
        explorer: "https://optimistic.etherscan.io"
    }
};

export const GAS_LIMITS = {
    SIMPLE_SEND: 21000,
    BRIDGE_LOCK: 150000,
    CONTRACT_DEPLOY: 2500000
};
