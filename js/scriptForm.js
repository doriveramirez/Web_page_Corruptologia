window.onload = initialize;

function initialize() {
	var miform = document.getElementById("miform");
	miform.addEventListener("submit", validateFormClase);
}

function validateFormClase(event) {
	var Nombre = document.getElementById("Nombre").value;
	var Apellidos = document.getElementById("Apellidos").value;
	var Edad = document.getElementById("Edad").value;
	var Email = document.getElementById("Email").value;
	var PP = document.getElementById("PP").checked;
	var Psoe = document.getElementById("PSOE").checked;
	var Ciudadanos = document.getElementById("Ciudadanos").checked;
	var Podemos = document.getElementById("Podemos").checked;
	var nulo = document.getElementById("Nothing").checked;
	var terms = document.getElementById("Accept").checked;
	if (Nombre == "") {
		document.getElementById("error-nombre").style.display = "block";
		event.preventDefault();
		return;
	} else {
		document.getElementById("error-nombre").style.display = "none";
	}
	if (Apellidos == "") {
		document.getElementById("error-apellidos").style.display = "block";
		event.preventDefault();
		return;
	} else {
		document.getElementById("error-apellidos").style.display = "none";
	}
	if (Edad == "") {
		document.getElementById("error-edad").style.display = "block";
		event.preventDefault();
		return;
	} else {
		document.getElementById("error-edad").style.display = "none";
	}
	if (Edad != parseInt(Edad)) {
		document.getElementById("error-edad2").style.display = "block";
		event.preventDefault();
		return;
	} else {
		document.getElementById("error-edad2").style.display = "none";
	}
	if (Email == "") {
		document.getElementById("error-email").style.display = "block";
		event.preventDefault();
		return;
	} else {
		document.getElementById("error-email").style.display = "none";
	}
	if ((PP == "") && (Psoe == "") && (Ciudadanos == "") && (Podemos == "") && (nulo == "")) {
		document.getElementById("error-partido").style.display = "block";
		event.preventDefault();
		return;
	} else {
		document.getElementById("error-partido").style.display = "none";
	}
	if (!terms) {
        document.getElementById("error-conditions").style.display = "block";
        event.preventDefault();
    } else {
		document.getElementById("error-conditions").style.display = "none";
	}
}