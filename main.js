/**
 * Lambda function handler that retrieves user data and orders from DynamoDB.
 * @param {Object} event - The event object.
 * @param {Object} context - The context object.
 * @returns {Object} - The response object.
 */
exports.handler = async (event, context) => {
  try {
    // DynamoDBからユーザデータを取得するメソッド呼び出し
    const data = await getUserData();
    console.log(data);

    // ユーザデータが取得できなかった場合、エラーレスポンスを返す
    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    // 取得したユーザの注文履歴を取得するメソッド呼び出し
    const orders = await getOrders(data.Item.id);
    console.log(orders);

    // ユーザデータと注文履歴を結合してレスポンスを返す
    return {
      statusCode: 200,
      body: JSON.stringify({
        user: data.Item,
        orders: orders.Items,
      }),
    };
  } catch (error) {
    // Handle any errors that occur during execution
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

/**
 * Retrieves user data from DynamoDB.
 * @returns {Promise<Object>} - The user data.
 */
async function getUserData() {
  // DynamoDBのクライアントを作成
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  // DynamoDBからユーザデータを取得
  const params = {
    TableName: "Users",
    Key: {
      id: "1",
    },
  };
  const data = await dynamoDB.get(params).promise();

  return data;
}

/**
 * Retrieves user orders from DynamoDB.
 * @param {string} userId - The user ID.
 * @returns {Promise<Object>} - The user orders.
 */
async function getOrders(userId) {
  // DynamoDBのクライアントを作成
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  // DynamoDBからユーザの注文履歴を取得
  const params = {
    TableName: "Orders",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
  };
  const data = await dynamoDB.query(params).promise();

  return data;
}
