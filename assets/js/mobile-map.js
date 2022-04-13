//6차 수정 부분 START
//지도 위도/경도 설정하기
var mapLatitude = 33.506801894143614;
var mapLongitude = 126.95336135451821;

$(document).ready(function(){
    if ($(".c-map").length > 0) {
        window.map = new kakao.maps.Map($(".c-map")[0],{
            center: new kakao.maps.LatLng(mapLatitude,mapLongitude),
            level: 5
        });
        
        window.clusterer = new kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
            minLevel: 5 // 클러스터 할 최소 지도 레벨 
        });
    }
});

var markerdata = {};
var markers = [];
var polylines = [];

var stationTimer;
var busTimer;

//노선 마커
function routeMarker() {
    var mjson = {
        'values': [
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'routePosition': [
                    {
                        'routeLatitude': '33.49269277025359',
                        'routeLongitude': '126.95136526336756',
                    },
                    {
                        'routeLatitude': '33.49629794070537',
                        'routeLongitude': '126.95577149806299',
                    },
                    {
                        'routeLatitude': '33.502184405644876',
                        'routeLongitude': '126.96698780661653',
                    },
                    {
                        'routeLatitude': '33.50941184317562',
                        'routeLongitude': '126.96286021355687',
                    },
                    {
                        'routeLatitude': '33.514941396540344',
                        'routeLongitude': '126.95733886659673',
                    },
                    {
                        'routeLatitude': '33.517613244636784',
                        'routeLongitude': '126.95344643050808',
                    },
                    {
                        'routeLatitude': '33.51897852837236',
                        'routeLongitude': '126.95176651530542',
                    },
                    {
                        'routeLatitude': '33.51941544962685',
                        'routeLongitude': '126.95086209233976',
                    },
                    {
                        'routeLatitude': '33.516287168029',
                        'routeLongitude': '126.95156349925637',
                    },
                    {
                        'routeLatitude': '33.50815555403622',
                        'routeLongitude': '126.95376361236215',
                    }
                ]
            },
            {
                'routeId': '2',
                'routeName': '주요관광노선',
                'routePosition': [
                    {
                        'routeLatitude': '33.49269277025359',
                        'routeLongitude': '126.95136526336756',
                    },
                    {
                        'routeLatitude': '33.49281536550929',
                        'routeLongitude': '126.96220282353588',
                    },
                    {
                        'routeLatitude': '33.497394957713844',
                        'routeLongitude': '126.96823255793575',
                    },
                    {
                        'routeLatitude': '33.513124721502784',
                        'routeLongitude': '126.96466954829278',
                    },
                    {
                        'routeLatitude': '33.51504055977884',
                        'routeLongitude': '126.95730114563554',
                    },
                    {
                        'routeLatitude': '33.52437955503012',
                        'routeLongitude': '126.95289918984041',
                    },
                    {
                        'routeLatitude': '33.50152005370537',
                        'routeLongitude': '126.9436079658968',
                    },
                    {
                        'routeLatitude': '33.49269277025359',
                        'routeLongitude': '126.95136526336756',
                    }
                ]
            },
            {
                'routeId': '3',
                'routeName': '해안순환버스',
                'routePosition': [
                    {
                        'routeLatitude': '33.50945861449409',
                        'routeLongitude': '126.94348173544682',
                    },
                    {
                        'routeLatitude': '33.50339043906875',
                        'routeLongitude': '126.94264354785693',
                    },
                    {
                        'routeLatitude': '33.50152005370537',
                        'routeLongitude': '126.9436079658968',
                    },
                    {
                        'routeLatitude': '33.495822139620664',
                        'routeLongitude': '126.94410667223758',
                    },
                    {
                        'routeLatitude': '33.49354726754716',
                        'routeLongitude': '126.94796589898415',
                    },
                    {
                        'routeLatitude': '33.49269277025359',
                        'routeLongitude': '126.95136526336756',
                    },
                    {
                        'routeLatitude': '33.49629794070537',
                        'routeLongitude': '126.95577149806299',
                    },
                    {
                        'routeLatitude': '33.49281536550929',
                        'routeLongitude': '126.96220282353588',
                    },
                    {
                        'routeLatitude': '33.497394957713844',
                        'routeLongitude': '126.96823255793575',
                    },
                    {
                        'routeLatitude': '33.497954279566564',
                        'routeLongitude': '126.96953448273678',
                    }
                ]
            }
        ]
    }
    
    stationMarker();
    busMarker("start");
    
    var lineColor = ['#eb6f1d','#ebc71d','#379845','#0bbdd7','#1d8ceb','#983ab3'];
    
    for (var mkey in mjson.values) {
        var bounds = new kakao.maps.LatLngBounds();
        var linePath = [];
        var lineColorKey = mkey % 6;
        
        mjson.values[mkey].routePosition.forEach(mdata=>{
            if (mdata.routeLatitude != null && mdata.routeLongitude != null) {
                var itemPos = new kakao.maps.LatLng(mdata.routeLatitude,mdata.routeLongitude);
                bounds.extend(itemPos);
                linePath.push(itemPos);
            }
        });
        
        var polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: lineColor[lineColorKey], // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });

        polyline.setMap(map);
        polylines.push(polyline);
        map.setBounds(bounds);
    }
}

