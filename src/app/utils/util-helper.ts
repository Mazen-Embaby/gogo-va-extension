export default class UtilHelper {
  static escapeHtml(text: string) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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
      'fontSize',
      'fontFamily',
      'lineHeight',
      'textAlign',
      'padding',
      'width',
      'height',
      // 'boxShadow',
      // 'resize',
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
