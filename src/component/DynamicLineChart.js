import React, {Component} from 'react';
import CanvasJSReact from './canvasjs.react';
import {Client} from "@stomp/stompjs";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var today = new Date();
var istanbul = [{x: today, y: 0}];   //dataPoints.
var tokyo = [{x: today, y: 0}];   //dataPoints.
var london = [{x: today, y: 0}];   //dataPoints.
var moscow = [{x: today, y: 0}];   //dataPoints.
var beijing = [{x: today, y: 0}];   //dataPoints.


class DynamicLineChart extends Component {
    constructor() {
        super();
        this.updateChart = this.updateChart.bind(this);
        this.consumeWebSocket();

    }
    consumeWebSocket() {
        this.client = new Client();
        this.client.configure({
            brokerURL: 'ws://localhost:9030/stomp',
            onConnect: () => {
                console.log('onConnect');

                this.client.subscribe('/queue/now', message => {
                    console.log(message.body);
                    this.setState({serverTime: message.body});
                    this.updateChart(message.body);
                });
            }
        });

        this.client.activate();


    }

    updateNotChangeDataset(arr,cityName){
        var lastYval=arr[arr.length -1].y;
        arr[arr.length -1].indexLabel=null
        arr.push({x:new Date(),y:lastYval,indexLabel: cityName+":"+lastYval});
        console.log("x",cityName,lastYval);
    }

    updateChangeDataset(arr,cityName){
        debugger
        var lastYval=arr[arr.length -1].y;
        arr[arr.length -1].indexLabel=null
        arr.push({x:new Date(),y:lastYval+1,indexLabel: cityName+":"+(lastYval+1)});
        console.log("y",cityName,lastYval+1);

    }

    updateChart(log) {
        var obj = JSON.parse(log);
        if (obj.city == 'Istanbul') {
            this.updateChangeDataset(istanbul,"istanbul")
            this.updateNotChangeDataset(tokyo,"tokyo");
            this.updateNotChangeDataset(moscow,"moscow");
            this.updateNotChangeDataset(beijing,"beijing");
            this.updateNotChangeDataset(london,"london");

        } else if (obj.city == 'Tokyo') {


            this.updateChangeDataset(tokyo,"tokyo")
            this.updateNotChangeDataset(istanbul,"istanbul");
            this.updateNotChangeDataset(moscow,"moscow");
            this.updateNotChangeDataset(beijing,"beijing");
            this.updateNotChangeDataset(london,"london");

        } else if (obj.city == 'Moscow') {
            this.updateChangeDataset(moscow,"Moscow")
            this.updateNotChangeDataset(istanbul,"istanbul");
            this.updateNotChangeDataset(tokyo,"tokyo");
            this.updateNotChangeDataset(beijing,"beijing");
            this.updateNotChangeDataset(london,"london");


        } else if (obj.city == 'Beijing') {
            this.updateChangeDataset(beijing,"Beijing")
            this.updateNotChangeDataset(istanbul,"istanbul");
            this.updateNotChangeDataset(tokyo,"tokyo");
            this.updateNotChangeDataset(moscow,"moscow");
            this.updateNotChangeDataset(london,"london");
        } else if (obj.city == 'London') {
            this.updateChangeDataset(london,"London")
            this.updateNotChangeDataset(istanbul,"istanbul");
            this.updateNotChangeDataset(tokyo,"tokyo");
            this.updateNotChangeDataset(moscow,"moscow");
            this.updateNotChangeDataset(beijing,"beijing");
        }
        if (istanbul.length > 50) {
            istanbul.shift();
        }
        if (tokyo.length > 50) {
            tokyo.shift();
        }
        if (moscow.length > 50) {
            moscow.shift();
        }
        if (beijing.length > 50) {
            beijing.shift();
        }
        if (london.length > 50) {
            london.shift();
        }
        this.chart.render();
    }

    render() {
        const options = {
            title: {
                text: "Docker Service Live Log Count Graph by Cıty"
            },
            toolTip:{
                content: "{name}: {y}"
            },
            data: [{
                type: "spline",
                dataPoints: istanbul,
                name:"istanbul",
                color:"red",
                showInLegend: true,
            }, {
                type: "spline",
                dataPoints:tokyo ,
                name:"tokyo",
                color:"yellow",
                showInLegend: true,


            }, {
                type: "spline",
                dataPoints: moscow,
                name:"moscow",
                color:"green",
                showInLegend: true,

            }, {
                type: "spline",
                dataPoints: beijing,
                name:"beijing",
                color:"black",
                showInLegend: true,


            }, {
                type: "spline",
                dataPoints: london,
                name:"london",
                color:"grey",
                showInLegend: true,

            }]
        }

        return (
            <div>
                    <CanvasJSChart options={options}
                                   onRef={ref => this.chart = ref}/>
            </div>
        );
    }
}

export default DynamicLineChart;