import { useEffect, useState } from "react"
import AccountCreation from "./Components/AccountCreation"

function App() {

  class Account {
    name: string;
    owedAmount: number[];

    constructor(name: string, owedAmount: number[]) {
      this.name = name;
      this.owedAmount = owedAmount;
    }
  }

  const [names, setNames] = useState<string[]>([]);

  const handleUpdateNames = (newNames: string[]) => {
    setNames([...newNames]);
  }

  useEffect(() => {
    console.log(names);
  }, [names]);

  return (
    <>
      <AccountCreation updateNames={handleUpdateNames}/>
    </>
  )
}

export default App
