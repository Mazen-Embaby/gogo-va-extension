export default class UtilHelper {
  static escapeHtml(text: string) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

   // Function to get specific styles
   static getSpecificStyles(element:HTMLElement, properties: any[]) {
    const styleMap = new Map();
    if (!element || !(element instanceof HTMLElement)) {
      console.error("Invalid element provided");
      return styleMap;
    }
  
    const computedStyles = window.getComputedStyle(element);
  
    // Add only desired properties to the Map
    properties.forEach((property) => {
      if (computedStyles.getPropertyValue(property)) {
        styleMap.set(property, computedStyles.getPropertyValue(property));
      }
    });
  
    return styleMap;
  }

  static mapStyleToString(styleMap: Map<string, string>): string {

    let x = '';
    styleMap.forEach((key, value) => {
      x += `${key}:${value};`;
    });
    return x;
  }

   static applyStyles(targetElement: HTMLElement, styleMap: Map<string, string>) {
    if (!targetElement || !(targetElement instanceof HTMLElement)) {
      console.error("Invalid target element");
      return;
    }
  
    styleMap.forEach((value, key) => {
      (targetElement.style as any)[key] = value;
      // targetElement.style.setProperty(key, value);
      // targetElement.style['s'] = value;
    });
    return targetElement;
  }

  static cloneTextareaStyle(
    source: HTMLTextAreaElement,
    target: HTMLElement,
  ): HTMLElement {
    // Get the computed styles of the source textarea
    const computedStyle = window.getComputedStyle(source);

    // Define properties to clone
    const propertiesToClone = [
      'font',
      'font-size',
      'font-family',
      'line-height',
      'textAlign',
      'padding',
      'width',
      'height',
      // 'boxShadow',
      'resize',
      'overflow',
      'whiteSpace',
    ];


    // Apply each property to the target element
    propertiesToClone.forEach((property) => {
      (target.style as any)[property] =
        computedStyle.getPropertyValue(property);
    });
    // Clone scroll position
    target.scrollTop = source.scrollTop;
    target.scrollLeft = source.scrollLeft;
    // target.scrollTo = source.scrollTo;

    // Clone dimensions
    target.style.width = `${source.offsetWidth}px`;
    target.style.height = `${source.offsetHeight}px`;

    return target;
  }
}
