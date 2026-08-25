import {
  CloudWatchLogsClient,
  DescribeLogStreamsCommand,
  FilterLogEventsCommand,
  OrderBy,
} from "@aws-sdk/client-cloudwatch-logs";
import type {
  FilteredLogEvent,
  FilterLogEventsCommandInput,
} from "@aws-sdk/client-cloudwatch-logs";
import { calculateBackoff } from "../../time/backoff.js";
import { pause } from "../../time/pause.js";

/**
 * Returns the names of the most recently active log streams in a log group.
 *
 * @param client - The CloudWatch Logs client.
 * @param logGroupName - The name of the log group.
 * @returns An array of log stream names.
 */
async function getLogStreams(
  client: CloudWatchLogsClient,
  logGroupName: string,
): Promise<string[]> {
  const res = await client.send(
    new DescribeLogStreamsCommand({
      logGroupName,
      orderBy: OrderBy.LastEventTime,
      descending: true,
      limit: 15,
    }),
  );
  return (res.logStreams ?? []).map((s) => s.logStreamName as string);
}

/**
 * Recursively fetches all matching log events, following pagination tokens.
 *
 * @param client - The CloudWatch Logs client.
 * @param input - The filter log events command input.
 * @param events - Accumulator for collected events.
 * @returns All matching log events.
 */
async function filterLogEvents(
  client: CloudWatchLogsClient,
  input: FilterLogEventsCommandInput,
  events: FilteredLogEvent[] = [],
): Promise<FilteredLogEvent[]> {
  const res = await client.send(new FilterLogEventsCommand(input));
  if (!res.events) return [];
  events.push(...res.events);
  if (res.nextToken) {
    await filterLogEvents(client, { ...input, nextToken: res.nextToken }, events);
  }
  return events;
}

/**
 * Filters CloudWatch log events matching all given strings, with exponential backoff retry.
 *
 * @param client - The CloudWatch Logs client.
 * @param logGroupName - The name of the log group to search.
 * @param filters - Strings that must all appear in matching log events.
 * @param startTime - Optional epoch milliseconds to filter events from.
 * @param maxRetries - Maximum number of retry attempts before returning an empty array.
 * @param retryCount - Internal retry counter; do not pass this manually.
 * @returns An array of matching log events, or an empty array if retries are exhausted.
 */
export async function filterLogs(
  client: CloudWatchLogsClient,
  logGroupName: string,
  filters: string[],
  startTime?: number,
  maxRetries = 20,
  retryCount = 0,
): Promise<FilteredLogEvent[]> {
  try {
    const filterPattern = filters.map((f) => `"${f}"`).join(" ");
    const logStreamNames = await getLogStreams(client, logGroupName);
    if (logStreamNames.length === 0) {
      throw new Error(`No log streams found for log group ${logGroupName}`);
    }
    const events = await filterLogEvents(client, {
      logGroupName,
      logStreamNames,
      filterPattern,
      ...(startTime !== undefined && { startTime }),
    });
    if (events.length === 0) {
      throw new Error(`No log events found matching filters in ${logGroupName}`);
    }
    return events;
  } catch {
    if (retryCount >= maxRetries) return [];
    await pause(calculateBackoff({ attempt: retryCount }));
    return filterLogs(client, logGroupName, filters, startTime, maxRetries, retryCount + 1);
  }
}
