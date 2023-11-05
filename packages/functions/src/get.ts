
import { Table } from 'sst/node/table';
import handler from '@todos/core/src/handler';
import dynamoDB from '@todos/core/src/dynamodb';

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Todos.tableName,
    Key: {
      userId: 'random-uuid',
      todoId: event?.pathParameters?.id,
    },
  };

  const result = await dynamoDB.get(params);
  if (!result) {
    throw new Error('Item not found.');
  }
  
  return JSON.stringify(result.Item);
})