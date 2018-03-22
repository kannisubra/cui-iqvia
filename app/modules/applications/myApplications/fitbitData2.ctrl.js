angular.module('applications')
.controller('fitbitData2Ctrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false
    console.log('fitbitData2: onload: SONY');

    $scope.lightlyActiveMins = "reading device...";
    $scope.userSteps = "reading device...";
    
    // SONY FIBIT
    //Steps and Activity for Sony
    $scope.getStepsMinutes = function(){

        API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','442687ae-06e7-458e-90ea-c3e88782c581'],['pageSize','30']]})
            .then(res=>{
                $scope.aggregateNum = res.length;
                console.log('num:'+res.length);
                
                $scope.myHeartRate = res[0].datapoints[0].value;
                console.log("restingHeartRate: "+$scope.myHeartRate);

                $scope.lightlyActiveMins = res[0].datapoints[1].value;
                console.log("lightlyActiveMinutes: "+$scope.lightlyActiveMins);

                $scope.userSteps = res[0].datapoints[3].value;
                console.log("steps: "+$scope.userSteps);
                
                $scope.allMins = 0;
                $scope.allSteps = 0;
                for (var i=0; i<res.length/2; i++){
                    $scope.allMins += parseInt(res[i].datapoints[1].value);
                    $scope.allSteps += parseInt(res[i].datapoints[3].value);
                    console.log("res[i].datapoints[1].value"+res[i].datapoints[1].value+"\nallMins-last30: "+$scope.allMins+"\nallSteps-last30"+$scope.allSteps);
                }
                $scope.$apply();
            }).fail(err=>{
                console.log(err);
        })
    }

    $scope.getStepsMinutes();

    setInterval(function(){
        $scope.lightlyActiveMins = "updating...";
        $scope.userSteps = "updating...";
        $scope.$apply();
        $scope.getStepsMinutes();
        }, 30000)
})
