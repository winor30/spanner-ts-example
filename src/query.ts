import { spannerDB } from "./spanner";
import { TimeMeasure } from "./time-measure";

const query = async () => {
  const { database } = spannerDB()

  const query = {
    sql: `SELECT SingerId, FirstName, LastName
    FROM Singers WHERE LastName = @lastName`,
    params: {
      lastName: 'Garcia',
    },
  };

  const measure = new TimeMeasure()
  const [rows] = await database.run(query);
  measure.end()
  console.log(`Query: ${rows.length} found.`)
  rows.forEach(row => {
    const json = row.toJSON();
    console.log(
      `SingerId: ${json.SingerId}, FirstName: ${json.FirstName}, LastName: ${json.LastName}`
    );
  });
  await database.close()
}

query().catch(console.error)
