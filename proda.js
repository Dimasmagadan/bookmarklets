// javascript:(function(){
	var v="1.3.2";
	if(window.jQuery===undefined||window.jQuery.fn.jquery<v){
		var done=false;
		var script=document.createElement("script");
		script.src="http://ajax.googleapis.com/ajax/libs/jquery/"+v+"/jquery.min.js";
		script.onload=script.onreadystatechange=function(){
			if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){
				done=true;
				initMyBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	}else{
		initMyBookmarklet();
	}
	function initMyBookmarklet(){(
		window.myBookmarklet=function(){
			jQuery(".nextProda").live("click",function(){
				if(typeof(localStorage)=='undefined'){
					alert('Ваш браузер не поддерживает localStorage');
				}else{
					jQuery(document).scrollTop(localStorage.getItem('scroll'+encodeURIComponent(window.location.pathname)));
				}return false;
			});
			jQuery(".allProda").live("click",function(){
				var i = 0,
					k,
					u,
					r='';
				for (; k = window.localStorage.key(i); i++) {
					u = decodeURIComponent(k);	
					r=r+'<a href="http://'+u.replace('scroll', window.location.host )+'">'+u.replace('scroll/', '' )+'</a><br/>';
				}
				console.log(r);
				jQuery("body").append('<div class="allProdaList" style="background-color:rgb(190,111,98);display:block;left:50%;position:fixed;top:30px;width:300px;margin-left:158px;padding:8px;text-align:left;color:#fff">'+r+'</div>');
				return false;
			});
			jQuery("body").append('<a href="#" class="nextProda" style="background-color:rgb(190,111,98);display:block;left:0;position:fixed;top:10px;width:90px;padding:8px;text-align:center;color:#fff;border-radius:0 10px 10px 0">Продолжить чтение</a>');
			jQuery("body").append('<div style="background-color: rgb(190, 111, 98); display: block; color: rgb(255, 255, 255); height: 300px; overflow-y: scroll; font-size: 10px; line-height: 16px; box-shadow: -3px 0px 10px rgb(0, 0, 0); width: 300px; top: 10px; text-align: left; right: 10px; position: fixed; padding: 8px;" class="allProdaList">список</div>');
			jQuery(window).scroll(function(){
				if(typeof(localStorage)!='undefined'){
					if(jQuery(".nextProda").length>0){
						jQuery(".nextProda").width('20px').html('Zz..').css('font-size','10px');
					}try{
						localStorage.setItem('scroll'+encodeURIComponent(window.location.pathname),jQuery(document).scrollTop());
					}catch(e){
						if(e==QUOTA_EXCEEDED_ERR){}
					}
				}
			});
		})();
	}
// })();