import Head from 'next/head'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {format} from 'date-fns'

export default function Home() {

  //useState para mudarmos o estado do elemento
      const periodTime = 60 * 25;
      const shortTime = 60 * 5;
      const longTime = 60 *10;

      const [customTime, setCustomTime] = useState(0)
      const [baseTime, setBaseTime] = useState(periodTime)


      const [timer, setTimer] = useState(baseTime);
      //formatação do tempo
      const [TimeLeft, setTimeLeft] = useState(format(timer * 1000, 'mm:ss'));
      //play e pause
      const [isActive, setIsActive] = useState(false);//adicionar isActive no useEffect

      const [storeTimeOut, setStoreTimeOut] = useState(null)
      useEffect(() => {
        if(timer +1 == 0){
        (function notifyMe() {
          // Verifica se o browser suporta notificações
          if (!("Notification" in window)) {
            alert("Este browser não suporta notificações de Desktop");
          }
        
          // Let's check whether notification permissions have already been granted
          else if (Notification.permission === "granted") {
            var notification = new Notification("TIMER IS OVER!");
          }
          else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
              if (permission === "granted") {
                var notification = new Notification("TIMER IS OVER!");
              }
            });
          }
        })()
      }
      },[timer])

      // useEffect para startar um time
      useEffect(() => {
            if(isActive && timer >= 0){
              setStoreTimeOut(setTimeout(()=>{
                    setTimer(timer - 1)
                    setTimeLeft(format(timer * 1000, 'mm:ss'))
              },1000))
            } else {
              clearTimeout(storeTimeOut)
            }
      }, [timer, isActive])

      useEffect(() => {
        resetTime()
      }, [baseTime])

      useEffect(() => {
        if(customTime > 0){
            let seconds = customTime * 60
            if (customTime == 60) --seconds
            setBaseTime(seconds)
          }
      }, [customTime])


      function resetTime() {
        setIsActive(false);
        setTimer(baseTime);
        setTimeLeft(format(baseTime * 1000, "mm:ss"));
        
      }

  return (
    <div className={styles.container}>
      <Head>
        <title>POMODORO: {TimeLeft}</title>
        <link rel="icon" href="/pomod.svg" />
      </Head>
      <header>
           <h1>POMODORO</h1>
      </header>
      <main>
            <p>SELECT TIME:</p>
            <button className="bt-time" onClick={() => setBaseTime(shortTime)}>5</button>
            <button className="bt-time" onClick={() => setBaseTime(longTime)}>10</button>
            <button className="bt-time" onClick={() => setBaseTime(periodTime)}>25</button>
            <input className="bt-time" type="number" min = "0" max = "60" 
                  onChange = {e => setCustomTime(e.target.value)} 
                  value={customTime}/>
            <hr/>
            <span>TIME: {TimeLeft}</span>
            <hr/>
            
            <button className="bt-comands" onClick = {() => {setIsActive(true)}}>START</button>
            <button className="bt-comands" onClick = {() => {setIsActive(false)}}>PAUSE</button>
            
            <button className="bt-comands" onClick = {() => {resetTime()}}>RESET</button>
          
        </main>



    </div>
  )
}
