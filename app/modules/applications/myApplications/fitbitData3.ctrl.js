angular.module('applications')
.controller('fitbitData3Ctrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http,$interval) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false

    $scope.lightlyActiveMins = "reading device...";
    $scope.userSteps = "reading device...";
    $scope.allMins = "reading device...";
    $scope.allSteps = "reading defice...";

    var getStepsMinutes = function(){
        console.log('\nfitbitData3Ctrl\neventTemplateId: 37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5\ndeviceId: e4cb5b79-6bfb-4871-a121-ccf4a42f3ceb');

        API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','e4cb5b79-6bfb-4871-a121-ccf4a42f3ceb'],['pageSize','30']]})
            .then(res=>{
                var fitbitJSON1 = res[0];
                $scope.allMins = 0;
                $scope.allSteps = 0;
                for (var key in res[0]){
                    if(key==='datapoints'){
                        var datapointsArray = fitbitJSON1[key];
                        for (var name in datapointsArray){
                            if (datapointsArray[name].name==='lightlyActiveMinutes'){
                                console.log('Minutes='+ datapointsArray[name].value);
                                $scope.lightlyActiveMins = datapointsArray[name].value;
                                for (var i=0; i<res.length; i++){
                                    $scope.allMins += parseInt($scope.lightlyActiveMins);
                                }
                                console.log("All Minutes: "+$scope.allMins);
                            }
                            if (datapointsArray[name].name==='steps'){
                                console.log('Steps='+ datapointsArray[name].value);
                                $scope.userSteps = datapointsArray[name].value;
                                for (var i=0; i<res.length; i++){
                                    $scope.allSteps += parseInt($scope.userSteps);
                                }
                                console.log("All Steps="+$scope.allSteps);
                            }
                            if (datapointsArray[name].name==='restingHeartRate'){
                                $scope.myHeartRate = datapointsArray[name].value;
                                console.log('HR='+ datapointsArray[name].value);
                            }
                        }
                    }
                }
                $scope.$apply();
            }).fail(err=>{
                console.log(err); 
        })

    }
    getStepsMinutes();
    
    var checkAgain = $interval(getStepsMinutes, 10000);

    $scope.$on('$destroy', function() {
        $interval.cancel(checkAgain );
        console.log('STOP: deviceId:442687ae-06e7-458e-90ea-c3e88782c581');
    });
})