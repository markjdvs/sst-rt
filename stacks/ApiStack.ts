import { Api, StackContext, use } from 'sst/constructs';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      'POST /todos':        'packages/functions/src/create.main',
      'GET /todos':         'packages/functions/src/list.main',
      'GET /todos/{id}':    'packages/functions/src/get.main',
      'PUT /todos/{id}':    'packages/functions/src/update.main',
      'DELETE /todos/{id}': 'packages/functions/src/delete.main,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  }
}