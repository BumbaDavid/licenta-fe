import { Pipe, PipeTransform } from '@angular/core';
import {Filter} from "../models/models";

@Pipe({
  name: 'filterCities'
})
export class FilterCitiesPipe implements PipeTransform {

  transform(items: Filter[], searchText: string): Filter[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(searchText))
  }
}
