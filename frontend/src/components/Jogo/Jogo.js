
import nuvens from "../../assets/clouds.png";
import cano from "../../assets/pipe.png";
import mario from "../../assets/mario.gif";
import gameOver from "../../assets/game-over.png";
import React, { useEffect, useRef, useState } from "react";


function Jogo(props) {
    //console.log("|Componente de jogo renderizado");
    //const estaPulando = useState(false);
    // Criamos o estado `estaPulando`, com o valor padrão `false`.
  // Primeiro valor é apenas para ler
  // Segundo valor é para atualizar o estado
  //
    const [estaPulando, setEstaPulando] = useState(false);
    const [estaMorto, setEstaMorto] = useState(false);
    const [pontos, setPontos] = useState(0);

    //Criamos as referencias para 'mario' e 'cano'
    const marioRef = useRef();
    const canoRef = useRef();

    function MarioEstaNoCano(){
        const mario = marioRef.current;
        const cano = canoRef.current;

        if(!mario || !cano){
            return;
        }
        return(
        cano.offsetLeft > mario.offsetLeft &&
        cano.offsetLeft < mario.offsetLeft + mario.offsetWidth &&
        mario.offsetTop + mario.offsetHeight > cano.offsetTop
        )
    };
  // Implementação temporária para exibir se o mário está no cano
  // ou não
  setInterval(function () {
    // Pegamos o valor que determinar se o Mario
    // está no cano ou não
    const estaNoCano = marioEstaNoCano();

        // Se o Mario não estiver no cano, encerramos a função com `return`
        if (!estaNoCano) {
            return;
          }
      
          // Caso esteja no cano, atualizamos o estado
          // `estaMorto` para `true`
          setEstaMorto(true);
          props.onMorrer();
        }, 100);
      
        /*
        Quando estiver morto:
        - Mudar a imagem do Mario
        - Pausar animações
        - Salvar a pontuação
        */
       // Salvar a pontuação
  //setInterval(function () {

     // UseEffect
  useEffect(
    function () {
      // Salvar a pontuação
      const interval = setInterval(function () {
        if (estaMorto) {
          return;
        }

    setPontos(pontos + 1);

    //console.log({ pontos });
  }, 500);
    return () => clearInterval(interval);
    },
    [estaMorto, pontos]
  );

  /*
  - Exibir pontos em tempo real (DESAFIO)
  - Quando der GameOver, exibir o HighScore
  */

    document.onkeydown = function () {
        //console.log("On key Down");
        setEstaPulando(true);
        //estaPulando=true;
        //700ms = 0.7s
        setTimeout(function() {
            //console.log("Executado após 700ms.");
            //Voltamos o estado para o estado inicial do mario
            setEstaPulando(false);
        }, 700)
    }
    //Por padrão esse element tem a classe `.mario`
    let marioClassName = "mario";
    // Caso esteja pulando (valor true), a classe será `.mario`
   // e `.mario-pulo`
    if(estaPulando){
        marioClassName = "mario mario-pulo";
    }
     
    // Outra forma de simplificar, usando ternário
  // const marioClassName = "mario " + (estaPulando ? "mario-pulo" : "");
  // No lugar de declarar uma variável e mudar o valor dela em um caso de `if`,
  // como fizemos com o className do Mario, podemos criar uma variável
  // com dois valores, um para caso a condição seja verdadeira, outro para
  // caso a condição seja false
  // Esse é o Operador Ternário!
  const marioImage = estaMorto ? gameOver : mario;

    
    return (
        <div className="jogo">
            <div> Pontos: {pontos}</div>

            <img className ="nuvens" src={nuvens} alt="Nuvens"/>

            <img
            ref={canoRef}
            className={"cano " + pararAnimacao}
            src={cano}
            alt="Cano"
      />
            <img
            ref={marioRef}
            className={marioClassName}
            src={marioImage}
            alt="Mário"
        />

            <div className="chao"></div>
        </div>
    );
}

export default Jogo;