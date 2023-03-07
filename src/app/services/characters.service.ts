import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { ICharacter } from '../shared/character.interface';
import { GET_CHARACTERS, GET_CHARACTERS_BY_NAME } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  getCharacters(name: string): Observable<ICharacter[]> {
    return this.http
      .get<any>(name ? GET_CHARACTERS_BY_NAME + name : GET_CHARACTERS)
      .pipe(
        map((response) => {
          const characters: ICharacter[] = response['results'].map(
            (char: any) => {
              return {
                id: char.id,
                name: char.name,
                gender: char.gender,
                image: char.image,
                status: char.status,
                species: char.species,
                origin: char.origin.name,
                type: char.type,
              };
            }
          );
          return characters.sort((a, b) => a.name.localeCompare(b.name));
        }),
        shareReplay({ refCount: true })
      );
  }

  getCharacterByID(id: string): Observable<ICharacter> {
    return this.http.get<any>(GET_CHARACTERS + '/' + id).pipe(
      map((response) => {
        const characters = {
          id: response.id,
          name: response.name,
          gender: response.gender,
          image: response.image,
          status: response.status,
          species: response.species,
          origin: response.origin.name,
          type: response.type,
        };
        return characters;
      }),
      shareReplay({ refCount: true })
    );
  }
}
