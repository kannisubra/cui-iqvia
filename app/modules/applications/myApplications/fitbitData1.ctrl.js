angular.module('applications')
.controller('fitbitData1Ctrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false

    $scope.lightlyActiveMins = "reading device...";
    $scope.userSteps = "reading device...";
    $scope.allMins = "reading device...";
    $scope.allSteps = "reading defice...";
    
    // KANNI FITBIT
    //Steps and Activity
    $scope.getStepsMinutes = function (){
        console.log('getFitbitData: KANNI, fitbitData1Ctrl');
        API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
            .then(res=>{
                $scope.fitbitJSON = res[0];
                $scope.lightlyActiveMins = $scope.fitbitJSON.datapoints[1].value;
                console.log("lightlyActiveMinutes: "+$scope.lightlyActiveMins);

                $scope.userSteps = $scope.fitbitJSON.datapoints[3].value;
                console.log("steps: "+$scope.userSteps);
                
                // myApplications.activity = res;

                // console.log("restingHeartRate: "+$scope.fitbitJSON.datapoints[0].value);

                // console.log("marginalCalories: "+$scope.fitbitJSON.datapoints[2].value);

                // console.log("veryActiveMinutes: "+$scope.fitbitJSON.datapoints[4].value);
                // console.log("sedentaryMinutes: "+$scope.fitbitJSON.datapoints[5].value);
                $scope.$apply();
            }).fail(err=>{
                console.log(err); 
        })

        API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','ef6928b8-cd4e-43c8-8862-71f5dbae1137'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7']]})
            .then(res=>{
                myApplications.heartRate = res;

                $scope.myHeartRate = $scope.fitbitJSON.datapoints[0].value;
                console.log('myHeartRate: '+$scope.myHeartRate);
                
                $scope.numOfRecords = res.length/2;
                console.log('res:'+res.length);

                $scope.resultsArray();
                $scope.$apply();
            }).fail(err=>{
                console.log(err);  
        })

        API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','30']]})
            .then(res=>{
                $scope.aggregateNum = res.length;
                console.log('num:'+res.length);
                $scope.aggregateObj = res;
                $scope.allFitbitJSON = res[0];

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

    $scope.resultsArray = function(){

        var data1Array = [];
        var data2Array = [];
        var data3Array = [];
        
        //bob stuff
        var columnData = [];
        var rowData = [];
        var myChartArray = [];

        for (var i = 0; i<$scope.numOfRecords; i++) {
            // console.log('pulse: '+myApplications.heartRate[i].datapoints[1].value);
            data1Array.push(myApplications.heartRate[i].datapoints[1].value);
            myChartArray[i] = [myApplications.heartRate[i].datapoints[0].value, myApplications.heartRate[i].datapoints[1].value];
            console.log('data1Array'+ data1Array);
        }

        // sort the chart
        myChartArray.sort();
        columnData[0] = 'x';
        rowData[0] = 'Heart Rate';
        for (var j = 0; j<myChartArray.length; j++) {
            columnData[j+1] = new Date(('2018-03-22 ' + myChartArray[j][0]).replace(/-/g, "/"));             
            rowData[j+1] = myChartArray[j][1];
        }
        var startAxis = columnData[1];
        var endAxis = columnData[columnData.length -1];


        var chart = c3.generate({
            bindto: '#chart1',
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
        var chart2 = c3.generate({
            bindto: '#chart2',
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



})
