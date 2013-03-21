stv = new Object(); //set tile values
stv.red = '#FF2020';
stv.orange = '#FF8000';
stv.purple = '#AA00FF';
stv.blue = '#0000EE';
stv.white = '#FFFFFF';
stv.black = '#000000';
stv.small = '120px';
stv.medium = '200px';
stv.large = '280px';

function tile(n,bColor){

	if(!n){
		alert("object not created");
		return 'Name or background color for new tile was not defined';
	}
	
	bColor = bColor ? bColor : stv.black;
	this.name = n; //name for tile object
	this.Head = new displayArea('Head'); 
	this.Body = new displayArea('Body');
	this.ele = createElement('div',{'id':this.name, 'class':'tile'});
	this.ele.style.backgroundColor = bColor;
	this.loading = createElement('div', {'id':this.name+"_loading}"}, 'loading');
	
	insertElementAt(this.ele, document.getElementById('container'));
	insertElementAt(this.loading, this.ele);
	this.init = function(loop){
		loop = (loop != undefined ? loop:true);
		removeElement(this.loading);
		
		if(this.Head.numArray.length < 1){// if no content submitted for Head
			this.Head.addText(this.name,'main');
			this.Head.textDiv = insertElementAt(this.Head.text[this.Head.numArray[0]], this.ele);
		}
		else{
			if(typeof this.Head.text[this.Head.numArray[0]] === 'object')// if first displaying content is a text element
				this.Head.textDiv = insertElementAt(this.Head.text[this.Head.numArray[0]], this.ele);
			
			if(typeof this.Head.images[this.Head.numArray[0]] == 'object')// if first displaying content is a image element
				this.Head.imageDiv = insertElementAt(this.Head.images[this.Head.numArray[0]], this.ele);
		}
		
		if(this.Body.numArray.length < 1){// if no content submitted for body
			this.Body.addText('Nothing was submitted','main');
			this.Body.textDiv = insertElementAt(this.Body.text[this.Body.numArray[0]], this.ele);
		}
		else{
			if(typeof this.Body.text[this.Body.numArray[0]] === 'object')// if first displaying content is a text element
				this.Body.textDiv = insertElementAt(this.Body.text[this.Body.numArray[0]], this.ele);
			
			if(typeof this.Body.images[this.Body.numArray[0]] === 'object')// if first displaying content is a image element
				this.Body.imageDiv = insertElementAt(this.Body.images[this.Body.numArray[0]], this.ele);
		}

		if(loop){
			var pass = this; 
			this.Head.updateEvent = window.setTimeout(function(){
				var a = pass.Head;
				a.loop(pass);
			}, this.Head.loopTime);
			
			this.Body.updateEvent = window.setTimeout(function(){
				var a = pass.Body;
				a.loop(pass);
			}, this.Body.loopTime);
		}
	}
	
	this.remove = function()
	{
		removeElement(this.ele);
	}
	
}

function displayArea(n){
	if(!n)
		return 'Name for new displayArea was not defined';
	
	this.name = n;
	this.displaying = 0;
	this.loopTime = 10000;
	
	this.numArray = Array();
	this.text = Array();
	this.images = Array();
	
	this.updateEvent;
	this.textDiv;
	this.imageDiv;
	
	this.addText = function(k, text){
		if(!text || !k)
			return "Text or key not defined.";
		
		this.text[k] = createElement('div',{'class':this.name},text);
		this.numArray.push(k);
	}
	
	this.addCallBack = function(k, call, callTime){
		if(typeof this.text[k] === 'object'){
			var loc = this;
			var pass = k;
			this.text[k].call = call;
			this.text[k].callTime = [callTime != null ? callTime: 10000];
			this.text[k].callBack = function(loc, pass){
				updateElementContent(loc.text[pass],loc.text[pass].call());
				setTimeout(function(){loc.text[pass].callBack(loc, pass)}, loc.text[pass].callTime);
				return true;
			};
			this.text[k].callBack(loc, pass);
		}
	}
	
	this.updateText = function(k, text){
		if(!text || !k)
			return "Text or key not defined.";
		updateElementContent(this.text[k],text);
	}
	
	this.addImg = function(k, loc){
		if(!loc || !k)
			return "Text or key not defined.";
		var img = createElement('img', {'src':loc, 'alt':this.name+"_img_"+k, 'class':'Img'});
		this.images[k] = createElement('div',{'class':this.name},undefined,img);
		this.numArray.push(k);
	}

	this.updateImg = function(k, loc){
		if(!loc || !k)
			return "Text or key not defined.";
			
		this.images[k] = createElement('img', {'src':loc, 'alt':this.name+"_img_"+k, 'class':' Img'});
	}
	
	
	this.loop = function(loc){
		if(!loc) 
			return 'location not Specified. Define location to create new Element';
			
		var pass = this.name;
		this.displaying = (this.displaying < this.numArray.length-1 ? this.displaying+1:0);
		
		if(typeof this.text[this.numArray[this.displaying]] === 'object'){
			removeElement(this.textDiv);
			this.textDiv = insertElementAt(this.text[this.numArray[this.displaying]], loc.ele);
			
		}
		
		if(typeof this.images[this.numArray[this.displaying]] === 'object'){
			removeElement(this.imageDiv);
			this.imageDiv = insertElementAt(this.images[this.numArray[this.displaying]], loc.ele);
		}
		
		this.updateEvent = window.setTimeout(function(){
			var a = loc[pass];
			a.loop(loc);
		}, this.loopTime);
		return this.displaying;
	}
	
	this.setStyle = function(atr){
		if(!atr)
			return "style was not defined.";
		this.ele.style[atr] = this[atr];
 	}
}
