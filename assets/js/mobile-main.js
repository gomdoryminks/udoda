//3차 수정 부분 START
//정규식 체크
var globalIdExp = RegExp(/^[A-Za-z0-9_\-]{6,12}$/);
var globalPwExp = RegExp(/^[A-Za-z0-9_\-]{8,16}$/);
var globalEmailExp = RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i);
//3차 수정 부분 END

$(function() {
    //2차 수정 부분 START
    var userAgent = navigator.userAgent.toLowerCase();
    
    //ios(아이폰, 아이패드, 아이팟) 전용 css 적용
    if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1 || userAgent.indexOf("ipod") > -1) {
        var cssIosLink = document.createElement("link");
        
        cssIosLink.href = "assets/css/mobile-main-ios.css";
        cssIosLink.async = false;
        cssIosLink.rel = "stylesheet";
        cssIosLink.type = "text/css";
        
        document.head.appendChild(cssIosLink);
    }
    //2차 수정 부분 END
    
    //모바일 100vh 문제 해결방법
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
    
    //슬라이드 메뉴 보이기/숨기기
    $(".header .header-menu .menu-btn").click(function() {
        $(this).next(".menu-area").addClass("on");
    });
    
    $(".header .header-menu .menu-area .menu-box .menu-box-btn").click(function() {
        $(this).closest(".menu-area").removeClass("on");
    });
    
    //메인 카테고리 변경
    $(".c-main input[type='radio'][id^='main_category_']").click(function() {
        //6차 수정 부분 START
        var mainCategoryVal = $(this).val();
        
        if (mainCategoryVal == "bus") {
            removeMarker();
            removePolyline();
            removeClusterer();
            routeMarker();
        } else if (mainCategoryVal == "sidecar" || mainCategoryVal == "alpha" || mainCategoryVal == "twizy" || mainCategoryVal == "electricbike"|| mainCategoryVal == "electricbicycle") {
            removeMarker();
            removePolyline();
            removeClusterer();
            mobilityMarker();
        } else if (mainCategoryVal == "concentration") {
            removeMarker();
            removePolyline();
            removeClusterer();
            concentrationMarker();
        }
        //6차 수정 부분 END
    });
    
    //리스트 맵 보이기/숨기기
    $(".c-list .list-category-btn .list-btn").click(function() {
        if ($(this).parent(".list-category-btn").hasClass("on")) {
            $(this).parent(".list-category-btn").removeClass("on");
        } else {
            $(this).parent(".list-category-btn").addClass("on");
        }
    });
    
    //리스트 카테고리 변경
    $(".c-list .list-category>li input[type='radio'][id^='list_category_']").click(function() {
        if ($(".c-list .list-category-btn").length > 0) {
            $(".c-list .list-category-btn").addClass("on");
        }
        
        //6차 수정 부분 START
        var listCategoryVal = $(this).val();
        
        removeMarker();
        removePolyline();
        removeClusterer();
        listMarker(listCategoryVal);
        //6차 수정 부분 END
    });
    
    //상세 옵션창 보이기/숨기기
    $(".c-detail .detail-option-area .detail-option-btn").click(function() {
        if ($(this).parent(".detail-option-area").hasClass("on")) {
            $(this).parent(".detail-option-area").removeClass("on");
        } else {
            $(this).parent(".detail-option-area").addClass("on");
        }
    });
    
    //상세 상품문의 답변 보이기/숨기기
    $(".c-detail .inquiry-info .inquiry-info-list dt").click(function() {
        if ($(this).next("dd").hasClass("on")) {
            $(this).next("dd").removeClass("on");
        } else {
            $(this).next("dd").addClass("on");
        }
    });
    
    //문의 유형 변경
    $(".c-inquiry .inquiry-area .inquiry-category>li input[type='radio'][id^=inquiry_category_]").click(function() {
        
    });
    
    //매거진 맵 보이기/숨기기
    $(".c-magazine .magazine-topbar-btn .magazine-btn").click(function() {
        if ($(this).parent(".magazine-topbar-btn").hasClass("on")) {
            $(this).parent(".magazine-topbar-btn").removeClass("on");
        } else {
            $(this).parent(".magazine-topbar-btn").addClass("on");
        }
    });
    
    //리뷰 이미지 선택
	$(".review-img-input .review-img-btn input[type='file']").change(function() {
		var obj = $(this);
		
		if (this.files && this.files[0]) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
                $(obj).parent(".review-img-btn").prev(".review-img-preview").children("img").attr("src",e.target.result);
	        }
	        reader.readAsDataURL(this.files[0]);
	    }
	});
    
    //swiper 이미지 슬라이드 (list-slide)
    if ($(".list-slide").length > 0) {
        var listSwiper = new Swiper('.list-slide', {
            observer: true,
            observeParents: true,
            spaceBetween: 10,
            slidesPerView: 'auto',
            mousewheelControl: true,
            watchOverflow: true
        });
    }
    
    //swiper 이미지 슬라이드 (gallery-slide + thumbnail-slide)
    if ($(".gallery-slide").length > 0 && $(".thumbnail-slide").length > 0) {
        var thumbnailSwiper = new Swiper('.thumbnail-slide', {
            spaceBetween: 5,
            slidesPerView: 5,
            autoHeight : true,
            freeMode: true,
            watchSlidesProgress: true
        });
        
        var gallerySwiper = new Swiper('.gallery-slide', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            autoHeight : true,
            pagination: {
                el: '.gallery-slide-pagination',
                clickable: true,
            },
            thumbs: {
                swiper: thumbnailSwiper,
            },
            watchOverflow: true
        });
    }
    
    //swiper 이미지 슬라이드 (detail-attraction-slide)
    if ($(".detail-attraction-slide").length > 0) {
        var listSwiper = new Swiper('.detail-attraction-slide', {
            observer: true,
            observeParents: true,
            spaceBetween: 10,
            slidesPerView: 'auto',
            mousewheelControl: true,
            watchOverflow: true
        });
    }
    
    //swiper 이미지 슬라이드 (detail-restaurant-slide)
    if ($(".detail-restaurant-slide").length > 0) {
        var listSwiper = new Swiper('.detail-restaurant-slide', {
            observer: true,
            observeParents: true,
            spaceBetween: 10,
            slidesPerView: 'auto',
            mousewheelControl: true,
            watchOverflow: true
        });
    }
    
    //swiper 이미지 슬라이드 (detail-cafe-slide)
    if ($(".detail-cafe-slide").length > 0) {
        var listSwiper = new Swiper('.detail-cafe-slide', {
            observer: true,
            observeParents: true,
            spaceBetween: 10,
            slidesPerView: 'auto',
            mousewheelControl: true,
            watchOverflow: true
        });
    }
    
    //2차 수정 부분 START
    //레이어 팝업(전체창)에서 뒤로가기시 창닫기
    $(document).on("click", ".layer-open-btn", function() {
        window.history.pushState({}, "", window.location.href);
    }).on("click", ".layer-all-wrap .layer-box .layer-close-btn", function() {
        window.history.back();
    });
    
    window.onpopstate = history.onpushstate = function(e) {
        if (window.location.href.split('/').pop().indexOf("modal") === -1) {
            //뒤로가기
            $(".layer-wrap .layer-hidden-btn").trigger("click");
        }
    }
    
    //문의 유형 변경 (레이어 팝업)
    $(".layer-wrap .layer-inquiry-item .layer-inquiry-category>li input[type='radio'][id^=inquiry_category_]").click(function() {
        
    });
    
    //여행카트 맵 보이기/숨기기
    $(".c-tourcart .tourcart-topbar-btn .tourcart-btn").click(function() {
        if ($(this).parent(".tourcart-topbar-btn").hasClass("on")) {
            $(this).parent(".tourcart-topbar-btn").removeClass("on");
        } else {
            $(this).parent(".tourcart-topbar-btn").addClass("on");
        }
    });
    
    //여행카트 항목 선택/선택안함
    $(".c-tourcart .tourcart-area .tourcart-list>li").click(function(e) {
        if ($(e.target)[0].nodeName.toLowerCase() != "img") {
            //6차 수정 부분 START
            var dataCartIdx = $(this).attr("data-cart-idx");
            
            if ($(this).hasClass("on")) {
                $(this).removeClass("on");
                
                markerPositionClear("cart",dataCartIdx);
            } else {
                $(".c-tourcart .tourcart-area .tourcart-list>li").removeClass("on");
                $(this).addClass("on");
                
                markerPosition("cart",dataCartIdx);
            }
            //6차 수정 부분 END
        }
    });
    
    //구매카트 맵 보이기/숨기기
    $(".c-buycart .buycart-topbar-btn .buycart-btn").click(function() {
        if ($(this).parent(".buycart-topbar-btn").hasClass("on")) {
            $(this).parent(".buycart-topbar-btn").removeClass("on");
        } else {
            $(this).parent(".buycart-topbar-btn").addClass("on");
        }
    });
    //2차 수정 부분 END
    
    //3차 수정 부분 START
    //숫자만 입력
    $("input[type='tel'], input[type='number']").on("keyup", function() {
        $(this).val($(this).val().replace(/[^0-9]/g, ""));
    });
    
    //약관동의 체크 선택&해제
    $("input[type='checkbox'][name^='join_agreement']").change(function() {
        var agreementName = $(this).attr("name");

        if (agreementName == "join_agreement_all") {
            if ($(this).prop("checked") !== false) {
                $("input[type='checkbox'][name^='join_agreement']").each(function() {
                    $(this).prop("checked", true);
                });
            } else {
                $("input[type='checkbox'][name^='join_agreement']").each(function() {
                    $(this).prop("checked", false);
                });
            }
        } else {
            if ($(this).prop("checked") !== false) {
                var allChkFlag = true;

                $("input[type='checkbox'][name^='join_agreement']:not(input[type='checkbox'][name='join_agreement_all'])").each(function() {
                    if ($(this).prop("checked") === false) {
                        allChkFlag = false;
                    }
                });

                if (allChkFlag == true) {
                    $("input[type='checkbox'][name='join_agreement_all']").prop("checked", true);
                } else {
                    $("input[type='checkbox'][name='join_agreement_all']").prop("checked", false);
                }
            } else {
                $("input[type='checkbox'][name='join_agreement_all']").prop("checked", false);
            }
        }
    });
    //3차 수정 부분 END
    
    //4차 수정 부분 START
    //고객센터 카테고리 변경
    $(".c-faq .faq-area .faq-category li input[type='radio'][id^=faq_category_]").click(function() {
        
    });
    //4차 수정 부분 END
    
    //5차 수정 부분 START
    //주문내역 취소할 상품 체크 선택&해제
    $("input[type='checkbox'][id^='order_info_']").change(function() {
        var orderInfoId = $(this).attr("id");

        if (orderInfoId == "order_info_all") {
            if ($(this).prop("checked") !== false) {
                $("input[type='checkbox'][id^='order_info_']").not(":disabled").each(function() {
                    $(this).prop("checked", true);
                });
            } else {
                $("input[type='checkbox'][id^='order_info_']").not(":disabled").each(function() {
                    $(this).prop("checked", false);
                });
            }
        } else {
            if ($(this).prop("checked") !== false) {
                var allChkFlag = true;

                $("input[type='checkbox'][id^='order_info_']:not(input[type='checkbox'][id='order_info_all'])").each(function() {
                    if ($(this).prop("disabled") == false && $(this).prop("checked") === false) {
                        allChkFlag = false;
                    }
                });

                if (allChkFlag == true) {
                    $("input[type='checkbox'][id='order_info_all']").prop("checked", true);
                } else {
                    $("input[type='checkbox'][id='order_info_all']").prop("checked", false);
                }
            } else {
                $("input[type='checkbox'][id='order_info_all']").prop("checked", false);
            }
        }
    });
    
    //프로필 이미지 선택
	$(".c-profile .profile-area .profile-modify-area .profile-modify-img input[type='file']").change(function() {
		var obj = $(this);
		
		if (this.files && this.files[0]) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
                $(obj).next("label").children("img").attr("src",e.target.result);
	        }
	        reader.readAsDataURL(this.files[0]);
	    }
	});
    //5차 수정 부분 END
    
    //6차 수정 부분 START
    //여행카트에 리스트가 있을 경우
    if ($(".c-tourcart .tourcart-area .tourcart-list>li").length > 0) {
        removeMarker();
        removePolyline();
        removeClusterer();
        cartMarker("tourcart");
    }
    
    //구매카트에 리스트가 있을 경우
    if ($(".c-buycart .buycart-area .buycart-goods-area .buycart-goods-info .goods-info-list>li").length > 0) {
        removeMarker();
        removePolyline();
        removeClusterer();
        cartMarker("buycart");
    }
    
    //명칭, 주소 검색결과에 리스트가 있을 경우
    if ($(".c-search .search-area .search-result-area .search-map-area .search-map-select .search-map-list>li").length > 0) {
        removeMarker();
        removePolyline();
        removeClusterer();
        searchMarker();
    }
    //6차 수정 부분 END
    
    //검색결과 항목 선택/선택안함
    $(".c-search .search-area .search-map-list>li").click(function(e) {
        var dataSearchIdx = $(this).attr("data-search-idx");

        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
            
            if ($(".c-search .search-area .search-map-add #search-address").length > 0) {
                $(".c-search .search-area .search-map-add #search-address").val("");
            }

            markerPositionClear("search",dataSearchIdx);
        } else {
            $(".c-search .search-area .search-map-list>li").removeClass("on");
            $(this).addClass("on");
            
            if ($(".c-search .search-area .search-map-add #search-address").length > 0) {
                var selectSearchAddr = $(this).find(".addr").text();
                
                $(".c-search .search-area .search-map-add #search-address").val(selectSearchAddr);
            }

            markerPosition("search",dataSearchIdx);
        }
    });
    
    //지도 아이콘버튼 보이기/숨기기
    $(".map-iconbtn-area .map-iconbtn").click(function() {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        } else {
            $(this).addClass("on");
        }
    });
    
    //초기화
    //페이지 탭 변경
    if ($(".c-tab .c-tab-item").length > 0) {
        $(".c-tab .c-tab-item:first-child>a").trigger("click");
    }
    
    //메인 카테고리 변경
    if ($(".c-main .main-category>li").length > 0) {
        $(".c-main .main-category>li:first-child input[type='radio'][id^='main_category_']").trigger("click");
    } else if ($(".c-main .main-concentration").length > 0) {
        $(".c-main .main-concentration input[type='radio'][id^='main_category_']").trigger("click");
    }
    
    //리스트 카테고리 변경
    if ($(".c-list .list-category>li").length > 0) {
        $(".c-list .list-category>li:first-child input[type='radio'][id^='list_category_']").trigger("click");
    }
    
    //리스트 정렬
    if ($(".c-list .list-category-info .list-info-area .list-order>li").length > 0) {
        setListOrder($(".c-list .list-category-info .list-info-area .list-order>li:first-child>a"));
    }
    
    //소셜리뷰 정렬
    if ($(".c-detail #c-tab-socialreview .review-order>li").length > 0) {
        setSocialReviewOrder($(".c-detail #c-tab-socialreview .review-order>li:first-child>a"));
    }
    
    //사용자리뷰 정렬
    if ($(".c-detail #c-tab-userreview .review-order>li").length > 0) {
        setUserReviewOrder($(".c-detail #c-tab-userreview .review-order>li:first-child>a"));
    }
    
    //문의 유형 변경
    if ($(".c-inquiry .inquiry-area .inquiry-category>li").length > 0) {
        $(".c-inquiry .inquiry-area .inquiry-category>li:first-child input[type='radio'][id^=inquiry_category_]").trigger("click");
    }
    
    //2차 수정 부분 START
    //문의 유형 변경 (레이어 팝업)
    if ($(".layer-wrap .layer-inquiry-item .layer-inquiry-category>li").length > 0) {
        $(".layer-wrap .layer-inquiry-item .layer-inquiry-category>li:first-child input[type='radio'][id^=inquiry_category_]").trigger("click");
    }
    //2차 수정 부분 END
    
    //4차 수정 부분 START
    //고객센터 카테고리 변경
    if ($(".c-faq .faq-area .faq-category li").length > 0) {
        $(".c-faq .faq-area .faq-category li:first-child input[type='radio'][id^=faq_category_]").trigger("click");
    }
    //4차 수정 부분 END
});

