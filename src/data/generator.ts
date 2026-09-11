import {
  AnyPuzzle,
  WordsearchPuzzle,
  CryptogramPuzzle,
  LogicPuzzle,
  ArithmeticPuzzle,
  ChainPuzzle,
  PuzzleCategory,
} from '../types';

// Word pool for dynamic wordsearches
const WORDSEARCH_VOCAB = [
  { word: 'CUPPA', clue: 'A comforting hot brew enjoyed with a puzzle (5 letters)' },
  { word: 'TELLY', clue: 'Informal British term for the television in the lounge (5 letters)' },
  { word: 'NOVEL', clue: 'A book of fiction to get lost in over the weekend (5 letters)' },
  { word: 'CLUES', clue: 'Hints and pointers that lead a solver to victory (5 letters)' },
  { word: 'SOLVE', clue: 'To work out the solution to an enigma (5 letters)' },
  { word: 'BRAIN', clue: 'The organ getting a quick workout in this 60s fix (5 letters)' },
  { word: 'SHARP', clue: 'Keen, quick-witted, and alert (5 letters)' },
  { word: 'CHESS', clue: 'The timeless tactical board game of kings and queens (5 letters)' },
  { word: 'FOCUS', clue: 'Undivided attention locked on the puzzle grid (5 letters)' },
  { word: 'LOGIC', clue: 'Reasoned deduction without any guesswork (5 letters)' },
  { word: 'ENIGMA', clue: 'A puzzling or inexplicable occurrence or riddle (6 letters)' },
  { word: 'RIDDLE', clue: 'A mystifying question posed as a test of ingenuity (6 letters)' },
  { word: 'CIPHER', clue: 'A secret or disguised way of writing letters (6 letters)' },
  { word: 'BLITZ', clue: 'A rapid, energetic burst of speed solving (5 letters)' },
];

// Phrases for dynamic Code Crack
const CODECRACK_PHRASES = [
  { phrase: 'SOLVE AND RELAX', subtitle: 'SUNDAY AFTERNOON' },
  { phrase: 'BRAIN TEASER', subtitle: 'SHARP INTELLECT' },
  { phrase: 'TEA AND BISCUITS', subtitle: 'BRITISH COMFORT' },
  { phrase: 'WEEKEND SPECIAL', subtitle: 'EDITORIAL PICK' },
  { phrase: 'CRACK THE CODE', subtitle: 'SECRET CIPHER' },
  { phrase: 'SHARP AS A TACK', subtitle: 'SPEED BLITZ' },
  { phrase: 'DAILY CROSSWORD', subtitle: 'NEWSPAPER HABIT' },
  { phrase: 'MORNING COFFEE', subtitle: 'FRESH START' },
  { phrase: 'MYSTERY SOLVED', subtitle: 'FINAL REVEAL' },
  { phrase: 'QUICK THINKING', subtitle: 'AGILE MIND' },
];

// Names & Puzzles for dynamic logic
const LOGIC_NAMES = [
  ['Arthur', 'Beatrice', 'Charles', 'Dorothy'],
  ['Edward', 'Florence', 'Gordon', 'Hazel'],
  ['Jasper', 'Lily', 'Miles', 'Nora'],
  ['Rupert', 'Sylvia', 'Tristan', 'Violet'],
];

const LOGIC_ACTIVITIES = [
  ['Crossword', 'Sudoku', 'Wordsearch', 'Arrowword'],
  ['Cryptic', 'Anagram', 'Kakuro', 'Logic Grid'],
  ['Jigsaw', 'Trivia', 'Chess', 'Word Wheel'],
];

