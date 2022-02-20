import { spannerDB } from "./spanner";
import { TimeMeasure } from './time-measure';

const mutation = async () => {
  const { database } = spannerDB()

  const singersTable = database.table('Singers');
  const albumsTable = database.table('Albums');

  const measure = new TimeMeasure();

  await singersTable.insert([
    {SingerId: '1', FirstName: 'Marc', LastName: 'Richards'},
    {SingerId: '2', FirstName: 'Catalina', LastName: 'Smith'},
    {SingerId: '3', FirstName: 'Alice', LastName: 'Trentor'},
    {SingerId: '4', FirstName: 'Lea', LastName: 'Martin'},
    {SingerId: '5', FirstName: 'David', LastName: 'Lomond'},
  ])
  await albumsTable.insert([
    {SingerId: '1', AlbumId: '1', AlbumTitle: 'Total Junk'},
    {SingerId: '1', AlbumId: '2', AlbumTitle: 'Go, Go, Go'},
    {SingerId: '2', AlbumId: '1', AlbumTitle: 'Green'},
    {SingerId: '2', AlbumId: '2', AlbumTitle: 'Forever Hold your Peace'},
    {SingerId: '2', AlbumId: '3', AlbumTitle: 'Terrified'},
  ])
  measure.end()
  await database.close()
}

mutation().catch(console.error)
