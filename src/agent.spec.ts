import { FindingSeverity, FindingType, Finding, createTransactionEvent, HandleTransaction } from "forta-agent";
import { CREATE_AGENT_FUNCTION, NETHERMIND_DEPLOYER_ADDRESS } from "./constants";
import { provideHandleTransaction } from "./agent";

describe("Agent creation function call", () => {
  let handleTransaction: HandleTransaction;

  beforeAll(() => {
    handleTransaction = provideHandleTransaction(NETHERMIND_DEPLOYER_ADDRESS);
  });

  it("returns empty finding if there are no agent creation", async () => {
    const mockTxEvent = createTransactionEvent({ transaction: { from: NETHERMIND_DEPLOYER_ADDRESS } } as any);
    mockTxEvent.filterFunction = jest.fn().mockReturnValue([]);

    const findings = await handleTransaction(mockTxEvent);

    expect(findings).toStrictEqual([]);
    expect(mockTxEvent.filterFunction).toHaveBeenCalledTimes(1);
    expect(mockTxEvent.filterFunction).toHaveBeenCalledWith(CREATE_AGENT_FUNCTION);
  });
  it("returns empty finding if there are agents creations but not from Nethermind", async () => {
    const mockTxEvent = createTransactionEvent({ transaction: { from: "0x00" } } as any);
    const mockAgentCreationFunction = {
      args: {
        agentId: BigInt("1"),
        owner: "0x00",
        metadata: "",
        chainIds: [BigInt("1")],
      },
    };
    mockTxEvent.filterFunction = jest.fn().mockReturnValue([mockAgentCreationFunction]);

    const findings = await handleTransaction(mockTxEvent);

    expect(findings).toStrictEqual([]);
    expect(mockTxEvent.filterFunction).toHaveBeenCalledTimes(0);
  });
  it("returns findings if there are agents creations from Nethermind", async () => {
    const mockTxEvent = createTransactionEvent({ transaction: { from: NETHERMIND_DEPLOYER_ADDRESS } } as any);
    const mockAgentCreationFunction = {
      args: {
        agentId: BigInt("1"),
        owner: "0x00",
        metadata: "",
        chainIds: [BigInt("1"), BigInt("3")],
      },
    };
    mockTxEvent.filterFunction = jest.fn().mockReturnValue([mockAgentCreationFunction]);

    const findings = await handleTransaction(mockTxEvent);

    expect(findings).toStrictEqual([
      Finding.fromObject({
        alertId: "NETHAGENT-1",
        description: `Agent with id:1 created`,
        name: "Nethermind agent created",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata: {
          metadata: "",
          chainIds: "1,3",
        },
      }),
    ]);
  });
});
