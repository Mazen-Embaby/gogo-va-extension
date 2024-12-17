import { isProbablyReaderable, Readability } from '@mozilla/readability';


function canBeParsed(document: Document) {
  return isProbablyReaderable(document, {
    minContentLength: 100
  });
}

function parse(document: Document) {
  if (!canBeParsed(document)) {
    return false;
  }
  const documentClone = document.cloneNode(true) as Document;
  const article = new Readability(documentClone).parse();
  return article!.textContent;
}


parse(window.document);