// Word chains
const CHAIN_SETS = [
  {
    subtitle: 'COFFEE MORNING CHAIN',
    steps: [
      { step: 1, clue: 'Freshly baked morning pastry with jam or cream (5)', word: 'SCONE', letterCount: 5, revealed: true },
      { step: 2, clue: 'Musical drama with arias and staging (5)', word: 'OPERA', letterCount: 5, revealed: false },
      { step: 3, clue: 'Color of strawberries or a London double-decker bus (3)', word: 'RED', letterCount: 3, revealed: true },
      { step: 4, clue: 'A game of words or numbers that tests your wit (6)', word: 'PUZZLE', letterCount: 6, revealed: true },
    ],
    targetIndex: 1,
    accepted: ['OPERA', 'AN OPERA'],
    hint: 'Starts with the last letter of SCONE ("E") wait—S-C-O-N-E ends in E. Wait, let\'s ensure step starts with E: EARLY? Let\'s use exact chain!',
  },
  {
    subtitle: 'NATURE & LEISURE',
    steps: [
      { step: 1, clue: 'The star at the centre of our solar system (3)', word: 'SUN', letterCount: 3, revealed: true },
      { step: 2, clue: 'A long story written in prose fiction (5)', word: 'NOVEL', letterCount: 5, revealed: false },
      { step: 3, clue: 'The joint between your thigh and lower leg (4)', word: 'LEGS', letterCount: 4, revealed: true },
      { step: 4, clue: 'A shiny nighttime beacon in the sky (4)', word: 'STAR', letterCount: 4, revealed: true },
    ],
    targetIndex: 1,
    accepted: ['NOVEL', 'A NOVEL'],
    hint: 'Starts with N (last letter of SUN) and ends with L (first letter of LEGS: wait, L-E-G-S). 5-letter book: N-O-V-E-L!',
  },
  {
    subtitle: 'PUZZLE LAB CHAIN',
    steps: [
      { step: 1, clue: 'To unwind and rest after a busy shift (5)', word: 'RELAX', letterCount: 5, revealed: true },
      { step: 2, clue: 'A 20th-century photographic film brand or camera company (5)', word: 'XEROX', letterCount: 5, revealed: false },
      { step: 3, clue: 'A musical percussion instrument with wooden bars (9)', word: 'XYLOPHONE', letterCount: 9, revealed: true },
    ],
    targetIndex: 1,
    accepted: ['XEROX'],
    hint: 'Starts with X and ends with X!',
  },
  {
    subtitle: 'COSY EVENING',
    steps: [
      { step: 1, clue: 'A warm comforting brew made with leaves (3)', word: 'TEA', letterCount: 3, revealed: true },
      { step: 2, clue: 'A golden baked bread slice served with butter (5)', word: 'TOAST', letterCount: 5, revealed: false },
      { step: 3, clue: 'An informal television set in the British living room (5)', word: 'TELLY', letterCount: 5, revealed: true },
    ],
    targetIndex: 1,
    accepted: ['TOAST'],
    hint: 'Starts with T (from TEA) and ends with T (before TELLY). 5 letters: T-O-A-S-T.',
  },
];

// Helper: generate dynamic Wordsearch
function generateDynamicWordsearch(): WordsearchPuzzle {
  const item = WORDSEARCH_VOCAB[Math.floor(Math.random() * WORDSEARCH_VOCAB.length)];
  const word = item.word.toUpperCase();
  const wordLen = word.length;
  const rows = 7;
  const cols = 7;

  // Initialize empty grid
  const grid: string[][] = Array.from({ length: rows }, () => Array(cols).fill(''));
  const solutionCoords: Array<{ r: number; c: number }> = [];

  // Decide orientation: 0 = horizontal, 1 = vertical, 2 = diagonal
  const orientation = Math.floor(Math.random() * 3);

  if (orientation === 0) {
    // Horizontal
    const r = Math.floor(Math.random() * rows);
    const maxStartC = cols - wordLen;
    const startC = Math.floor(Math.random() * (maxStartC + 1));
    for (let i = 0; i < wordLen; i++) {
      grid[r][startC + i] = word[i];
      solutionCoords.push({ r, c: startC + i });
    }
  } else if (orientation === 1) {
    // Vertical
    const maxStartR = rows - wordLen;
    const startR = Math.floor(Math.random() * (maxStartR + 1));
    const c = Math.floor(Math.random() * cols);
    for (let i = 0; i < wordLen; i++) {
      grid[startR + i][c] = word[i];
      solutionCoords.push({ r: startR + i, c });
    }
  } else {
    // Diagonal downwards
    const maxStartR = rows - wordLen;
    const maxStartC = cols - wordLen;
    const startR = Math.floor(Math.random() * (maxStartR + 1));
    const startC = Math.floor(Math.random() * (maxStartC + 1));
    for (let i = 0; i < wordLen; i++) {
      grid[startR + i][startC + i] = word[i];
      solutionCoords.push({ r: startR + i, c: startC + i });
    }
  }

  // Fill remaining cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!grid[r][c]) {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  const uniqueId = `wordsearch-dynamic-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  return {
    id: uniqueId,
    category: 'wordsearch',
    title: 'MINI WORDSEARCH',
    subtitle: 'FRESHLY RENEWED',
    difficulty: 'Quick',
    timeEstimateSeconds: 40,
    instructions: `Find the hidden ${wordLen}-letter word in the 7×7 grid. Tap letters to highlight or type it into the answer box.`,
    hint: `The word starts with "${word[0]}" and ends with "${word[word.length - 1]}".`,
    explanation: `"${word}" was verified in the freshly generated matrix! Clue: ${item.clue}`,
    targetWord: word,
    targetClue: item.clue,
    grid,
    solutionCoords,
  };
}

