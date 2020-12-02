import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

/**
 * 參考：https://ithelp.ithome.com.tw/articles/10204914
 */

@Component({
  selector: 'app-bar1',
  templateUrl: './bar1.component.html',
  styleUrls: ['./bar1.component.scss']
})
export class Bar1Component implements OnInit {

  private dataSet: any[] = [70, 130, 120, 95, 80, 170, 143];
  private svg: any;
  private width = 400;  // svg寬度
  private height = 400; // svg高度
  private padding: { top: number; right: number;  bottom: number; left: number} = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  }; // 內距
  private graphicHeight: number = this.height - this.padding.top - this.padding.bottom; // 圖表高度為svg高度扣掉內距
  private rectStep = 35; // 各別長條圖的距離
  private rectWidth = 30; // 長條圖的寬度
  private maxValue = 200; // 數值最大值

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBar(this.dataSet);
    this.writeText(this.dataSet);
  }

  private createSvg(): void {
    this.svg = d3.select('figure#bar-1')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height);
  }

  /**
   * <rect>為svg繪製矩型的元素，這邊使用fill填寫、x和y設定坐標、width和height設定寬高。
   * 要注意的是，x 和 y軸的起點是從左上角為起點往右下方延伸的。
   */
  private drawBar(data: any[]): void {
    let rect: any = this.svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('fill', 'steelblue')
    .attr('x', (d, i) => {
        return this.padding.left + (i * this.rectStep);
    })
    .attr('y', (d) => {
      return this.height - this.padding.bottom - this.graphicHeight * (d / this.maxValue); // 畫面高度扣掉長條圖高度作為繪製長條圖的起點
    })
    .attr('width', this.rectWidth)
    .attr('height', (d) => {
      return this.graphicHeight * (d / this.maxValue); // 使用maxValue最大值作為畫面高度100%計算該筆資料佔畫面的百分比
    });
  }

  private writeText(data: any[]): void {
    let text: any = this.svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('fill', 'white')
    .attr('font-size', '14px')
    .attr('text-anchor', 'middle')
    .attr('x', (distance: number, i: number) => {
      return this.padding.left + (i * this.rectStep);
    })
    .attr('y', (distance: number) => {
      return this.height - this.padding.bottom - this.graphicHeight * (distance / this.maxValue)
    })
    .attr('dx', this.rectWidth / 2)
    .attr('dy', '2em')
    .text((distance: number) => {
        return distance;
    });

    console.log('text', typeof text);
  }


}
