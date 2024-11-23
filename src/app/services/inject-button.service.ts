import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InjectButtonService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  injectButton(textarea: HTMLTextAreaElement) {
    const button = this.renderer.createElement('button');
    this.renderer.setStyle(button, 'position', 'absolute');
    this.renderer.setStyle(button, 'bottom', '20px');
    this.renderer.setStyle(button, 'right', '5px');
    this.renderer.setStyle(button, 'padding', '5px 10px');
    this.renderer.setStyle(button, 'background-color', '#007bff');
    this.renderer.setStyle(button, 'color', 'white');
    this.renderer.setStyle(button, 'border', 'none');
    this.renderer.setStyle(button, 'border-radius', '5px');
    this.renderer.setStyle(button, 'cursor', 'pointer');
    this.renderer.setStyle(button, 'font-size', '12px');
    this.renderer.addClass(button, 'textarea-button');
    this.renderer.setProperty(button, 'innerText', 'Action');

    this.renderer.listen(button, 'click', () => {
      alert('Button action triggered!');
    });

    const wrapper = this.renderer.parentNode(textarea);
    this.renderer.appendChild(wrapper, button);

    this.renderer.listen(textarea, 'blur', () => {
      this.renderer.removeChild(wrapper, button);
    });
  }
}