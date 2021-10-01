import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Carta } from './shared';
import { ResetComponent } from './reset/reset.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  aux = 0
  clicks = 0

  cardImages = [
    'HlI03bNHhBI',
    'G2Xr3yuE1hU',
    'Dl39g6QhOIM',
    '7GX5aICb5i4',
    'ZlFKIG6dApg'    
  ];

  cardImages2 = [
    'pdALzg0yN-8',
    'ZCHj_2lJP00',
    '46TvM-BVrRI',
    'R1oSj2m-7Ks',
    'rW-I87aPY5Y'
  ];

  cardImages3 = [
    "-dtKoaHpi9M",
    "mwwRDU_ekjw",
    "8piaMv-7Idc",
    "ngbQ2aRMYYQ",
    "jDkn6mwqJVU"
  ];

  cardImages4 = [
    "Z66JM_4wleU",
    "KIhOwnglzso",
    "lg5TpyNO5Wg",
    "dIqyK9xE5mM",
    "m6nMESbDVeY"

  ]

  cardImages5 = [
    "V4Mo8UYKRvY",
    "FRJamIO-TB0",
    "Xg_PBo-6rsE",
    "5APBLfC2hUs",
    "G_oWb_hcfx8"
  ]

  cardImages6 = [
    "mvGVZPnVd-g",
    "RQIwA-zOlGg",
    "4gyYf1ItdHI",
    "h8T1Wa4u7oU",
    "nbcQn8KURa4"
  ]

  Ci = [this.cardImages, this.cardImages2, this.cardImages3, this.cardImages4, this.cardImages5, this.cardImages6]

  cards: Carta[] = [];

  flippedCards: Carta[] = [];

  matchedCount = 0;

  embaralhaArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  constructor(private dialog: MatDialog) {

  }
  

  ngOnInit(): void {
    this.inicializaCards();
  }

  inicializaCards(): void {
    this.cards = [];
    this.clicks = 0
    this.Ci[this.aux].forEach((image) => {
      console.log(`valor do array de imagens ${this.aux}`)
      const cardData: Carta = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this.embaralhaArray(this.cards);


    console.log(`valor do setupCards ${this.aux}`)
  }


  cardClicado(index: number): void {
    const cardInfo = this.cards[index];
    this.clicks++;

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.SeDerMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  SeDerMatch(): void {
    setTimeout(() => {
      const cardUm = this.flippedCards[0];
      const cardDois = this.flippedCards[1];
      const nextState = cardUm.imageId === cardDois.imageId ? 'matched' : 'default';
      cardUm.state = cardDois.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          const dialogRef = this.dialog.open(ResetComponent, {
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(() => {
            console.log(`valor da variavel antes de entrar no reset ${this.aux}`)
            this.restart();
          });
        }
      }

    }, 1000);
  }
  

  restart(): void {
    this.matchedCount = 0;
    this.clicks = 0;

    if(this.aux == 0){
      this.aux = 1
    }

    else if(this.aux == 1){
      this.aux = 2;
    }

    else if(this.aux == 2){
      this.aux = 3;
    }

    else if(this.aux == 3){
      this.aux = 4;
    }

    else if(this.aux == 4){
      this.aux = 5;
    }

    else if(this.aux == 5){
      this.aux = 0;
    }

    this.inicializaCards()
  }

}
