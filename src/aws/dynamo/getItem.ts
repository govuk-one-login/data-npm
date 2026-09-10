import { GetCommand } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Gets a single item from a DynamoDB table by key.
 *
 * @param client - The DynamoDB document client.
 * @param tableName - The name of the table.
 * @param key - The primary key of the item to retrieve.
 * @returns The item cast to T, or undefined if not found.
 */
export async function getItem<T>(
  client: DynamoDBDocumentClient,
  tableName: string,
  key: Record<string, unknown>,
): Promise<T | undefined> {
  const res = await client.send(new GetCommand({ TableName: tableName, Key: key }));
  return res.Item as T | undefined;
}
