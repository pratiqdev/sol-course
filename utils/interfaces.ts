export enum SuggestionCoreTypes {
  'CODE',
  'CONCEPT',
  'TECH'
}

export interface IQuestionField {
  // uri: string;
  /** The type of input to render */
  type?: 'string' | 'options' | 'boolean';
  /** The question that appears in the questionnaire */
  question: string;
  /** The correct answer. Matched lowercase and whitespace trimmed */
  answer: string;
  /** Array of options for dropdown menu */
  options?: string[];
  /** User feedback for this question */
  feedback: {
    /** The core type used for suggestions */
    coreType: SuggestionCoreTypes;
    
    title: string;
    /** Shows feedback under the question if answered incorrectly */
    response: string;
    /** Shows before the course final test for study suggestions */
    suggestion?: string;
    /** Related links that can provide more info for the user */
    links?: {[key: string]: string;}
  }
}

export interface IFinalQuestions {
  // uri: string;
  /** The type of input to render */
  type?: 'string' | 'options' | 'boolean';
  /** The question that appears in the questionnaire */
  question: string;
  /** The correct answer. Matched lowercase and whitespace trimmed */
  answer: string;
  /** Array of options for dropdown menu */
  options?: string[];
  /** A simple explanation of the solution */
  feedback: string;
}

/**
 * Tests for user editor input
 */
export interface ICodeTest {
  // uri: string;
  regex: string;
  /** Should this code exist or not exist */
  exist: boolean;
  /** The type of error found */
  type: string;
  /** A short error message */
  title: string;
  /** A verbose error message */
  message?: string;
  /** User feedback for test failure */
  feedback: {
    /** The core type used for suggestion categories */
    coreType: SuggestionCoreTypes;
    /** Title used to prevent dupes in suggestion object */
    title: string;
    /** Suggestions displayed before course end test */
    suggestion?: string;
    /** Links provide resources to user */
    links?: {[key: string]: string}
  }
}