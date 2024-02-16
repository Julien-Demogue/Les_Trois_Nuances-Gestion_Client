import data from './clients.json';
import fs from 'fs'

export default function addClient(
  firstName:string, 
  lastName:string,
  birthDate:string,
  email:string,
  city:string,
  postalCode:string, 
  job:string, 
  registerDate:string
  ):void
{
  const clients = data as Client[];
  const newId = Math.max(...clients.map(client => client.id)) + 1;

  const newClient = {
    id: newId,
    firstName,
    lastName,
    birthDate,
    email,
    city,
    postalCode,
    job,
    registerDate,
  };

  clients.push(newClient);

  fs.writeFile('./clients.json', JSON.stringify(clients), (err) => {
    if (err) throw err;
    console.log('données bien ajoutées');
  });
}
