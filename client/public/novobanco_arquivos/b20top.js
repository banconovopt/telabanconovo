/*<%@language=jscript%><% para se ter HighLigth*/
if (typeof (bNet) === 'undefined') var bNet = {};
bNet.Util = function () { throw "Not Implemented"; };
bNet.Val = function () { throw "Not Implemented"; };
bNet.Timer = function () { throw "Not Implemented"; };
bNet.Ani = function () { throw "Not Implemented"; };

var Topo = top.frames['iframeBrowser'] != null ? (top.frames['iframeBrowser'].contentWindow != null ? top.frames['iframeBrowser'].contentWindow : top.frames['iframeBrowser']) : top;
bNet.casca = Topo.casca;
bNet.HP = Topo.HP;
bNet.crm = Topo.crm;
bNet.fv40 = Topo.fv40;

var sessionExpiringAlert = false;

//--------------------------------------- Util -------------------------------------------------------
function bNet$Util$ShowHelp() {
    bNet.fv40.showLightBox({ content: '<div id="PAGINA"><div class="hlpW">' + bNet.Util.helpMessage + '</div></div>', title: bNet.Util.helpTitle, renderType: "html", draggable: true, modal: false, height: "100%", width: 400 });
}

function bNet$Util$getUrl20(url) {
    var redirect = (url.indexOf('20/') != -1) || (url.indexOf('W1/') != -1) || (url.indexOf('W3/') != -1) || (url.indexOf('W4/') != -1) || (url.indexOf('ocp/') != -1);
    if (redirect)
        return url;

    url = url.toLowerCase();
    if (url.indexOf('p/') != -1)
        return url.replace(new RegExp("p/", "g"), "P20/");
    if (url.indexOf('axb/') != -1)
        return url.replace(new RegExp("axb/", "g"), "axb20/");
    if (url.indexOf('besa/') != -1)
        return url.replace(new RegExp("besa/", "g"), "besa20/");
    if (url.indexOf('n/') != -1)
        return url.replace(new RegExp("n/", "g"), "N20/");
    if (url.indexOf('cb/') != -1)
        return url.replace(new RegExp("cb/", "g"), "cb20/");
    if (url.indexOf('besae/') != -1)
        return url.replace(new RegExp("besae/", "g"), "besae20/");
    if (url.indexOf('sfem/') != -1)
        return url.replace(new RegExp("sfem/", "g"), "sfem20/");
}

getNavigationUrl = bNet$Util$getNavigationUrl = function (srv, isFV, params, force20, isFV40) {
    var fMainDoc = bNet.Util.getMainDocument();
    var hasCert = bNet.casca && bNet.casca.hasCert;
    var host, base;
    var isGreen = false;

    if (fMainDoc != null) {
        //pathname exemplos: '/web/PTPW1/' '/web/PTPW3/' '/web/PTPW4/'
        var temp = top.location.pathname.split('/');
        if (temp.length > 2 && temp[2] != null) {
            isGreen = (temp[2].indexOf('W1') != -1) || (temp[2].indexOf('W3') != -1) || (temp[2].indexOf('W4') != -1) || (temp[2] == "ocp");

            if (isGreen) {
                base = (isFV != null && isFV) ? '/web/' : (hasCert ? '/webcf/' : '/web/');
                if (temp[2] == "ocp") {
                    host = temp[2];
                }
                else {
                    host = temp[2].substring(0, temp[2].length - 1);
                    host += (isFV40) ? '4' : (isFV) ? '3' : '1';
                }
            } else {
                base = (isFV != null && isFV) ? '/wt/' : (hasCert ? '/wcsv/' : '/wclientes/');

                var hostActual = (temp[2].substring(0, temp[2].length - 2));
                hostActual = hostActual.toLowerCase();
                host = hostActual;

                //Se Particulares Continente
                if (hostActual == 'axb' || hostActual == 'besp' || hostActual == 'bespn') {
                    host = (isFV) ? 'BesP' : 'axb';
                }
                    //Se Particulares Acores
                else if (hostActual == 'besA' || hostActual == 'bacp' || hostActual == 'bacpn') {
                    host = (isFV) ? 'BacP' : 'besA';
                }
                    //Se Empresas Acores
                else if (hostActual == 'besae' || hostActual == 'bacn' || hostActual == 'bacnn') {
                    host = (isFV) ? 'BacN' : 'besAE';
                }
                    //Se Empresas Continente
                else if (hostActual == 'cb' || hostActual == 'besn' || hostActual == 'besnn') {
                    host = (isFV) ? 'BesN' : 'CB';
                }
                    //Se Empresas Sucursal Financeira Exterior
                else if (hostActual == 'sfem' || hostActual == 'sfemn') {
                    host = (isFV) ? 'SfeM' : 'SfeM';
                }
                    //Se Empresas Luxemburgo
                else if (hostActual == 'besln' || hostActual == 'beslnn') {
                    host = (isFV) ? 'BesLN' : 'BesLN';
                }
                    //Se Empresas Espanha
                else if (hostActual == 'bessen' || hostActual == 'bessenn') {
                    host = (isFV) ? 'BesseN' : 'bessen';
                }

                host += (isFV40) ? 'N20' : '20';

            }

            if (!isFV)
                srv = 'tpl.asp?srv=' + srv + ((params != null) ? '&' + params : '');
            else
                srv = 'service.aspx/' + srv + ((params != null) ? '?' + params : '');

            return base + host + '/' + srv;
        }
    }
    return null;
}

