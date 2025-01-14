import { MongoClient, type Db } from 'mongodb';

class Client {
	private static database: Db | null;

	static async connect() {
		if (!Client.database) {
			try {
				const client = new MongoClient(process.env.MONGO_URL ?? '');
				const connect = await client.connect();

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
