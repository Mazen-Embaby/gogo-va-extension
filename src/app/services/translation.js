async function canTranslate() {
  if (!("translation" in self) || !("createDetector" in self.translation)) {
    return true;
  }
  return false;
}

async function canTranslateFromTo(from, to) {
  return await translation.canTranslate({
    sourceLanguage: from,
    targetLanguage: to,
  });
}

async function translate(from, to, text) {
  // Create a translator that translates from English to French.
  const translator = await self.translation.createTranslator({
    sourceLanguage: from,
    targetLanguage: to,
  });

  const res = await translator.translate(text);
  // "Où est le prochain arrêt de bus, s'il vous plaît ?"

  return res;
}

async function canDetect() {
  if (!("translation" in self) || !("createDetector" in self.translation)) {
    return true;
  }
  return false;
}

async function canDetectLanguage() {
  const canDetect = await translation.canDetect();
  let detector;
  if (canDetect === "no") {
    // The language detector isn't usable.
    return;
  }
  if (canDetect === "readily") {
    // The language detector can immediately be used.
    detector = await translation.createDetector();
  } else {
    // The language detector can be used after model download.
    detector = await translation.createDetector();
    detector.addEventListener("downloadprogress", (e) => {
      console.log(e.loaded, e.total);
    });
    await detector.ready;
  }
}

async function detectLanguage() {
  const someUserText = "Hallo und herzlich willkommen!";
  const results = await detector.detect(someUserText);
  for (const result of results) {
    // Show the full list of potential languages with their likelihood, ranked
    // from most likely to least likely. In practice, one would pick the top
    // language(s) that cross a high enough threshold.
    console.log(result.detectedLanguage, result.confidence);
  }
}

// (async () => {
//   if (!("translation" in self) || !("createDetector" in self.translation)) {
//     document.querySelector(".not-supported-message").hidden = false;
//     return;
//   }

//   const input = document.querySelector("textarea");
//   const output = document.querySelector("output");
//   const form = document.querySelector("form");
//   const detected = document.querySelector("span");
//   const language = document.querySelector("select");

//   form.style.visibility = "visible";
//   const detector = await self.translation.createDetector();

//   input.addEventListener("input", async () => {
//     if (!input.value.trim()) {
//       detected.textContent = "not sure what language this is";
//       return;
//     }
//     const { detectedLanguage, confidence } = (
//       await detector.detect(input.value.trim())
//     )[0];
//     detected.textContent = `${(confidence * 100).toFixed(
//       1,
//     )}% sure that this is ${languageTagToHumanReadable(
//       detectedLanguage,
//       "en",
//     )}`;
//   });

//   input.dispatchEvent(new Event("input"));

//   const languageTagToHumanReadable = (languageTag, targetLanguage) => {
//     const displayNames = new Intl.DisplayNames([targetLanguage], {
//       type: "language",
//     });
//     return displayNames.of(languageTag);
//   };

//   if ("createTranslator" in self.translation) {
//     document
//       .querySelectorAll("[hidden]:not(.not-supported-message)")
//       .forEach((el) => {
//         el.removeAttribute("hidden");
//       });

//     form.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       try {
//         const sourceLanguage = (await detector.detect(input.value.trim()))[0]
//           .detectedLanguage;
//         if (!["en", "ja", "es"].includes(sourceLanguage)) {
//           output.textContent =
//             "Currently, only English ↔ Spanish and English ↔ Japanese are supported.";
//           return;
//         }
//         const translator = await self.translation.createTranslator({
//           sourceLanguage,
//           targetLanguage: language.value,
//         });
//         output.textContent = await translator.translate(input.value.trim());
//       } catch (err) {
//         output.textContent = "An error occurred. Please try again.";
//         console.error(err.name, err.message);
//       }
//     });
//   }
// })();
