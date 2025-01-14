import { MongoClient, type Db } from 'mongodb';

class Client {
	static database: Db;
	static client: MongoClient;

	static async connect() {
		if (!Client.database) {
			try {
				Client.client = new MongoClient(process.env.MONGO_URL ?? '');
				const connect = await Client.client.connect();

				Client.database = connect.db(process.env.MONGO_DATABASE_NAME);
			} catch (error) {
				throw Error('Cannot connect to database.');
			}
		}

		return Client.database;
	}
}

export const getDatabase = async () => {
	return await Client.connect();
};

export const getDbClient = async () => {
	return Client.client;
};
