import { Bucket, StackContext, Table } from 'sst/constructs';

export function StorageStack({ stack }: StackContext) {
  const bucket = new Bucket(stack, 'Uploads');
  
  const table = new Table(stack, 'Todos', {
    fields: {
      userId: 'string',
      todoId: 'string',  
    },
    primaryIndex: { partitionKey: 'userId', sortKey: 'todoId' },
  });

  return {
    bucket,
    table,
  };
}