import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';

export function uriParams(name: string): Observable<string> {
  const route: ActivatedRoute = inject(ActivatedRoute);
  return route.paramMap.pipe(map(params => params.get(name)!));
}
