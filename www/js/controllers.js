angular.module('openra.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('BrowseCtrl', function($scope, serverData) {
	$scope.fetching = true;
	$scope.fetchServers = function() {
		serverData.all().then(function(data) {
			$scope.servers = parseData(data);
			$scope.$broadcast('scroll.refreshComplete');
			$scope.fetching = false;
		});
	}

	$scope.fetchServers();

	function parseData (data) {
		var newdata = [];
		for (i = data.length - 1; i >= 0; i--) {
		  dataset = data[i];
		  if (dataset.players != 0) {
		  	var modver = dataset['mods'].split('@');
        if (modver.length != 2) continue;
        var tag = modver[1];
        var mod = 'Unknown Mod ('+modver[0]+')';
        switch (modver[0]) {
          case 'ra': mod = "Red Alert"; break;
          case 'cnc': mod = "Tiberian Dawn"; break;
          case 'd2k': mod = "Dune 2000"; break;
          case 'fgtn': mod = "The Forgotten Chapter"; break;
          case 'to': mod = "RA: Tiberium Origins"; break;
        }
        dataset.mod = mod;
        dataset.tag = tag;
		    newdata.push(dataset);
		  }
		}
		return newdata;
	};

})

.controller('MapCtrl', function($scope, $stateParams, mapData) {
	$scope.fetching = true;
	$scope.fetchMap = function() {
		mapData.getMap($stateParams.mapId).then(function(data) {
			$scope.map = data[0];
			$scope.fetching = false;
		});
	}

	$scope.fetchMap();
})


.controller('PlayersCtrl', function($scope, $ionicModal, playerData) {

	$ionicModal.fromTemplateUrl('templates/modal.html', {
	scope: $scope,
	animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	$scope.fetchPlayers = function() {
		playerData.getPlayers().then(function(data) {
			$scope.players = data;
		});
	}

	$scope.fetchPlayers();

})
