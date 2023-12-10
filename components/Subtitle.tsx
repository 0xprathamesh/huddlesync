// components/Subtitle.tsx
import { useEffect, useState } from 'react';
import { useLocalAudio } from '@huddle01/react/hooks';
import { useAccount } from 'wagmi';

const Subtitle: React.FC = () => {
  const { stream } = useLocalAudio();
  const { address } = useAccount();
  const [subtitles, setSubtitles] = useState<string>('');

  useEffect(() => {
    const sendAudioToOpenAI = async () => {
      if (stream && address) {
        try {
          const audioData = await getAudioData(stream.getAudioTracks()[0]);
          const response = await fetch('https://api.openai.com/v1/whisper/recognize', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/octet-stream', // Set appropriate content type
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            body: audioData,
          });

          const result = await response.json();
          setSubtitles(result.transcriptions);
        } catch (error) {
          console.error('Error sending audio to OpenAI Whisper:', error);
        }
      }
    };

    const getAudioData = async (track: MediaStreamTrack): Promise<Blob> => {
      return new Promise((resolve) => {
        const mediaRecorder = new MediaRecorder(new MediaStream([track]));
        const chunks: Blob[] = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          resolve(new Blob(chunks, { type: 'audio/wav' }));
        };

        mediaRecorder.start();
        setTimeout(() => mediaRecorder.stop(), 2000); // Adjust the duration as needed
      });
    };

    sendAudioToOpenAI();
  }, [stream, address]);

  return (
    <div>
      <p>Subtitles:</p>
      <div>{subtitles}</div>
    </div>
  );
};

export default Subtitle;
