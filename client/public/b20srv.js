if (typeof(bNet) === 'undefined') var bNet = {};
bNet.Ctx = function () {throw "Not Implemented";};
bNet.Sombra = function () { throw "Not Implemented"; };
bNet.Data = function () { throw "Not Implemented"; };

var Topo = top.frames['iframeBrowser'] != null ? (top.frames['iframeBrowser'].contentWindow != null?top.frames['iframeBrowser'].contentWindow:top.frames['iframeBrowser']) : top;

if ((typeof (bNet.Val) === 'undefined') && (typeof (Topo.bNet.Val) !== 'undefined')) bNet.Val = Topo.bNet.Val;
bNet.casca = Topo.casca;
bNet.HP = Topo.HP;
if ((typeof (bNet.Util) === 'undefined') && (typeof (Topo.bNet.Util) !== 'undefined')) bNet.Util = Topo.bNet.Util;
if ((typeof (bNet.Timer) === 'undefined') && (typeof (Topo.bNet.Timer) !== 'undefined')) bNet.Timer = Topo.bNet.Timer;
if ((typeof (bNet.Ani) === 'undefined') && (typeof (Topo.bNet.Ani) !== 'undefined')) bNet.Ani = Topo.bNet.Ani;


function bNet$Ctx$ValidaTop(url) {
    if (typeof(Topo.bNet) === 'undefined') window.document.location.href=url;
}
function bNet$Ctx$MudaUtilizador() {
    if (parent.frames.menu != null) parent.frames.menu.actualizaMenu();
}
function bNet$Ctx$IniContexto(srv) {
	if (bNet.casca && bNet.casca.setContext && bNet.casca.getServiceFrame()[0].contentWindow.document == document)
		bNet.casca.setContext(srv);
}
function bNet$Ctx$Print() {
    window.open('about:blank', 'ESI_Print', 'resizable=yes,status=no,scrollbars=yes, height=500px,width=700px');
    if (navigator.userAgent.indexOf("MSIE 5.0") > 0) document.forms.frmImp.method = "GET";
    document.forms.frmImp.submit();
}
function bNet$Ctx$IniPrint(impFn) {
	if (bNet.casca && bNet.casca.hasLightboxIframe())
		return;
		
    if (bNet$Ctx$IniPrint.arguments.length == 0) impFn = bNet$Ctx$Print;
    if (bNet.casca && bNet.casca.showPrint) {
        bNet.casca.showPrint(impFn);
    }
    else {
        icons = document.getElementById("ICONS");
        if (icons != null) {
            icons.style.display = "block";
        }
    }
}
function bNet$Ctx$IniAlerta() {
	if(Topo.obtemTipoAlerta && !bNet.casca.hasLightboxIframe())
	{
        var tipoAlerta = Topo.obtemTipoAlerta();
        if (tipoAlerta != "" && tipoAlerta != null && !isNaN(tipoAlerta)) {
            icons = document.getElementById("ICONS");
            if (icons != null) {
                icons.style.display = "block";
            }
        }
    }
}
function bNet$Ctx$IniHelp(helpMsg, helpTitle) {
	if (bNet.casca && bNet.casca.hasLightboxIframe())
		return;
			
	if (helpMsg == undefined || helpMsg == null || helpMsg == '' || helpMsg == '#HELP#' || helpMsg == '#HELP#123') 
		helpMsg = '';

	bNet.Util.helpTitle = helpTitle;
	bNet.Util.helpMessage = helpMsg;

	if (bNet.casca && bNet.casca.showHelpGlobal) {
		bNet.casca.showHelpGlobal(bNet.Util.showHelp, helpMsg);
	}
	else
	{
		var icons = document.getElementById("ICONS");
		if (icons != null) {
			icons.style.display = "block";
		}
		var help = document.getElementById("ICON_HELP");
		if (help != null) {
			help.style.display = "block";
		}
	}
}
function bNet$Ctx$IniSave(saveFn) {
	if (bNet.casca && bNet.casca.showExport) {
		bNet.casca.showExport(saveFn);
	}
	else
	{
		icons = document.getElementById("ICONS");
		if (icons != null) {
			icons.style.display = "block";
		}
	}
}
function bNet$Ctx$IniCorreio(nmsg) {
    if (bNet.HP && bNet.HP.updMensagens) {
        bNet.HP.updMensagens(nmsg);
    }	
}
function bNet$Ctx$AlteraIdioma(idioma, mensagem) {
    if (bNet.HP && bNet.HP.updIdioma) {
        bNet.HP.updIdioma();
    }
	
    bNet.Val.idioma = idioma; //verificar se realmente é necessário
}
function bNet$Ctx$alteraPaginaInicial(servico)
{
    if (bNet.casca && bNet.casca.setHomeLink) {
        bNet.casca.setHomeLink(servico);
    }
}
function bNet$Ctx$Resize() {
    if (bNet.casca && bNet.casca.adjustHeight) {
        bNet.casca.adjustHeight();
    }
}
function bNet$Ctx$FimSessao(msg) {
    if (bNet.casca && bNet.casca.sessionEnd) {
        bNet.casca.sessionEnd(msg);
    }
}
bNet.Ctx = {
    _helpMessage:"",
    validaTop: bNet$Ctx$ValidaTop,
    mudaUtilizador: bNet$Ctx$MudaUtilizador,
    iniAlerta: bNet$Ctx$IniAlerta,
    iniPrint: bNet$Ctx$IniPrint,
    iniSave: bNet$Ctx$IniSave,
    iniHelp: bNet$Ctx$IniHelp,
    iniCorreio: bNet$Ctx$IniCorreio,
    iniContexto: bNet$Ctx$IniContexto,
    print: bNet$Ctx$Print,
    resize: bNet$Ctx$Resize,
    alteraIdioma: bNet$Ctx$AlteraIdioma,
    alteraPaginaInicial: bNet$Ctx$alteraPaginaInicial,
    fimSessao: bNet$Ctx$FimSessao
}

