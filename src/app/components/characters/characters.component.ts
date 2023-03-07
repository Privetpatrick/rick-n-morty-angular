import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CharactersService } from 'src/app/services/characters.service';
import { ICharacter } from 'src/app/shared/character.interface';
import { LOCAL_STORAGE } from 'src/app/shared/constants';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  @ViewChild('input') input!: ElementRef;
  characters$!: Observable<ICharacter[]>;
  searchForm!: FormGroup;

  constructor(
    private charactersService: CharactersService,
    private formBuilder: FormBuilder
  ) {}

  identify(index: number, character: ICharacter) {
    return character.name;
  }

  ngOnInit(): void {
    this.characters$ = this.charactersService.getCharacters('');
    this.searchForm = this.formBuilder.group({
      search: [this.getLocalStorage()],
    });
    this.searchSubmit();
  }

  searchSubmit() {
    const name = this.searchForm.controls['search'].value;
    this.setLocalStorage(name);
    this.characters$ = this.charactersService.getCharacters(name);
  }

  setLocalStorage(name: string) {
    localStorage.setItem(LOCAL_STORAGE, name);
  }

  getLocalStorage(): string {
    const value = localStorage.getItem(LOCAL_STORAGE);
    if (!value) return '';
    return value;
  }
}
