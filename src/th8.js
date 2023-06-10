import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from "styled-components";
import { faMicrophone, faStop, faPlay } from '@fortawesome/free-solid-svg-icons';

// import WordHighlighterWithSpeech from './th8';
// <WordHighlighterWithSpeech words={words} />

const WordHighlighterWithSpeech = ({ words }) => {
  const [highlightedWord, setHighlightedWord] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [value, setValue] = useState('');
  const [spokenWords, setSpokenWords] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
    },
  });
  useEffect(() => {
    if (value) { setSpokenWords((prevWords) => prevWords + ' ' + value); }
  }, [value]);
  useEffect(() => {
    let timer;
    if (isHighlighting) {
      timer = setInterval(() => {
        setHighlightedWord((prevWord) => (prevWord + 1) % words.length);
      }, 1500);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isHighlighting, words]);

  const startHighlighting = () => {
    setIsDisabled(true);
    setIsHighlighting(true);
    speakWordsInOrder();
  };

  function speechComparison(ogstring, checkingstring){
    let ogcpy = [...ogstring];
    const regex = /[!"#$%&()*+,-./:;<=>?@[\]^_`{|}~]/g;
    let ogarr = ogcpy.map((string) => string.replace(regex, '').toLowerCase());
    let i = 0;
    let res = [];
    let charr = checkingstring.split(" ");
    for(; i<charr.length; i++) {
      if(ogarr.includes(charr[i])) {
        res.push(ogarr.indexOf(charr[i]));
        delete ogarr[ogarr.indexOf(charr[i])]
      }
    }
    return res;
  }

  const speakWordsInOrder = () => {
    const speechQueue = [];

    for (let i = 0; i < words.length; i++) {
      speechQueue.push(
        new Promise((resolve) => {
          setTimeout(() => {
            speakWord(words[i], resolve);
          }, i * 1500);
        })
      );
    }

    Promise.all(speechQueue).then(() => {
      setIsHighlighting(false);
      setHighlightedWord(0);
    });
  };

  const speakWord = (word, onEnd) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.onend = onEnd;
      speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis is not supported in this browser.');
      onEnd();
    }
  };
  
  const handleToggleListening = () => {
    if (listening) {
      stop();
    } else {
      listen();
    }
  };

const Button = styled.button`
  background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  margin: 5px;
  cursor: pointer;
  flex-shrink: 0;
  font-family: "Inter UI","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
  font-size: 16px;
  font-weight: 500;
  height: 4rem;
  padding: 0 1.6rem;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
  transition: all .5s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-36:hover {
  box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
  transition-duration: .1s;
}

@media (min-width: 768px) {
  .button-36 {
    padding: 0 2.6rem;
  }
}
`;

  return (
    <div style={{marginTop: "5%"}}>
      <center>
      <Button disabled={isDisabled} onClick={startHighlighting}><FontAwesomeIcon icon={faPlay} /> <br></br> Listen </Button>
      <Button onClick={handleToggleListening}>
        {listening ? ( <>
          <FontAwesomeIcon icon={faStop} /> <br></br> Speak </>
        ) : ( <>
          <FontAwesomeIcon icon={faMicrophone} /> <br></br> Speak </>
        )}
      </Button>
      <div style={{ maxWidth: "70%"}} >
        {words.map((word, index) => (
          <span
            key={index}
            style={{ backgroundColor: speechComparison(words,spokenWords).includes(index) ? 'deepskyblue' : index === highlightedWord ? 'deepskyblue' : 'transparent' }}
          >
            {word}{' '}
          </span>
        ))}
      </div>
      </center>
      </div>
  );
};

export default WordHighlighterWithSpeech;
