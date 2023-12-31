import { Table } from 'sst/node/table';
import handler from '@todos/core/src/handler';
import dynamoDB from '@todos/core/src/dynamodb';

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Todos.tableName,
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      todoId: event?.pathParameters?.id,
    },
  };

  await dynamoDB.delete(params);

  return JSON.stringify({ status: true });
});