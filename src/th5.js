import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

const SpeechToText = ({words}) => {
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

  return (
    <div>
      <button onClick={listen} disabled={listening}>
        Start Listening
      </button>
      <button onClick={stop} disabled={!listening}>
        Stop Listening
      </button>
      <p>{//value
      }</p>
      {//spokenWords && <p>{spokenWords}</p>
      }
      <div>
        {words.map((word, index) => (
          <span
            key={index}
            style={{ backgroundColor: speechComparison(words,spokenWords).includes(index) ? 'blue' : 'transparent' }}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SpeechToText;
