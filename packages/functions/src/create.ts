import * as uuid from 'uuid';
import { Table } from 'sst/node/table';
import handler from '@todos/core/src/handler';
import dynamoDB from '@todos/core/src/dynamodb';

export const main = handler(async (event) => {
  let data = {
    content: '',
    attachment: '',
  }

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Todos.tableName,
    Item: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      todoId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  await dynamoDB.put(params);

  return JSON.stringify(params.Item);
});