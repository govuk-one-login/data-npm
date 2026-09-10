import { BatchGetCommand } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Batch gets multiple items from a DynamoDB table by their keys.
 *
 * @param client - The DynamoDB document client.
 * @param tableName - The name of the table.
 * @param keys - An array of primary key objects to retrieve.
 * @returns An array of items cast to T.
 */
export async function batchGetItems<T>(
  client: DynamoDBDocumentClient,
  tableName: string,
  keys: Record<string, unknown>[],
): Promise<T[]> {
  const res = await client.send(
    new BatchGetCommand({ RequestItems: { [tableName]: { Keys: keys } } }),
  );
  return (res.Responses?.[tableName] ?? []) as T[];
}
