var link_shape = [[0, 6], [2, 8], [6, 4], [8, 6], [8, 0], [2, 0], [4, 2]];

var draggerWireClass = function(e) {
    if (!isDragWireClass) {
        this.dot = {
            iniX: this.getBBox().x,
            iniY: this.getBBox().y,
            conn: makeConnection(getClass(this.fromClass).shape, this, "#000", "#ccc|2")
        };
    }
    this.dx = e.clientX;
    this.dy = e.clientY;
    isDragWireClass = this;
}

var draggerWireProperty = function(e) {
    if (!isDragWireProperty) {
        this.dot = {
            iniX: this.getBBox().x,
            iniY: this.getBBox().y,
            conn: makeConnection(getProperty(this.fromProperty).shape, this, "#f00", "#f00|2")
        };
    }
    this.dx = e.clientX;
    this.dy = e.clientY;
    isDragWireProperty = this;
}

var draggerWireIndividual = function(e) {
    if (!isDragWireIndividual) {
        this.dot = {
            iniX: this.getBBox().x,
            iniY: this.getBBox().y,
            conn: makeConnection(getIndividual(this.fromIndividual).shape, this, "#000", "#ccc|2")
        };
    }
    this.dx = e.clientX;
    this.dy = e.clientY;
    isDragWireIndividual = this;
}

var draggerIndividual = function(e) {
    this.dx = e.clientX;
    this.dy = e.clientY;
    isDragIndividual = this;
    updateDetail();
}

var draggerClass = function(e) {
    this.dx = e.clientX;
    this.dy = e.clientY;
    isDragClass = this;
    updateDetail();
}

var draggerProperty = function(e) {
    this.dx = e.clientX;
    this.dy = e.clientY;
    isDragProperty = this;
    updateDetail();
}

document.onmousemove = function(e) {
    e = e || window.event;
    if (isDragWireIndividual) {
        isDragWireIndividual.translate(e.clientX - isDragWireIndividual.dx, e.clientY - isDragWireIndividual.dy);
        isDragWireIndividual.dx = e.clientX;
        isDragWireIndividual.dy = e.clientY;
        // actualiza la linea
        makeConnection(isDragWireIndividual.dot.conn);
        var x = isDragWireIndividual.getBBox().x;
        var y = isDragWireIndividual.getBBox().y;
        var iFromIndividual = getIndiceIndividual(isDragWireIndividual.fromIndividual);
        for (var i = 0; i < arrClass.length; i++) {
                var sx = arrClass[i].shape.getBBox().x,
                sy = arrClass[i].shape.getBBox().y,
                sw = arrClass[i].shape.getBBox().width,
                sh = arrClass[i].shape.getBBox().height;
                if ((x > sx) && (x < (sx + sw)) && (y > sy) && (y < (sy + sh))) {
                    var isConnected = false;
                    fromUuid = arrIndividuals[iFromIndividual].shape.definition.uuid;
                    for (var j = 0; j < arrConnections.length; j++) {
                        if (arrConnections[j].from == fromUuid && arrConnections[j].to == arrClass[i].shape.definition.uuid) {
                            isConnected = true;
                        }
                        if (arrConnections[j].to == fromUuid && arrConnections[j].from == arrClass[i].shape.definition.uuid) {
                            isConnected = true;
                        }
                    }
                    if (!isConnected) {
                            arrClass[i].shape.attr({
                                "stroke-width": 3
                            });
                            inClass = i;
                    }
                } else if (inClass == i) {
                    arrClass[i].shape.attr({
                        "stroke-width": 1
                    });
                    inClass = -1;
                }
        }
        raphaelCanvas.safari();
    }
    if (isDragWireClass) {
        isDragWireClass.translate(e.clientX - isDragWireClass.dx, e.clientY - isDragWireClass.dy);
        isDragWireClass.dx = e.clientX;
        isDragWireClass.dy = e.clientY;
        // actualiza la linea
        makeConnection(isDragWireClass.dot.conn);
        var x = isDragWireClass.getBBox().x;
        var y = isDragWireClass.getBBox().y;
        var iFromClass = getIndiceClass(isDragWireClass.fromClass);
        for (var i = 0; i < arrClass.length; i++) {
            if (i != iFromClass) {
                var sx = arrClass[i].shape.getBBox().x,
                sy = arrClass[i].shape.getBBox().y,
                sw = arrClass[i].shape.getBBox().width,
                sh = arrClass[i].shape.getBBox().height;
                if ((x > sx) && (x < (sx + sw)) && (y > sy) && (y < (sy + sh))) {
                    var isConnected = false;
                    fromUuid = arrClass[iFromClass].shape.definition.uuid;
                    for (var j = 0; j < arrConnections.length; j++) {
                        if (arrConnections[j].from == fromUuid && arrConnections[j].to == arrClass[i].shape.definition.uuid) {
                            isConnected = true;
                        }
                        if (arrConnections[j].to == fromUuid && arrConnections[j].from == arrClass[i].shape.definition.uuid) {
                            isConnected = true;
                        }
                    }
                    if (!isConnected) {
                        var hasCycle = cycleDetector(fromUuid, arrClass[i].shape.definition.uuid);
                        if (!hasCycle) {
                            arrClass[i].shape.attr({
                                "stroke-width": 3
                            });
                            inClass = i;
                        }
                    }
                } else if (inClass == i) {
                    arrClass[i].shape.attr({
                        "stroke-width": 1
                    });
                    inClass = -1;
                }
            }
        }
        raphaelCanvas.safari();
    }
    if (isDragWireProperty) {
        isDragWireProperty.translate(e.clientX - isDragWireProperty.dx, e.clientY - isDragWireProperty.dy);
        isDragWireProperty.dx = e.clientX;
        isDragWireProperty.dy = e.clientY;
        // actualiza la linea
        makeConnection(isDragWireProperty.dot.conn);
        var x = isDragWireProperty.getBBox().x,
        y = isDragWireProperty.getBBox().y;
        var iFromProperty = getIndiceProperty(isDragWireProperty.fromProperty);
        for (var i = 0; i < arrClass.length; i++) {
            if (i != iFromClass) {
                var sx = arrClass[i].shape.getBBox().x,
                sy = arrClass[i].shape.getBBox().y,
                sw = arrClass[i].shape.getBBox().width,
                sh = arrClass[i].shape.getBBox().height;
                if ((x > sx) && (x < (sx + sw)) && (y > sy) && (y < (sy + sh))) {
                    arrClass[i].shape.attr({
                        "stroke-width": 3
                    });
                    inClass = i;
                } else if (inClass == i) {
                    arrClass[i].shape.attr({
                        "stroke-width": 1
                    });
                    inClass = -1;
                }
            }
        }
        raphaelCanvas.safari();
    }
    if (isDragClass) {
        isDragClass.translate(e.clientX - isDragClass.dx, e.clientY - isDragClass.dy);
        isDragClass.wire.translate(e.clientX - isDragClass.dx, e.clientY - isDragClass.dy);
        isDragClass.close.translate(e.clientX - isDragClass.dx, e.clientY - isDragClass.dy);
        isDragClass.text.translate(e.clientX - isDragClass.dx, e.clientY - isDragClass.dy);
        isDragClass.lineText.translate(e.clientX - isDragClass.dx, e.clientY - isDragClass.dy);
        isDragClass.definition.position.x = isDragClass.getBBox().x;
        isDragClass.definition.position.y = isDragClass.getBBox().y;
        for (var i = 0; i < arrProperties.length; i++) {
            if (arrProperties[i].shape.definition.domain == isDragClass.definition.uuid) {
                arrProperties[i].shape.translate(e.clientX - isDragClass.dx, e.clientY - isDragClass.dy);
                arrProperties[i].shape.wire.translate(e.clientX - isDragClass.dx, e.clientY - isDragClass.dy);
                arrProperties[i].shape.close.translate(e.clientX - isDragClass.dx, e.clientY - isDragClass.dy);
                arrProperties[i].shape.link.translate(e.clientX - isDragClass.dx, e.clientY - isDragClass.dy);
                arrProperties[i].shape.text.translate(e.clientX - isDragClass.dx, e.clientY - isDragClass.dy);
                arrProperties[i].shape.definition.position.x = arrProperties[i].shape.getBBox().x;
                arrProperties[i].shape.definition.position.y = arrProperties[i].shape.getBBox().y;
            }
        }
        isDragClass.dx = e.clientX;
        isDragClass.dy = e.clientY;
        redrawConnectionsUuid(isDragClass.definition.uuid);
        raphaelCanvas.safari();
    }
    if (isDragIndividual) {
	var dx = e.clientX - isDragIndividual.dx;
	var dy = e.clientY - isDragIndividual.dy;

        isDragIndividual.translate(dx,dy);
        isDragIndividual.wire.translate(dx,dy);
        isDragIndividual.close.translate(dx,dy);
        isDragIndividual.text.translate(dx,dy);
        isDragIndividual.circleTop.translate(dx,dy);
        isDragIndividual.circleBottom.translate(dx,dy);
        isDragIndividual.definition.position.x = isDragIndividual.getBBox().x;
        isDragIndividual.definition.position.y = isDragIndividual.getBBox().y;
        isDragIndividual.dx = e.clientX;
        isDragIndividual.dy = e.clientY;
        redrawConnectionsUuid(isDragIndividual.definition.uuid);
        raphaelCanvas.safari();
    }
    if (isDragProperty) {
        isDragProperty.translate(e.clientX - isDragProperty.dx, e.clientY - isDragProperty.dy);
        isDragProperty.link.translate(e.clientX - isDragProperty.dx, e.clientY - isDragProperty.dy);
        isDragProperty.wire.translate(e.clientX - isDragProperty.dx, e.clientY - isDragProperty.dy);
        isDragProperty.close.translate(e.clientX - isDragProperty.dx, e.clientY - isDragProperty.dy);
        isDragProperty.text.translate(e.clientX - isDragProperty.dx, e.clientY - isDragProperty.dy);
        isDragProperty.definition.position.x = isDragProperty.getBBox().x;
        isDragProperty.definition.position.y = isDragProperty.getBBox().y;
        var x = isDragProperty.getBBox().x,
        y = isDragProperty.getBBox().y;
        var iFromClass = -1;
        if (isDragProperty.definition.domain != "none") {
            getClass(isDragProperty.definition.domain).shape.attr({
                stroke: "yellow"
            });
            iFromClass = getIndiceClass(isDragProperty.definition.domain);
        }
        for (var i = 0; i < arrClass.length; i++) {
            if (i != iFromClass) {
                var sx = arrClass[i].shape.getBBox().x,
                sy = arrClass[i].shape.getBBox().y,
                sw = arrClass[i].shape.getBBox().width,
                sh = arrClass[i].shape.getBBox().height;
                if ((x > sx) && (x < (sx + sw)) && (y > sy) && (y < (sy + sh))) {
                    arrClass[i].shape.attr({
                        "stroke-width": 3
                    });
                    inClass = i;
                } else if (inClass == i) {
                    arrClass[i].shape.attr({
                        "stroke-width": 1
                    });
                    inClass = -1;
                }
            }
        }
        isDragProperty.dx = e.clientX;
        isDragProperty.dy = e.clientY;
        redrawConnectionsUuid(isDragProperty.definition.uuid);
        raphaelCanvas.safari();
    }
}