//페이지 탭 변경
function setContentTab(obj) {
    var dataTab = $(obj).attr("data-tab");
    
    $(".c-tab .c-tab-item").removeClass("on");
    $(obj).parent(".c-tab-item").addClass("on");
    
    if ($(".c-tab-info").length > 0) {
        $(".c-tab-info").removeClass("on");
        $(".c-tab-info#c-tab-" + dataTab).addClass("on");
    }
}

//수량 변경
function setContentEa(obj, move) {
    var ea = parseInt($(obj).siblings(".c-ea-input").val());
    ea = (isNaN(ea)) ? 1 : ea;
    
    if (move == '-') {
        if (ea > 1) {
            ea--;
        }
    } else if (move == '+') {
        ea++;
    }
    
    $(obj).siblings(".c-ea-input").val(ea);
}

//리스트 정렬
function setListOrder(obj) {
    var dataListOrder = $(obj).attr("data-list-order");
    
    $(".c-list .list-category-info .list-info-area .list-order>li").removeClass("on");
    $(obj).parent("li").addClass("on");
}

//소셜리뷰 정렬
function setSocialReviewOrder(obj) {
    var dataReviewOrder = $(obj).attr("data-review-order");
    
    $(".c-detail #c-tab-socialreview .review-order>li").removeClass("on");
    $(obj).parent("li").addClass("on");
}

