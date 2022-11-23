import { connect } from 'mongoose';

export default async function connectToDB() {
  await connect('mongodb://mongo:I9GWHhJZ4NH4vmq5zhXi@containers-us-west-70.railway.app:7299');
}