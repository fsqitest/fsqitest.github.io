/*Script para captar la información del cliente y enviarla al servidor*/    
    document.getElementById("formulario").addEventListener("submit", async function(event) {
    event.preventDefault();
    debugger;
    // captamos la información del formulario y la guardamos en un objeto
    // para enviarla al servidor de forma estructurada
    const formData = {
        hue_moist: document.getElementById("hue_moist").value,
        hue_dry: document.getElementById("hue_dry").value,
        value_moist: document.getElementById("value_moist").value,
        value_dry: document.getElementById("value_dry").value,
        chroma_moist: document.getElementById("chroma_moist").value,
        chroma_dry: document.getElementById("chroma_dry").value,
        texture_class: document.getElementById("texture_class").value,
        porosity_abundance: document.getElementById("porosity_abundance").value,
        porosity_size: document.getElementById("porosity_size").value,
        root_abundance: document.getElementById("root_abundance").value,
        root_size: document.getElementById("root_size").value,
        structure_type: document.getElementById("structure_type").value,
        structure_grade: document.getElementById("structure_grade").value,
        structure_size: document.getElementById("structure_size").value,
        stickiness: document.getElementById("stickiness").value,
        plasticity: document.getElementById("plasticity").value,
        moist_consistence: document.getElementById("moist_consistence").value,
        dry_consistence: document.getElementById("dry_consistence").value,
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude
    };
    
valores = document.querySelectorAll("select");
advertencia=
vacios=0;
valores.forEach((element)=>
    {
        if(element.value=="Vacio")
        {
            vacios++
        }
    });
console.log(`nºvacios=>${vacios}`);
valorBoton=false;
if(vacios>0)
{
    if(vacios>0 && vacios<valores.length)
    {
        
        $("#ModalDatos").modal('show');
        await new Promise((resolve) => {
            document.getElementById("btnvalidar").addEventListener("click", resolve, { once: true });
        });
         //
         const respuesta = await fetch("https://fsqi-backend.onrender.com/form/calcular",
        // const respuesta = await fetch("http://192.168.72.62:8000/form/calcular",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
        
            const data = await respuesta.json();
            document.getElementById("resultado").innerText = "Porcentaje calculado: " + data.porcentaje + "%";
    }
    else if(vacios<valores.length)
        {
           
            const respuesta = await fetch("https://fsqi-backend.onrender.com/form/calcular",
           //const respuesta = await fetch("http://192.168.72.62:8000/form/calcular",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
            
                const data = await respuesta.json();
                document.getElementById("resultado").innerText = "Porcentaje calculado: " + data.porcentaje + "%";    
        }
        else
        {
            document.getElementById("resultado").innerText = "Por favor, rellene al menos un campo";
        
        }
}
else // TODO: No se está mostrando el mensaje de error
{
    const respuesta = await fetch("https://fsqi-backend.onrender.com/form/calcular",
        //const respuesta = await fetch("http://192.168.72.62:8000/form/calcular",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
    
        const data = await respuesta.json();
        document.getElementById("resultado").innerText = "Porcentaje calculado: " + data.porcentaje + "%";
}

});
$("#btnvalidar").click(async function() {

    valorBoton=true
});