import { useState } from "react"

type HeaderProps = {
  name: string,
  city: string,
  houseNumber: Number
}
export function Header(prop: HeaderProps) {
  const [number, setNumber] = useState(123);
  function changeNumberState() {
    setNumber(number + 2);
  }
  return(
    <>
      <h1> { prop.name } </h1>
      <h2> { prop.city } </h2>
      <h3> { prop.houseNumber } </h3>
      <button onClick={changeNumberState}> {number} </button>
    </>
  )
}