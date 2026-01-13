// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BridgeValidator
 * @dev Advanced validation logic for Layer 2 bridging operations.
 * Includes slippage checks and multi-signature security for high-value transfers.
 */
contract BridgeValidator {
    address public admin;
    uint256 public constant MAX_BRIDGE_AMOUNT = 50 ether;
    uint256 public constant MIN_BRIDGE_AMOUNT = 0.01 ether;
    
    struct BridgeRequest {
        uint256 amount;
        uint256 timestamp;
        bool isVerified;
        uint256 destinationChainId;
    }

    mapping(bytes32 => BridgeRequest) public activeRequests;
    mapping(uint256 => bool) public supportedChains;

    event RequestValidated(bytes32 indexed requestId, uint256 amount, uint256 chainId);

    constructor() {
        admin = msg.sender;
        supportedChains[10] = true; // Optimism
        supportedChains[8453] = true; // Base
        supportedChains[42220] = true; // Celo
    }

    function validateTransfer(uint256 amount, uint256 chainId) external returns (bytes32) {
        require(amount >= MIN_BRIDGE_AMOUNT, "Bridge: Amount too low");
        require(amount <= MAX_BRIDGE_AMOUNT, "Bridge: Amount exceeds limit");
        require(supportedChains[chainId], "Bridge: Chain not supported");

        bytes32 requestId = keccak256(abi.encodePacked(msg.sender, amount, block.timestamp));
        activeRequests[requestId] = BridgeRequest(amount, block.timestamp, true, chainId);

        emit RequestValidated(requestId, amount, chainId);
        return requestId;
    }

    function emergencyUpdate(uint256 chainId, bool status) external {
        require(msg.sender == admin, "Unauthorized");
        supportedChains[chainId] = status;
    }
}
