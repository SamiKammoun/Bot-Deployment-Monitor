import { Finding, HandleTransaction, TransactionEvent } from "forta-agent";
import { createNewAgentFinding } from "./agent.utils";
import * as constants from "./constants";

export const provideHandleTransaction = (addressToWatch: string): HandleTransaction => {
  return async (txEvent: TransactionEvent) => {
    const findings: Finding[] = [];
    if (txEvent.from != constants.NETHERMIND_DEPLOYER_ADDRESS) return findings;
    const createAgentInvocations = txEvent.filterFunction(constants.CREATE_AGENT_FUNCTION);
    createAgentInvocations.forEach((createAgentInvocation) => {
      const agentId: bigint = BigInt(createAgentInvocation.args.botId.toString());
      const metadata: string = createAgentInvocation.args.metadata;
      const chainIds: bigint[] = createAgentInvocation.args.chainIds;
      findings.push(createNewAgentFinding(agentId, metadata, chainIds));
    });
    return findings;
  };
};

export default {
  handleTransaction: provideHandleTransaction(constants.NETHERMIND_DEPLOYER_ADDRESS),
};