//정류장 마커
function stationMarker() {
    var mjson = {
        'values': [
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'stationId': '1',
                'stationName': '동천진동항',
                'stationOrder': '1',
                'stationLatitude': '33.49269277025359',
                'stationLongitude': '126.95136526336756',
            },
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'stationId': '2',
                'stationName': '우도봉입구',
                'stationOrder': '2',
                'stationLatitude': '33.49629794070537',
                'stationLongitude': '126.95577149806299',
            },
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'stationId': '3',
                'stationName': '영일동',
                'stationOrder': '3',
                'stationLatitude': '33.502184405644876',
                'stationLongitude': '126.96698780661653',
            },
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'stationId': '4',
                'stationName': '조일리사무소',
                'stationOrder': '4',
                'stationLatitude': '33.50941184317562',
                'stationLongitude': '126.96286021355687',
            },
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'stationId': '5',
                'stationName': '하고마을버스정류소',
                'stationOrder': '5',
                'stationLatitude': '33.514941396540344',
                'stationLongitude': '126.95733886659673',
            },
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'stationId': '6',
                'stationName': '상고수동',
                'stationOrder': '6',
                'stationLatitude': '33.517613244636784',
                'stationLongitude': '126.95344643050808',
            },
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'stationId': '7',
                'stationName': '삼양동',
                'stationOrder': '7',
                'stationLatitude': '33.51897852837236',
                'stationLongitude': '126.95176651530542',
            },
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'stationId': '8',
                'stationName': '전흘동',
                'stationOrder': '8',
                'stationLatitude': '33.51941544962685',
                'stationLongitude': '126.95086209233976',
            },
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'stationId': '9',
                'stationName': '주흥동',
                'stationOrder': '9',
                'stationLatitude': '33.516287168029',
                'stationLongitude': '126.95156349925637',
            },
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'stationId': '10',
                'stationName': '서광리중앙동',
                'stationOrder': '10',
                'stationLatitude': '33.50815555403622',
                'stationLongitude': '126.95376361236215',
            }
        ]
    }
    
    mjson.values.forEach(mdata=>{
        if (mdata.stationLatitude != null && mdata.stationLongitude != null) {
            var pos = new kakao.maps.LatLng(mdata.stationLatitude, mdata.stationLongitude);
            var mar = new kakao.maps.Marker({
                map: map,
                position: pos,
                title: "station-" + mdata.stationId,
                image: new kakao.maps.MarkerImage("assets/img/mk_busstop.png", new kakao.maps.Size(30,30), {offset: new kakao.maps.Point(15,15)})
            });

            mar.setMap(map);
            markers.push(mar);
            
            var siwHtml = stationInfoWindow("start", mdata.stationId, mdata.stationName);

            mar.win = new kakao.maps.InfoWindow({
                position: pos,
                content: siwHtml
            });

            mar.win.open(map, mar);

            kakao.maps.event.addListener(mar, "click", function() {
                var dataItemTitle = mar.getTitle().split('-');

                $(".info-window-area.iw-station").css({display:"none"});
                $(".info-window-area.iw-station").prev(".marker-area").removeClass("on");

                if (dataItemTitle.length > 1) {
                    var dataItemType = dataItemTitle[0];
                    var dataItemId = dataItemTitle[1];
                    
                    stationInfoWindow("click", dataItemId, "");

                    $(".info-window-area#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                    $(".info-window-area#iw-" + dataItemType + "-" + dataItemId).prev(".marker-area").addClass("on");
                }

                map.setCenter(mar.getPosition());
                map.setLevel(3);
            });

            markerdata["station-" + mdata.stationId] = mar;
        }
    });
    
    $(".station-info-window").each(function() {
        var dataItemType = $(this).attr("data-item-type");
        var dataItemId = $(this).attr("data-item-id");
        
        $(this).parent().prev().css({display:"none"});
        $(this).parent().parent().css({display:"none"});
        $(this).parent().parent().addClass("info-window-area iw-" + dataItemType);
        $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemId);
        $(this).parent().parent().prev().addClass("marker-area m-" + dataItemType);
        $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemId);
    });
}

