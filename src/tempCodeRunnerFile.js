
import { useSpeechRecognition } from 'react-speech-kit';

const SpeechToTextComponent = ({ words }) => {
  const [transcript, setTranscript] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result);
    }
  });

  const startListening = () => {