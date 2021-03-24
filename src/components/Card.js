export default class Card {
    constructor({$target, data}) {
        this.data = data;
        this.card = document.createElement('article');
        this.card.className = 'card';
        this.card.dataset.id = data.id;

        $target.appendChild(this.card);

        this.render();
    }

    render() {
        const url = this.data.url;
        const name = this.data.name

        const cardImage = document.createElement('img');
        cardImage.className = 'card-image';
        cardImage.src = url;

        const cardInfo = document.createElement('article');
        cardInfo.className = 'card-info';

        const cardName = document.createElement('p');
        cardName.className = 'card-name';
        cardName.innerText = name;


        cardInfo.appendChild(cardName);
        this.card.appendChild(cardImage);
        this.card.appendChild(cardInfo);
    }
}