angular.module('applications')
.controller('myApplicationsCtrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const myApplications = this
    const userId = User.user.id
    const loaderName = 'myApplications.'
    let checkedLocalStorage = false
   //pulse kanni
   API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','ef6928b8-cd4e-43c8-8862-71f5dbae1137']]})
            .then(res=>{
                    myApplications.heartRate = res;
            console.log("kanni"+myApplications.heartRate[0].datapoints[0].value);
        }).fail(err=>{
                console.log(err);
               
        }) 
   //out of range kanni     
   API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','59c167ac-529d-4e49-bd90-5771e30fa332'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
            .then(res=>{
                    myApplications.outofrange = res;
            console.log("min value is"+myApplications.outofrange[0].datapoints[0].value);
            console.log("max value is"+myApplications.outofrange[0].datapoints[1].value);
            console.log("minutes value is"+myApplications.outofrange[0].datapoints[2].value);
            console.log("caloriesout value is"+myApplications.outofrange[0].datapoints[3].value);
        }).fail(err=>{
                console.log(err);
               
        }) 
   //fatburn kanni     
   API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','49556f1f-bc41-4a91-b048-7832f62dcb5c'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
            .then(res=>{
                    myApplications.fatburnKanni = res;
            console.log("min value is"+myApplications.fatburnKanni[0].datapoints[0].value);
            console.log("max value is"+myApplications.fatburnKanni[0].datapoints[1].value);
            console.log("minutes value is"+myApplications.fatburnKanni[0].datapoints[2].value);
            console.log("caloriesout value is"+myApplications.fatburnKanni[0].datapoints[3].value);
        }).fail(err=>{
                console.log(err);
               
        })
   //cardio kanni     
   API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','3cf284cf-9699-4945-a5a8-f7fe6a939bc2'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
            .then(res=>{
                    myApplications.cardioKanni = res;
            console.log("min value is"+myApplications.cardioKanni[0].datapoints[0].value);
            console.log("max value is"+myApplications.cardioKanni[0].datapoints[1].value);
            console.log("minutes value is"+myApplications.cardioKanni[0].datapoints[2].value);
            console.log("caloriesout value is"+myApplications.cardioKanni[0].datapoints[3].value);
        }).fail(err=>{
                console.log(err);
               
        })
   //peak kanni     
   API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','3b41bfb4-42ea-4858-9e53-c3bcca60a337'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
            .then(res=>{
                    myApplications.peakKanni = res;
            console.log("min value is"+myApplications.peakKanni[0].datapoints[0].value);
            console.log("max value is"+myApplications.peakKanni[0].datapoints[1].value);
            console.log("minutes value is"+myApplications.peakKanni[0].datapoints[2].value);
            console.log("caloriesout value is"+myApplications.peakKanni[0].datapoints[3].value);
        }).fail(err=>{
                console.log(err);
               
        })        
    //Steps and Activity   
   API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','ce76444c-9582-4dc3-8512-ff1a56ab62f7'],['pageSize','1']]})
            .then(res=>{
                    myApplications.activity = res;
            console.log("restingHeartRate value is"+myApplications.activity[0].datapoints[0].value);
            console.log("lightlyActiveMinutes value is"+myApplications.activity[0].datapoints[1].value);
            console.log("marginalCalories value is"+myApplications.activity[0].datapoints[2].value);
            console.log("steps value is"+myApplications.activity[0].datapoints[3].value);
            console.log("veryActiveMinutes value is"+myApplications.activity[0].datapoints[4].value);
            console.log("sedentaryMinutes value is"+myApplications.activity[0].datapoints[5].value);
        }).fail(err=>{
                console.log(err);
               
        })     
       //Steps and Activity for Sony  
   API.cui.getUsersActivityHistory({'qs':[['sortBy','-creation'],['eventTemplateId','37eaf6a0-14c7-47fd-a8d8-753dccd2f6f5'],['deviceId','442687ae-06e7-458e-90ea-c3e88782c581'],['pageSize','1']]})
            .then(res=>{
                    myApplications.activitySony = res;
            console.log("restingHeartRate value is"+myApplications.activitySony[0].datapoints[0].value);
            console.log("lightlyActiveMinutes value is"+myApplications.activitySony[0].datapoints[1].value);
            console.log("marginalCalories value is"+myApplications.activitySony[0].datapoints[2].value);
            console.log("steps value is"+myApplications.activitySony[0].datapoints[3].value);
            console.log("veryActiveMinutes value is"+myApplications.activitySony[0].datapoints[4].value);
            console.log("sedentaryMinutes value is"+myApplications.activitySony[0].datapoints[5].value);
        }).fail(err=>{
                console.log(err);
               
        })         
    /*$http({
        method : "GET",
        url : "https://api.covapp.io/eventaudit/v1/eventAudits?sortBy=-creation&eventTemplateId=ef6928b8-cd4e-43c8-8862-71f5dbae1137"
    }).then(function mySuccess(response) {
        console.log(response);
        $scope.myWelcome = response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });*/
        
    // HELPER FUNCTIONS END -----------------------------------------------------------------------------------
    const getCountsOfcategories=()=>{
        myApplications.categories.forEach((category,index)=>{
            console.log($filter('cuiI18n')(category.name))
            let opts = {
                personId: userId,
                useCuid:true
            }
            opts.qs=[['service.category',$filter('cuiI18n')(category.name)]]
            API.cui.getPersonGrantedAppCount(opts)
            .then(res=>{
                //Need to minus each category count with not displayble and other than active apps according to thier categories
                category.count=res
                -
                (
                    Object.assign(myApplications.list).filter(x => 
                        x.category&& $filter('cuiI18n')(x.category)===$filter('cuiI18n')(category.name)
                    ).length
                    -
                    Object.assign(myApplications.viewList).filter(x => 
                            x.category&& $filter('cuiI18n')(x.category)===$filter('cuiI18n')(category.name)
                    ).length
                )                
                if (index===myApplications.categories.length-1) {
                    $scope.$digest();
                };
            })
            .fail(err=>{
                console.log(err);
                if (index===myApplications.categories.length-1) {
                    $scope.$digest();
                };
            })            
        })
    }

    // HELPER FUNCTIONS END -----------------------------------------------------------------------------------

    // ON LOAD START ------------------------------------------------------------------------------------------
    const loadStoredData = () => {
        // Check DataStorage if this page has been loaded before. We initially populate this screen
        // with data that was previously retrieved from the API while we redo calls to get the up to date data.
        const storedData = DataStorage.getType('myApplicationsList')

        if (storedData) {
            Loader.onFor(loaderName + 'apps')
            myApplications.list = storedData.appList
            myApplications.viewList = Object.assign(myApplications.list).filter(x => x.servicePackage.displayable===true&&x.grant.status=='active')
            myApplications.count = storedData.appCount
            myApplications.categories = storedData.categories
            Loader.offFor(loaderName + 'apps')
        }

        checkedLocalStorage = true
        onLoad(false)
    }

    const onLoad = (previouslyLoaded) => {
        if (previouslyLoaded) {
            Loader.onFor(loaderName + 'reloadingApps')
        }
        else {
            checkedLocalStorage ? Loader.onFor(loaderName + 'updating') : Loader.onFor(loaderName + 'apps')
            myApplications.search = Object.assign({}, $stateParams)

            Loader.onFor(loaderName + 'categories')
            API.cui.getPersonAppCategories({personId:API.getUser()})
            .then(res => {
                APIError.offFor(loaderName + 'categories')
                myApplications.categories = res;
                getCountsOfcategories()
                APIError.offFor(loaderName + 'categories')
            })
            .fail(err => {
            	console.error('There was an error in fetcting user\'s app category details ' +err)
                APIError.onFor(loaderName + 'categories')
            })
            .done(() => {
                Loader.offFor(loaderName + 'categories')
                $scope.$digest()
            })
        }

        myApplications.search.pageSize = myApplications.search.pageSize || $pagination.getUserValue() || $pagination.getPaginationOptions()[0]

        const opts = {
            personId: API.getUser(),
            useCuid:true,
            qs: APIHelpers.getQs(myApplications.search)
        }
        opts.qs.push(['grant.status','active'])
        const promises = [
            API.cui.getPersonGrantedApps(opts), 
            API.cui.getPersonGrantedAppCount(opts)
        ]

        $q.all(promises)
        .then(res => {
            myApplications.viewList = Object.assign(res[0]).filter(x => x.servicePackage.displayable===true&&x.grant.status=='active')
                myApplications.count = res[1]
            myApplications.popupCount = myApplications.count-Object.assign(res[0]).filter(x => x.servicePackage.displayable!==true || x.grant.status!=='active').length
            myApplications.list=res[0];
            // re-render pagination if available
            myApplications.reRenderPaginate && myApplications.reRenderPaginate()

            const storageData = {
                appList: myApplications.list, 
                appCount: myApplications.count, 
                categories: myApplications.categories
            }
            DataStorage.setType('myApplicationsList', storageData)
            APIError.offFor(loaderName + 'apps')
        })
        .catch(err => {
        	console.error('There was an error in fetcting user\'s granted applications ' +err)
            APIError.onFor(loaderName + 'apps')
        })
        .finally(() => {
            if (previouslyLoaded) {
                Loader.offFor(loaderName + 'reloadingApps')
            } 
            else {
                checkedLocalStorage ? Loader.offFor(loaderName + 'updating') : Loader.offFor(loaderName + 'apps')
            }
        })
    }

    loadStoredData()

    // ON LOAD END --------------------------------------------------------------------------------------------

    // ON CLICK FUNCTIONS START -------------------------------------------------------------------------------

    myApplications.pageChange = (newpage) => {
        myApplications.updateSearch('page', newpage)
    }

    myApplications.updateSearch = (updateType, updateValue) => {
        switch (updateType) {
            case 'category':
                myApplications.search.page = 1
                myApplications.search['service.category'] = $filter('cuiI18n')(updateValue)
                break
        }

        // doesn't change state, only updates the url
        $state.transitionTo('applications.myApplications', myApplications.search, { notify:false })
        onLoad(true)
    }
})
