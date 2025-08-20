class SimplePerson extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["size", "shirt-color", "skin-color", "pants-color"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    // Get attributes or use defaults
    const size = parseInt(this.getAttribute("size") || "100");
    const shirtColor = this.getAttribute("shirt-color") || "#3498db";
    const skinColor = this.getAttribute("skin-color") || "#ffdbac";
    const pantsColor = this.getAttribute("pants-color") || "#34495e";

    // Calculate proportional sizes based on the size attribute
    const scale = size / 100;

    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
          
          .person {
            position: relative;
            width: ${60 * scale}px;
            height: ${100 * scale}px;
          }
          
          .head {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: ${24 * scale}px;
            height: ${30 * scale}px;
            background-color: ${skinColor};
            border-radius: ${12 * scale}px ${12 * scale}px ${12 * scale}px ${
      12 * scale
    }px;
          }
          
          .body {
            position: absolute;
            top: ${30 * scale}px;
            left: 50%;
            transform: translateX(-50%);
            width: ${30 * scale}px;
            height: ${40 * scale}px;
            background-color: ${shirtColor};
            border-radius: ${8 * scale}px ${8 * scale}px 0 0;
          }
          
          .legs {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: ${30 * scale}px;
            height: ${30 * scale}px;
            background-color: ${pantsColor};
          }
          
          .eye {
            position: absolute;
            width: ${4 * scale}px;
            height: ${4 * scale}px;
            background-color: #333;
            border-radius: 50%;
            top: ${10 * scale}px;
          }
          
          .left-eye {
            left: ${6 * scale}px;
          }
          
          .right-eye {
            right: ${6 * scale}px;
          }
          
          .mouth {
            position: absolute;
            width: ${10 * scale}px;
            height: ${3 * scale}px;
            border-bottom: ${2 * scale}px solid #333;
            border-radius: 50%;
            bottom: ${7 * scale}px;
            left: 50%;
            transform: translateX(-50%);
          }
        </style>
        
        <div class="person">
          <div class="head">
            <div class="eye left-eye"></div>
            <div class="eye right-eye"></div>
            <div class="mouth"></div>
          </div>
          <div class="body"></div>
          <div class="legs"></div>
        </div>
      `;
  }
}

// Define the custom element
customElements.define("simple-person", SimplePerson);
