import { CATEGORIES, DIFFICULTY_CONFIGS, WORD_BANK } from '../src/data/words';

/**
 * Vercel Serverless Function /api/words
 * Returns list of categories, difficulty configurations, or a random word challenge.
 */
export default function handler(req: any, res: any) {
  // Set CORS and JSON headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { category, difficulty, action } = req.query || {};

    if (action === 'random') {
      let pool = WORD_BANK;
      if (category && category !== 'All') {
        pool = pool.filter((w) => w.category.toLowerCase() === String(category).toLowerCase());
      }
      if (difficulty) {
        pool = pool.filter((w) => w.difficulty.toLowerCase() === String(difficulty).toLowerCase());
      }
      if (pool.length === 0) {
        pool = WORD_BANK;
      }
      const randomWord = pool[Math.floor(Math.random() * pool.length)];

      return res.status(200).json({
        success: true,
        word: {
          id: randomWord.id,
          category: randomWord.category,
          difficulty: randomWord.difficulty,
          wordLength: randomWord.word.replace(/[^A-Z]/g, '').length,
          hint: randomWord.hint,
          // Hide actual word in production API if desired, but provide full item for standard gameplay
          word: randomWord.word,
          funFact: randomWord.funFact,
        },
      });
    }

    return res.status(200).json({
      success: true,
      meta: {
        totalWords: WORD_BANK.length,
        categoriesCount: CATEGORIES.length,
      },
      categories: CATEGORIES,
      difficulties: DIFFICULTY_CONFIGS,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal Server Error',
    });
  }
}