//정류장 인포윈도우
function stationInfoWindow(state, stationId, stationName) {
    var siwHtml = "";
    
    if (state == "start") {
        //마커 생성시        
        siwHtml += "<div class='station-info-window' data-item-type='station' data-item-id='" + stationId + "' data-item-name='" + stationName + "'>";
        siwHtml += "    <div class='siw-top'>";
        siwHtml += "        <div class='siw-tit'>" + stationName + "</div>";
        siwHtml += "        <div class='close' onclick='closeInfoWindow(\"station\",this);'><img src='assets/img/close_white.png' alt='info-window-close'></div>";
        siwHtml += "    </div>";
        siwHtml += "    <div class='siw-con'>";
        siwHtml += "        <div class='station-table'>";
        siwHtml += "            <table class='table'>";
        siwHtml += "                <colgroup>";
        siwHtml += "                    <col width='60px'>";
        siwHtml += "                    <col width='*'>";
        siwHtml += "                    <col width='60px'>";
        siwHtml += "                </colgroup>";
        siwHtml += "                <thead>";
        siwHtml += "                    <tr>";
        siwHtml += "                        <th>버스번호</th>";
        siwHtml += "                        <th>현재정류장</th>";
        siwHtml += "                        <th>도착예정</th>";
        siwHtml += "                    </tr>";
        siwHtml += "                </thead>";
        siwHtml += "                <tbody></tbody>";
        siwHtml += "            </table>";
        siwHtml += "        </div>";
        siwHtml += "    </div>";
        siwHtml += "</div>";

        return siwHtml;
    } else if (state == "click") {
        //마커 클릭시
        clearTimeout(stationTimer);
        
        siwHtml += "<tr>";
        siwHtml += "    <td><span>1111</span></td>";
        siwHtml += "    <td>동천진동항</td>";
        siwHtml += "    <td>약1분후</td>";
        siwHtml += "</tr>";
        siwHtml += "<tr>";
        siwHtml += "    <td><span>2222</span></td>";
        siwHtml += "    <td>우도봉입구</td>";
        siwHtml += "    <td>약2분후</td>";
        siwHtml += "</tr>";
        
        $(".info-window-area#iw-station-" + stationId + " .station-info-window .station-table .table tbody").html(siwHtml);
        
        stationTimer = setTimeout(function() {
            stationInfoWindow("loop", "", "");
        }, 1000);
    } else if (state == "loop") {
        //반복 호출시
        clearTimeout(stationTimer);
        
        if ($(".m-station.on").length > 0) {
            siwHtml += "<tr>";
            siwHtml += "    <td><span>3333</span></td>";
            siwHtml += "    <td>영일동</td>";
            siwHtml += "    <td>약3분후</td>";
            siwHtml += "</tr>";
            siwHtml += "<tr>";
            siwHtml += "    <td><span>4444</span></td>";
            siwHtml += "    <td>조일리사무소</td>";
            siwHtml += "    <td>약4분후</td>";
            siwHtml += "</tr>";
            
            $(".m-station.on + .iw-station .station-info-window .station-table .table tbody").html(siwHtml);
            
            stationTimer = setTimeout(function() {
                stationInfoWindow("loop", "", "");
            }, 1000);
        }
    }
}

//버스 마커
function busMarker(state) {
    var mjson = {
        'values': [
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'busId': '1',
                'busNum': '1111',
                'busOrder': '1',
                'busLatitude': '33.49269277025359',
                'busLongitude': '126.95136526336756',
            },
            {
                'routeId': '1',
                'routeName': '마을안길노선',
                'busId': '2',
                'busNum': '2222',
                'busOrder': '2',
                'busLatitude': '33.514941396540344',
                'busLongitude': '126.95733886659673',
            },
        ]
    }
    
    clearTimeout(busTimer);
    
    mjson.values.forEach(mdata=>{
        if (mdata.busLatitude != null && mdata.busLongitude != null) {
            var pos = new kakao.maps.LatLng(mdata.busLatitude, mdata.busLongitude);
            
            if (!markerdata["bus-" + mdata.busId]) {
                //마커 생성시
                var mar = new kakao.maps.Marker({
                    map: map,
                    position: pos,
                    title: "bus-" + mdata.busId,
                    image: new kakao.maps.MarkerImage("assets/img/mk_bus.png", new kakao.maps.Size(45,21), {offset: new kakao.maps.Point(30,14)})
                });

                mar.setMap(map);
                markers.push(mar);

                var biwHtml = "";
                biwHtml += "<div class='bus-info-window' data-item-type='bus' data-item-id='" + mdata.busId + "'>";
                biwHtml += "    <div class='iw-tit'>" + mdata.busNum + "</div>";
                biwHtml += "</div>";

                mar.win = new kakao.maps.InfoWindow({
                    position: pos,
                    content: biwHtml
                });

                mar.win.open(map, mar);

                markerdata["bus-" + mdata.busId] = mar;
            } else {
                //반복 호출시
                markerdata["bus-" + mdata.busId].setPosition(pos);
                markerdata["bus-" + mdata.busId].win.setPosition(pos);
            }
        }
    });
    
    $(".bus-info-window").each(function() {
        var dataItemType = $(this).attr("data-item-type");
        var dataItemId = $(this).attr("data-item-id");
        var dataItemWidth = $(this).outerWidth();
        
        if ($(this).closest(".info-window-area").length == 0) {
            dataItemWidth = dataItemWidth + 30;
            
            $(this).parent().prev().css({display:"none"});
            $(this).parent().parent().addClass("info-window-area iw-" + dataItemType);
            $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemId);
            $(this).parent().parent().prev().addClass("marker-area m-" + dataItemType);
            $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemId);
            $(this).parent().css({'width':dataItemWidth + 'px','margin-left':'-7px','top':'58px','left':'50%','transform':'translateX(-50%)'});
        }
    });
    
    busTimer = setTimeout(function() {
        busMarker("loop");
    }, 1000);
}

