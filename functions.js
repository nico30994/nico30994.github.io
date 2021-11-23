// Defino variable con info de: ID TABLE , PATH TABLE, BODY TABLE
var tab_y_json = {
    '0':['tab_oc', './df_oc.json', 'tbl'],
    '1':['tab_oc_2', './df_1er.json','tbl2']
}

function f_main(){
    // Variable input --> Nro de OC
    var nro_oc_texto = func(tab_body);

    for (var i = 0; i < 2; i++) {    
        var tab_id = tab_y_json[i][0];
        var json_path = tab_y_json[i][1];
        var tab_body = tab_y_json[i][2];

        // Borro filas
        borrar_filas(tab_id);

        // Traigo el JSON filtrado segun input, luego creo las filas
        traer_data(nro_oc_texto, json_path, tab_id);

        // Mostrar tablas
        document.getElementById(tab_body).style.display = 'block';

    }
}

function func(){    
    nro_oc_texto = document.getElementById("texto").value;
    document.getElementById("texto").value = "";
    nro_oc_texto = validar_nro(nro_oc_texto);
    return nro_oc_texto
    }

function borrar_filas(id_tabl){
    $("#" + id_tabl + " tr").remove();
}

function traer_data(nro_oc_texto, json_path, tab_id){
    // Leer .JSON
        var reJS = new XMLHttpRequest();

        // Iniciar request.
        reJS.onreadystatechange = reportStatus;
        reJS.open("GET", json_path, true);  // Archivo json.
        reJS.send();

        function reportStatus() {
            if (reJS.readyState == 4) {		// Check if request is complete.
                var dataJ = JSON.parse(this.responseText);
                // Filtro lo que me sirve. Luego, agrego las filas a los DF
                filtrar(dataJ, nro_oc_texto, tab_id);
            }
        }
    }

function filtrar(dataJ, nro_oc_texto, tab_id){
    // Filtro lo solicitado en el JSON
    for (var i = 0; i < dataJ.index.length; i++) {
        if (dataJ["index"][i][0] == nro_oc_texto){
            insert_Row_2(dataJ, i, tab_id)
        }
        
    }

}

function insert_Row_2(dataJ, i, tab_id)
    {
    var cuerpo = document.getElementById(tab_id);

    var tr = cuerpo.insertRow(-1);

    for (var j = 0; j < dataJ.index[i].length; j++) {

        if (i>0 && dataJ["index"][i][0] === dataJ["index"][i-1][j]){

        } else{
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = dataJ.index[i][j];
            tabCell.style = 'font-weight: bold;vertical-align : middle;text-align: center;';
        }
    }

    cuerpo.rows[0].cells[0].rowSpan = cuerpo.rows.length;

    for (var j = 0; j < dataJ.data[i].length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = dataJ.data[i][j];
    }
}

function validar_nro(nro_oc_texto){
    // len_nro --> Tamaño de caracteres de nro_oc_texto
    let len_nro = Math.ceil(Math.log10(nro_oc_texto + 1));

    // Agrego texto para indexear en JSON
    nro_oc_texto = 'OC   00000000'.substring(0, 14-len_nro) + nro_oc_texto.toString();

    return nro_oc_texto;
}

let input = document.querySelector('input');


input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        f_main();
    }
})