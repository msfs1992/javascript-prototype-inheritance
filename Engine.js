var Engine = function(){
	this.loader = document.getElementById('loader');
	this.mainBox = document.getElementById('main-box');
	this.timestap = Date.now();
	this.version = this.timestap;
	this.code = null;
	this.scope = [];
	//this.interface = null;
	this.cretendials = 'hio';
	this.history = [];
	this.loaders = [];
	//this.url = 'http://127.0.0.1:80/luxbody/';
	this.url = 'http://luxbodyapp.com/'
	this.apiUrl = 'android/';
	this.origin = this.url + this.apiUrl;
	this.Swiper = null;
	this.screenWidth = window.innerWidth;
	this.agepickerFunc = null;
	this.heightpickerFunc = null;
	this.characterHeight = 37;
	this.buttonBack = document.getElementById('button-back');
	this.pathView = 'views/';
	this.toolbar = document.getElementById('toolbar')
	this.toolbarOptions = [];
	this.user_id = null;

};
Engine.prototype.getDaysInMonth = function(month, year){
    return new Date(year, month, 0).getDate();
};
Engine.prototype.toolbarRefresh = function(){
	
};
Engine.prototype.getArrayIndexByValue = function(arr, value){
	//console.log(arr, value)
	var index = -1;
	for(var y = 0; y < arr.length; y++){
		if(arr[y].className == value.className){
			//console.log(y)
			index = y;
		}
	}
	return index;
};
Engine.prototype.switchToolbarOptions = function(toTarget){
	//console.log(toTarget)
	var thread = this;
	var _toTarget = document.getElementsByClassName(toTarget)[0];
	//console.log(_toTarget.parentNode);
	var toTargetIndex = thread.getArrayIndexByValue(_toTarget.parentNode.children, _toTarget);
	//console.log(_toTarget.parentNode.children, _toTarget);
	var els = thread.toolbar.getElementsByClassName('option');
	for(var g = 0; g < els.length; g++){
		if(thread.hasClass(els[g], 'toolbar-active-option')){
			thread.removeClass(els[g], 'toolbar-active-option');
		}
	}
	thread.addClass(thread.toolbar.getElementsByClassName('option')[toTargetIndex], 'toolbar-active-option');
};
Engine.prototype.generate_random_string = function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
};
Engine.prototype.Swipe = function(fn){
	var thread = this;
	var func = fn;
	var touchstartX = 0;
	var touchstartY = 0;
	var touchendX = 0;
	var touchendY = 0;

	var gesuredZone = document.getElementById('slider');
	gesuredZone.addEventListener('scroll', function(event){
		event.stopPropagation();
		event.preventDefault();

		return false;
	});

	gesuredZone.addEventListener('touchstart', function(event) {
		//event.preventDefault();
		event.stopPropagation();
		console.log(event.touches[0])
	    touchstartX = event.touches[0].screenX;
	    touchstartY = event.touches[0].screenY;
	    ////console.log(event)
	}, false);

	gesuredZone.addEventListener('mousedown', function(event) {
		//event.preventDefault();
		//console.log(event)
		event.stopPropagation();
		
	    touchstartX = event.clientX;
	    touchstartY = event.clientY;
	    ////console.log(event)
	}, false);
	gesuredZone.addEventListener('mouseup', function(event) {
		//event.preventDefault();
		//console.log(event)
		event.stopPropagation();
		
	    touchendX = event.clientX;
	    touchendY = event.clientY;
	    handleGesure(event);
	    ////console.log(event)
	}, false);
	gesuredZone.addEventListener('touchend', function(event) {
		//event.preventDefault();
		event.stopPropagation();
		////console.log(event.changedTouches[0])
	    touchendX = event.changedTouches[0].screenX;
	    touchendY = event.changedTouches[0].screenY;
	    ////console.log(event)
	    handleGesure(event);
	}, false); 

	function defaultSlide(direction){
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
	}

	function handleGesure(event) {
		
	    if (touchendX < touchstartX && (touchstartX - touchendX) > 50 ) {
	    	//_cuestionarios.style.transform = 'traslate3d('+thread.scr+')';
	    	console.log('left')
	    	if(fn != null){
	    		fn('left');
	    	}else{
	    		defaultSlide('left');
	    	}
	    	
	    }
	    if (touchendX > touchstartX && (touchendX - touchstartX) > 50 ) {
	    	console.log('right')
	    	//_cuestionarios.style.transform = 'traslate3d('+thread.scr+')';
	        if(fn != null){
	    		fn('right');
	    	}else{
	    		defaultSlide('right');
	    	}
	    }
/*	    if (touchendY < touchstartY) {
	    	//_cuestionarios.style.transform = 'traslate3d('+thread.scr+')';
	    	fn('up');
	    }
	    if (touchendY > touchstartY) {
	    	//_cuestionarios.style.transform = 'traslate3d('+thread.scr+')';
	        fn('down');
	    }*/
	    if (touchendY == touchstartY || touchendX == touchstartX) {
	    	////console.log(event.target)
	    	//thread.getTarget(event);
	    	//event.target.click();
	    	//_cuestionarios.style.transform = 'traslate3d('+thread.scr+')';
	        ////console.log('tap!');
	    }
	}
	function _swipeLeft(){
		func('left');
		//console.log("swipping left")
	}

	return {
		swipeLeft: _swipeLeft
	};

};
Engine.prototype.XHR = function(data, node, json){
	var thread = this;
	return new Promise(function(resolve, reject){
		try {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function()
			{
				if (request.readyState == 4 && request.status == 200)
				{
					//return callback(request);
					resolve(request);
				}
			}
			request.open('POST', thread.origin+node, true);

			//request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			if(json){
				request.setRequestHeader("Content-Type", "application/json");
				//request.setRequestHeader("Content-type", "multipart/form-data");
				console.log(data);
				request.send(data);
			}else{
				var _data = new FormData();
				_data.append('user_token', localStorage.getItem('user_token'));
				for(x in data){
					_data.append(x, data[x]);
				}
				//request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				request.send(_data);
			}
		}catch(error){
			reject(error);
		}
	});
	//
	
};
Engine.prototype.serializeArray = function(form) {  
	var objects = [];  
	if (typeof form == 'object' && form.nodeName.toLowerCase() == "form") {  
		var fields = form.getElementsByTagName("input");  
		for(var i=0;i<fields.length;i++){  
		    objects[objects.length] = { name: fields[i].getAttribute("name"), value: fields[i].getAttribute("value") };  
		}  
	}  
	return objects;  
};
Engine.prototype.addClass = function(element, classN){
	var subfunc = function(element, classN){
		var classString = element.className;
		var newClass = classString.concat(" "+classN);
		element.className = newClass;
	};
	if(element.length != undefined){
		for(var g = 0; g < element.length; g++){
			subfunc(element[g], classN);
		}
	}else{
		subfunc(element, classN);
	}
};
Engine.prototype.hasClass = function(element, classN) {
      var classes = element.className.split(" ");
      var i = classes.indexOf(classN);
      return (i >= 0);
};
Engine.prototype.removeClass = function(element, classN){
	var subfunc = function(element, classN){
    	var reg = new RegExp('(\\s|^)'+classN+'(\\s|$)');
    	element.className = element.className.replace(reg,' ');
	};
	if(element.length != undefined){
		for(var g = 0; g < element.length; g++){
			subfunc(element[g], classN);
		}
	}else{
		subfunc(element, classN);
	}
};
Engine.prototype.CPromise = function(fn, callback, params){
	return new Promise(function(resolve, reject){
		fn(resolve, reject);
	}).then(function(result){
		if(callback != null){
	    	callback(result);
	    }
	    //hoteles.Loader_hide();
	}).catch(function(error){
		//hoteles.Loader_hide();
		//console.log(error);
	});
};
Engine.prototype.Loader_show = function(){
	this.loader.style.display = 'block';
};
Engine.prototype.Loader_adapt = function(elementNode, text){
	//console.log(elementNode);
	var loaderBg = document.createElement('div');
	loaderBg.className = 'loader-adapt';
	loaderBg.innerHTML = '<div class="tag">'+text+'</div><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
	elementNode.prepend(loaderBg);
	this.loaders.push(loaderBg);
	//this.loader.style.display = 'block';
};
Engine.prototype.Loader_hide = function(){
	//console.log("LOADER HIDE")
	//setTimeout(function(){
		this.loader.style.display = 'none';
		//hoteles.FixTranslator();
	//},500);
};
Engine.prototype.Load = function(box, view, callback, params){
	var thread = this;
	this.CPromise(function(resolve, reject){
		var request = new XMLHttpRequest();
		request.open('GET', thread.pathView+view+'?v='+thread.version, true);
		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		  	window.scrollTo(0,0);
		    var resp = request.responseText;
		    //console.log(typeof resp);
/*		    for(x in thread.scope){
		    	var step = "{ "+x+" }";
		    	resp = resp.replaceAll(step, thread.scope[x]);
		    }*/
		    box.innerHTML = resp;
		    thread.setDispatchers();

		    if(thread.history.length == 0 || thread.history[thread.history.length - 1].view == 'home'){
		    	thread.buttonBack.style.display = 'none';
		    }else{
		    	thread.buttonBack.style.display = 'block';
		    }
		    
		    resolve(params);
		  }else if(request.status > 400){
		  	reject(false);
		  	thread.Loader_hide();
		  }
		};
		request.onprogress = function () {
		  //console.log('LOADING: ', request.status);
		};
		request.send();
	},callback,params);
	
};
Engine.prototype.getCredentials = function(){
	return localStorage.getItem('engine_credentials');
};
Engine.prototype.Refresh = function(){
	var hlength = this.history.length;
	var cview = this.history[hlength-1].view;
	var cfunc = this.history[hlength-1].func;

	if(this.history[hlength-1].params.length > 0){
		var cparams = this.history[hlength-1].params[0];
	}else{
		var cparams = null;
	}

	if(hoteles[cfunc] == undefined){
		var cfn = thread['Loader_hide'];
	}else{
		var cfn = thread[cfunc];
	}
	////console.log(hoteles[cfunc]);
	this.Load(this.mainBox, cview+'.html', cfn, cparams);
};
Engine.prototype.Goback = function(target){
	var thread = this;
	thread.Loader_show();
	/*if(this.history[this.history.length-1].view == '0.0.mensajes'){
		this.logoHotel.style.display = 'inline-block';
	}*/
	//console.log('GoBack')

	this.history.pop();
	var hlength = this.history.length;
	var cview = this.history[hlength-1].view;
	var cfunc = this.history[hlength-1].func;
	var cparams = null;
	//if(cview == 'home' || cview == 'progreso' || cview == 'perfil'){
		thread.removeExtraToolbarOptions();

	//}
	if(this.history[hlength-1].params != undefined){
		cparams = this.history[hlength-1].params[0];
		////console.log( this.history[hlength-1].params[0]);
	}
	if(thread[cfunc] == undefined){
		this.Load(this.mainBox, cview+'.html', function(){
			thread['Loader_hide'];
		}, cparams);

	}else{
		this.Load(this.mainBox, cview+'.html', function(){
			thread[cfunc](target);
		}, cparams);
	}
	thread.Loader_hide();
	////console.log(this.history)
	///
	
};
Engine.prototype.agepickerCallback = function(target){
	this[this.agepickerFunc](target);
};
Engine.prototype.heightpickerCallback = function(target){
	this[this.heightpickerFunc](target);
};
Engine.prototype.getCharacterHeight = function(box, numbers){
	return (box.getBoundingClientRect().height / numbers);
};
Engine.prototype.setDispatchers = function(){

	var dispatchers = document.getElementsByClassName('event-dispatcher');
	for(var g = 0; g < dispatchers.length; g++){
		dispatchers[g].parentNode.style.position = 'relative';
	}
};