bNet.Util = {
    getMainFrame: function () {
        return Topo.document.getElementById("main");
    },
    getMainDocument: function () {
        var mf = this.getMainFrame();
        if (mf == null) return document;

        try {
            return mf.contentWindow.document;
        } catch (e) {
            // external srv 
            return null;
        }
    },
    getUrlBase: function (doc) {
        var pathName = doc.location.pathname;
        var port = (doc.location.port != "" ? ":" + doc.location.port : "")
        var urlBase = doc.location.protocol + "//" + doc.location.hostname + port + pathName.substr(0, pathName.lastIndexOf("/"));
        return urlBase + "/";
    },
    isIE: function () {
        return ((navigator.userAgent.toLowerCase()).indexOf("msie") != -1);
    },
    _helpWindow: null,
    helpTitle: "",
    helpMessage: "",
    showHelp: bNet$Util$ShowHelp,
    getUrl20: bNet$Util$getUrl20,
    getNavigationUrl: bNet$Util$getNavigationUrl,
    getBrowserInfo: function () {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: 'IE', version: (tem[1] || '') };
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
            if (tem != null) { var ed = tem.slice(1).join(' ').replace('OPR', 'Opera').split(' '); return { name: ed[0], version: ed[1] }; }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
        return {
            name: M[0],
            version: M[1]
        };
    },
    browserWithoutJavaSupport: function (strBrwLst) {
        var browsersSelfSigned = ["Chrome 45"];
        if (typeof (strBrwLst) != "undefined" && strBrwLst != "")
            browsersSelfSigned = strBrwLst.split(",");
        var browser = bNet.Util.getBrowserInfo();
        if (browsersSelfSigned != null && browsersSelfSigned.length > 0) {
            for (i = 0; i < browsersSelfSigned.length; i++) {
                var res = browsersSelfSigned[i].split(" ");
                if (res[0] == browser.name && parseInt(browser.version) >= parseInt(res[1])) {
                    return true;
                    break;
                }
            }
        }
        return false;
    },
    expiringMsg: "",
    btYes: "",
    btNo: "",
    inactivityTime: ""
}
//--------------------------------------- Validation -------------------------------------------------------

