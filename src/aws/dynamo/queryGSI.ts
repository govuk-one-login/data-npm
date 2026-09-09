import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Queries a DynamoDB Global Secondary Index.
 *
 * @param client - The DynamoDB document client.
 * @param tableName - The name of the table.
 * @param indexName - The name of the GSI.
 * @param keyConditionExpression - The key condition expression string.
 * @param expressionAttributeValues - The values map for the key condition expression.
 * @returns An array of items cast to T.
 */
export async function queryGSI<T>(
  client: DynamoDBDocumentClient,
  tableName: string,
  indexName: string,
  keyConditionExpression: string,
  expressionAttributeValues: Record<string, unknown>,
): Promise<T[]> {
  const res = await client.send(
    new QueryCommand({
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    }),
  );
  return (res.Items ?? []) as T[];
}
