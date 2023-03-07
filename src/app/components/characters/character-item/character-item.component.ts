import { Component, Input, OnInit } from '@angular/core';

import { ICharacter } from 'src/app/shared/character.interface';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss'],
})
export class CharacterItemComponent implements OnInit {
  @Input() character!: ICharacter;

  constructor() {}

  ngOnInit(): void {}
}
