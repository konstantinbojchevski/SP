import { InjectionToken } from '@angular/core';

export const Browser_Storage = new InjectionToken<Storage>(
  'Browser storage',
  {
    providedIn: 'root',
    factory: () => localStorage
  }
);