function bNet$Sombra$Navigate(url, doBehave) {
	bNet.casca.dontAjustHeight();
    if (bNet$Sombra$Navigate.arguments.length == 1) doBehave = true;
    var frm = bNet.Sombra.getFrame();
    var fMainDoc = bNet.Util.getMainDocument();
    frm.src = bNet.Util.getUrlBase(fMainDoc) + url;
    if (doBehave) behave();
    return true;
}
function bNet$Sombra$MeToMain() {
    if (!bNet.Sombra.isSombra())
        return true;

    bNet.casca.swapFrameSombra();

    return false;
}
function bNet$Sombra$MainFromSombra() {
    bNet.casca.swapFrameSombra(true);

    var fMainWnd = bNet.Util.getMainFrame().contentWindow;
    if (typeof fMainWnd.__iniCtx == 'function') fMainWnd.__iniCtx();
    if (typeof fMainWnd.__iniToolbar == 'function') fMainWnd.__iniToolbar();
    if (typeof fMainWnd.__iniSrv == 'function') fMainWnd.__iniSrv();
    fMainWnd.stopBehave();

    bNet.Sombra.rewrite("");
    return true;
}

bNet.Sombra = {
    getFrame: function () {
        var arr = bNet.casca.getSombraFrame(); //array jQuery
        if (arr == null) return null;
        else return arr[0];
    },
    navigate: bNet$Sombra$Navigate,
    meToMain: bNet$Sombra$MeToMain,
    mainFromSombra: bNet$Sombra$MainFromSombra,
    isSombra: function () {
        return frameElement.id == "sombra";
    },
    rewrite: function (html) {
        var fSombraWnd = bNet.Sombra.getFrame().contentWindow;
        fSombraWnd.document.open();
        fSombraWnd.document.write(html);
        fSombraWnd.document.close();
    }
}

bNet.Data = {
    getCtx: function () {
        return Topo.__ctxDados;
    },
    setCtx: function (ctx) {
        Topo.__ctxDados = ctx;
    }
}

if (typeof Topo.startAnimation == 'function') startAnimation = Topo.startAnimation;
if (typeof Topo.behave == 'function') behave = Topo.behave;
if (typeof Topo.stopBehave == 'function') stopBehave = Topo.stopBehave;
