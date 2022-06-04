function Luxbody(){
	Engine.call(this);
	this.luxbodyFastTracker = null;
	this.country_phones = null;
	this.interphone = null;
	this.positionDigit;
	this.inputDigits = [];
	this.currentForm = null;
	this.userInfo = [];
	this.premium = false;
	this.isFastRunning = false;
	this.startCronTime = null;
	this.endCronTime = null;
	this.fastTime = null;
	this.eatTime = null;
	this.startTime = null;
	this.ayunoTargetPlan = null;
	this.endTime = null;
	this.info_register = [];
	this.fastTimePickerListener = false;
	this.reg_cuestionarios = null;
	this.toolbarOptions = ['<div class="option extra-option option-seguidor-ayuno"><div class="event-dispatcher" data-open="seguidor-ayuno-planes" data-func="view_ayuno_planes"></div><i class="flaticon-reloj"></i><div class="tag">Ayuno</div></div>', '<div class="option extra-option option-seguidor-ayuno-aprende1"><div class="event-dispatcher" data-open="seguidor-ayuno-aprende1" data-func="view_ayuno_aprende"></div><i class="flaticon-book-of-black-cover-closed"></i><div class="tag">Aprende</div></div>'];
	this.ayunoPlanes = [14,16,18,20]; //fast hours

}
Luxbody.prototype = Object.create(Engine.prototype);
Luxbody.prototype.constructor = Luxbody;
//Luxbody.prototype.mainBox = document.getElementById('main-box');
Luxbody.prototype.loadHome = function(target){
	var thread = this;
	//console.log(this)
	thread.switchToolbarOptions('option-home');
	this.hideLoader();
};
Luxbody.prototype.formatAMPM = function(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};
Luxbody.prototype.view_fast_tracker_clock = function(target){
	var thread = this;
	console.log("CLOCK TIME");
	var _ftime = parseInt(localStorage.getItem("CronDataFastTime"));
	document.getElementById('fast-eat').innerText = localStorage.getItem("CronDataFastTime")+" - "+localStorage.getItem("CronDataEatTime");
	document.getElementById('clock-start-time').innerText = localStorage.getItem('startCronTime');
	document.getElementById('clock-end-time').innerText = localStorage.getItem('endCronTime');

	var _currentTime = thread.formatAMPM(new Date).split(" ")[0].split(":");

	var _ctHours = _currentTime[0] * (60000 * 60);
	var _ctMinutes = _currentTime[1] * 60000;
	var _totalMilis = _ctHours + _ctMinutes;

	var _targetTime = localStorage.getItem('startCronTime').split(" ")[0].split(":");
	var _tHours = _targetTime[0] * (60000 * 60);
	var _tMinutes = _targetTime[1] * 60000;
	var _tMilis = _tHours + _tMinutes;

	console.log(_currentTime);
	console.log(_totalMilis)
	console.log(localStorage.getItem('startCronTime'))
	console.log(_tMilis - _totalMilis);
	setTimeout(function(){
		thread.luxbodyFastTracker = new FastTracker();
		thread.luxbodyFastTracker.init(_ftime,0,0);
	}, _tMilis - _totalMilis);
	/*thread.luxbodyFastTracker = new FastTracker();
	thread.luxbodyFastTracker.init(_ftime,0,0);*/
/*	var FastClockHours = setInterval(function(){

	},(6000*60));*/

/*	var c = document.getElementById('canvas');
	var ctx = c.getContext('2d');
	ctx.rotate(20*Math.PI / 180);
	ctx.beginPath();
	ctx.arc(150,75,50,0*Math.PI,1.5*Math.PI);

	ctx.stroke();*/

/*	var clockTime = document.getElementById("clockTime");
	var start = 0;
	var mask = document.querySelector(".mask.full .fill");
	var mask1 = document.querySelector(".circle .fill");
	console.log(mask)
	var rotation = 360;
	var it = setInterval(function(){
		rotation = rotation+3.6;
		console.log(rotation);
		mask.style.transform = "rotate("+rotation+"deg)";
		mask1.style.transform = "rotate("+rotation+"deg)";
		start++;
		clockTime.innerText = start + "%";
		if(start == 100){
			clearInterval(it);
		}
		
	},1);*/

	thread.Loader_hide();

};
Luxbody.prototype.selectOption = function(target){
	var thread = this;
	var option = target.nextSibling;
	//single choice
	if(target.parentNode.parentNode.parentNode.getAttribute('data-tipo') == 1){
		thread.removeClass(document.getElementsByClassName('active-option'), 'active-option');
		thread.addClass(option, 'active-option');
	}else{//multiple choice
	}

	option.childNodes[0].click();
};
Luxbody.prototype.load_info = function(target){

	var infoText = target.parentNode.getElementsByClassName('info-text')[0];
	//console.log(infoText.style.display);
	if(infoText.style.display == "none" || infoText.style.display == ""){
		target.parentNode.getElementsByClassName('info-text')[0].style.display = "block";
	}else{
		target.parentNode.getElementsByClassName('info-text')[0].style.display = "none";
	}
	
};
Luxbody.prototype.addToolbarOption = function(opArr){
	//console.log(opArr)
	var thread = this;
	for(x in opArr){
		//console.log(opArr[x])
		thread.toolbar.insertAdjacentHTML('beforeend', ''+opArr[x]);
	}

	var _ops = thread.toolbar.getElementsByClassName('option');
	var _w = innerWidth / _ops.length;

	for(var h = 0; h < _ops.length; h++){
		_ops[h].style.width = _w+'px';
	}

};

