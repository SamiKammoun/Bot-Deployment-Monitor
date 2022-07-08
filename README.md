# Nethermind Agent Deployed Monitor

## Description

This agent detects when Netherminds deploy a new agent

## Supported Chains

- Polygon

## Alerts

Describe each of the type of alerts fired by this agent

- NETHAGENT-1
  - Fired when a new agent is deployed by Nethermind, address : `0x88dC3a2284FA62e0027d6D6B1fCfDd2141a143b8`
  - Severity is always set to "info" 
  - Type is always set to "info" 
  - Metadata includes the agent's metadata and chainIds

## Test Data

The agent behaviour can be verified with the following transactions:

- `0x7b3a2acef6aa72c80eaf036357e11f2ee5931f2eea8b546421e5ea18b299b4ee` (call `createAgent` function)


