import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import geodata from '../../data/taiwanMap2.json';

/**
 * 參考：
 */


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    private data: any = geodata; // 經緯度資料
    private svg: any;
    private margin = 50;
    private width: number = 750 - (this.margin * 2);
    private height: number = 400 - (this.margin * 2);

    private colorArray: any[] = [
        '#17a2b8'

    ];

    enCity: string;
    chCity: string;

    // url = 'https://drive.google.com/file/d/1K5Yg4iHwy7VBL4CNz0vEBPrbMiXrTYcL/view?usp=sharing';

    constructor() { }

    ngOnInit(): void {

        this.createSvg('map');
        this.drawMap(this.data);

        // this.drawMap2();

        // console.log('!!!!', geodata);


    }

    private createSvg(id: string): void {
        this.svg = d3.select('figure#' + id)
            .append('svg')
            .attr('fill', 'none')
            .attr('width', this.width + (this.margin * 2))
            .attr('height', this.height + (this.margin * 2))
            .append('g')
            .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
    }


    // private drawMap2(): void {
    //     d3.json(this.url, (error: any, geometry: any): void  => {
    //         console.log('json~', JSON.parse(geometry));
    //         // this.svg.selectAll('path')



    //     });


    // }

    private drawMap(data: any): void {

        const projection = d3.geoMercator() // 定義一個投影函式
            .center([121, 24])
            .scale(6000) // 縮放比例尺
            .translate([this.width / 2, this.height / 3]);

        const path = d3.geoPath(projection); // 用來產生供 path 路徑標籤所使用的 d

        let map: any = this.svg.selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('stroke', 'black')
        .attr('stroke-width', '2px')
        .attr('d', path)
        .attr('fill', (d, i, a) => {
            console.log('fill d', d);
            console.log('fill i', i);
            console.log('fill a', a);
            // return 'transparent';
            return this.colorArray[i];
        })
        // .attr('pointer-events', 'all')
        .attr('id', (d) => {
            // console.log('id d', d);
            return 'city' + d.properties.COUNTYCODE;
        })
        .on('click', (d, i) => {
            console.log('click d', d);
            console.log('click i', i);
            this.enCity = i.properties.COUNTYNAME; // 換中文名
            this.chCity = i.properties.COUNTYENG; // 換英文名
            // 有 .active 存在，就移除 .active
            if (document.querySelector('.active')) {
                document.querySelector('.active').classList.remove('active');
            }
            // 被點擊的縣市加上 .active
            document.getElementById('city' + i.properties.COUNTYCODE).classList.add('active');
            // d3.select(this).attr('fill', 'red');
        });



    }




}
