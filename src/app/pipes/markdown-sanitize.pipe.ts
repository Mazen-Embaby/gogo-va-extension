import { Pipe, PipeTransform } from '@angular/core';
import * as DOMPurify from 'dompurify';
import * as marked from 'marked';

@Pipe({
  name: 'markdownSanitize',
  standalone: true,
})
export class MarkdownSanitizePipe implements PipeTransform {

  async transform(value: string): Promise<string> {
    if (!value) return ''; // Handle empty or null input

    // Parse the Markdown to HTML
    const htmlContent = await marked.parse(value);

    // Sanitize the HTML content using DOMPurify
    return DOMPurify.sanitize(htmlContent);
  }
}
