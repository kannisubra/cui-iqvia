angular.module('applications')
.controller('fitbitData3Ctrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false
    console.log('fitbitData3: onload');



    //Steps and Activity   

    $scope.getStepsMinutes = function(){
        API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','e4cb5b79-6bfb-4871-a121-ccf4a42f3ceb'],['pageSize','1']]})
            .then(res=>{
                myApplications.activity = res;
                console.log("restingHeartRate value is"+myApplications.activity[0].datapoints[0].value);

                $scope.lightlyActiveMins = myApplications.activity[0].datapoints[1].value;
                console.log("lightlyActiveMinutes value is"+myApplications.activity[0].datapoints[1].value);

                // console.log("marginalCalories value is"+myApplications.activity[0].datapoints[2].value);

                $scope.userSteps = myApplications.activity[0].datapoints[2].value;
                console.log("steps value is"+myApplications.activity[0].datapoints[2].value);

                // console.log("veryActiveMinutes value is"+myApplications.activity[0].datapoints[4].value);
                // console.log("sedentaryMinutes value is"+myApplications.activity[0].datapoints[5].value);
                $scope.$apply();
            }).fail(err=>{
                console.log(err); 
        })

        API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','e4cb5b79-6bfb-4871-a121-ccf4a42f3ceb'],['pageSize','30']]})
            .then(res=>{
                $scope.aggregateNum = res.length;
                console.log('num:'+res.length);
                $scope.aggregateObj = res;
                $scope.allFitbitJSON = res[0];

                $scope.allMins = 0;
                $scope.allSteps = 0;
                for (var i=0; i<res.length/2; i++){
                    $scope.allMins += parseInt(res[i].datapoints[1].value);
                    $scope.allSteps += parseInt(res[i].datapoints[2].value);
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