validaTecla = bNet$Val$ValidaTecla = function (cf, ev, ti, dc) {
    var val = bNet.Val;
    if (ti == val.T_TELEMOVEL || ti == val.T_TELEFONE) return validaSoNumeros(ev);
    if (ti == val.T_NUMERICO) return validaNumerico(ev, cf, dc);
    if (ti == val.T_REAL) return validaNumericoReal(ev, cf, dc);
    if (validaCaracterEspecial(obtemCodigoTecla(ev))) return true;
    return true;
}
validaSoNumeros = bNet$Val$ValidaSoNumeros = function (ev) {
    var c = String.fromCharCode(obtemCodigoTecla(ev));
    if (c != '0' && c != '1' && c != '2' && c != '3' && c != '4' && c != '5' && c != '6' && c != '7' && c != '8' && c != '9') return false;
    return true;
}
verificaCampo = bNet$Val$VerificaCampo = function (cf, ti, vmin, vmax, dc) {
    var val = bNet.Val;
    if (ti == val.T_REAL) return verificaNumericoReal(cf.value, vmin, vmax, dc);
    if (ti == val.T_NUMERICO || ti == val.T_TELEFONE) return verificaNumerico(cf.value, vmin, vmax, dc);
    if (ti == val.T_TELEMOVEL) return verificaTelemovel(cf.value);
    if (ti == val.T_EMAIL) return verificaEmail(cf.value);
    return true;
}
validaNumericoReal = bNet$Val$ValidaNumericoReal = function (ev, cf, dc) {
    var c = String.fromCharCode(obtemCodigoTecla(ev)), pv, val = cf.value;
    if (typeof (dc) != "number")
        dc = 0;
    var p = val.indexOf("."), v = val.indexOf(",");
    var aceitaSeparador = ((p < 0) && (v < 0) && (dc > 0));
    pv = (v < 0) ? p : v;
    if ((c == ',' || c == '.') && !aceitaSeparador) return false;
    if ((p == 0) || (v == 0)) return false;
    if (c.search(/[0-9,.-]/) < 0) return false;
    if (pv > -1 && (val.length - pv) > dc) return false;
    return true;
}
validaNumerico = bNet$Val$ValidaNumerico = function (ev, cf, dc) {
    var c = String.fromCharCode(obtemCodigoTecla(ev)), pv, val = cf.value;
    var sP, eP = 0;

    if (ev.ctrlKey || ev.metaKey)
        return true;
    if (typeof (dc) != "number")
        dc = 0;
    var p = val.indexOf("."), v = val.indexOf(",");
    var aceitaSeparador = ((p < 0) && (v < 0) && (dc > 0));
    pv = (v < 0) ? p : v;
    if ((c == ',' || c == '.') && !aceitaSeparador) //return false;
    {
        if (cf.selectionEnd > 0 && cf.selectionStart <= pv && cf.selectionEnd >= pv) return true;
        else return false;
    }
    //if ((p==0) || (v==0))return false;
    if (c.search(/[0-9,.]/) < 0) return false;

    if (pv > -1 && (val.length - pv) > dc) {
        return allowReplace(cf, pv, c, aceitaSeparador);
    }
    else if (bNet.Val.isIE && (c == ',' || c == '.') && !aceitaSeparador) return false;

    return true;
}
//***********
function allowReplace(cf, pv, c, aceitaSeparador) {
    //debugger;
    //Breowsers IE
    if (bNet.Val.isIE) {
        var returnValue = false;
        var savedText = cf.value;
        var range = cf.document.selection.createRange();
        var selText = range.text;
        var split;
        //range.text = String.fromCharCode(1);
        if (cf.value.indexOf(".") >= 0)
            split = cf.value.split('.');
        else if (cf.value.indexOf(",") >= 0)
            split = cf.value.split(',');
        //Não foi seleccionado texto
        if (selText == "") {
            if (c == '.' || c == ',') { returnValue = false; } //Se não há text seleccionado não deixa inserir um separador
        }
            //A selecção inclui o separador
        else if (selText.indexOf(".") >= 0 || selText.indexOf(",") >= 0) { returnValue = true; } //Aceita o que quer que seja.
            //A selecção não inclui separado e foi aidionado um separador
        else if (c == '.' || c == ',') { returnValue = false; }
        else returnValue = true;
        //if(!returnValue) cf.value = savedText; else cf.value.replace(String.fromCharCode(1), "")
        return returnValue;
    }
        //Restantes Browsers
    else {
        //nao queremos inserir no fim ??? tavez precise lenght+1???
        if (cf.selectionEnd > cf.value.length) return false;

        //não queremos inserir depois da virgula qdo ja tem 2
        if (cf.selectionEnd > pv && cf.selectionEnd == cf.selectionStart) return false;
        //mas queremos inserir depois da virgula qdo ja tem 2 e ha seleccao
        if (cf.selectionEnd > pv && cf.selectionEnd != cf.selectionStart) return true;
        // queremos inserir antes da virgula 
        if (cf.selectionEnd <= pv) return true;
        //quando selecionamos tudo para apagar e escrever de novo
        if ((cf.selectionEnd - cf.selectionStart) == cf.value.length) return true;

        return false;
    }
}
validaTelemovel = bNet$Val$ValidaTelemovel = function (ev, cf) {
    var c, l;
    if (!validaNumerico(ev, cf)) return false;
    c = String.fromCharCode(obtemCodigoTecla(ev));
    l = cf.value.length;
    if (l == 0 && c != '9') return false;
    else if (l == 1 && (c != '1' && c != '2' && c != '3' && c != '6')) return false;
    return true;
}
verificaNumericoReal = bNet$Val$VerificaNumericoReal = function (val, vmin, vmax, dc) {
    val = ("" + val).replace(/\,/, ".");
    if ((val.search(/[-]/) >= 0) && ((val.indexOf("-") != 0) || (val.lastIndexOf("-") != 0))) return false;
    var f = parseFloat(val), pv;
    if (typeof (vmin) != "number") vmin = -1 * Number.MAX_VALUE;
    if (typeof (vmax) != "number") vmax = Number.MAX_VALUE;
    if (typeof (dc) != "number") dc = 0;
    if (isNaN(f)) return false;
    var p = val.indexOf("."), v = val.indexOf(",");
    pv = (v < 0) ? p : v;
    if (dc == 0 && pv > -1) return false;
    if (val.search(/^[0-9.,-]+$/) < 0) return false;
    if (f < vmin || f > vmax) return false;
    if (pv > -1 && (val.length - pv - 1) > dc) return false;
    return true;
}
verificaNumerico = bNet$Val$VerificaNumerico = function (val, vmin, vmax, dc) {
    val = ("" + val).replace(/\,/, ".");
    if (isNaN(val)) return false;
    var f = parseFloat(val), pv;
    if (typeof (vmin) != "number") vmin = Number.MIN_VALUE;
    if (typeof (vmax) != "number") vmax = Number.MAX_VALUE;
    if (typeof (dc) != "number") dc = 0;
    if (isNaN(f)) return false;
    var p = val.indexOf("."), v = val.indexOf(",");
    pv = (v < 0) ? p : v;
    if (dc == 0 && pv > -1) return false;
    if (val.search(/^[0-9.,]+$/) < 0) return false;
    if (f < vmin || f > vmax) return false;
    if (pv > -1 && (val.length - pv - 1) > dc) return false;
    return true;
}
verificaTelemovel = bNet$Val$VerificaTelemovel = function (val) {
    return (val.search(/^9[1236]\d{7}$/) != -1);
}
verificaEmail = bNet$Val$VerificaEmail = function (val) {
    var f = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
    if (!f.test(val)) return false;

    var p = val.indexOf("@");
    if (p == -1) return false;
    if (val.indexOf(".", p + 1) == -1) return false;

    if (val.length < 6) return false;
    return true;
}
obtemCodigoTecla = bNet$Val$ObtemCodigoTecla = function (e) {
    if (bNet.Val.isIE) return e.keyCode;
    else return e.which;
}
validaCaracterEspecial = bNet$Val$ValidaCaracterEspecial = function (t) { return t < 32 || (t >= 37 && t <= 40); }
processaSalto = bNet$Val$ProcessaSalto = function (cf, ev, px, l, cb) {
    if (!bNet.Val.salta) return;
    if (cb == true) px.focus();
    else {
        if (validaCaracterEspecial(obtemCodigoTecla(ev))) return;
        if (typeof (px) == "undefined") return;
        if (typeof (l) == "undefined") return;
        if (cf.value.length >= l) px.focus();
    }
}
mostraCalendario = bNet$Val$MostraCalendario = function (ano, mes, dia) {
    var fMainDoc = bNet.Util.getMainDocument();
    var p = bNet.Util.getUrlBase(fMainDoc);

    var css_cal = "";
    var ctg = bNet.Val.ctg;
    var idioma = bNet.Val.idioma;
    switch (ctg - 0) {
        case 81: //Fidelizado
        case 82: css_cal = "&css_suf=_x"; break;
        case 70: //Private
        case 128: css_cal = "&css_suf=_p"; break;
    }
    var l = p + "calendario2.asp?fld=" + ano + "|" + mes + "|" + dia + "&lg=" + idioma + "&ct=" + ctg + css_cal;

    if (bNet.Val.isIE)
        window.open(l, "Calendar", "resizable=no,width=280,height=310");
    else if (bNet.Val.isIPad)
        window.open(l, "Calendar", "resizable=yes,width=420,height=430");
    else
        window.open(l, "Calendar", "resizable=no,width=300,height=330");
    return true;
}
function bNet$Val$_MostraAEA(ms, css) {
    var main = Topo.main;
    if (main == null) main = window;
    var div = main.document.getElementById("AreaMensagemErro");
    if (div != null) {
        div.innerHTML = "<p>" + ms + "</p>";
        div.className = css;
        if (bNet.casca && bNet.casca.adjustHeight) {
            bNet.casca.adjustHeight();
        }
    }
}
mostraAlerta = bNet$Val$MostraAlerta = function (cf, ms, focar, limpar) {
    if (typeof (ms) == "string") mostraErro(ms);
    if (focar) cf.focus();
    if (limpar) cf.value = "";
    Topo.window.setTimeout(function () { Topo.window.scrollTo(0, 0); }, 10);

    return false;
}
mostraErro = bNet$Val$MostraErro = function (erro) {
    bNet$Val$_MostraAEA(erro, "message error");
}
mostraAviso = bNet$Val$MostraAviso = function (aviso) {
    bNet$Val$_MostraAEA(aviso, "message success");
}
mostraInfo = bNet$Val$MostraInfo = function (info) {
    bNet$Val$_MostraAEA(info, "message warning");
}
validaData = bNet$Val$ValidaData = function (dt) { return !isNaN(parseDate(dt)) }
validaHora = bNet$Val$ValidaHora = function (hora) { return !isNaN(parseTime(hora)) }
validaDataHora = bNet$Val$ValidaDataHora = function (dh) { return !isNaN(parseTimestamp(dh)) }
parseDate = bNet$Val$ParseDate = function (s) { return parseTimestamp(s + " 00:00:00.0000"); }
parseTime = bNet$Val$ParseTime = function (pt) {
    var now = new Date();
    return parseTimestamp(now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + pt);
}
anoBisexto = bNet$Val$AnoBisexto = function (y) { return ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0); }
parseTimestamp = bNet$Val$ParseTimestamp = function (s) {
    var s_date, s_time, year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0, nanos = 0;
    var first_dash, second_dash, dividing_space, first_colon, second_colon, period, i, c;
    if (typeof (s) == "undefined" || typeof (s) != "string") return NaN;
    dividing_space = s.indexOf(' ');
    if (dividing_space == -1 || dividing_space + 1 >= s.length) return NaN;
    s_date = s.substring(0, dividing_space);
    s_time = s.substring(dividing_space + 1);
    first_dash = s_date.indexOf('-');
    if (first_dash == -1 || first_dash + 1 >= s_date.length) return NaN;
    second_dash = s_date.indexOf('-', first_dash + 1);
    if (second_dash == -1) return NaN;
    for (i = 0; i < s_date.length; i++) {
        c = s_date.charAt(i);
        if ((c < '0' || c > '9') && (i != first_dash && i != second_dash))
            return NaN;
    }
    year = parseInt(s_date.substring(0, first_dash), 10);
    month = parseInt(s_date.substring(first_dash + 1, second_dash), 10) - 1;
    day = parseInt(s_date.substring(second_dash + 1), 10);
    if (year < 1900 || year > 9999) return NaN;
    if (month < 0 || month > 11) return NaN;
    if (day < 1) return NaN;
    switch (month) {
        case 3: case 5: case 8: case 10:
            if (day > 30) return NaN;
            break;
        case 1:
            if (day > 29) return NaN;
            if (day == 29 && !anoBisexto(year)) return NaN;
            break;
        default:
            if (day > 31) return NaN;
            break;
    }
    if (s_time == null) return NaN;
    first_colon = s_time.indexOf(':');
    if (first_colon == -1 || first_colon + 1 >= s_time.length) return NaN;
    second_colon = s_time.indexOf(':', first_colon + 1);
    if (second_colon != -1 && second_colon + 1 < s_time.length) period = s_time.indexOf('.', second_colon + 1);
    else period = -1
    for (i = 0; i < s_time.length; i++) {
        c = s_time.charAt(i);
        if ((c < '0' || c > '9') && (i != first_colon && i != second_colon && i != period))
            return NaN;
    }
    hour = parseInt(s_time.substring(0, first_colon), 10);
    if (second_colon != -1)
        minute = parseInt(s_time.substring(first_colon + 1, second_colon), 10);
    else
        minute = parseInt(s_time.substring(first_colon + 1), 10);
    if (second_colon != -1 && period != -1)
        second = parseInt(s_time.substring(second_colon + 1, period), 10);
    else if (second_colon != -1)
        second = parseInt(s_time.substring(second_colon + 1), 10);
    if (period != -1)
        nanos = parseInt(s_time.substring(period + 1), 10);
    return new Date(year, month, day, hour, minute, second, nanos);
}
validaAgendamento = bNet$Val$ValidaAgendamento = function (frm, dataSrv, av, av2, av3, av4, av5, email, avEmail, SMS, avSMS, avLimSup) {
    var hoje = parseDate("" + dataSrv.substring(0, 10));
    var d = frm.AGDDAY, dia = d.value * 1;
    var m = frm.AGDMONTH, mes = m.value * 1;
    var a = frm.AGDYEAR, ano = a.value * 1;
    if (ano == '' && mes == '' && dia == '') {
        dia = hoje.getDate();
        mes = hoje.getMonth() + 1;
        ano = hoje.getFullYear();
        d.value = dia; m.value = mes; a.value = ano;
    }
    var dt = new Date(ano, mes - 1, dia);
    if (dt.getDate() != dia) return mostraAlerta(d, av2, true, true);
    if (dt.getMonth() != mes - 1) return mostraAlerta(m, av2, true, true);
    if (dt.getFullYear() != ano) return mostraAlerta(a, av2, true, true);
    if (ano < hoje.getFullYear()) return mostraAlerta(a, av, true, true);
    if (ano == hoje.getFullYear() && mes < (hoje.getMonth() + 1)) return mostraAlerta(m, av, true, true);
    if (ano == hoje.getFullYear() && mes == (hoje.getMonth() + 1) && dia < hoje.getDate()) return mostraAlerta(d, av, true, true);
    var limSup = parseDate("" + dataSrv.substring(0, 10)); limSup.setDate(limSup.getDate() + 90);
    if (dt.getTime() > limSup.getTime()) return mostraAlerta(m, avLimSup, true, false);

    /*
        if ( hoje.getTime() >= dt.getTime() && ( ( frm.AGDEMAILCHK && frm.AGDEMAILCHK.checked ) || ( frm.AGDSMSCHK && frm.AGDSMSCHK.checked ) ) ) {
            if ( frm.AGDEMAILCHK ) frm.AGDEMAILCHK.checked = false ;
            if ( frm.AGDSMSCHK ) frm.AGDSMSCHK.checked = false ;
            return mostraAlerta(a,""+av5,true,false);
        }
    */
    var val = bNet.Val;
    if (frm.AGDEMAILCHK && frm.AGDEMAIL && frm.AGDEMAILCHK.checked && !parent.verificaCampo(frm.AGDEMAIL, val.T_EMAIL)) return mostraAlerta(frm.AGDEMAIL, "" + av3, true, false);
    if (frm.AGDSMSCHK && frm.AGDSMS && frm.AGDSMSCHK.checked && !parent.verificaCampo(frm.AGDSMS, val.T_TELEMOVEL)) return mostraAlerta(frm.AGDSMS, "" + av4, true, false);
    if (frm.AGDEMAILCHK && frm.AGDEMAILCHK.checked && frm.AGDEMAIL && frm.AGDEMAIL.value != email) frm.AGDEMAILCHK.value = "alterar";
    if (frm.AGDSMSCHK && frm.AGDSMSCHK.checked && frm.AGDSMS && frm.AGDSMS.value != sms) frm.AGDSMSCHK.value = "alterar";
    frm.AGD.value = a.value + '-' + (m.value.length < 2 ? "0" : "") + m.value + '-' + (d.value.length < 2 ? "0" : "") + d.value;
    return true;
}
inicializaAgendamento = bNet$Val$InicializaAgendamento = function (frm, dataSrv, bruta) {
    var hoje = parseDate("" + dataSrv.substring(0, 10));
    if (frm && frm.AGDDAY && (bruta == 1 || frm.AGDDAY.value == '')) { frm.AGDDAY.value = hoje.getDate(); if (frm.AGDDAY.value.length < 2) frm.AGDDAY.value = "0" + frm.AGDDAY.value; }
    if (frm && frm.AGDMONTH && (bruta == 1 || frm.AGDMONTH.value == '')) { frm.AGDMONTH.value = hoje.getMonth() + 1; if (frm.AGDMONTH.value.length < 2) frm.AGDMONTH.value = "0" + frm.AGDMONTH.value; }
    if (frm && frm.AGDYEAR && (bruta == 1 || frm.AGDYEAR.value == '')) frm.AGDYEAR.value = hoje.getFullYear();
}
limpaAgendamento = bNet$Val$LimpaAgendamento = function (frm, dataSrv, email, sms) {
    inicializaAgendamento(frm, dataSrv, 1);
    if (frm.AGDEMAILCHK) frm.AGDEMAILCHK.checked = false;
    if (frm.AGDEMAIL) frm.AGDEMAIL.value = "" + email;
    if (frm.AGDSMSCHK) frm.AGDSMSCHK.checked = false;
    if (frm.AGDSMS) frm.AGDSMS.value = "" + sms;
}
dateDiff = bNet$Val$DateDiff = function (start, end, interval, wholedays) {
    var iOut = 0;
    var bufferA = Date.parse(start);
    var bufferB = Date.parse(end);
    if (isNaN(bufferA) || isNaN(bufferB)) {
        return null;
    }
    if (interval.charAt == 'undefined') {
        return null;
    }
    var number = bufferB - bufferA;
    switch (interval.charAt(0)) {
        case 'd': case 'D':
            iOut = parseInt(number / 86400000);
            if (wholedays) iOut += parseInt((number % 86400000) / 43200001);
            break;
        case 'h': case 'H':
            iOut = parseInt(number / 3600000);
            if (wholedays) iOut += parseInt((number % 3600000) / 1800001);
            break;
        case 'm': case 'M':
            iOut = parseInt(number / 60000);
            if (wholedays) iOut += parseInt((number % 60000) / 30001);
            break;
        case 's': case 'S':
            iOut = parseInt(number / 1000);
            if (wholedays) iOut += parseInt((number % 1000) / 501);
            break;
        default:
            return null;
    }
    return iOut;
}
move_to = bNet$Val$MoveTo = function (doc, str) {
    var id = doc.getElementById(str)
    if (id == null)
        return false;

    var Y = id.offsetTop;
    var auxParent = id.offsetParent;

    while (auxParent.offsetTop != 0) {
        Y += auxParent.offsetTop;
        auxParent = auxParent.offsetParent;
    }

    doc.body.scrollTop = Y;
    return false;
}