//이동수단 마커 (메인)
function mobilityMarker() {
    var mjson = {
        'values': [
            {
                'mobilityId': '1',
                'mobilityName': '우도잠수함 제주씨월드(주)',
                'mobilityLatitude': '33.4719126653253',
                'mobilityLongitude': '126.933104794189',
            },
            {
                'mobilityId': '2',
                'mobilityName': '우도다이브',
                'mobilityLatitude': '33.496780771547',
                'mobilityLongitude': '126.944610220836',
            },
            {
                'mobilityId': '3',
                'mobilityName': '우도제트',
                'mobilityLatitude': '33.4936503354111',
                'mobilityLongitude': '126.951100799822',
            },
            {
                'mobilityId': '4',
                'mobilityName': '우도징기스칸승마체험',
                'mobilityLatitude': '33.5148835469277',
                'mobilityLongitude': '126.949513620952',
            },
            {
                'mobilityId': '5',
                'mobilityName': '우도 앨리샤 승마장',
                'mobilityLatitude': '33.492785557078825',
                'mobilityLongitude': '126.96057796208342',
            }
        ]
    }
    
    clearTimeout(busTimer);
    
    mjson.values.forEach(mdata=>{
        if (mdata.mobilityLatitude != null && mdata.mobilityLongitude != null) {
            var pos = new kakao.maps.LatLng(mdata.mobilityLatitude, mdata.mobilityLongitude);
            var mar = new kakao.maps.Marker({
                map: map,
                position: pos,
                title: "mobility-" + mdata.mobilityId,
                image: new kakao.maps.MarkerImage("assets/img/mk_transportation.png", new kakao.maps.Size(30,30), {offset: new kakao.maps.Point(15,15)})
            });

            mar.setMap(map);
            markers.push(mar);
            
            var miwHtml = "";
            miwHtml += "<div class='mobility-info-window' data-item-type='mobility' data-item-id='" + mdata.mobilityId + "'>";
            miwHtml += "    <div class='iw-tit cf'>";
            miwHtml += "        <a href='activity-detail.html' class='iw-tit-name'>" + mdata.mobilityName + "</a>";
            miwHtml += "        <a href='https://map.kakao.com/link/search/" + mdata.mobilityName + "' target='_blank' class='iw-tit-icon'><img src='assets/img/icon_map.png' alt='지도보기'></a>";
            miwHtml += "    </div>";
            miwHtml += "</div>";

            mar.win = new kakao.maps.InfoWindow({
                position: pos,
                content: miwHtml
            });

            mar.win.open(map, mar);
            
            kakao.maps.event.addListener(mar, "click", function() {
                var dataItemTitle = mar.getTitle().split('-');

                $(".info-window-area").css({display:"none"});
                $(".info-window-area").prev(".marker-area").removeClass("on");

                if (dataItemTitle.length > 1) {
                    var dataItemType = dataItemTitle[0];
                    var dataItemId = dataItemTitle[1];

                    $(".info-window-area#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                    $(".info-window-area#iw-" + dataItemType + "-" + dataItemId).prev(".marker-area").addClass("on");
                }

                map.setCenter(mar.getPosition());
                map.setLevel(3);
            });

            markerdata["mobility-" + mdata.mobilityId] = mar;
        }
    });
    
    map.setCenter(new kakao.maps.LatLng(mapLatitude,mapLongitude));
    map.setLevel(3);
    
    clusterer.addMarkers(markers);
    
    $(".mobility-info-window").each(function() {
        var dataItemType = $(this).attr("data-item-type");
        var dataItemId = $(this).attr("data-item-id");
        var dataItemWidth = $(this).outerWidth() + 20 + 39;
        
        $(this).parent().prev().css({display:"none"});
        $(this).parent().parent().css({display:"none",height:'0px'});
        $(this).parent().parent().addClass("info-window-area iw-" + dataItemType);
        $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemId);
        $(this).parent().parent().prev().addClass("marker-area m-" + dataItemType);
        $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemId);
        $(this).parent().css({'width':dataItemWidth + 'px','top':'63px','left':'50%','transform':'translateX(-50%)'});
    });
    
    kakao.maps.event.addListener(map, "zoom_start", function() {
        stationTimer = setTimeout(function() {
            $(".mobility-info-window").each(function() {
                var dataItemType = $(this).attr("data-item-type");
                var dataItemId = $(this).attr("data-item-id");
                
                if ($(".marker-area#m-" + dataItemType + "-" + dataItemId).length > 0) {
                    //$(".info-window-area#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                } else {
                    $(".info-window-area#iw-" + dataItemType + "-" + dataItemId).css({display:'none'});
                    $(".marker-area#m-" + dataItemType + "-" + dataItemId).removeClass("on");
                }
            });
        }, 400);
    });
}

