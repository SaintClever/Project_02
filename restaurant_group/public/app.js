console.log("LINKED");

var template = $('script[data-id="template"]').text();
var template2 = $('script[data-id="template2"]').text();
var $tbody = $('tbody');
var $import = $('import');

$('#div').css('display', 'inline-block').hide().fadeIn(6000);

//POST
$('.ui.red.button').on('click', function(){
	$.ajax({
		method: "POST",
		url: "/restaurants",
		contentType: 'application/json'
	}).done(function(data){
		var html = Mustache.render(template, data);
		console.log("Is this sh#t working?");
		$('tbody').append(html);
	});
});

$('tbody').on('click', '[data-action="save"]', function(e){ // blur allows us to save after removing the cursor from the input field named data-attr="image_url"
	var row = $(e.target).parents('tr');
	var id = row.attr('data-id');

	var name = row.find('[data-attr="name"]').text();
	var location = row.find('[data-attr="location"]').text();
	var cuisine = row.find('[data-attr="cuisine"]').text();
	var image_url = row.find('[data-attr="image_url"]').text();

	var payload = JSON.stringify({name: name, location: location, cuisine: cuisine, image_url: image_url});

//PUT & UPDATE
	$.ajax({
		method: "PUT",
		url: "/restaurants/" + id,
		data: payload,
		contentType: 'application/json'
	}).done(function(){
		alert('saved!'); // this will alert us if save. damn annoying
	});
});



// VIEWS
$('tbody').on('click', '[data-action="view"]', function(e){
	$tbody.empty();
	$tbody.append($template2);

	$.ajax({
		method: "POST",
		url: "/items",
		contentType: 'application/json'
	}).done(function(data){
		var items = Mustache.render(template2, data);
		$('tbody').append(items);
	});
});


// DELETE
$('tbody').on('click', '[data-action="delete"]', function(e){
	var row = $(e.target).parents('tr');
	var id = row.attr('data-id');

	$.ajax({
		method: "DELETE",
		url: '/restaurants/' + id
	}).done(function(){
		row.remove();
	});
});

// GET
$.ajax({
	method: "GET",
	url: "/restaurants"
}).done(function(restaurants){
	// .map is equivalent to the code below... it is a shortcut

	var restaurantElements = restaurants.map(function(restaurants){
		return Mustache.render(template, restaurants);
	});

// var restaurantElements = [];
// restaurants.forEach(function(restaurants){
// 	var html = Mustache.render(remplate, restaurants);
// 	restaurantElements.push(html);
// })

$('tbody').append(restaurantElements);
});





