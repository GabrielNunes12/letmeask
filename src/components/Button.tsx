import { ButtonHTMLAttributes } from 'react'; 
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonText(props: ButtonProps) {
  return (
    <button className="button" {...props}/>
  )
}