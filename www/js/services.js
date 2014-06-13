angular.module('openra.services', [])
.factory('serverData', function($http, $q) {
    return {
        all: function() {
            var deferred = $q.defer();
            $http({
              method: 'get',
              url: 'http://master.open-ra.org/list_json.php'
            }).success(function(data){
              deferred.resolve(data);
            }).error(function(){
              deferred.reject('There was an error fetching serverdata.')
            })
            return deferred.promise;
        }
    };
})
.factory('mapData', function($http, $q) {
    return {
        getMap: function(hash) {
            var mapurl = "http://resource.openra.net/map/hash/" + hash
            var deferred = $q.defer();
            $http({
              method: 'get',
              url: mapurl
            }).success(function(data){
              deferred.resolve(data);
            }).error(function(){
              deferred.reject('There was an error fetching mapdata.')
            })
            return deferred.promise;
        }
    };
})
.factory('playerData', function($http, $q) {
    return {
        getPlayers: function() {
            var deferred = $q.defer();
            $http({
              method: 'get',
              url: 'json/players.json'
            }).success(function(data){
              deferred.resolve(data);
            }).error(function(){
              deferred.reject('There was an error fetching playerdata.')
            })
            return deferred.promise;
        }
    };
});