bNet.Val = {
    ctg: 0,
    idioma: "PT",
    T_GENERICO: 0,
    T_NUMERICO: 1,
    T_EMAIL: 2,
    T_TELEFONE: 3,
    T_TELEMOVEL: 4,
    T_REAL: 5,

    isIE: bNet.Util.isIE(),
    isNS: ((navigator.userAgent.toLowerCase()).indexOf("msie") == -1),
    isIPad: navigator.userAgent.toUpperCase().indexOf("IPAD") >= 0,

    validaTecla: bNet$Val$ValidaTecla,
    validaSoNumeros: bNet$Val$ValidaSoNumeros,
    verificaCampo: bNet$Val$VerificaCampo,
    validaNumericoReal: bNet$Val$ValidaNumericoReal,
    validaNumerico: bNet$Val$ValidaNumerico,
    validaTelemovel: bNet$Val$ValidaTelemovel,
    verificaNumericoReal: bNet$Val$VerificaNumericoReal,
    verificaNumerico: bNet$Val$VerificaNumerico,
    verificaTelemovel: bNet$Val$VerificaTelemovel,
    verificaEmail: bNet$Val$VerificaEmail,
    obtemCodigoTecla: bNet$Val$ObtemCodigoTecla,
    validaCaracterEspecial: bNet$Val$ValidaCaracterEspecial,
    processaSalto: bNet$Val$ProcessaSalto,
    mostraCalendario: bNet$Val$MostraCalendario,
    mostraAlerta: bNet$Val$MostraAlerta,
    mostraErro: bNet$Val$MostraErro,
    mostraAviso: bNet$Val$MostraAviso,
    mostraInfo: bNet$Val$MostraInfo,
    validaData: bNet$Val$ValidaData,
    validaHora: bNet$Val$ValidaHora,
    validaDataHora: bNet$Val$ValidaDataHora,
    parseDate: bNet$Val$ParseDate,
    parseTime: bNet$Val$ParseTime,
    anoBisexto: bNet$Val$AnoBisexto,
    parseTimestamp: bNet$Val$ParseTimestamp,
    validaAgendamento: bNet$Val$ValidaAgendamento,
    inicializaAgendamento: bNet$Val$InicializaAgendamento,
    limpaAgendamento: bNet$Val$LimpaAgendamento,
    dateDiff: bNet$Val$DateDiff,
    move_to: bNet$Val$MoveTo,
    salta: bNet$Val$salta = true,

    iniValidation: function (salta, ctg, idioma) {
        this.salta = salta;
        this.ctg = ctg;
        this.idioma = idioma;
    }
}

