import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(true);
  isError = signal(false);

  private placesService = inject(PlacesService);
  private destroyer = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (resData) => {
        this.places.set(resData.places);
      },
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

  onSelectPlace(place: Place) {
    this.placesService.addPlaceToUserPlaces(place).subscribe({
      next: (output) => {
        console.log(output);
      },
    });
  }
}
