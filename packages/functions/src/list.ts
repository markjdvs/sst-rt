import { Table } from 'sst/node/table';
import handler from '@todos/core/src/handler';
import dynamoDB from '@todos/core/src/dynamodb';

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Todos.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
    }
  };

  const result = await dynamoDB.query(params);

  return JSON.stringify(result.Items);
});