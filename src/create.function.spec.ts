import { createTransactionEvent, HandleTransaction } from "forta-agent";
import { NETHERMIND_DEPLOYER_ADDRESS } from "./constants";
import { provideHandleTransaction } from "./create.function";

describe("Agent creation function call", () => {
  let handleTransaction: HandleTransaction;
  const mockTxEvent = createTransactionEvent({} as any);
  beforeAll(() => {
    handleTransaction = provideHandleTransaction(NETHERMIND_DEPLOYER_ADDRESS);
  });
  it("returns empty finding if there are no agent creation", async () => {
    mockTxEvent.filterLog = jest.fn().mockReturnValue([]);
    const findings = await handleTransaction(mockTxEvent);
    expect(findings).toStrictEqual([]);
  });
});