Luxbody.prototype.view_progreso = function(target){
	var thread = this;

	thread.switchToolbarOptions('option-progreso');
	this.userInfo['weight'] = 50;
	var graphYValue = this.userInfo['weight'] + 10;
	var currentMonth = new Date().getMonth() + 1;
	var currentYear = new Date().getFullYear();
	//console.log(graphYValue)
	//console.log("view progreso")
	//console.log(thread.getDaysInMonth(currentMonth, currentYear));
	var ctx1 = document.getElementById("progress-graph").getContext("2d");
	/*var lineChart = new Chart(ctx1, {
	    type: 'line',
	    data: data1,
	    options: {
	        responsive: true,
	        maintainAspectRatio: false,
	        tooltips: {
	          mode: 'index'
	        },
	        scales: {
	          xAxes: [{
	            display: true,
	            ticks: {
	              suggestedMax: 10
	            }
	          }],
	          yAxes: [{
	            display: true,
	            ticks: {
	              suggestedMax: 10
	            }
	          }]
	        },
	        elements: {
	          line: {
	            tension: 0.1
	          }
	        }
	      }
	});*/
	this.Loader_hide();
};
Luxbody.prototype.pickerTime = function(){

};
Luxbody.prototype.showInputStartTime = function(target){

	var thread = this;
	/*if(!thread.premium){
		thread.view_premium();
		return
	}*/
	//thread.Loader_show();
/*	var stime = new Date().getTime();
	var addtime = 1000 * 600;
	var fulltime = stime + addtime;
	var input = '';
	console.log(fulltime)
	var ndate = new Date(fulltime);
	var hrs = ndate.getHours();
	var mins = ndate.getMinutes();*/
	//document.getElementById('bg-timepicker').style.display = "block";

	var _fastTimePicker = document.getElementById("fastTimePicker");
	//_fastTimePicker.removeEventListener('change');
	
	var _g = thread.startCronTime.split(" ");
	if(_g[0].length < 2){
		_fastTimePicker.value = "0"+_g[0]+":00";
	}else{
		_fastTimePicker.value = _g[0]+":00";
	}
	var _ampm = document.getElementById("ampm");
	_ampm.value = _g[1];	
	console.log(_fastTimePicker.value, _ampm.value)
		//thread.startCronTime = _fastTimePicker.value+" "+_ampm.value;
		//thread.Goback();
/*	document.getElementById('resetTimePicker').onclick = function(){
		
	};*/
	/*document.getElementById("fastTimePicker").onchange = function(event){
		console.log(event.target.value);
		document.getElementById("resetTimePicker").setAttribute("data-reset", event.target.value)
	};*/
	_fastTimePicker.onchange = function(target){
		var _time = this.value.split(":");
		if(_time[0] > 12){
			var _ntime = parseInt(_time[0]) - 12;
			console.log(_ntime)
		/*	const d = new Date();
			let time = d.getTime();*/
			var _setTime = '0'+_ntime+':'+_time[1]+'';
			//console.log(new Date(_setTime))
			console.log(_setTime)
			this.value = _setTime
			document.getElementById('ampm').value = 'pm';
		}
	};
	thread.Loader_hide();
	/*document.getElementById('start-time').value = hrs+':'+mins;
	document.getElementById('start-time').focus();*/

};
Luxbody.prototype.updateAge = function(target){
	var thread = this;
	console.log(thread)
	this.removeClass(document.getElementsByClassName('picker-active'), 'picker-active');
	this.addClass(target, 'picker-active');
	var age = target.innerText;
	document.getElementById('age-selected').value = age;
	thread.selectOption(target);
};
Luxbody.prototype.updateHeight = function(target){
	var thread = this;
	this.removeClass(document.getElementsByClassName('picker-active'), 'picker-active');
	this.addClass(target, 'picker-active');
	var height = target.innerText;
	console.log(height); 
	document.getElementById('height-selected').value = height;
	thread.selectOption(target);
	//console.log(target)
};
Luxbody.prototype.getHistory = function(e){
	var thread = this;
	return thread.history;
};
Luxbody.prototype.finish_register = function(target){
	var thread = this;
	console.log("finish_register");
	//thread.Loader_show();
//	thread.Load(thread.mainBox, 'finish_register.html', function(){
		var fd = [];
		fd['entries'] = [];
		for(x in thread.info_register){
			fd['entries'].push(JSON.stringify(thread.info_register[x]));
		}
		thread.XHR(fd, 'cuestionarios-save', false).then(function(request){
			localStorage.setItem('engine_credentials', 'token');
			location.reload();
			//thread.Loader_hide();
		});
	//}, null);
	
	
	
};
/*Luxbody.prototype.fasting_tracker = function(target){
	var thread = this;
	//thread.removeExtraToolbarOptions();
	//thread.addToolbarOption(thread.toolbarOptions);
	//thread.addToolbarOption(toolbarOptions);
	//thread.switchToolbarOptions('option-seguidor-ayuno-aprende1');
	//thread.view_ayuno_aprende(target);
	thread.view_ayuno_planes(target);
	thread.Loader_hide();
};*/
Luxbody.prototype.init_fast_tracker = function(fast_hours){
	var thread = this;
	thread.luxbodyFastTracker = new FastTracker();
	console.log(thread.luxbodyFastTracker)
};
Luxbody.prototype.view_ayuno_planes = function(target){
	var thread = this;
	thread.removeExtraToolbarOptions();
	thread.addToolbarOption(thread.toolbarOptions);
	thread.switchToolbarOptions('option-seguidor-ayuno');
	console.log(thread.ayunoPlanes)
	for(x in thread.ayunoPlanes){
		var fastTime = thread.ayunoPlanes[x];
		var eatTime = 24 - fastTime;
		var onclocks = Math.floor(fastTime / 6);
		var offclocks = 4 - onclocks;
		var _clocks = '';
		for(var g = 1; g <= onclocks; g++){
			_clocks += '<i class="flaticon-reloj on"></i>';
		}
		for(var g = 1; g <= offclocks; g++){
			_clocks += '<i class="flaticon-reloj off"></i>';
		}
		console.log(_clocks);		
		document.getElementById('planbox').insertAdjacentHTML('beforeend', '<div class="plan-hover"><div class="plan"><div class="info-main"><div class="plan-mark"></div><div class="t-lapse"><span class="time">'+fastTime+' - '+eatTime+'</span><div class="dinner-clocks">'+_clocks+'</div></div></div><ul class="desc"><li class="green">'+fastTime+' horas de ayuno</li><li class="orange">'+eatTime+' horas para comer</li></ul></div><div class="event-dispatcher" data-fast="'+fastTime+'" data-eat="'+eatTime+'" data-open="seguidor-ayuno-plan" data-func="view_ayuno"></div></div>');
	}
	document.getElementById('start-time').onchange = function(e){
		var currentTime = this.value;
		console.log(currentTime)
		document.getElementById('bg-timepicker').style.display = "none";
	};
	thread.Loader_hide();
};
Luxbody.prototype.resetInitTime = function(){
	var thread = this;
	var _fastTimePicker = document.getElementById("fastTimePicker");
/*	var _g = thread.startCronTime.split(" ");
	if(_g[0].length < 2){
		_fastTimePicker.value = "0"+_g[0]+":00";
	}else{
		_fastTimePicker.value = _g[0]+":00";
	}*/
	var _ampm = document.getElementById("ampm");
	//_ampm.value = _g[1];	
	console.log(_fastTimePicker.value, _ampm.value)
	var _s = _fastTimePicker.value.split(":");

	thread.startCronTime = _s[0]+":"+_s[1]+" "+_ampm.value;
	console.log(thread.startCronTime)
	localStorage.setItem("startCronTime", thread.startCronTime);
	thread.Goback();
};
Luxbody.prototype.view_ayuno = function(target){
	var thread = this;
	if(target != undefined){
		this.ayunoTargetPlan = target;

	}else{
/*		if(target.getAttribute('data-func') == 'Goack'){
			console.log("GO BACK EXCUTION")
			return;
		}*/
	}
	console.log("VIEW AYUNO")
	console.log(target)
	//thread.removeExtraToolbarOptions();
	//thread.addToolbarOption(thread.toolbarOptions);
	//thread.switchToolbarOptions('option-seguidor-ayuno');
	var fastTime = this.ayunoTargetPlan.getAttribute('data-fast');
	var eatTime = this.ayunoTargetPlan.getAttribute('data-eat');
	if(fastTime != null){
		localStorage.setItem("CronDataFastTime", fastTime);
		localStorage.setItem("CronDataEatTime", eatTime);
	}
		

	
	
	if(thread.eatTime == null){
		thread.eatTime = eatTime;
	}else{
		eatTime = thread.eatTime;
	}
	if(thread.fastTime == null){
		thread.fastTime = fastTime;
	}else{
		fastTime = thread.fastTime;
	}
	document.getElementById('plan-time-lapse').innerText = fastTime+' - '+eatTime;
	document.getElementById('plan-ayuno-time').innerText = fastTime;
	document.getElementById('plan-eat-time').innerText = eatTime;

	var startTime = document.getElementById("start_time");
	var endTime = document.getElementById("end_time");
/*	if(thread.startTime == null){
		thread.startTime = startTime;
	}else{
		startTime = thread.startTime;
	}

	if(thread.endTime == null){
		thread.endTime = endTime;
	}else{
		endTime = thread.endTime;
	}*/
	console.log("SETUP CRONTIME")
	console.log(thread.startCronTime, thread.endCronTime);

		//if(thread.startCronTime == null){
		if(localStorage.getItem("startCronTime") == undefined){
			var _d = new Date();
			var _s = thread.dateHourAMPM(_d);
			var _g = _s.split(" ");
			var _startTime = (parseInt(_g[0])+1)+":00"+' '+ _g[1];
			var stime = parseInt(_g[0])+1 + parseInt(eatTime);
			var mins = "00";
			console.log("STARTCRONTIME "+stime)


		}else{
			var _s = localStorage.getItem("startCronTime");
			console.log("CRON TIME")
			console.log(_s);
			var _g = _s.split(" ");
			
			console.log(_g)
			var mins = _g[0].split(":")[1];
			var _startTime = parseInt(_g[0])+":00"+' '+ _g[1];
			var stime = parseInt(_g[0]) + parseInt(eatTime);
			console.log("STARTCRONTIME "+stime)
		}
		
		
		if(stime > 12){
			var _e_ = stime - 12;
			var _etime = (_g[1] == "pm"?_e_+':'+mins+" am":_e_+':'+mins+" pm");	
			console.log(_etime);
		}else{
			var _etime = stime+":"+mins+ " pm";
			var _j = _etime.split(" ");
			_etime = Math.ceil(parseInt(_j[0]))+_j[1];
		}
		if(thread.startCronTime == null){
			thread.startCronTime = _startTime;

		}
		//if(thread.endCronTime == null){
			thread.endCronTime = _etime
		//}
	
	localStorage.setItem("startCronTime", thread.startCronTime);
	localStorage.setItem("endCronTime", thread.endCronTime);
	//setTimeout(function(){
		console.log(thread.startCronTime, thread.endCronTime)
	startTime.innerText = thread.startCronTime;
	endTime.innerText = thread.endCronTime;

	//}, 500);
	
console.log(startTime)
	

	thread.Loader_hide();
};
Luxbody.prototype.dateHourAMPM =  function(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  //minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ' ' + ampm;
  return strTime;
};
Luxbody.prototype.view_ayuno_aprende = function(target){
	var thread = this;
	thread.removeExtraToolbarOptions();
	thread.addToolbarOption(thread.toolbarOptions);
	thread.switchToolbarOptions('option-seguidor-ayuno-aprende1');

	thread.scope['step'] = 1;
	thread.scope['totalSteps'] = 2;
	var slider = document.getElementById('slider');
	var slides = slider.getElementsByClassName('mslide');
	var sliderWidth = slides.length * thread.screenWidth;
	for( var g = 0; g < slides.length; g++ ){
		slides[g].style.width = thread.screenWidth+'px';		
	}
	slider.style.width = sliderWidth+'px';
	var _swiper = thread.Swipe(/*function(direction){
		//console.log(direction);
		var slider = document.getElementById('slider');
		var currentLeft = thread.screenWidth * thread.scope['step'];
		if (direction == 'left') {

			if(thread.scope['step'] == thread.scope['totalSteps']){
				return false;
			}
			//slider.scrollLeft = currentLeft;
			slider.style.transform = "translate3d(-"+currentLeft+"px,0,0)";
			thread.scope['step'] += 1;
			currentLeft = thread.screenWidth * thread.scope['step'];
			//console.log('Swipe left');
			
		}
		if (direction == 'right') {
			if(thread.scope['step'] == 1){
				return false;
			}
			thread.scope['step'] -= 1;
			currentLeft = thread.screenWidth * thread.scope['step'];
			currentLeft -= thread.screenWidth;
			//slider.scrollLeft = currentLeft;
			slider.style.transform = "translate3d(-"+currentLeft+"px,0,0)"; 
			//console.log('Swipe right');
		}
	}*/);
	thread.Loader_hide();

};
Luxbody.prototype.startCuestionario = function(){
	var thread = this;
	var cuestionarios = [];

	thread.XHR([], 'cuestionarios-get', false).then(function(request){ 

			cuestionarios = JSON.parse(request.responseText);
			
			thread.reg_cuestionarios = cuestionarios;
			console.log(cuestionarios);
			//cuestionarios = [{"id":"1","tipo":"1","pregunta":"\u00bfQue dieta quieres seguir?","opciones":[{"id":"1","opcion":"Cetog\u00e9nica"},{"id":"2","opcion":"Low carb"},{"id":"3","opcion":"Plato inteligente"}]},{"id":"2","tipo":"1","pregunta":"\u00bfCuanto tiempo tienes para preparar tus dietas?","opciones":[{"id":"4","opcion":"30 minutos"},{"id":"5","opcion":"1 hora"},{"id":"6","opcion":"m\u00e1s de 1 hora"}]},{"id":"3","tipo":"2","pregunta":"Selecciona las prote\u00ednas que quieres a\u00f1adir a tu plan","opciones":[{"id":"7","opcion":"Pollo"},{"id":"8","opcion":"cerdo"},{"id":"9","opcion":"Carne vacuna"},{"id":"10","opcion":"Pescado"},{"id":"11","opcion":"Cordero"},{"id":"12","opcion":"Ternera"},{"id":"13","opcion":"Mariscos"},{"id":"14","opcion":"Soy vegetariano"},{"id":"15","opcion":"Vegano"}]},{"id":"4","tipo":"2","pregunta":"Productos que quieras a\u00f1adir a tu plan alimenticio","opciones":[{"id":"16","opcion":"queso"},{"id":"17","opcion":"hongos"},{"id":"18","opcion":"huevos"},{"id":"19","opcion":"frutos secos"},{"id":"20","opcion":"mantequilla"},{"id":"21","opcion":"leche"},{"id":"22","opcion":"aguacate"},{"id":"23","opcion":"aceitunas"},{"id":"24","opcion":"coco"}]},{"id":"5","tipo":"1","pregunta":"\u00bfQue tan activo eres?","opciones":[{"id":"25","opcion":"activo (3-5 veces por semana)"},{"id":"26","opcion":"intermedio (1-2 veces por semana)"},{"id":"27","opcion":"principiante"}]},{"id":"6","tipo":"1","pregunta":"\u00bfQue tan dispuesto est\u00e1s a perder peso?","opciones":[{"id":"28","opcion":"solo quiero probar la dieta cetog\u00e9nica"},{"id":"29","opcion":"quiero probarlo y perder algo de peso"},{"id":"30","opcion":"quiero perder la m\u00e1xima cantidad de peso"}]},{"id":"7","tipo":"1","pregunta":"\u00bfCu\u00e1l es tu edad?","opciones":[{"id":"31","opcion":"fn:buildAgePicker"}]},{"id":"8","tipo":"1","pregunta":"\u00bfCu\u00e1l es tu altura?","opciones":[{"id":"32","opcion":"fn:buildHeightPicker"}]}];
			thread.scope['step'] = 1;
			thread.scope['totalSteps'] = cuestionarios.length;
			var screenWidth = window.innerWidth; 
			
			thread.Load(thread.mainBox, 'cuestionario.html', function(){
				var _step = document.getElementById('step');
				var _totalSteps = document.getElementById('totalSteps');
				var sliderBar = document.getElementById('slide-bar');
				sliderBar.style.width = (100 / thread.scope['totalSteps'])+'%';
				_step.innerText = thread.scope['step'];
				_totalSteps.innerText = thread.scope['totalSteps'];
				thread.Swiper = thread.Swipe(function(direction){
					var sliderBar = document.getElementById('slide-bar');
					var slider = document.getElementById('slider');
					var cuestionarios = document.getElementById('cuestionarios');
					var currentLeft = thread.screenWidth * thread.scope['step'];
					if (direction == 'left') {
						if(thread.scope['step'] == thread.scope['totalSteps']){
							return false;
						}

						var currentForm = document.getElementById('cuestionario_'+thread.scope['step']);
						//console.log(currentForm)
						var _inputs = currentForm.getElementsByClassName('c-input');
						var flag = false;
						for(var g = 0; g < _inputs.length; g++){
							var _input = _inputs[g];
							var itype = _input.type;
							switch(itype){
								case 'checkbox':
									if(_input.checked){
										flag = true;
									}
									break;
								case 'radio':
									if(_input.checked){
										flag = true;
									}
									break;
								case 'text':
									//console.log(_input.value);
									if(_input.value.length != 0){
										flag = true;
									}
									break;
								default:
									break;
							}
							
						}
						if(!flag){
							currentForm.getElementsByClassName('submit-form')[0].click();
							//return false;
						}else{
							//slide.scrollLeft = currentLeft;
							cuestionarios.style.transform = "translate3d(-"+currentLeft+"px,0,0)"; 
							thread.scope['step'] += 1;
							currentLeft = thread.screenWidth * thread.scope['step'];
						}

						
						//document.getElementById('cuestionario_'+thread.scope['step']).submit();
						
				    	//_cuestionarios.style.transform = 'translate3d(-'+currentLeft+'px,0,0)';
				    	
				    }
				    if (direction == 'right') {
				    	if(thread.scope['step'] == 1){
				    		return false;
				    	}
				    	thread.scope['step'] -= 1;
				    	currentLeft = thread.screenWidth * thread.scope['step'];
				    	currentLeft -= screenWidth;
				    	//slide.scrollLeft = currentLeft;
				    	cuestionarios.style.transform = "translate3d(-"+currentLeft+"px,0,0)"; 
				    	//conslide.scrollLeft = sole.log(currentLeft);
				    	//_cuestionarios.style.transform = 'translate3d(-'+currentLeft+'px,0,0)';
				    	 
				    }
				    _step.innerText = thread.scope['step'];
					_totalSteps.innerText = thread.scope['totalSteps'];
					sliderBar.style.width = (100 / thread.scope['totalSteps']) * thread.scope['step']+'%';
				});//SWIPER SETUP


				var box = document.getElementById('cuestionarios');
				var formWidth = screenWidth / thread.scope['totalSteps'];
				box.style.width = thread.scope['totalSteps'] * screenWidth+"px";
				//console.log(cuestionarios);
				for(x in cuestionarios){
					//console.log(x)
					var current = cuestionarios[x];
					var inputType = (current.tipo == 2?'checkbox':'radio');
					var optionChildClass = (current.tipo == 2?'checkbox':'');
					var options = current.opciones;
					var isRequired = (current.tipo == 2?'required':'required');
					//console.log(current)
					var entradas = document.createElement('div');
					entradas.className = 'entradas';
					var c = 0;
					////console.log("CUESTIONARIO: "+current.id);
					if(options[0].opcion.search('fn:') != -1){
						var executeFn = options[0].opcion.split('fn:')[1];
						//console.log(executeFn)
						thread[executeFn](entradas, current);
					}else{
						for(y in options){
							var option = options[y];
							c++;
							var inputId = 'op_'+c;	
							var fragment = document.createRange().createContextualFragment('<div class="option"><div class="trigger-layer" data-func="selectOption"></div><label for="op_'+c+'" class="option-child '+optionChildClass+'"><input data-cuestionario-id="'+current.id+'" id="'+inputId+'" type="'+inputType+'" name="'+current.id+'[]" value="'+option['id']+'" '+isRequired+' class="c-input"/><label for="op_'+c+'">'+option['opcion']+'</label></label></div>');
							if(current.tipo == 2){
								var _in = fragment.getElementById(inputId);
								_in.onchange = function(e){
									var _id = this.getAttribute('data-cuestionario-id');
									var _i = document.getElementById('cuestionario_'+_id).getElementsByClassName('c-input');
									////console.log(document.getElementById('cuestionario_'+current.id))
									if(this.checked){
										for(var g = 0; g < _i.length;g++){
											_i[g].removeAttribute('required');
										}
									}else{
										var f = false;
										for(var g = 0; g < _i.length;g++){
											if(_i[g].checked){
												f = true;
											}
										}
										if(!f){
											for(var g = 0; g < _i.length;g++){
												_i[g].setAttribute('required');
											}
										}									}
								};
							}
							entradas.append(fragment);
							//entradas += '<div class="option"><div class="trigger-layer" data-func="selectOption"></div><label for="op_'+c+'" class="option-child '+optionChildClass+'"><input id="op_'+c+'" type="'+inputType+'" name="'+current.id+'[]" value="'+option['id']+'" '+isRequired+' class="c-input"/><label for="op_'+c+'">'+option['opcion']+'</label></label></div>';
						}
					}

					var _form = document.createElement('form');
					_form.className = 'form_step';
					_form.setAttribute('data-tipo', current.tipo);
					_form.style.width = screenWidth+'px';
					_form.id = 'cuestionario_'+current.id;
					_form.setAttribute('data-cuestionario-id', current.id);
					_form.enctype = "multipart/form-data";
					_form.action = '';
					_form.method = 'POST';
					_form.append(entradas);
					var _input = document.createElement('input');
					_input.className = 'submit-form continue';
					if(x == (cuestionarios.length - 1)){
						//last form
						//_input.setAttribute('data-func', 'finish_register');
					}
					_input.type = 'submit';
					_input.value = 'Continuar';
					_form.appendChild(_input);
					if((innerHeight - 342) > (options.length * 48)){
						var logo = '<img class="logo-bottom" src="img/logo-black96.png">';
					}else{
						var logo = '<img class="logo-bottom responsive" src="img/logo-black96.png">';
					}
					_form.insertAdjacentHTML('afterbegin', '<h3>'+current['pregunta']+'</h3>');
					_form.insertAdjacentHTML('beforeend', logo);
					//_form.insertAdjacentHTML('afterbegin', '<h3>'+current['pregunta']+'</h3><div class="entradas">'+entradas+'</div>'+logo);
					/*if(current.tipo == 2){
						//console.log(_form)
						_form.childNodes[1].childNodes[0].childNodes[1].childNodes[0].checked = true;
					}*/

					_form.addEventListener("submit", function(e){

						e.preventDefault();
						//e.stopPropagation();
						//console.log("submitting", e.target);
						var first_input = this.childNodes[1].childNodes[0].childNodes[1].childNodes[0];
						////console.log(first_input);
						var inputs = this.getElementsByClassName('c-input');
						var _tipo = this.getAttribute('data-tipo');
						var  _idForm = this.id;
						var _idCuestionario = this.getAttribute('data-cuestionario-id');
						if(thread.info_register.find(e => e.idCuestionario == _idForm)){
							for(var g = 0; g < inputs.length; g++){
								var _input = inputs[g];
								if(_input.checked){
									var _idCuestionario = _input.getAttribute('data-cuestionario-id');
									var _idOpcion = _input.value;
									console.log("registering");
									thread.info_register[_idCuestionario - 1].idOpcion = _idOpcion;
								}
							}

							
						}else{

							if(_tipo == 2){
								//var _body = new FormData();
								var flag = false;
								//var multi = [];
								//multi[this.getAttribute('data')]
								//_body.append('multiple', '');
								
								var ops = [];
								for(var g = 0; g < inputs.length; g++){
									var _input = inputs[g];
									if(_input.checked){
										ops.push(_input.value);
										flag = true;
										//_body.append(_input.getAttribute('data-cuestionario-id'), _input.value);
										//first_input.setCustomValidity("");
										//first_input.reportValidity();
									}
								}
								console.log("registering");
								thread.info_register.push({
									idCuestionario: _idCuestionario,
									tipo: _tipo,
									opciones: ops
								});
								/*if(!flag){
									first_input.setCustomValidity("Selecciona al menos uno");
									first_input.reportValidity();
									
									return;
								}*/
								if(flag){
									for(var g = 0; g < inputs.length; g++){
										var input = inputs[g];
										input.removeAttribute('required');
									}
								}
								
								
						/*	}else if(_tipo == 3){
								var _picker = document.getElementById("age-picker");
								var _options = _picker.getElementsByClassName('real-picker');
								console.log(_options)*/
							}else{
								for(var g = 0; g < inputs.length; g++){
									var _input = inputs[g];
									if(_input.checked){
										var _idCuestionario = _input.getAttribute('data-cuestionario-id');
										var _idOpcion = _input.value;
										console.log("registering");
										thread.info_register.push({
											idCuestionario: _idCuestionario,
											tipo: _tipo,
											idOpcion: _idOpcion
										});
									}
								}
							}
						}
						/*
						FETCH SAVE CUESTIONARIO
						var _body = new FormData(e.target);
						var data = new FormData(e.target);
						fetch(thread.origin+'cuestionarios-save', {
							method: 'POST',
							body: _body,
						}).then(function (response) {
							////console.log(response.json());
							thread.Swiper.swipeLeft();

						});*/
						/*thread.XHR(data, 'cuestionarios-save', false).then(function(request){

						});*/
						thread.Swiper.swipeLeft();

						console.log(_idCuestionario, thread.reg_cuestionarios[thread.reg_cuestionarios.length - 1].id)
						if(_idCuestionario == thread.reg_cuestionarios[thread.reg_cuestionarios.length - 1].id){
							thread.finish_register();

						}
					});
					if(current.id == 7 || current.id == 8){
						_form.style.overflowY = 'hidden';
					}
					box.appendChild(_form);

				}

				thread.Loader_hide();
			}, null);
	});
};
Luxbody.prototype.FinishFast = function(target){
	var thread = this;
	
	localStorage.setItem("startCronTime", null);
	localStorage.setItem("endCronTime", null);
	localStorage.setItem("CronFastTotalMins", null);
	localStorage.setItem("CronFastTime", null);
	localStorage.setItem("CronFastSeconds", null);
	localStorage.setItem("CronFastRunningMins", null);
	localStorage.setItem("CronFastMins", null);
	localStorage.setItem("CronFastHours", null);
	localStorage.setItem("CronDataFastTime", null);
	localStorage.setItem("CronDataEatTime", null);
	thread.Goback();
	thread.Goback();
	/*thread.Load(thread.mainBox, 'premium.html', function(){
		console.log("hazte premium")
		thread.history.push({
			'view':'premium',
			'func':'LoadPremium'
		});
	}, null);*/
};
Luxbody.prototype.getCode = function(){
	var code = '';
	for(var h = 0; h < this.inputDigits.length; h++){
		code += this.inputDigits[h].value; 
	}
	return code;
};

