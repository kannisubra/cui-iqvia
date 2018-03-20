angular.module('applications')
.controller('allTrialsCtrl', function(API,APIError,APIHelpers,DataStorage,Loader,User,$filter,$pagination,$q,$scope,$state,$stateParams,$http) {
	const allTrials = this
    const userId = User.user.id
    const loaderName = 'allTrials.'
    let checkedLocalStorage = false
    API.cui.getUsersHeartRateHistory({'qs':[['sortBy','-creation'],['eventTemplateId','ef6928b8-cd4e-43c8-8862-71f5dbae1137']]})
        .then(res=>{
            allTrials.heartRate = res;
            console.log("allTrialsCtrl"+allTrials.heartRate[0].datapoints[0].value);
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
        allTrials.categories.forEach((category,index)=>{
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
                    Object.assign(allTrials.list).filter(x => 
                        x.category&& $filter('cuiI18n')(x.category)===$filter('cuiI18n')(category.name)
                    ).length
                    -
                    Object.assign(allTrials.viewList).filter(x => 
                            x.category&& $filter('cuiI18n')(x.category)===$filter('cuiI18n')(category.name)
                    ).length
                )                
                if (index===allTrials.categories.length-1) {
                    $scope.$digest();
                };
            })
            .fail(err=>{
                console.log(err);
                if (index===allTrials.categories.length-1) {
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
            allTrials.list = storedData.appList
            allTrials.viewList = Object.assign(allTrials.list).filter(x => x.servicePackage.displayable===true&&x.grant.status=='active')
            allTrials.count = storedData.appCount
            allTrials.categories = storedData.categories
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
            allTrials.search = Object.assign({}, $stateParams)

            Loader.onFor(loaderName + 'categories')
            API.cui.getPersonAppCategories({personId:API.getUser()})
            .then(res => {
                APIError.offFor(loaderName + 'categories')
                allTrials.categories = res;
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

        allTrials.search.pageSize = allTrials.search.pageSize || $pagination.getUserValue() || $pagination.getPaginationOptions()[0]

        const opts = {
            personId: API.getUser(),
            useCuid:true,
            qs: APIHelpers.getQs(allTrials.search)
        }
        opts.qs.push(['grant.status','active'])
        const promises = [
            API.cui.getPersonGrantedApps(opts), 
            API.cui.getPersonGrantedAppCount(opts)
        ]

        $q.all(promises)
        .then(res => {
            allTrials.viewList = Object.assign(res[0]).filter(x => x.servicePackage.displayable===true&&x.grant.status=='active')
            allTrials.count = res[1]
            allTrials.popupCount = allTrials.count-Object.assign(res[0]).filter(x => x.servicePackage.displayable!==true || x.grant.status!=='active').length
            allTrials.list=res[0];
            // re-render pagination if available
            allTrials.reRenderPaginate && allTrials.reRenderPaginate()

            const storageData = {
                appList: allTrials.list, 
                appCount: allTrials.count, 
                categories: allTrials.categories
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

    allTrials.pageChange = (newpage) => {
        allTrials.updateSearch('page', newpage)
    }

    allTrials.updateSearch = (updateType, updateValue) => {
        switch (updateType) {
            case 'category':
            allTrials.search.page = 1
            allTrials.search['service.category'] = $filter('cuiI18n')(updateValue)
                break
        }

        // doesn't change state, only updates the url
        $state.transitionTo('applications.allTrials', allTrials.search, { notify:false })
        onLoad(true)
    }
})
