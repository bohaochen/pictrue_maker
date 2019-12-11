import { fabric } from "fabric";

export function bindItems(parent, childrens) {
    //类似于ps的绑定组的操作，
    parent.on('moving', updateMinions.bind(this, parent, childrens));
    parent.on('rotating', updateMinions.bind(this, parent, childrens));
    parent.on('scaling', updateMinions.bind(this, parent, childrens));
    bindFn(parent, childrens)
    childrens.map((item) => {
        item.on('modified', () => {
            bindFn(parent, childrens)
        })
    })
}

var multiply = fabric.util.multiplyTransformMatrices;
var invert = fabric.util.invertTransform;

function updateMinions(parent, childrens) {
    var minions = childrens;
    var boss = parent;
    minions.forEach(o => {
        if (!o.relationship) {
            return;
        }
        var relationship = o.relationship;
        var newTransform = multiply(
            boss.calcTransformMatrix(),
            relationship
        );
        var opt = fabric.util.qrDecompose(newTransform);
        o.set({
            flipX: false,
            flipY: false,
        });
        o.setPositionByOrigin(
            { x: opt.translateX, y: opt.translateY },
            'center',
            'center'
        );
        o.set(opt);
        o.setCoords();
    });
}

function bindFn(parent, childrens) {
    var minions = childrens;
    var bossTransform = parent.calcTransformMatrix();
    var invertedBossTransform = invert(bossTransform);
    minions.forEach(o => {
        var desiredTransform = multiply(
            invertedBossTransform,
            o.calcTransformMatrix()
        );
        o.relationship = desiredTransform;
    });
}


export function addAndMakeGroup(canvas, params) {
    //绑定成组
    var { left = 10, top = 10, width = 100, height = 100, fill = "rgba(0,0,0,0.5)", childrens = [] } = params;
    var rect = new fabric.Rect({
        left,
        top,
        width,
        height,
        fill,
        lockScalingFlip: true,
        lockUniScaling:true
    })
    rect.setControlsVisibility({
        mb:false,
        ml:false,
        mr:false,
        mt:false,
    })
    canvas.add(rect)
    rect.on("mouseover", () => {
        rect.set({ strokeWidth: 2, stroke: 'rgba(100,200,200,0.5)' })
        canvas.renderAll();
    });
    rect.on("mouseout", () => {
        rect.set({ strokeWidth: 0 })
        canvas.renderAll();
    });
    childrens.map((item) => {
        item.on("mouseover", () => {
            rect.set({ strokeWidth: 2, stroke: 'rgba(100,200,200,0.5)' })
            canvas.renderAll();
        });
        item.on("mouseout", () => {
            rect.set({ strokeWidth: 0 })
            canvas.renderAll();
        });

        canvas.add(item)
    })
    bindItems(rect, childrens)
}