Luxbody.prototype.verifyCode = function(){

};
Luxbody.prototype.LoadPremium = function(){
	console.log("premium loaded")
};
Luxbody.prototype.view_premium = function(){
	var thread = this;
	thread.Load(thread.mainBox, 'premium.html', function(){
		console.log("hazte premium")
		thread.history.push({
			'view':'premium',
			'func':'LoadPremium'
		});
	}, null);
	thread.Loader_hide();
};
Luxbody.prototype.buildHeightPicker = function(boxNode, info){
	var thread = this;
	var current = info;
	var inputType = (current.tipo == 2?'checkbox':'radio');
	var optionChildClass = (current.tipo == 2?'checkbox':'');
	var options = current.opciones;
	var isRequired = (current.tipo == 2?'required':'required');
	//console.log(boxNode)
	var heightPicker = '<div id="height-picker" class="height-picker"><input id="height-selected" required type="text" style="opacity:0" class="c-input"><div class="shadow-top"></div>';
	for(var g = 50; g < 250; g++){
		//heightPicker += '<div class="picker-number" data-prop="height" data-func="heightpickerCallback">'+g+'cmm</div>';
		heightPicker += '<div class="real-picker"><div class="picker-number" data-prop="height" data-func="heightpickerCallback">'+g+'cmm</div><label class="option-child" for="c_'+g+'"><input data-cuestionario-id="'+current.id+'" id="c_'+g+'" type="'+inputType+'" name="'+current.id+'[]" value="'+g+'" '+isRequired+' class="c-input"/></label></div>';
	}
	//heightPicker += '<div class="shadow-bottom"></div></div>';
	var fragment = document.createRange().createContextualFragment(heightPicker);
	//console.log(fragment.getElementById('height-picker'))
	setTimeout(function(){});
	//fragment.getElementById('height-picker').scrollTop = 200;

	boxNode.append(fragment);
	////console.log(agePicker)
};
Luxbody.prototype.buildAgePicker = function(boxNode, info){
	var thread = this;
	//console.log(boxNode)
	var current = info;
	var inputType = (current.tipo == 2?'checkbox':'radio');
	var optionChildClass = (current.tipo == 2?'checkbox':'');
	var options = current.opciones;
	var isRequired = (current.tipo == 2?'required':'required');

	var agePicker = '<div id="age-picker" class="age-picker"><input id="age-selected" required type="text" style="opacity:0" class="c-input"><div class="shadow-top"></div>';
	for(var g = 1; g < 100; g++){
		agePicker += '<div class="real-picker"><div class="picker-number" data-prop="age" data-func="agepickerCallback">'+g+'</div><label class="option-child" for="c_'+g+'"><input data-cuestionario-id="'+current.id+'" id="c_'+g+'" type="'+inputType+'" name="'+current.id+'[]" value="'+g+'" '+isRequired+' class="c-input"/></label></div>';
		//agePicker += '<div class="real-picker"><div class="picker-number" data-prop="age" data-func="agepickerCallback">'+g+'</div><label class="option-child" for="c_'+g+'"><input data-cuestionario-id="'+current.id+'" id="c_'+g+'" type="'+inputType+'" name="'+current.id+'[]" value="'+g+'" '+isRequired+' class="c-input"/></label></div>';
	}
	//agePicker += '<div class="shadow-bottom"></div></div>';
	var fragment = document.createRange().createContextualFragment(agePicker);
	//console.log(fragment.getElementById('age-picker'))
	//console.log('Inserting age picker options');
	boxNode.insertAdjacentHTML('afterbegin', agePicker);
	console.log(current)
	//boxNode.style.overflowY = 'hidden';
	//boxNode.append(fragment);

	/*setTimeout(function(){
		//fragment.getElementById('age-picker').scrollTop = 200;
		document.getElementById('age-picker').onscroll = function(e){
			//console.log(this.childNodes[1]);
			thread.characterHeight = thread.getCharacterHeight(this.childNodes[1], 99);
			var picker = this;
			var options = picker.getElementsByClassName('picker-number');
			////console.log(picker, options)
			var currentNumber = Math.ceil(this.scrollTop / thread.characterHeight);
			var steps = Math.ceil(picker.getBoundingClientRect().height / (thread.characterHeight + 0)) ;
			var startingFont = 12;
			var middle = Math.ceil(steps / 2);
			var pointer = 0;
			//var breakpoint = _ref + middle;
			////console.log((currentNumber + steps))
			for(var g = 0; g < options.length; g++){
				if(pointer < middle){
					startingFont += 8;
				}else if(pointer > middle){
					startingFont -= 8;
					if(pointer == steps){
						pointer = 0;
						startingFont = 12;
					}
				}
				pointer++;
				currentNumber = g;
				////console.log(g);
				var op = options[g];
				if(op == undefined){
					//console.log('UNDEFINED '+g);
				}else{
					op.style.fontSize = startingFont+'px';	
				}
			}
				////console.log();
		};
	}, 1000);*/
	////console.log(agePicker)
};

