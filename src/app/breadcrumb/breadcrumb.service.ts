import { Injectable } from '@angular/core';
import { Breadcrumb } from './breadcrumb';
import { BehaviorSubject } from 'rxjs';
import { Facet } from '../facet/facet';
import { Value } from '../range/value';
import { Filter } from './filter';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  public breadcrumbs: BehaviorSubject<Breadcrumb[]>;
  public filtersSelection: BehaviorSubject<Filter[]>;
  public filters: Filter[] = [];

  constructor() {
    this.breadcrumbs = new BehaviorSubject([]);
    this.filtersSelection = new BehaviorSubject([]);
  }

  public navigateTo(url: string) {
    this.breadcrumbs.next(url.split('/')
      .filter(step => step !== '')
      .map(step => new Breadcrumb(step, url)));
  }

  addFacetFilter(classId: string, facet: Facet, value: Value) {
    this.filters = this.filters.concat(new Filter(classId, facet, value));
    this.filtersSelection.next(this.filters);
  }

  removeFacetFilter(classId: string, facet: Facet, value: Value) {
    this.filters = this.filters.filter((filter: Filter) =>
      (filter.classId !== classId || filter.facet.id !== facet.id || filter.value.value !== value.value));
    this.filtersSelection.next(this.filters);
  }
}
