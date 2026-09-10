import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import type { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export interface UpdateItemParams {
  tableName: string;
  key: Record<string, unknown>;
  updateExpression: string;
  expressionAttributeNames: Record<string, string>;
  expressionAttributeValues: Record<string, unknown>;
}

/**
 * Updates an existing item in a DynamoDB table.
 *
 * @param client - The DynamoDB document client.
 * @param params - The update parameters including table name, key, and update expression.
 */
export async function updateItem(
  client: DynamoDBDocumentClient,
  params: UpdateItemParams,
): Promise<void> {
  await client.send(
    new UpdateCommand({
      TableName: params.tableName,
      Key: params.key,
      UpdateExpression: params.updateExpression,
      ExpressionAttributeNames: params.expressionAttributeNames,
      ExpressionAttributeValues: params.expressionAttributeValues,
    }),
  );
}