//사용자리뷰 정렬
function setUserReviewOrder(obj) {
    var dataReviewOrder = $(obj).attr("data-review-order");
    
    $(".c-detail #c-tab-userreview .review-order>li").removeClass("on");
    $(obj).parent("li").addClass("on");
}

//리뷰 별점주기
function setReviewStar(num) {
    $(".review-star-input .review-star-item").each(function() {
        if ($(this).index() < num) {
            $(this).attr("src","assets/img/icon_rate.png");
        } else {
            $(this).attr("src","assets/img/icon_rate_off.png");
        }
    });
    
    if ($("input#review_star_cnt").length > 0) {
        $("input#review_star_cnt").val(num);
    }
}

//레이어 팝업 열기
function openLayer(type, msg, fun) {
    $("#" + type + "-layer .layer-box .layer-content .layer-content-txt").html(msg);
    
    $("#" + type + "-layer .layer-box .layer-btn-area .confirm-btn").removeAttr("onclick");
    $("#" + type + "-layer .layer-box .layer-btn-area .confirm-btn").attr("onclick","closeLayer(this);" + fun);
    
    $("#" + type + "-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//사용자리뷰 작성 레이어 팝업 열기
function openReviewAddLayer() {
    $("#review-add-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//사용자리뷰 상세 레이어 팝업 열기
function openReviewDetailLayer(obj) {
    var dataReviewIdx = $(obj).attr("data-review-idx");
    
    $("#review-detail-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//매거진 상세 레이어 팝업 열기
function openMagazineDetailLayer(obj) {
    var dataMagazineIdx = $(obj).attr("data-magazine-idx");
    
    $("#magazine-detail-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//2차 수정 부분 START
//상품문의 작성 레이어 팝업 열기
function openInquiryAddLayer() {
    $("#inquiry-add-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//2차 수정 부분 END

//3차 수정 부분 START
//약관동의 상세 레이어 팝업 열기
function openJoinAgreementLayer(type) {    
    $("#join-agreement-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}
//3차 수정 부분 END

//5차 수정 부분 START
//주문 취소진행중 레이어 팝업 열기
function openCancelOngoingLayer() {    
    $("#cancel-ongoing-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//주문 취소불가 레이어 팝업 열기
function openCancelImpossibleLayer(obj) {
    var dataOrderGoodsIdx = $(obj).attr("data-order-goods-idx");
    
    $("#cancel-impossible-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//주문취소 레이어 팝업 열기
function openOrderCancelLayer() {
    $("#order-cancel-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//바우처 상세 레이어 팝업 열기
function openVoucherDetailLayer(obj) {
    var dataVoucherIdx = $(obj).attr("data-voucher-idx");
    
    $("#voucher-detail-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//공유하기 레이어 팝업 열기
function openShareLayer() {
    $("#share-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//주문취소 사유 선택
function setCancelReason(obj) {
    var cancelReason = $(obj).val();
    
    if (cancelReason.indexOf("직접입력") > -1) {
        $(".layer-wrap #cancel_content").prop("disabled", false);
    } else {
        $(".layer-wrap #cancel_content").val("");
        $(".layer-wrap #cancel_content").prop("disabled", true);
    }
}
//5차 수정 부분 END

//지도 날씨정보 레이어 팝업 열기
function openMapWeatherLayer() {
    var layerHtml = "";
    
    layerHtml += "<div class='c-tab'>";
    layerHtml += "    <div class='c-tab-item'>";
    layerHtml += "        <a href='javascript:void(0);' data-tab='todayweather' onclick='setContentTab(this);'>오늘</a>";
    layerHtml += "    </div>";
    layerHtml += "    <div class='c-tab-item'>";
    layerHtml += "        <a href='javascript:void(0);' data-tab='weekendweather' onclick='setContentTab(this);'>주간</a>";
    layerHtml += "    </div>";
    layerHtml += "</div>";
    layerHtml += "<div class='c-tab-info' id='c-tab-todayweather'>";
    layerHtml += "    <div class='layer-weather-tit'>시간대 날씨정보</div>";
    layerHtml += "    <table class='c-table'>";
    layerHtml += "        <colgroup>";
    layerHtml += "            <col width='*'>";
    layerHtml += "            <col width='*'>";
    layerHtml += "            <col width='*'>";
    layerHtml += "            <col width='*'>";
    layerHtml += "            <col width='*'>";
    layerHtml += "            <col width='*'>";
    layerHtml += "            <col width='*'>";
    layerHtml += "        </colgroup>";
    layerHtml += "        <thead>";
    layerHtml += "            <tr>";
    layerHtml += "                <th>시간</th>";
    layerHtml += "                <th>날씨</th>";
    layerHtml += "                <th>기온(℃)</th>";
    layerHtml += "                <th>풍향</th>";
    layerHtml += "                <th>풍속(㎧)</th>";
    layerHtml += "                <th>강수량(㎜/h)</th>";
    layerHtml += "                <th>습도(%)</th>";
    layerHtml += "            </tr>";
    layerHtml += "        </thead>";
    layerHtml += "        <tbody>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>00:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-night.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>01:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-night.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>02:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-night.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>03:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-night.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>04:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-night.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>05:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-night.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>06:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>07:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>08:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>09:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>10:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>11:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>12:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>13:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>14:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>15:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>16:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>17:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>18:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>19:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>20:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-night.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>21:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-night.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>22:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-night.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>23:00</td>";
    layerHtml += "                <td class='text-center'><img src='assets/img/weather-night.png' alt='맑음' class='weather-img'></td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>남서</td>";
    layerHtml += "                <td class='text-center'>3</td>";
    layerHtml += "                <td class='text-center'>0</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "        </tbody>";
    layerHtml += "    </table>";
    layerHtml += "</div>";
    layerHtml += "<div class='c-tab-info' id='c-tab-weekendweather'>";
    layerHtml += "    <div class='layer-weather-tit'>주간 날씨정보</div>";
    layerHtml += "    <table class='c-table'>";
    layerHtml += "        <colgroup>";
    layerHtml += "            <col width='*'>";
    layerHtml += "            <col width='*'>";
    layerHtml += "            <col width='*'>";
    layerHtml += "            <col width='*'>";
    layerHtml += "            <col width='*'>";
    layerHtml += "        </colgroup>";
    layerHtml += "        <thead>";
    layerHtml += "            <tr>";
    layerHtml += "                <th>날짜</th>";
    layerHtml += "                <th>날씨<span class='weather-small-txt'>(오전/오후)</span></th>";
    layerHtml += "                <th>최고기온(℃)</th>";
    layerHtml += "                <th>최저기온(℃)</th>";
    layerHtml += "                <th>강수확률(%)</th>";
    layerHtml += "            </tr>";
    layerHtml += "        </thead>";
    layerHtml += "        <tbody>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>4/9(토)</td>";
    layerHtml += "                <td class='text-center'>";
    layerHtml += "                    <img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'>";
    layerHtml += "                    <img src='assets/img/weather-cloud.png' alt='구름' class='weather-img'>";
    layerHtml += "                </td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>5</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>4/10(일)</td>";
    layerHtml += "                <td class='text-center'>";
    layerHtml += "                    <img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'>";
    layerHtml += "                    <img src='assets/img/weather-cloud.png' alt='구름' class='weather-img'>";
    layerHtml += "                </td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>5</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>4/11(월)</td>";
    layerHtml += "                <td class='text-center'>";
    layerHtml += "                    <img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'>";
    layerHtml += "                    <img src='assets/img/weather-cloud.png' alt='구름' class='weather-img'>";
    layerHtml += "                </td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>5</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>4/12(화)</td>";
    layerHtml += "                <td class='text-center'>";
    layerHtml += "                    <img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'>";
    layerHtml += "                    <img src='assets/img/weather-cloud.png' alt='구름' class='weather-img'>";
    layerHtml += "                </td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>5</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>4/13(수)</td>";
    layerHtml += "                <td class='text-center'>";
    layerHtml += "                    <img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'>";
    layerHtml += "                    <img src='assets/img/weather-cloud.png' alt='구름' class='weather-img'>";
    layerHtml += "                </td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>5</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>4/14(목)</td>";
    layerHtml += "                <td class='text-center'>";
    layerHtml += "                    <img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'>";
    layerHtml += "                    <img src='assets/img/weather-cloud.png' alt='구름' class='weather-img'>";
    layerHtml += "                </td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>5</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "            <tr>";
    layerHtml += "                <td class='text-center'>4/15(금)</td>";
    layerHtml += "                <td class='text-center'>";
    layerHtml += "                    <img src='assets/img/weather-sun.png' alt='맑음' class='weather-img'>";
    layerHtml += "                    <img src='assets/img/weather-cloud.png' alt='구름' class='weather-img'>";
    layerHtml += "                </td>";
    layerHtml += "                <td class='text-center'>10</td>";
    layerHtml += "                <td class='text-center'>5</td>";
    layerHtml += "                <td class='text-center'>30</td>";
    layerHtml += "            </tr>";
    layerHtml += "        </tbody>";
    layerHtml += "    </table>";
    layerHtml += "</div>";
    
    $("#map-weather-layer .layer-box .layer-content").html(layerHtml);
    
    $("#map-weather-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
    
    //페이지 탭 변경
    if ($(".c-tab .c-tab-item").length > 0) {
        $(".c-tab .c-tab-item:first-child>a").trigger("click");
    }
}

//지도 배편 레이어 팝업 열기
function openMapShipLayer() {
    var todayDate = new Date();
    var todayMonth = todayDate.getMonth() + 1;
    var monthText = (todayMonth < 10) ? "0" + String(todayMonth) : String(todayMonth);
    var layerHtml = "";
    
    layerHtml += "<div class='layer-ship-tit'>";
    layerHtml += "    <div class='layer-ship-txt'>우도 ↔ 성산</div>";
    layerHtml += "    <button type='button' class='layer-ship-btn' onclick='openShipPriceLayer(\"seongsan\");'>요금표 안내</button>";
    layerHtml += "</div>";
    layerHtml += "<table class='c-table'>";
    layerHtml += "    <colgroup>";
    layerHtml += "        <col width='*'>";
    layerHtml += "        <col width='*'>";
    layerHtml += "        <col width='*'>";
    layerHtml += "    </colgroup>";
    layerHtml += "    <thead>";
    layerHtml += "        <tr>";
    layerHtml += "            <th>회수</th>";
    layerHtml += "            <th>우도발</th>";
    layerHtml += "            <th>성산발</th>";
    layerHtml += "        </tr>";
    layerHtml += "    </thead>";
    layerHtml += "    <tbody>";
    
    if (monthText == "01" || monthText == "02" || monthText == "11" || monthText == "12") {
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>07:30</td>";
        layerHtml += "            <td class='text-center'>08:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>08:00</td>";
        layerHtml += "            <td class='text-center'>08:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:30</td>";
        layerHtml += "            <td class='text-center'>09:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:00</td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "            <td class='text-center'>10:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>10:30</td>";
        layerHtml += "            <td class='text-center'>11:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>11:00</td>";
        layerHtml += "            <td class='text-center'>11:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>11:30</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "            <td class='text-center'>13:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>13:00</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "            <td class='text-center'>14:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>14</td>";
        layerHtml += "            <td class='text-center'>14:00</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "            <td class='text-center'>15:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>16</td>";
        layerHtml += "            <td class='text-center'>15:00</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>17</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "            <td class='text-center'>16:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>18</td>";
        layerHtml += "            <td class='text-center'>16:00</td>";
        layerHtml += "            <td class='text-center'>16:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>19</td>";
        layerHtml += "            <td class='text-center'>16:30</td>";
        layerHtml += "            <td class='text-center'>17:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>20</td>";
        layerHtml += "            <td class='text-center'>17:00</td>";
        layerHtml += "            <td class='text-center'></td>";
        layerHtml += "        </tr>";
    } else if (monthText == "03" || monthText == "10") {
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>07:30</td>";
        layerHtml += "            <td class='text-center'>08:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>08:00</td>";
        layerHtml += "            <td class='text-center'>08:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:30</td>";
        layerHtml += "            <td class='text-center'>09:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:00</td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "            <td class='text-center'>10:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>10:30</td>";
        layerHtml += "            <td class='text-center'>11:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>11:00</td>";
        layerHtml += "            <td class='text-center'>11:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>11:30</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "            <td class='text-center'>13:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>13:00</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "            <td class='text-center'>14:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>14</td>";
        layerHtml += "            <td class='text-center'>14:00</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "            <td class='text-center'>15:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>16</td>";
        layerHtml += "            <td class='text-center'>15:00</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>17</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "            <td class='text-center'>16:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>18</td>";
        layerHtml += "            <td class='text-center'>16:00</td>";
        layerHtml += "            <td class='text-center'>16:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>19</td>";
        layerHtml += "            <td class='text-center'>16:30</td>";
        layerHtml += "            <td class='text-center'>17:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>20</td>";
        layerHtml += "            <td class='text-center'>17:00</td>";
        layerHtml += "            <td class='text-center'>17:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>21</td>";
        layerHtml += "            <td class='text-center'>17:30</td>";
        layerHtml += "            <td class='text-center'></td>";
        layerHtml += "        </tr>";
    } else if (monthText == "04" || monthText == "09") {
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>07:30</td>";
        layerHtml += "            <td class='text-center'>08:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>08:00</td>";
        layerHtml += "            <td class='text-center'>08:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:30</td>";
        layerHtml += "            <td class='text-center'>09:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:00</td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "            <td class='text-center'>10:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>10:30</td>";
        layerHtml += "            <td class='text-center'>11:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>11:00</td>";
        layerHtml += "            <td class='text-center'>11:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>11:30</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "            <td class='text-center'>13:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>13:00</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "            <td class='text-center'>14:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>14</td>";
        layerHtml += "            <td class='text-center'>14:00</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "            <td class='text-center'>15:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>16</td>";
        layerHtml += "            <td class='text-center'>15:00</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>17</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "            <td class='text-center'>16:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>18</td>";
        layerHtml += "            <td class='text-center'>16:00</td>";
        layerHtml += "            <td class='text-center'>16:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>19</td>";
        layerHtml += "            <td class='text-center'>16:30</td>";
        layerHtml += "            <td class='text-center'>17:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>20</td>";
        layerHtml += "            <td class='text-center'>17:00</td>";
        layerHtml += "            <td class='text-center'>17:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>21</td>";
        layerHtml += "            <td class='text-center'>17:30</td>";
        layerHtml += "            <td class='text-center'>18:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>22</td>";
        layerHtml += "            <td class='text-center'>18:00</td>";
        layerHtml += "            <td class='text-center'></td>";
        layerHtml += "        </tr>";
    } else if (monthText == "05" || monthText == "06" || monthText == "07" || monthText == "08") {
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>07:30</td>";
        layerHtml += "            <td class='text-center'>08:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>08:00</td>";
        layerHtml += "            <td class='text-center'>08:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:30</td>";
        layerHtml += "            <td class='text-center'>09:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:00</td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "            <td class='text-center'>10:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>10:30</td>";
        layerHtml += "            <td class='text-center'>11:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>11:00</td>";
        layerHtml += "            <td class='text-center'>11:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>11:30</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "            <td class='text-center'>13:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>13:00</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "            <td class='text-center'>14:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>14</td>";
        layerHtml += "            <td class='text-center'>14:00</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "            <td class='text-center'>15:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>16</td>";
        layerHtml += "            <td class='text-center'>15:00</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>17</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "            <td class='text-center'>16:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>18</td>";
        layerHtml += "            <td class='text-center'>16:00</td>";
        layerHtml += "            <td class='text-center'>16:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>19</td>";
        layerHtml += "            <td class='text-center'>16:30</td>";
        layerHtml += "            <td class='text-center'>17:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>20</td>";
        layerHtml += "            <td class='text-center'>17:00</td>";
        layerHtml += "            <td class='text-center'>17:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>21</td>";
        layerHtml += "            <td class='text-center'>17:30</td>";
        layerHtml += "            <td class='text-center'>18:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>22</td>";
        layerHtml += "            <td class='text-center'>18:00</td>";
        layerHtml += "            <td class='text-center'>18:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>23</td>";
        layerHtml += "            <td class='text-center'>18:30</td>";
        layerHtml += "            <td class='text-center'></td>";
        layerHtml += "        </tr>";
    }
    
    layerHtml += "    </tbody>";
    layerHtml += "</table>";
    layerHtml += "<div class='layer-ship-explain'>";
    layerHtml += "    <div class='ship-explain-item'>대체로 추가운항되며 그 시간은 시간표를 기준으로 10분~30분 간격으로 운항됩니다. 또한 태풍, 풍량주의보, 안개 등 기상악화시 운항이 중단됩니다.</div>";
    layerHtml += "</div>";
    layerHtml += "<div class='layer-ship-tit'>";
    layerHtml += "    <div class='layer-ship-txt'>우도 ↔ 종달</div>";
    layerHtml += "    <button type='button' class='layer-ship-btn' onclick='openShipPriceLayer(\"jongdal\");'>요금표 안내</button>";
    layerHtml += "</div>";
    layerHtml += "<table class='c-table'>";
    layerHtml += "    <colgroup>";
    layerHtml += "        <col width='*'>";
    layerHtml += "        <col width='*'>";
    layerHtml += "        <col width='*'>";
    layerHtml += "    </colgroup>";
    layerHtml += "    <thead>";
    layerHtml += "        <tr>";
    layerHtml += "            <th>회수</th>";
    layerHtml += "            <th>우도발</th>";
    layerHtml += "            <th>종달발</th>";
    layerHtml += "        </tr>";
    layerHtml += "    </thead>";
    layerHtml += "    <tbody>";
    
    if (monthText == "01" || monthText == "02" || monthText == "03" || monthText == "10" || monthText == "11" || monthText == "12") {
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'></td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>10:30</td>";
        layerHtml += "            <td class='text-center'>11:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>16:00</td>";
        layerHtml += "            <td class='text-center'></td>";
        layerHtml += "        </tr>";
    } else if (monthText == "04" || monthText == "05" || monthText == "06" || monthText == "07" || monthText == "08" || monthText == "09") {
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'></td>";
        layerHtml += "            <td class='text-center'>09:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>10:30</td>";
        layerHtml += "            <td class='text-center'>11:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "            <td class='text-center'>13:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "            <td class='text-center'>14:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "            <td class='text-center'>15:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>16:00</td>";
        layerHtml += "            <td class='text-center'>17:00</td>";
        layerHtml += "        </tr>";
    }
    
    layerHtml += "    </tbody>";
    layerHtml += "</table>";
    layerHtml += "<div class='layer-ship-explain'>";
    layerHtml += "    <div class='ship-explain-item'>조석(간만) 및 기상상태, 물양장 사정 등으로 인해 시간변경, 입출항 포구변경 등 단축운항이 될 수 있습니다.</div>";
    layerHtml += "</div>";
    
    $("#map-ship-layer .layer-box .layer-content").html(layerHtml);
    
    $("#map-ship-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//배편 요금표 안내 레이어 팝업 열기
function openShipPriceLayer(type) {
    var layerTitle = "";
    var layerHtml = "";
    
    if (type == "seongsan") {
        layerTitle += "우도 ↔ 성산 요금표";
        
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th rowspan='2'>구분</th>";
        layerHtml += "            <th rowspan='2'>왕복요금</th>";
        layerHtml += "            <th colspan='2'>편도요금</th>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <th class='th-hidden'></th>";
        layerHtml += "            <th>우도입도</th>";
        layerHtml += "            <th>우도출도</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>성인</td>";
        layerHtml += "            <td class='text-center'>10,500원</td>";
        layerHtml += "            <td class='text-center'>6,000원</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>중고등학생</td>";
        layerHtml += "            <td class='text-center'>10,100원</td>";
        layerHtml += "            <td class='text-center'>5,600원</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>경로/장애인/유공자</td>";
        layerHtml += "            <td class='text-center'>9,000원</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>초등학생</td>";
        layerHtml += "            <td class='text-center'>3,800원</td>";
        layerHtml += "            <td class='text-center'>2,300원</td>";
        layerHtml += "            <td class='text-center'>1,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3세~7세</td>";
        layerHtml += "            <td class='text-center'>3,000원</td>";
        layerHtml += "            <td class='text-center'>1,500원</td>";
        layerHtml += "            <td class='text-center'>1,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>경차</td>";
        layerHtml += "            <td class='text-center'>21,600원</td>";
        layerHtml += "            <td class='text-center'>12,800원</td>";
        layerHtml += "            <td class='text-center'>8,800원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>중소형<br>9인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>26,000원</td>";
        layerHtml += "            <td class='text-center'>15,000원</td>";
        layerHtml += "            <td class='text-center'>11,000원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>대형(그렌저이상/수입차)<br>12인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>30,400원</td>";
        layerHtml += "            <td class='text-center'>17,200원</td>";
        layerHtml += "            <td class='text-center'>13,200원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>37,000원</td>";
        layerHtml += "            <td class='text-center'>20,500원</td>";
        layerHtml += "            <td class='text-center'>16,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>카운티<br>25인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>61,000원</td>";
        layerHtml += "            <td class='text-center'>33,500원</td>";
        layerHtml += "            <td class='text-center'>27,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th rowspan='2'>구분</th>";
        layerHtml += "            <th colspan='3'>우도입도 상세요금</th>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <th class='th-hidden'></th>";
        layerHtml += "            <th>선박요금</th>";
        layerHtml += "            <th>도립공원 입장료</th>";
        layerHtml += "            <th>터미널 이용료</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>성인</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "            <td class='text-center'>1,000원</td>";
        layerHtml += "            <td class='text-center'>500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>중고등학생</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "            <td class='text-center'>800원</td>";
        layerHtml += "            <td class='text-center'>500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>경로/장애인/유공자</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>초등학생</td>";
        layerHtml += "            <td class='text-center'>1,500원</td>";
        layerHtml += "            <td class='text-center'>500원</td>";
        layerHtml += "            <td class='text-center'>300원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3세~7세</td>";
        layerHtml += "            <td class='text-center'>1,500원</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>경차</td>";
        layerHtml += "            <td class='text-center'>8,800원</td>";
        layerHtml += "            <td class='text-center'>4,000원</td>";
        layerHtml += "            <td rowspan='5' class='text-center'>렌터카 불가 (장애인, 노약자, 임산부, 영유아 탑승시 가능)</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>중소형<br>9인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>11,000원</td>";
        layerHtml += "            <td class='text-center'>4,000원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>대형(그렌저이상/수입차)<br>12인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>13,200원</td>";
        layerHtml += "            <td class='text-center'>4,000원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>16,500원</td>";
        layerHtml += "            <td class='text-center'>4,000원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>카운티<br>25인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>27,500원</td>";
        layerHtml += "            <td class='text-center'>6,000원</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
        layerHtml += "<div class='layer-ship-explain'>";
        layerHtml += "    <div class='ship-explain-item'>제주도민은 공원입장료가 무료이므로 필수로 신분증을 지참해주세요.</div>";
        layerHtml += "    <div class='ship-explain-item'>이륜차(오토바이, 자전거, 전동스쿠터 등 기타차량) 및 화물차량은 별도로 문의해주세요.</div>";
        layerHtml += "</div>";
    } else if (type == "jongdal") {
        layerTitle += "우도 ↔ 종달 요금표";
        
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th rowspan='2'>구분</th>";
        layerHtml += "            <th rowspan='2'>왕복요금</th>";
        layerHtml += "            <th colspan='2'>편도요금</th>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <th class='th-hidden'></th>";
        layerHtml += "            <th>우도입도</th>";
        layerHtml += "            <th>우도출도</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>성인</td>";
        layerHtml += "            <td class='text-center'>10,000원</td>";
        layerHtml += "            <td class='text-center'>5,500원</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>중고등학생</td>";
        layerHtml += "            <td class='text-center'>9,800원</td>";
        layerHtml += "            <td class='text-center'>5,300원</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>경로/장애인/유공자</td>";
        layerHtml += "            <td class='text-center'>9,000원</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>초등학생</td>";
        layerHtml += "            <td class='text-center'>3,500원</td>";
        layerHtml += "            <td class='text-center'>2,000원</td>";
        layerHtml += "            <td class='text-center'>1,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3세~7세</td>";
        layerHtml += "            <td class='text-center'>3,000원</td>";
        layerHtml += "            <td class='text-center'>1,500원</td>";
        layerHtml += "            <td class='text-center'>1,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>경차</td>";
        layerHtml += "            <td class='text-center'>21,600원</td>";
        layerHtml += "            <td class='text-center'>12,800원</td>";
        layerHtml += "            <td class='text-center'>8,800원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>중소형<br>9인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>26,000원</td>";
        layerHtml += "            <td class='text-center'>15,000원</td>";
        layerHtml += "            <td class='text-center'>11,000원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>대형(그렌저이상/수입차)<br>12인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>30,400원</td>";
        layerHtml += "            <td class='text-center'>17,200원</td>";
        layerHtml += "            <td class='text-center'>13,200원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>37,000원</td>";
        layerHtml += "            <td class='text-center'>20,500원</td>";
        layerHtml += "            <td class='text-center'>16,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>카운티<br>25인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>61,000원</td>";
        layerHtml += "            <td class='text-center'>33,500원</td>";
        layerHtml += "            <td class='text-center'>27,500원</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th rowspan='2'>구분</th>";
        layerHtml += "            <th colspan='3'>우도입도 상세요금</th>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <th class='th-hidden'></th>";
        layerHtml += "            <th>선박요금</th>";
        layerHtml += "            <th>도립공원 입장료</th>";
        layerHtml += "            <th>터미널 이용료</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>성인</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "            <td class='text-center'>1,000원</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>중고등학생</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "            <td class='text-center'>800원</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>경로/장애인/유공자</td>";
        layerHtml += "            <td class='text-center'>4,500원</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>초등학생</td>";
        layerHtml += "            <td class='text-center'>1,500원</td>";
        layerHtml += "            <td class='text-center'>500원</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3세~7세</td>";
        layerHtml += "            <td class='text-center'>1,500원</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "            <td class='text-center'>-</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>경차</td>";
        layerHtml += "            <td class='text-center'>8,800원</td>";
        layerHtml += "            <td class='text-center'>4,000원</td>";
        layerHtml += "            <td rowspan='5' class='text-center'>렌터카 불가 (장애인, 노약자, 임산부, 영유아 탑승시 가능)</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>중소형<br>9인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>11,000원</td>";
        layerHtml += "            <td class='text-center'>4,000원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>대형(그렌저이상/수입차)<br>12인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>13,200원</td>";
        layerHtml += "            <td class='text-center'>4,000원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>16,500원</td>";
        layerHtml += "            <td class='text-center'>4,000원</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>카운티<br>25인승이하 승합</td>";
        layerHtml += "            <td class='text-center'>27,500원</td>";
        layerHtml += "            <td class='text-center'>6,000원</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
        layerHtml += "<div class='layer-ship-explain'>";
        layerHtml += "    <div class='ship-explain-item'>제주도민은 공원입장료가 무료이므로 필수로 신분증을 지참해주세요.</div>";
        layerHtml += "    <div class='ship-explain-item'>이륜차(오토바이, 자전거, 전동스쿠터 등 기타차량) 및 화물차량은 별도로 문의해주세요.</div>";
        layerHtml += "</div>";
    }
    
    $("#ship-price-layer .layer-box .layer-topbtn-area .layer-txt-btn").html(layerTitle);
    $("#ship-price-layer .layer-box .layer-content").html(layerHtml);
    
    $("#ship-price-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//지도 버스편 레이어 팝업 열기
function openMapBusLayer() {
    var layerHtml = "";
    
    layerHtml += "<div class='layer-bus-tit'>";
    layerHtml += "    <div class='layer-bus-txt'>제주 성산항 버스</div>";
    layerHtml += "    <button type='button' class='layer-bus-btn' onclick='openUdoBusTimetableLayer();'>우도 버스 시간표</button>";
    layerHtml += "</div>";
    layerHtml += "<table class='c-table'>";
    layerHtml += "    <colgroup>";
    layerHtml += "        <col width='*'>";
    layerHtml += "        <col width='*'>";
    layerHtml += "        <col width='*'>";
    layerHtml += "    </colgroup>";
    layerHtml += "    <thead>";
    layerHtml += "        <tr>";
    layerHtml += "            <th>버스번호</th>";
    layerHtml += "            <th>출발지 ↔ 도착지</th>";
    layerHtml += "            <th>비고</th>";
    layerHtml += "        </tr>";
    layerHtml += "    </thead>";
    layerHtml += "    <tbody>";
    layerHtml += "        <tr>";
    layerHtml += "            <td class='text-center'>111</td>";
    layerHtml += "            <td class='text-center'><a href='javascript:void(0);' onclick='openBusTimetableLayer(\"111_1\");'>공항 ↔ 성산부두</a></td>";
    layerHtml += "            <td class='text-center'>첫차 06:10<br>막차 22:00<br>배차간격 70~105분</td>";
    layerHtml += "        </tr>";
    layerHtml += "        <tr>";
    layerHtml += "            <td class='text-center'>111</td>";
    layerHtml += "            <td class='text-center'><a href='javascript:void(0);' onclick='openBusTimetableLayer(\"111_2\");'>성산부두 ↔ 공항</a></td>";
    layerHtml += "            <td class='text-center'>첫차 06:00<br>막차 22:00<br>배차간격 65~95분</td>";
    layerHtml += "        </tr>";
    layerHtml += "        <tr>";
    layerHtml += "            <td class='text-center'>112</td>";
    layerHtml += "            <td class='text-center'><a href='javascript:void(0);' onclick='openBusTimetableLayer(\"112_1\");'>공항 ↔ 성산부두</a></td>";
    layerHtml += "            <td class='text-center'>첫차 06:40<br>막차 21:10<br>배차간격 70~95분</td>";
    layerHtml += "        </tr>";
    layerHtml += "        <tr>";
    layerHtml += "            <td class='text-center'>112</td>";
    layerHtml += "            <td class='text-center'><a href='javascript:void(0);' onclick='openBusTimetableLayer(\"112_2\");'>성산부두 ↔ 공항</a></td>";
    layerHtml += "            <td class='text-center'>첫차 06:40<br>막차 21:05<br>배차간격 70~80분</td>";
    layerHtml += "        </tr>";
    layerHtml += "        <tr>";
    layerHtml += "            <td class='text-center'>211</td>";
    layerHtml += "            <td class='text-center'><a href='javascript:void(0);' onclick='openBusTimetableLayer(\"211_1\");'>제주터미널 ↔ 성산포항</a></td>";
    layerHtml += "            <td class='text-center'>첫차 06:15<br>막차 21:40<br>배차간격 45~70분</td>";
    layerHtml += "        </tr>";
    layerHtml += "        <tr>";
    layerHtml += "            <td class='text-center'>211</td>";
    layerHtml += "            <td class='text-center'><a href='javascript:void(0);' onclick='openBusTimetableLayer(\"211_2\");'>성산포항 ↔ 제주터미널</a></td>";
    layerHtml += "            <td class='text-center'>첫차 06:20<br>막차 21:40<br>배차간격 45~70분</td>";
    layerHtml += "        </tr>";
    layerHtml += "        <tr>";
    layerHtml += "            <td class='text-center'>212</td>";
    layerHtml += "            <td class='text-center'><a href='javascript:void(0);' onclick='openBusTimetableLayer(\"212_1\");'>제주터미널 ↔ 성산포항</a></td>";
    layerHtml += "            <td class='text-center'>첫차 06:40<br>막차 21:00<br>배차간격 50~70분</td>";
    layerHtml += "        </tr>";
    layerHtml += "        <tr>";
    layerHtml += "            <td class='text-center'>212</td>";
    layerHtml += "            <td class='text-center'><a href='javascript:void(0);' onclick='openBusTimetableLayer(\"212_2\");'>성산포항 ↔ 제주터미널</a></td>";
    layerHtml += "            <td class='text-center'>첫차 07:00<br>막차 21:10<br>배차간격 50~70분</td>";
    layerHtml += "        </tr>";
    layerHtml += "        <tr>";
    layerHtml += "            <td class='text-center'>295</td>";
    layerHtml += "            <td class='text-center'><a href='javascript:void(0);' onclick='openBusTimetableLayer(\"295_1\");'>서귀포터미널 ↔ 성산포항</a></td>";
    layerHtml += "            <td class='text-center'>첫차 05:50<br>막차 19:50<br>배차간격 37~120분</td>";
    layerHtml += "        </tr>";
    layerHtml += "        <tr>";
    layerHtml += "            <td class='text-center'>295</td>";
    layerHtml += "            <td class='text-center'><a href='javascript:void(0);' onclick='openBusTimetableLayer(\"295_2\");'>성산포항 ↔ 서귀포터미널</a></td>";
    layerHtml += "            <td class='text-center'>첫차 05:48<br>막차 20:00<br>배차간격 15~137분</td>";
    layerHtml += "        </tr>";
    layerHtml += "    </tbody>";
    layerHtml += "</table>";
    
    $("#map-bus-layer .layer-box .layer-content").html(layerHtml);
    
    $("#map-bus-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//버스편 시간표 레이어 팝업 열기
function openBusTimetableLayer(idx) {
    var layerHtml = "";
    
    if (idx == "111_1") {
        layerHtml += "<div class='layer-bus-tit'>111 (공항 ↔ 성산부두)</div>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th>회수</th>";
        layerHtml += "            <th>공항</th>";
        layerHtml += "            <th>성산부두</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>06:10<br>(제주터미널 출발)</td>";
        layerHtml += "            <td class='text-center'>07:23</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>07:20</td>";
        layerHtml += "            <td class='text-center'>08:43</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:30</td>";
        layerHtml += "            <td class='text-center'>09:53</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:40</td>";
        layerHtml += "            <td class='text-center'>11:03</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>10:50</td>";
        layerHtml += "            <td class='text-center'>12:13</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "            <td class='text-center'>13:23</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>13:10</td>";
        layerHtml += "            <td class='text-center'>14:33</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>14:20</td>";
        layerHtml += "            <td class='text-center'>15:43</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "            <td class='text-center'>16:53</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>16:40</td>";
        layerHtml += "            <td class='text-center'>18:03</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>17:50</td>";
        layerHtml += "            <td class='text-center'>19:13</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>19:00</td>";
        layerHtml += "            <td class='text-center'>20:23</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>20:15</td>";
        layerHtml += "            <td class='text-center'>21:27</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>14</td>";
        layerHtml += "            <td class='text-center'>22:00</td>";
        layerHtml += "            <td class='text-center'>23:12</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
    } else if (idx == "111_2") {
        layerHtml += "<div class='layer-bus-tit'>111 (성산부두 ↔ 공항)</div>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th>회수</th>";
        layerHtml += "            <th>성산부두</th>";
        layerHtml += "            <th>공항</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>06:00</td>";
        layerHtml += "            <td class='text-center'>07:20</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>07:20</td>";
        layerHtml += "            <td class='text-center'>08:40</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:40</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:50</td>";
        layerHtml += "            <td class='text-center'>11:10</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>11:05</td>";
        layerHtml += "            <td class='text-center'>12:25</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>12:10</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>13:20</td>";
        layerHtml += "            <td class='text-center'>14:40</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>14:35</td>";
        layerHtml += "            <td class='text-center'>15:55</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>15:40</td>";
        layerHtml += "            <td class='text-center'>17:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>16:50</td>";
        layerHtml += "            <td class='text-center'>18:10</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>18:00</td>";
        layerHtml += "            <td class='text-center'>19:20</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>19:15</td>";
        layerHtml += "            <td class='text-center'>20:35</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>20:25</td>";
        layerHtml += "            <td class='text-center'>21:38</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>14</td>";
        layerHtml += "            <td class='text-center'>22:00</td>";
        layerHtml += "            <td class='text-center'>23:03<br>(제주터미널 종료)</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
    } else if (idx == "112_1") {
        layerHtml += "<div class='layer-bus-tit'>112 (공항 ↔ 성산부두)</div>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th>회수</th>";
        layerHtml += "            <th>공항</th>";
        layerHtml += "            <th>성산부두</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>06:40</td>";
        layerHtml += "            <td class='text-center'>08:12</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>07:55</td>";
        layerHtml += "            <td class='text-center'>09:27</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>09:05</td>";
        layerHtml += "            <td class='text-center'>10:37</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>10:15</td>";
        layerHtml += "            <td class='text-center'>11:47</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>11:25</td>";
        layerHtml += "            <td class='text-center'>12:57</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>12:35</td>";
        layerHtml += "            <td class='text-center'>14:07</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>13:45</td>";
        layerHtml += "            <td class='text-center'>15:17</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>14:55</td>";
        layerHtml += "            <td class='text-center'>16:27</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>16:05</td>";
        layerHtml += "            <td class='text-center'>17:37</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>17:15</td>";
        layerHtml += "            <td class='text-center'>18:47</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>18:25</td>";
        layerHtml += "            <td class='text-center'>19:57</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>19:35</td>";
        layerHtml += "            <td class='text-center'>21:07</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>21:10</td>";
        layerHtml += "            <td class='text-center'>22:34</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
    } else if (idx == "112_2") {
        layerHtml += "<div class='layer-bus-tit'>112 (성산부두 ↔ 공항)</div>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th>회수</th>";
        layerHtml += "            <th>성산부두</th>";
        layerHtml += "            <th>공항</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>06:40</td>";
        layerHtml += "            <td class='text-center'>08:15</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>07:55</td>";
        layerHtml += "            <td class='text-center'>09:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>09:15</td>";
        layerHtml += "            <td class='text-center'>10:50</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>10:25</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>11:35</td>";
        layerHtml += "            <td class='text-center'>13:10</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>12:45</td>";
        layerHtml += "            <td class='text-center'>14:20</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>13:55</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>15:05</td>";
        layerHtml += "            <td class='text-center'>16:40</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>16:15</td>";
        layerHtml += "            <td class='text-center'>17:50</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>17:25</td>";
        layerHtml += "            <td class='text-center'>19:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>18:35</td>";
        layerHtml += "            <td class='text-center'>20:10</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>19:45</td>";
        layerHtml += "            <td class='text-center'>21:20</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>21:05</td>";
        layerHtml += "            <td class='text-center'>22:18<br>(제주터미널 종료)</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
    } else if (idx == "211_1") {
        layerHtml += "<div class='layer-bus-tit'>211 (제주터미널 ↔ 성산포항)</div>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th>회수</th>";
        layerHtml += "            <th>제주터미널</th>";
        layerHtml += "            <th>성산포항</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>06:15</td>";
        layerHtml += "            <td class='text-center'>07:28</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>07:10</td>";
        layerHtml += "            <td class='text-center'>08:26</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:00</td>";
        layerHtml += "            <td class='text-center'>09:16</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>08:50</td>";
        layerHtml += "            <td class='text-center'>10:06</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>09:40</td>";
        layerHtml += "            <td class='text-center'>10:56</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>10:40</td>";
        layerHtml += "            <td class='text-center'>11:53</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>11:40</td>";
        layerHtml += "            <td class='text-center'>12:56</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>12:40</td>";
        layerHtml += "            <td class='text-center'>13:56</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>13:40</td>";
        layerHtml += "            <td class='text-center'>14:56</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>14:40</td>";
        layerHtml += "            <td class='text-center'>15:56</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>15:40</td>";
        layerHtml += "            <td class='text-center'>16:56</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>16:40</td>";
        layerHtml += "            <td class='text-center'>17:56</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>17:30</td>";
        layerHtml += "            <td class='text-center'>18:46</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>14</td>";
        layerHtml += "            <td class='text-center'>18:30</td>";
        layerHtml += "            <td class='text-center'>19:46</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15</td>";
        layerHtml += "            <td class='text-center'>19:30</td>";
        layerHtml += "            <td class='text-center'>20:43</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>16</td>";
        layerHtml += "            <td class='text-center'>20:30</td>";
        layerHtml += "            <td class='text-center'>21:46</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>17</td>";
        layerHtml += "            <td class='text-center'>21:40</td>";
        layerHtml += "            <td class='text-center'>22:56</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
    } else if (idx == "211_2") {
        layerHtml += "<div class='layer-bus-tit'>211 (성산포항 ↔ 제주터미널)</div>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th>회수</th>";
        layerHtml += "            <th>성산포항</th>";
        layerHtml += "            <th>제주터미널</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>06:20</td>";
        layerHtml += "            <td class='text-center'>07:35</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>07:30</td>";
        layerHtml += "            <td class='text-center'>08:45</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:30</td>";
        layerHtml += "            <td class='text-center'>09:45</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:10</td>";
        layerHtml += "            <td class='text-center'>10:25</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>10:10</td>";
        layerHtml += "            <td class='text-center'>11:25</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>11:00</td>";
        layerHtml += "            <td class='text-center'>12:12</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "            <td class='text-center'>13:15</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>13:00</td>";
        layerHtml += "            <td class='text-center'>14:15</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>14:00</td>";
        layerHtml += "            <td class='text-center'>15:12</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>14:55</td>";
        layerHtml += "            <td class='text-center'>16:10</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>15:55</td>";
        layerHtml += "            <td class='text-center'>17:07</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>16:55</td>";
        layerHtml += "            <td class='text-center'>18:10</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>17:45</td>";
        layerHtml += "            <td class='text-center'>19:00</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>14</td>";
        layerHtml += "            <td class='text-center'>18:40</td>";
        layerHtml += "            <td class='text-center'>19:55</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15</td>";
        layerHtml += "            <td class='text-center'>19:40</td>";
        layerHtml += "            <td class='text-center'>20:55</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>16</td>";
        layerHtml += "            <td class='text-center'>20:35</td>";
        layerHtml += "            <td class='text-center'>21:50</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>17</td>";
        layerHtml += "            <td class='text-center'>21:40</td>";
        layerHtml += "            <td class='text-center'>22:55</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
    } else if (idx == "212_1") {
        layerHtml += "<div class='layer-bus-tit'>212 (제주터미널 ↔ 성산포항)</div>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th>회수</th>";
        layerHtml += "            <th>제주터미널</th>";
        layerHtml += "            <th>성산포항</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>06:40</td>";
        layerHtml += "            <td class='text-center'>08:04</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>07:25</td>";
        layerHtml += "            <td class='text-center'>08:49</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:25</td>";
        layerHtml += "            <td class='text-center'>09:49</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:15</td>";
        layerHtml += "            <td class='text-center'>10:36</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>10:00</td>";
        layerHtml += "            <td class='text-center'>11:24</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>11:10</td>";
        layerHtml += "            <td class='text-center'>12:34</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>12:10</td>";
        layerHtml += "            <td class='text-center'>13:34</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>13:10</td>";
        layerHtml += "            <td class='text-center'>14:34</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>14:10</td>";
        layerHtml += "            <td class='text-center'>15:31</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>15:10</td>";
        layerHtml += "            <td class='text-center'>16:34</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>16:10</td>";
        layerHtml += "            <td class='text-center'>17:34</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>17:05</td>";
        layerHtml += "            <td class='text-center'>18:26</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>18:00</td>";
        layerHtml += "            <td class='text-center'>19:24</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>14</td>";
        layerHtml += "            <td class='text-center'>19:00</td>";
        layerHtml += "            <td class='text-center'>20:24</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15</td>";
        layerHtml += "            <td class='text-center'>20:00</td>";
        layerHtml += "            <td class='text-center'>21:24</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>16</td>";
        layerHtml += "            <td class='text-center'>21:00</td>";
        layerHtml += "            <td class='text-center'>22:24</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
    } else if (idx == "212_2") {
        layerHtml += "<div class='layer-bus-tit'>212 (성산포항 ↔ 제주터미널)</div>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th>회수</th>";
        layerHtml += "            <th>성산포항</th>";
        layerHtml += "            <th>제주터미널</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>07:00</td>";
        layerHtml += "            <td class='text-center'>08:24</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>08:00</td>";
        layerHtml += "            <td class='text-center'>09:24</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:55</td>";
        layerHtml += "            <td class='text-center'>10:16</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:45</td>";
        layerHtml += "            <td class='text-center'>11:09</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>10:35</td>";
        layerHtml += "            <td class='text-center'>11:59</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>11:30</td>";
        layerHtml += "            <td class='text-center'>12:54</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>12:30</td>";
        layerHtml += "            <td class='text-center'>13:54</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>13:30</td>";
        layerHtml += "            <td class='text-center'>14:54</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "            <td class='text-center'>15:54</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>15:20</td>";
        layerHtml += "            <td class='text-center'>16:44</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>16:25</td>";
        layerHtml += "            <td class='text-center'>17:49</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>17:20</td>";
        layerHtml += "            <td class='text-center'>18:41</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>13</td>";
        layerHtml += "            <td class='text-center'>18:10</td>";
        layerHtml += "            <td class='text-center'>19:34</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>14</td>";
        layerHtml += "            <td class='text-center'>19:10</td>";
        layerHtml += "            <td class='text-center'>20:34</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>15</td>";
        layerHtml += "            <td class='text-center'>20:05</td>";
        layerHtml += "            <td class='text-center'>21:26</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>16</td>";
        layerHtml += "            <td class='text-center'>21:10</td>";
        layerHtml += "            <td class='text-center'>22:34</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
    } else if (idx == "295_1") {
        layerHtml += "<div class='layer-bus-tit'>295 (서귀포터미널 ↔ 성산포항)</div>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th>회수</th>";
        layerHtml += "            <th>서귀포터미널</th>";
        layerHtml += "            <th>성산포항</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>05:50<br>(위미리 출발)</td>";
        layerHtml += "            <td class='text-center'>07:21</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>05:55</td>";
        layerHtml += "            <td class='text-center'>07:58</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>07:00</td>";
        layerHtml += "            <td class='text-center'>09:03</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:00</td>";
        layerHtml += "            <td class='text-center'>11:03</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>10:20</td>";
        layerHtml += "            <td class='text-center'>12:23</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "            <td class='text-center'>14:03</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>13:10</td>";
        layerHtml += "            <td class='text-center'>15:13</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>14:30</td>";
        layerHtml += "            <td class='text-center'>16:33</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>15:30</td>";
        layerHtml += "            <td class='text-center'>17:33</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>17:20</td>";
        layerHtml += "            <td class='text-center'>19:23</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>18:40</td>";
        layerHtml += "            <td class='text-center'>20:43</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>19:50</td>";
        layerHtml += "            <td class='text-center'>21:53</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
    } else if (idx == "295_2") {
        layerHtml += "<div class='layer-bus-tit'>295 (성산포항 ↔ 서귀포터미널)</div>";
        layerHtml += "<table class='c-table'>";
        layerHtml += "    <colgroup>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "        <col width='*'>";
        layerHtml += "    </colgroup>";
        layerHtml += "    <thead>";
        layerHtml += "        <tr>";
        layerHtml += "            <th>회수</th>";
        layerHtml += "            <th>성산포항</th>";
        layerHtml += "            <th>서귀포터미널</th>";
        layerHtml += "        </tr>";
        layerHtml += "    </thead>";
        layerHtml += "    <tbody>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>1</td>";
        layerHtml += "            <td class='text-center'>05:48</td>";
        layerHtml += "            <td class='text-center'>08:04</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>2</td>";
        layerHtml += "            <td class='text-center'>06:03</td>";
        layerHtml += "            <td class='text-center'>08:12</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>3</td>";
        layerHtml += "            <td class='text-center'>08:20</td>";
        layerHtml += "            <td class='text-center'>10:19<br>(서귀포등기소 종료)</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>4</td>";
        layerHtml += "            <td class='text-center'>09:20</td>";
        layerHtml += "            <td class='text-center'>11:19<br>(서귀포등기소 종료)</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>5</td>";
        layerHtml += "            <td class='text-center'>10:40</td>";
        layerHtml += "            <td class='text-center'>12:39<br>(서귀포등기소 종료)</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>6</td>";
        layerHtml += "            <td class='text-center'>12:00</td>";
        layerHtml += "            <td class='text-center'>13:59<br>(서귀포등기소 종료)</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>7</td>";
        layerHtml += "            <td class='text-center'>13:40</td>";
        layerHtml += "            <td class='text-center'>15:39<br>(서귀포등기소 종료)</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>8</td>";
        layerHtml += "            <td class='text-center'>15:00</td>";
        layerHtml += "            <td class='text-center'>17:09</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>9</td>";
        layerHtml += "            <td class='text-center'>16:10</td>";
        layerHtml += "            <td class='text-center'>18:19</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>10</td>";
        layerHtml += "            <td class='text-center'>17:40</td>";
        layerHtml += "            <td class='text-center'>19:49</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>11</td>";
        layerHtml += "            <td class='text-center'>18:40</td>";
        layerHtml += "            <td class='text-center'>20:49</td>";
        layerHtml += "        </tr>";
        layerHtml += "        <tr>";
        layerHtml += "            <td class='text-center'>12</td>";
        layerHtml += "            <td class='text-center'>20:00</td>";
        layerHtml += "            <td class='text-center'>22:09</td>";
        layerHtml += "        </tr>";
        layerHtml += "    </tbody>";
        layerHtml += "</table>";
    }
    
    $("#bus-timetable-layer .layer-box .layer-content").html(layerHtml);
    
    $("#bus-timetable-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//버스편 우도 버스 시간표 레이어 팝업 열기
function openUdoBusTimetableLayer() {
    var layerHtml = "";
    
    layerHtml += "<div class='layer-udo-bus-area'>";
    layerHtml += "    <div class='layer-udo-bus-tit'>1. 주요관광지 시간표</div>";
    layerHtml += "    <div class='layer-udo-bus-con'><img src='assets/img/주요관광지_시간표.png' alt='주요관광지 시간표'></div>";
    layerHtml += "    <div class='layer-udo-bus-con'><img src='assets/img/주요관광지_시간표2.png' alt='주요관광지 시간표'></div>";
    layerHtml += "    <div class='layer-udo-bus-con'><img src='assets/img/주요관광지_시간표3.jpg' alt='주요관광지 시간표'></div>";
    layerHtml += "    <div class='layer-udo-bus-tit'>2. 우도 마을 (안길) 노선 버스 시간표</div>";
    layerHtml += "    <div class='layer-udo-bus-con'><img src='assets/img/우도_마을_(안길)_노선_버스_시간표.png' alt='우도 마을 (안길) 노선 버스 시간표'></div>";
    layerHtml += "    <div class='layer-udo-bus-con'><img src='assets/img/우도_마을_(안길)_노선_버스_시간표2.png' alt='우도 마을 (안길) 노선 버스 시간표'></div>";
    layerHtml += "    <div class='layer-udo-bus-tit'>3. 해안도로 노선버스 운행 시간표 (홀수일)</div>";
    layerHtml += "    <div class='layer-udo-bus-con'><img src='assets/img/해안도로_노선버스_운행_시간표_(홀수일).png' alt='해안도로 노선버스 운행 시간표 (홀수일)'></div>";
    layerHtml += "    <div class='layer-udo-bus-tit'>4. 해안도로 노선버스 운행 시간표 (짝수일)</div>";
    layerHtml += "    <div class='layer-udo-bus-con'><img src='assets/img/해안도로_노선버스_운행_시간표_(짝수일).png' alt='해안도로 노선버스 운행 시간표 (짝수일)'></div>";
    layerHtml += "    <div class='layer-udo-bus-con'><img src='assets/img/해안도로_노선버스_운행_시간표_(짝수일)2.jpg' alt='해안도로 노선버스 운행 시간표 (짝수일)'></div>";
    layerHtml += "</div>";
    
    $("#udo-bus-timetable-layer .layer-box .layer-content").html(layerHtml);
    
    $("#udo-bus-timetable-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//레이어 팝업 닫기
function closeLayer(obj) {
    $(obj).closest(".layer-wrap").removeClass("on");
    
    if ($(".layer-wrap.on").length == 0) {
        $("body").removeClass("scroll-disable").off('scroll touchmove');

        var scrollTop = Math.abs(parseInt($("body").css("top")));

        $("html,body").animate({scrollTop: scrollTop}, 0);
    }
}

