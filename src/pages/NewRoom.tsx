import { Link } from 'react-router-dom';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { ButtonText } from '../components/Button';
import { database } from '../services/firebase';


export function NewRoom() {

  const [ newRoom, setNewRoom ] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if(newRoom.trim() === '') {
      return;
    }
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId:  user?.id,
    });

  }

  const { user } = useContext(AuthContext);
  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração Simbolizando perguntas e respostas"/>
        <strong>Crie salas Q&amp;A ao vivo </strong>
        <p>Tire as dúvidas de sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <br />
          <hr />
          <h1>Details account</h1>
          <h3>
            <br />
            {`Your name is: ${user?.name}`}
          </h3>
          <br />
          <h3>
            {`Your email: ${user?.email}`}
          </h3>
          <br />
          <h3>
            {`Your email is verified? : ${user?.emailVerified ? 'Verified' : 'Not verified'}`}
          </h3>
          <br />
          <hr />
          <h2>Criar uma nova sala</h2>
          <form onClick={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <ButtonText type="submit"> 
              Criar sala
            </ButtonText>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}