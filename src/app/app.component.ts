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
  ]

  cards: Carta[] = [];

  flippedCards: Carta[] = [];

  matchedCount = 0;

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  constructor(private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.setupCards();
  }

  setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: Carta = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this.shuffleArray(this.cards);
  }

  setupCards2(): void {
    this.cards = [];
    this.cardImages2.forEach((image) => {
      const cardData: Carta = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });


    });

    this.cards = this.shuffleArray(this.cards);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          const dialogRef = this.dialog.open(ResetComponent, {
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(() => {
            this.restart();
          });
        }
      }

    }, 1000);
  }
  

  

  restart(): void {
    this.matchedCount = 0;
    if(this.cardImages2){
      console.log('muda para setup 1')
      return this.setupCards()
    }
    else{
      console.log('muda para setup 2')
      this.setupCards2();
    }
    
  }


}
