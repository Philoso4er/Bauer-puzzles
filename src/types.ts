export type PuzzleCategory = 
  | 'wordsearch' 
  | 'cryptogram' 
  | 'logic' 
  | 'arithmetic' 
  | 'chain';

export interface BasePuzzle {
  id: string;
  category: PuzzleCategory;
  title: string; // e.g. "WORDSEARCH", "CODE CRACK", "LOGIC PUZZLE"
  subtitle: string; // e.g. "WEEKEND WIND-DOWN", "WHO SOLVED WHAT?"
  difficulty: 'Quick' | 'Brisk' | 'Sharp';
  timeEstimateSeconds: number;
  instructions: string;
  hint: string;
  explanation: string;
}

export interface WordsearchPuzzle extends BasePuzzle {
  category: 'wordsearch';
  targetWord: string;
  targetClue: string;
  grid: string[][]; // e.g. 7x7
  solutionCoords: Array<{ r: number; c: number }>;
}

export interface CryptogramLetter {
  num: number;
  letter: string;
  given: boolean;
}

export interface CryptogramWord {
  letters: CryptogramLetter[];
}

export interface CryptogramPuzzle extends BasePuzzle {
  category: 'cryptogram';
  givenKey: Record<number, string>; // e.g. { 4: 'E', 18: 'D', 14: 'O', 12: 'C' }
  phrase: string; // e.g. "KEEP CALM"
  words: CryptogramWord[];
  acceptedAnswers: string[];
}

export interface LogicClue {
  id: number;
  text: string;
}

export interface LogicPuzzle extends BasePuzzle {
  category: 'logic';
  scenario: string;
  items: {
    friends: string[];
    puzzles: string[];
  };
  clues: LogicClue[];
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ArithmeticPuzzle extends BasePuzzle {
  category: 'arithmetic';
  equationOrPrompt: string;
  grid?: (number | string)[][];
  targetNumber: number;
  acceptedAnswers: string[];
  unitOrLabel?: string;
}

export interface ChainStep {
  step: number;
  clue: string;
  word: string;
  letterCount: number;
  revealed: boolean;
}

export interface ChainPuzzle extends BasePuzzle {
  category: 'chain';
  steps: ChainStep[];
  targetStepIndex: number; // which step needs to be solved by the user
  acceptedAnswers: string[];
}

export type AnyPuzzle = 
  | WordsearchPuzzle 
  | CryptogramPuzzle 
  | LogicPuzzle 
  | ArithmeticPuzzle 
  | ChainPuzzle;

export interface GameStats {
  streak: number;
  solvedCount: number;
  bestTimeSeconds: number | null;
  history: Array<{
    puzzleId: string;
    secondsTaken: number;
    solved: boolean;
    timestamp: number;
  }>;
}
