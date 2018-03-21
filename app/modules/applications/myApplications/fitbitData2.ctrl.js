angular.module('applications')
.controller('fitbitData2Ctrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false
    console.log('fitbitData2: onload: SONY');

    // SONY FIBIT
    //Steps and Activity for Sony
    $scope.getStepsMinutes = function(){
        API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','442687ae-06e7-458e-90ea-c3e88782c581'],['pageSize','1']]})
            .then(res=>{
                myApplications.activitySony = res;

                $scope.myHeartRate = myApplications.activitySony[0].datapoints[0].value;
                console.log("restingHeartRate value is"+myApplications.activitySony[0].datapoints[0].value);

                $scope.lightlyActiveMins = myApplications.activitySony[0].datapoints[1].value;
                console.log("lightlyActiveMinutes value is"+myApplications.activitySony[0].datapoints[1].value);
                console.log("marginalCalories value is"+myApplications.activitySony[0].datapoints[2].value);

                $scope.userSteps = myApplications.activitySony[0].datapoints[3].value;
                console.log("steps value is"+myApplications.activitySony[0].datapoints[3].value);

                // console.log("veryActiveMinutes value is"+myApplications.activitySony[0].datapoints[4].value);
                // console.log("sedentaryMinutes value is"+myApplications.activitySony[0].datapoints[5].value);
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
