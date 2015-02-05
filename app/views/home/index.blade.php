@extends('layouts.master')

@section('content')
<section>
</section>
<footer>
	<p>Press the spacebar to advance. Press ESC to filter by color.</p>
	
	<form class="form-inline" role="form">
		<div class="form-group">
			<input type="text" name="customColor" placeholder="2D2D2D" class="form-control" />
		</div>
		<div class="form-group">
			<button type="submit" class="btn btn-default">Load Hex</button>
		</div>
	</form>
</footer>
@stop