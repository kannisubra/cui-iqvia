angular.module('applications')
.controller('fitbitData1Ctrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false
    console.log('fitbitData1: onload: KANNI');

    // KANNI FITBIT
    //Steps and Activity
    $scope.getStepsMinutes = function (){
        console.log('getFitbitData');
        API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
            .then(res=>{
                myApplications.activity = res;
                console.log("restingHeartRate value is"+myApplications.activity[0].datapoints[0].value);

                $scope.lightlyActiveMins = myApplications.activity[0].datapoints[1].value;
                console.log("lightlyActiveMinutes value is"+myApplications.activity[0].datapoints[1].value);

                console.log("marginalCalories value is"+myApplications.activity[0].datapoints[2].value);

                $scope.userSteps = myApplications.activity[0].datapoints[3].value;
                console.log("steps value is"+myApplications.activity[0].datapoints[3].value);

                console.log("veryActiveMinutes value is"+myApplications.activity[0].datapoints[4].value);
                console.log("sedentaryMinutes value is"+myApplications.activity[0].datapoints[5].value);
            }).fail(err=>{
                console.log(err); 
        })

        API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','ef6928b8-cd4e-43c8-8862-71f5dbae1137']]})
            .then(res=>{
                myApplications.heartRate = res;

                $scope.myHeartRate = myApplications.heartRate[0].datapoints[1].value;
                console.log("data0: "+myApplications.heartRate[0].datapoints[0].value+'\ndata1: '+myApplications.heartRate[0].datapoints[1].value);

                $scope.numOfRecords = res.length/2;
                console.log('res:'+res.length);

                $scope.resultsArray();
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

    $scope.resultsArray = function(){
        var data1Array = [];
        var data2Array = [];

        for (var i = 0; i<$scope.numOfRecords; i++) {
            // console.log('pulse: '+myApplications.heartRate[i].datapoints[1].value);
            data1Array.push(myApplications.heartRate[i].datapoints[1].value);
            console.log('data1Array'+ data1Array);
        }
        var chart = c3.generate({
            bindto: '#chart1',
            data: {
                columns: [
                // ['data1', 30, 200, 100, 400, 150, 250]
                ['pulse'].concat(data1Array)
                ]
            },
            size: {
                width: 337
            }
        });
        var chart2 = c3.generate({
            bindto: '#chart2',
            data: {
                columns: [
                // ['data1', 30, 200, 100, 400, 150, 250]
                ['pulse'].concat(data1Array)
                ]
            },
            size: {
                width: 337
            }
        });
    }



})
