const fs = require('fs');
const path = require('path');

const PLAYER_WIKI_MAP = {
  'kane-9': 'Harry_Kane',
  'messi-10': 'Lionel_Messi',
  'ronaldo-7': 'Cristiano_Ronaldo',
  'mbappe-9': 'Kylian_Mbapp%C3%A9',
  'bellingham-5': 'Jude_Bellingham',
  'haaland-9': 'Erling_Haaland',
  'yamal-19': 'Lamine_Yamal',
  'salah-11': 'Mohamed_Salah',
  'palmer-20': 'Cole_Palmer',
  'foden-47': 'Phil_Foden',
  'saka-7': 'Bukayo_Saka',
  'wirtz-10': 'Florian_Wirtz',
  'vinicius-7': 'Vin%C3%ADcius_J%C3%BAnior',
  'neymar-10': 'Neymar',
  'debruyne-17': 'Kevin_De_Bruyne',
  'rodri-16': 'Rodri_(footballer)',
  'rivaldo-10': 'Rivaldo',
  'cannavaro-5': 'Fabio_Cannavaro',
  'modric-10': 'Luka_Modri%C3%A7',
  'lewandowski-9': 'Robert_Lewandowski',
  'musiala-42': 'Jamal_Musiala',
  'hakimi-2': 'Achraf_Hakimi',
  'son-7': 'Son_Heung-min',
  'rodrygo-11': 'Rodrygo',
  'griezmann-7': 'Antoine_Griezmann',
  'courtois-1': 'Thibaut_Courtois',
  'alisson-1': 'Alisson',
  'benzema-9': 'Karim_Benzema',
  'nedved-11': 'Pavel_Nedv%C3%Abd',
  'kaka-22': 'Kak%C3%A1',
  'zidane-10': 'Zinedine_Zidane',
  'ronaldinho-10': 'Ronaldinho',
  'vanbasten-9': 'Marco_van_Basten',
  'ronaldo-r9': 'Ronaldo_(Brazilian_footballer)',
  'cruyff-14': 'Johan_Cruyff',
  'pele-10': 'Pel%C3%A9',
  'maradona-10': 'Diego_Maradona',
  'valverde-15': 'Federico_Valverde',
  'pedri-8': 'Pedri',
  'gavi-6': 'Gavi_(footballer)',
  'alvarez-19': 'Juli%C3%A1n_%C3%81lvarez_(footballer)',
  'osimhen-45': 'Victor_Osimhen',
  'martinez-23': 'Emiliano_Mart%C3%ADnez',
  'vandijk-4': 'Virgil_van_Dijk',
  'davies-19': 'Alphonso_Davies',
  'spider-hero': 'Spider-Man',
  'iron-hero': 'Iron_Man',
  'bat-hero': 'Batman',
  'saiyan-goku': 'Goku',
  'ninja-naruto': 'Naruto_Uzumaki',
  'pirate-luffy': 'Monkey_D._Luffy',
  'speed-sonic': 'Sonic_the_Hedgehog',
  'deadpool-blox': 'Deadpool',
  'titan-eren': 'Eren_Yeager',
  'cyber-titan': 'Mecha',
  'pharaoh-king': 'Tutankhamun',
  'rookie-champ': 'Football_player'
};

const outputDir = path.join(__dirname, '../public/images/players');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadAll() {
  console.log(`Starting download for ${Object.keys(PLAYER_WIKI_MAP).length} characters...`);
  
  for (const [id, wikiTitle] of Object.entries(PLAYER_WIKI_MAP)) {
    const destPath = path.join(outputDir, `${id}.jpg`);
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      console.log(`[SKIP] Already exists: ${id}.jpg`);
      continue;
    }

    try {
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`;
      const res = await fetch(summaryUrl, {
        headers: { 'User-Agent': 'KidsMathQuizApp/1.0 (educational sports learning)' }
      });
      
      if (!res.ok) {
        console.warn(`[WARN] HTTP ${res.status} for ${wikiTitle}`);
        await sleep(150);
        continue;
      }

      const data = await res.json();
      const imageUrl = data.thumbnail?.source || data.originalimage?.source;

      if (!imageUrl) {
        console.warn(`[WARN] No thumbnail for ${wikiTitle}`);
        await sleep(150);
        continue;
      }

      const imgRes = await fetch(imageUrl, {
        headers: { 'User-Agent': 'KidsMathQuizApp/1.0 (educational sports learning)' }
      });

      if (!imgRes.ok) {
        console.warn(`[WARN] Image fetch failed ${imgRes.status} for ${imageUrl}`);
        await sleep(150);
        continue;
      }

      const buffer = Buffer.from(await imgRes.arrayBuffer());
      fs.writeFileSync(destPath, buffer);
      console.log(`[OK] Saved ${id}.jpg (${buffer.length} bytes)`);

      // Gentle pause to respect Wikimedia API guidelines
      await sleep(200);
    } catch (err) {
      console.error(`[ERROR] Failed for ${id}:`, err.message);
    }
  }

  console.log('Finished downloading player images.');
}

downloadAll();
