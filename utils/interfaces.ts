

export interface IQuestionField {
  uri: string;
  /** The type of input to render */
  type?: 'string' | 'options';
  /** The question that appears in the questionnaire */
  question: string;
  /** The correct answer. Matched lowercase and whitespace trimmed */
  answer: string;
  /** Array of options for dropdown menu */
  options?: string[];
  /** User feedback for this question */
  feedback: {
    /** Shows feedback under the question if answered incorrectly */
    response: string;
    /** Shows before the course final test for study suggestions */
    suggestion?: string;
    /** Related links that can provide more info for the user */
    links?: {[key: string]: string;}
  }
}

/**
 * Tests for user editor input
 */
export interface ICodeTest {
  uri: string;
  /** The type of error found */
  type: string;
  /** A short error message */
  title: string;
  /** A verbose error message */
  message?: string;
  /** User feedback for test failure */
  feedback: {
    /** Suggestions displayed before course end test */
    suggestion?: string;
    /** Links provide resources to user */
    links?: {[key: string]: string}
  }
}