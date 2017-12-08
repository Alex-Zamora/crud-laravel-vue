@extends('app')

@section('content')

<div class="row" id="crud">
	<div class="col-md-12">
		<h1 class="page-header">CRUD Laravel y Vue.JS</h1>
	</div>
	<div class="col-md-7">
		<a href="#" class="btn btn-primary pull-right" data-toggle="modal" data-target="#create">
			Nueva Tarea
		</a>
		<table class="table table-hover table-striped">
			<thead>
				<tr>
					<th>ID</th>
					<th>Tarea</th>
					<th colspan="2"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in keeps">
					<td>@{{ item.id }}</td>
					<td>@{{ item.keep }}</td>
					<td width="10px">
						<a href="#" class="btn btn-warning btn-sm" v-on:click.prevent="editKeep(item)">Editar</a>
					</td>
					<td width="10px">
						<a href="#" class="btn btn-danger btn-sm" v-on:click.prevent="deleteKeep(item)">Eliminar</a>
					</td>
				</tr>
			</tbody>
		</table>
		@include('create')
		@include('edit')
	</div>
	<div class="col-md-5">
		<pre>
			@{{ $data }}
		</pre>
	</div>
</div>

@endsection