//관광객 집중도 마커 (메인)
function concentrationMarker() {
    clearTimeout(busTimer);
}

//리스트 마커
function listMarker(type) {
    var mjson = {
        'values': [
            {
                'listId': '1',
                'listName': '우도잠수함 제주씨월드(주)',
                'listLatitude': '33.4719126653253',
                'listLongitude': '126.933104794189',
            },
            {
                'listId': '2',
                'listName': '우도다이브',
                'listLatitude': '33.496780771547',
                'listLongitude': '126.944610220836',
            },
            {
                'listId': '3',
                'listName': '우도제트',
                'listLatitude': '33.4936503354111',
                'listLongitude': '126.951100799822',
            },
            {
                'listId': '4',
                'listName': '우도징기스칸승마체험',
                'listLatitude': '33.5148835469277',
                'listLongitude': '126.949513620952',
            },
            {
                'listId': '5',
                'listName': '우도 앨리샤 승마장',
                'listLatitude': '33.492785557078825',
                'listLongitude': '126.96057796208342',
            }
        ]
    }
    
    //리스트 마커 이미지 및 링크
    var lmImage = "mk_attraction_search.png";
    var lmLink = "";
    switch (type) {
        case "attraction":
            lmImage = "mk_spot.png";
            lmLink = "attraction-detail.html";
            break;
        case "restaurant":
            lmImage = "mk_restaurant.png";
            lmLink = "attraction-detail.html";
            break;
        case "cafe":
            lmImage = "mk_cafe.png";
            lmLink = "attraction-detail.html";
            break;
        case "mobility":
            lmImage = "mk_transportation.png";
            lmLink = "activity-detail.html";
            break;
        case "activity":
            lmImage = "mk_activity.png";
            lmLink = "activity-detail.html";
            break;
        case "hotel":
            lmImage = "mk_hotel.png";
            lmLink = "activity-detail.html";
            break;
        default:
            lmImage = "mk_attraction_search.png";
            lmLink = "";
    }
    
    mjson.values.forEach(mdata=>{
        if (mdata.listLatitude != null && mdata.listLongitude != null) {
            var pos = new kakao.maps.LatLng(mdata.listLatitude, mdata.listLongitude);
            var mar = new kakao.maps.Marker({
                map: map,
                position: pos,
                title: "list-" + type + "-" + mdata.listId,
                image: new kakao.maps.MarkerImage("assets/img/" + lmImage, new kakao.maps.Size(30,30), {offset: new kakao.maps.Point(15,15)})
            });

            mar.setMap(map);
            markers.push(mar);
            
            var liwHtml = "";
            liwHtml += "<div class='list-info-window' data-item-type='list' data-item-type2='" + type + "' data-item-id='" + mdata.listId + "'>";
            liwHtml += "    <div class='iw-tit cf'>";
            liwHtml += "        <a href='" + lmLink + "' class='iw-tit-name'>" + mdata.listName + "</a>";
            liwHtml += "        <a href='https://map.kakao.com/link/search/" + mdata.listName + "' target='_blank' class='iw-tit-icon'><img src='assets/img/icon_map.png' alt='지도보기'></a>";
            liwHtml += "    </div>";
            liwHtml += "</div>";

            mar.win = new kakao.maps.InfoWindow({
                position: pos,
                content: liwHtml
            });

            mar.win.open(map, mar);
            
            kakao.maps.event.addListener(mar, "click", function() {
                var dataItemTitle = mar.getTitle().split('-');

                $(".info-window-area").css({display:"none"});
                $(".info-window-area").prev(".marker-area").removeClass("on");

                if (dataItemTitle.length > 2) {
                    var dataItemType = dataItemTitle[1];
                    var dataItemId = dataItemTitle[2];

                    $(".info-window-area#iw-list-" + dataItemType + "-" + dataItemId).css({display:'block'});
                    $(".info-window-area#iw-list-" + dataItemType + "-" + dataItemId).prev(".marker-area").addClass("on");
                }

                map.setCenter(mar.getPosition());
                map.setLevel(3);
            });

            markerdata["list-" + type + "-" + mdata.listId] = mar;
        }
    });
    
    $(".list-info-window").each(function() {
        var dataItemType = $(this).attr("data-item-type");
        var dataItemType2 = $(this).attr("data-item-type2");
        var dataItemId = $(this).attr("data-item-id");
        var dataItemWidth = $(this).outerWidth() + 20 + 39;
        
        $(this).parent().prev().css({display:"none"});
        $(this).parent().parent().css({display:"none",height:'0px'});
        $(this).parent().parent().addClass("info-window-area iw-" + dataItemType + "-" + dataItemType2);
        $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemType2 + "-" + dataItemId);
        $(this).parent().parent().prev().addClass("marker-area m-" + dataItemType + "-" + dataItemType2);
        $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemType2 + "-" + dataItemId);
        $(this).parent().css({'width':dataItemWidth + 'px','top':'63px','left':'50%','transform':'translateX(-50%)'});
    });
}

