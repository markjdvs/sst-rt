import { Table } from 'sst/node/table';
import handler from '@todos/core/src/handler';
import dynamoDB from '@todos/core/src/dynamodb';

export const main = handler(async (event) => {
  const data = JSON.parse(event.body || '{}');

  const params = {
    TableName: Table.Todos.tableName,
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      todoId: event?.pathParameters?.id,
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  const result = await dynamoDB.update(params);

  return JSON.stringify({ status: true })
});