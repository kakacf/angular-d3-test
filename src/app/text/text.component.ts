import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

    private svgFruits;
    private fruits: any[] = ['蘋果', '香蕉', '芭樂', '西瓜'];

    constructor() { }

    ngOnInit(): void {
        this.drawText();
    }

    private drawText(): void {
        this.svgFruits = d3.select('.container-fluid').selectAll('p');
        const update = this.svgFruits.data(this.fruits);
        const enter = update.enter();
        const exit = update.exit();

        update.text((d: any, i: any) => {
            return d + ' ' + i;
        });
        enter.append('p')
            .text((d: any, i: any) => {
                return d + ' ' + i;
            });
        exit.remove();

    }

}