//카트 마커
function cartMarker(type) {
    var mjson = {
        'values': [
            {
                'cartId': '1',
                'cartName': '우도봉',
                'cartLatitude': '33.493964',
                'cartLongitude': '126.9583155',
            },
            {
                'cartId': '2',
                'cartName': '검멜레 해변',
                'cartLatitude': '33.4973102',
                'cartLongitude': '126.9583808',
            },
            {
                'cartId': '3',
                'cartName': '서빈백사',
                'cartLatitude': '33.5025524',
                'cartLongitude': '126.9345057',
            },
            {
                'cartId': '4',
                'cartName': '밭 318',
                'cartLatitude': '33.4985926',
                'cartLongitude': '126.9645435',
            },
            {
                'cartId': '5',
                'cartName': '블랑로쉐',
                'cartLatitude': '33.5156908',
                'cartLongitude': '126.9558971',
            }
        ]
    }
    
    //카트 마커 링크
    var cmLink = "";
	if (type == "tourcart") {
		cmLink = "attraction-detail.html";
	} else if (type == "buycart") {
		cmLink = "activity-detail.html";
	}
    
    mjson.values.forEach(mdata=>{
        if (mdata.cartLatitude != null && mdata.cartLongitude != null) {
            var pos = new kakao.maps.LatLng(mdata.cartLatitude, mdata.cartLongitude);
            var mar = new kakao.maps.Marker({
                map: map,
                position: pos,
                title: "cart-" + mdata.cartId,
                image: new kakao.maps.MarkerImage("assets/img/mk_attraction.png", new kakao.maps.Size(30,30), {offset: new kakao.maps.Point(15,15)})
            });

            mar.setMap(map);
            markers.push(mar);
            
            var ciwHtml = "";
            ciwHtml += "<div class='cart-info-window' data-item-type='cart' data-item-id='" + mdata.cartId + "'>";
            ciwHtml += "    <div class='iw-tit cf'>";
            ciwHtml += "        <a href='" + cmLink + "' class='iw-tit-name'>" + mdata.cartName + "</a>";
            ciwHtml += "        <a href='https://map.kakao.com/link/to/" + mdata.cartName + "," + mdata.cartLatitude + "," + mdata.cartLongitude + "' target='_blank' class='iw-tit-icon'><img src='assets/img/icon_map.png' alt='카트위치'></a>";
            ciwHtml += "    </div>";
            ciwHtml += "</div>";

            mar.win = new kakao.maps.InfoWindow({
                position: pos,
                content: ciwHtml
            });

            mar.win.open(map, mar);
            
            kakao.maps.event.addListener(mar, "click", function() {
                var dataItemTitle = mar.getTitle().split('-');

                $(".info-window-area").css({display:"none"});
                $(".info-window-area").prev(".marker-area").removeClass("on");
                $(".info-window-area.iw-cart").prev(".marker-area").children("img").attr("src","assets/img/mk_attraction.png");

                if (dataItemTitle.length > 1) {
                    var dataItemType = dataItemTitle[0];
                    var dataItemId = dataItemTitle[1];

                    $(".info-window-area#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                    $(".info-window-area#iw-" + dataItemType + "-" + dataItemId).prev(".marker-area").addClass("on");
                    $(".info-window-area#iw-" + dataItemType + "-" + dataItemId).prev(".marker-area").children("img").attr("src","assets/img/mk_attraction_chk.png");
                    
                    if ($(".c-tourcart .tourcart-area .tourcart-list>li").length > 0) {
                    	$(".c-tourcart .tourcart-area .tourcart-list>li").removeClass("on");
                        $(".c-tourcart .tourcart-area .tourcart-list>li[data-cart-idx='" + mdata.cartId + "']").addClass("on");
                    }
                }

                map.setCenter(mar.getPosition());
                map.setLevel(3);
            });

            markerdata["cart-" + mdata.cartId] = mar;
        }
    });
    
    $(".cart-info-window").each(function() {
        var dataItemType = $(this).attr("data-item-type");
        var dataItemId = $(this).attr("data-item-id");
        var dataItemWidth = $(this).outerWidth() + 20 + 39;
        
        $(this).parent().prev().css({display:"none"});
        $(this).parent().parent().css({display:"none",height:'0px'});
        $(this).parent().parent().addClass("info-window-area iw-" + dataItemType);
        $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemId);
        $(this).parent().parent().prev().addClass("marker-area m-" + dataItemType);
        $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemId);
        $(this).parent().css({'width':dataItemWidth + 'px','top':'63px','left':'50%','transform':'translateX(-50%)'});
    });
}

