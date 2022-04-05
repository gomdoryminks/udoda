(function ($) {

    'use strict';
	
    // ------------------------------------------------------- //
    // Datepicker
    // ------------------------------------------------------ //	
	$(function () {
        //언어를 한국어로 설정
        moment.locale('ko');
        
		//default date range picker
		$('#daterange').daterangepicker({
			autoApply:true, //true일 경우 두 날짜 선택시 바로 적용됨, false일 경우 두 날짜 선택 후 적용버튼을 눌러야 적용됨
            linkedCalendars: false, //true일 경우 달 변경시 두 날짜가 한달 차이를 기준으로 동시에 변경됨, false일 경우 달 변경시 두 날짜가 각각 변경됨
            showDropdowns: true, //true일 경우 년과 달을 셀렉트박스로 선택함, false일 경우 년과 달이 텍스트로 출력됨
            locale: {
				format: 'YYYY-MM-DD HH:mm:ss' //입력박스에 날짜를 출력할 포맷
			}
		});

		//date time picker
		$('#datetime').daterangepicker({
			timePicker: true, //true일 경우 시간 선택 포맷이 출력됨, false일 경우 시간 선택 포맷이 출력안됨
            timePicker24Hour: true, //true일 경우 시간이 24시간으로 출력됨, false일 경우 시간이 12시간으로 출력됨
            timePickerSeconds: true, //true일 경우 초 선택 포맷이 출력됨, false일 경우 초 선택 포맷이 출력안됨
			timePickerIncrement: 1, //분 선택에 설정한 단위로 출력됨 (ex: 10으로 설정할 경우 10분 단위로 출력됨)
            linkedCalendars: false, //true일 경우 달 변경시 두 날짜가 한달 차이를 기준으로 동시에 변경됨, false일 경우 달 변경시 두 날짜가 각각 변경됨
            showDropdowns: true, //true일 경우 년과 달을 셀렉트박스로 선택함, false일 경우 년과 달이 텍스트로 출력됨
			locale: {
				format: 'YYYY-MM-DD HH:mm:ss' //입력박스에 날짜를 출력할 포맷
			}
		});

		//single date
		$('#date').daterangepicker({
			singleDatePicker: true, //true일 경우 한개의 날짜만 선택함, false일 경우 두개의 날짜를 선택함
            showDropdowns: true, //true일 경우 년과 달을 셀렉트박스로 선택함, false일 경우 년과 달이 텍스트로 출력됨
            locale: {
				format: 'YYYY-MM-DD HH:mm:ss' //입력박스에 날짜를 출력할 포맷
			}
		});
        
        $("#searchstartdate").daterangepicker({
			singleDatePicker: true, //true일 경우 한개의 날짜만 선택함, false일 경우 두개의 날짜를 선택함
            showDropdowns: true, //true일 경우 년과 달을 셀렉트박스로 선택함, false일 경우 년과 달이 텍스트로 출력됨
            locale: {
				format: 'YYYY-MM-DD' //입력박스에 날짜를 출력할 포맷
			}
		});
        
        $("#searchenddate").daterangepicker({
			singleDatePicker: true, //true일 경우 한개의 날짜만 선택함, false일 경우 두개의 날짜를 선택함
            showDropdowns: true, //true일 경우 년과 달을 셀렉트박스로 선택함, false일 경우 년과 달이 텍스트로 출력됨
            locale: {
				format: 'YYYY-MM-DD' //입력박스에 날짜를 출력할 포맷
			}
		});
	});
	
})(jQuery);