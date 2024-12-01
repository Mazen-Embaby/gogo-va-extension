export default interface SuggestionData {
  message: string;
  
  start: number;
  end: number;


//   wrongText: string;
//   correctText: string;

  replacements?: {oldValue: string, newValue: string};
//   componentIdx: number; // span
}
