document.getElementById('btn0').onclick = function() {
            document.getElementById('res').innerHTML
                =document.getElementById('res').innerHTML+0;
};
document.getElementById('btn1').onclick = function() {
            document.getElementById('res').innerHTML
                =document.getElementById('res').innerHTML+1;
};
document.getElementById('btnClr').onclick = function() {
            document.getElementById('res').innerHTML
                ='';
};
document.getElementById('btnSum').onclick = function() {
            document.getElementById('res').innerHTML
                =document.getElementById('res').innerHTML+'+';
};
document.getElementById('btnSub').onclick = function() {
            document.getElementById('res').innerHTML
                =document.getElementById('res').innerHTML+'-';
};
document.getElementById('btnMul').onclick = function() {
            document.getElementById('res').innerHTML
                =document.getElementById('res').innerHTML+'*';
};
document.getElementById('btnDiv').onclick = function() {
            document.getElementById('res').innerHTML
                =document.getElementById('res').innerHTML+'/';
};
document.getElementById('btnEql').onclick = function() {
            var eq = document.getElementById('res').innerHTML;
            if (eq.indexOf('+')!=-1) {
                var operands = eq.split('+');
                document.getElementById('res').innerHTML
                    = (parseInt(operands[0],2) + parseInt(operands[1],2)).toString(2);
            }
            else if (eq.indexOf('-')!=-1) {
                var operands = eq.split('-');
                document.getElementById('res').innerHTML
                    = (parseInt(operands[0],2) - parseInt(operands[1],2)).toString(2);
            }
            else if (eq.indexOf('*')!=-1) {
                var operands = eq.split('*');
                document.getElementById('res').innerHTML
                    = (parseInt(operands[0],2) * parseInt(operands[1],2)).toString(2);
            }
            else if (eq.indexOf('/')!=-1) {
                var operands = eq.split('/');
                document.getElementById('res').innerHTML
                    = (Math.floor(parseInt(operands[0],2) - parseInt(operands[1],2))).toString(2);
            }
};
