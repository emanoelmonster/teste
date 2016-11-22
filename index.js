/**
 *Colocar neste arquivo apenas funções utilitárias independentes do jquery. 
 */

(function(exports){
    
exports.date_format = function(tm) {
    return [
        (tm.getDate() + 100 + '').substr(1), (tm.getMonth() + 101 + '').substr(1), tm.getFullYear()
    ].join('/');
};

exports.today = function() {
    var tm = new Date();
    return exports.date_format(tm);
};

exports.last_month = function() {
    var tm = new Date();
    tm.setMonth(tm.getMonth() - 1);
    return exports.date_format(tm);
};

exports.next_month = function(date) {
    var tm = new Date();
    if (date) {
        date = date.match(/[0-9]+/g);
        tm = new Date(date[2], date[1] - 1, date[0]);
    }
    tm.setMonth(tm.getMonth() + 1);
    var result = exports.date_format(tm);
    return result;
};

exports.next_day = function(date) {
    var tm = new Date();
    if (date) {
        date = date.match(/[0-9]+/g);
        tm = new Date(date[0], date[1] - 1, date[2]);
    }
    tm.setDate(tm.getDate() + 1);
    var result = exports.date_ymd_z(exports.date_format(tm));
    return result;
};

exports.date_ymd_z = function(dt) {
    if (typeof dt === 'string') {
        var dtsep = dt.match(/[0-9]+/g);
        if (dtsep && dtsep.length === 3) {
            if (parseInt(dtsep[2], 10) > 1900) {
                dtsep.reverse();
                dtsep[0] = exports.str_pad(dtsep[0], 4);
                dtsep[1] = exports.str_pad(dtsep[1], 2);
                dtsep[2] = exports.str_pad(dtsep[2], 2);
            }
            return dtsep.join('-');
        }
    }
    return '';
};

exports.date_ymd = function(dt) {
    var res = exports.date_ymd_z(dt);
    return res ? res : exports.date_ymd_z(exports.today());
};

exports.date_dmy_z = function(dt) {
    if (typeof dt === 'string') {
        var dtsep = dt.match(/[0-9]+/g);
        if (dtsep && dtsep.length === 3) {
            if (parseInt(dtsep[0], 10) > 1900) {
                dtsep.reverse();
                dtsep[0] = exports.str_pad(dtsep[0], 2);
                dtsep[1] = exports.str_pad(dtsep[1], 2);
                dtsep[2] = exports.str_pad(dtsep[2], 4);
            }
            return dtsep.join('/');
        }
    }
};

exports.date_dmy = function(dt) {
    var res = exports.date_dmy_z(dt);
    return res ? res : exports.today();
};

exports.time_dmy = function(time_sec) {
    var d = new Date(time_sec * 1000);
    var date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    var hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours() + '';
    var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() + '';
    var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds() + '';
    var time = hours + ':' + minutes + ':' + seconds;

    return date + ' ' + time;
};

exports.time_ymd = function(time_sec) {
    var d = new Date(time_sec * 1000);
    var ano = '' + d.getFullYear();
    var mes = d.getMonth() + 1;
    mes = (mes < 10 ? '0' : '') + mes;
    var dia = (d.getDate() < 10 ? '0' : '') + d.getDate();
    var date = ano + mes + dia;

    return date;
};

exports.time_hm = function(time_sec) {
    var negativo = false;
    if(time_sec < 0){
        negativo = true;
        time_sec *= -1;
    }
    var min = parseInt(time_sec / 60);
    var hr = parseInt(min / 60);
    var min = Math.abs(min % 60);

    hr = Math.abs(hr) < 10? '0'+hr:hr;
    min = Math.abs(min) < 10? '0'+min:min;

    return (negativo?'-':'')+hr + ':' + min;
};

exports.str_pad = function(number, lenght, str) {
    var number_str = number.toString();
    if (!str) {
        str = '0';
    }
    while (number_str.length < lenght) {
        number_str = str + number_str;
    }
    return number_str;
};

exports.float_to_currency = function(num, decimals, needed_decimals) {
    if (!decimals) {
        decimals = 2;
    }
    if (!needed_decimals) {
        needed_decimals = decimals;
    }

    if (isNaN(num)) {
        return '0';
    }

    var negative = false;
    if (num < 0) {
        num = Math.abs(num);
        negative = true;
    }
    var multi = Math.pow(10, decimals);
    var cents = Math.floor((num * multi + 0.5) % multi);
    num = Math.floor((num * multi + 0.5) / multi).toString();
    cents = exports.str_pad(cents, decimals);

    for ( var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    }
    var ret = num + ',' + cents;
    if (negative) {
        ret = ' - ' + ret;
    }

    for (i = 0; i < decimals - needed_decimals; i++) {
        if (ret.slice(-1) === '0') {
            ret = ret.slice(0, -1);
        }
    }

    return ret;
};

exports.currency_to_float = function(num) {
    if (!num) {
        num = '0';
    }
    return exports.currency_to_float_z(num);
};

exports.currency_to_float_z = function(num) {
    return parseFloat(num.replace(/\./g, '').replace(',', '.'));
};

exports.list_ufs = function() {
    return [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'SC',
        'RR',
        'SP',
        'SE',
        'TO'
    ];
};

exports.format_cnpj = function(cnpj) {
    if (!cnpj || isNaN(cnpj)) {
        return '';
    }
    cnpj = String(cnpj);
    var txt_cnpj = '-' + cnpj.substr(-2);
    txt_cnpj = '/' + cnpj.substr(-6, 4) + txt_cnpj;
    txt_cnpj = '.' + cnpj.substr(-9, 3) + txt_cnpj;
    txt_cnpj = '.' + cnpj.substr(-12, 3) + txt_cnpj;
    txt_cnpj = cnpj.substr(0, 2) + txt_cnpj;
    return txt_cnpj;
};

exports.format_cpf = function(cpf) {
    if (isNaN(cpf)) {
        return '';
    }
    cpf = String(cpf);
    var txt_cpf = '-' + cpf.substr(-2);
    txt_cpf = '.' + cpf.substr(-5, 3) + txt_cpf;
    txt_cpf = '.' + cpf.substr(-8, 3) + txt_cpf;
    txt_cpf = cpf.substr(-11, 3) + txt_cpf;
    return txt_cpf;
};

exports.clear_doc = function(doc) {
    if (!doc) {
        return '';
    }
    return doc.replace(/[^0-9]/ig, '');
};

exports.remove_accents = function(s) {
    var translate = {
        'Š':'S', 'š':'s', 'Ð':'Dj','Ž':'Z', 'ž':'z', 'À':'A', 'Á':'A', 
        'Â':'A', 'Ã':'A', 'Ä':'A', 'Å':'A', 'Æ':'A', 'Ç':'C', 'È':'E', 
        'É':'E', 'Ê':'E', 'Ë':'E', 'Ì':'I', 'Í':'I', 'Î':'I', 'Ï':'I', 
        'Ñ':'N', 'Ò':'O', 'Ó':'O', 'Ô':'O', 'Õ':'O', 'Ö':'O', 'Ø':'O', 
        'Ù':'U', 'Ú':'U', 'Û':'U', 'Ü':'U', 'Ý':'Y', 'Þ':'B', 'ß':'Ss',
        'à':'a', 'á':'a', 'â':'a', 'ã':'a', 'ä':'a', 'å':'a', 'æ':'a', 
        'ç':'c', 'è':'e', 'é':'e', 'ê':'e', 'ë':'e', 'ì':'i', 'í':'i', 
        'î':'i', 'ï':'i', 'ð':'o', 'ñ':'n', 'ò':'o', 'ó':'o', 'ô':'o', 
        'õ':'o', 'ö':'o', 'ø':'o', 'º': 'o', 'ù':'u', 'ú':'u', 'û':'u', 
        'ý':'y', 'ý':'y', 'þ':'b', 'ÿ':'y', 'ƒ':'f'
    };

    var translate_re = new RegExp('['+Object.keys(translate).join('')+']', 'g');
    return ( s.replace(translate_re, function(match) { 
      return translate[match]; 
    }) );
};

exports.straccentedcmp = function(a, b) {
    var a_c = exports.remove_accents(a.toLowerCase());
    var b_c = exports.remove_accents(b.toLowerCase());
    if(a_c == b_c){
        return 0;
    }
    if(a_c < b_c) {
        return -1;
    }
    return 1;
    
}

exports.checkEmail = function(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
exports.checkCPF = function(c) {
    var s = exports.str_pad(c, 11) + '';
    if(s.length > 11){
        return false;
    }
    var c = s.substr(0, 9);
    var dv = s.substr(9, 2);

    var d1 = 0;
    for (var i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (10 - i);
    }
    if (d1 == 0) {
        return false;
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9)
        d1 = 0;
    if (dv.charAt(0) != d1) {
        return false;
    }

    d1 *= 2;
    for (var i = 0; i < 9; i++) {
        d1 += c.charAt(i) * (11 - i);
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9)
        d1 = 0;
    if (dv.charAt(1) != d1) {
        return false;
    }
    return true;
}; 


exports.checkInscEstadual = function(ie, estado) {
    var inscEst = exports.clear_doc(ie);
    if (inscEst) {
        var dig = {
            8: "/BA*/RJ*",
            9: "/AL*/AP*/AM*/CE*/ES*/GO*/MA*/MS*/PA*/PB*/PI*/RN*/RR*/SC*/SE*/TO*",
            10: "/PR*/RS*",
            11: "/MT*",
            12: "/SP*",
            13: "/AC*/MG*/DF*",
            14: "/PE*/RO*"
        };
            

        var tam = false;
        for(var i in dig){
            if (dig.hasOwnProperty(i) && dig[i].indexOf("/"+estado+"*") != -1) {
                tam = i;
                break;
            }
        }
        if(!tam || inscEst.length > tam){
            //Estado não encontrado ou inscrição maior do que o permitido!
            return false;
        }
        inscEst=exports.str_pad(inscEst, tam, '0');        
        
        if (estado=="AC") {
            primDigito=0;
            seguDigito=0;
            pesos="43298765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=0;
            pesos="543298765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            seguDigito=11-(soma%11);
            if (seguDigito>9)
                seguDigito=0;
                
            if ((parseInt(inscEst.substr(11,1))!=primDigito) || (parseInt(inscEst.substr(12,1))!=seguDigito)) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="AL") {
            primDigito=0;
            pesos="98765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            soma=soma*10;
            primDigito=soma%11;
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="AP") {
            if (inscEst.substr(0,2) != "03") {
                return false;
            }
            else {
                if (parseFloat(inscEst.substr(0,8))<3017000) {
                    p=5;
                    d=0;
                }
                else if (parseFloat(inscEst.substr(0,8))<3019022) {
                    p=9;
                    d=1;
                }
                else {
                    p=0;
                    d=0;    
                }
                primDigito=0;
                pesos="98765432";
                soma=p;
                for(i=0;i<pesos.length;i++) {
                    soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
                }
                primDigito=11-(soma%11);
                if (primDigito==10)
                    primDigito=0;
                else if (primDigito==11)
                    primDigito=d;
                if (parseInt(inscEst.substr(8,1))!=primDigito) {
                    return false;
                }
                else
                    return true;
            }
        }
        else if (estado=="AM") {
            primDigito=0;
            pesos="98765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            if (soma<11)
                primDigito=11-soma;
            else {
                primDigito=soma%11;
                if (primDigito<2)
                    primDigito=0;
                else
                    primDigito=11-primDigito;
            }
            if (parseInt(inscEst.substr(8,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="BA") {
            primDigito=0;
            seguDigito=0;
            if ((parseInt(inscEst.substr(0,1))<6) || (parseInt(inscEst.substr(0,1))==8))
                modulo=10;
            else
                modulo=11;
            pesos="765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            seguDigito=modulo-(soma%modulo);
            if (seguDigito>9)
                seguDigito=0;
            var inscEstAux=inscEst;
            inscEst=inscEst.substr(0,6) + "" + inscEst.substr(7,1) + "" + inscEst.substr(6,1);
            pesos="8765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=modulo-(soma%modulo);
            if (primDigito>9)
                primDigito=0;
            inscEst=inscEst.substr(0,6) + "" + inscEst.substr(7,1) + "" + inscEst.substr(6,1);
            if ((parseInt(inscEst.substr(6,1))!=primDigito) || (parseInt(inscEst.substr(7,1))!=seguDigito)) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="CE") {
            primDigito=0;
            pesos="98765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="DF") {
            if (inscEst.substr(0,2) != "07") {
                return false;
            }
            else {
                primDigito=0;
                seguDigito=0;
                pesos="43298765432";
                soma=0;
                for(i=0;i<pesos.length;i++) {
                    soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
                }
                primDigito=11-(soma%11);
                if (primDigito>9)
                    primDigito=0;
                pesos="543298765432";
                soma=0;
                for(i=0;i<pesos.length;i++) {
                    soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
                }
                seguDigito=11-(soma%11);
                if (seguDigito>9)
                    seguDigito=0;
                    
                if ((parseInt(inscEst.substr(11,1))!=primDigito) || (parseInt(inscEst.substr(12,1))!=seguDigito)) {
                    return false;
                }
                else
                    return true;
            }
        }
        else if (estado=="ES") {
            primDigito=0;
            pesos="98765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="GO") {
            primDigito=0;
            pesos="98765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (inscEst.substr(0,8)=="11094402") {
                if ((parseInt(inscEst.substr(8,1))!="0") && (parseInt(inscEst.substr(8,1))!="1")) {
                    return false;
                }
            }
            else {
                if (primDigito==11)
                    primDigito=0;
                else if (primDigito==10) {
                    if ((parseFloat(inscEst.substr(0,8))>=10103105) && (parseFloat(inscEst.substr(0,8))<=10119997))
                        primDigito=1;
                    else
                        primDigito=0;
                }
                if (parseInt(inscEst.substr(8,1))!=primDigito) {
                    return false;
                }
                else
                    return true;
            }
        }
        else if (estado=="MA") {
            if (inscEst.substr(0,2) != "12") {
                return false;
            }
            else {
                primDigito=0;
                pesos="98765432";
                soma=0;
                for(i=0;i<pesos.length;i++) {
                    soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
                }
                primDigito=11-(soma%11);
                if (primDigito>9)
                    primDigito=0;
                if (parseInt(inscEst.substr(8,1))!=primDigito) {
                    return false;
                }
                else
                    return true;
            }
        }
        else if (estado=="MT") {
            primDigito=0;
            pesos="3298765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(10,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="MS") {
            if (inscEst.substr(0,2) != "28") {
                return false;
            }
            else {
                primDigito=0;
                pesos="98765432";
                soma=0;
                for(i=0;i<pesos.length;i++) {
                    soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
                }
                primDigito=11-(soma%11);
                if (primDigito>9)
                    primDigito=0;
                if (parseInt(inscEst.substr(8,1))!=primDigito) {
                    return false;
                }
                else
                    return true;
            }
        }
        else if (estado=="MG") {
            inscEst=inscEst.substr(0,3)+"0"+inscEst.substr(3);
            primDigito=0;
            seguDigito=0;
            pesos="121212121212";
            soma=0;
            resultado=0;
            for(i=0;i<pesos.length;i++) {
                resultado=parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1));
                resultado=resultado+"";
                for(j=0;j<resultado.length;j++) {
                    soma=soma+(parseInt(resultado.substr(j,1)));
                }
            }
            somaAux=soma+"";
            primDigito=parseInt((parseInt(somaAux.substr(0,1))+1)+"0")-soma;
            if (primDigito>9)
                primDigito=0;
            inscEst=inscEst.substr(0,3)+inscEst.substr(4);
            pesos="321098765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                mult=parseInt(pesos.substr(i,1));
                if ((i>1) && (i<4))
                    mult=parseInt(pesos.substr(i,1))+10;
                soma=soma+(parseInt(inscEst.substr(i,1))*mult);
            }
            seguDigito=11-(soma%11);
            if (seguDigito>9)
                seguDigito=0;
                
            if ((parseInt(inscEst.substr(11,1))!=primDigito) || (parseInt(inscEst.substr(12,1))!=seguDigito)) {
                return false;
            }
            else
                return true;
        }
        
        

        else if (estado=="PA") {
            if (inscEst.substr(0,2) != "15") {
                return false;
            }
            else {
                primDigito=0;
                pesos="98765432";
                soma=0;
                for(i=0;i<pesos.length;i++) {
                    soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
                }
                primDigito=11-(soma%11);
                if (primDigito>9)
                    primDigito=0;
                if (parseInt(inscEst.substr(8,1))!=primDigito) {
                    return false;
                }
                else
                    return true;
            }
        }
        else if (estado=="PB") {
            primDigito=0;
            pesos="98765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="PR") {
            primDigito=0;
            seguDigito=0;
            pesos="32765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=0;
            pesos="432765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            seguDigito=11-(soma%11);
            if (seguDigito>9)
                seguDigito=0;
                
            if ((parseInt(inscEst.substr(8,1))!=primDigito) || (parseInt(inscEst.substr(9,1))!=seguDigito)) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="PE") {
            primDigito=0;
            pesos="5432198765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=primDigito-10;
            if (parseInt(inscEst.substr(13,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="PI") {
            primDigito=0;
            pesos="98765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="RJ") {
            primDigito=0;
            pesos="2765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(7,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="RN") {
            primDigito=0;
            pesos="98765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            soma=soma*10;
            primDigito=soma%11;
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="RS") {
            primDigito=0;
            pesos="298765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(9,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="RO") {
            primDigito=0;
            pesos="6543298765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito-=10;
            if (parseInt(inscEst.substr(13,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="RR") {
            primDigito=0;
            pesos="12345678";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            soma=soma*10;
            primDigito=soma%9;
            if (parseInt(inscEst.substr(8,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="SC") {
            primDigito=0;
            pesos="98765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            soma=soma*10;
            primDigito=soma%11;
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="SP") {
            primDigito=0;
            seguDigito=0;
            pesos="13456780";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                mult=parseInt(pesos.substr(i,1));
                if (i==7)
                    mult=10;
                soma=soma+(parseInt(inscEst.substr(i,1))*mult);
            }
            primDigito=soma%11;
            if (primDigito>9)
                primDigito=0;
            pesos="32098765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                mult=parseInt(pesos.substr(i,1));
                if (i==2)
                    mult=10;
                soma=soma+(parseInt(inscEst.substr(i,1))*mult);
            }
            seguDigito=soma%11;
            if (seguDigito>9)
                seguDigito=0;
                
            if ((parseInt(inscEst.substr(8,1))!=primDigito) || (parseInt(inscEst.substr(11,1))!=seguDigito)) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="SE") {
            primDigito=0;
            pesos="98765432";
            soma=0;
            for(i=0;i<pesos.length;i++) {
                soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
            }
            soma=soma*10;
            primDigito=11-(soma%11);
            if (primDigito>9)
                primDigito=0;
            if (parseInt(inscEst.substr(8,1))!=primDigito) {
                return false;
            }
            else
                return true;
        }
        else if (estado=="TO") {
            //if ((inscEst.substr(2,2) != "01") && (inscEst.substr(2,2) != "02") && (inscEst.substr(2,2) != "03") && (inscEst.substr(2,2) != "99")) {
            //    alert("Insc. Estadual inválida");
            //    theField.select();
            //    theField.focus();
            //}
            //else {
                primDigito=0;
                //pesos="9800765432";
                pesos="98765432";
                soma=0;
                for(i=0;i<pesos.length;i++) {
                    soma=soma+(parseInt(inscEst.substr(i,1))*parseInt(pesos.substr(i,1)));
                }
                primDigito=11-(soma%11);
                if (primDigito>9)
                    primDigito=0;
                if (parseInt(inscEst.substr(8,1))!=primDigito) {
                    return false;
                }
                else
                    return true;
            //}
        }
    }
}

exports.verifica_acesso_modulo = function(sess, modulo) {
    if (sess.dempr && sess.dempr.dad) {
        if (sess.dempr.dad.modulos && sess.dempr.dad.modulos[modulo]) {
            return sess.dempr.dad.modulos[modulo];
        } else if (modulo == 'pontoweb') {
            return true;
        }
    }
    return false;
}

exports.hourToMinutes = function(hour){
    var negative = (hour[0] == '-' ? '-' : '');
    var hours    = hour.replace('-', '').split(':');
    var minutes  = ((parseInt(hours[0]) * 60) + parseInt(hours[1]));
    return negative + minutes;
}

exports.minutesToHour = function(minutes){
    var negative = (minutes.toString()[0] == '-' ? '-' : '');
        minutes  = minutes.toString().replace('-', '');
    var hours    = (parseInt(minutes) / 60).toFixed();
        minutes  = (parseInt(minutes) - (hours*60));
    if(minutes < 0){
        minutes = parseInt(minutes) + 60;
        hours   = parseInt(hours) - 1;
    }
    var formated = negative + ((hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes);
    return formated;
}

exports.addHours = function(hour_1, hour_2){
    var result = parseInt(this.hourToMinutes(hour_1))
               + parseInt(this.hourToMinutes(hour_2));
        result = this.minutesToHour(result);
    return result;
}

exports.subHours = function(hour_1, hour_2){
    var result = parseInt(this.hourToMinutes(hour_1))
               - parseInt(this.hourToMinutes(hour_2));
        result = this.minutesToHour(result);
    return result;
}

exports.validLocation = function(location){
    var valid = location 
        && location.hasOwnProperty('longitude') 
        && location['longitude']
        && location['longitude'] != 'null'
        && location.hasOwnProperty('latitude')
        && location['latitude']
        && location['latitude'] != 'null';
    return valid;
}

})(typeof exports === 'undefined'? this['ahg']={}: exports);