function markit(textareas) {
    function bindEvent(element, type, handler) {
       if(element.addEventListener) {
          element.addEventListener(type, handler, false);
       } else {
          element.attachEvent('on'+type, handler);
       }
    }
    if (textareas.length === undefined) {
        textareas = [textareas];
    }
    var i = textareas.length;
    
    while (i--) {
        var textarea = textareas[i];
        if (typeof textarea.selectionStart == 'number') {
            var formatting = document.createElement('div');
            formatting.className = 'markit-formats';
            formatting.innerHTML = '<a class="markit-bold" href="#">Bold</a> <a class="markit-italic" href="#">Italic</a> <a class="markit-link" href="#">Link</a> <a class="markit-list" href="#">List</a>';
            bindEvent(formatting, 'click', function(e) {
                var targ;
            	if (!e) var e = window.event;
            	if (e.target) targ = e.target;
            	else if (e.srcElement) targ = e.srcElement;
            	if (targ.nodeType == 3) targ = targ.parentNode;
            	if (targ.tagName == 'A') {
            	    var formats = [];
            	    //formats[type] = [prepend, append];
            	    formats['bold'] = ['**', '**'];
            	    formats['italic'] = ['_', '_'];
            	    formats['link'] = ['[', ']('];
            	    formats['list'] = ['*', ''];
            	    var type = targ.className.replace('markit-', ''),
            	        before = formats[type][0],
            	        after = formats[type][1],
            	        beforeLen = before.length,
            	        afterLen = after.length;
            	    if (type == 'link') {
            	        after += prompt('Enter the link URL', 'http://')+')';
            	    }
            	    var original = textarea.value,
            	        start = textarea.selectionStart,
            	        end = textarea.selectionEnd,
            	        selected;
            	    if (start == end) {
            	        selected = type;
            	    } else {
            	        selected = original.substring(start, end); 
            	    }
            	    if (type == 'list') {
            	        if (start > 0 && original.charAt(start-1) != "\n") {
            	            before = "\n"+before;
            	        }
            	    } else {
            	        if (start > 0 && original.charAt(start-1) != ' ') {
            	            before = ' '+before;
            	        }
            	        if (original.charAt(end) != ' ') {
            	            after = after+' ';
            	        }
            	    }
            	    textarea.value = original.substr(0, start)+before+selected+after+original.substring(end, textarea.length);
            	    textarea.selectionStart = start+before.length;
            	    textarea.selectionEnd = start+before.length+selected.length;
                    e.preventDefault();
            	}
            });
            textarea.parentNode.insertBefore(formatting, textarea);
        }
    }
}

if (document.querySelectorAll) {
    markit(document.querySelectorAll('.markit'));
}