function bNet$Timer$Mais(doTick) {
    if (bNet$Timer$Mais.arguments.length == 0) doTick = true;
    var end = false;

    var timer = bNet.Timer;
    if (timer.ctr < timer.ctmax && timer.ctri < timer.ctmaxi) {
        if (doTick) timer.ctr += timer.tick;
        if (timer.ctriEnabled) {
            if (doTick) timer.ctri += timer.tick;
        }
    }
    else {
        clearInterval(timer.ctid);
        end = true;
    }

    var calc = bNet$Timer$_Calculate(end, timer.ctr, timer.ctmax, timer.ctri, timer.ctmaxi, timer.wmax);
    bNet$Timer$_Render(calc);
}

function bNet$Timer$_Render(calc) {
    var timer = bNet.Timer;
    var times = calc.duration / 1000;
    var hour = Math.floor(times / 3600);
    var min = Math.floor((times - hour * 3600) / 60);
    var sec = Math.floor((times - hour * 3600) % 60);
    var text = Topo.document.getElementById("automaticLogoutText");
    var tmin = (min < 10) ? "0" + min : min;
    var tsec = (sec < 10) ? "0" + sec : sec;

    if (hour == 0) text.innerHTML = timer.msg.replace("{0}", tmin + ":" + tsec);
    else text.innerHTML = timer.msg.replace("{0}", hour + ":" + tmin + ":" + tsec);

    var bar = Topo.document.getElementById("automaticLogoutBar");
    var width = Math.floor(calc.width) - timer.wmax; //Math.floor(timer.wmax * percent) - timer.wmax
    bar.firstChild.style.backgroundPosition = width + "px 0px";

    if (min <= 1)
        bar.firstChild.className = "red";
    else
        bar.firstChild.className = "";

    if (calc.percent == 0) {
        bNet.fv40.closeLightBox();
        if (bNet.casca && bNet.casca.sessionEnd) {
            var logoutURL = getNavigationUrl('00801', false, true);
            bNet.casca.gotoSrvUrl(logoutURL);
        }
    }

    if (sessionExpiringAlert == false && hour == 0 && ((tmin * 1) < (bNet.Util.inactivityExpiringMsgTime * 1))) {
        bNet.casca.showLightBoxSessionExpiring(bNet.Util.expiringMsg, bNet.Util.btYes, bNet.Util.btNo);
        sessionExpiringAlert = true;
    }
}

