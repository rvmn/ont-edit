// ----------------------------------------------------------------------------
// begin inspired on: http://raphaeljs.com/graffle.html
// ----------------------------------------------------------------------------
var makeConnection = function(obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
    bb2 = obj2.getBBox(),
    rpo = -2,
    rpd = -2,
    d = {},
    dis = [],
    res = [],
    path = "",
    ahPath = "",
    sd = "",
    mx1 = bb1.x + bb1.width / 2,
    my1 = bb1.y + bb1.height / 2,
    mx2 = bb2.x + bb2.width / 2,
    my2 = bb2.y + bb2.height / 2;

    var p = [{
        x: bb1.x + bb1.width / 2,
        y: bb1.y - rpo
    },
    {
        x: bb1.x + bb1.width / 2,
        y: bb1.y + bb1.height + rpo
    },
    {
        x: bb1.x - rpo,
        y: bb1.y + bb1.height / 2
    },
    {
        x: bb1.x + bb1.width + rpo,
        y: bb1.y + bb1.height / 2
    },
    {
        x: bb2.x + bb2.width / 2,
        y: bb2.y - rpd
    },
    {
        x: bb2.x + bb2.width / 2,
        y: bb2.y + bb2.height + rpd
    },
    {
        x: bb2.x - rpd,
        y: bb2.y + bb2.height / 2
    },
    {
        x: bb2.x + bb2.width + rpd,
        y: bb2.y + bb2.height / 2
    }];

    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
            dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }

    if (dis.length == 0) {
        res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }

    var x1 = p[res[0]].x,
    y1 = p[res[0]].y,
    x4 = p[res[1]].x,
    y4 = p[res[1]].y,
    dx = Math.max(Math.abs(x1 - x4) / 2, 10),
    dy = Math.max(Math.abs(y1 - y4) / 2, 10),
    x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
    y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
    x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
    y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3),
    xi = x1.toFixed(0),
    yi = y1.toFixed(0),
    xf = x4.toFixed(0),
    yf = y4.toFixed(0);

    if (obj1.definition.type == "property") {
        path = ["M", xi, yi, "C", x2, y2, x3, y3, xf, yf].join(",");
        //sd = ".";
        sd = "none";
        ahPath = ["M", xf, yf].join(",");
    } else {

        sd = "none";

        yin = my1 * ( - 1);
        yfn = my2 * ( - 1);

        var m, n, xMiddle, yMiddle;

        if (mx1 == mx2) {
            xMiddle = mx1;
            yMiddle = my1 + ((my2 - my1) / 2);
        } else {
            m = (yfn - yin) / (mx2 - mx1);
            n = ((yin * mx2) - (yfn * mx1)) / (mx2 - mx1);
            xMiddle = mx1 + ((mx2 - mx1) / 2);
            yMiddle = ((m * xMiddle) + n) * -1;
        }
        var ang = Math.atan2(my2 - my1, mx2 - mx1);
        var ip1 = intersectionShapeAndSegment(obj1, mx1, my1, mx2, my2);
        var ip2 = intersectionShapeAndSegment(obj2, mx1, my1, mx2, my2);

        if (ip1 == undefined) {
            ip1 = new Vector(mx1, my1);
        }
        if (ip2 == undefined) {
            ip2 = new Vector(mx2, my2);
        }

        path = ["M", ip1.x, ip1.y, "L", ip2.x, ip2.y].join(",");
        ahPath = pathFilledPolygon(translateShape(rotateShape(arrow_shape, ang), ip2.x, ip2.y));
        delete ip1,
        ip2;
    }

    if (line && line.line) {
        line.bg && line.bg.attr({
            path: path
        });
        line.line.attr({
            path: path
        });
        line.ahead.attr({
            path: ahPath
        });
    } else {
        var color = typeof line == "string" ? line: "#000";
        var colorBg = bg.split("|")[0];

        var b = bg && bg.split && raphaelCanvas.path({
            opacity: 0,
            stroke: colorBg,
            "stroke-width": bg.split("|")[1] || 3
        },
        path);
        var ah = raphaelCanvas.path({
            stroke: color,
            fill: color,
            "stroke-width": 1
        },
        ahPath);
        var l = raphaelCanvas.path({
            stroke: color,
            "stroke-width": 2,
            "stroke-dasharray": sd
        },
        path);

        var toReturn = {
            line: l,
            bg: b,
            ahead: ah,
            from: obj1,
            to: obj2
        }
        if (obj1.READONLY == undefined) {
            applyToConnectionShape(ah, toReturn);
            applyToConnectionShape(l, toReturn);
            applyToConnectionShape(b, toReturn);
        } else {
            applyToConnectionShapeReadOnly(ah, toReturn);
            applyToConnectionShapeReadOnly(l, toReturn);
            applyToConnectionShapeReadOnly(b, toReturn);
        }
        return toReturn;
    }

}