document.onmouseup = function() {
    if (isDragWireClass) {
        if (inClass != -1) {
            var uuid = newConnection(getClass(isDragWireClass.fromClass).shape, arrClass[inClass].shape, "class");
            jsonData.push({
                type: "wire",
                from: isDragWireClass.fromClass,
                to: arrClass[inClass].shape.definition.uuid,
                uuid: uuid
            });
            arrClass[inClass].shape.attr({
                "stroke-width": 1
            });
            inClass = -1;
        }
        isDragWireClass.translate(isDragWireClass.dot.iniX - isDragWireClass.getBBox().x, isDragWireClass.dot.iniY - isDragWireClass.getBBox().y);

        var dot = isDragWireClass.dot;
        var dotConn = dot.conn;

        dotConn.line.remove();
        dotConn.ahead.remove();
        dotConn.bg.remove();
        delete dotConn.line,
        dotConn.ahead,
        dotConn.bg,
        dotConn,
        dot;

        isDragWireClass.attr({
            opacity: .0
        });
        isDragWireClass = false;
        raphaelCanvas.safari();
    }
    if (isDragWireIndividual) {
        if (inClass != -1) {
            var uuid = newConnection(getIndividual(isDragWireIndividual.fromIndividual).shape, arrClass[inClass].shape, "class");
            jsonData.push({
                type: "wire",
                from: isDragWireIndividual.fromIndividual,
                to: arrClass[inClass].shape.definition.uuid,
                uuid: uuid
            });
            arrClass[inClass].shape.attr({
                "stroke-width": 1
            });
            inClass = -1;
        }
        isDragWireIndividual.translate(isDragWireIndividual.dot.iniX - isDragWireIndividual.getBBox().x, isDragWireIndividual.dot.iniY - isDragWireIndividual.getBBox().y);
	// elimina la linea
        var dot = isDragWireIndividual.dot;
        var dotConn = dot.conn;

        dotConn.line.remove();
        dotConn.ahead.remove();
        dotConn.bg.remove();
        delete dotConn.line,
        dotConn.ahead,
        dotConn.bg,
        dotConn,
        dot;

	// apaga el conector
        isDragWireIndividual.attr({
            opacity: .0
        });
        isDragWireIndividual = false;
        raphaelCanvas.safari();
    }
    if (isDragWireProperty) {
        if (inClass != -1) {
            var c = arrClass[inClass].shape;
            var p = getProperty(isDragWireProperty.fromProperty).shape;

            p.link.attr({
                opacity: 1
            });
            p.definition.range = c.definition.uuid;

            arrClass[inClass].shape.attr({
                "stroke-width": 1
            });
            inClass = -1;
        }
        isDragWireProperty.translate(isDragWireProperty.dot.iniX - isDragWireProperty.getBBox().x, isDragWireProperty.dot.iniY - isDragWireProperty.getBBox().y);

        var dot = isDragWireProperty.dot;
        var dotConn = dot.conn;

        dotConn.line.remove();
        dotConn.ahead.remove();
        dotConn.bg.remove();
        delete dotConn.line,
        dotConn.ahead,
        dotConn.bg,
        dotConn,
        dot;

        isDragWireProperty.attr({
            opacity: .0
        });
        isDragWireProperty = false;
        raphaelCanvas.safari();
    }
    if (isDragClass) {
        isDragClass = false;
        raphaelCanvas.safari();
    }
    if (isDragIndividual) {
        isDragIndividual = false;
        raphaelCanvas.safari();
    }
    if (isDragProperty) {
        var oldDomain = isDragProperty.definition.domain;

        if (oldDomain != "none") {
            var cls = getClass(isDragProperty.definition.domain).shape;
            var color = cls.definition.color;
            var ns = getNamespace(cls.definition.namespace);
            if (ns != undefined && ns.prefix != "") {
                color = ns.color;
            }
            cls.attr({
                stroke: color
            });
        }
        if (inClass != -1) {
            var c = arrClass[inClass].shape;
            var newDomain = c.definition.uuid;
            var p = isDragProperty;
            var w = c.getBBox().width;

            p.definition.domain = newDomain;

            var newWidth = w - 10;
            var oldWidth = p.definition.dimension.width;
            var diffWidth = newWidth - oldWidth;

            p.attr({
                width: (newWidth)
            });
            p.close.translate(diffWidth, 0);
            p.definition.dimension.width = newWidth;

            var tx = 0 + p.definition.position.x + ((p.definition.dimension.width) / 2);
            var ty = 0 + p.definition.position.y + 6;

            p.text.attr({
                x: tx,
                y: ty
            });

            sortClass(newDomain);
            c.attr({
                "stroke-width": 1
            });
            inClass = -1;
        }
        if (oldDomain != "none") {
            sortClass(oldDomain);
        }

        var range = isDragProperty.definition.range;
        for (var j = 0; j < arrConnections.length; j++) {
            removeConnectionFromAndTo(isDragProperty.definition.uuid, range);
        }

        redrawConnectionsUuid(isDragProperty.definition.uuid);
        isDragProperty = false;
        raphaelCanvas.safari();
    }
}

var newConnection = function(shapeFrom, shapeTo, type) {
    var objFrom = shapeFrom.definition;
    var stypes;
    if (objFrom.type == 'individual') {
        stypes = "ic";
    } else {
        stypes = "cc";
    }

    var uuid = Math.uuid();
    var color1 = "#00f";
    var color2 = "#ddd";
    if (type == "property") {
        color1 = "#f00";
    }

    var obj = {
        conn: makeConnection(shapeFrom, shapeTo, color1, color2 + "|10"),
        from: shapeFrom.definition.uuid,
        to: shapeTo.definition.uuid,
	shapes: stypes,
        uuid: uuid
    };
    obj.conn.uuid = uuid;
    arrConnections.push(obj);
    return uuid;
}

var removeConnection = function(i) {
    var c = arrConnections[i].conn;

    c.line.remove();
    c.ahead.remove();
    c.bg.remove();

    if (getIndiceJson(arrConnections[i].uuid) != undefined) {
        jsonData.splice(getIndiceJson(arrConnections[i].uuid), 1);
    }
    arrConnections.splice(i, 1);

    delete c.line,
    c.ahead,
    c.bg,
    c;
}

var removeConnectionUuid = function(uuid) {
    for (var i = 0; i < arrConnections.length; i++) {
        if (arrConnections[i].uuid == uuid) {
            removeConnection(i);
            return;
        }
    }
}

var removeConnectionFromAndTo = function(uuidFrom, uuidTo) {
    for (var i = 0; i < arrConnections.length; i++) {
        if (arrConnections[i].from == uuidFrom && arrConnections[i].to == uuidTo) {
            removeConnection(i);
            return;
        }
    }
}

var removeConnectionsFromOrTo = function(uuid) {
    var toRemove = [];
    var numDeleted = 0;

    for (var i = 0; i < arrConnections.length; i++) {
        if (arrConnections[i].from == uuid || arrConnections[i].to == uuid) {
            toRemove.push(i);
        }
    }
    for (var i = 0; i < toRemove.length; i++) {
        removeConnection(toRemove[i] - numDeleted);
        numDeleted++;
    }
}

var makePropertyReadOnly = function(defProperty) {
    var name = defProperty.name;
    var color = defProperty.color;
    if (defProperty.namespace != undefined) {
        var uuidNamespace = defProperty.namespace;
        var ns = getNamespace(uuidNamespace);
        if (ns.prefix != "") {
            name = ns.prefix + ":" + defProperty.name;
        }
        color = ns.color;
    }

    var s = {
        shape: raphaelCanvas.rect(defProperty.position.x, defProperty.position.y, defProperty.dimension.width, defProperty.dimension.height, 5).
        attr({
            fill: "#fff",
            stroke: color,
            "fill-opacity": .1,
            "stroke-width": 1
        })
    };

    var tx = s.shape.getBBox().x + s.shape.getBBox().width / 2,
    ty = s.shape.getBBox().y + 6,
    txtProp = {
        "font": '10px "Arial"',
        fill: "#000"
    },
    textProperty = raphaelCanvas.text(tx, ty, name).attr(txtProp);
    s.shape.toFront();

    var lx = s.shape.getBBox().x,
    ly = s.shape.getBBox().y,
    pathLink = pathFilledPolygon(translateShape(link_shape, lx - 3, ly - 1)),
    shapeLink = raphaelCanvas.path({
        stroke: "#f00",
        fill: "#fff",
        "stroke-width": 1,
        opacity: .0
    },
    pathLink);
    shapeLink.toFront();

    s.shape.mouseover(function() {
        if (this.definition.range != "none") {
            newConnection(this, getClass(this.definition.range).shape, "property");
        };
    });
    s.shape.mouseout(function() {
        if (this.definition.range != "none") {
            removeConnectionFromAndTo(this.definition.uuid, this.definition.range);
        }
    });

    s.shape.definition = defProperty;
    s.shape.link = shapeLink;
    /*
    if (defProperty.range != "none") {
	s.shape.READONLY = true;
        newConnection(s.shape, getClass(defProperty.range).shape, "property");
    };
    */
    return s;
}