function bNet$Timer$_Calculate(end, ctr, ctmax, ctri, ctmaxi, wmax) {
    var p = 0, d = 0;
    if (!end) {
        var cm, c;
        if (ctmax - ctr < ctmaxi - ctri) {
            cm = ctmax;
            c = ctr;
        }
        else {
            cm = ctmaxi;
            c = ctri;
        }
        p = 1 - 1 * c / cm;
        d = cm - c;
        if (ctr / ctmax > ctri / ctmaxi) {
            cm = ctmax;
            c = ctr;
        }
        else {
            cm = ctmaxi;
            c = ctri;
        }
        w = wmax - wmax * c / cm;
    }
    return { percent: p, width: w, duration: d };
}

bNet.Timer = {
    tick: 1000,
    ctid: null,     // id fn timer
    wmax: 0,        // bar max width

    msg: "",
    ctr: 0,         // t (ms)
    ctmax: 0,       // t max (ms)
    ctri: 0,        // t inactividade (ms)
    ctmaxi: 0,      // t max inactividade (ms) ?

    ctriEnabled: true,

    mais: bNet$Timer$Mais,

    iniTimer: function (msg, ps, ts, pin, tin, isVertical) {
        this.msg = msg;
        this.ctr = ps * 1000;
        this.ctmax = ts * 1000;
        this.ctri = pin * 1000;
        this.ctmaxi = tin * 1000;

        var bar = Topo.document.getElementById("automaticLogoutBar");
        this.wmax = bar.offsetWidth;

        //Guarda no HiddenField "hfInactividadeBLBase" o tempo de inactividade que está configurado em BD
        Topo.document.getElementById("hfInactividadeBLBase").innerHTML = tin;

        bNet$Timer$Mais(false);
        this.ctid = setInterval(bNet$Timer$Mais, this.tick);
    },
    resetInactividade: function () {
        this.ctri = 0;
        sessionExpiringAlert = false;
    },
    setInactividade: function (enabled) {
        this.ctriEnabled = enabled;
    },
    endTimer: function () {
        clearInterval(this.ctid);
    }
}

bNet.Ani = {
    msg: "",
    iniAnimation: function (msg) {
        this.msg = msg;
        var parent = Topo;
        if (parent && parent.menu && parent.menu.dt) parent.menu.dt = 0; document.cookie = 'mcsdsf=; assinaturaDigital=; expires=Thursday, 2 Aug 2001 00:00:00 UTC';
        bNet.Timer.resetInactividade();
    }
}
function startAnimation() {
    var fMainDoc = bNet.Util.getMainDocument();
    if (fMainDoc != null) {
        var aO = bNet.Ani;

        if (top && top.casca && typeof top.casca.getServiceFrame()[0].contentWindow.startLoader == 'function' && bNet && bNet.casca && !bNet.casca.hasLightboxIframe()) {
            top.casca.getServiceFrame()[0].contentWindow.startLoader();
        }
        else {
            if (bNet && bNet.casca && bNet.casca.hasLightboxIframe())
            { fMainDoc = bNet.casca.getLightBoxFrame()[0].contentWindow.document; }
            var mp = fMainDoc.getElementById("MP");
            var pagina = fMainDoc.getElementById("PAGINA");
            var mpp = fMainDoc.getElementById("MPP");
            if (mp != null) mp.style.display = "block";
            if (pagina != null) pagina.style.display = "none";
            if (mpp != null) mpp.innerHTML = aO.msg;
        }
    }
    return true;
}
function behave() {
    if (Topo && Topo.menu && Topo.menu.tr) Topo.menu.tr();
    startAnimation();
    Topo.window.scrollTo(0, 0);
}
function stopBehave() {
    var fMainDoc = bNet.Util.getMainDocument();
    var mp = fMainDoc.getElementById("MP");
    var pagina = fMainDoc.getElementById("PAGINA");
    if (mp != null) mp.style.display = "none";
    if (pagina != null) {
        pagina.style.display = "block";
        pagina.style.visibility = "visible";
        pagina.style.zoom = "1";
        pagina.className = "";
    }
}

function disableAnimation() { // validar com o JJC
    stopBehave();
}

/******* Funcoes de Navegação *******/


function switchToFV20(srv) {
    // usado no redirect WFG -> BES, para o  piloto B20
    navigateTo(srv, true, true);
}


