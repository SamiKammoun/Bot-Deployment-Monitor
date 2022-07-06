import { Finding, FindingSeverity, FindingType } from "forta-agent";

export const createNewAgentFinding = (agentId: bigint, _metadata: string, _chainIds: bigint[]): Finding => {
  return Finding.fromObject({
    alertId: "NETHAGENT-1",
    description: `Agent with id:${agentId.toString()} created`,
    name: "Nethermind agent created",
    severity: FindingSeverity.Info,
    type: FindingType.Info,
    metadata: {
      metadata: _metadata,
      chainIds: _chainIds.toString(),
    },
  });
};
