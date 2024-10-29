import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  places = signal<Place[] | undefined>(undefined);
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(
        tap({
          next: (userPlaces) => {
            this.places.set(userPlaces.places);
          },
        })
      );
  }

  loadUserPlaces() {
    return this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/user-places')
      .pipe(
        tap({
          next: (userPlaces) => {
            console.log(userPlaces);
            this.userPlaces.set(userPlaces.places);
          },
        })
      );
  }

  addPlaceToUserPlaces(place: Place) {
    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        tap({
          error: () => {
            this.errorService.showError('Could not add a new place');
          },
          complete: () => {
            this.loadUserPlaces().subscribe();
          },
        })
      );
  }

  removeUserPlace(place: Place) {
    console.log('rem');

    this.httpClient
      .delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        tap({
          complete: () => {
            this.loadUserPlaces().subscribe();
          },
        })
      )
      .subscribe();
  }
}