var makeProperty = function(defProperty) {
    var name = defProperty.name;
    var color = defProperty.color;
    if (defProperty.namespace != undefined) {
        var uuidNamespace = defProperty.namespace;
        var ns = getNamespace(uuidNamespace);
        if (ns.prefix != "") {
            name = ns.prefix + ":" + defProperty.name;
        }
        color = ns.color;
    }

    var s = {
        shape: raphaelCanvas.rect(defProperty.position.x, defProperty.position.y, defProperty.dimension.width, defProperty.dimension.height, 5).
        attr({
            fill: "#fff",
            stroke: color,
            "fill-opacity": .1,
            "stroke-width": 1
        })
    };

    var tx = s.shape.getBBox().x + s.shape.getBBox().width / 2,
    ty = s.shape.getBBox().y + 6,
    txtProp = {
        "font": '10px "Arial"',
        fill: "#000"
    },
    textProperty = raphaelCanvas.text(tx, ty, name).attr(txtProp);
    s.shape.toFront();

    var lx = s.shape.getBBox().x,
    ly = s.shape.getBBox().y,
    pathLink = pathFilledPolygon(translateShape(link_shape, lx - 3, ly - 1)),
    shapeLink = raphaelCanvas.path({
        stroke: "#f00",
        fill: "#fff",
        "stroke-width": 1,
        opacity: .0
    },
    pathLink);
    shapeLink.toFront();

    var cx = s.shape.getBBox().x,
    cy = s.shape.getBBox().y,
    circleWire = raphaelCanvas.circle(cx + 2, cy + 2, 5).attr({
        stroke: "#ccc",
        fill: "#fff",
        opacity: .0
    });
    circleWire.toFront();
    circleWire.fromProperty = defProperty.uuid;
    circleWire.mouseover(function() {
        if (!isDragSomething()) {
            var p = getProperty(this.fromProperty);
            var range = p.shape.definition.range;
            if (range == "none") {
                this.attr({
                    opacity: 1,
                    stroke: "#000"
                });
            } else {
                newConnection(p.shape, getClass(range).shape, "property");
            }
        }
    });
    circleWire.mouseout(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: .0,
                stroke: "#ccc"
            });
            var p = getProperty(this.fromProperty);
            removeConnectionFromAndTo(p.shape.definition.uuid, p.shape.definition.range);
        }
    });
    circleWire.mousedown(draggerWireProperty);

    var br = 10,
    bx1 = s.shape.getBBox().x + s.shape.getBBox().width - 8,
    by1 = s.shape.getBBox().y - 3,
    bx2 = bx1 + br,
    by2 = by1 + br,
    pathBoxClose = ["M", bx1, by1, "L", bx2, by1, bx2, by2, bx1, by2, bx1, by1, "M", bx1 + 2, by1 + 2, "L", bx2 - 2, by2 - 2, "M", bx2 - 2, by1 + 2, "L", bx1 + 2, by2 - 2].join(","),
    boxClose = raphaelCanvas.path({
        stroke: "#ccc",
        fill: "#fff",
        "stroke-width": 1,
        opacity: .0
    },
    pathBoxClose);
    boxClose.toFront();
    boxClose.fromProperty = defProperty.uuid;
    boxClose.mouseover(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: 1,
                stroke: "#000"
            });
        }
    });
    boxClose.mouseout(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: .0,
                stroke: "#ccc"
            });
        }
    });
    boxClose.click(removeProperty);

    s.shape.wire = circleWire;
    s.shape.close = boxClose;
    s.shape.link = shapeLink;
    s.shape.text = textProperty;
    s.shape.definition = defProperty;
    s.shape.mouseover(function() {
        if (!isDragSomething()) {
            if (this.definition.range == "none") {
                this.wire.attr({
                    opacity: 1
                })
            } else {
                newConnection(this, getClass(this.definition.range).shape, "property");
            };
            this.close.attr({
                opacity: 1
            });
        }

    });
    s.shape.mouseout(function() {
        if (!isDragSomething()) {
            this.wire.attr({
                opacity: .0
            });
            this.close.attr({
                opacity: .0
            });
            removeConnectionFromAndTo(this.definition.uuid, this.definition.range);
        }
    });
    s.shape.mousedown(draggerProperty);
    s.shape.click(showDetailProperty);
    return s;
}

var removeProperty = function() {
    var domain = getProperty(this.fromProperty).shape.definition.domain;
    removePropertyUuid(this.fromProperty);
    if (domain != "none") {
        sortClass(domain);
    }
    raphaelCanvas.safari();
}

var removePropertyUuid = function(uuid) {
    var p = getProperty(uuid);
    var sp = p.shape;

    if (sp.definition.range != "none") {
        removeConnectionFromAndTo(sp.definition.uuid, sp.definition.range);
    }

    sp.wire.remove();
    sp.link.remove();
    sp.text.remove();
    sp.close.remove();
    sp.remove();

    arrProperties.splice(getIndiceProperty(uuid), 1);
    jsonData.splice(getIndiceJson(uuid), 1);

    delete sp.wire,
    sp.link,
    sp.text,
    sp.close,
    sp.definition,
    sp,
    p;
}

var makeClassReadOnly = function(defClass) {
    var name = defClass.name;
    var color = defClass.color;
    if (defClass.namespace != undefined) {
        var uuidNamespace = defClass.namespace;
        var ns = getNamespace(uuidNamespace);
        if (ns.prefix != "") {
            name = ns.prefix + ":" + defClass.name;
        }
        color = ns.color;
    }

    var s = {
        shape: raphaelCanvas.rect(defClass.position.x, defClass.position.y, defClass.dimension.width, defClass.dimension.height, 5).attr({
            fill: color,
            stroke: color,
            "fill-opacity": .1,
            "stroke-width": 1
        }).toBack()
    };

    var tx = s.shape.getBBox().x + s.shape.getBBox().width / 2,
    ty = s.shape.getBBox().y + 6,
    txtProp = {
        "font": '10px "Arial"',
        fill: "#000"
    },
    textClass = raphaelCanvas.text(tx, ty, name).attr(txtProp);

    var lx1 = s.shape.getBBox().x + 2,
    lx2 = s.shape.getBBox().x + s.shape.getBBox().width - 2,
    ly = s.shape.getBBox().y + 15,
    pathLineText = ["M", lx1, ly, "L", lx2, ly].join(","),
    lineText = raphaelCanvas.path({
        fill: color,
        stroke: color,
        "stroke-width": 1,
        opacity: 1
    },
    pathLineText);
    s.shape.toFront();

    s.shape.definition = defClass;
    return s;
}

var makeClass = function(defClass) {
    var name = defClass.name;
    var color = defClass.color;
    if (defClass.namespace != undefined) {
        var uuidNamespace = defClass.namespace;
        var ns = getNamespace(uuidNamespace);
        if (ns.prefix != "") {
            name = ns.prefix + ":" + defClass.name;
        }
        color = ns.color;
    }

    var s = {
        shape: raphaelCanvas.rect(defClass.position.x, defClass.position.y, defClass.dimension.width, defClass.dimension.height, 5).attr({
            fill: color,
            stroke: color,
            "fill-opacity": .1,
            "stroke-width": 1
        }).toBack()
    };

    var tx = s.shape.getBBox().x + s.shape.getBBox().width / 2,
    ty = s.shape.getBBox().y + 6,
    txtProp = {
        "font": '10px "Arial"',
        fill: "#000"
    },
    textClass = raphaelCanvas.text(tx, ty, name).attr(txtProp);

    var lx1 = s.shape.getBBox().x + 2,
    lx2 = s.shape.getBBox().x + s.shape.getBBox().width - 2,
    ly = s.shape.getBBox().y + 15,
    pathLineText = ["M", lx1, ly, "L", lx2, ly].join(","),
    lineText = raphaelCanvas.path({
        fill: color,
        stroke: color,
        "stroke-width": 1,
        opacity: 1
    },
    pathLineText);
    s.shape.toFront();

    var cx = s.shape.getBBox().x,
    cy = s.shape.getBBox().y,
    circleWire = raphaelCanvas.circle(cx + 2, cy + 2, 5).attr({
        stroke: "#ccc",
        fill: "#fff",
        opacity: .0
    });
    circleWire.toFront();
    circleWire.fromClass = defClass.uuid;
    circleWire.mousedown(draggerWireClass);
    circleWire.mouseover(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: 1,
                stroke: "#000"
            });
        }
    });
    circleWire.mouseout(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: .0,
                stroke: "#ccc"
            });
        }
    });

    var br = 10,
    bx1 = s.shape.getBBox().x + s.shape.getBBox().width - 8,
    by1 = s.shape.getBBox().y - 3,
    bx2 = bx1 + br,
    by2 = by1 + br,
    pathBoxClose = ["M", bx1, by1, "L", bx2, by1, bx2, by2, bx1, by2, bx1, by1, "M", bx1 + 2, by1 + 2, "L", bx2 - 2, by2 - 2, "M", bx2 - 2, by1 + 2, "L", bx1 + 2, by2 - 2].join(","),
    boxClose = raphaelCanvas.path({
        stroke: "#ccc",
        fill: "#fff",
        "stroke-width": 1,
        opacity: .0
    },
    pathBoxClose);
    boxClose.fromClass = defClass.uuid;
    boxClose.mouseover(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: 1,
                stroke: "#000"
            });
        }
    });
    boxClose.mouseout(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: .0,
                stroke: "#ccc"
            });
        }
    });
    boxClose.click(removeClass);

    s.shape.wire = circleWire;
    s.shape.close = boxClose;
    s.shape.text = textClass;
    s.shape.lineText = lineText;
    s.shape.definition = defClass;
    s.shape.mouseover(function() {
        if (!isDragSomething()) {
            this.wire.attr({
                opacity: 1
            });
            this.close.attr({
                opacity: 1
            });
        }
    });
    s.shape.mouseout(function() {
        if (!isDragSomething()) {
            this.wire.attr({
                opacity: .0
            });
            this.close.attr({
                opacity: .0
            });
        }
    });
    s.shape.mousedown(draggerClass);
    s.shape.click(showDetailClass);
    return s;
}

