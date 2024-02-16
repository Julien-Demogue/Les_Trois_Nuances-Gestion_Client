import ipcRenderer from 'electron';

export default async function get(){
    const rows = await ipcRenderer.invoke('db-query', 'SELECT * FROM Users');
}


