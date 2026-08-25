import { describe, it, expect, vi, beforeEach } from "vitest";
import { filterLogs } from "./filterLogs";
import { DescribeLogStreamsCommand, FilterLogEventsCommand } from "@aws-sdk/client-cloudwatch-logs";

const mockSend = vi.fn<(cmd: unknown) => unknown>();
const mockClient = { send: mockSend } as any;

const logStreamsResponse = {
  logStreams: [{ logStreamName: "stream-1" }, { logStreamName: "stream-2" }],
};

const logEventsResponse = {
  events: [{ message: "test event", timestamp: 1000 }],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("filterLogs", () => {
  it("returns matching log events", async () => {
    mockSend.mockResolvedValueOnce(logStreamsResponse).mockResolvedValueOnce(logEventsResponse);

    const result = await filterLogs(mockClient, "my-log-group", ["my-filter"]);

    expect(result).toEqual(logEventsResponse.events);
    expect(mockSend).toHaveBeenCalledWith(expect.any(DescribeLogStreamsCommand));
    expect(mockSend).toHaveBeenCalledWith(expect.any(FilterLogEventsCommand));
  });

  it("paginates when nextToken is present", async () => {
    const page1 = { events: [{ message: "event-1" }], nextToken: "token-abc" };
    const page2 = { events: [{ message: "event-2" }] };

    mockSend
      .mockResolvedValueOnce(logStreamsResponse)
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce(page2);

    const result = await filterLogs(mockClient, "my-log-group", ["my-filter"]);

    expect(result).toEqual([{ message: "event-1" }, { message: "event-2" }]);
  });

  it("retries and returns [] when maxRetries exceeded", async () => {
    mockSend.mockResolvedValue({ logStreams: [] });

    const result = await filterLogs(mockClient, "my-log-group", ["my-filter"], undefined, 1);

    expect(result).toEqual([]);
  });

  it("builds the filter pattern correctly from multiple filters", async () => {
    mockSend.mockResolvedValueOnce(logStreamsResponse).mockResolvedValueOnce(logEventsResponse);

    await filterLogs(mockClient, "my-log-group", ["filter-a", "filter-b"]);

    const filterCall = mockSend.mock.calls.find((c) => c[0] instanceof FilterLogEventsCommand);
    expect((filterCall![0] as FilterLogEventsCommand).input.filterPattern).toBe(
      '"filter-a" "filter-b"',
    );
  });

  it("passes startTime when provided", async () => {
    mockSend.mockResolvedValueOnce(logStreamsResponse).mockResolvedValueOnce(logEventsResponse);

    await filterLogs(mockClient, "my-log-group", ["my-filter"], 1700000000000);

    const filterCall = mockSend.mock.calls.find((c) => c[0] instanceof FilterLogEventsCommand);
    expect((filterCall![0] as FilterLogEventsCommand).input.startTime).toBe(1700000000000);
  });
});