var makeIndividualReadOnly = function(defIndividual) {
    var name = defIndividual.name;
    var color = defIndividual.color;
    if (defIndividual.namespace != undefined) {
        var uuidNamespace = defIndividual.namespace;
        var ns = getNamespace(uuidNamespace);
        if (ns.prefix != "") {
            name = ns.prefix + ":" + defIndividual.name;
        }
        color = ns.color;
    }


    var s = {
        shape: raphaelCanvas.rect(defIndividual.position.x, defIndividual.position.y, defIndividual.dimension.width, defIndividual.dimension.height, 9).attr({
            fill: color,
            stroke: color,
            "fill-opacity": .1,
            "stroke-width": 1
        }).toBack()
    };

    var tx = s.shape.getBBox().x + s.shape.getBBox().width / 2,
    ty = s.shape.getBBox().y + 7,
    txtProp = {
        "font": '10px "Arial"',
        fill: "#000"
    }, textIndividual = raphaelCanvas.text(tx, ty, name).attr(txtProp);
    s.shape.toFront();

    var widthCircle = 10;
    var ytop = s.shape.getBBox().y;
    var shape0 = 
	raphaelCanvas.path({
            fill: color,
            stroke: color,
            "fill-opacity": 1,
            "stroke-width": 1
        }).moveTo(tx+widthCircle,ytop).arcTo(1, 1, 1, 0, tx-widthCircle, ytop);

    var ybottom = s.shape.getBBox().y + s.shape.getBBox().height;
    var shape1 = 
	raphaelCanvas.path({
            fill: color,
            stroke: color,
            "fill-opacity": 1,
            "stroke-width": 1
        }).moveTo(tx+widthCircle,ybottom).arcTo(1, 1, 0, 1, tx-widthCircle, ybottom);


    s.shape.text = textIndividual;
    s.shape.circleTop = shape0;
    s.shape.circleBottom = shape1;
    s.shape.definition = defIndividual;
    return s;
}

var makeIndividual = function(defIndividual) {
    var name = defIndividual.name;
    var color = defIndividual.color;
    if (defIndividual.namespace != undefined) {
        var uuidNamespace = defIndividual.namespace;
        var ns = getNamespace(uuidNamespace);
        if (ns.prefix != "") {
            name = ns.prefix + ":" + defIndividual.name;
        }
        color = ns.color;
    }


    var s = {
        shape: raphaelCanvas.rect(defIndividual.position.x, defIndividual.position.y, defIndividual.dimension.width, defIndividual.dimension.height, 9).attr({
            fill: color,
            stroke: color,
            "fill-opacity": .1,
            "stroke-width": 1
        }).toBack()
    };

    var tx = s.shape.getBBox().x + s.shape.getBBox().width / 2,
    ty = s.shape.getBBox().y + 7,
    txtProp = {
        "font": '10px "Arial"',
        fill: "#000"
    }, textIndividual = raphaelCanvas.text(tx, ty, name).attr(txtProp);
    s.shape.toFront();

    var widthCircle = 10;
    var ytop = s.shape.getBBox().y;
    var shape0 = 
	raphaelCanvas.path({
            fill: color,
            stroke: color,
            "fill-opacity": 1,
            "stroke-width": 1
        }).moveTo(tx+widthCircle,ytop).arcTo(1, 1, 1, 0, tx-widthCircle, ytop);

    var ybottom = s.shape.getBBox().y + s.shape.getBBox().height;
    var shape1 = 
	raphaelCanvas.path({
            fill: color,
            stroke: color,
            "fill-opacity": 1,
            "stroke-width": 1
        }).moveTo(tx+widthCircle,ybottom).arcTo(1, 1, 0, 1, tx-widthCircle, ybottom);


    var cx = s.shape.getBBox().x,
    cy = s.shape.getBBox().y,
    circleWire = raphaelCanvas.circle(cx + 2, cy + 2, 5).attr({
        stroke: "#ccc",
        fill: "#fff",
        opacity: .0
    });
    circleWire.toFront();
    circleWire.fromIndividual = defIndividual.uuid;
    circleWire.mousedown(draggerWireIndividual);
    circleWire.mouseover(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: 1,
                stroke: "#000"
            });
        }
    });
    circleWire.mouseout(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: .0,
                stroke: "#ccc"
            });
        }
    });

    var br = 10,
    bx1 = s.shape.getBBox().x + s.shape.getBBox().width - 8,
    by1 = s.shape.getBBox().y - 3,
    bx2 = bx1 + br,
    by2 = by1 + br,
    pathBoxClose = ["M", bx1, by1, "L", bx2, by1, bx2, by2, bx1, by2, bx1, by1, "M", bx1 + 2, by1 + 2, "L", bx2 - 2, by2 - 2, "M", bx2 - 2, by1 + 2, "L", bx1 + 2, by2 - 2].join(","),
    boxClose = raphaelCanvas.path({
        stroke: "#ccc",
        fill: "#fff",
        "stroke-width": 1,
        opacity: .0
    },
    pathBoxClose);
    boxClose.fromIndividual = defIndividual.uuid;
    boxClose.mouseover(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: 1,
                stroke: "#000"
            });
        }
    });
    boxClose.mouseout(function() {
        if (!isDragSomething()) {
            this.attr({
                opacity: .0,
                stroke: "#ccc"
            });
        }
    });
    boxClose.click(removeIndividual);

    s.shape.wire = circleWire;
    s.shape.close = boxClose;
    s.shape.text = textIndividual;
    s.shape.circleTop = shape0;
    s.shape.circleBottom = shape1;
    s.shape.definition = defIndividual;
    s.shape.mouseover(function() {
        if (!isDragSomething()) {
            this.wire.attr({
                opacity: 1
            });
            this.close.attr({
                opacity: 1
            });
        }
    });
    s.shape.mouseout(function() {
        if (!isDragSomething()) {
            this.wire.attr({
                opacity: .0
            });
            this.close.attr({
                opacity: .0
            });
        }
    });
    s.shape.mousedown(draggerIndividual);
    s.shape.click(showDetailIndividual);
    return s;
}

var removeClass = function() {
    removeClassUuid(this.fromClass);
}

var removeClassUuid = function(uuid) {
    var c = getClass(uuid);
    var cs = c.shape;

    removeConnectionsFromOrTo(uuid);

    var toRemove = [];
    var numDeleted = 0;
    for (var i = 0; i < arrProperties.length; i++) {
        if (arrProperties[i].shape.definition.domain == uuid) {
            toRemove.push(i);
        } else if (arrProperties[i].shape.definition.range == uuid) {
            removeConnectionFromAndTo(arrProperties[i].shape.uuid, uuid);
            arrProperties[i].shape.definition.range = "none";
        }
    }
    for (var i = 0; i < toRemove.length; i++) {
        removePropertyUuid(arrProperties[toRemove[i] - numDeleted].shape.definition.uuid);
        numDeleted++;
    }

    cs.wire.remove();
    cs.text.remove();
    cs.lineText.remove();
    cs.close.remove();
    cs.remove();

    arrClass.splice(getIndiceClass(uuid), 1);
    jsonData.splice(getIndiceJson(uuid), 1);

    delete cs.wire,
    cs.text,
    cs.lineText,
    cs.close,
    cs.definition,
    cs;
    raphaelCanvas.safari();
}

var removeIndividual = function() {
    removeIndividualUuid(this.fromIndividual);
}

var removeIndividualUuid = function(uuid) {
    var c = getIndividual(uuid);
    var cs = c.shape;

    removeConnectionsFromOrTo(uuid);
    cs.wire.remove();
    cs.text.remove();
    cs.circleTop.remove();
    cs.circleBottom.remove();
    cs.close.remove();
    cs.remove();

    arrIndividuals.splice(getIndiceIndividual(uuid), 1);
    jsonData.splice(getIndiceJson(uuid), 1);

    delete cs.wire,
    cs.text,
    cs.lineText,
    cs.close,
    cs.definition,
    cs;
    raphaelCanvas.safari();
}

var sortClass = function(uuidClass) {
    var domain = uuidClass;
    var c = getClass(domain).shape;
    var cx = c.definition.position.x;
    var cy = c.definition.position.y;
    var numProps = 0;

    for (var i = 0; i < arrProperties.length; i++) {
        if (arrProperties[i].shape.definition.domain == domain) {
            var lp = arrProperties[i].shape;
            var lpx = cx + 5;
            var lpy = cy + 23 + (18 * numProps);
            var oldlpx = lp.definition.position.x;
            var oldlpy = lp.definition.position.y;
            lp.definition.position.x = lpx;
            lp.definition.position.y = lpy;

            lp.toFront();
            lp.link.toFront();
            lp.wire.toFront();
            lp.close.toFront();

            lp.wire.attr({
                opacity: .0
            });
            lp.close.attr({
                opacity: .0
            });

            lp.translate(lpx - oldlpx, lpy - oldlpy);
            lp.link.translate(lpx - oldlpx, lpy - oldlpy);
            lp.wire.translate(lpx - oldlpx, lpy - oldlpy);
            lp.close.translate(lpx - oldlpx, lpy - oldlpy);
            lp.text.translate(lpx - oldlpx, lpy - oldlpy);
            numProps++;
        }
    }
    c.attr({
        height: 30 + (18 * numProps)
    });
    c.definition.dimension.height = 30 + (18 * numProps);
    redrawConnectionsUuid(uuidClass);
    raphaelCanvas.safari();
}

var redrawConnections = function() {
    for (var i = 0; i < arrConnections.length; i++) {
        makeConnection(arrConnections[i].conn);
    }
}

var redrawConnectionsUuid = function(uuid) {
    for (var i = 0; i < arrConnections.length; i++) {
        if (arrConnections[i].from == uuid || arrConnections[i].to == uuid) {
            makeConnection(arrConnections[i].conn);
        }
    }
}

var getIndiceIndividual = function(uuid) {
    for (var i = 0; i < arrIndividuals.length; i++) {
        if (arrIndividuals[i].shape.definition.uuid == uuid) {
            return i;
        }
    }
    return undefined;
}

var getIndividual = function(uuid) {
    return arrIndividuals[getIndiceIndividual(uuid)];
}

var getIndiceClass = function(uuid) {
    for (var i = 0; i < arrClass.length; i++) {
        if (arrClass[i].shape.definition.uuid == uuid) {
            return i;
        }
    }
    return undefined;
}

var getIndiceConnection = function(uuid) {
    for (var i = 0; i < arrConnections.length; i++) {
        if (arrConnections[i].uuid == uuid) {
            return i;
        }
    }
    return undefined;
}

var getConnection = function(uuid) {
    return arrConnections[getIndiceConnection(uuid)];
}

var getClass = function(uuid) {
    return arrClass[getIndiceClass(uuid)];
}

var getUuidNamespaceFromPrefix = function(prefix) {
    for (var i = 0; i < arrNamespaces.length; i++) {
        if (arrNamespaces[i].prefix == prefix) {
            return arrNamespaces[i].uuid;
        }
    }
    return undefined;
}

var getIndiceNamespace = function(uuid) {
    for (var i = 0; i < arrNamespaces.length; i++) {
        if (arrNamespaces[i].uuid == uuid) {
            return i;
        }
    }
    return undefined;
}

var getNamespace = function(uuid) {
    return arrNamespaces[getIndiceNamespace(uuid)];
}

