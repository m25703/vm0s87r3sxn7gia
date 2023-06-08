// import React from 'react';
// import SpeechToTextComponent from './th9';

// const App = () => {
//   let story = "He stared out the window at the snowy field. He'd been stuck in the house for close to a month and his only view of the outside world was through the window. There wasn't much to see. It was mostly just the field with an occasional bird or small animal who ventured into the field. As he continued to stare out the window, he wondered how much longer he'd be shackled to the steel bar inside the house";
//   const words = story.split(" ");  
//   return (
//     <div>
//       <h1>Speech-to-Text App</h1>
//       <SpeechToTextComponent words={words}/>
//     </div>
//   );
// };

// export default App;



import React from 'react';
import WordHighlighterWithSpeech from './th8';

const App = () => {
  <h1> .. </h1>
  //let story = "He stared out the window at the snowy field. He'd been stuck in the house for close to a month and his only view of the outside world was through the window. There wasn't much to see. It was mostly just the field with an occasional bird or small animal who ventured into the field. As he continued to stare out the window, he wondered how much longer he'd be shackled to the steel bar inside the house";
  //let story = "All the world is a stage and all men and women merely players, They have their exits and their entrances and one man in his time plays many parts.";
  let story = "We stay in a big house. It has red walls. There are brown doors."
  const words = story.split(" ");

  return (
    <div>
      <WordHighlighterWithSpeech words={words} />
    </div>
  );
};

export default App;


// import React from 'react';
// import WordHighlighterWithSpeech from './th6';

// const App = () => {
//   let story = "He stared out the window at the snowy field. He'd been stuck in the house for close to a month and his only view of the outside world was through the window. There wasn't much to see. It was mostly just the field with an occasional bird or small animal who ventured into the field. As he continued to stare out the window, he wondered how much longer he'd be shackled to the steel bar inside the house";
//   const words = story.split(" ");

//   return (
//     <div>
//       <h1>Word Highlighter with Speech</h1>
//       <WordHighlighterWithSpeech words={words} />
//     </div>
//   );
// };

// export default App;


// import React from 'react';
// import SpeechToText from './th3';

// const App = () => {
//   let story = "He stared out the window at the snowy field. He'd been stuck in the house for close to a month and his only view of the outside world was through the window. There wasn't much to see. It was mostly just the field with an occasional bird or small animal who ventured into the field. As he continued to stare out the window, he wondered how much longer he'd be shackled to the steel bar inside the house";
//   const words = story.split(" ");
//   return (
//     <div>
//       <h1>Speech-to-Text Example</h1>
//       <SpeechToText words={words}/>
//     </div>
//   );
// };

// export default App;