//검색 마커
function searchMarker() {
    var mjson = {
        'values': [
            {
                'searchId': '1',
                'searchName': '우도잠수함 제주씨월드(주)',
                'searchLatitude': '33.4719126653253',
                'searchLongitude': '126.933104794189',
                'searchType': 'activity',
            },
            {
                'searchId': '2',
                'searchName': '우도다이브',
                'searchLatitude': '33.496780771547',
                'searchLongitude': '126.944610220836',
                'searchType': 'activity',
            },
            {
                'searchId': '3',
                'searchName': '우도제트',
                'searchLatitude': '33.4936503354111',
                'searchLongitude': '126.951100799822',
                'searchType': 'activity',
            },
            {
                'searchId': '4',
                'searchName': '우도징기스칸승마체험',
                'searchLatitude': '33.5148835469277',
                'searchLongitude': '126.949513620952',
                'searchType': 'attraction',
            },
            {
                'searchId': '5',
                'searchName': '우도 앨리샤 승마장',
                'searchLatitude': '33.492785557078825',
                'searchLongitude': '126.96057796208342',
                'searchType': 'attraction',
            }
        ]
    }
    
    mjson.values.forEach(mdata=>{
        if (mdata.searchLatitude != null && mdata.searchLongitude != null) {
            var pos = new kakao.maps.LatLng(mdata.searchLatitude, mdata.searchLongitude);
            var mar = new kakao.maps.Marker({
                map: map,
                position: pos,
                title: "search-" + mdata.searchId,
                image: new kakao.maps.MarkerImage("assets/img/mk_attraction_search.png", new kakao.maps.Size(30,30), {offset: new kakao.maps.Point(15,15)})
            });

            mar.setMap(map);
            markers.push(mar);
            
            //검색 마커 링크
            var smLink = "";
            if (mdata.searchType == "attraction") {
                smLink = "attraction-detail.html";
            } else if (mdata.searchType == "activity") {
                smLink = "activity-detail.html";
            }
            
            var shiwHtml = "";
            shiwHtml += "<div class='search-info-window' data-item-type='search' data-item-id='" + mdata.searchId + "'>";
            shiwHtml += "    <div class='iw-tit cf'>";
            shiwHtml += "        <a href='" + smLink + "' class='iw-tit-name'>" + mdata.searchName + "</a>";
            shiwHtml += "        <a href='https://map.kakao.com/link/search/" + mdata.searchName + "' target='_blank' class='iw-tit-icon'><img src='assets/img/icon_map.png' alt='지도보기'></a>";
            shiwHtml += "    </div>";
            shiwHtml += "</div>";

            mar.win = new kakao.maps.InfoWindow({
                position: pos,
                content: shiwHtml
            });

            mar.win.open(map, mar);
            
            kakao.maps.event.addListener(mar, "click", function() {
                var dataItemTitle = mar.getTitle().split('-');

                $(".info-window-area").css({display:"none"});
                $(".info-window-area").prev(".marker-area").removeClass("on");

                if (dataItemTitle.length > 1) {
                    var dataItemType = dataItemTitle[0];
                    var dataItemId = dataItemTitle[1];

                    $(".info-window-area#iw-" + dataItemType + "-" + dataItemId).css({display:'block'});
                    $(".info-window-area#iw-" + dataItemType + "-" + dataItemId).prev(".marker-area").addClass("on");
                    
                    if ($(".c-search .search-area .search-map-list>li").length > 0) {
                        var selectSearchObj = $(".c-search .search-area .search-map-list>li[data-search-idx='" + mdata.searchId + "']");
                        
                    	$(".c-search .search-area .search-map-list>li").removeClass("on");
                        $(selectSearchObj).addClass("on");
                        
                        if ($(selectSearchObj).length > 0 && $(".c-search .search-area .search-map-add #search-address").length > 0) {
                            var selectSearchAddr = $(selectSearchObj).find(".addr").text();
                            
                            $(".c-search .search-area .search-map-add #search-address").val(selectSearchAddr);
                        }
                    }
                }

                map.setCenter(mar.getPosition());
                map.setLevel(5);
            });

            markerdata["search-" + mdata.searchId] = mar;
        }
    });
    
    map.setCenter(new kakao.maps.LatLng(mapLatitude,mapLongitude));
    map.setLevel(7);
    
    $(".search-info-window").each(function() {
        var dataItemType = $(this).attr("data-item-type");
        var dataItemId = $(this).attr("data-item-id");
        var dataItemWidth = $(this).outerWidth() + 20 + 39;
        
        $(this).parent().prev().css({display:"none"});
        $(this).parent().parent().css({display:"none",height:'0px'});
        $(this).parent().parent().addClass("info-window-area iw-" + dataItemType);
        $(this).parent().parent().attr("id","iw-" + dataItemType + "-" + dataItemId);
        $(this).parent().parent().prev().addClass("marker-area m-" + dataItemType);
        $(this).parent().parent().prev().attr("id","m-" + dataItemType + "-" + dataItemId);
        $(this).parent().css({'width':dataItemWidth + 'px','top':'63px','left':'50%','transform':'translateX(-50%)'});
    });
}

