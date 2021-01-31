//Local weather
var app = angular.module('Weather', []);

app.factory('WeatherApi', function($http) {
    var obj = {};

    obj.getLoc = function() {
        return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
    };
    obj.getCurrent = function(city) {
        var api ="api.openweathermap.org/data/2.5/weather?q="+ city;
        var units = "&units=imperial";
        var cb = "&callback=JSON_CALLBACK";
        return $http.jsonp(api + city + units + cb);
    };
    return obj
});

app.controller('MainCtrl', function($scope, WeatherApi) {
    $scope.Data = {};
    $scope.Data.unit ='F';
    $scope.Data.sysChange = false;
    WeatherApi.getLoc().success(function(data) {
        var city = data.city + ',' + data.country;
        $scope.Data.city = data.city;
        WeatherApi.getCurrent(city).success(function(data) {
            CurrentWeather(data)
        });
    });

    function CurrentWeather(data) {
        $scope.Data.temp = Math.round(data.main.temp);
        $scope.Data.Cel = Math.round(data.main.temp);
        $scope.Data.des = data.weather[0].main;
        $scope.Data.Fah = Math.round( ($scope.Data.temp * 9)/5 + 32 );
        return IconGen($scope.Data.des);
    }

    $scope.Data.sys= function(){
        if($scope.Data.sysChange){
            $scope.Data.unit ='F';
            $scope.Data.temp = $scope.Data.Cel;
            return $scope.Data.sysChange = false;

        }
    };

//clock

    function newTime(){

        //Clock vars
        var date = new Date();

        //set hours to 24 hr clock
        var hours = date.getHours();
        if(hours>11) hours=hours-0;
        rhours = 360/12*hours;
        $('.hours').css('transform', 'rotate('+rhours+'deg)');


// set minutes to 60 per hour
        var minutes = date.getMinutes();
        rminutes = 360/60*minutes;
        $('.minutes').css('transform', 'rotate('+rminutes+'deg)');
//Add 0 if less than 9
        if(minutes <= 9) {
            minutes = '0' + minutes;
        }


//analog time
        $('.analog').html('<span class="hours">' + hours + '</span>' + ':' + '<span class="mins">' + minutes + '</span>');



        setTimeout(newTime, 500);
    }

    newTime();

});