var funcConnectionShapeDblclick = function() {
    showDetailConnectionUuid(this.conn.uuid);
};

var funcConnectionShapeMouseover = function() {
    if (!isDragSomething()) {
        this.conn.bg.attr({
            stroke: "yellow",
            opacity: 1
        })
    }
};

var functionConnectionShapeMouseout = function() {
    if (!isDragSomething()) {
        this.conn.bg.attr({
            opacity: 0
        })
    }
};

var applyToConnectionShapeReadOnly = function(shape, conn) {
    shape.toBack();
    shape.conn = conn;
    shape.mouseover(funcConnectionShapeMouseover);
    shape.mouseout(functionConnectionShapeMouseout);
}

var applyToConnectionShape = function(shape, conn) {
    shape.toBack();
    shape.conn = conn;
    shape.mouseover(funcConnectionShapeMouseover);
    shape.mouseout(functionConnectionShapeMouseout);
    shape.click(funcConnectionShapeDblclick);
}
// ----------------------------------------------------------------------------
// end from: http://raphaeljs.com/graffle.html
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// begin inspired on: http://deepliquid.com/blog/archives/98
// ----------------------------------------------------------------------------
var arrow_shape = [[ - 10, -4], [ - 8, 0], [ - 10, 4], [0, 0]];

var translateShape = function(shape, x, y) {
    var rv = [];
    for (p in shape)
    rv.push([shape[p][0] + x, shape[p][1] + y]);
    return rv;
};

var rotateShape = function(shape, ang) {
    var rv = [];
    for (p in shape)
    rv.push(rotatePoint(ang, shape[p][0], shape[p][1]));
    return rv;
};

var rotatePoint = function(ang, x, y) {
    return [(x * Math.cos(ang)) - (y * Math.sin(ang)), (x * Math.sin(ang)) + (y * Math.cos(ang))];
};

var pathFilledPolygon = function(shape) {
    var arrPath = [];

    arrPath.push("M");
    arrPath.push(shape[0][0]);
    arrPath.push(shape[0][1]);

    for (p in shape) {
        arrPath.push("L");
        arrPath.push(shape[p][0]);
        arrPath.push(shape[p][1]);
    }

    arrPath.push("L");
    arrPath.push(shape[0][0]);
    arrPath.push(shape[0][1]);

    return arrPath.join(",");
};
// ----------------------------------------------------------------------------
// end from: http://deepliquid.com/blog/archives/98
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// begin from: http://bloggingmath.wordpress.com/2009/05/29/line-segment-intersection/
// ----------------------------------------------------------------------------
var Vector = function(x, y) {
    this.x = x;
    this.y = y;
    this.scalarMult = function(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    this.dot = function(v2) {
        return this.x * v2.x + this.y * v2.y;
    };
    this.perp = function() {
        return new Vector( - 1 * this.y, this.x);
    };
    this.subtract = function(v2) {
        return this.add(v2.scalarMult( - 1));
    };
    this.add = function(v2) {
        return new Vector(this.x + v2.x, this.y + v2.y);
    }
}

var Segment = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
}

var cross = function(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
}

// ----------------------------------------------------------------------------
/*
 * seg1 is represented by p + t * r where 0 <= t <= 1 seg2 is represented by 
 * q + u * s where 0 <= u <= 1
 * 
 * the intersection of line 1 and line 2 is given by p + t*r = q + u*s, let x be
 * the two dimensional cross product then (p + t*r) x s = (q + u*s) x s = q x s
 * which solving for t gives t = (q - p) x s / (r x s). similarly solving for u
 * gives u = (q - p) x r / (r x s). the segments intersect if 0 <= t <= 1 and 0 <=
 * 1 <= u. If r x s is zero then the lines are parallel, in which case if (q -
 * p) x r = 0 then the lines are co-linear.
 * 
 */
// ----------------------------------------------------------------------------
var epsilon = 10e-6;
var DONT_INTERSECT = 0;
var PARALLEL_DONT_INTERSECT = 1;
var COLINEAR_DONT_INTERSECT = 2;
var INTERSECT = 3;
var COLINEAR_INTERSECT = 4;
var intersect = function(seg1, seg2, intersectionPoint) {
    var p = seg1.p1;
    var r = seg1.p2.subtract(seg1.p1);
    var q = seg2.p1;
    var s = seg2.p2.subtract(seg2.p1);
    var rCrossS = cross(r, s);
    if (rCrossS <= epsilon && rCrossS >= -1 * epsilon) {
        return PARALLEL_DONT_INTERSECT;
    }
    var t = cross(q.subtract(p), s) / rCrossS;
    var u = cross(q.subtract(p), r) / rCrossS;
    if (0 <= u && u <= 1 && 0 <= t && t <= 1) {
        var intPoint = p.add(r.scalarMult(t));
        intersectionPoint.x = intPoint.x;
        intersectionPoint.y = intPoint.y;
        return INTERSECT;
    } else {
        return DONT_INTERSECT;
    }
}

