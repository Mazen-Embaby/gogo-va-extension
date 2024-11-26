export default interface SuggestionData {
  message: string;
  
  start?: number;
  end?: number;
  offset: number;
  length: number;

//   wrongText: string;
//   correctText: string;

  replacements?: {old: string, new: string}[];
//   componentIdx: number; // span
}
