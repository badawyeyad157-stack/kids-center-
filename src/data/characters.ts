import { CharacterItem, StageEnvironment } from '../types';

const RAW_CHARACTERS: (CharacterItem & { robloxConfig?: any })[] = [
  // 1. Starter Football Star (Free)
  {
    id: 'rookie-champ',
    name: 'Young Prodigy',
    title: 'Starter Math Ace #01',
    category: 'football',
    tier: 'Starter',
    price: 0,
    primaryColor: '#2563eb', // Royal Blue
    secondaryColor: '#1e293b',
    accentColor: '#f59e0b',
    skinColor: '#ffd599',
    hairColor: '#334155',
    jerseyNumber: '01',
    description: 'The rising football prodigy! Armed with lightning mental math reflexes and unmatched agility.',
    unlockedByDefault: true,
    stats: { speed: 70, power: 65, focus: 80 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'cap',
      skinTone: '#ffd599',
      club: 'Blox Academy'
    }
  },

  // 2. VIP BALLON D'OR KING: Harry Kane (Bayern Munich & England #9) - 20,000 TOKENS
  {
    id: 'kane-9',
    name: 'Harry Kane',
    title: 'Ballon d\'Or King • Bayern Munich #9',
    category: 'football',
    tier: 'Mythic',
    price: 20000,
    primaryColor: '#dc2626', // Bayern Munich Crimson Red
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24', // Ballon d'Or Pure Gold
    skinColor: '#ffd599',
    hairColor: '#b45309', // Dark Blonde Quiff
    jerseyNumber: '9',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'time-freeze',
      name: 'Chrono Freeze ⏸️',
      badge: '10s Time Freeze',
      description: 'Freezes the quiz countdown timer for 10 seconds to solve complex questions calmly!',
      durationSeconds: 10,
      chargesPerQuiz: 1
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#f59e0b',
    description: 'The Golden Boot King of Bavaria! Proudly holds the golden Ballon d\'Or trophy in hand. Worth 20,000 Coins!',
    stats: { speed: 96, power: 99, focus: 99 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'swept',
      skinTone: '#ffd599',
      hasBeard: true,
      club: 'Bayern Munich / England'
    }
  },

  // 3. Football: Lionel Messi (Inter Miami & Argentina GOAT) - 100,000 Coins (Ultimate Most Expensive Ballon d'Or Legend)
  {
    id: 'messi-10',
    name: 'Lionel Messi',
    title: '8x Ballon d\'Or Supreme GOAT #10',
    category: 'football',
    tier: 'Mythic',
    price: 100000,
    primaryColor: '#f472b6', // Inter Miami Pink
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    skinColor: '#ffd599',
    hairColor: '#451a03',
    jerseyNumber: '10',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'double-coins',
      name: '2X Golden Touch 🪙✨',
      badge: '2X Coins Multiplier',
      description: 'DOUBLES all coins won across every question, streak bonus, and exam session permanently!'
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#fbbf24',
    description: '8 Ballon d’Ors! Realistic textured beard, precise swept fringe. Permanently doubles all earned coins by 2x!',
    stats: { speed: 99, power: 97, focus: 100 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'messi-fringe',
      skinTone: '#ffd599',
      hasBeard: true,
      club: 'Inter Miami / Argentina'
    }
  },

  // 4. Football: Cristiano Ronaldo (CR7 5x Ballon d'Or Machine) - 105,000 Coins (Supreme Peak Legend)
  {
    id: 'ronaldo-7',
    name: 'Cristiano Ronaldo',
    title: '5x Ballon d\'Or SIUUU Machine #7',
    category: 'football',
    tier: 'Mythic',
    price: 105000,
    primaryColor: '#eab308', // Al Nassr Gold
    secondaryColor: '#1e3a8a',
    accentColor: '#ffffff',
    skinColor: '#e0a96d',
    hairColor: '#0f172a',
    jerseyNumber: '7',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'shield-mercy',
      name: 'CR7 Iron Double Shield 🛡️⚡',
      badge: '2 Errors Converted to Correct',
      description: 'Legendary Shield: Converts up to 2 wrong answers into 100% correct answers in the exam!',
      chargesPerQuiz: 2
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#eab308',
    description: 'Iconic gelled undercut fade, unmatched mental math power, and double shield of mercy against mistakes!',
    stats: { speed: 100, power: 100, focus: 98 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'cr7-undercut',
      skinTone: '#e0a96d',
      club: 'Al Nassr / Portugal'
    }
  },

  // 5. Football: Kylian Mbappé (Real Madrid #9)
  {
    id: 'mbappe-9',
    name: 'Kylian Mbappé',
    title: 'Supersonic Turbo #9',
    category: 'football',
    tier: 'Legendary',
    price: 6000,
    primaryColor: '#ffffff', // Real Madrid Pure White
    secondaryColor: '#1e1b4b',
    accentColor: '#f59e0b',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '9',
    hasSoccerBall: true,
    description: 'Fresh buzz fade with crisp hairline. Lightning speed that solves equations in milliseconds.',
    stats: { speed: 99, power: 92, focus: 91 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'fade',
      skinTone: '#8d5524',
      club: 'Real Madrid / France'
    }
  },

  // 6. Football: Jude Bellingham (Real Madrid #5)
  {
    id: 'bellingham-5',
    name: 'Jude Bellingham',
    title: 'Golden Midfield General #5',
    category: 'football',
    tier: 'Legendary',
    price: 5500,
    primaryColor: '#ffffff', // Real Madrid White
    secondaryColor: '#1e1b4b',
    accentColor: '#eab308',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '5',
    hasSoccerBall: true,
    description: 'High-top box fade haircut, tall athletic frame, and clutch problem-solving precision.',
    stats: { speed: 93, power: 94, focus: 95 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'high-top',
      skinTone: '#8d5524',
      club: 'Real Madrid / England'
    }
  },

  // 7. Football: Erling Haaland (Manchester City #9)
  {
    id: 'haaland-9',
    name: 'Erling Haaland',
    title: 'The Viking Cyborg #9',
    category: 'football',
    tier: 'Legendary',
    price: 5800,
    primaryColor: '#67e8f9', // Sky Blue Man City
    secondaryColor: '#ffffff',
    accentColor: '#0284c7',
    skinColor: '#fed7aa',
    hairColor: '#fef08a', // Long Viking Blonde Hair
    jerseyNumber: '9',
    hasSoccerBall: true,
    description: 'Viking ponytail locks in authentic blonde. Devastating calculation power!',
    stats: { speed: 96, power: 99, focus: 89 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'viking-long',
      skinTone: '#fed7aa',
      club: 'Manchester City / Norway'
    }
  },

  // 8. Football: Lamine Yamal (FC Barcelona #19)
  {
    id: 'yamal-19',
    name: 'Lamine Yamal',
    title: 'Golden Wonderkid #19',
    category: 'football',
    tier: 'Legendary',
    price: 5200,
    primaryColor: '#991b1b', // Blaugrana Garnet
    secondaryColor: '#1e3a8a', // Blaugrana Deep Blue
    accentColor: '#fbbf24',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '19',
    hasSoccerBall: true,
    description: 'Youth sensation! Dynamic fade with blonde tips. Slices through complex division equations.',
    stats: { speed: 95, power: 88, focus: 96 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'fade',
      skinTone: '#8d5524',
      club: 'FC Barcelona / Spain'
    }
  },

  // 9. Football: Mohamed Salah (Liverpool #11)
  {
    id: 'salah-11',
    name: 'Mohamed Salah',
    title: 'The Egyptian King #11',
    category: 'football',
    tier: 'Legendary',
    price: 5400,
    primaryColor: '#dc2626', // Liverpool Crimson
    secondaryColor: '#166534',
    accentColor: '#ffffff',
    skinColor: '#d4a373',
    hairColor: '#18181b',
    jerseyNumber: '11',
    hasSoccerBall: true,
    description: 'Crisp military buzzcut fade with defined beard. Blistering mental speed.',
    stats: { speed: 96, power: 91, focus: 95 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'buzz-bald',
      skinTone: '#d4a373',
      hasBeard: true,
      club: 'Liverpool / Egypt'
    }
  },

  // 10. Football: Cole Palmer (Chelsea #20)
  {
    id: 'palmer-20',
    name: 'Cole Palmer',
    title: 'Cold Palmer #20',
    category: 'football',
    tier: 'Epic',
    price: 4500,
    primaryColor: '#1d4ed8', // Chelsea Royal Blue
    secondaryColor: '#ffffff',
    accentColor: '#38bdf8',
    skinColor: '#fed7aa',
    hairColor: '#b45309',
    jerseyNumber: '20',
    hasSoccerBall: true,
    description: 'Cold as ice under pressure! Ice-in-the-veins arithmetic accuracy.',
    stats: { speed: 89, power: 92, focus: 98 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'Chelsea / England'
    }
  },

  // 11. Football: Phil Foden (Manchester City #47)
  {
    id: 'foden-47',
    name: 'Phil Foden',
    title: 'Stockport Iniesta #47',
    category: 'football',
    tier: 'Epic',
    price: 4400,
    primaryColor: '#38bdf8', // Man City Sky Blue
    secondaryColor: '#ffffff',
    accentColor: '#1e3a8a',
    skinColor: '#fed7aa',
    hairColor: '#cbd5e1', // Platinum blonde crop
    jerseyNumber: '47',
    hasSoccerBall: true,
    description: 'Signature clean skin-fade crop. Incredible agility in mental math.',
    stats: { speed: 92, power: 90, focus: 94 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'fade',
      skinTone: '#fed7aa',
      club: 'Manchester City / England'
    }
  },

  // 12. Football: Bukayo Saka (Arsenal #7)
  {
    id: 'saka-7',
    name: 'Bukayo Saka',
    title: 'Starboy #7',
    category: 'football',
    tier: 'Epic',
    price: 4300,
    primaryColor: '#dc2626', // Arsenal Scarlet
    secondaryColor: '#ffffff',
    accentColor: '#eab308',
    skinColor: '#5c3818',
    hairColor: '#09090b',
    jerseyNumber: '7',
    hasSoccerBall: true,
    description: 'Clean tapered afro with electric right-wing math acceleration.',
    stats: { speed: 94, power: 89, focus: 93 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'high-top',
      skinTone: '#5c3818',
      club: 'Arsenal / England'
    }
  },

  // 13. Football: Florian Wirtz (Bayer Leverkusen #10)
  {
    id: 'wirtz-10',
    name: 'Florian Wirtz',
    title: 'Bundesliga Maestro #10',
    category: 'football',
    tier: 'Epic',
    price: 4200,
    primaryColor: '#b91c1c', // Leverkusen Crimson
    secondaryColor: '#0f172a',
    accentColor: '#eab308',
    skinColor: '#fed7aa',
    hairColor: '#78350f',
    jerseyNumber: '10',
    hasSoccerBall: true,
    description: 'German playmaker who calculates 5 steps ahead of everyone else.',
    stats: { speed: 90, power: 88, focus: 97 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'Bayer Leverkusen / Germany'
    }
  },

  // 14. Football: Vinicius Junior (Real Madrid #7)
  {
    id: 'vinicius-7',
    name: 'Vinicius Junior',
    title: 'Samba Flash #7',
    category: 'football',
    tier: 'Legendary',
    price: 5800,
    primaryColor: '#ffffff',
    secondaryColor: '#1e1b4b',
    accentColor: '#eab308',
    skinColor: '#5c3818',
    hairColor: '#09090b',
    jerseyNumber: '7',
    hasSoccerBall: true,
    description: 'Electric burst of speed, dread taper fade, and unstoppable arithmetic rhythm.',
    stats: { speed: 99, power: 93, focus: 90 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'high-top',
      skinTone: '#5c3818',
      club: 'Real Madrid / Brazil'
    }
  },

  // 15. Football: Neymar Jr (Al Hilal #10)
  {
    id: 'neymar-10',
    name: 'Neymar Jr',
    title: 'The Joga Bonito King #10',
    category: 'football',
    tier: 'Legendary',
    price: 5600,
    primaryColor: '#1d4ed8', // Al Hilal Royal Blue
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    skinColor: '#c68642',
    hairColor: '#fef08a',
    jerseyNumber: '10',
    hasSoccerBall: true,
    description: 'The ultimate flair artist with frosted tips and trick calculation speed.',
    stats: { speed: 95, power: 90, focus: 94 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'fade',
      skinTone: '#c68642',
      hasBeard: true,
      club: 'Al Hilal / Brazil'
    }
  },

  // 16. Football: Kevin De Bruyne (Manchester City #17)
  {
    id: 'debruyne-17',
    name: 'Kevin De Bruyne',
    title: 'The Architect #17',
    category: 'football',
    tier: 'Legendary',
    price: 5400,
    primaryColor: '#67e8f9',
    secondaryColor: '#ffffff',
    accentColor: '#1e3a8a',
    skinColor: '#fed7aa',
    hairColor: '#ea580c', // Ginger undercut quiff
    jerseyNumber: '17',
    hasSoccerBall: true,
    description: 'GPS vision! Calculates passing angles and decimal operations in seconds.',
    stats: { speed: 88, power: 94, focus: 99 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'Manchester City / Belgium'
    }
  },

  // 17. Football: Rodri Hernandez (Manchester City #16) - Ballon d'Or 2024 Winner (24,000 Coins)
  {
    id: 'rodri-16',
    name: 'Rodri Hernandez',
    title: 'Ballon d\'Or 2024 Engine #16',
    category: 'football',
    tier: 'Legendary',
    price: 24000,
    primaryColor: '#38bdf8',
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    skinColor: '#e0a96d',
    hairColor: '#451a03',
    jerseyNumber: '16',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'hint-vision',
      name: 'Calculation Radar 📡',
      badge: 'Step Clue Assist',
      description: 'Activates tactical calculation radar assistance during challenging exam questions!',
      chargesPerQuiz: 3
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#38bdf8',
    description: '2024 Ballon d\'Or winner! Undefeated anchor who dominates complex multi-digit calculations.',
    stats: { speed: 89, power: 97, focus: 99 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#e0a96d',
      club: 'Manchester City / Spain'
    }
  },

  // 17B. Football Legend: Rivaldo (FC Barcelona & Brazil #10) - Ballon d'Or 1999 (28,000 Coins)
  {
    id: 'rivaldo-10',
    name: 'Rivaldo',
    title: 'Ballon d\'Or 1999 Wizard #10',
    category: 'legend',
    tier: 'Legendary',
    price: 28000,
    primaryColor: '#991b1b', // Blaugrana Garnet
    secondaryColor: '#1e3a8a', // Deep Blue
    accentColor: '#fbbf24',
    skinColor: '#8d5524',
    hairColor: '#18181b',
    jerseyNumber: '10',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'samba-fever',
      name: 'Curved Strike ⚡',
      badge: '1.4x Accuracy Multiplier',
      description: 'Magical bicycle kick precision: Grants 1.4x bonus coins on every problem solved!',
      multiplier: 1.4
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#fbbf24',
    description: '1999 Ballon d\'Or winner! Lethal left-foot arithmetic precision and curved geometry mastery.',
    stats: { speed: 91, power: 98, focus: 97 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'buzz-bald',
      skinTone: '#8d5524',
      club: 'FC Barcelona / Brazil'
    }
  },

  // 17C. Football Legend: Fabio Cannavaro (Real Madrid & Italy #5) - Ballon d'Or 2006 (32,000 Coins)
  {
    id: 'cannavaro-5',
    name: 'Fabio Cannavaro',
    title: 'Ballon d\'Or 2006 Iron Wall #5',
    category: 'legend',
    tier: 'Legendary',
    price: 32000,
    primaryColor: '#1d4ed8', // Azzurri Blue
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    skinColor: '#fed7aa',
    hairColor: '#1e293b',
    jerseyNumber: '5',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'shield-mercy',
      name: 'The Berlin Wall 🛡️',
      badge: '1 Error Converted to Correct',
      description: 'World Cup winning captain shield: Converts 1 wrong answer into a 100% correct answer!',
      chargesPerQuiz: 1
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#38bdf8',
    description: 'The legendary defender who won the Ballon d\'Or! Stops all calculation errors with iron determination.',
    stats: { speed: 92, power: 99, focus: 100 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'buzz-bald',
      skinTone: '#fed7aa',
      club: 'Italy / Real Madrid'
    }
  },

  // 18. Football: Luka Modrić (Real Madrid #10) - Ballon d'Or 2018 (44,000 Coins)
  {
    id: 'modric-10',
    name: 'Luka Modrić',
    title: 'Ballon d\'Or Eternal Maestro #10',
    category: 'football',
    tier: 'Legendary',
    price: 44000,
    primaryColor: '#ffffff',
    secondaryColor: '#1e1b4b',
    accentColor: '#fbbf24',
    skinColor: '#fed7aa',
    hairColor: '#d97706', // Blonde headband locks
    jerseyNumber: '10',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'time-freeze',
      name: 'Maestro Time Bend ⏳',
      badge: '+20s Time Extension',
      description: 'Bends the exam timeline to freeze the timer for 20 seconds!',
      durationSeconds: 20,
      chargesPerQuiz: 1
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#fbbf24',
    description: 'Ballon d\'Or maestro with headband and effortless trivela mental math precision.',
    stats: { speed: 90, power: 91, focus: 100 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'Real Madrid / Croatia'
    }
  },

  // 19. Football: Robert Lewandowski (FC Barcelona #9)
  {
    id: 'lewandowski-9',
    name: 'Robert Lewandowski',
    title: 'Goal Machine #9',
    category: 'football',
    tier: 'Epic',
    price: 4600,
    primaryColor: '#991b1b',
    secondaryColor: '#1e3a8a',
    accentColor: '#fbbf24',
    skinColor: '#ffd599',
    hairColor: '#1f2937',
    jerseyNumber: '9',
    hasSoccerBall: true,
    description: 'Surgical finishing and lethal precision in rapid multiplication.',
    stats: { speed: 88, power: 96, focus: 93 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#ffd599',
      club: 'FC Barcelona / Poland'
    }
  },

  // 20. Football: Jamal Musiala (Bayern Munich #42)
  {
    id: 'musiala-42',
    name: 'Jamal Musiala',
    title: 'Bambi Dribbler #42',
    category: 'football',
    tier: 'Epic',
    price: 4300,
    primaryColor: '#dc2626',
    secondaryColor: '#ffffff',
    accentColor: '#1e3a8a',
    skinColor: '#a16207',
    hairColor: '#18181b',
    jerseyNumber: '42',
    hasSoccerBall: true,
    description: 'Hypnotic close control and razor-sharp decimal arithmetic.',
    stats: { speed: 95, power: 87, focus: 95 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'fade',
      skinTone: '#a16207',
      club: 'Bayern Munich / Germany'
    }
  },

  // 21. Football: Achraf Hakimi (Paris Saint-Germain #2)
  {
    id: 'hakimi-2',
    name: 'Achraf Hakimi',
    title: 'Atlas Rocket #2',
    category: 'football',
    tier: 'Epic',
    price: 4100,
    primaryColor: '#1e3a8a',
    secondaryColor: '#dc2626',
    accentColor: '#ffffff',
    skinColor: '#c68642',
    hairColor: '#18181b',
    jerseyNumber: '2',
    hasSoccerBall: true,
    description: 'World-class Moroccan right back with blazing speed.',
    stats: { speed: 98, power: 89, focus: 90 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'fade',
      skinTone: '#c68642',
      hasBeard: true,
      club: 'PSG / Morocco'
    }
  },

  // 22. Football: Heung-min Son (Tottenham Hotspur #7)
  {
    id: 'son-7',
    name: 'Heung-min Son',
    title: 'Sonny Superstrike #7',
    category: 'football',
    tier: 'Epic',
    price: 4000,
    primaryColor: '#ffffff',
    secondaryColor: '#1e293b',
    accentColor: '#eab308',
    skinColor: '#ffd599',
    hairColor: '#09090b',
    jerseyNumber: '7',
    hasSoccerBall: true,
    description: 'Two-footed Korean sniper who nails both addition and division instantly.',
    stats: { speed: 94, power: 92, focus: 93 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#ffd599',
      club: 'Tottenham / Korea'
    }
  },

  // 23. Football: Rodrygo Goes (Real Madrid #11)
  {
    id: 'rodrygo-11',
    name: 'Rodrygo Goes',
    title: 'Mr. Champions League #11',
    category: 'football',
    tier: 'Epic',
    price: 3900,
    primaryColor: '#ffffff',
    secondaryColor: '#1e1b4b',
    accentColor: '#f59e0b',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '11',
    hasSoccerBall: true,
    description: 'Clutch overtime champion who never misses difficult problems.',
    stats: { speed: 94, power: 89, focus: 94 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'high-top',
      skinTone: '#8d5524',
      club: 'Real Madrid / Brazil'
    }
  },

  // 24. Football: Antoine Griezmann (Atletico Madrid #7)
  {
    id: 'griezmann-7',
    name: 'Antoine Griezmann',
    title: 'Le Petit Prince #7',
    category: 'football',
    tier: 'Epic',
    price: 3800,
    primaryColor: '#dc2626', // Atletico Red & White
    secondaryColor: '#1e3a8a',
    accentColor: '#fbbf24',
    skinColor: '#fed7aa',
    hairColor: '#ec4899', // Pink buzz hairstyle!
    jerseyNumber: '7',
    hasSoccerBall: true,
    description: 'Iconic pink dyed hair, incredible soccer IQ, and creative math solutions.',
    stats: { speed: 90, power: 88, focus: 96 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'Atletico Madrid / France'
    }
  },

  // 25. Football: Thibaut Courtois (Real Madrid #1)
  {
    id: 'courtois-1',
    name: 'Thibaut Courtois',
    title: 'The Wall of Madrid #1',
    category: 'football',
    tier: 'Epic',
    price: 3700,
    primaryColor: '#16a34a', // Goalkeeper Green
    secondaryColor: '#1e1b4b',
    accentColor: '#ffffff',
    skinColor: '#fed7aa',
    hairColor: '#1e293b',
    jerseyNumber: '1',
    hasSoccerBall: true,
    description: 'Giant goalkeeper frame that stops any arithmetic mistakes in their tracks.',
    stats: { speed: 85, power: 97, focus: 95 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'Real Madrid / Belgium'
    }
  },

  // 26. Football: Alisson Becker (Liverpool #1)
  {
    id: 'alisson-1',
    name: 'Alisson Becker',
    title: 'The Golden Glove #1',
    category: 'football',
    tier: 'Epic',
    price: 3600,
    primaryColor: '#18181b', // GK Jet Black
    secondaryColor: '#dc2626',
    accentColor: '#fbbf24',
    skinColor: '#fed7aa',
    hairColor: '#451a03',
    jerseyNumber: '1',
    hasSoccerBall: true,
    description: 'Full beard, calm presence, and clean saves on high-speed subtraction quizzes.',
    stats: { speed: 86, power: 96, focus: 94 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#fed7aa',
      hasBeard: true,
      club: 'Liverpool / Brazil'
    }
  },

  // 27. Football: Karim Benzema (Al Ittihad & France #9) - Ballon d'Or 2022 (36,000 Coins)
  {
    id: 'benzema-9',
    name: 'Karim Benzema',
    title: 'KB9 Ballon d\'Or Champion #9',
    category: 'football',
    tier: 'Legendary',
    price: 36000,
    primaryColor: '#eab308', // Al Ittihad Yellow & Black
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    skinColor: '#e0a96d',
    hairColor: '#18181b',
    jerseyNumber: '9',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'streak-surge',
      name: 'KB9 Fire Surge 🔥',
      badge: '+3 Streak Accelerator',
      description: 'Accelerates streak score by +3 on every correct answer for massive coin multipliers!',
      streakBonus: 3
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#eab308',
    description: 'Ballon d\'Or champion with bandage wrist and explosive streak calculation acceleration.',
    stats: { speed: 92, power: 97, focus: 98 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'fade',
      skinTone: '#e0a96d',
      hasBeard: true,
      club: 'Al Ittihad / France'
    }
  },

  // 27B. Football Legend: Pavel Nedvěd (Juventus & Czech #11) - Ballon d'Or 2003 (40,000 Coins)
  {
    id: 'nedved-11',
    name: 'Pavel Nedvěd',
    title: 'Czech Dynamo Ballon d\'Or 2003 #11',
    category: 'legend',
    tier: 'Mythic',
    price: 40000,
    primaryColor: '#000000', // Bianconeri Black & White
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    skinColor: '#fed7aa',
    hairColor: '#fef08a', // Flowing blonde hair
    jerseyNumber: '11',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'time-freeze',
      name: 'Czech Dynamo ⏳',
      badge: '+15s Time Extension',
      description: 'Relentless box-to-box engine: Freezes the exam clock for 15 seconds!',
      durationSeconds: 15,
      chargesPerQuiz: 1
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#eab308',
    description: '2003 Ballon d\'Or winner! Endless stamina and unstoppable long-range arithmetic problem solving.',
    stats: { speed: 95, power: 96, focus: 98 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'Juventus / Czech'
    }
  },

  // 27C. Football Legend: Kaká (AC Milan & Brazil #22) - Ballon d'Or 2007 (48,000 Coins)
  {
    id: 'kaka-22',
    name: 'Kaká',
    title: 'Holy Speed Ballon d\'Or 2007 #22',
    category: 'legend',
    tier: 'Mythic',
    price: 48000,
    primaryColor: '#dc2626', // Rossoneri Red & Black
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    skinColor: '#ffd599',
    hairColor: '#3b2f2f',
    jerseyNumber: '22',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'samba-fever',
      name: 'Holy Sprint ⚡',
      badge: '1.5x Coins Multiplier',
      description: 'Gliding pace through midfield: Multiplies all earned coins by 1.5x on every problem!',
      multiplier: 1.5
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#fbbf24',
    description: '2007 Ballon d\'Or winner! Pure acceleration, radiant focus, and 1.5x coin bonuses.',
    stats: { speed: 98, power: 95, focus: 99 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#ffd599',
      club: 'AC Milan / Brazil'
    }
  },

  // 28. Football Legend: Zinedine Zidane (France #10) - Ballon d'Or 1998 (54,000 Coins)
  {
    id: 'zidane-10',
    name: 'Zinedine Zidane',
    title: 'Zizou Ballon d\'Or Magician #10',
    category: 'legend',
    tier: 'Mythic',
    price: 54000,
    primaryColor: '#1d4ed8', // France Royal Blue
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    skinColor: '#ffd599',
    hairColor: '#e2e8f0', // Clean shaved bald look
    jerseyNumber: '10',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'shield-mercy',
      name: 'Zizou Roulette Shield 🛡️',
      badge: '1 Error Converted to Correct',
      description: 'Shield of Mercy: Automatically converts 1 wrong answer into a 100% correct answer in the exam!',
      chargesPerQuiz: 1
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#3b82f6',
    description: 'World Cup & Ballon d\'Or legend with the legendary 360 roulette mind and Shield of Mercy.',
    stats: { speed: 93, power: 97, focus: 100 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'buzz-bald',
      skinTone: '#ffd599',
      club: 'France Legend'
    }
  },

  // 29. Football Legend: Ronaldinho Gaúcho (Brazil #10) - Ballon d'Or 2005 (60,000 Coins)
  {
    id: 'ronaldinho-10',
    name: 'Ronaldinho Gaúcho',
    title: 'The Samba Ballon d\'Or King #10',
    category: 'legend',
    tier: 'Mythic',
    price: 60000,
    primaryColor: '#facc15', // Brazil Canary Yellow
    secondaryColor: '#16a34a',
    accentColor: '#1d4ed8',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '10',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'samba-fever',
      name: 'Samba Magic ⚽',
      badge: '1.6x Coins Multiplier',
      description: 'Grants +60% extra coins on every solved problem with Samba joy!',
      multiplier: 1.6
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#facc15',
    description: 'Iconic headband, Samba smile, and holding the golden Ballon d\'Or! Multiplies coins by 1.6x.',
    stats: { speed: 97, power: 94, focus: 99 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#8d5524',
      club: 'Brazil Legend'
    }
  },

  // 29B. Football Legend: Marco van Basten (AC Milan & Netherlands #9) - 3x Ballon d'Or (68,000 Coins)
  {
    id: 'vanbasten-9',
    name: 'Marco van Basten',
    title: '3x Ballon d\'Or Swan of Utrecht #9',
    category: 'legend',
    tier: 'Mythic',
    price: 68000,
    primaryColor: '#ea580c', // Oranje Orange
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    skinColor: '#fed7aa',
    hairColor: '#451a03',
    jerseyNumber: '9',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'streak-surge',
      name: 'Flying Volley 🏹',
      badge: '+4 Streak Multiplier',
      description: 'Lethal volley precision: Jumps your streak score by +4 on correct answers!',
      streakBonus: 4
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#ea580c',
    description: '3-time Ballon d\'Or winner! One of the greatest strikers in football history, with supreme calculation precision.',
    stats: { speed: 96, power: 99, focus: 99 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'AC Milan / Netherlands'
    }
  },

  // 29C. Football Legend: Ronaldo Nazário R9 (Inter Milan & Brazil #9) - 2x Ballon d'Or (76,000 Coins)
  {
    id: 'ronaldo-r9',
    name: 'Ronaldo Nazário (R9)',
    title: '2x Ballon d\'Or Il Fenomeno #9',
    category: 'legend',
    tier: 'Mythic',
    price: 76000,
    primaryColor: '#1d4ed8', // Nerazzurri Blue & Black
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    skinColor: '#c68642',
    hairColor: '#09090b',
    jerseyNumber: '9',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'samba-fever',
      name: 'Il Fenomeno ⚡',
      badge: '1.75x Coins Multiplier',
      description: 'Unstoppable step-overs and clinical genius: Boosts coin earnings by 1.75x on all problems!',
      multiplier: 1.75
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#eab308',
    description: '2x Ballon d\'Or winner and World Cup hero! The Phenomenon breaks through any mathematical defense.',
    stats: { speed: 100, power: 99, focus: 99 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'buzz-bald',
      skinTone: '#c68642',
      club: 'Inter Milan / Brazil'
    }
  },

  // 29D. Football Legend: Johan Cruyff (Ajax & Barcelona #14) - 3x Ballon d'Or (84,000 Coins)
  {
    id: 'cruyff-14',
    name: 'Johan Cruyff',
    title: '3x Ballon d\'Or Total Football #14',
    category: 'legend',
    tier: 'Mythic',
    price: 84000,
    primaryColor: '#ea580c', // Oranje Orange
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    skinColor: '#fed7aa',
    hairColor: '#451a03',
    jerseyNumber: '14',
    hasBallonDor: true,
    ballonDorPower: {
      type: 'shield-mercy',
      name: 'Total Football IQ 🧠',
      badge: '1 Error Shield + Radar Assist',
      description: 'Master tactician: Automatically saves 1 incorrect answer and guides you with tactical vision!',
      chargesPerQuiz: 1
    },
    hasSoccerBall: false,
    hasAura: true,
    auraColor: '#fbbf24',
    description: '3-time Ballon d\'Or master! The mind behind Total Football, turning complex math into effortless beauty.',
    stats: { speed: 97, power: 98, focus: 100 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'Ajax / Barcelona'
    }
  },

  // 30. Football Legend: Pelé (Brazil #10)
  {
    id: 'pele-10',
    name: 'Pelé',
    title: 'O Rei • The King #10',
    category: 'legend',
    tier: 'Mythic',
    price: 8000,
    primaryColor: '#facc15', // Brazil Gold
    secondaryColor: '#166534',
    accentColor: '#1d4ed8',
    skinColor: '#5c3818',
    hairColor: '#09090b',
    jerseyNumber: '10',
    hasSoccerBall: true,
    hasAura: true,
    auraColor: '#eab308',
    description: '3-time World Cup champion! The timeless King of football.',
    stats: { speed: 97, power: 97, focus: 99 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'fade',
      skinTone: '#5c3818',
      club: 'Brazil Legend'
    }
  },

  // 31. Football Legend: Diego Maradona (Argentina #10)
  {
    id: 'maradona-10',
    name: 'Diego Maradona',
    title: 'El Pibe de Oro #10',
    category: 'legend',
    tier: 'Mythic',
    price: 7900,
    primaryColor: '#38bdf8', // Argentina Albiceleste
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    skinColor: '#e0a96d',
    hairColor: '#09090b', // Curly black afro
    jerseyNumber: '10',
    hasSoccerBall: true,
    hasAura: true,
    auraColor: '#38bdf8',
    description: 'Hand of God and Goal of the Century! Unstoppable creative arithmetic.',
    stats: { speed: 95, power: 95, focus: 98 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'swept',
      skinTone: '#e0a96d',
      club: 'Argentina Legend'
    }
  },

  // 32. Football: Federico Valverde (Real Madrid #8)
  {
    id: 'valverde-15',
    name: 'Federico Valverde',
    title: 'El Halcón #8',
    category: 'football',
    tier: 'Epic',
    price: 4300,
    primaryColor: '#ffffff',
    secondaryColor: '#1e1b4b',
    accentColor: '#0284c7',
    skinColor: '#fed7aa',
    hairColor: '#cbd5e1',
    jerseyNumber: '8',
    hasSoccerBall: true,
    description: 'Falcon stamina that runs across the entire pitch solving mixed math sets.',
    stats: { speed: 96, power: 98, focus: 92 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'fade',
      skinTone: '#fed7aa',
      club: 'Real Madrid / Uruguay'
    }
  },

  // 33. Football: Pedri González (FC Barcelona #8)
  {
    id: 'pedri-8',
    name: 'Pedri González',
    title: 'Golden Boy #8',
    category: 'football',
    tier: 'Epic',
    price: 4200,
    primaryColor: '#991b1b',
    secondaryColor: '#1e3a8a',
    accentColor: '#fbbf24',
    skinColor: '#fed7aa',
    hairColor: '#451a03',
    jerseyNumber: '8',
    hasSoccerBall: true,
    description: 'Clean mid-fade, calm demeanor, and 360-degree vision for decimals.',
    stats: { speed: 90, power: 85, focus: 98 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'FC Barcelona / Spain'
    }
  },

  // 34. Football: Gavi (FC Barcelona #6)
  {
    id: 'gavi-6',
    name: 'Gavi',
    title: 'The Pitbull Warrior #6',
    category: 'football',
    tier: 'Epic',
    price: 4100,
    primaryColor: '#991b1b',
    secondaryColor: '#1e3a8a',
    accentColor: '#ffffff',
    skinColor: '#fed7aa',
    hairColor: '#451a03',
    jerseyNumber: '6',
    hasSoccerBall: true,
    description: 'Heart of a lion! Never backs down from heavy arithmetic division challenges.',
    stats: { speed: 93, power: 92, focus: 92 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'FC Barcelona / Spain'
    }
  },

  // 35. Football: Julian Alvarez (Atletico Madrid #19)
  {
    id: 'alvarez-19',
    name: 'Julián Álvarez',
    title: 'La Araña #19',
    category: 'football',
    tier: 'Epic',
    price: 4400,
    primaryColor: '#dc2626',
    secondaryColor: '#1e3a8a',
    accentColor: '#ffffff',
    skinColor: '#fed7aa',
    hairColor: '#1e293b',
    jerseyNumber: '19',
    hasSoccerBall: true,
    description: 'The Spider striker with relentless pressing and deadly calculation speed.',
    stats: { speed: 94, power: 92, focus: 93 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'Atletico Madrid / Argentina'
    }
  },

  // 36. Football: Victor Osimhen (Galatasaray #45)
  {
    id: 'osimhen-45',
    name: 'Victor Osimhen',
    title: 'Masked Striker #45',
    category: 'football',
    tier: 'Epic',
    price: 4300,
    primaryColor: '#b91c1c', // Galatasaray Red & Yellow
    secondaryColor: '#eab308',
    accentColor: '#ffffff',
    skinColor: '#5c3818',
    hairColor: '#fde047', // Blonde tipped hair
    jerseyNumber: '45',
    hasSoccerBall: true,
    description: 'Signature carbon-fiber face mask and soaring aerial calculation power.',
    stats: { speed: 97, power: 95, focus: 90 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'high-top',
      skinTone: '#5c3818',
      club: 'Galatasaray / Nigeria'
    }
  },

  // 37. Football: Emiliano "Dibu" Martínez (Argentina #23)
  {
    id: 'martinez-23',
    name: 'Dibu Martínez',
    title: 'Golden Glove Dibu #23',
    category: 'football',
    tier: 'Epic',
    price: 4200,
    primaryColor: '#16a34a',
    secondaryColor: '#38bdf8',
    accentColor: '#fbbf24',
    skinColor: '#fed7aa',
    hairColor: '#1e293b',
    jerseyNumber: '23',
    hasSoccerBall: true,
    description: 'World Cup hero with bold Argentina flag hair design and penalty shootout composure.',
    stats: { speed: 86, power: 97, focus: 96 },
    robloxConfig: {
      faceType: 'smirk',
      hairType: 'swept',
      skinTone: '#fed7aa',
      club: 'Aston Villa / Argentina'
    }
  },

  // 38. Football: Virgil van Dijk (Liverpool #4)
  {
    id: 'vandijk-4',
    name: 'Virgil van Dijk',
    title: 'The Fortress #4',
    category: 'football',
    tier: 'Epic',
    price: 4100,
    primaryColor: '#dc2626',
    secondaryColor: '#166534',
    accentColor: '#ffffff',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '4',
    hasSoccerBall: true,
    description: 'Imposing Dutch defender with neat topknot and calm, calculating logic.',
    stats: { speed: 90, power: 98, focus: 96 },
    robloxConfig: {
      faceType: 'serious',
      hairType: 'swept',
      skinTone: '#8d5524',
      hasBeard: true,
      club: 'Liverpool / Netherlands'
    }
  },

  // 39. Football: Alphonso Davies (Bayern Munich #19)
  {
    id: 'davies-19',
    name: 'Alphonso Davies',
    title: 'Roadrunner Rocket #19',
    category: 'football',
    tier: 'Epic',
    price: 3900,
    primaryColor: '#dc2626',
    secondaryColor: '#ffffff',
    accentColor: '#1e3a8a',
    skinColor: '#5c3818',
    hairColor: '#09090b',
    jerseyNumber: '19',
    hasSoccerBall: true,
    description: 'Insane Canadian sprint speed that races through any math obstacle.',
    stats: { speed: 99, power: 88, focus: 91 },
    robloxConfig: {
      faceType: 'smile',
      hairType: 'high-top',
      skinTone: '#5c3818',
      club: 'Bayern Munich / Canada'
    }
  },

  // 40. Football: William Saliba (Arsenal & France #2)
  {
    id: 'saliba-2',
    name: 'William Saliba',
    title: 'The Wall • Arsenal & France #2',
    category: 'football',
    tier: 'Epic',
    price: 3600,
    primaryColor: '#ef4444',
    secondaryColor: '#ffffff',
    accentColor: '#fbbf24',
    skinColor: '#8d5524',
    hairColor: '#09090b',
    jerseyNumber: '2',
    description: 'Impenetrable Premier League defensive rock with surgical timing and calculation accuracy.',
    stats: { speed: 91, power: 95, focus: 96 }
  },

  // 41. Football: Declan Rice (Arsenal & England #41)
  {
    id: 'rice-41',
    name: 'Declan Rice',
    title: 'Midfield Engine • Arsenal & England #41',
    category: 'football',
    tier: 'Epic',
    price: 3800,
    primaryColor: '#dc2626',
    secondaryColor: '#ffffff',
    accentColor: '#1e3a8a',
    skinColor: '#ffd599',
    hairColor: '#1e293b',
    jerseyNumber: '41',
    description: 'Tireless box-to-box powerhouse who controls the game tempo and problem solving rhythms.',
    stats: { speed: 89, power: 96, focus: 94 }
  },

  // 42. Football: Bruno Fernandes (Manchester United & Portugal #8)
  {
    id: 'bruno-8',
    name: 'Bruno Fernandes',
    title: 'The Playmaker • Man United #8',
    category: 'football',
    tier: 'Epic',
    price: 4200,
    primaryColor: '#b91c1c',
    secondaryColor: '#ffffff',
    accentColor: '#000000',
    skinColor: '#ffd599',
    hairColor: '#1c1917',
    jerseyNumber: '8',
    description: 'Chances creator extraordinaire with unmatched key passes and relentless drive.',
    stats: { speed: 88, power: 93, focus: 98 }
  },

  // 43. Football: Bernardo Silva (Manchester City & Portugal #20)
  {
    id: 'bernardo-20',
    name: 'Bernardo Silva',
    title: 'Magician of Lisbon • Man City #20',
    category: 'football',
    tier: 'Legendary',
    price: 5200,
    primaryColor: '#38bdf8',
    secondaryColor: '#ffffff',
    accentColor: '#0f172a',
    skinColor: '#ffd599',
    hairColor: '#451a03',
    jerseyNumber: '20',
    description: 'Velvet touch, unmatched press resistance, and mathematical tactical positioning.',
    stats: { speed: 90, power: 91, focus: 99 }
  },

  // 44. Football: Lautaro Martínez (Inter Milan & Argentina #10)
  {
    id: 'lautaro-10',
    name: 'Lautaro Martínez',
    title: 'El Toro • Inter Milan & Argentina #10',
    category: 'football',
    tier: 'Legendary',
    price: 5400,
    primaryColor: '#1d4ed8',
    secondaryColor: '#000000',
    accentColor: '#fbbf24',
    skinColor: '#ffd599',
    hairColor: '#0f172a',
    jerseyNumber: '10',
    description: 'Fierce Serie A champion striker with explosive finishing and Copa América heroics.',
    stats: { speed: 94, power: 97, focus: 93 }
  },

  // 45. Football: Alexis Mac Allister (Liverpool & Argentina #10)
  {
    id: 'macallister-10',
    name: 'Alexis Mac Allister',
    title: 'World Champion Maestro • Liverpool #10',
    category: 'football',
    tier: 'Epic',
    price: 3900,
    primaryColor: '#dc2626',
    secondaryColor: '#047857',
    accentColor: '#ffffff',
    skinColor: '#ffd599',
    hairColor: '#9a3412',
    jerseyNumber: '10',
    description: 'World Cup winner with elegant midfield control, sharp vision, and pinpoint precision.',
    stats: { speed: 87, power: 92, focus: 96 }
  },

  // 46. Football: Manuel Neuer (Bayern Munich & Germany #1)
  {
    id: 'neuer-1',
    name: 'Manuel Neuer',
    title: 'Sweeper Keeper Legend • Bayern #1',
    category: 'football',
    tier: 'Legendary',
    price: 6000,
    primaryColor: '#059669',
    secondaryColor: '#ffffff',
    accentColor: '#dc2626',
    skinColor: '#ffd599',
    hairColor: '#ca8a04',
    jerseyNumber: '1',
    description: 'The revolutionary sweeper-keeper. World Cup champion with lightning reaction times.',
    stats: { speed: 88, power: 98, focus: 100 }
  },

  // 47. Football: Rúben Dias (Manchester City & Portugal #3)
  {
    id: 'dias-3',
    name: 'Rúben Dias',
    title: 'Colossus of Defense • Man City #3',
    category: 'football',
    tier: 'Legendary',
    price: 5800,
    primaryColor: '#0284c7',
    secondaryColor: '#ffffff',
    accentColor: '#0f172a',
    skinColor: '#ffd599',
    hairColor: '#1e293b',
    jerseyNumber: '3',
    description: 'Treble-winning defensive titan whose leadership commands the entire backline.',
    stats: { speed: 89, power: 99, focus: 97 }
  },

  // 48. Football: Joško Gvardiol (Manchester City & Croatia #24)
  {
    id: 'gvardiol-24',
    name: 'Joško Gvardiol',
    title: 'The Masked Titan • Man City #24',
    category: 'football',
    tier: 'Epic',
    price: 4500,
    primaryColor: '#0ea5e9',
    secondaryColor: '#ffffff',
    accentColor: '#1e293b',
    skinColor: '#ffd599',
    hairColor: '#1e293b',
    jerseyNumber: '24',
    description: 'Modern ball-playing defender with thunderous long-range strikes and elite physicality.',
    stats: { speed: 92, power: 97, focus: 94 }
  },

  // 49. Football: Joshua Kimmich (Bayern Munich & Germany #6)
  {
    id: 'kimmich-6',
    name: 'Joshua Kimmich',
    title: 'Bavarian General • Bayern #6',
    category: 'football',
    tier: 'Legendary',
    price: 5600,
    primaryColor: '#dc2626',
    secondaryColor: '#ffffff',
    accentColor: '#0f172a',
    skinColor: '#ffd599',
    hairColor: '#ca8a04',
    jerseyNumber: '6',
    description: 'Tactical mastermind with tireless work-rate and laser-focused distribution.',
    stats: { speed: 88, power: 94, focus: 99 }
  },

  // 50. Football: Eduardo Camavinga (Real Madrid & France #12)
  {
    id: 'camavinga-12',
    name: 'Eduardo Camavinga',
    title: 'Dynamic Polyvalent Star • Real Madrid #12',
    category: 'football',
    tier: 'Epic',
    price: 4800,
    primaryColor: '#ffffff',
    secondaryColor: '#1e3a8a',
    accentColor: '#fbbf24',
    skinColor: '#5c3826',
    hairColor: '#09090b',
    jerseyNumber: '12',
    description: 'Champions League winner with graceful tackles, explosive turns, and infinite versatility.',
    stats: { speed: 94, power: 93, focus: 96 }
  }
];

export const getPlayerPhotoUrl = (char?: { id: string; photoUrl?: string } | null): string => {
  if (!char) return '/images/players/kane-9.jpg';
  return char.photoUrl || `/images/players/${char.id}.jpg`;
};

export const CHARACTERS: (CharacterItem & { robloxConfig?: any })[] = RAW_CHARACTERS.map((c) => ({
  ...c,
  photoUrl: c.photoUrl || `/images/players/${c.id}.jpg`
}));

export const STAGES: StageEnvironment[] = [
  {
    id: 'stadium',
    name: 'Roblox Champions Arena',
    description: 'Iconic lush green pitch with floodlights & goalposts.',
    groundColor: '#16a34a',
    ambientColor: '#dcfce7',
    lightColor: '#ffffff',
    fogColor: '#f0fdf4',
    price: 0
  }
];
