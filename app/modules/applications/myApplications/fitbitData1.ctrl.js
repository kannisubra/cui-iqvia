angular.module('applications')
.controller('fitbitData1Ctrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http,$interval) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false

    $scope.lightlyActiveMins = "reading device...";
    $scope.userSteps = "reading device...";
    $scope.allMins = "reading device...";
    $scope.allSteps = "reading defice...";
    
    var getStepsMinutes = function (){
        console.log('\nfitbitData1Ctrl\neventTemplateId: 37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5\ndeviceId: ce76444c-9582-4dc3-8512-ff1a56ab62f7');

        API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','30']]})
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

        API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','ef6928b8-cd4e-43c8-8862-71f5dbae1137'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7']]})
            .then(res=>{
                var fitbitJSON1 = res[0];
                var columnData = [];
                var rowData = [];
                var myChartArray = [];

                for (var i = 0; i<res.length; i++){
                    var key = 'datapoints;'
                    for (var key in res[i]){
                        // console.log('time='+res[i].datapoints[0].value);
                        // console.log('value='+res[i].datapoints[1].value);
                        myChartArray[i] = [res[i].datapoints[0].value, res[i].datapoints[1].value];
                        // console.log('myChartArray'+ myChartArray);
                    }                
                }
                
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
                $scope.$apply();
            }).fail(err=>{
                console.log(err);  
        })


    }

    getStepsMinutes();

    var checkAgain = $interval(getStepsMinutes, 10000);

    $scope.$on('$destroy', function() {
        $interval.cancel(checkAgain );
        console.log('STOP: deviceId:ce76444c-9582-4dc3-8512-ff1a56ab62f7');
    });  

})