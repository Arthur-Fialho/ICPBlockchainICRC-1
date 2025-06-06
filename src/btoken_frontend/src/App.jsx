import React from "react";
import TokenCard from "./components/TokenCard";
import { useState, useEffect } from 'react';
import { btoken_backend } from 'declarations/btoken_backend';

function App() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [fee, setFee] = useState(0);
  const [supply, setSupply] = useState(0);
  const [minter, setMinter] = useState('');

  useEffect(() => {
    const init = async () => {
        await getTokenInfo();
    }
    init();
  }, []);

  async function getTokenInfo() {
   
    try {
      let info = await btoken_backend.getTokenInfo();  
      if( info != null &&  info != undefined ){
        setName(info.name);
        setSymbol(info.symbol);
        setFee(parseInt(info.fee));
        setSupply(parseInt(info.totalSupply));
        setMinter(info.mintingPrincipal);      
      }
    } catch (error) {
      alert("Ocorreu uma falha ao obter informações!");  
    }
   
  }

  return (
    <main>
        <div className="card" >
            <TokenCard
                name={name}
                symbol={symbol}
                fee={fee}
                supply={supply}
                minter={minter}
            />
        </div>
    </main>
  );
}

export default App;