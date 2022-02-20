import { spannerDB } from "./spanner";

const runTransaction = async () => {
  const { database } = spannerDB()

  await database.runTransactionAsync(async (tx) => {

    if (tx == null) {
      throw new Error('tx is null');
    }

    const [rowCount] = await tx.runUpdate({
      sql: `INSERT Singers (SingerId, FirstName, LastName) VALUES
      (12, 'Melissa', 'Garcia'),
      (13, 'Russell', 'Morales'),
      (14, 'Jacqueline', 'Long'),
      (15, 'Dylan', 'Shaw')`,
    })
    console.log(`${rowCount} records inserted.`)
    await tx.commit();

  })
  await database.close()
}

runTransaction().catch(console.error)