Engine.prototype.LoadView = function(target){
	var thread = this;
	thread.removeExtraToolbarOptions();
	var href = target.getAttribute('data-open');
	var func = target.getAttribute('data-func');
	thread.Load(thread.mainBox, href+'.html', function(){
		if(func != null){
			thread[func](target);
			//thread[func](target);
			/*setTimeout(function(){
				hoteles.Loader_hide();
			},1000);*/
		}else{
			//hoteles.Loader_hide();
		}
	},null);
};
Engine.prototype.removeExtraToolbarOptions = function(){
	var thread = this;
	var tops = thread.toolbar.children;
	var removeArr = [];
	//console.log(tops)
	for(var j = 0; j < tops.length; j++){
		//console.log(tops[j])
		if(thread.hasClass(tops[j], 'extra-option')){
			removeArr.push(tops[j]);
			//thread.toolbar.removeChild(tops[j]);
		}
	}
	for(k in removeArr){
		thread.toolbar.removeChild(removeArr[k]);
	}
	var _ops = thread.toolbar.getElementsByClassName('option');
	var _w = innerWidth / _ops.length;

	for(var h = 0; h < _ops.length; h++){
		_ops[h].style.width = _w+'px';
	}

};
Engine.prototype.getTarget = function(e){
	var thread = this;
	var target = e.target;
	////console.log(target)
	var action = target.getAttribute('data-func');
	////console.log(action)
	var gopen = target.getAttribute('data-open');
	if(gopen != null){
			thread.Loader_show();
			var _href = gopen;
			var _func = target.getAttribute('data-func');
			thread.history.push({
				'view': _href,
				'func': _func,
				'params': [target]
			});
			thread['LoadView'](target);
		
	}else{
		if(action != null){
			////console.log(thread)
			thread[action](target);
		}else{
			thread.Loader_hide();
		}
	}
};

Engine.prototype.setup = function(){
	var thread = this;
	
	//this.interface = interface;
	/*document.onchange = function(e){
		var target = e.target;
		var _type = target.type;
		switch(_type){
			case 'file':
				var box = target.getAttribute('data-box');
				hoteles.ReadImage(document.getElementById(box), target.files[0]);
				break;
			default:
				break;
		}
	};*/
	document.addEventListener('click', function(e){
		thread.getTarget(e);
	});
};