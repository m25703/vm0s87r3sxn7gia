import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

// import WordHighlighterWithSpeech from './th8';
// <WordHighlighterWithSpeech words={words} />

const WordHighlighterWithSpeech = ({ words }) => {
  const [highlightedWord, setHighlightedWord] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
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
    setIsHighlighting(true);
    speakWordsInOrder();
  };

  // const stopHighlighting = () => {
  //   setIsHighlighting(false);
  //   setHighlightedWord(0);
  //   stopSpeech();
  // };

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

  // const stopSpeech = () => {
  //   if ('speechSynthesis' in window) {
  //     speechSynthesis.cancel();
  //   }
  // };

  return (
    <div>
      <center>
      <button onClick={startHighlighting}>Listen</button>
      <button onClick={handleToggleListening}>
        {listening ? (
          <FontAwesomeIcon icon={faStop} />
        ) : (
          <FontAwesomeIcon icon={faMicrophone} />
        )}
      </button>
      <div>
        {words.map((word, index) => (
          <span
            key={index}
            style={{ backgroundColor: speechComparison(words,spokenWords).includes(index) ? 'blue' : index === highlightedWord ? 'yellow' : 'transparent' }}
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
