import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Puts an item into a DynamoDB table, replacing any existing item with the same key.
 *
 * @param client - The DynamoDB document client.
 * @param tableName - The name of the table.
 * @param data - The item to write.
 */
export async function putItem(
  client: DynamoDBDocumentClient,
  tableName: string,
  data: Record<string, unknown>,
): Promise<void> {
  await client.send(new PutCommand({ TableName: tableName, Item: data }));
}
