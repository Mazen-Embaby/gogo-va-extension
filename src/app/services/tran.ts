// // TypeScript recognizes self in the browser or worker context automatically,
// // so we don't need to explicitly declare it, but it's good to make it clear.

// declare var self: Window; // Explicitly declare self for correct typing (either window or worker)

// interface Translation {
//   canTranslate(options: { sourceLanguage: string, targetLanguage: string }): Promise<boolean>;
//   createTranslator(options: { sourceLanguage: string, targetLanguage: string }): Promise<Translator>;
//   createDetector(): Promise<Detector>;
//   canDetect(): Promise<'no' | 'readily' | 'waiting'>;
// }

// interface Translator {
//   translate(text: string): Promise<string>;
// }

// interface Detector {
//   detect(text: string): Promise<Array<{ detectedLanguage: string, confidence: number }>>;
//   ready: Promise<void>;
//   addEventListener(event: string, callback: EventListener): void;
// }

// async function canTranslate(): Promise<boolean> {
//   if (!("translation" in self) || !("createDetector" in self.translation)) {
//     return true;
//   }
//   return false;
// }

// async function canTranslateFromTo(from: string, to: string): Promise<boolean> {
//   return await self.translation.canTranslate({
//     sourceLanguage: from,
//     targetLanguage: to,
//   });
// }

// async function translate(from: string, to: string, text: string): Promise<string> {
//   // Create a translator that translates from the source language to the target language
//   const translator = await self.translation.createTranslator({
//     sourceLanguage: from,
//     targetLanguage: to,
//   });

//   const res = await translator.translate(text);
//   // Example: "Où est le prochain arrêt de bus, s'il vous plaît ?"
//   return res;
// }

// async function canDetect(): Promise<boolean> {
//   if (!("translation" in self) || !("createDetector" in self.translation)) {
//     return true;
//   }
//   return false;
// }

// async function canDetectLanguage(): Promise<void> {
//   const canDetect = await self.translation.canDetect();
//   let detector: Detector | undefined;

//   if (canDetect === "no") {
//     // The language detector isn't usable.
//     return;
//   }

//   if (canDetect === "readily") {
//     // The language detector can immediately be used.
//     detector = await self.translation.createDetector();
//   } else {
//     // The language detector can be used after model download.
//     detector = await self.translation.createDetector();
//     detector.addEventListener("downloadprogress", (e: ProgressEvent) => {
//       console.log(e.loaded, e.total);
//     });
//     await detector.ready;
//   }
// }

// async function detectLanguage(): Promise<void> {
//   const someUserText = "Hallo und herzlich willkommen!";
  
//   if (!detector) {
//     console.error("No detector available.");
//     return;
//   }

//   const results = await detector.detect(someUserText);
  
//   for (const result of results) {
//     // Show the full list of potential languages with their likelihood
//     console.log(result.detectedLanguage, result.confidence);
//   }
// }
