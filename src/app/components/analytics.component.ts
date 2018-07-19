import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material';

export interface ProductSale {
  year: string;
  product: string;
  country: string;
  totalrevenue: number;
}
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  
  PRODUCT_SALES_DATA: ProductSale[];
  productSales: ProductSale[] = [];
  displayedColumns: any[] = ['year', 'product', 'country', 'totalrevenue'];
  dataSource = new MatTableDataSource<ProductSale>();
  // Pie
  public pieChartLabels:string[] = ['Database', 'Server', 'Laptop'];
  public pieChartData:number[]=[];
  public pieChartType:string = 'pie';

  constructor(private apiService: ApiService) { }

  ngOnInit() { 
    this.getProdcutRevenue();    
  }

  getProdcutRevenue() : void {
    this.apiService.getProdcutRevenue()
    .subscribe(response => {
      this.PRODUCT_SALES_DATA = response;
      this.dataSource.data = this.PRODUCT_SALES_DATA ;
      this.pieChartData = this.filterByYearAndProduct(this.PRODUCT_SALES_DATA, 'All');
    });
  }

  filterByYearAndProduct(productSales: ProductSale[], year: string): number[]{
    if(year=='2012'){
    return(
      [ productSales.filter(item => item.product=='Database' && item.year=='2012')
    .map((item) => +item.totalrevenue)
    .reduce((sum, current) => sum+current),
    productSales.filter(item => item.product=='Server' && item.year=='2012')
    .map((item) => +item.totalrevenue)
    .reduce((sum, current) => sum+current),
    productSales.filter(item => item.product=='Laptop' && item.year=='2012')
    .map((item) => +item.totalrevenue)
    .reduce((sum, current) => sum+current) ]
    );
  }
  else if(year=='2013')
  return (
    [ productSales.filter(item => item.product=='Database' && item.year=='2013')
    .map((item) => +item.totalrevenue)
    .reduce((sum, current) => sum+current),
    productSales.filter(item => item.product=='Server' && item.year=='2013')
    .map((item) => +item.totalrevenue)
    .reduce((sum, current) => sum+current),
    productSales.filter(item => item.product=='Laptop' && item.year=='2013')
    .map((item) => +item.totalrevenue)
    .reduce((sum, current) => sum+current) ]
  )
  else
  return(
    [ productSales.filter(item => item.product=='Database')
    .map((item) => +item.totalrevenue)
    .reduce((sum, current) => sum+current),
    productSales.filter(item => item.product=='Server')
    .map((item) => +item.totalrevenue)
    .reduce((sum, current) => sum+current),
    productSales.filter(item => item.product=='Laptop')
    .map((item) => +item.totalrevenue)
    .reduce((sum, current) => sum+current) ]
  )
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        this.label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        //console.log(clickedElementIndex, label, value);
        this.filterTable(this.label, this.selected);
      }
    }
  }

  filterTable(type: string, year: string ){
    this.dataSource.data = this.PRODUCT_SALES_DATA.filter(item => item.product==type);
  }
 
  years = ['All','2012','2013'];
  selected = 'All';
  label = '';
  onSelect(selection): void{
    this.pieChartData = this.filterByYearAndProduct(this.PRODUCT_SALES_DATA, selection.value);
    this.applyFilter(selection.value);
  }

  applyFilter(filterValue: string) {
    this.dataSource.data = this.PRODUCT_SALES_DATA;
    this.label = '';
    if(filterValue == 'All'){
      filterValue = '';
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
}


