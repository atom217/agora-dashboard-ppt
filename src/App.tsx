import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FastboardComponent } from './Fastboard';

const SDK_TOKEN = process.env.SDK_TOKEN ?? '';
const REGION = 'in-mum';

const createRoomOption = {
  method: 'POST',
  headers: {
    token: SDK_TOKEN,
    'Content-Type': 'application/json',
    region: REGION,
  },
  body: JSON.stringify({
    isRecord: false,
  }),
};

const tokenOption = {
  method: 'POST',
  headers: {
    token: SDK_TOKEN,
    'Content-Type': 'application/json',
    region: REGION,
  },
  body: JSON.stringify({ lifespan: 3600000, role: 'admin' }),
};

function App() {
  const [userId] = React.useState(parseInt(`${Math.random() * 1e6}`) + '');
  const [roomId, setRoomId] = React.useState<string | undefined>(undefined);
  const [roomToken, setRoomToken] = React.useState<string | undefined>(undefined);

  async function createRoom() {
    try {
      const res = await fetch(`https://api.netless.link/v5/rooms`, createRoomOption);
      const data = await res.json();
      console.log('response of the room create',data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function createToken(uuid: string) {
    try {
      const res = await fetch(`https://api.netless.link/v5/tokens/rooms/${uuid}`, tokenOption);
      const data = await res.json();
      console.log('response of the token',data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    createRoom()
      .then((response) => {
        console.log('@@@@ response create room >', response);
        setRoomId(response.uuid);
        return createToken(response.uuid);
      })
      .then((res) => {
        console.log('@@@@ token >>>', res);
        setRoomToken(res);
      });
  }, []);

  if (typeof roomId === 'undefined' || typeof roomToken === 'undefined') {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    );
  }

  return (
    <div className="App">
      <FastboardComponent roomId={roomId} userId={userId} roomToken={roomToken} />
    </div>
  );
}

export default App;