function navigateToFV(srv, params) {
    navigateTo(srv, true, false, params);
}

function navigateToNMA(srv, params, forceBehave) {
    navigateTo(srv, false, false, params, forceBehave);
}

function navigateToURL(url, forceBehave) {
    if (bNet && bNet.casca && bNet.casca.hasLightboxIframe()) bNet.fv40.closeLightBoxes();

    if (forceBehave)
        behave();

    var fMainDoc = bNet.Util.getMainDocument();

    if (url)
        fMainDoc.location = url;
}

function navigateTo(srv, isFV, force20, params, forceBehave, isFV40) {
    var sUrl = getNavigationUrl(srv, isFV, params, force20, isFV40);

    if (sUrl) {
        navigateToURL(sUrl, forceBehave);
    }
}

function obtemImagem(params) {
    if (bNet.casca && bNet.casca.escreveImagem)
        bNet.casca.escreveImagem(params);
}

function navegaServico(Servico, Etapa, Utilizador, Adesao, Instituicao, TipoNavegacao, Parameters) {
    bNet.casca.navegaServico(Servico, Etapa, Utilizador, Adesao, Instituicao, TipoNavegacao, Parameters);
}

function navegaDetalhePedido(Servico, idPedido, TipoNavegacao, utilizador) {
    bNet.casca.navegaDetalhePedido(Servico, idPedido, TipoNavegacao, utilizador);
}

function copiaDadosRetorno() {
    var returnValue = new Object;
    var dadosRetorno = JSON.parse(bNet.casca.readCookie('dr'));

    if (dadosRetorno.Servico)
        returnValue.Servico = dadosRetorno.Servico;
    else
        returnValue.Servico = "";

    if (dadosRetorno.Etapa)
        returnValue.Etapa = dadosRetorno.Etapa;
    else
        returnValue.Etapa = "";

    if (dadosRetorno.Utilizador)
        returnValue.Utilizador = dadosRetorno.Utilizador;
    else
        returnValue.Utilizador = "";

    if (dadosRetorno.TipoNavegacao)
        returnValue.TipoNavegacao = dadosRetorno.TipoNavegacao;
    else
        returnValue.TipoNavegacao = "";

    if (dadosRetorno.TID)
        returnValue.TID = dadosRetorno.TID;
    else
        returnValue.TID = "";

    return returnValue;
}

function guardaDadosRetorno(servicoAlvo, etapaAlvo, utilizador, TipoNavegacao, TID) {
    //Passa a ser guardado em cookie porque uma nova chamada a este js elimina as variáveis globais
    var dadosRetorno = new Object;

    if (servicoAlvo)
        dadosRetorno.Servico = servicoAlvo;
    if (etapaAlvo)
        dadosRetorno.Etapa = etapaAlvo;
    if (utilizador)
        dadosRetorno.Utilizador = utilizador;
    if (TipoNavegacao)
        dadosRetorno.TipoNavegacao = TipoNavegacao;
    if (TID)
        dadosRetorno.TID = TID;

    bNet.casca.createCookie('dr', JSON.stringify(dadosRetorno), 1);
}

function navegaNMADetalheAssinatura(Servico, idPedido, tid, isPAB, etp) {
    var params = new Array();
    if (isPAB)
        params[1] = "pab=true";

    var TipoNavegacaoAlvo = isNaN(idPedido) ? 1 : 2;
    var tidarg = "";
    if (tid)
        tidarg = "tid=" + tid;

    var srvActivo = bNet.casca.currentSrv;
    var etpActiva = '01';
    if (etp !== undefined && etp !== null && etp !== '') {
        etpActiva = etp;
    }

    var utActivo = $('#listaEmpresas .activo').parent().data('empresa');

    guardaDadosRetorno(srvActivo, etpActiva, utActivo, 2, tidarg);
    navegaDetalheAssinatura(Servico, null, null, TipoNavegacaoAlvo, idPedido, params);
}

function navegaFlexViewDetalheAssinatura(Servico, Adesao, Instituicao, idPedido, ServicoRetorno, EtapaRetorno, TID, isPAB, tipoNavegacao) {
    var params = new Array();

    if (isPAB)
        params[1] = "pab=true";

    var utActivo = $('#listaEmpresas .activo').parent().data('empresa');

    var servicoAlvo = ("" + ServicoRetorno).length > 3 ? ("" + ServicoRetorno) : ("000" + ServicoRetorno).slice(-3);
    var etapaAlvo = ("" + EtapaRetorno).length > 2 ? ("" + EtapaRetorno) : ("00" + EtapaRetorno).slice(-2);

    guardaDadosRetorno(servicoAlvo, etapaAlvo, utActivo, 1, escape(TID));
    navegaDetalheAssinatura(Servico, Adesao, Instituicao, tipoNavegacao, idPedido, params);
}


function navegaDetalheAssinatura(Servico, Adesao, Instituicao, TipoNavegacao, idPedido, Parameters) {
    //Refresca a toolbar para que possa carregar os dados das adesões que entretanto tenham feito login.
    var utilizador = $("#listaEmpresas li[data-adesao=" + Adesao + "]").data('empresa');//O utilizador para poder comparar se é o user corrente.
    var servicoAlvo = bNet.casca.GetServicoAlvo(Servico, bNet.casca.currentSrv, TipoNavegacao);//Vai calcular o serviço alvo conforme o tipo de serviço de navegação: NMA=908; FV: Servico
    var etapaAlvo = bNet.casca.GetEtapaAssinatura(TipoNavegacao);//Vai calcular a etapa alvo conforme o tipo de serviço de navegação: NMA=52; FV=150

    //Adiciona o parametro em falta
    Parameters[0] = bNet.casca.GetDetailParameterName(TipoNavegacao) + "=" + idPedido;//Cria o parametro do detalhe de pedido: NMA=nReq; FV=pd

    bNet.casca.navegaServico(servicoAlvo, etapaAlvo, utilizador, Adesao, Instituicao, TipoNavegacao, Parameters);
}

