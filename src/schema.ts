import { CreateDatabaseOptions } from '@google-cloud/spanner/build/src/instance';
import { databaseId, spannerDB, spannerInstance } from './spanner';

const createDB = async () => {
  const { instance } = spannerInstance()

  const request: CreateDatabaseOptions = {
    // @ts-ignore
    schema:
      [`CREATE TABLE Singers (
        SingerId    INT64 NOT NULL,
        FirstName   STRING(1024),
        LastName    STRING(1024),
        SingerInfo  BYTES(MAX)
      ) PRIMARY KEY (SingerId)`,
      `CREATE TABLE Albums (
        SingerId    INT64 NOT NULL,
        AlbumId     INT64 NOT NULL,
        AlbumTitle  STRING(MAX)
      ) PRIMARY KEY (SingerId, AlbumId),
      INTERLEAVE IN PARENT Singers ON DELETE CASCADE`],
  }

  const [, operation] = await instance.createDatabase(databaseId, request);
  await operation.promise();
}

const addColumn = async () => {
  const { database } = spannerDB()

  const request = ['ALTER TABLE Albums ADD COLUMN MarketingBudget INT64'];
  const [operation] = await database.updateSchema(request);
  await operation.promise();
  database.close();
}

const main = async () => {
  const cmd = process.argv[2];
  switch (cmd) {
    case 'createDB':
      await createDB();
      console.log('success create db')
      return;
    case 'addColumn':
      await addColumn();
      console.log('success add column')
      return;
    default:
      throw new Error(`unknown command. cmd: ${cmd}`);
  }
}

main().catch(console.error);
