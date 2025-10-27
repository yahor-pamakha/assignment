import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private requestCounter = new BehaviorSubject<number>(0);

  readonly isLoading$ = this.requestCounter.asObservable().pipe(map((count) => count > 0));

  show(): void {
    this.requestCounter.next(this.requestCounter.value + 1);
  }

  hide(): void {
    this.requestCounter.next(this.requestCounter.value - 1);
  }
}
