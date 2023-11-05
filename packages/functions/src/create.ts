import AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { Table } from 'sst/node/table';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function main(event: APIGatewayProxyEvent) {
  let data, params;

  if (event.body) {
    // some validation needed unless this is handled elsewhere

    data = JSON.parse(event.body);
    params = {
      TableName: Table.Todos.tableName,
      Item: {
        userId: 'random-uuid',
        todoId: uuid.v1(),
        content: data.content,
        attachment: data.attachment,
        createdAt: Date.now(),
      },
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true }),
    };
  }

  try {
    // interesting to play around without promises - otherwise we're call the stack
    await dynamoDB.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    }
  } catch (error) {
    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: message })
    }
  }
}

// todoId: afb540d0-7be6-11ee-89fa-55b250416893