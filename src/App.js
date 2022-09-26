import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {

  const [users, setUsers] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)
  const [searchValue, setSearchValue] = React.useState('')
  const [invites, setInvites] = React.useState([])
  const [success, setSuccess] = React.useState(false)

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter(_id => _id !== id))
    } else {
      setInvites((prev) => [...prev, id])
    }
  }
  const onClickSendInvaites = ()=> {
    setSuccess(true)
  }

  React.useEffect(() => {
    fetch('https://reqres.in/api/users').then(res => res.json()).then(json => {
      setUsers(json.data)
    })
      .catch((err) => {
        console.warn(err)
        alert('error user loading')
      }).finally(() => setLoading(false))
  }, [])

  return (
    <div className="App">
      {
        success ? <Success count = {invites.length} /> :
          <Users items={users}
            isLoading={isLoading}
            onChangeSearchValue={onChangeSearchValue}
            searchValue={searchValue}
            invites={invites}
            onClickInvite={onClickInvite}
            onClickSendInvaites={onClickSendInvaites}
          />
      }


      
    </div>
  );
}

export default App;
