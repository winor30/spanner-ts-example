import { Spanner } from '@google-cloud/spanner';

const projectId = '****';
const instanceId = 'test-spanner';
export const databaseId = 'example-db2';

export const spannerDB = () => {
  const spanner = new Spanner({ projectId })
  const instance = spanner.instance(instanceId);
  const database = instance.database(databaseId);
  return { database, spanner, instance };
}

export const spannerInstance = () => {
  const spanner = new Spanner({ projectId })
  const instance = spanner.instance(instanceId);
  return { spanner, instance };
}
