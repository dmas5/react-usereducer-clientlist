import { useReducer, useState } from "react";


const clientReducer = (clients,action) => {
  switch (action.type) {
    case 'addClient': {
      return [...clients, 
        {id: action.id, name: action.name, age: action.age}]
    }
    case 'deleteClient': {
      return clients.filter(c => c.id !== action.id)
    }
    case 'edit': {
      return clients.map(c => {
        if(c.id === action.client.id){
          return action.client
        } else {
          return c
        }
      })
    }
  }


}

function App() {

  const generateId = () => Math.floor((Math.random() * 100000) + 1);

  const [editedClientName,setEditedClientName] = useState('');
  const [editedClientAge,setEditedClientAge] = useState();
  const [editedClientId,setEditedClientId] = useState();

  const [clients, dispatch] = useReducer(
    clientReducer,
    []
  );

  const handleAddClient = (event) => {

    event.preventDefault();

    dispatch({
        type:'addClient',
        id:generateId(),
        name:event.target.clientName.value,
        age:event.target.clientAge.value
      });

    event.target.clientName.value = '';
    event.target.clientAge.value = '';

  };

  const handleDeleteClient = (id) => {

    dispatch({type:'deleteClient', id:id});

  };

  const handleEditClient = (id) => {

    const client = clients.find(c => c.id === id);
    setEditedClientName(client.name);
    setEditedClientAge(client.age);
    setEditedClientId(client.id);

  };

  const submitEditClient = (event) => {

    event.preventDefault();

    let editedClient = {id:editedClientId, name:editedClientName, age:editedClientAge};
    dispatch({type:'edit',client:editedClient});

  };

  return (

    <div>
      <p>Add new Client</p>
      <form onSubmit={handleAddClient}>
        <input name='clientName' />
        <input name='clientAge' />
        <button type='submit'>add</button>
      </form>

      <p>Edit Client</p>
      <form onSubmit={submitEditClient}>
        <input type='text' value={editedClientName} onChange={(e) => setEditedClientName(e.target.value)} />
        <input type='text' value={editedClientAge} onChange={(e) => setEditedClientAge(e.target.value)} />
        <button type='submit'>submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            clients.map((c,i) => {
              return <tr key={i}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.age}</td>
                <td>
                  <button onClick={() => handleDeleteClient(c.id)}>delete</button>
                </td>
                <td>
                  <button onClick={() => handleEditClient(c.id)}>edit</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>



    </div>
  )
}

export default App
