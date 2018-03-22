angular.module('applications')
.controller('patientDataCtrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false
    console.log('dexcom g5 ctrl');

    $scope.glucoseValue = "reading device...";

    $scope.getDexcomG5 = function(){
        API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','dccc580d-b0ae-49db-a1e8-0fa613591b31'],['deviceId','057219fe-226c-40e2-a3fc-dc115a70ef27'],['pageSize','30']]})
        .then(res=>{
            $scope.trialJSON = res;
            console.log('$scope.trialJSON: '+$scope.trialJSON)
            $scope.glucoseValue = res[0].datapoints[9].value;
            console.log('$scope.glucoseValue: '+$scope.glucoseValue);

            $scope.numOfRecords = res.length;
            console.log('$scope.numOfRecords: '+$scope.numOfRecords);
            $scope.resultsArray();
            $scope.$apply();
        }).fail(err=>{
            console.log(err);  
        })
    }

    $scope.getDexcomG5();

    setInterval(function(){
        $scope.glucoseValue = "updating...";
        $scope.$apply();
        $scope.getDexcomG5();
        }, 30000)

    $scope.resultsArray = function(){
        //bob stuff
        var columnData = [];
        var rowData = [];
        var myChartArray = [];

        for (var i = 0; i<$scope.numOfRecords; i++) {
            // console.log('pulse: '+myApplications.heartRate[i].datapoints[1].value);
            myChartArray[i] = [$scope.trialJSON[i].datapoints[8].value, $scope.trialJSON[i].datapoints[9].value];
        }

        // sort the chart
        myChartArray.sort();
        columnData[0] = 'x';
        rowData[0] = 'Glucose';
        for (var j = 0; j<myChartArray.length; j++) {
            columnData[j+1] = new Date(myChartArray[j][0].replace(/-/g, "/"))            
            rowData[j+1] = myChartArray[j][1];
        }
        var startAxis = columnData[1];
        var endAxis = columnData[columnData.length -1];


        var chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: [
                    columnData,
                    rowData
                ],
                type: 'spline'
            },
            point: {
                show: false
            }, 
            axis: {
                x: {
                    type: 'timeseries',                   
                    tick: {
                        // this also works for non timeseries data
                        fit: true,
                        count: 4,
                        format: '%H:%M:%S'
                    }
                }
            }
        });
    }





    // API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','442687ae-06e7-458e-90ea-c3e88782c581'],['pageSize','1']]})
    //     .then(res=>{
    //         myApplications.activitySony = res;
    //         console.log("restingHeartRate value is"+myApplications.activitySony[0].datapoints[0].value);

    //         $scope.lightlyActiveMins = myApplications.activitySony[0].datapoints[1].value;
    //         console.log("lightlyActiveMinutes value is"+myApplications.activitySony[0].datapoints[1].value);
    //         console.log("marginalCalories value is"+myApplications.activitySony[0].datapoints[2].value);

    //         $scope.stepsSony = activitySony[0].datapoints[3].value;
    //         console.log("steps value is"+myApplications.activitySony[0].datapoints[3].value);

    //         console.log("veryActiveMinutes value is"+myApplications.activitySony[0].datapoints[4].value);
    //         console.log("sedentaryMinutes value is"+myApplications.activitySony[0].datapoints[5].value);
    //     }).fail(err=>{
    //         console.log(err);
    // })

})
