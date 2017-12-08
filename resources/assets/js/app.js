
new Vue({
	el: '#crud',
	created: function () {
		this.getKeeps();
	},
	data: {
		keeps: [],
		pagination: { //Paginacion esta pendiente
			'total': 0,
            'current_page': 0,
            'per_page': 0,
            'last_page': 0,
            'from': 0,
            'to': 0,
		},
		newKeep: '', // variable conectada con el input
		fillKeep: {'id': '', 'keep': '	'}, //Utilizamos esta variable para conectar el formulario
		errors: []
	},
	computed: {
		isActived: function () {
			return this.pagination.current_page;
		},
	},
	methods: {
		getKeeps: function () {
			var urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response => {
				this.keeps = response.data.tasks.data, //pagination 
				this.pagination = response.data.pagination
			});
		},
		editKeep: function (item) {
			this.fillKeep.id = item.id; //Se llena está variable con el dato que trae el parametro
			this.fillKeep.keep = item.keep; //Se llena está variable con el dato que trae el parametro
			$('#edit').modal('show'); //Se muestra el modal
		},
		updateKeep: function (id) {
			var url = 'tasks/' + id;
			axios.put(url, this.fillKeep).then(response => { //Actuañiza los datos en la DB y si todo sale bien
				this.getKeeps(); //Actualizar la lista de datos en la vista
				this.fillKeep = {'id': '', 'keep': '	'}; //Limpiamos la variable fillKeep en data{}
				this.errors = []; //Limpiamos los errores en data{}
				$('#edit').modal('hide'); //ocultamos el modal Edit
				toastr.success('Tarea actualizada con éxito');
			}).catch(error => {
				this.errors = error.response.data //Colocamos en la var erros lo que retorne el controlador
			});
		},
		deleteKeep: function (item) {
			if (!confirm("¿Está seguro de eliminar?")) {
            	return false;
          	}
			var url = 'tasks/' + item.id;
			axios.delete(url).then(response => { //Eliminamos
				this.getKeeps(); //Listamos nuevamente los elementos
				toastr.success('Eliminado Correctamente'); // mensaje
			});
		},
		createKeep: function () {
			var url = 'tasks'; //ruta para guardar los nuevos campos con el backend
			axios.post(url, { // método POST
				keep: this.newKeep //parametros que va guardar
			}).then(response => { //Si todo sale bien
				this.getKeeps(); //Listar todas las tareas
				this.newKeep = ''; //Limpiamos el input
				this.errors = []; //Limpiamos los errores
				$('#create').modal('hide'); //Ocultamos el modal
				toastr.success('Nueva tarea creada con éxito'); //Mensaje de éxito
			}).catch(error => { //Si hay errores
				this.errors = error.response.data //Mostrarlo en el formulario
			});
		} 
	}

});
