import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { ButtonText } from '../components/Button';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';
import '../styles/auth.scss';


export function Home() {
  const history = useHistory();

  const { user, signInWithGoogle } = useContext(AuthContext); 

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle();
    }
    history.push('/newRoom');
  }

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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="Logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
            />
            <ButtonText type="submit"> 
              Entrar na sala 
            </ButtonText>
          </form>
        </div>
      </main>
    </div>
  )
}