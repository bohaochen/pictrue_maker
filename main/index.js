import { fabric } from "fabric";
import { addAndMakeGroup } from "./utilsForFabric.js"
// console.log(fabric)
window.onload = function () {
    function printInPage(obj) {
        var dom = document.getElementById("content");
        if (!dom) {
            var objE = document.createElement("div");
            objE.id = "content"
            var objC = document.createElement("canvas");
            objC.id = "canvas"
            objC.style.border = "1px solid red";
            objC.width = "800";
            objC.height = "500";
            dom = document.getElementsByTagName("body")[0].appendChild(objE)
            document.getElementsByTagName("body")[0].appendChild(objC)
        };
        dom.innerText = JSON.stringify(obj);
    }
    var imgObj = {
        type: "搞不懂"
    }
    printInPage(imgObj)

    var canvas = new fabric.Canvas("canvas");
    var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "blue",
        width: 20,
        height: 20
    })
    var rect1 = new fabric.Rect({
        left: 0,
        top: 0,
        fill: "red",
        width: 30,
        height: 210
    })

    var text = new fabric.Text('hello world', {
        fontSize: 30,
        originX: '中心',
        originY: "中心"
    });

    var group = new fabric.Group([rect, text], {
        left: 1,
        top: 20,
        angle: 0
    })


    canvas.add(group)
    canvas.add(rect1)

    rect.set("angle", 8)
    canvas.renderAll();



    var titleText = new fabric.Textbox(
        "好\n电\n影",
        {
            fontFamily: "微软雅黑",
            color: "#000",
            lockSkewingY: true,
            // stroke: '#ff1318',
            // strokeWidth: 4
        });
    var subheadText = new fabric.Textbox(
        "离不开好电影",
        {
            fontFamily: "宋体",
            lockSkewingY: true,
            stroke: '#ff1318',
            strokeWidth: 4
        });

    addAndMakeGroup(canvas, {
        childrens: [titleText, subheadText],
        left: 10,
        top: 10,
        width: 200,
        height: 200,
    })

}