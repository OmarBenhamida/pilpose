import { MatPaginatorIntl } from '@angular/material/paginator';


export function CustomPaginator() {

  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Nombre d\'élements par page :';

  return customPaginatorIntl;

}