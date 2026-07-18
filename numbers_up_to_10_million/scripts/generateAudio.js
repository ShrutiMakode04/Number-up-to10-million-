import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const ELEVENLABS_API_KEY = process.env.VITE_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice

if (!ELEVENLABS_API_KEY) {
  console.error("❌ Error: VITE_ELEVENLABS_API_KEY is not set in .env");
  process.exit(1);
}

const textsToGenerate = [
  // Intro
  { key: "Welcome to Numbers Up To Ten Million! Let's start the journey.",
    ttsText: "Welcome to Numbers Up To Ten Million! Let's start the journey." },
  
  // Wonder
  { key: "A stadium holds 68,000 fans. A country has 9,450,000 people. Which number is bigger — and by how much? Let's learn how to read, compare, and master numbers this big!",
    ttsText: "A stadium holds sixty-eight thousand fans. A country has nine million, four hundred fifty thousand people. Which number is bigger, and by how much? Let's learn how to read, compare, and master numbers this big!" },
  { key: "Get ready to explore massive numbers! Let's master reading, writing, and comparing millions!",
    ttsText: "Get ready to explore massive numbers! Let's master reading, writing, and comparing millions!" },
  
  // Story
  { key: "John visits a huge sports stadium. He says, 'This stadium seats 82,500 people. That's eighty-two thousand, five hundred!'",
    ttsText: "John visits a huge sports stadium. He says, 'This stadium seats eighty-two thousand, five hundred people. That's eighty-two thousand, five hundred!'" },
  { key: "Sarah looks at a map of her city. 'My city has 1,240,000 people — one million, two hundred forty thousand!'",
    ttsText: "Sarah looks at a map of her city. 'My city has one million, two hundred forty thousand people. One million, two hundred forty thousand!'" },
  { key: "Every digit has its own place value: ten millions, millions, hundred thousands, ten thousands, thousands, hundreds, tens, and ones.",
    ttsText: "Every digit has its own place value: ten millions, millions, hundred thousands, ten thousands, thousands, hundreds, tens, and ones. Place value shows what a digit is worth!" },
  { key: "Mike visits an international airport. 'This airport welcomes 9,700,000 travellers every year!'",
    ttsText: "Mike visits an international airport. 'This airport welcomes nine million, seven hundred thousand travellers every year!'" },
  { key: "Priya compares two places. '1,240,000 is less than 9,700,000 — nine million, seven hundred thousand is much bigger!'",
    ttsText: "Priya compares two places. 'One million, two hundred forty thousand is less than nine million, seven hundred thousand. Nine million, seven hundred thousand is much bigger!'" },
  
  // Simulate
  { key: "Ancient Symbol Decoder", ttsText: "Ancient Symbol Decoder" },
  { key: "Place Value Palace", ttsText: "Place Value Palace" },
  { key: "Number Line Navigator", ttsText: "Number Line Navigator" },
  { key: "Expand and Compare Lab", ttsText: "Expand and Compare Lab" },
  
  // Feedback
  { key: "Correct", ttsText: "Correct!" },
  { key: "Wrong", ttsText: "Not quite!" },
  
  // Play
  { key: "Let's play and test our knowledge!", ttsText: "Let's play and test our knowledge!" },
  
  // Reflect
  { key: "We did it! We explored huge numbers. We learned how to read, build, plot, and compare them. Millions and ten millions are used to measure the biggest things in our world. Great job mastering these massive numbers!",
    ttsText: "We did it! We explored huge numbers. We learned how to read, build, plot, and compare them. Millions and ten millions are used to measure the biggest things in our world. Great job mastering these massive numbers!" }
];

const outputDir = path.join(__dirname, '../public/assets/audio');
const audioMapPath = path.join(__dirname, '../src/utils/audioMap.js');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function fetchAudio(text, filename) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      text: text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.20,
        similarity_boost: 0.55,
        style: 0.50,
        use_speaker_boost: true
      }
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed with status code: ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(filename);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
}

async function run() {
  const audioMap = {};
  console.log(`Starting generation for ${textsToGenerate.length} audio files...`);

  for (let i = 0; i < textsToGenerate.length; i++) {
    const item = textsToGenerate[i];
    const safeName = `audio_${i}.mp3`;
    const filePath = path.join(outputDir, safeName);
    
    console.log(`[${i + 1}/${textsToGenerate.length}] Generating: "${item.ttsText.substring(0, 30)}..."`);
    
    try {
      await fetchAudio(item.ttsText, filePath);
      audioMap[item.key] = `/assets/audio/${safeName}`;
      // Sleep a bit to avoid rate limits
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.error(`Error generating audio for "${item.ttsText}":`, e.message);
    }
  }

  const mapContent = `// Auto-generated by generateAudio.js
export const audioMap = ${JSON.stringify(audioMap, null, 2)};
`;

  fs.writeFileSync(audioMapPath, mapContent);
  console.log("✅ All audio generated successfully! audioMap.js has been updated.");
}

run();
