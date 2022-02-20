import { spannerDB } from "./spanner";
import { TimeMeasure } from "./time-measure";

const query = async () => {
  const { database } = spannerDB()
  const albumsTable = database.table('Albums');

  const query = {
    columns: ['SingerId', 'AlbumId', 'AlbumTitle'],
    keySet: {
      all: true,
    },
  };

  const measure = new TimeMeasure()
  const [rows] = await albumsTable.read(query);
  measure.end()
  console.log(`Query: ${rows.length} found.`)
  rows.forEach(row => {
    const json = row.toJSON();
    console.log(
      `SingerId: ${json.SingerId}, AlbumId: ${json.AlbumId}, AlbumTitle: ${json.AlbumTitle}`
    );
  });
  await database.close()
}

query().catch(console.error)
