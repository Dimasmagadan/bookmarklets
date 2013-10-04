if(typeof(localStorage)!='undefined'){
	os_prettify();
	
	if($('a.next_page').length>0){
		os_next( $('.next_page').attr('href') );
	} else {
		os_append();
	}

	jQuery('.delete').live('click',function(){
		var $h=jQuery(this).parent().parent(),
			c=[$h.attr('id')],
			r=[],
			l=localStorage.getItem('hiden');

		if(l){
			l=l.split(',');
			if(l instanceof Array){
				r = l.concat(c);
			} else {
				r.push(l);
				r.push(c);
			}
		} else {
			r.push(c);
		}

		try{
			localStorage.setItem('hiden',r);
		}catch(e){
			if(e==QUOTA_EXCEEDED_ERR){}
		}
		$h.hide('slow');
		return false;
	});
}

function os_next(l){
	jQuery.get(l,function(data ){
		
		jQuery(data).find('.tags').each(function(){
			jQuery(this).append('<a class="professional delete" href="#" style="background:red;color:#fff">скрыть</a>');
		});
		var c=jQuery(data).find('#tasks_list div').html();
		
		var n='';
		if(jQuery(data).find('a.next_page').length>0){
			n=jQuery(data).find('a.next_page').attr('href');
			n = window.location.protocol + "//" + window.location.host +n;
		}
		$('.pagination').remove();
		$('.tasks.shortcuts_items').append(c);
		if(n!==''){
			os_next(n);
		} else {
			os_append();
		}

		os_prettify();
		os_check(localStorage.getItem('hiden'));
	});
}

function os_check(n){
	if(n){
		n=n.split(',');
		var le= n.length;
		for (var i = 0; i < le; i++) {
			jQuery('#'+n[i]).hide();
		}
	}
}

function os_prettify(){
	jQuery('.title a').each(function(){
		var i=jQuery(this).attr('href');
		i=i.replace('/tasks/','');
		jQuery(this).parent().parent().attr('id',i);
	});
}

function os_append(){
	jQuery('.tags').each(function(){
		jQuery(this).append('<a class="professional delete" href="#" style="background:red;color:#fff">скрыть</a>');
	});
}