var getIndiceProperty = function(uuid) {
    for (var i = 0; i < arrProperties.length; i++) {
        if (arrProperties[i].shape.definition.uuid == uuid) {
            return i;
        }
    }
    return undefined;
}

var getProperty = function(uuid) {
    return arrProperties[getIndiceProperty(uuid)];
}

var getIndiceJson = function(uuid) {
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].uuid == uuid) {
            return i;
        }
    }
    return undefined;
}

var addIndividual = function() {
    var uuid = Math.uuid();
    var obj = {
        position: {
            x: 10,
            y: 10
        },
        dimension: {
            width: 100,
            height: 15
        },
        name: '',
        color: getDafaultColor(),
        type: "individual",
        uuid: uuid = uuid
    };
    jsonData.push(obj);
    arrIndividuals.push(makeIndividual(obj));
    showDetailIndividualUuid(uuid);
}

var addClass = function() {
    var uuid = Math.uuid();
    var obj = {
        position: {
            x: 10,
            y: 10
        },
        dimension: {
            width: 100,
            height: 30
        },
        name: '',
        color: getDafaultColor(),
        type: "class",
        uuid: uuid = uuid
    };
    jsonData.push(obj);
    arrClass.push(makeClass(obj));
    showDetailClassUuid(uuid);
}

var addProperty = function() {
    var uuid = Math.uuid();
    var obj = {
        position: {
            x: 10,
            y: 10
        },
        dimension: {
            width: 80,
            height: 15
        },
        name: '',
        color: getDafaultColor(),
        type: "property",
        domain: "none",
        range: "none",
        uuid: uuid = uuid
    };
    jsonData.push(obj);
    arrProperties.push(makeProperty(obj));
    showDetailPropertyUuid(uuid);
}

var makeWireReadOnly = function(obj) {
    var objFrom = jsonData[getIndiceJson(obj.from)];
    var s;
    if (objFrom.type == 'individual') {
        s = getIndividual(obj.from).shape;
    } else {
        s = getClass(obj.from).shape;
    }
    s.READONLY = true;
    var toReturn = {
        conn: makeConnection(s, getClass(obj.to).shape, "#00f", "#ddd|10"),
        from: obj.from,
        to: obj.to,
        uuid: obj.uuid,
        definition: obj
    };
    toReturn.conn.uuid = obj.uuid;
    return toReturn;
}

var makeWire = function(obj) {
    var objFrom = jsonData[getIndiceJson(obj.from)];
    var s;
    var stypes;
    if (objFrom.type == 'individual') {
        s = getIndividual(obj.from).shape;
        stypes = "ic";
    } else {
        s = getClass(obj.from).shape;
        stypes = "cc";
    }
    var toReturn = {
        conn: makeConnection(s, getClass(obj.to).shape, "#00f", "#ddd|10"),
        from: obj.from,
        to: obj.to,
        uuid: obj.uuid,
	shapes: stypes,
        definition: obj
    };
    toReturn.conn.uuid = obj.uuid;
    return toReturn;
}

var isDragSomething = function() {
    return (isDragWireClass || isDragWireProperty || isDragClass || isDragProperty || isDragWireIndividual || isDragIndividual);
}

var getDafaultColor = function() {
    return arrNamespaces[0].color;
}

var showDetailConnection = function() {
    showDetailConnectionObj(this);
}

var showDetailConnectionUuid = function(uuid) {
    showDetailConnectionObj(getConnection(uuid));
}

var showDetailClass = function() {
    showDetailClassObj(this.definition);
}

var showDetailIndividual = function() {
    showDetailIndividualObj(this.definition);
}

var showDetailProperty = function() {
    showDetailPropertyObj(this.definition);
}

var showDetailClassUuid = function(uuid) {
    showDetailClassObj(getClass(uuid).shape.definition);
}

var showDetailIndividualUuid = function(uuid) {
    showDetailIndividualObj(getIndividual(uuid).shape.definition);
}

var showDetailPropertyUuid = function(uuid) {
    showDetailPropertyObj(getProperty(uuid).shape.definition);
}

var hideDetail = function() {
    $("#options").hide();
    $("#detailProperty").hide();
    $("#detailClass").hide();
    $("#detailIndividual").hide();
    $("#detailConnection").hide();
    $("#detailBrowse").hide();
    $("#detailHistory").hide();
    $("#detailNamespaces").hide();
    $("#detailSave").hide();
}

var showSave = function() {
    hideDetail();
    $("#options").show();
    $("#fileName").val(fileName);
    $("#fileKey").val(fileKey);

    $("#fileArchived").attr('checked', fileArchived);
    $("#fileLocked").attr('checked', fileLocked);
    $("#filePublished").attr('checked', filePublished);

    if (filePublished) {
        $("#filePublished").attr('disabled', true);
    } else {
        $("#filePublished").attr('disabled', false);
    }

    if (authenticated) {
        if (fileEditable) {
            $("#fileArchived").attr('disabled', false);
            $("#fileLocked").attr('disabled', false);
        }
    } else {
        $("#fileArchived").attr('disabled', true);
        $("#fileLocked").attr('disabled', true);
    }

    if (fileEditable) {
        $("#updateFile").show();
        $("#fileName").attr('disabled', false);
    } else {
        $("#updateFile").hide();
        $("#fileName").attr('disabled', true);
        $("#fileArchived").attr('disabled', true);
        $("#fileLocked").attr('disabled', true);
    }

    if (!filePublished) {
        $("#fileLocked").attr('disabled', true);
    }

    $("#detailSave").show();
}

var showHistory = function() {
    hideDetail();
    $("#options").show();
    $("#detailHistory").empty();

    var jsonHistory = [];
    $.ajax({
        url: '/json/histories/' + fileKey,
        type: "GET",
        dataType: "json",
        cache: false,
        async: false,
        success: function(data) {
            jsonHistory = data;
        }
    });

    $("#detailHistory").append('<b>Histories</b><br />');
    $("#detailHistory").append('<div class="file" id="currentVersion">' + fileUpdated + '</div>');

    for (var i = 0; i < jsonHistory.length; i++) {
        var obj = jsonHistory[i];
        var strDetail = '<div style="text-align: left; line-height: 20px;">';
        strDetail += '<b>' + obj.name + '</b><br />';
        if (obj.locked) {
            strDetail += '<img src="/static/images/locked.gif" />&nbsp;locked<br />'
        }
        if (obj.published) {
            strDetail += '<img src="/static/images/published.gif" />&nbsp;published<br />'
        }
        if (obj.archived) {
            strDetail += '<img src="/static/images/archived.gif" />&nbsp;archived<br />'
        }
        if (obj.author) {
            strDetail += '<img src="/static/images/author.gif" />&nbsp;' + obj.author + " <br />"
        } else {
            strDetail += '<img src="/static/images/author.gif" />&nbsp;Anonymous<br />'
        }
        strDetail += '</div>';
        $("#detailHistory").append('<div class="history" id="' + obj.key + '">' + obj.updated + '</div>');
        $("#detailHistory").append('<div class="history" id="th' + obj.key + '" style="display:none">' + strDetail + '</div>');
        $('#' + obj.key).tooltip({
             bodyHandler: function() {
             return $('#th'+this.id).html();
           },
           showURL: false,
           positionLeft: true 
	});
    }

    $(".history").click(function() {
        historyName = $("#" + this.id).text();
        openHistory(this.id);
        return false;
    });

    $("#currentVersion").click(function() {
        $("#status-up-name").empty();
        $("#status-up-name").append(fileName);
        openFile(fileKey);
        hideDetail();
        return false;
    });

    $("#detailHistory").show();
}

var showBrowse = function() {
    hideDetail();
    $("#options").show();
    $("#detailBrowse").empty();

    var archivedUrl = "";
    if (openArchivedFiles) {
        archivedUrl = "?archived=on";
    }

    var jsonOpen = [];
    $.ajax({
        url: '/json/' + archivedUrl,
        type: "GET",
        dataType: "json",
        cache: false,
        async: false,
        success: function(data) {
            jsonOpen = data;
        }
    });

    if (jsonOpen.authenticated != "") {
        $("#detailBrowse").append('<b>Private</b>&nbsp;');
        authenticated = true;
        if (jsonOpen.archived == "on") {
            $("#detailBrowse").append('<div class="boton2" id="archive_turn_off">Hide Archived Vocabs</div> <br /><br />');
        } else {
            $("#detailBrowse").append('<div class="boton2" id="archive_turn_on">Show Archived Vocabs</div> <br /><br />');
        }
    } else {
        authenticated = false;
    }

    if (jsonOpen.authenticated != "") {
        var jsonFilesPersonal = jsonOpen.personal;
        for (var i = 0; i < jsonFilesPersonal.length; i++) {
            var obj = jsonFilesPersonal[i];
            var strDetail = '<div style="text-align: left; line-height: 20px;">';
            if (obj.locked) {
                strDetail += '<img src="/static/images/locked.gif" />&nbsp;locked<br />'
            }
            if (obj.published) {
                strDetail += '<img src="/static/images/published.gif" />&nbsp;published<br />'
            }
            if (obj.archived) {
                strDetail += '<img src="/static/images/archived.gif" />&nbsp;archived<br />'
            }
            strDetail += '<img src="/static/images/date.gif" />&nbsp;' + obj.date
            strDetail += '</div>'
            $("#detailBrowse").append('<div class="file" id="' + obj.key + '">' + obj.name + '</div>');
            $("#detailBrowse").append('<div class="history" id="t' + obj.key + '" style="display:none">' + strDetail + '</div>');
            $('#' + obj.key).tooltip({
                 bodyHandler: function() {
                 return $('#t'+this.id).html();
               },
               showURL: false,
               positionLeft: true 
            });
        }
    	$("#detailBrowse").append('<br />');
    }

    $("#detailBrowse").append('<b>Public Vocabularies</b><br /><br />');
    var jsonFilesPublic = jsonOpen.public;
    for (var i = 0; i < jsonFilesPublic.length; i++) {
        var obj = jsonFilesPublic[i];

        var strDetail = '<div style="text-align: left; line-height: 20px;">';
        if (obj.locked) {
            strDetail += '<img src="/static/images/locked.gif" />&nbsp;locked<br />'
        }
        if (obj.archived) {
            strDetail += '<img src="/static/images/archived.gif" />&nbsp;archived<br />'
        }
        if (obj.author) {
            strDetail += '<img src="/static/images/author.gif" />&nbsp;' + obj.author + " <br />"
        } else {
            strDetail += '<img src="/static/images/author.gif" />&nbsp;Anonymous<br />'
        }

        strDetail += '<img src="/static/images/date.gif" /> ' + obj.date
        strDetail += '</div>'

        $("#detailBrowse").append('<div class="file" id="' + obj.key + '">' + obj.name + '</div>');
        $("#detailBrowse").append('<div class="history" id="t' + obj.key + '" style="display:none">' + strDetail + '</div>');
        $('#' + obj.key).tooltip({
             bodyHandler: function() {
             return $('#t'+this.id).html();
           },
           showURL: false,
           positionLeft: true 
        });
    }
    $("#detailBrowse").append('<br />');
    $("#detailBrowse").append('<br />');

    $(".file").click(function() {
        fileKey = this.id;
        fileName = $("#" + this.id).text();

        $("#status-up-name").empty();
        $("#status-up-name").append(fileName);
        openFile(fileKey);

        if (fileKey == "new") {
            fileKey = "";
        }

        hideDetail();
        return false;
    });

    $("#archive_turn_off").click(function() {
        openArchivedFiles = false;
        showBrowse();
        return false;
    });

    $("#archive_turn_on").click(function() {
        openArchivedFiles = true;
        showBrowse();
        return false;
    });

    $("#detailBrowse").show();
}

