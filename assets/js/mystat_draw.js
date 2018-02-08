window.addEventListener('load', onloadHandler, false);

function onloadHandler()
{

	
	var canvas = document.getElementById('canvas'),
       ctx = canvas.getContext("2d"),
       width = canvas.width,
       height = canvas.height;
	
	
	
	
	
	
	   var fixedColors = [
	                      "rgba(12, 191, 243, .9)",     
	                      "rgba(240, 223, 15,.9)",
	                      "rgba(61, 250, 5,.9)",
	                      "rgba(237, 18, 18,.9)",
	                      "rgba(228, 27, 223,.9)"
	                      
	                                       
	                      ];
   // all blobs later used w/ the text structure
   var nameList = new NameList();
     nameList.names = [
	new Name("hi", new Blob(67,  136, 0, 34, fixedColors[getRandomInteger(0, fixedColors.length-1)])),
	new Name("hi", new Blob(106, 74,  0, 22, fixedColors[getRandomInteger(0, fixedColors.length-1)])),
	new Name("hi",  new Blob(114, 52,  0, 10, fixedColors[getRandomInteger(0, fixedColors.length-1)])),
	new Name("hi", new Blob(150, 160, 0, 90, fixedColors[getRandomInteger(0, fixedColors.length-1)])),
	new Name("hi", new Blob(232, 232, 0, 25, fixedColors[getRandomInteger(0, fixedColors.length-1)])),
	new Name("hi", new Blob(150, 160, 0, 90, fixedColors[getRandomInteger(0, fixedColors.length-1)])),
	new Name("hi", new Blob(64,  188, 0, 10, fixedColors[getRandomInteger(0, fixedColors.length-1)])),
	new Name("hi",  new Blob(64,  42, 0, 10, fixedColors[getRandomInteger(0, fixedColors.length-1)]))

	];

 
     
     
     
   function Name(name_of_text, blob){
	   this.corresponding_blob = blob;
	   this.name = name_of_text;
	   this.render = function(){
           ctx.save();
		   drawText(this.corresponding_blob.x,this.corresponding_blob.y, this.name, "#000000");
           ctx.restore();
           ctx.save();
           this.corresponding_blob.render();
           ctx.restore();
	   };
   }
   
   /** all the names will be stored here **/
   function NameList(){
	   this.names = [];
	   
	
	 this.render = function(){  
       for (var i = 0; i < this.names.length; i++){
          this.name = this.names[i];
          this.name.render();
          
       }
      };
      
      
      
      this.update = function(){

          for (var i = 0,dx,dy; i < this.names.length; i++){
            
             blob = this.names[i].corresponding_blob;
             
             dx = this.mousex - (blob.position.x + offsetx);
             dy = this.mousey - (blob.position.y + offsety);
             d = Sqrt(dx * dx + dy * dy);
             


             if (Rnd() > 0.975){
                blob.targetPos.x = blob.origin.x;
                blob.targetPos.y = blob.origin.y;
                blob.velocity.z += (Rnd()*0.01 - 0.015);
                blob.spring = 0.00125;
             }else{
                blob.targetPos.x = blob.origin.x;
                blob.targetPos.y = blob.origin.y;
                blob.spring = 0.05;
             }
             
             blob.update();
          }
       };
      
      
      
   }
   
   
   
   
   
   function drawText(x, y, text, color){
     ctx.fillStyle = color;
     ctx.fillText(text, x, y);

   };
   
   function drawDisc(x, y, rad, color){
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, TWOPI, true);
      ctx.fill();
   };
   
 
   
   var offsetx = 0, offsety = 0;
   
   requestAnimFrame(loop);
   function loop(){

	   var el = canvas;
      offsetx = offsety = 0;
      do{
         offsetx += el.offsetLeft;
         offsety += el.offsetTop;
      } while (el = el.offsetParent);
      offsetx = offsetx - window.pageXOffset;
      offsety = offsety - window.pageYOffset;
      
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      nameList.render();
      ctx.save();
    
      
      ctx.globalCompositeOperation = 'darker';
      nameList.update();
      
      
      requestAnimFrame(loop);
   };
   

   
   function Blob(x, y, z, radius, color){
      this.origin = new Vector3D(x,y,z);
      this.position = new Vector3D(x,y,z);
      this.targetPos = new Vector3D(x,y,z);
      this.originradius = radius;
      this.radius = radius;
      this.velocity = new Vector3D(0,0,0);
      this.friction = 0.75;
      this.spring = 0.05;
      this.x = x;
      this.y = y;
      this.z = z;
      this.color = color;
     
      
      
      
      
      
      
      
      
      this.update = function(){
         this.velocity.x += (this.targetPos.x - this.position.x) * this.spring;
         this.velocity.x *= this.friction;
         this.position.x += this.velocity.x;
         
         this.velocity.y += (this.targetPos.y - this.position.y) * this.spring;
         this.velocity.y *= this.friction;
         this.position.y += this.velocity.y;
         
         var dox = this.origin.x - this.position.x,
             doy = this.origin.y - this.position.y,
             d = Sqrt(dox * dox + doy * doy);
         
         this.targetPos.z = d/150 + 1;
         this.velocity.z += (this.targetPos.z - this.position.z) * this.spring;
         this.velocity.z *= this.friction;
         this.position.z += this.velocity.z;
         
         this.radius = this.originradius * this.position.z;
         if (this.radius < 1) this.radius = 1;
      };
      
      this.render = function(){
         ctx.fillStyle = this.color;
         ctx.beginPath();
         ctx.arc(this.position.x, this.position.y, this.radius, 0, TWOPI, true);
         ctx.fill();
      };
   };
}


function getRandomInteger(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}




window.requestAnimFrame = (function(){
   return  window.requestAnimationFrame       ||  window.webkitRequestAnimationFrame || 
           window.mozRequestAnimationFrame    ||  window.oRequestAnimationFrame      || 
           window.msRequestAnimationFrame     || 
           function(callback, element){
               window.setTimeout(callback, 1000 / 60);
           };
})();