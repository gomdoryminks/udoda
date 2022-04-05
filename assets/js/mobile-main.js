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
            $(".layer-all-wrap .layer-hidden-btn").trigger("click");
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

//레이어 팝업 닫기
function closeLayer(obj) {
    $(obj).closest(".layer-wrap").removeClass("on");
    
    if ($(".layer-wrap.on").length == 0) {
        $("body").removeClass("scroll-disable").off('scroll touchmove');

        var scrollTop = Math.abs(parseInt($("body").css("top")));

        $("html,body").animate({scrollTop: scrollTop}, 0);
    }
}