var showDetailClassObj = function(obj) {
    hideDetail();
    $("#detailClass").show();
    $("#className").val(obj.name);
    $("#classPositionX").val(obj.position.x);
    $("#classPositionY").val(obj.position.y);
    $("#classDimensionWidth").val(obj.dimension.width);
    $("#classDimensionHeight").val(obj.dimension.height);
    $("#classUuid").val(obj.uuid);

    $("#tdClassColor").empty();
    $("#tdClassColor").append('<input type="text" id="classColor" size="10" value="' + obj.color + '"/>');
    $('#classColor').colorPicker();

    $("#classNamespace").empty();
    for (var i = 0; i < arrNamespaces.length; i++) {
        ns = arrNamespaces[i];
        var sel = "";
        if (ns.uuid == obj.namespace) {
            sel = ' selected="selected" ';
        }
        $("#classNamespace").append('<option value="' + ns.uuid + '" style="background-color:' + ns.color + '"' + sel + '>' + ns.prefix + '</option>');
    }

    inDetailUpdate = "class";
    $("#options").show();
    $("#className").focus();
}

var showDetailIndividualObj = function(obj) {
    hideDetail();
    $("#detailIndividual").show();
    $("#individualName").val(obj.name);
    $("#individualPositionX").val(obj.position.x);
    $("#individualPositionY").val(obj.position.y);
    $("#individualDimensionWidth").val(obj.dimension.width);
    $("#individualDimensionHeight").val(obj.dimension.height);
    $("#individualUuid").val(obj.uuid);

    $("#tdIndividualColor").empty();
    $("#tdIndividualColor").append('<input type="text" id="individualColor" size="10" value="' + obj.color + '"/>');
    $('#individualColor').colorPicker();

    $("#individualNamespace").empty();
    for (var i = 0; i < arrNamespaces.length; i++) {
        ns = arrNamespaces[i];
        var sel = "";
        if (ns.uuid == obj.namespace) {
            sel = ' selected="selected" ';
        }
        $("#individualNamespace").append('<option value="' + ns.uuid + '" style="background-color:' + ns.color + '"' + sel + '>' + ns.prefix + '</option>');
    }

    inDetailUpdate = "individual";
    $("#options").show();
    $("#individualName").focus();
}

var showDetailPropertyObj = function(obj) {
    hideDetail();
    $("#detailProperty").show();
    $("#propertyName").val(obj.name);
    $("#propertyPositionX").val(obj.position.x);
    $("#propertyPositionY").val(obj.position.y);
    $("#propertyDimensionWidth").val(obj.dimension.width);
    $("#propertyDimensionHeight").val(obj.dimension.height);
    $("#propertyUuid").val(obj.uuid);
    $("#propertyDomain").val(obj.domain);
    $("#propertyRange").val(obj.range);

    $("#tdPropertyColor").empty();
    $("#tdPropertyColor").append('<input type="text" id="propertyColor" size="10" value="' + obj.color + '"/>');
    $('#propertyColor').colorPicker();

    $("#propertyNamespace").empty();
    for (var i = 0; i < arrNamespaces.length; i++) {
        ns = arrNamespaces[i];
        var sel = "";
        if (ns.uuid == obj.namespace) {
            sel = ' selected="selected" ';
        }
        $("#propertyNamespace").append('<option value="' + ns.uuid + '" style="background-color:' + ns.color + '"' + sel + '>' + ns.prefix + '</option>');
    }

    inDetailUpdate = "property";
    $("#options").show();
    $("#propertyName").focus();
}

var showDetailNamespaces = function() {
    hideDetail();
    $("#options").show();

    var ns = arrNamespaces[0];
    $("#nsDefaultPrefix").val(ns.prefix);
    $("#nsDefaultUri").val(ns.uri);
    $("#tdNsDefaultColor").empty();
    $("#tdNsDefaultColor").append('<input type="text" id="nsDefaultColor" size="40" value="' + ns.color + '"/>');
    $('#nsDefaultColor').colorPicker();

    $("#listNamespaces").empty();
    $("#nsNewPrefix").val("");
    $("#nsNewUri").val("");

    $("#tdNsNewColor").empty();
    $("#tdNsNewColor").append('<input type="text" id="nsNewColor" size="40"/>');
    $('#nsNewColor').colorPicker();

    for (var i = 1; i < arrNamespaces.length; i++) {
        ns = arrNamespaces[i];
        $("#listNamespaces").append('<tr><td rowspan="2" valign="middle" class="destaca">#' + i + '</td><td>color</td><td><input type="text" id="ns' + i + 'Color" size="10" value="' + ns.color + '"/></td><td>prefix</td><td><input type="text" id="ns' + i + 'Prefix" size="10" value="' + ns.prefix + '"  style="width:50px"/></td></tr>');
        $("#listNamespaces").append('<tr><td colspan="4">uri&nbsp;<input type="text" id="ns' + i + 'Uri" size="30" value="' + ns.uri + '"  style="width:200px"/></td></tr>');
        $("#listNamespaces").append('<tr><td colspan="5">&nbsp;</td></tr>');
        $('#ns' + i + 'Color').colorPicker();
    }
    $("#detailNamespaces").show();

    inDetailUpdate = "namespaces";
}

var showDetailConnectionObj = function(obj) {
    hideDetail();
    $("#options").show();

    $("#connectionUuid").val(obj.uuid);
    $("#connectionFrom").val(obj.from);
    $("#connectionTo").val(obj.to);
    $("#connectionShapes").val(obj.shapes);

    if(obj.shapes == "ic") {
        $("#connectionType").val("individual type class");
    } else if(obj.shapes == "cc") {
        $("#connectionType").val("class subClassOf class");
    } else {
        $("#connectionType").val("unknow");
    }

    $("#detailConnection").show();
}

var updateDetailIndividual = function() {
    var uuid = $("#individualUuid").val();
    var obj = jsonData[getIndiceJson(uuid)];
    if (obj == undefined) return;
    var individual = getIndividual(uuid);
    var oldWidth = obj.dimension.width;

    var uuidNamespace = $("#individualNamespace").find(':selected').val();
    var name = $("#individualName").val();
    var color = $("#individualColor").val();
    if (uuidNamespace != undefined) {
        var ns = getNamespace(uuidNamespace);
        obj.namespace = uuidNamespace;
        if (ns.prefix != "") {
            name = ns.prefix + ":" + $("#individualName").val();
            color = ns.color;
        }
    }

    obj.name = $("#individualName").val();
    obj.color = $("#individualColor").val();
    obj.position.x = parseInt($("#individualPositionX").val());
    obj.position.y = parseInt($("#individualPositionY").val());
    if (obj.dimension.width != parseInt($("#individualDimensionWidth").val())) {
        obj.dimension.width = parseInt($("#individualDimensionWidth").val());
	if (obj.dimension.width<60) {
            obj.dimension.width = 60;
        }
    }

    var diffWidth = obj.dimension.width - oldWidth;
    individual.shape.close.translate(diffWidth, 0);
    individual.shape.circleTop.translate(diffWidth/2, 0).attr({fill: color,stroke: color});
    individual.shape.circleBottom.translate(diffWidth/2, 0).attr({fill: color,stroke: color});

    var tx = 0 + obj.position.x + ((obj.dimension.width) / 2);
    var ty = 0 + obj.position.y + 6;
    individual.shape.text.attr({
        text: name,
        x: tx,
        y: ty
    });
    individual.shape.attr({
        fill: color,
        stroke: color,
        width: obj.dimension.width,
        x: obj.position.x,
        y: obj.position.y
    });

    redrawConnectionsUuid(uuid);
}


var updateDetailClass = function() {
    var uuid = $("#classUuid").val();
    var obj = jsonData[getIndiceJson(uuid)];
    if (obj == undefined) return;
    var c = getClass(uuid);
    var oldWidth = obj.dimension.width;

    var uuidNamespace = $("#classNamespace").find(':selected').val();
    var name = $("#className").val();
    var color = $("#classColor").val();
    if (uuidNamespace != undefined) {
        var ns = getNamespace(uuidNamespace);
        obj.namespace = uuidNamespace;
        if (ns.prefix != "") {
            name = ns.prefix + ":" + $("#className").val();
            color = ns.color;
        }
    }

    obj.name = $("#className").val();
    obj.color = $("#classColor").val();
    obj.position.x = parseInt($("#classPositionX").val());
    obj.position.y = parseInt($("#classPositionY").val());
    if (obj.dimension.width != parseInt($("#classDimensionWidth").val())) {
        obj.dimension.width = parseInt($("#classDimensionWidth").val());
        for (var i = 0; i < arrProperties.length; i++) {
            if (arrProperties[i].shape.definition.domain == uuid) {
                var p = arrProperties[i].shape;
                var newWidth = obj.dimension.width - 10;
                p.attr({
                    width: newWidth
                });

                var objp = p.definition;
                var diffWidth = newWidth - objp.dimension.width;
                objp.dimension.width = newWidth;

                var tx = 0 + objp.position.x + ((objp.dimension.width) / 2);
                var ty = 0 + objp.position.y + 6;
                p.text.attr({
                    x: tx,
                    y: ty
                });

                p.close.translate(diffWidth, 0);
            }
        }
    }
    obj.dimension.height = parseInt($("#classDimensionHeight").val());

    var diffWidth = obj.dimension.width - oldWidth;
    c.shape.close.translate(diffWidth, 0);

    var tx = 0 + obj.position.x + ((obj.dimension.width) / 2);
    var ty = 0 + obj.position.y + 6;
    c.shape.text.attr({
        text: name,
        x: tx,
        y: ty
    });
    c.shape.attr({
        fill: color,
        stroke: color,
        width: obj.dimension.width,
        height: obj.dimension.height,
        x: obj.position.x,
        y: obj.position.y
    });
    var lx1 = c.shape.getBBox().x + 2,
    lx2 = c.shape.getBBox().x + c.shape.getBBox().width - 2,
    ly = c.shape.getBBox().y + 15,
    pathLineText = ["M", lx1, ly, "L", lx2, ly].join(",");
    c.shape.lineText.attr({
        path: pathLineText
    });
    redrawConnectionsUuid(uuid);
}

