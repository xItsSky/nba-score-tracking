import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export function formatParam<T extends Object>(name: string, param: T, previousHttpParams = new HttpParams()) {
  if (param instanceof Date) {
    const datePipe: DatePipe = new DatePipe('en-US');
    const date: string | null = datePipe.transform(param, 'yyyy-MM-dd');
    return date ? previousHttpParams.append(name, date) : previousHttpParams.append(name, param.toString());
  }

  return previousHttpParams.append(name, param.toString());
}
