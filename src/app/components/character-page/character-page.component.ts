import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, shareReplay, switchMap } from 'rxjs';

import { CharactersService } from 'src/app/services/characters.service';
import { ICharacter } from 'src/app/shared/character.interface';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss'],
})
export class CharacterPageComponent implements OnInit {
  character$!: Observable<ICharacter>;
  character!: ICharacter;

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService
  ) {}

  ngOnInit(): void {
    this.character$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.charactersService.getCharacterByID(params.get('id')!)
      ),
      shareReplay()
    );
  }
}