var updateDetailProperty = function() {
    var uuid = $("#propertyUuid").val();
    var obj = jsonData[getIndiceJson(uuid)];
    if (obj == undefined) return;
    var p = getProperty(uuid);
    var oldWidth = obj.dimension.width;

    var uuidNamespace = $("#propertyNamespace").find(':selected').val();
    var name = $("#propertyName").val();
    var color = $("#propertyColor").val();
    if (uuidNamespace != undefined) {
        var ns = getNamespace(uuidNamespace);
        obj.namespace = uuidNamespace;
        if (ns.prefix != "") {
            name = ns.prefix + ":" + $("#propertyName").val();
            color = ns.color;
        }
    }

    obj.name = $("#propertyName").val();
    obj.color = $("#propertyColor").val();
    obj.position.x = parseInt($("#propertyPositionX").val());
    obj.position.y = parseInt($("#propertyPositionY").val());
    obj.dimension.width = parseInt($("#propertyDimensionWidth").val());
    obj.dimension.height = parseInt($("#propertyDimensionHeight").val());

    var diffWidth = obj.dimension.width - oldWidth;
    p.shape.close.translate(diffWidth, 0);

    var tx = 0 + obj.position.x + ((obj.dimension.width) / 2);
    var ty = 0 + obj.position.y + 6;

    p.shape.text.attr({
        text: name,
        x: tx,
        y: ty
    });
    p.shape.attr({
        stroke: color,
        width: obj.dimension.width,
        height: obj.dimension.height,
        x: obj.position.x,
        y: obj.position.y
    });
    if (obj.domain != "none" && diffWidth != 0) {
        maxWidth = 0;
        for (var i = 0; i < arrProperties.length; i++) {
            var p = arrProperties[i].shape;
            if (p.definition.domain == obj.domain) {
                var pw = p.definition.dimension.width;
                if (pw > maxWidth) {
                    maxWidth = pw;
                }
            }
        }

        newWidth = maxWidth;
        for (var i = 0; i < arrProperties.length; i++) {
            var p = arrProperties[i].shape;
            if (p.definition.domain == obj.domain) {
                var objp = p.definition;
                var diffWidth = newWidth - objp.dimension.width;
                objp.dimension.width = newWidth;
                var tx = 0 + objp.position.x + ((objp.dimension.width) / 2);
                var ty = 0 + objp.position.y + 6;
                p.attr({
                    width: newWidth
                });
                p.text.attr({
                    x: tx,
                    y: ty
                });
                p.close.translate(diffWidth, 0);
            }
        }

        var cls = getClass(obj.domain);
        var clsObj = cls.shape.definition;
        var diffWidth = newWidth + 10 - clsObj.dimension.width;
        clsObj.dimension.width = newWidth + 10;
        cls.shape.attr({
            width: newWidth + 10
        });
        sortClass(obj.domain);

        cls.shape.close.translate(diffWidth, 0);

        var tx = 0 + clsObj.position.x + ((clsObj.dimension.width) / 2);
        var ty = 0 + clsObj.position.y + 6;
        cls.shape.text.attr({
            x: tx,
            y: ty
        });
        var lx1 = cls.shape.getBBox().x + 2,
        lx2 = cls.shape.getBBox().x + cls.shape.getBBox().width - 2,
        ly = cls.shape.getBBox().y + 15,
        pathLineText = ["M", lx1, ly, "L", lx2, ly].join(",");
        cls.shape.lineText.attr({
            path: pathLineText
        });

    }
    redrawConnectionsUuid(uuid);
}

var updateDetailNamespaces = function() {
    var ns = arrNamespaces[0];
    ns.prefix = $("#nsDefaultPrefix").val();
    ns.uri = $("#nsDefaultUri").val();

    if (ns.color != $("#nsDefaultColor").val()) {
        ns.color = $("#nsDefaultColor").val();
        refreshColor(ns);
    }

    for (var i = 1; i < arrNamespaces.length; i++) {
        ns = arrNamespaces[i];
        ns.prefix = $("#ns" + i + "Prefix").val();
        ns.uri = $("#ns" + i + "Uri").val();
        if (ns.color != $("#ns" + i + "Color").val()) {
            ns.color = $("#ns" + i + "Color").val();
            refreshColor(ns);
        }
    }

    if ($("#nsNewPrefix").val() != "" && $("#nsNewUri").val()) {
        ns = defaultNs();
        ns.prefix = $("#nsNewPrefix").val();
        ns.uri = $("#nsNewUri").val();
        ns.color = $("#nsNewColor").val();
        arrNamespaces.push(ns);
        jsonData.push(ns);
    }
}

var refreshColor = function(ns) {
    for (var i = 0; i < arrClass.length; i++) {
        if (arrClass[i].shape.definition.namespace == ns.uuid) {
            arrClass[i].shape.attr({
                fill: ns.color,
                stroke: ns.color
            });
        }
    }

    for (var i = 0; i < arrProperties.length; i++) {
        if (arrProperties[i].shape.definition.namespace == ns.uuid) {
            arrProperties[i].shape.attr({
                stroke: ns.color
            });
        }
    }
}

var saveFile = function() {
    $("#status-up-message").show();
    $("#status-up-message").empty();
    $("#status-up-message").append("saving...");
    var url = "";
    if (fileKey == "") {
        url = "/add";
    } else {
        url = "/update";
    }
    fileName = $("#fileName").val();

    if ($("#fileArchived:checked").val() != null) {
        fileArchived = true;
    } else {
        fileArchived = false;
    }

    if ($("#fileLocked:checked").val() != null) {
        fileLocked = true;
    } else {
        fileLocked = false;
    }

    if ($("#filePublished:checked").val() != null) {
        filePublished = true;
    } else {
        filePublished = false;
    }

    $.post(
    url, {
        'name': fileName,
        'diagram': JSON.stringify(jsonData),
        'key': fileKey,
        'archived': fileArchived,
        'locked': fileLocked,
        'published': filePublished
    },
    function(data) {
        fileKey = data.key;
        fileUpdated = data.updated;
        $("#status-up-message").empty();
        $("#status-up-message").hide();
    },
    "json");
    $("#status-up-name").empty();
    $("#status-up-name").append(fileName);
    $("#showHistory").removeClass("botonDisabled");
    hideDetail();
}

var openHistory = function(history) {
    $("#status-up-message").empty();
    $("#status-up-message").append("opening version " + historyName + " ... ");
    $("#status-up-message").show();

    deleteAll();
    raphaelCanvas = Raphael("holder", 1250, 570);
    isDragWireClass = false;
    isDragClass = false;
    isDragWireProperty = false;
    isDragProperty = false;
    inClass = -1;
    inDetailUpdate = "none";
    arrClass = [];
    arrProperties = [];
    arrConnections = [];
    arrNamespaces = [];
    arrIndividuals = [];
    jsonData = [];
    graphUrl = "/json/history/" + history;
    var jsonRead = [];

    $.ajax({
        url: graphUrl,
        type: "GET",
        dataType: "json",
        cache: false,
        async: false,
        success: function(data) {
            jsonRead = data;
        }
    });

    jsonData = jsonRead.diagram;

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "namespace") {
            arrNamespaces.push(obj);
        }
    }

    if (!arrNamespaces.length) {
        var ns = defaultNs();
        arrNamespaces.push(ns);
        jsonData.push(ns);
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "class" || obj.type == "property") {
            name = obj.name;
            if (name.indexOf(":") != -1) {
                var arr = name.split(":");
                obj.namespace = getUuidNamespaceFromPrefix(arr[0]);
                obj.name = arr[1];
            }
        }
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "class") {
            arrClass.push(makeClassReadOnly(obj));
        }
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "property") {
            var p = makePropertyReadOnly(obj);
            arrProperties.push(p);
        }
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "individual") {
            arrIndividuals.push(makeIndividualReadOnly(obj));
        }
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "property") {
            var p = getProperty(obj.uuid);
            var range = obj.range;
            if (range != "none") {
                p.shape.link.attr({
                    opacity: 1
                });
            }
        }
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "wire") {
            arrConnections.push(makeWireReadOnly(obj));
        }
    }

    fileEditable = false;
    $("#showSave").addClass("botonDisabled");
    $("#addClass").addClass("botonDisabled");
    $("#addProperty").addClass("botonDisabled");
    $("#addIndividual").addClass("botonDisabled");
    $("#updateNamespaces").addClass("botonDisabled");

    $("#status-up-name").empty();
    $("#status-up-name").append(fileName + ' [version: ' + historyName + ']');
    $("#status-up-message").empty();
    $("#status-up-message").hide();
}

