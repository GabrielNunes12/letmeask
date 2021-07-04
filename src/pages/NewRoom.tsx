import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { ButtonText } from '../components/Button';


export function NewRoom() {
  const { user } = useContext(AuthContext);
  console.log(user);
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
          <form>
            <input 
              type="text" 
              placeholder="Nome da sala"
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