//인포윈도우 닫기
function closeInfoWindow(type, obj) {
    $(obj).closest(".info-window-area").css({display:"none"});
    $(obj).closest(".info-window-area").prev(".marker-area").removeClass("on");
}

//지도에서 위치보기
function markerPosition(type, id) {
    if (type == "bus") {
        $(".info-window-area.iw-" + type).prev(".marker-area").removeClass("on");
        
        $(".info-window-area#iw-" + type + "-" + id).prev(".marker-area").addClass("on");
    } else {
        $(".info-window-area.iw-" + type).css({display:"none"});
        $(".info-window-area.iw-" + type).prev(".marker-area").removeClass("on");
        
        if (type == "cart") {
            $(".info-window-area.iw-" + type).prev(".marker-area").children("img").attr("src","assets/img/mk_attraction.png");
        }
        
        if (type == "station") {
            stationInfoWindow("click", id, "");
        }

        $(".info-window-area#iw-" + type + "-" + id).css({display:'block'});
        $(".info-window-area#iw-" + type + "-" + id).prev(".marker-area").addClass("on");
        
        if (type == "cart") {
            $(".info-window-area#iw-" + type + "-" + id).prev(".marker-area").children("img").attr("src","assets/img/mk_attraction_chk.png");
        }
    }
    
    if (markerdata.hasOwnProperty(type + "-" + id)) {
        map.setCenter(markerdata[type + "-" + id].getPosition());
        
        if (type == "search") {
            map.setLevel(5);
        } else {
            map.setLevel(3);
        }
    }
}

//지도에서 위치보기 해제
function markerPositionClear(type, id) {
    if (type == "bus") {
        $(".info-window-area#iw-" + type + "-" + id).prev(".marker-area").removeClass("on");
    } else {
        $(".info-window-area#iw-" + type + "-" + id).css({display:"none"});
        $(".info-window-area#iw-" + type + "-" + id).prev(".marker-area").removeClass("on");
        
        if (type == "cart") {
            $(".info-window-area#iw-" + type + "-" + id).prev(".marker-area").children("img").attr("src","assets/img/mk_attraction.png");
        }
    }
}

//지도위에 표시되고 있는 마커를 모두 제거
function removeMarker() {    
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    
    markers = [];
    markerdata = {};
    
    $(".info-window-area").each(function() {
        $(this).remove();
    });
    
    $(".marker-area").each(function() {
        $(this).remove();
    });
}

//지도위에 표시되고 있는 라인을 모두 제거
function removePolyline() {    
    for (var i = 0; i < polylines.length; i++) {
    	polylines[i].setMap(null);
    }
    
    polylines = [];
}

//지도위에 표시되고 있는 클러스터를 모두 제거
function removeClusterer() {    
    clusterer.clear();
}
//6차 수정 부분 END

