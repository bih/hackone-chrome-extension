/* Default */
window.onEnterPress = false;

/* Standard. */
$(document).ready(function() {
	if($("#editor").length > 0)
	{
		$.fn.getNewWidth = function() {
			var testElem, _obj, _width;
			_obj = $(this);
			testElem = $("<div>").css({ 'display': 'inline', 'padding': '0', 'margin': '0', 'z-index': '-100', 'position': 'absolute', 'top': '0', 'left': '-999999px' });

			$.each(['font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'text-transform', 'word-spacing', 'text-indent'], function (i, val) {
        testElem.css(val, _obj.css(val));
      });

      testElem.text($(this).val());
      testElem.appendTo("body");
      _width = testElem.width();
      testElem.remove();

      return _width;
		};
    $.scrollToTop = function() {
      $("body").animate({ scrollTop: 0 }, 1);
      $("input").blur();
    };
    $.scrollToBottom = function() {
      $("body").animate({ scrollTop: ($(document).height() - $("body").height()) }, 1);
      $("input").blur();
    };
		$.fn.resizable = function() {
			$(this).each(function() {
				var _function;
				_function = function() {
					$(this).stop().animate({ 'width': $(this).getNewWidth() + 'px' }, 50);
				};

				if(typeof $(this).val() !== "undefined") {
	        $(this).stop().css({ 'width': $(this).getNewWidth() + 'px' });
				}

				$(this).unbind('keyup keydown', _function).bind('keyup keydown', _function);
			});

			return $(this);
		};
		$.fn.showIn = function() {
			return $(this).css('display', 'inline-block');
		};
		$.fn.configureForEducationArea = function() {
			var parent;

      try {
        parent = $(this).parent().parent().parent();
        if(parent === []) { parent = $("#editor .f-educations .f-education"); }
      } catch(err) {
        parent = $("#editor .f-educations .f-education");
      }

			$(this).resizable().unbind().focus(function() {
				window.onEnterPress = function() {
          var _before;
          _before = window.onEnterPress;
          parent.find('a#f-add-education-area').click();
          window.onEnterPress = _before;
        };
			}).blur(function() {
				window.onEnterPress = false;

				var _item;
				_item = $(this);
				if(_item.val() == "") { _item.parent().remove(); }

				parent.find('.f-education-areas #string input').each(function() {
					if($(this).attr('id') !== _item.attr('id') && $(this).val().toLowerCase() === _item.val().toLowerCase()) {
						_item.parent().remove();
					}
				});
			});
			return $(this);
		};
		$.fn.configureForHackathonProjectTechnologies = function() {
			var parent;

      try {
        parent = $(this).parent().parent().parent();
        if(parent === []) { parent = $("#editor .f-hackathons .f-hackathon"); }
      } catch(err) {
        parent = $("#editor .f-hackathons .f-hackathon");
      }

			$(this).resizable().focus(function() {
				window.onEnterPress = function() { parent.find('a#f-add-hackathon-project-technologies').click(); };
			}).blur(function() {
				window.onEnterPress = false;

				var _item;
				_item = $(this);
				if(_item.val() == "") { _item.parent().remove(); }

				parent.find('.f-hackathon-project-technologies #string input').each(function() {
					if($(this).attr('id') !== _item.attr('id') && $(this).val() === _item.val()) {
						_item.parent().remove();
					}
				});
			});

			return $(this);
		};
		$.fn.configureForHackathonAwards = function() {
			var parent;

      try {
        parent = $(this).parent().parent().parent();
        if(parent === []) { parent = $("#editor .f-hackathons .f-hackathon"); }
      } catch(err) {
        parent = $("#editor .f-hackathons .f-hackathon");
      }

			$(this).resizable().focus(function() {
				window.onEnterPress = function() { parent.find('a#f-add-hackathon-award').click(); };
			}).blur(function() {
				window.onEnterPress = false;

				var _item;
				_item = $(this);
				if(_item.val() == "") { _item.parent().remove(); }

				parent.find('.f-hackathon-awards #string input').each(function() {
					if($(this).attr('id') !== _item.attr('id') && $(this).val().toLowerCase() === _item.val().toLowerCase()) {
						_item.parent().remove();
					}
				});
			});
			return $(this);
		};
		$.fn.validationErrors = function() {
			var errors = [], _val;

			if($(this).hasClass('f-string')) {
				_val = $(this).find('input').val();

				if($(this).hasClass('f-required')) {
					if(_val.length == 0) { errors.push($(this).find('input').attr('id') + "_empty"); }
				}

				if($(this).hasClass('f-link')) {
					var http_types, _valid;
					http_types = ["http://", "https"];
					_valid = false;

					for(var i in http_types) {
						_valid = _valid || (_val.substr(0, http_types[i].length) === http_types[i]);
					}

					if(_val.length > 0 && _valid === false) {
						errors.push($(this).find('input').attr('id') + "_invalid_url");
					}
				}

				// if($(this).hasClass('f-username') && $('#username:focus').length > 0) {
				// 	var _parent, _taken;
				// 	_parent = $(this);
				// 	_taken = $(this).data('taken').split(',') || [];

				// 	if(_val.length > 0 && _taken.indexOf(_val) > -1) {
				// 		errors.push(_val.toLowerCase() + " is taken")
				// 	} else if(_val.length > 0) {
				// 		$.getJSON('/username_validation?username=' + _val.toLowerCase(), function(response) {
				// 			if(response.available == false) {
				// 				_parent.addClass('f-error');
				// 				_parent.find('#comment').showIn().text("error: " + _val + ' is taken');
				// 				_taken = _parent.data('taken').split(',') || [];
				// 				_taken.push(_val);
				// 				_parent.data('taken', _taken.join(','));
				// 			}
				// 		});
				// 	}
				// }

				if($(this).hasClass('f-email')) {
					if(_val.length > 0 && /\S+@\S+/.test(_val) === false) { errors.push($(this).find('input').attr('id') + "_invalid"); }
				}

				if($(this).hasClass('f-shirtsize')) {
					var accepted_sizes;
					accepted_sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

					if(_val.length > 0 && accepted_sizes.indexOf(_val.toUpperCase()) === -1) {
						errors.push("shirtSize_invalid (only " + (accepted_sizes.join(', ')) + ")");
					}
				}

				if($(this).hasClass('f-bio-gender')) {
					var genders;
					genders = ["male", "female", "non_binary", "n/a", "other"];

					if(_val.length > 0 && genders.indexOf(_val.toLowerCase()) === -1) {
						errors.push("gender_error (only " + (genders.join(', ')) + ")");
					}
				}

				if($(this).hasClass('f-bio-location-countrycode')) {
					var countrycodes, countries, _index;
					countrycodes = ["AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BQ","BA","BW","BV","BR","IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","CI","HR","CU","CW","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU","VE","VN","VG","VI","WF","EH","YE","ZM","ZW"];

					countries = ["Afghanistan","Åland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia, Plurinational State of","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Congo, the Democratic Republic of the","Cook Islands","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Curaçao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Malvinas)","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic of","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic of","Korea, Republic of","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia, the former Yugoslav Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova, Republic of","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine, State of","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Réunion","Romania","Russian Federation","Rwanda","Saint Barthélemy","Saint Helena, Ascension and Tristan da Cunha","Saint Kitts and Nevis","Saint Lucia","Saint Martin (French part)","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan, Province of China","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela, Bolivarian Republic of","Viet Nam","Virgin Islands, British","Virgin Islands, U.S.","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];

					if(_val.length > 0 && (_index = countrycodes.indexOf(_val.toUpperCase())) === -1) {
						errors.push("invalid country code (example: US for america)")
					} else {
						$(this).find('#comment').data('country', countries[_index]);
					}
				}

				if($(this).hasClass('f-monthyeardate')) {
					var months, _format, _month, _year, startYear, _error = true;
					months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

					var currentYear = (new Date().getFullYear() + 20), years = [];
          startYear = startYear || 1901;
					while ( startYear <= currentYear ) { years.push(startYear++); }

					_format = _val.split(' ');

					if(_format.length === 2) {
						_month = _format[0].toLowerCase();
						_year = _format[1];

						if(months.indexOf(_month) > -1 && years.indexOf(parseInt(_year)) > -1) { _error = false; }
					}

					if(_error === true && _val.length > 0) { errors.push("invalid format (example: June 2013)") }
				}

				if($(this).hasClass('f-yeardate')) {
					var currentYear = (new Date().getFullYear() + 20), startYear, years = [];
          startYear = startYear || 1901;
					while ( startYear <= currentYear ) { years.push(startYear++); }

					if(_val.length > 0 && years.indexOf(parseInt(_val)) == -1) {
						errors.push("Invalid year (example: 2015)");
					}
				}

			}

			return errors.reverse();
		};

		var validate = function() {
			$("#editor .f").each(function() {
				var error;
				error = $(this).validationErrors();

				if(error.length > 0) {
					$(this).addClass('f-error');
					$(this).find('#comment').showIn().text((error.length > 1 ? "errors: " : "error: ") + error.join(', '));
				} else {
					$(this).removeClass('f-error');
					if($(this).data('message')) {
						$(this).find('#comment').showIn().text($(this).data('message'));
					} else if(typeof $(this).find('#comment').data('country') !== "undefined") {
						$(this).find('#comment').showIn().text("country: " + $(this).find('#comment').data('country').toLowerCase());
					} else {
						$(this).find('#comment').hide().empty();
					}
				}
			});
		};

		var customCallback = function(res, _call) {
      if(res.find('input').val() === "") {
        res.addClass('empty');
      } else {
        res.removeClass('empty');
      }

			if(res.hasClass('f-username')) {
				$("#editor-layout h3 span#username").text($(res).find('input').val().toLowerCase());
				res.find('input').val(res.find('input').val().replace(/\W/g, '').replace(/\s+/g, ''));
			}

			if(res.hasClass('f-string')) {
				res.find('input').stop().animate({ 'width': res.find('input').getNewWidth() + 'px' }, 50);
			}

			if(res.hasClass('f-boolean')) {
				res.find('input').removeClass('f-boolean-true f-boolean-false').addClass("f-boolean-" + res.find('input').val());
			}

			if(_call === true) {
				validate();
			}
		};

		var refreshWindow = function() {
			$("#editor .f-skills input").resizable();
			$("#editor .f-project input").resizable();
			$("#editor .f-hackathon-awards #string input").resizable();
			$("#editor .f-hackathon-project-technologies input").resizable();
			$("#editor .f-education-areas input").resizable();

      try { $.configureWithColour(); } catch(err) {}

			$("#editor .f-skills #string input").blur(function() {
				if($(this).val() === "") {
					$(this).parent().remove();
					$("a#f-add-skill").removeClass('limited');
				}

				var _t;
				_t = $(this);

				$("#editor .f-skills #string input").each(function() {
					if($(this).attr('id') !== _t.attr('id') && $(this).val().toLowerCase() === _t.val().toLowerCase()) {
						_t.parent().remove();
						$("a#f-add-skill").removeClass('limited');
					}
				});
			});
		};

		refreshWindow();

		// Add skills
		$("a#f-add-skill").unbind().click(function(e) {
			e.preventDefault();
			var _elem, _id, _this;
			_id = 'skills_' + $(this).data('count');
			_elem = $("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _id, 'name': 'userData[skills][]' }).val(""))
      _this = $(this);

			$(this).data('count', parseInt($(this).data('count')) + 1);
			$("#editor .f-skills").append(_elem);
			refreshWindow();
			
			$(this).removeClass('limited');

			$("#editor .f-skills #string input").focus(function() {
				window.onEnterPress = function() { _this.click(); };
			}).blur(function() {
				window.onEnterPress = false;
			});

			$("#editor .f-skills #string:last-child input").focus();
		});

		// Add new education
		$("a#f-add-education").unbind().click(function(e) {
			e.preventDefault();

			var _elem, _id, _tmp, _tmp_id, _tmp_class, _tmp_name, _remove, _hierarchy;
			_id = $(this).data('count');
			_elem = $("<div>").addClass('f-hierarchy f-education f-education-' + _id).data('education-id', _id);
			_elem.append($("<div>").addClass('f-inline-bracket').text('{'));

			_tmp_class = 'f-education-institution';
			_tmp_id = 'education_'+_id+'_institution';
			_tmp_name = 'userData[education]['+_id+'][institution]';
			_tmp = $("<div>").addClass('f f-string f-required ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("institution"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_hierarchy = $("<div>").addClass('f-hierarchy');
			_hierarchy.append($("<label>").text("areas"));
			_hierarchy.append(" ");
			_hierarchy.append($("<div>").addClass('f-inline-bracket').text('['));
			_hierarchy.append(" ");
			_hierarchy.append($("<div>").addClass('f-array f-education-areas f-hackathon-'+_id+'-areas'));
			_hierarchy.append(" ");
			_hierarchy.append($("<div>").addClass('f-inline-bracket').text('], ').append($("<a>").attr({ 'href': '#', 'id': 'f-add-education-area', 'title': 'Add new study area' }).data('count', 0).text('+')));
			_elem.append(_hierarchy);

			_tmp_class = 'f-education-studytype';
			_tmp_id = 'education_'+_id+'_studytype';
			_tmp_name = 'userData[education]['+_id+'][studyType]';
			_tmp = $("<div>").addClass('f f-string ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("studyType"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = 'f-education-start';
			_tmp_id = 'education_'+_id+'_start';
			_tmp_name = 'userData[education]['+_id+'][start]';
			_tmp = $("<div>").addClass('f f-string f-yeardate f-required ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("start"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = 'f-education-end';
			_tmp_id = 'education_'+_id+'_end';
			_tmp_name = 'userData[education]['+_id+'][end]';
			_tmp = $("<div>").addClass('f f-string f-yeardate f-required ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("end"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_remove = $("<a>").attr({ 'href': '#', 'id': 'f-remove-education' }).data('education-id', _id).text("-")

			$(".f-educations .f-education > .f-inline-bracket.f-final-bracket:last-child").removeClass('f-final-bracket');
			_elem.append($("<div>").addClass('f-inline-bracket f-final-bracket').append(_remove))
			$(".f-educations").append(_elem);

			$(this).data('count', parseInt($(this).data('count')) + 1);
			$("#editor .f-educations").append(_elem);

			$("#editor a#f-remove-education").unbind('click').bind('click', function(e) { e.preventDefault(); $("#editor .f-educations .f-education.f-education-" + $(this).data('work-id')).remove(); });

			$(".f-projects .f-educations.f-education-"+_id+":first-child .f-string:first input").focus();

			refreshWindow();
			setupSystem();
			parseEducations();
		});

		// Add new hackathon
		$("a#f-add-hackathon").unbind().click(function(e) {
			e.preventDefault();
			var _elem, _id, _tmp, _tmp_class, _tmp_id, _tmp_class, _tmp_name, _hierarchy, _hierarchy_inner, _hierarchy_next, _remove;
			_id = parseInt($(this).data('count'));
			_elem = $("<div>").addClass('f-hierarchy f-hackathon f-hackathon-' + _id).data('hackathon-id', _id);
			_elem.append($("<div>").addClass('f-inline-bracket').text('{'));

			_tmp_class = "f-hackathon-"+_id+"-name";
			_tmp_id = "hackathon_"+_id+"_name";
			_tmp_name = "name";
			_tmp = $("<div>").addClass('f f-string f-required ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text(_tmp_name));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').append($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, name: 'userData[hackathons]['+_id+'][name]' }).resizable()));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = "f-hackathon-"+_id+"-season";
			_tmp_id = "hackathon_"+_id+"_season";
			_tmp_name = "season";
			_tmp = $("<div>").addClass('f f-string ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text(_tmp_name));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').append($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, name: 'userData[hackathons]['+_id+'][season]' }).resizable()));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = "f-hackathon-"+_id+"-year";
			_tmp_id = "hackathon_"+_id+"_year";
			_tmp_name = "year";
			_tmp = $("<div>").addClass('f f-string ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text(_tmp_name));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').append($("<input>").attr({ 'maxlength': 4, 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, name: 'userData[hackathons]['+_id+'][year]' }).resizable()));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_hierarchy = $("<div>").addClass('f-hierarchy');
			_hierarchy.append($("<label>").text("awards"));
			_hierarchy.append(" ");
			_hierarchy.append($("<div>").addClass('f-inline-bracket').text('['));
			_hierarchy.append(" ");
			_hierarchy.append($("<div>").addClass('f-array f-hackathon-awards f-hackathon-'+_id+'-awards'));
			_hierarchy.append(" ");
			_hierarchy.append($("<div>").addClass('f-inline-bracket').text('], ').append($("<a>").attr({ 'href': '#', 'id': 'f-add-hackathon-award', 'title': 'Add new hackathon award' }).data('count', 0).text('+')));
			_elem.append(_hierarchy);

			_hierarchy = $("<div>").addClass('f-hierarchy');
			_hierarchy.append($("<label>").text("project"));
			_hierarchy.append(" ");
			_hierarchy.append($("<div>").addClass('f-inline-bracket').text('{'));
			_hierarchy.append($("<div>").addClass('f-inline-bracket'));
			_hierarchy_inner = $("<div>").addClass('f-hackathon-project f-hackathon-'+_id+'-project');
			
			_tmp_class = "f-hackathon-"+_id+"-project-name";
			_tmp_id = "hackathon_"+_id+"_project_name";
			_tmp_name = "name";
			_tmp = $("<div>").addClass('f f-string f-required ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text(_tmp_name));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').append($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, name: 'userData[hackathons]['+_id+'][project][name]' }).resizable()));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_hierarchy_inner.append(_tmp);

			_tmp_class = "f-hackathon-"+_id+"-project-link";
			_tmp_id = "hackathon_"+_id+"_project_link";
			_tmp_name = "link";
			_tmp = $("<div>").addClass('f f-string f-link f-required ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text(_tmp_name));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').append($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, name: 'userData[hackathons]['+_id+'][project][link]' }).resizable()));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_hierarchy_inner.append(_tmp);

			_tmp_class = "f-hackathon-"+_id+"-project-image";
			_tmp_id = "hackathon_"+_id+"_project_image";
			_tmp_name = "image";
			_tmp = $("<div>").addClass('f f-string f-link ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text(_tmp_name));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').append($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, name: 'userData[hackathons]['+_id+'][project][image]' }).resizable()));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_hierarchy_inner.append(_tmp);

			_tmp_class = "f-hackathon-"+_id+"-project-description";
			_tmp_id = "hackathon_"+_id+"_project_description";
			_tmp_name = "description";
			_tmp = $("<div>").addClass('f f-string ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text(_tmp_name));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').append($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, name: 'userData[hackathons]['+_id+'][project][description]' }).resizable()));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_hierarchy_inner.append(_tmp);

			_hierarchy_next = $("<div>").addClass('f-hierarchy');
			_hierarchy_next.append($("<label>").text("technologies"));
			_hierarchy_next.append(" ");
			_hierarchy_next.append($("<div>").addClass('f-inline-bracket').text('['));
			_hierarchy_next.append(" ");
			_hierarchy_next.append($("<div>").addClass('f-array f-hackathon-project-technologies f-hackathon-'+_id+'-project-technologies'));
			_hierarchy_next.append(" ");
			_hierarchy_next.append($("<div>").addClass('f-inline-bracket').text('] ').append($("<a>").attr({ 'href': '#', 'id': 'f-add-hackathon-project-technologies', 'title': 'Add new hackathon award' }).data('count', 0).text('+')));
			_hierarchy_inner.append(_hierarchy_next);

			_hierarchy.append(_hierarchy_inner);
			_hierarchy.append($("<div>").addClass('f-inline-bracket').text('}'));
			_elem.append(_hierarchy);

			_remove = $("<a>").attr({ 'href': '#', 'id': 'f-remove-hackathon' }).data('hackathon-id', _id).text("-")
			_remove.bind('click', function(e) {
				e.preventDefault();
				$("#editor .f-hackathons .f-hackathon-" + $(this).data('hackathon-id')).remove();
			});

			$(".f-hackathons .f-hackathon > .f-inline-bracket.f-final-bracket:last-child").removeClass('f-final-bracket');

			_elem.append($("<div>").addClass('f-inline-bracket f-final-bracket').append(_remove))
			$(".f-hackathons").append(_elem);

			parseHackathons();
			refreshWindow();
			setupSystem();
			$(this).data('count', parseInt($(this).data('count')) + 1);
		});

		// Add new project
		$("a#f-add-project").unbind().click(function(e) {
			e.preventDefault();

			var _elem, _id, _tmp, _tmp_id, _tmp_class, _tmp_name;
			_id = $(this).data('count');
			_elem = $("<div>").addClass('f-hierarchy f-project f-project-' + _id).data('project-id', _id);
			_elem.append($("<div>").addClass('f-inline-bracket').text('{'));

			_tmp_class = 'f-project-name';
			_tmp_id = 'project_'+_id+'_name';
			_tmp_name = 'userData[projects]['+_id+'][name]';
			_tmp = $("<div>").addClass('f f-string f-required ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("name"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'maxlength': 50, 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = 'f-project-description';
			_tmp_id = 'project_'+_id+'_description';
			_tmp_name = 'userData[projects]['+_id+'][description]';
			_tmp = $("<div>").addClass('f f-string ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("description"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'maxlength': 250, 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = 'f-project-link';
			_tmp_id = 'project_'+_id+'_link';
			_tmp_name = 'userData[projects]['+_id+'][link]';
			_tmp = $("<div>").addClass('f f-string f-link f-required ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("link"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'maxlength': 140, 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = 'f-project-image';
			_tmp_id = 'project_'+_id+'_image';
			_tmp_name = 'userData[projects]['+_id+'][image]';
			_tmp = $("<div>").addClass('f f-string f-link f-last ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("image"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'maxlength': 100, 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_elem.append($("<div>").addClass('f-inline-bracket f-remove-bracket').append($("<a>").attr({ 'href': '#', 'id': 'f-remove-project' }).data('project-id', _id).text("-")))

			$(this).data('count', parseInt($(this).data('count')) + 1);
			$("#editor .f-projects").append(_elem);

			$("#editor a#f-remove-project").unbind('click').bind('click', function(e) { e.preventDefault(); $("#editor .f-projects .f-project.f-project-" + $(this).data('project-id')).remove(); });

			$(".f-projects .f-project.f-project-"+_id+":first-child .f-string:first input").focus();

			refreshWindow();
			setupSystem();
		});

		// Add new project
		$("a#f-add-work").unbind().click(function(e) {
			e.preventDefault();

			var _elem, _id, _tmp, _tmp_id, _tmp_class, _tmp_name, _remove;
			_id = $(this).data('count');
			_elem = $("<div>").addClass('f-hierarchy f-work f-work-' + _id).data('work-id', _id);
			_elem.append($("<div>").addClass('f-inline-bracket').text('{'));

			_tmp_class = 'f-work-company';
			_tmp_id = 'work_'+_id+'_company';
			_tmp_name = 'userData[work]['+_id+'][company]';
			_tmp = $("<div>").addClass('f f-string f-required ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("company"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = 'f-work-position';
			_tmp_id = 'work_'+_id+'_position';
			_tmp_name = 'userData[work]['+_id+'][position]';
			_tmp = $("<div>").addClass('f f-string f-required ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("position"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = 'f-work-start';
			_tmp_id = 'work_'+_id+'_start';
			_tmp_name = 'userData[work]['+_id+'][start]';
			_tmp = $("<div>").addClass('f f-string f-required f-monthyeardate ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("start"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'maxlength': 140, 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = 'f-work-end';
			_tmp_id = 'work_'+_id+'_end';
			_tmp_name = 'userData[work]['+_id+'][end]';
			_tmp = $("<div>").addClass('f f-string f-monthyeardate ' + _tmp_class).data('message', 'leave blank if current');
			_tmp.append($("<label>").attr('for', _tmp_id).text("end"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'maxlength': 140, 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_tmp_class = 'f-work-description';
			_tmp_id = 'work_'+_id+'_description';
			_tmp_name = 'userData[work]['+_id+'][description]';
			_tmp = $("<div>").addClass('f f-string ' + _tmp_class);
			_tmp.append($("<label>").attr('for', _tmp_id).text("description"));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'string').html($("<input>").attr({ 'type': 'text', 'placeholder': 'empty', 'id': _tmp_id, 'name': _tmp_name }).val("")));
			_tmp.append(" ");
			_tmp.append($("<div>").attr('id', 'comment'));
			_elem.append(_tmp);

			_remove = $("<a>").attr({ 'href': '#', 'id': 'f-remove-work' }).data('work-id', _id).text("-")
			_remove.bind('click', function(e) {
				e.preventDefault();
				$("#editor .f-works .f-work-" + $(this).data('work-id')).remove();
			});

			$(".f-works .f-work > .f-inline-bracket.f-final-bracket:last-child").removeClass('f-final-bracket');
			_elem.append($("<div>").addClass('f-inline-bracket f-final-bracket').append(_remove))
			$(".f-hackathons").append(_elem);

			$(this).data('count', parseInt($(this).data('count')) + 1);
			$("#editor .f-works").append(_elem);

			$("#editor a#f-remove-work").unbind('click').bind('click', function(e) { e.preventDefault(); $("#editor .f-works .f-work.f-work-" + $(this).data('work-id')).remove(); });

			$(".f-projects .f-works.f-work-"+_id+":first-child .f-string:first input").focus();

			refreshWindow();
			setupSystem();
		});

		$(document).keypress(function(e) {
			if(e.keyCode === 13) {
				if(typeof window.onEnterPress === "function") {
					e.preventDefault();
					window.onEnterPress();
				}
			}
		});

		var parseEducations = function() {
			$("#editor .f-educations .f-education").each(function() {
				var _id, _parent, _elem_id;
				_parent = $(this);
				_id = $(this).data('education-id');


				$(this).find('a#f-remove-education').unbind('click').bind('click', function(e) {
					e.preventDefault();
					$("#editor .f-educations .f-education-" + $(this).data('education-id')).remove();
				});

				$(this).find('a#f-add-education-area').unbind('click').bind('click', function(e) {
					e.preventDefault();
					var _elem, _input, _count;
					_elem = $("<div>").attr('id', 'string');
					_count = parseInt($(this).data('count'));
					_elem_id = 'education_'+_id+'_areas_'+_count;

					_input = $("<input />").attr({
						'type': 'text',
						'placeholder': 'empty',
						'id': _elem_id,
						'name': 'userData[education]['+_id+'][areas]['+_count+']'
					});

					_elem.append(_input);
					_parent.find('.f-education-areas').append(_elem);
          _parent.find('.f-education-areas input').configureForEducationArea();
          _parent.find('input').resizable();
          _parent.find('.f-education-areas #string:last-child input').focus();
					$(this).data('count', _count + 1);

          refreshWindow();
				});
			});
		};

		var parseHackathons = function() {
			$("#editor .f-hackathons .f-hackathon").each(function() {
				var _id, _parent, _elem_id;
				_parent = $(this);
				_id = $(this).data('hackathon-id');

				$(this).find('a#f-add-hackathon-award').unbind('click').bind('click', function(e) {
					e.preventDefault();
					var _elem, _input, _count;
					_elem = $("<div>").attr('id', 'string');
					_count = parseInt($(this).data('count'));
					_elem_id = 'hackathon_'+_id+'_awards_'+_count;

					_input = $("<input />").attr({
						'type': 'text',
						'placeholder': 'empty',
						'id': _elem_id,
						'name': 'userData[hackathons]['+_id+'][awards]['+_count+']'
					});

					_elem.append(_input);
					_parent.find('.f-hackathon-awards').append(_elem);
          _parent.find('.f-hackathon-awards #string input').configureForHackathonAwards();
          _parent.find('input').resizable();
          _parent.find('.f-hackathon-awards #string:last-child input').focus();
					$(this).data('count', _count + 1);

          refreshWindow();
				});
			
				$(this).find('a#f-add-hackathon-project-technologies').unbind('click').bind('click', function(e) {
					e.preventDefault();
					var _elem, _input, _count, _elem_id;
					_elem = $("<div>").attr('id', 'string');
					_count = parseInt($(this).data('count'));
					_elem_id = 'hackathon_'+_id+'_project_technologies_'+_count;

					_input = $("<input />").attr({
						'type': 'text',
						'placeholder': 'empty',
						'id': _elem_id,
						'name': 'userData[hackathons]['+_id+'][project][technologies]['+_count+']'
					});

					_elem.append(_input);
					_parent.find('.f-hackathon-project-technologies').append(_elem);
          _parent.find('.f-hackathon-project-technologies #string input').configureForHackathonProjectTechnologies();
					_parent.find('.f-hackathon-project-technologies #string:last-child input').focus();
					$(this).data('count', parseInt($(this).data('count')) + 1);

          refreshWindow();
				});
			});
		};

    window.colorSettings = {};
    window.colorSettings.getSelectedColour = function() {
      var _default = "#DE1673";
      window.selectedColour = _default;
      var colours = [];

      $("#buttons ul li a.set-colour").each(function(e) {
        colours.push($(this).data('colour'));
      });

      chrome.storage.sync.get("userColour", function(response) {
        if(typeof response.userColour === "string") {
          window.selectedColour = response.userColour;
        }

        var index = colours.indexOf(selectedColour);
        $("#buttons ul li a.set-colour").removeClass('selected');
        $("#buttons ul li a.set-colour:eq("+index+")").addClass('selected');
        $.configureWithColour(selectedColour);
      });
    };

    $.fn.saveAsColour = function() {
      chrome.storage.sync.set({ "userColour": $(this).data('colour') });
      $("#buttons ul li a.set-colour").removeClass('selected');
      $(this).addClass('selected');
      $.configureWithColour($(this).data('colour'));
    };

    $.configureWithColour = function(colour) {
    	chrome.storage.sync.get("userColour", function (response) {
    		var userColour = response.userColour || "#DE1673";
    		console.log(userColour);

	      $("#user #signedin span p a").css("background", userColour);
	      $(".hackone-editor #madeby").css("background", userColour);
	      $(".hackone-editor #editor-layout h3 span#username").css("color", userColour);
	      $(".hackone-editor #editor .f-inline-bracket a").css("background", userColour);
	      $(".hackone-editor #editor #string").css("color", userColour);
	      $(".hackone-editor #editor #string").css("color", userColour);
	      $(".hackone-editor #editor #string input").css("color", userColour);
	      $(".hackone-editor #editor #string input:not([readonly]):not(:focus):hover").css("color", userColour);
	      $(".hackone-editor #editor #submit").css({ "background": userColour, "border-bottom": userColour });
	    });
    };

    var loadSavedDetails = function() {
      chrome.storage.sync.get("userData", function(response) {
        if(typeof response.userData === "undefined" || response.userData === null) {
          return;
        }

        window.userData = response.userData;
        var data = { userData: response.userData };
        var parameters_array = jQuery.param(data).split("&").map(function(kv) { return kv.split("=").map(function(e) { return decodeURIComponent(e).replace(/\+/g, ' '); }); });

        var n, n2;

        // education
        for(n = 0; n < (window.userData.education || []).length; n++) {
          $("a#f-add-education").click();

          for(n2 = 0; n2 < (window.userData.education[n].areas || []).length; n2++) {
            $(".f-educations .f-education:last-child a#f-add-education-area").click();
            $(".f-educations .f-education:last-child .f-education-areas input:eq("+n2+")").val(window.userData.education[n].areas[n2]).resizable().keydown().blur();
          }
        }

        // work
        for(n = 0; n < (window.userData.work || []).length; n++) { $("a#f-add-work").click(); }
        
        // hackathons
        for(n = 0; n < (window.userData.hackathons || []).length; n++) {
          $("a#f-add-hackathon").click();

          for(n2 = 0; n2 < (window.userData.hackathons[n].awards || []).length; n2++) {
            $(".f-hackathons .f-hackathon:last-child a#f-add-hackathon-award").click();
            $(".f-hackathons .f-hackathon:last-child .f-hackathon-awards input:eq("+n2+")").val(window.userData.hackathons[n].awards[n2]).resizable().keydown().blur();
          }

          for(n2 = 0; n2 < (window.userData.hackathons[n].project.technologies || []).length; n2++) {
            $(".f-hackathons .f-hackathon:last-child a#f-add-hackathon-project-technologies").click();
            $(".f-hackathons .f-hackathon:last-child .f-hackathon-project-technologies input:eq("+n2+")").val(window.userData.hackathons[n].project.technologies[n2]).resizable().keydown().blur();
          }
        }

        // projects
        for(n = 0; n < (window.userData.projects || []).length; n++) { $("a#f-add-project").click(); }
        
        // skills
        for(n = 0; n < (window.userData.skills || []).length; n++) {
          $("a#f-add-skill").click();
          $(".f-skills input:last").val(window.userData.skills[n]).resizable().keydown().blur();
        }

        var duplicates = [];

        for(var i = 0; i < parameters_array.length; i++) {
          var k = parameters_array[i][0];
          var v = parameters_array[i][1];

          var occurrences = 0;
          for(var ocr = 0; ocr < duplicates.length; ocr++) { if(duplicates[ocr] === k) { ++occurrences; } }
          $("#editor input[name=\""+k+"\"]:eq("+(occurrences || 0)+")").val(v).resizable().keydown().blur();

          // console.log(k, v, occurrences, "#editor input[name=\""+k+"\"]:eq("+(occurrences || 0)+")");
          duplicates.push(k);
        }

        validate();
        $.scrollToTop();
      });
    };

		var setupSystem = function() {
			$('.f-hackathons .f-hackathon .f-hackathon-project-technologies input').configureForHackathonProjectTechnologies();
			$('.f-hackathons .f-hackathon .f-hackathon-awards input').configureForHackathonAwards();
			$('.f-educations .f-education .f-education-areas input').configureForEducationArea();

			$('.f-hackathons .f-hackathon a#f-remove-hackathon').bind('click', function(e) {
				e.preventDefault();
				$("#editor .f-hackathons .f-hackathon-" + $(this).data('hackathon-id')).remove();
			});

      window.colorSettings.getSelectedColour();

      $("#buttons ul li a.set-colour").unbind().click(function(e) {
        e.preventDefault();
        $(this).saveAsColour();
      });

      $("#editor-layout ul li a.download-json").unbind().bind('click', function(e) {
        e.preventDefault();

        var json_string = JSON.stringify(window.userData);
        var url = "data:application/octet-stream;base64," + btoa(json_string);
        window.open(url);
      });

			$("#editor a#f-remove-work").unbind().bind('click', function(e) {
				e.preventDefault();
				$("#editor .f-works .f-work.f-work-" + $(this).data('work-id')).remove();
			});

			$("#editor a#f-remove-project").unbind().bind('click', function(e) {
				e.preventDefault();
				$("#editor .f-projects .f-project.f-project-" + $(this).data('project-id')).remove();
			});

			$("#editor .f").each(function() {
				var t;

				t = $(this);
				customCallback(t, false); // first run

				// callbacks
				if(t.hasClass('f-string')) { t.find('input').unbind().bind('keyup keydown', function() { return customCallback(t, true); }); return; }
				if(t.hasClass('f-boolean')) {
					t.find('input').unbind().bind('keypress click', function(e) {
						if(e.keyCode === 116) { t.find('input').val("true").removeClass('f-boolean-false').addClass('f-boolean-true'); } // true
						else if(e.keyCode === 102) { t.find('input').val("false").removeClass('f-boolean-true').addClass('f-boolean-false'); } // false
						else {
							var _val, _new_val;
							_val = t.find('input').val();
							_new_val = (_val === "true") ? "false" : "true";
							t.find('input').val(_new_val).removeClass('f-boolean-false f-boolean true').addClass('f-boolean-' + _new_val);
						}

						return customCallback(t, true);
					});

					t.find('input').unbind('focus blur').focus(function() {
						window.onEnterPress = function() {
							var _val, _new_val;
							_val = t.find('input').val();
							_new_val = (_val === "true") ? "false" : "true";
							t.find('input').val(_new_val).removeClass('f-boolean-false f-boolean true').addClass('f-boolean-' + _new_val);
						};
					}).blur(function() {
						window.onEnterPress = false;
					});

					return;
				}
			});

			validate();

			$("#editor .f-skills #string input").unbind('focus blur').focus(function() {
				window.onEnterPress = function() { $("a#f-add-skill").click(); };
			}).blur(function() {
				window.onEnterPress = false;
			});

			parseHackathons();
			parseEducations();

			$("#error-validations, #error, #success").unbind().click(function() {
				$(this).stop().slideUp(500);
			});

			// setInterval(function() {
				/* We automatically save every 30 seconds. */
				// disabled
				// $("#editor").data('silent', 'true').submit();
			// }, 30000);

			$("#editor").unbind('submit').bind('submit', function(e) {
				e.preventDefault();

				if($(".f.f-error").length > 0) {
					$("#error-validations").stop().slideDown(500).delay(3000).slideUp(500);
					$(".f.f-error:first-child input").focus();
					return;
				}

        $(this).find('#lastUpdated').val(new Date()).resizable().keydown().blur();

        // Save
        var data = $(this).serializeObject();

        data.userData.username = data.userData.username.toLowerCase();
        data.userData.shirtSize = data.userData.shirtSize.toUpperCase();
        data.userData.bio.email = data.userData.bio.email.toLowerCase();
        data.userData.bio.gender = data.userData.bio.gender.toLowerCase();
        data.userData.bio.location.countryCode = data.userData.bio.location.countryCode.toUpperCase();

        // for(key in data.userData.bio.websites) {
        //   data.userData.bio.websites[key] = data.userData.bio.websites[key].toLowerCase();
        // }

        data.userData.education = data.userData.education || [];
        data.userData.work = data.userData.work || [];
        data.userData.hackathons = data.userData.hackathons || [];
        data.userData.projects = data.userData.projects || [];
        data.userData.skills = data.userData.skills || [];

        var n, n2, x;

        // properly cleanse and format education
        for(n = 0; n < data.userData.education.length; n++) {
          data.userData.education[n].areas = data.userData.education[n].areas || [];

          x = [];
          for(n2 = 0; n2 < data.userData.education[n].areas.length; n2++) {
            if([null, false, true, undefined, ""].indexOf(data.userData.education[n].areas[n2]) === -1) { x.push(data.userData.education[n].areas[n2]); }
          }

          data.userData.education[n].institution = data.userData.education[n].institution || "";
          data.userData.education[n].areas = x;
          data.userData.education[n].studyType = data.userData.education[n].studyType || "";
          data.userData.education[n].start = data.userData.education[n].start || 0;
          data.userData.education[n].end = data.userData.education[n].end || 0;
        }

        // properly cleanse hackathons
        for(n = 0; n < data.userData.hackathons.length; n++) {
          data.userData.hackathons[n].awards = data.userData.hackathons[n].awards || [];
          data.userData.hackathons[n].project.technologies = data.userData.hackathons[n].project.technologies || [];
          
          x = [];
          for(n2 = 0; n2 < data.userData.hackathons[n].awards.length; n2++) {
            if([null, false, true, undefined, ""].indexOf(data.userData.hackathons[n].awards[n2]) === -1) { x.push(data.userData.hackathons[n].awards[n2]); }
          }

          data.userData.hackathons[n].name = data.userData.hackathons[n].name || "";
          data.userData.hackathons[n].season = data.userData.hackathons[n].season || "";
          data.userData.hackathons[n].year = data.userData.hackathons[n].year || "";
          data.userData.hackathons[n].awards = x;
          data.userData.hackathons[n].project.name = data.userData.hackathons[n].project.name || "";
          data.userData.hackathons[n].project.link = data.userData.hackathons[n].project.link || "";
          data.userData.hackathons[n].project.image = data.userData.hackathons[n].project.image || "";
          data.userData.hackathons[n].project.description = data.userData.hackathons[n].project.description || "";

          x = [];
          for(n2 = 0; n2 < data.userData.hackathons[n].project.technologies.length; n2++) {
            if([null, false, true, undefined, ""].indexOf(data.userData.hackathons[n].project.technologies[n2]) === -1) { x.push(data.userData.hackathons[n].project.technologies[n2]); }
          }

          data.userData.hackathons[n].project.technologies = x;
        }

        // properly cleanse skills
        x = [];
        data.userData.skills = data.userData.skills || [];
        for(n = 0; n < data.userData.skills.length; n++) {
          if([null, false, true, undefined, ""].indexOf(data.userData.skills[n]) === -1) { x.push(data.userData.skills[n]); }
        }

        data.userData.skills = x;

        window.userData = data.userData;
        chrome.storage.sync.set(data, function() {
					$("#lastUpdated").parent().parent().addClass('animated pulse');
					$("#success").stop().slideDown(500).delay(3000).slideUp(500);

					setTimeout(function() {
						$("#lastUpdated").parent().parent().removeClass('animated pulse');
					}, 1000);
				});
			});
		};

		setupSystem();
    loadSavedDetails();

    $("#version").text("v" + chrome.runtime.getManifest().version);

		$("[data-confirm]").click(function(e) {
			e.preventDefault();

      if(confirm($(this).data('confirm'))) {
  			chrome.storage.sync.set({ userData: undefined }, function() { window.location.reload(); });
      }
		});
	}
});