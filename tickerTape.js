const template = document.createElement('template')
template.innerHTML = `
<style>
    #tickerTapeText {
        font-size: 5em;
        color: ${'#b5180d'};
        font-style: italic;
    }
</style>
<span id="tickerTapeText"></span>
`


class TickerTape extends HTMLElement {
    constructor(){
        super()
        const tempNode = template.content.cloneNode(true)
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(tempNode)

        console.log(this._shadowRoot)
        this._ticker = this._shadowRoot.querySelector('#tickerTapeText')
        this._ticker.innerHTML = this.innerHTML
        
    }

    connectedCallback() {
        this._ticker.style.transition = '400ms'
        this._timer = setInterval(() => {
            const content = this._ticker.innerHTML
            const a = content.split('').slice(1)
            a.push(content.split('')[0])
            this._ticker.innerHTML = a.join('')
        }, 100)
    }

    disconnectedCallback() {
        clearInterval(this._timer)
    }
}

customElements.define('ticker-tape', TickerTape)