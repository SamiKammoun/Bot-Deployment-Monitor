import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { createNewAgentFinding } from "./agent.utils";
import { CREATE_AGENT_FUNCTION, FORTA_PROXY_ADDRESS, NETHERMIND_DEPLOYER_ADDRESS } from "./constants";
export const provideHandleTransaction = (addressToWatch: string): HandleTransaction => {
  return async (txEvent: TransactionEvent) => {
    const findings: Finding[] = [];
    if (txEvent.from.toLowerCase() != NETHERMIND_DEPLOYER_ADDRESS.toLowerCase()) return findings;

    const createAgentInvocations = txEvent.filterFunction(CREATE_AGENT_FUNCTION, FORTA_PROXY_ADDRESS);

    createAgentInvocations.forEach((createAgentInvocation) => {
      const agentId: bigint = BigInt(createAgentInvocation.args.agentId.toString());
      const metadata: string = createAgentInvocation.args.metadata;
      const chainIds: bigint[] = createAgentInvocation.args.chainIds;
      findings.push(createNewAgentFinding(agentId, metadata, chainIds));
    });

    return findings;
  };
};

export default {
  handleTransaction: provideHandleTransaction(NETHERMIND_DEPLOYER_ADDRESS),
};