var openFile = function(file) {
    $("#status-up-message").show();
    $("#status-up-message").empty();
    $("#status-up-message").append("opening " + fileName + " ...");
    deleteAll();
    raphaelCanvas = Raphael("holder", 1250, 570);
    isDragWireClass = false;
    isDragClass = false;
    isDragWireProperty = false;
    isDragProperty = false;
    inClass = -1;
    inDetailUpdate = "none";
    arrClass = [];
    arrProperties = [];
    arrConnections = [];
    arrIndividuals = [];
    arrNamespaces = [];
    jsonData = [];
    graphUrl = file;

    var jsonRead = [];
    if (graphUrl == "new") {
        graphUrl = "/static/data/new.json";
    } else {
        graphUrl = "/json/view/" + graphUrl;
    }
    $.ajax({
        url: graphUrl,
        type: "GET",
        dataType: "json",
        cache: false,
        async: false,
        success: function(data) {
            jsonRead = data;
        }
    });

    jsonData = jsonRead.diagram;
    fileArchived = jsonRead.archived;
    fileLocked = jsonRead.locked;
    filePublished = jsonRead.published;
    fileEditable = jsonRead.editable;
    fileUpdated = jsonRead.updated;
    fileWithHistory = jsonRead.withHistory;

    if (file == "new" && authenticated) {
        filePublished = false;
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "namespace") {
            arrNamespaces.push(obj);
        }
    }

    if (!arrNamespaces.length) {
        var ns = defaultNs();
        arrNamespaces.push(ns);
        jsonData.push(ns);
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "class" || obj.type == "property") {
            name = obj.name;
            if (name.indexOf(":") != -1) {
                var arr = name.split(":");
                obj.namespace = getUuidNamespaceFromPrefix(arr[0]);
                obj.name = arr[1];
            }
        }
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "class") {
            arrClass.push(makeClass(obj));
        }
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "property") {
            var p = makeProperty(obj);
            arrProperties.push(p);
        }
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "individual") {
            arrIndividuals.push(makeIndividual(obj));
        }
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "property") {
            var p = getProperty(obj.uuid);
            var range = obj.range;
            if (range != "none") {
                p.shape.link.attr({
                    opacity: 1
                });
            }
        }
    }

    for (var i = 0; i < jsonData.length; i++) {
        var obj = jsonData[i];
        if (obj.type == "wire") {
            arrConnections.push(makeWire(obj));
        }
    }
    $("#status-up-message").empty();
    $("#status-up-message").hide();

    if (fileEditable) {
        $("#showSave").removeClass("botonDisabled");
    } else {
        $("#showSave").addClass("botonDisabled");
    }

    if (fileWithHistory) {
        $("#showHistory").removeClass("botonDisabled");
    } else {
        $("#showHistory").addClass("botonDisabled");
    }

    $("#addClass").removeClass("botonDisabled");
    $("#addProperty").removeClass("botonDisabled");
    $("#addIndividual").removeClass("botonDisabled");
    $("#updateNamespaces").removeClass("botonDisabled");
}

var defaultNs = function() {
    var obj = {
        prefix: "",
        uri: "",
        color: "#ff6600",
        uuid: Math.uuid(),
        type: "namespace"
    };
    return obj;
}
var updateDetail = function() {
    //alert("x: " + e.pageX + " y: " + e.pageY);
    if (inDetailUpdate != "none") {
        if (inDetailUpdate == "class") {
            updateDetailClass();
        } else if (inDetailUpdate == "property") {
            updateDetailProperty();
        } else if (inDetailUpdate == "namespaces") {
            updateDetailNamespaces();
        } else if (inDetailUpdate == "individual") {
            updateDetailIndividual();
        }
        inDetailUpdate = "none";
    }
    hideDetail();
    return false;
}

var configButtons = function() {
    $("#holder").dblclick(
        updateDetail
    );

    $(".closeOptions").click(function() {
        hideDetail();
        return false;
    });
    $("#addClass").click(function() {
        addClass();
        return false;
    });
    $("#updateClass").click(function() {
        updateDetailClass()
        hideDetail();
        return false;
    });
    $("#addIndividual").click(function() {
        addIndividual();
        return false;
    });
    $("#updateIndividual").click(function() {
        updateDetailIndividual()
        hideDetail();
        return false;
    });
    $("#addProperty").click(function() {
        addProperty()
        $("#propertyName").focus();
        return false;
    });
    $("#updateProperty").click(function() {
        updateDetailProperty()
        hideDetail();
        return false;
    });
    $("#viewJson").click(function() {
        console.log(JSON.stringify(jsonData))
    });
    $("#updateFile").click(function() {
        saveFile();
    });
    $("#showSave").click(function() {
        showSave();
        return false;
    });
    $("#showHistory").click(function() {
        showHistory();
        return false;
    });
    $("#showBrowse").click(function() {
        showBrowse();
        return false;
    });
    $("#showNamespaces").click(function() {
        showDetailNamespaces();
        return false;
    });
    $("#updateNamespaces").click(function() {
        updateDetailNamespaces();
        hideDetail();
        return false;
    });
    $("#export").click(function() {
        exportToRdfXml();
        return false;
    });
    $("#deleteConnection").click(function() {
        var connectionUuid = $("#connectionUuid").val();
        removeConnectionUuid(connectionUuid);
        hideDetail();
        return false;
    });

    $('#showAbout').click(function() {
	$("#dialogAbout").jqm({overlay: 40}).jqmShow();
        return false;
    });
}

var deleteAll = function() {
    for (var j = 0; j < arrConnections.length; j++) {
        delete arrConnections[j];
    }
    for (var i = 0; i < arrClass.length; i++) {
        delete arrClass[i].shape.wire;
        delete arrClass[i].shape.close;
        delete arrClass[i].shape.text;
        delete arrClass[i].shape.lineText;
        delete arrClass[i].shape;
        delete arrClass[i];
    }
    for (var i = 0; i < arrProperties.length; i++) {
        delete arrProperties[i].shape.wire;
        delete arrProperties[i].shape.link;
        delete arrProperties[i].shape.close;
        delete arrProperties[i].shape.text;
        delete arrProperties[i].shape;
        delete arrProperties[i];
    }
    for (var i = 0; i < jsonData.length; i++) {
        delete jsonData[i];
    }
    raphaelCanvas.remove();
    delete r;
}

var exportToRdfXml = function() {
	var diagramInRdfXml = diagramInJsonToRdfXml(jsonData);
	var toReturn = formatXml(diagramInRdfXml);
	//toReturn = toReturn.replace(/</g,"&lt;");
	//toReturn = toReturn.replace(/>/g,"&gt;");
	//console.log(diagramInRdfXml);
	$("#exportContainer").val(toReturn);
	$("#dialogExport").jqm({overlay: 40, modal: true}).jqmShow();
}

var diagramInJsonToRdfXml = function(jsonData) {
	var namespaces;
	var clases=[];
	var properties=[];
	var individuals=[];
	var uuidNamespaces = {};
	var uuidClases = {};
	var uuidClasesShort = {};
	var diagram={};

	namespaces = {
	'$xmlns$rdf':	'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
	'$xmlns$rdfs':	'http://www.w3.org/2000/01/rdf-schema#', 
	'$xmlns$owl': 	'http://www.w3.org/2002/07/owl#',
	'$xmlns$skos':	'http://www.w3.org/2004/02/skos/core#', 
	'$xmlns$dc': 	'http://purl.org/dc/elements/1.1/'
	};

	for(var i = 0; i < jsonData.length; i++) {
		var obj = jsonData[i];
		if (obj.type == 'namespace') {
			if (obj.prefix != 'rdf' && obj.prefix != 'rdfs' && 
			    obj.prefix != 'owl' && obj.prefix != 'skos' && obj.prefix != 'dc') {
				namespaces['$xmlns$' + obj.prefix] = obj.uri;
			}
			uuidNamespaces[obj.uuid] = obj.uri;
		}
	}

	for(var i = 0; i < jsonData.length; i++) {
		var obj = jsonData[i];
		if (obj.type == 'class') {
			var ns = '';
			var prefix = '';
			if(obj.namespace) {
				ns = uuidNamespaces[obj.namespace];
				prefix = uuidNamespaces[obj.prefix];
			}
			uuidClases[obj.uuid] = ns + obj.name;
			uuidClasesShort[obj.uuid] = prefix + obj.name;
		}
	}

	// TODO: ver caso donde se repite una clase
	for(var i = 0; i < jsonData.length; i++) {
		var obj = jsonData[i];
		if (obj.type == 'class') {
			var ns = '';
			if(obj.namespace) {
				ns = uuidNamespaces[obj.namespace];
			}
			var cObj = {'$rdf$about':ns + obj.name};
			for(var j = 0; j < jsonData.length; j++) {
				var objWire = jsonData[j];
				if (objWire.type == 'wire' && objWire.from == obj.uuid) {
					cObj["rdfs:subClassOf"]={"$rdf$resource":uuidClases[objWire.to]};
				}
			}
			clases.push(cObj);
		}
	}

	// TODO: ver caso donde se repite una propiedad
	for(var i = 0; i < jsonData.length; i++) {
		var obj = jsonData[i];
		if (obj.type == 'property') {
			var ns = '';
			if(obj.namespace) {
				ns = uuidNamespaces[obj.namespace];
			}
			var pObj = {'$rdf$about':ns + obj.name};
			if (obj.domain != "none") {
				pObj["rdfs$domain"]={"$rdf$resource":uuidClases[obj.domain]};
			}
			if (obj.range != "none") {
				pObj["rdfs$range"]={"$rdf$resource":uuidClases[obj.range]};
				pObj["rdf$type"]={"$rdf$resource":"http://www.w3.org/2002/07/owl#ObjectProperty"};
			}
			properties.push(pObj);
		}
	}


	// TODO: ver caso donde individual es una clase o una propiedad
	for(var i = 0; i < jsonData.length; i++) {
		var obj = jsonData[i];
		if (obj.type == 'individual') {
			if(obj.namespace) {
				ns = uuidNamespaces[obj.namespace];
			}
			var iObj = {'$rdf$about':ns + obj.name};
			for(var j = 0; j < jsonData.length; j++) {
				var objWire = jsonData[j];
				if (objWire.type == 'wire' && objWire.from == obj.uuid) {
					iObj["rdf:type"]={"$rdf$resource":uuidClases[objWire.to]};
				}
			}
			individuals.push(iObj);
		}
	}

	namespaces['owl:Class']=clases;
	namespaces['rdf:Property']=properties;
	namespaces['rdf:Description']=individuals;

	diagram['rdf:RDF']=namespaces;
	return _.x(diagram);
}

var isDragWireClass = false,
isDragClass = false,
isDragWireProperty = false,
isDragProperty = false,
isDragWireIndividual = false,
isDragIndividual = false,
openArchivedFiles = false,
authenticated = false,
historyName = "",
fileName = "New Vocab",
fileKey = "",
fileArchived = false,
fileLocked = false,
filePublished = false,
fileEditable = true,
fileUpdated = "",
fileWithHistory = false,
inClass = -1,
inDetailUpdate = "none",
graphUrl = "",
arrClass = [],
arrProperties = [],
arrConnections = [],
arrNamespaces = [],
arrIndividuals = [],
jsonData = [],
r = {};

window.onload = function() {
    raphaelCanvas = Raphael("holder", 1250, 570);
    configButtons();
    showBrowse();
    openFile("new");
}
