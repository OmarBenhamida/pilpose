import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { CustomPaginator } from './custom-paginator';

@Component({
  selector: 'app-avo-datatable',
  templateUrl: './avo-datatable.component.html',
  styleUrls: ['./avo-datatable.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class AvoDatatableComponent implements OnInit {
  /**
   * matHeaderCellDef
   */
  @Input() nameDisplayedColumns: any = [];

  @Input() onglet: string = '';

  /**
   *  matColumnDef
   */
  @Input() displayedColumns: any = [];
  @Input() isTransit: boolean = false;

  /**
   *  datasource   parent
   */
  @Input() dataSource!: MatTableDataSource<any>;

  /**
   * size of datasource.data
   */

  @Input() size: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageSizeArray: number[] = [10,25,100];
  @Input() dynamicLoadingData: boolean = false;

  durationInSeconds = 5;
  selectedRows = [];
  selectedRowsValid: boolean = true;

  @Output() sendObject = new EventEmitter();
  @Output() sendAction = new EventEmitter();
  @Output() sendAction2 = new EventEmitter();
  @Output() pageChange = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public translate: TranslateService,
    public dialog: MatDialog
  ) { }

  /** 
    @title : Set the paginator and sort after the view init since this component will
             be able to query its view for the initialized paginator and sort.
    @rgs : N/A 
    @msg : N/A
    @author : Mohamed BENAZZOUZ
    @created : 01/11/2021 
    @updated : 01/11/2021 
    @param : N/A
    @return: N/A
    */
  ngAfterViewInit() {
    /** do not executer the line below for dynamic loading data(on change page) */
    if(!this.dynamicLoadingData){
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }
  /** 
    @title :  recuperer data from datasource
    @rgs : N/A 
    @msg : N/A
    @author : Mohamed BENAZZOUZ
    @created : 01/11/2021 
    @updated : 01/11/2021 
    @param : N/A
    @return: N/A
    */

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** 
    @title :  function who filter the data
    @rgs : N/A 
    @msg : N/A
    @author : Mohamed BENAZZOUZ
    @created : 01/11/2021 
    @updated : 01/11/2021 
    @param : N/A
    @return: N/A
    */
  applyFilter(filterValue: any, column: any) {

    this.dataSource.filterPredicate = (data: any, filter: any) => {


      if (typeof data[column] == "string") {
        if (data[column]) {
          return data[column]
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .includes(filter);
        }
      }

    };
    this.dataSource.filter = filterValue.value
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  updateAndDeleteCommissionSva(event: any, action: any) {
    this.sendAction.next([event, action]);
  }

  addToTree(prestation: any) {
    this.sendObject.emit(prestation);
  }

  checkBooleanVal(data: any): boolean{
    return typeof data === 'boolean';
  }

  onPageChange(data: any){
    this.pageChange.emit(data);
  }

}