Luxbody.prototype.callback_phone_digits = function(){
	var thread = this;

	thread.inputDigits = document.getElementsByClassName('digit');
	var boxDigitos = document.getElementById('digits');
	var boxVerification = document.getElementById('verify-code');
	var inputDigits = thread.inputDigits;
	inputDigits[0].focus();
	thread.positionDigit = 0;

	document.addEventListener('keydown', function(e){
		var currentInput = inputDigits[thread.positionDigit];
		var currentVal = currentInput.value;
		if(currentVal.length == 1){
			if(e.keyCode == 8){
				currentInput.value = '';
			}
			e.stopPropagation();
			e.preventDefault();
		}
		////console.log(e.keyCode);
		if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
			////console.log()
			//inputDigits[positionDigit].value = String.fromCharCode(e.keyCode);
		    //positionDigit = positionDigit + 1;
		    if(thread.positionDigit < 5){
		    	currentInput.value = e.key;
		    	inputDigits[(parseInt(thread.positionDigit)+1)].focus();
				var currentCode = thread.getCode();
				//console.log(currentCode);
		    	e.stopPropagation();
				e.preventDefault();
		    }else if(thread.positionDigit == 5){
		    	thread.Loader_adapt(boxVerification, '');
		    	boxDigitos.style.display = 'none';
		    	setTimeout(function(){
		    		var enteredCode = thread.getCode();
					thread.verifyCode(enteredCode, thread.code);
		    	}, 500);
		    }
		    
		}else{
			e.stopPropagation();
			e.preventDefault();
		}
		
	});

	for(var g = 0; g < inputDigits.length; g++){
		inputDigits[g].onfocus = function(e){

			////console.log(this)
			var pos = this.getAttribute('data-pos');
			thread.positionDigit = pos;
			////console.log(thread.positionDigit)
		};
	}
	thread.Loader_hide();
};
Luxbody.prototype.hideLoader = function(){
	//console.log(this);
	this.Loader_hide();
};
Luxbody.prototype.callback_verify_phone = function(target){
	var thread = this;
	/*this.scope['step'] = "1";
	this.scope['totalSteps'] = "8";
	thread.Load(thread.mainBox, 'cuestionario.html', function(){
		thread.Loader_hide();
	}, null);*/
	thread.startCuestionario();
	return;
	var input = document.querySelector("#phone_number");

	////console.log(input);
    var interphone = window.intlTelInput(input, {
      // allowDropdown: false,
      // autoHideDialCode: false,
      // autoPlaceholder: "off",
      // dropdownContainer: document.body,
      // excludeCountries: ["us"],
      // formatOnDisplay: false,
      // geoIpLookup: function(callback) {
      //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
      //     var countryCode = (resp && resp.country) ? resp.country : "";
      //     callback(countryCode);
      //   });
      // },
      // hiddenInput: "full_number",
      // initialCountry: "auto",
      // localizedCountries: { 'de': 'Deutschland' },
      // nationalMode: false,
      // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
      // placeholderNumberType: "MOBILE",
      // preferredCountries: ['cn', 'jp'],
      // separateDialCode: true,
      utilsScript: "build/js/utils.js",
    });	
    input.addEventListener("countrychange", function(e) {
    	//console.log(e);
    	setTimeout(function(){

			var div = document.createElement('span');
			div.innerText = input.placeholder;
			document.body.appendChild(div);
			input.style.width =  div.getBoundingClientRect().width + 60 + "px";
			div.parentNode.removeChild(div);
		}, 500);
	  // do something with iti.getSelectedCountryData()
	});
	setTimeout(function(){
		//input.parentNode.style.display = 'none';
		input.onkeyup = function(e){
			if(thread.country_phones.isValidNumber()){
				var countryData = thread.country_phones.getSelectedCountryData();
				
				var plainNumber = countryData.dialCode+Number(this.value);

				thread.Load(thread.mainBox, 'phone-digits.html', function(){
					app.verifyPhone(plainNumber);

				}, null);
				/*input.previousSibling.style.display = 'none';
				input.style.display = 'none'
				thread.Loader_adapt(input.parentNode, '');*/
				//app.getSmsCode();
			}
		};
		var div = document.createElement('span');
		div.innerText = input.placeholder;
		document.body.appendChild(div);
		input.style.width =  div.getBoundingClientRect().width + 60 + "px";
		div.parentNode.removeChild(div);
		thread.Loader_hide();
	}, 500);
    //console.log(input.placeholder);
   	this.country_phones = interphone;

};
Luxbody.prototype.setup_variables = function(){
	var thread = this;
	var randString = thread.generate_random_string(10);
	if(localStorage.getItem("user_id") == null){
		if(typeof(device) != "undefined"){
			thread.user_id = (device.uuid == undefined?Date.now():device.uuid)+'_'+randString;
		}else{
			thread.user_id = Date.now()+"_"+randString;
		}
		localStorage.setItem("user_id", thread.user_id);
	}else{
		thread.user_id = localStorage.getItem('user_id');
	}
	
};

Luxbody.prototype.view_register = function(){
	var thread = this;
	thread.Loader_hide();
};
Luxbody.prototype.init = function(){
	var thread = this;
	thread.setup_variables();
	thread.agepickerFunc = 'updateAge';
	thread.heightpickerFunc = 'updateHeight';
	//thread.engine = new Engine();
	thread.setup(this);
	var credential = thread.getCredentials();
	if(credential == null){
		thread.Load(thread.mainBox, 'register.html', function(){
			thread.history.push({
				'view': 'register',
				'func': 'view_register',
				'params': []
			});
		}, null);

	}else{
/*		thread.Load(thread.mainBox, 'seguidor-ayuno-clock.html', function(){
			
			thread.history.push({
				'view':'seguidor-ayuno-clock',
				'func':'view_fast_tracker_clock'
			});
			thread.view_fast_tracker_clock();
			thread.Loader_hide();
		}, null);*/
		thread.Load(thread.mainBox, 'home.html', function(){
			thread.history.push({
				'view':'home',
				'func':'loadHome'
			});
			thread.Loader_hide();
		}, null);
	}
};
//var engine = new Engine();
var luxbody = new Luxbody();
luxbody.init();
