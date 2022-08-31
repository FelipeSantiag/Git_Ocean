import "./Jogo.css"
import nuvens from "../../assets/clouds.png";
import cano from "../../assets/pipe.png";
import mario from "../../assets/mario.gif";
import gameOver from "../../assets/game-over.png";
import React, { useEffect, useRef, useState } from "react";


function Jogo() {
    //console.log("|Componente de jogo renderizado");
    //const estaPulando = useState(false);
    // Criamos o estado `estaPulando`, com o valor padrão `false`.
  // Primeiro valor é apenas para ler
  // Segundo valor é para atualizar o estado
  //
    const [estaPulando, setEstaPulando] = useState(false);

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
    //Por padrão esse element tem 
    let marioClassName = "mario";

    if(estaPulando){
        marioClassName = "mario mario-pulo";
    }

    console.log(20, { estaPulando })

    
    return (
        <div className="jogo">
            <img className ="nuvens" src={nuvens} alt="Nuvens"/>

            <img ref={canoRef} className="cano" src={cano} alt="Cano" />
            <img ref={marioRef} className={marioClassName} src={mario} alt="Mário" />

            <div className="chao"></div>
        </div>
    );
}

export default Jogo;