function navegaVoltarServicoUtilizador(Parameters) {
    var dadosRetorno = JSON.parse(bNet.casca.readCookie('dr'));

    if (Parameters === null || Parameters === undefined || Parameters.length > 0)
        Parameters = new Array();
    if (!$.isEmptyObject(dadosRetorno)) {
        var retorno = copiaDadosRetorno();
        Parameters[2] = unescape(retorno.TID);
        bNet.casca.navegaServico(retorno.Servico, retorno.Etapa, retorno.Utilizador, null, null, retorno.TipoNavegacao, Parameters);
    }
    else {
        return false;
    }
}

/******* Funcoes FLEXVIEW *******/
function FV$loaded(Service_ID, Step_ID, Texto_Help, Funcao_para_printComprovativo, Titulo_Help) {
    if (bNet.casca && bNet.casca.hasLightboxIframe())
        return;

    if (bNet.casca && bNet.casca.setContext)
        bNet.casca.setContext(Service_ID, true);

    //falta -->setAlertaParamFunction(obtemTipoAlerta());
    if (Texto_Help == undefined || Texto_Help == null || Texto_Help == '' || Texto_Help == '#HELP#' || Texto_Help == '#HELP#123' || Texto_Help.indexOf('PimcNmaMessage') != -1)
        Texto_Help = '';

    bNet.Util.helpMessage = Texto_Help;
    bNet.Util.helpTitle = Titulo_Help;
    if (bNet.casca && bNet.casca.showHelpGlobal) {
        bNet.casca.showHelpGlobal(bNet.Util.showHelp, Texto_Help);
    }

    FV$printout(Funcao_para_printComprovativo);

    //Faz reset ao tempo de inactividade
    bNet.Timer.resetInactividade();
    //Faz "reset" ao tempo guardado no HiddenField "hfInactividadeBL" para o que está configurado de base e vem da BL e fica guardado no HiddenField "hfInactividadeBLBase"
    Topo.document.getElementById("hfInactividadeBL").innerHTML = Topo.document.getElementById("hfInactividadeBLBase").innerHTML;
}
function FV$printout(Funcao_para_PrintOut) {
    if (bNet.casca && bNet.casca.showPrint) {
        var w = bNet.Util.getMainFrame().contentWindow;
        var fn = w[Funcao_para_PrintOut];
        if (typeof fn == 'function')
            bNet.casca.showPrint(fn);
    }
}
function FV$exportar(Funcao_para_Exportacao) {
    if (bNet.casca && bNet.casca.showExport && !bNet.casca.hasLightboxIframe()) {
        var w = bNet.Util.getMainFrame().contentWindow;
        var fn = w[Funcao_para_Exportacao];
        if (typeof fn == 'function')
            bNet.casca.showExport(fn);
    }
}
function FV$error(Texto_Mensagem_Erro) {
    if (bNet.casca && bNet.casca.sessionEnd) {
        var logoutURL = getNavigationUrl('00801', false, true);
        bNet.casca.sessionEnd(Texto_Mensagem_Erro.replace("<br/>", "\n"));
        bNet.casca.gotoSrvUrl(logoutURL);
    }
}
function FV$isActive() {
    return true;
}
function FV$resize() {
    if (bNet.casca && bNet.casca.adjustHeight) {
        bNet.casca.adjustHeight();
    }
}
function FV$updQuickLinks(links) {
    if (bNet.casca && bNet.casca.updateQuickEntries) {
        bNet.casca.updateQuickEntries(links);
    }
}

function FV$NavegaServicoUser(Servico, Etapa, User, Instituicao, TipoNavegacao, Parameters) {
    var params = new Array();
    var utilizador = $("#listaEmpresas li[data-ushark=" + User + "]").data('empresa');
    var servicoAlvo = ("" + Servico).length > 3 ? ("" + Servico) : ("000" + Servico).slice(-3);
    var etapaAlvo = ("" + Etapa).length > 2 ? ("" + Etapa) : ("00" + Etapa).slice(-2);
    params[0] = Parameters;
    bNet.casca.navegaServico(servicoAlvo, etapaAlvo, utilizador, null, Instituicao, TipoNavegacao, params);
}

function FV$NavegaDetalhePedido(Servico, idPedido) {
    var utilizador = $('#listaEmpresas .activo').parent().data('empresa');
    var TipoNavegacao = 2

    bNet.casca.navegaDetalhePedido(Servico, idPedido, TipoNavegacao, utilizador);
}

function FV$NavegaVoltar(Parameters) {
    var params = new Array();
    var dadosRetorno = JSON.parse(bNet.casca.readCookie('dr'));

    if (!$.isEmptyObject(dadosRetorno)) {
        var retorno = copiaDadosRetorno();
        params[0] = unescape(retorno.TID);
        bNet.casca.createCookie('dr', '', -1);
        bNet.casca.navegaServico(retorno.Servico, retorno.Etapa, retorno.Utilizador, null, null, retorno.TipoNavegacao, params, true);
    }
    else {
        return false;
    }
}

/******* por questões de compatibilidade publicam-se as fns FV no top *******/
top.FV$loaded = FV$loaded;
top.FV$isActive = FV$isActive;
top.FV$printout = FV$printout;
top.FV$exportar = FV$exportar;
top.FV$error = FV$error;
top.FV$resize = FV$resize;
top.FV$updQuickLinks = FV$updQuickLinks;
top.FV$setHeight = (bNet.casca != null) ? bNet.casca.setHeight : function () { throw "Not Implemented"; };
top.FV$NavegaServicoUser = FV$NavegaServicoUser;
top.FV$NavegaDetalhePedido = FV$NavegaDetalhePedido;
top.FV$NavegaVoltar = FV$NavegaVoltar;

top.navigateToNMA = navigateToNMA;
top.navigateToFV = navigateToFV;
top.navigateTo = navigateTo;
top.navigateToURL = navigateToURL;
top.switchToFV20 = switchToFV20;
top.obtemImagem = obtemImagem;
top.navegaServico = navegaServico;
top.navegaDetalhePedido = navegaDetalhePedido;
top.copiaDadosRetorno = copiaDadosRetorno;
top.guardaDadosRetorno = guardaDadosRetorno;
top.navegaNMADetalheAssinatura = navegaNMADetalheAssinatura;
top.navegaFlexViewDetalheAssinatura = navegaFlexViewDetalheAssinatura;
top.navegaDetalheAssinatura = navegaDetalheAssinatura;
top.navegaVoltarServicoUtilizador = navegaVoltarServicoUtilizador;

