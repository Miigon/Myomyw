var maxLCol = 10, maxRCol = 10;
var minLCol = 3, minRCol = 3;
var defaultLCol = 6, defaultRCol = 6;
var maxMovements = 5;

var Chessman = { common: 0, key: 1, addCol: 2, delCol: 3, flip: 4 };
var chessmanTex = [res.Common_png, res.Key_png, res.AddCol_png, res.DelCol_png, res.Flip_png];
var left = 0, right = 1, both = 2, neither = 3;
var Action = { nothing: 0, moving: 1, cooling: 2 };
var EndReason = { opponentLeft: 0, youWin: 1, opponentWins: 2, youOutOfTime: 3, opponentOutOfTime: 4 };

function getRandomChessman() {
    switch (Math.floor(Math.random() * 11)) {
        case 0:
            return Chessman.key;
        case 1:
            return Chessman.addCol;
        case 2:
            return Chessman.delCol;
        case 3:
            return Chessman.flip;
        default:
            return Chessman.common;
    }
}

//cc.formatStr并不能代替这个
function format(str) {
    if (cc.isString(str)) {
        for (var i = 1; i < arguments.length; i++) {
            str = str.replace("{" + (i - 1) + "}", arguments[i]);
        }
    } else {
        str = "";
    }
    return str;
};

function getNoCacheUrl(url) {
    if (cc.game.config["noCache"] && !cc.sys.isNative) {
        if (/\?/.test(url))
            url += "&_t=" + (new Date() - 0);
        else
            url += "?_t=" + (new Date() - 0);
    }
    return url;
}

function parseJson(str) {
    if (cc.sys.isNative)
        return JSON.parse(str);
    else
        return str;
}