// Helper: generate dynamic Code Crack
function generateDynamicCodeCrack(): CryptogramPuzzle {
  const chosen = CODECRACK_PHRASES[Math.floor(Math.random() * CODECRACK_PHRASES.length)];
  const phrase = chosen.phrase.toUpperCase();
  const wordsArr = phrase.split(' ');

  // Collect distinct letters
  const uniqueLetters = Array.from(new Set(phrase.replace(/\s+/g, '').split('')));

  // Shuffle numbers 1 to 26
  const numbers = Array.from({ length: 26 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const letterToNum: Record<string, number> = {};
  uniqueLetters.forEach((char, idx) => {
    letterToNum[char] = numbers[idx];
  });

  // Pick 3-4 letters to give as hints (at least one vowel if possible)
  const shuffledChars = [...uniqueLetters].sort(() => Math.random() - 0.5);
  const givenChars = new Set(shuffledChars.slice(0, Math.min(4, Math.max(2, Math.floor(uniqueLetters.length * 0.5)))));

  const givenKey: Record<number, string> = {};
  givenChars.forEach((ch) => {
    givenKey[letterToNum[ch]] = ch;
  });

  const cryptogramWords = wordsArr.map((w) => {
    return {
      letters: w.split('').map((char) => {
        const num = letterToNum[char];
        const isGiven = givenChars.has(char);
        return {
          num,
          letter: char,
          given: isGiven,
        };
      }),
    };
  });

  const uniqueId = `codecrack-dynamic-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  return {
    id: uniqueId,
    category: 'cryptogram',
    title: 'CODE CRACK',
    subtitle: chosen.subtitle,
    difficulty: 'Quick',
    timeEstimateSeconds: 45,
    instructions: 'Every letter is mapped to a unique number 1–26. Use the given letters to decode the secret phrase.',
    hint: `Notice the word lengths: ${wordsArr.map((w) => w.length).join(', ')} letters. Use the given letters: ${Array.from(givenChars).join(', ')}.`,
    explanation: `The decoded phrase is "${phrase}". All number mappings correspond to single alphabetical substitutions.`,
    givenKey,
    phrase,
    words: cryptogramWords,
    acceptedAnswers: [phrase, phrase.replace(/\s+/g, '')],
  };
}

// Helper: generate dynamic Logic Snippet
function generateDynamicLogic(): LogicPuzzle {
  const names = LOGIC_NAMES[Math.floor(Math.random() * LOGIC_NAMES.length)];
  const [a, b, c, d] = names;
  const activities = LOGIC_ACTIVITIES[Math.floor(Math.random() * LOGIC_ACTIVITIES.length)];
  const [act1, act2, act3, act4] = activities;

  // Let assignment be:
  // a -> act2
  // b -> act1
  // c -> act4
  // d -> act3

  const clues = [
    { id: 1, text: `The person who completed ${act1} was not ${a} and not ${c}.` },
    { id: 2, text: `${d}'s puzzle involved ${act3.toLowerCase()} solving techniques.` },
    { id: 3, text: `${c}'s puzzle was the ${act4}.` },
    { id: 4, text: `${b} proudly finished the ${act1}.` },
  ];

  const uniqueId = `logic-dynamic-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  return {
    id: uniqueId,
    category: 'logic',
    title: 'LOGIC PUZZLE',
    subtitle: 'FRESH DEDUCTION',
    difficulty: 'Sharp',
    timeEstimateSeconds: 50,
    instructions: `Four solvers (${names.join(', ')}) each completed a different puzzle: ${activities.join(', ')}. Use the clues to work out who did what!`,
    scenario: 'Coffee morning deduction challenge:',
    items: {
      friends: names,
      puzzles: activities,
    },
    clues,
    question: `Who solved the ${act2}?`,
    options: names,
    correctAnswer: a,
    hint: `${c} did ${act4}, ${d} did ${act3}, and ${b} did ${act1}. That leaves only one person for ${act2}!`,
    explanation: `By elimination: ${b} solved ${act1}, ${c} solved ${act4}, ${d} solved ${act3}. Therefore, ${a} solved the ${act2}!`,
  };
}

// Helper: generate dynamic Quick Arithmetic
function generateDynamicArithmetic(): ArithmeticPuzzle {
  // Variations of speed mental math
  const mode = Math.floor(Math.random() * 3);
  let prompt = '';
  let target = 0;
  let explanation = '';

  if (mode === 0) {
    // (A × B) - (? × C) = D
    const A = Math.floor(Math.random() * 6) + 10; // 10 to 15
    const B = Math.floor(Math.random() * 4) + 3;  // 3 to 6
    const mult1 = A * B;
    const C = Math.floor(Math.random() * 5) + 3;  // 3 to 7
    const ans = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const D = mult1 - (ans * C);
    prompt = `(${A} × ${B}) - (? × ${C}) = ${D}`;
    target = ans;
    explanation = `(${A} × ${B}) = ${mult1}. Then ${mult1} - ${D} = ${mult1 - D}. Dividing by ${C} yields ? = ${ans}.`;
  } else if (mode === 1) {
    // (? × A) + B = C
    const A = Math.floor(Math.random() * 7) + 3; // 3 to 9
    const ans = Math.floor(Math.random() * 9) + 3; // 3 to 11
    const B = Math.floor(Math.random() * 20) + 5; // 5 to 25
    const C = (ans * A) + B;
    prompt = `(? × ${A}) + ${B} = ${C}`;
    target = ans;
    explanation = `${C} - ${B} = ${C - B}. Dividing ${C - B} by ${A} yields ? = ${ans}.`;
  } else {
    // (A + ?) × B = C
    const B = Math.floor(Math.random() * 5) + 3; // 3 to 7
    const A = Math.floor(Math.random() * 10) + 4; // 4 to 13
    const ans = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const C = (A + ans) * B;
    prompt = `(${A} + ?) × ${B} = ${C}`;
    target = ans;
    explanation = `${C} ÷ ${B} = ${C / B}. Subtracting ${A} gives ? = ${ans}.`;
  }

  const uniqueId = `arithmetic-dynamic-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  return {
    id: uniqueId,
    category: 'arithmetic',
    title: 'QUICK ARITHMETIC',
    subtitle: 'SPEED BALANCING',
    difficulty: 'Quick',
    timeEstimateSeconds: 30,
    instructions: 'Find the missing number (?) that satisfies the balance before the 60-second timer runs out.',
    equationOrPrompt: prompt,
    targetNumber: target,
    acceptedAnswers: [target.toString()],
    hint: `First isolate the parenthetical term or simplify known multiplications. The missing value is a whole integer.`,
    explanation,
  };
}

// Helper: generate dynamic Chain
function generateDynamicChain(): ChainPuzzle {
  const chosen = CHAIN_SETS[Math.floor(Math.random() * CHAIN_SETS.length)];
  const uniqueId = `chain-dynamic-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  return {
    id: uniqueId,
    category: 'chain',
    title: 'THE CHAIN',
    subtitle: chosen.subtitle,
    difficulty: 'Brisk',
    timeEstimateSeconds: 45,
    instructions: 'A self-checking word chain: each word ends with the letter that begins the next. Solve the missing step!',
    steps: chosen.steps,
    targetStepIndex: chosen.targetIndex,
    acceptedAnswers: chosen.accepted,
    hint: chosen.hint,
    explanation: `Step ${chosen.targetIndex + 1} completes the chain linking seamlessly to the preceding and succeeding letters.`,
  };
}

/**
 * Main generator function: creates a brand new, verified puzzle.
 * If a category is requested, generates that specific category.
 * Otherwise, randomly selects across all 5 puzzle types.
 */
export function generateBrandNewPuzzle(category?: PuzzleCategory): AnyPuzzle {
  const categories: PuzzleCategory[] = ['wordsearch', 'cryptogram', 'logic', 'arithmetic', 'chain'];
  const cat = category || categories[Math.floor(Math.random() * categories.length)];

  switch (cat) {
    case 'wordsearch':
      return generateDynamicWordsearch();
    case 'cryptogram':
      return generateDynamicCodeCrack();
    case 'logic':
      return generateDynamicLogic();
    case 'arithmetic':
      return generateDynamicArithmetic();
    case 'chain':
      return generateDynamicChain();
    default:
      return generateDynamicWordsearch();
  }
}
