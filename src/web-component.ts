import { LitElement, html, property } from 'lit-element'

const converter = {
  toAttribute(value) {
    return JSON.stringify(value)
  },
  fromAttribute(value: string) {
    try {
      return JSON.parse(value)
    } catch (o_O) {
      return {}
    }
  }
}

export class WebComponent extends LitElement {
  @property({ type: Object, converter }) data: Record<string, any> = {}

  connectedCallback() {
    super.connectedCallback()
    console.log('Mounted')
  }

  render() {
    return html`
      <input type="text" id="input" placeholder="Enter your name" @input=${this.onInput}><br />
      <code>Payload: ${JSON.stringify(this.data)}</code>
    `
  }

  onInput(e: Event) {
    this.dispatchEvent(
      new CustomEvent('custom-input', {
        detail: e.target
      })
    )
  }
}

if (!customElements.get('web-component')) {
  customElements.define('web-component', WebComponent)
}
