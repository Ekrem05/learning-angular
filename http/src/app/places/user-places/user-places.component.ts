import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  isFetching = signal(true);
  isError = signal(false);
  private placesService = inject(PlacesService);
  private destroyer = inject(DestroyRef);
  places = this.placesService.loadedUserPlaces;
  ngOnInit(): void {
    const subscription = this.placesService.loadUserPlaces().subscribe({
      complete: () => {
        this.isFetching.set(false);
      },
      error: () => {
        this.isError.set(true);
      },
    });

    this.destroyer.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  removePlace(place: Place) {
    this.placesService.removeUserPlace(place);
  }
}
