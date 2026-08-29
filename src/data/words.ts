import { Category, Difficulty, WordItem } from '../types/game';

export const CATEGORIES: Category[] = [
  'Technology',
  'Programming',
  'Animals',
  'Countries',
  'Sports',
  'Movies',
  'Food',
  'Science',
  'General Knowledge',
];

export const DIFFICULTY_CONFIGS: Record<Difficulty, {
  label: string;
  lives: number;
  description: string;
  badgeColor: string;
  accentColor: string;
  multiplier: number;
  maxHints: number;
}> = {
  easy: {
    label: 'Easy',
    lives: 8,
    description: 'Common words with 8 lives & forgiving penalties',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    accentColor: '#10b981',
    multiplier: 1.0,
    maxHints: 3,
  },
  medium: {
    label: 'Medium',
    lives: 6,
    description: 'Standard words with 6 lives & balanced scoring',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    accentColor: '#0ea5e9',
    multiplier: 1.5,
    maxHints: 2,
  },
  hard: {
    label: 'Hard',
    lives: 5,
    description: 'Challenging vocabulary with 5 lives & high score multipliers',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    accentColor: '#f43f5e',
    multiplier: 2.0,
    maxHints: 1,
  },
};

export const WORD_BANK: WordItem[] = [
  // --- PROGRAMMING ---
  {
    id: 'prog-1',
    word: 'TYPESCRIPT',
    category: 'Programming',
    difficulty: 'easy',
    hint: 'A strongly typed superset of JavaScript developed by Microsoft.',
    funFact: 'TypeScript was created by Anders Hejlsberg, the lead architect of C#.'
  },
  {
    id: 'prog-2',
    word: 'PYTHON',
    category: 'Programming',
    difficulty: 'easy',
    hint: 'A popular language named after a British comedy troupe, not a snake.',
    funFact: 'Guido van Rossum named Python after Monty Python\'s Flying Circus.'
  },
  {
    id: 'prog-3',
    word: 'REACT',
    category: 'Programming',
    difficulty: 'easy',
    hint: 'A popular declarative JavaScript UI library made by Meta.',
    funFact: 'React was initially released in May 2013 and pioneered the Virtual DOM concept.'
  },
  {
    id: 'prog-4',
    word: 'ALGORITHM',
    category: 'Programming',
    difficulty: 'medium',
    hint: 'A step-by-step procedure or mathematical formula for solving a problem.',
    funFact: 'The word originates from the 9th-century Persian mathematician al-Khwarizmi.'
  },
  {
    id: 'prog-5',
    word: 'RECURSION',
    category: 'Programming',
    difficulty: 'medium',
    hint: 'A function that calls itself directly or indirectly until a base condition is met.',
    funFact: 'To understand recursion, one must first understand recursion.'
  },
  {
    id: 'prog-6',
    word: 'ASYNCHRONOUS',
    category: 'Programming',
    difficulty: 'hard',
    hint: 'Operations occurring independently of the main program flow without blocking.',
    funFact: 'JavaScript uses an event loop to handle non-blocking asynchronous I/O.'
  },
  {
    id: 'prog-7',
    word: 'POLYMORPHISM',
    category: 'Programming',
    difficulty: 'hard',
    hint: 'OOP principle where objects of different types can be accessed through the same interface.',
    funFact: 'From Greek words meaning "having multiple forms".'
  },
  {
    id: 'prog-8',
    word: 'COMPILER',
    category: 'Programming',
    difficulty: 'medium',
    hint: 'A tool that translates high-level source code into machine-executable instructions.',
    funFact: 'The first compiler was written by Grace Hopper in 1952 for the A-0 system.'
  },
  {
    id: 'prog-9',
    word: 'JAVASCRIPT',
    category: 'Programming',
    difficulty: 'easy',
    hint: 'The language that powers dynamic interactions in web browsers.',
    funFact: 'Brendan Eich designed JavaScript in just 10 days in May 1995.'
  },

  // --- TECHNOLOGY ---
  {
    id: 'tech-1',
    word: 'INTERNET',
    category: 'Technology',
    difficulty: 'easy',
    hint: 'The global system of interconnected computer networks using TCP/IP.',
    funFact: 'The first message sent over ARPANET was "LO" because the system crashed before typing "LOGIN".'
  },
  {
    id: 'tech-2',
    word: 'SMARTPHONE',
    category: 'Technology',
    difficulty: 'easy',
    hint: 'A handheld mobile device combining cellular communication and computing.',
    funFact: 'The IBM Simon in 1992 is considered the first commercial smartphone.'
  },
  {
    id: 'tech-3',
    word: 'CLOUD COMPUTING',
    category: 'Technology',
    difficulty: 'medium',
    hint: 'On-demand delivery of IT resources and data storage over the network.',
    funFact: 'AWS launched in 2006 with S3 and SQS, kickstarting the modern cloud era.'
  },
  {
    id: 'tech-4',
    word: 'MICROPROCESSOR',
    category: 'Technology',
    difficulty: 'hard',
    hint: 'An integrated circuit that contains all the functions of a central processing unit.',
    funFact: 'Intel 4004 (1971) was the world\'s first commercially available microprocessor.'
  },
  {
    id: 'tech-5',
    word: 'CYBERSECURITY',
    category: 'Technology',
    difficulty: 'medium',
    hint: 'The practice of protecting computers, servers, and networks from digital attacks.',
    funFact: 'The first computer virus was the Creeper virus detected on ARPANET in the early 1970s.'
  },
  {
    id: 'tech-6',
    word: 'BLOCKCHAIN',
    category: 'Technology',
    difficulty: 'medium',
    hint: 'A decentralized, distributed, and cryptographically secured ledger.',
    funFact: 'Satoshi Nakamoto introduced Bitcoin and modern blockchain in a 2008 whitepaper.'
  },
  {
    id: 'tech-7',
    word: 'SEMICONDUCTOR',
    category: 'Technology',
    difficulty: 'hard',
    hint: 'A material whose electrical conductivity falls between that of a conductor and an insulator.',
    funFact: 'Silicon is the second most abundant element in the Earth\'s crust by mass.'
  },
  {
    id: 'tech-8',
    word: 'ROBOTICS',
    category: 'Technology',
    difficulty: 'easy',
    hint: 'An interdisciplinary branch of engineering and computer science involving automated machines.',
    funFact: 'The word "robot" comes from the Czech word "robota", meaning forced labor.'
  },

  // --- ANIMALS ---
  {
    id: 'anim-1',
    word: 'ELEPHANT',
    category: 'Animals',
    difficulty: 'easy',
    hint: 'The largest living land mammal with large ears and a prehensile trunk.',
    funFact: 'Elephants can communicate using subsonic rumbles that travel through the ground.'
  },
  {
    id: 'anim-2',
    word: 'DOLPHIN',
    category: 'Animals',
    difficulty: 'easy',
    hint: 'Highly intelligent marine mammal known for echolocation and acrobatic leaps.',
    funFact: 'Dolphins sleep with only one hemisphere of their brain at a time.'
  },
  {
    id: 'anim-3',
    word: 'CHAMELEON',
    category: 'Animals',
    difficulty: 'medium',
    hint: 'A reptile capable of shifting skin pigmentation and moving eyes independently.',
    funFact: 'Chameleons change color mainly for temperature regulation and social signaling.'
  },
  {
    id: 'anim-4',
    word: 'PLATYPUS',
    category: 'Animals',
    difficulty: 'medium',
    hint: 'A semi-aquatic egg-laying mammal with a duck-like bill and beaver-like tail.',
    funFact: 'Male platypuses have a venomous spur on the heel of each hind foot.'
  },
  {
    id: 'anim-5',
    word: 'AXOLOTL',
    category: 'Animals',
    difficulty: 'hard',
    hint: 'A Mexican salamander renowned for its ability to regenerate lost limbs and organs.',
    funFact: 'Axolotls exhibit neoteny, reaching adulthood without undergoing metamorphosis.'
  },
  {
    id: 'anim-6',
    word: 'KANGAROO',
    category: 'Animals',
    difficulty: 'easy',
    hint: 'An Australian marsupial with powerful hind legs for bounding.',
    funFact: 'Red kangaroos can leap up to 25 feet (7.6 meters) in a single bound.'
  },
  {
    id: 'anim-7',
    word: 'OCTOPUS',
    category: 'Animals',
    difficulty: 'medium',
    hint: 'An eight-armed soft-bodied mollusk with three hearts and blue blood.',
    funFact: 'Two-thirds of an octopus\'s neurons reside in its arms rather than its head.'
  },
  {
    id: 'anim-8',
    word: 'HUMMINGBIRD',
    category: 'Animals',
    difficulty: 'hard',
    hint: 'A tiny avian capable of hovering in mid-air and flying backwards.',
    funFact: 'Their wings can flap up to 80 times per second with heart rates exceeding 1,200 bpm.'
  },

  // --- COUNTRIES ---
  {
    id: 'coun-1',
    word: 'CANADA',
    category: 'Countries',
    difficulty: 'easy',
    hint: 'A North American country known for maple syrup and the longest coastline in the world.',
    funFact: 'Canada contains more than half of the natural lakes on Earth.'
  },
  {
    id: 'coun-2',
    word: 'JAPAN',
    category: 'Countries',
    difficulty: 'easy',
    hint: 'An East Asian island nation famous for cherry blossoms, high-speed rail, and sushi.',
    funFact: 'Japan consists of over 6,800 islands, with four main islands.'
  },
  {
    id: 'coun-3',
    word: 'BRAZIL',
    category: 'Countries',
    difficulty: 'easy',
    hint: 'The largest country in South America, home to the Amazon Rainforest.',
    funFact: 'Brazil is the only Portuguese-speaking nation in the Americas.'
  },
  {
    id: 'coun-4',
    word: 'SWITZERLAND',
    category: 'Countries',
    difficulty: 'medium',
    hint: 'A mountainous Central European nation famed for neutrality, banking, and watches.',
    funFact: 'Switzerland has four official languages: German, French, Italian, and Romansh.'
  },
  {
    id: 'coun-5',
    word: 'MADAGASCAR',
    category: 'Countries',
    difficulty: 'medium',
    hint: 'An island nation off the southeast coast of Africa famous for unique biodiversity.',
    funFact: 'Over 90% of all animal and plant species found in Madagascar are endemic.'
  },
  {
    id: 'coun-6',
    word: 'LIECHTENSTEIN',
    category: 'Countries',
    difficulty: 'hard',
    hint: 'A doubly landlocked Alpine microstate nestled between Switzerland and Austria.',
    funFact: 'Liechtenstein is one of only two doubly landlocked countries in the world (the other is Uzbekistan).'
  },
  {
    id: 'coun-7',
    word: 'KAZAKHSTAN',
    category: 'Countries',
    difficulty: 'hard',
    hint: 'The world\'s largest landlocked country, spanning Central Asia and Eastern Europe.',
    funFact: 'The Baikonur Cosmodrome in Kazakhstan was the launch site of Sputnik 1 and Yuri Gagarin.'
  },
  {
    id: 'coun-8',
    word: 'AUSTRALIA',
    category: 'Countries',
    difficulty: 'easy',
    hint: 'A sovereign country comprising the mainland of the Australian continent and Tasmania.',
    funFact: 'Australia is home to the Great Barrier Reef, the largest living structure on the planet.'
  },

  // --- SPORTS ---
  {
    id: 'spor-1',
    word: 'BASKETBALL',
    category: 'Sports',
    difficulty: 'easy',
    hint: 'A sport played with an orange ball bounced and thrown into an elevated hoop.',
    funFact: 'Dr. James Naismith invented basketball in 1891 using peach baskets as hoops.'
  },
  {
    id: 'spor-2',
    word: 'CRICKET',
    category: 'Sports',
    difficulty: 'easy',
    hint: 'A bat-and-ball game played between two teams of eleven players on a pitch.',
    funFact: 'Cricket is the second most popular spectator sport in the world after soccer.'
  },
  {
    id: 'spor-3',
    word: 'BADMINTON',
    category: 'Sports',
    difficulty: 'medium',
    hint: 'A racquet sport played using feathered shuttlecocks across a net.',
    funFact: 'A smashed badminton shuttlecock can travel faster than 300 miles per hour.'
  },
  {
    id: 'spor-4',
    word: 'GYMNASTICS',
    category: 'Sports',
    difficulty: 'medium',
    hint: 'A sport involving physical exercises requiring balance, strength, and flexibility.',
    funFact: 'Nadia Comăneci scored the first perfect 10.0 in modern Olympic gymnastics history in 1976.'
  },
  {
    id: 'spor-5',
    word: 'DECATHLON',
    category: 'Sports',
    difficulty: 'hard',
    hint: 'A combined track and field event consisting of ten distinct athletic disciplines.',
    funFact: 'The decathlete winner at the Olympic Games traditionally holds the title of "World\'s Greatest Athlete".'
  },
  {
    id: 'spor-6',
    word: 'ARCHERY',
    category: 'Sports',
    difficulty: 'easy',
    hint: 'The practice or skill of using a bow to shoot arrows at a target.',
    funFact: 'Archery is the national sport of the Kingdom of Bhutan.'
  },
  {
    id: 'spor-7',
    word: 'TAEKWONDO',
    category: 'Sports',
    difficulty: 'hard',
    hint: 'A Korean martial art characterized by its emphasis on head-height kicks and jumping spinning kicks.',
    funFact: 'The name translates literally as "the way of the foot and the fist".'
  },

  // --- MOVIES ---
  {
    id: 'mov-1',
    word: 'INCEPTION',
    category: 'Movies',
    difficulty: 'easy',
    hint: 'A sci-fi heist movie where a team enters targets\' dreams to plant ideas.',
    funFact: 'Director Christopher Nolan worked on the script for nearly a decade.'
  },
  {
    id: 'mov-2',
    word: 'TITANIC',
    category: 'Movies',
    difficulty: 'easy',
    hint: 'A 1997 romantic disaster film about an ill-fated luxury ocean liner.',
    funFact: 'Titanic won 11 Academy Awards, tied for the most in cinematic history.'
  },
  {
    id: 'mov-3',
    word: 'INTERSTELLAR',
    category: 'Movies',
    difficulty: 'medium',
    hint: 'Astronauts travel through a wormhole near Saturn in search of a new habitable home.',
    funFact: 'Nobel laureate physicist Kip Thorne served as scientific consultant and executive producer.'
  },
  {
    id: 'mov-4',
    word: 'GLADIATOR',
    category: 'Movies',
    difficulty: 'medium',
    hint: 'A Roman general is betrayed and forced to fight in the Colosseum arena.',
    funFact: 'Russell Crowe won the Academy Award for Best Actor for his role as Maximus.'
  },
  {
    id: 'mov-5',
    word: 'CASABLANCA',
    category: 'Movies',
    difficulty: 'hard',
    hint: 'A wartime classic set in Morocco starring Humphrey Bogart and Ingrid Bergman.',
    funFact: 'The line "Play it again, Sam" is never actually spoken in the movie.'
  },
  {
    id: 'mov-6',
    word: 'OPPENHEIMER',
    category: 'Movies',
    difficulty: 'hard',
    hint: 'Biographical drama centered on the father of the atomic bomb and the Manhattan Project.',
    funFact: 'The film grossed nearly a billion dollars despite being a three-hour historical drama.'
  },
  {
    id: 'mov-7',
    word: 'AVATAR',
    category: 'Movies',
    difficulty: 'easy',
    hint: 'James Cameron epic set on the lush alien moon of Pandora.',
    funFact: 'Avatar is the highest-grossing film of all time worldwide.'
  },

  // --- FOOD ---
  {
    id: 'food-1',
    word: 'PIZZA',
    category: 'Food',
    difficulty: 'easy',
    hint: 'An Italian flatbread dish baked with tomato sauce, mozzarella, and toppings.',
    funFact: 'The modern pizza was invented in Naples, Italy, in the late 18th century.'
  },
  {
    id: 'food-2',
    word: 'CHOCOLATE',
    category: 'Food',
    difficulty: 'easy',
    hint: 'A sweet confection prepared from roasted and ground cacao seeds.',
    funFact: 'Ancient Maya and Aztecs consumed cacao as a frothy, spicy beverage.'
  },
  {
    id: 'food-3',
    word: 'CROISSANT',
    category: 'Food',
    difficulty: 'medium',
    hint: 'A buttery, flaky, crescent-shaped French pastry inspired by Austrian kipferl.',
    funFact: 'A proper croissant pastry contains dozens of alternating layers of butter and dough.'
  },
  {
    id: 'food-4',
    word: 'GUACAMOLE',
    category: 'Food',
    difficulty: 'medium',
    hint: 'An avocado-based dip originating in Mexico with lime, salt, and cilantro.',
    funFact: 'Avocados have been cultivated in Central and South America for over 9,000 years.'
  },
  {
    id: 'food-5',
    word: 'RATATOUILLE',
    category: 'Food',
    difficulty: 'hard',
    hint: 'A traditional French Provençal stewed vegetable dish from Nice.',
    funFact: 'The dish features eggplant, zucchini, bell peppers, tomatoes, and herbs.'
  },
  {
    id: 'food-6',
    word: 'PROSCIUTTO',
    category: 'Food',
    difficulty: 'hard',
    hint: 'An Italian dry-cured ham usually served thinly sliced and uncooked.',
    funFact: 'Prosciutto di Parma curing is strictly protected under European PDO law.'
  },
  {
    id: 'food-7',
    word: 'BURGER',
    category: 'Food',
    difficulty: 'easy',
    hint: 'A patty of ground meat placed inside a sliced bread bun.',
    funFact: 'Over 50 billion burgers are consumed annually in the United States alone.'
  },

  // --- SCIENCE ---
  {
    id: 'sci-1',
    word: 'GRAVITY',
    category: 'Science',
    difficulty: 'easy',
    hint: 'The universal fundamental force that attracts objects with mass toward each other.',
    funFact: 'Sir Isaac Newton formulated the law of universal gravitation in 1687.'
  },
  {
    id: 'sci-2',
    word: 'PHOTOSYNTHESIS',
    category: 'Science',
    difficulty: 'medium',
    hint: 'The biological process by which green plants convert light energy into chemical energy.',
    funFact: 'Cyanobacteria developed oxygenic photosynthesis roughly 2.4 billion years ago.'
  },
  {
    id: 'sci-3',
    word: 'THERMODYNAMICS',
    category: 'Science',
    difficulty: 'hard',
    hint: 'The branch of physics that deals with the relationships between heat and other forms of energy.',
    funFact: 'The Second Law states that the entropy of an isolated system always increases over time.'
  },
  {
    id: 'sci-4',
    word: 'SUPERNOVA',
    category: 'Science',
    difficulty: 'medium',
    hint: 'A catastrophic, extremely luminous stellar explosion that signals the death of a massive star.',
    funFact: 'A supernova can briefly outshine an entire galaxy composed of billions of stars.'
  },
  {
    id: 'sci-5',
    word: 'QUANTUM',
    category: 'Science',
    difficulty: 'medium',
    hint: 'The discrete minimum amount of any physical entity involved in an interaction.',
    funFact: 'Max Planck introduced the quantum hypothesis in 1900, winning the 1918 Nobel Prize.'
  },
  {
    id: 'sci-6',
    word: 'MITOCHONDRIA',
    category: 'Science',
    difficulty: 'hard',
    hint: 'Double-membraned cellular organelles known as the powerhouse of eukaryotic cells.',
    funFact: 'Mitochondria possess their own distinct circular DNA separate from the cell nucleus.'
  },
  {
    id: 'sci-7',
    word: 'TELESCOPE',
    category: 'Science',
    difficulty: 'easy',
    hint: 'An optical instrument designed to observe distant celestial objects.',
    funFact: 'The James Webb Space Telescope orbits the Sun-Earth L2 Lagrange point 1.5 million km away.'
  },

  // --- GENERAL KNOWLEDGE ---
  {
    id: 'gen-1',
    word: 'PYRAMID',
    category: 'General Knowledge',
    difficulty: 'easy',
    hint: 'Ancient monumental triangular structures built in Giza as royal tombs.',
    funFact: 'The Great Pyramid of Giza was the tallest man-made structure on Earth for over 3,800 years.'
  },
  {
    id: 'gen-2',
    word: 'MONA LISA',
    category: 'General Knowledge',
    difficulty: 'easy',
    hint: 'Masterpiece portrait painted by Leonardo da Vinci displayed in the Louvre Museum.',
    funFact: 'The subject is widely believed to be the Italian noblewoman Lisa Gherardini.'
  },
  {
    id: 'gen-3',
    word: 'RENAISSANCE',
    category: 'General Knowledge',
    difficulty: 'medium',
    hint: 'The cultural, artistic, and political rebirth in Europe spanning the 14th to 17th centuries.',
    funFact: 'Originating in Florence, Italy, the term means "rebirth" in French.'
  },
  {
    id: 'gen-4',
    word: 'ARCHIPELAGO',
    category: 'General Knowledge',
    difficulty: 'hard',
    hint: 'An extensive geographical cluster or group of islands scattered across a body of water.',
    funFact: 'The Malay Archipelago and Indonesian Archipelago are among the largest on Earth.'
  },
  {
    id: 'gen-5',
    word: 'EVEREST',
    category: 'General Knowledge',
    difficulty: 'easy',
    hint: 'The highest mountain peak on Earth above sea level, located in the Himalayas.',
    funFact: 'Mount Everest rises approximately 4 millimeters higher each year due to tectonic plate shifts.'
  },
  {
    id: 'gen-6',
    word: 'KALEIDOSCOPE',
    category: 'General Knowledge',
    difficulty: 'hard',
    hint: 'An optical tube containing mirrors and loose colored objects displaying symmetrical patterns.',
    funFact: 'Invented in 1816 by Scottish physicist Sir David Brewster.'
  },
  {
    id: 'gen-7',
    word: 'CONSTELLATION',
    category: 'General Knowledge',
    difficulty: 'medium',
    hint: 'A recognizable pattern or grouping of stars in the night sky recognized by astronomers.',
    funFact: 'The International Astronomical Union officially recognizes 88 distinct constellations.'
  },
];

/**
 * Filter words by category and difficulty
 */
export function getFilteredWords(category?: Category | 'All', difficulty?: Difficulty): WordItem[] {
  return WORD_BANK.filter((item) => {
    const matchCategory = !category || category === 'All' || item.category === category;
    const matchDifficulty = !difficulty || item.difficulty === difficulty;
    return matchCategory && matchDifficulty;
  });
}

/**
 * Get random word matching criteria
 */
export function getRandomWord(category?: Category | 'All', difficulty?: Difficulty, excludeId?: string): WordItem {
  let candidates = getFilteredWords(category, difficulty);
  
  if (excludeId && candidates.length > 1) {
    candidates = candidates.filter((item) => item.id !== excludeId);
  }

  if (candidates.length === 0) {
    // Fallback to any word from the bank
    candidates = WORD_BANK;
  }

  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}