var intersectionShapeAndSegment = function(shape, x1, y1, x2, y2) {
    var seg = new Segment(new Vector(x1, y1), new Vector(x2, y2));

    var shape_x = shape.getBBox().x;
    var shape_y = shape.getBBox().y;
    var shape_width = shape.getBBox().width;
    var shape_height = shape.getBBox().height;

    var A = new Vector(shape_x, shape_y);
    var B = new Vector(shape_x + shape_width, shape_y);
    var C = new Vector(shape_x + shape_width, shape_y + shape_height);
    var D = new Vector(shape_x, shape_y + shape_height);

    var seg_top = new Segment(A, B);
    var seg_right = new Segment(B, C);
    var seg_bottom = new Segment(C, D);
    var seg_left = new Segment(D, A);

    var intersectionPoint = new Vector(0, 0);
    if (intersect(seg, seg_top, intersectionPoint) == INTERSECT) {
        delete A,
        B,
        C,
        D,
        seg,
        seg_top,
        seg_right,
        seg_bottom,
        seg_left;
        return intersectionPoint;
    }
    if (intersect(seg, seg_right, intersectionPoint) == INTERSECT) {
        delete A,
        B,
        C,
        D,
        seg,
        seg_top,
        seg_right,
        seg_bottom,
        seg_left;
        return intersectionPoint;
    }
    if (intersect(seg, seg_bottom, intersectionPoint) == INTERSECT) {
        delete A,
        B,
        C,
        D,
        seg,
        seg_top,
        seg_right,
        seg_bottom,
        seg_left;
        return intersectionPoint;
    }
    if (intersect(seg, seg_left, intersectionPoint) == INTERSECT) {
        delete A,
        B,
        C,
        D,
        seg,
        seg_top,
        seg_right,
        seg_bottom,
        seg_left;
        return intersectionPoint;
    }
    delete A,
    B,
    C,
    D,
    seg,
    seg_top,
    seg_right,
    seg_bottom,
    seg_left;
}
// ----------------------------------------------------------------------------
// end from: http://bloggingmath.wordpress.com/2009/05/29/line-segment-intersection/
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
/* 
http://en.wikipedia.org/wiki/Topological_sorting

L <- Empty list that will contain the sorted elements
S <- Set of all nodes with no incoming edges
while S is non-empty do
	remove a node n from S
	insert n into L
	for each node m with an edge e from n to m do
		remove edge e from the graph
		if m has no other incoming edges then
			insert m into S
if graph has edges then
	output error message (graph has at least one cycle)
else 
	output message (proposed topologically sorted order: L)
 */
// ----------------------------------------------------------------------------
var cycleDetector = function(newFrom, newTo) {
    var L = [];
    var S = [];
    var edges = [];

    for (var j = 0; j < arrConnections.length; j++) {
        var conn = arrConnections[j];
	if (conn.shapes == "cc") {
            edges.push({
                from: conn.from,
                to: conn.to
            });
        }
    }
    edges.push({
        from: newFrom,
        to: newTo
    });

    for (var i = 0; i < arrClass.length; i++) {
        var clsUuid = arrClass[i].shape.definition.uuid;
        if (!hasIncomming(edges, clsUuid)) {
            S.push(clsUuid);
        }
    }

    while (S.length) {
        var n = S.pop();
        L.push(n);
        var edgesFromN = [];
        for (var j = 0; j < edges.length; j++) {
            var e = edges[j];
            if (e.from == n) {
                edgesFromN.push(e);
            }
        }

        while (edgesFromN.length) {
            var m = edgesFromN.pop().to;
            removeFromTo(edges, n, m);
            if (!hasIncomming(edges, m)) {
                S.push(m);
            }
        }
    }

    return edges.length;
}

var hasIncomming = function(edges, node) {
    for (var j = 0; j < edges.length; j++) {
        if (edges[j].to == node) {
            return true;
        }
    }
    return false;
}

var removeFromTo = function(edges, from, to) {
    for (var j = 0; j < edges.length; j++) {
        var e = edges[j];
        if (e.from == from && e.to == to) {
            edges.splice(j, 1);;
        }
    }
}
// ----------------------------------------------------------------------------
// end wikipedia 
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// begin from: http://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript
// ----------------------------------------------------------------------------
function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}
// ----------------------------------------------------------------------------
// end from: http://stackoverflow.com/questions/376373/pretty-printing-xml-with-javascript
// ----------------------------------------------------------------------------
