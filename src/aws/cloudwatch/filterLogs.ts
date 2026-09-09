import {
  CloudWatchLogsClient,
  DescribeLogStreamsCommand,
  OrderBy,
  paginateFilterLogEvents,
} from "@aws-sdk/client-cloudwatch-logs";
import type { FilteredLogEvent } from "@aws-sdk/client-cloudwatch-logs";
import { calculateBackoff, pause } from "../../time";

// Disabling warning as the retry loop is inherently sequential
/* oxlint-disable no-await-in-loop */

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
  const { logStreams = [] } = await client.send(
    new DescribeLogStreamsCommand({
      logGroupName,
      orderBy: OrderBy.LastEventTime,
      descending: true,
      limit: 15,
    }),
  );

  return logStreams
    .map(({ logStreamName }) => logStreamName)
    .filter((logStreamName): logStreamName is string => logStreamName !== undefined);
}

/**
 * Returns all log events from the supplied paginator.
 *
 * @param pages - The paginated CloudWatch Logs responses.
 * @returns All log events from every page.
 */
async function collectLogEvents(
  pages: ReturnType<typeof paginateFilterLogEvents>,
): Promise<FilteredLogEvent[]> {
  const events: FilteredLogEvent[] = [];

  for await (const page of pages) {
    events.push(...(page.events ?? []));
  }

  return events;
}

/**
 * Filters CloudWatch log events matching all the supplied strings.
 *
 * If no matching events are initially available, the operation polls using
 * exponential backoff until the maximum number of retries is reached.
 *
 * AWS API errors are propagated to the caller.
 *
 * @param client - The CloudWatch Logs client.
 * @param logGroupName - The name of the log group to search.
 * @param filters - Strings that must all appear in matching log events.
 * @param startTime - Optional epoch time in milliseconds from which to search.
 * @param maxRetries - Maximum retries after the initial attempt.
 * @returns Matching log events, or an empty array when retries are exhausted.
 */
export async function filterLogs(
  client: CloudWatchLogsClient,
  logGroupName: string,
  filters: string[],
  startTime?: number,
  maxRetries = 20,
): Promise<FilteredLogEvent[]> {
  const filterPattern = filters.map((filter) => `"${filter}"`).join(" ");

  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    const logStreamNames = await getLogStreams(client, logGroupName);

    if (logStreamNames.length > 0) {
      const pages = paginateFilterLogEvents(
        { client },
        {
          logGroupName,
          logStreamNames,
          filterPattern,
          ...(startTime !== undefined && { startTime }),
        },
      );

      const events = await collectLogEvents(pages);

      if (events.length > 0) {
        return events;
      }
    }

    if (attempt < maxRetries) {
      await pause(calculateBackoff({ attempt }));
    }
  }

  return [];
}
