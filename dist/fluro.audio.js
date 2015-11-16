
//Create Fluro UI With dependencies
angular.module('fluro.audio', [
	'fluro.config',
    'fluro.util'
]);
'use strict';



angular.module('fluro.audio')


.directive('fluroAudio', function($compile, Fluro) {

    return {
        restrict: 'E',
        replace: true,
        template: '<div class="fluro-audio audio-{{model.assetType}}"></div>',
        controller: 'FluroAudioController',
        scope: {
            model: '=ngModel',
            ngParams: '&',
        },
        link: function($scope, $element, $attrs) {

/**/
            $scope.$watch('model', function() {
                $scope.params = $scope.ngParams();

                if (!$scope.params) {
                    $scope.params = {
                        controls: 0,
                        autoplay: 0,
                        modestbranding: 1,
                        playsinline: 1,
                        showinfo: 0,
                        theme: 'light',
                        byline: 0,
                        portrait: 0,
                        title: 0
                    }
                }


                /**/
                ///////////////////////////

                var template;

                //Clear element
                $element.empty();

                switch ($scope.model.assetType) {
                    case 'soundcloud':
                        template = '<div class="audio-embed"><soundcloud-audio track-url="model.external.soundcloud" player-vars="params"/></div>';
                        break;
                    case 'upload':
                        $scope.playUrl = Fluro.apiURL + '/get/' + $scope.model._id;
                        template = '<div class="audio-embed"><audio controls><source ng-src="{{playUrl | trustfluro}}" type="{{model.mimetype}}"></audio></div>';
                        break;
                }

                //Create the template
                if (template) {
                    var cTemplate = $compile(template)($scope);
                    $element.append(cTemplate);
                }

            })
/**/
        },


    };
})

/////////////////////////////////////////////////////

.filter('trustfluro', ['$sce',
    function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }
])

/////////////////////////////////////////////////////

.controller('FluroAudioController', function($scope) {



    //console.log('Inline video', $scope.model)
    // var urlString = $fluro_url + '/get/' + $scope.id;

    //$scope.url = urlString;
})

/////////////////////////////////////////////////////

.service('AudioTools', function($http) {

    var controller = {}

    /////////////////////////////////////////////////////
/*
    controller.getSoundcloudID = function(url) {
        //Vimeo RegExp
        var reg = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
        var match = url.match(reg);
        if (match) {
            return match[3];
        }
    }
    /**/

    /////////////////////////////////////////////////////

    return controller;
});
'use strict';

angular.module('fluro.audio')
/**/
.service('SoundcloudEmbedSettings', function($http) {

    var controller = {};

    
    /////////////////////////
    /**
    controller.getAudioInformation = function(vimeoID) {
        return $http.get('http://vimeo.com/api/v2/video/'+vimeoID+'.output');
    }
    /**/
    /////////////////////////

    return controller;
})

    .directive('soundcloudAudio', function($compile, SoundcloudEmbedSettings) {
        return {
            restrict: 'E',
             scope: {
                trackUrl: '=',
                playerVars: '='
            },
            link: function($scope, $element, $attrs) {

                /**
                /////////////////////////////////////

                $scope.getAudioInformation = function() {
                    if($scope.videoId) {
                        return SoundcloudEmbedSettings.getAudioInformation($scope.videoId);
                    }
                }

                /////////////////////////////////////
                /**/
                
                function getSoundcloudID(url) {
                    //Vimeo RegExp
                    var reg = /https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
                    var match = url.match(reg);
                    if (match) {
                        return match[3];
                    }
                }

                /////////////////////////////////////
                

                //Listen for changes
                $scope.$watch('trackUrl + playerVars', function() {

                    /*
                    var AudioID;

                    if ($scope.trackSrc) {
                        AudioID = $scope.trackSrc;
                    }
                    else if ($scope.audioUrl) {
                        AudioID = getSoundcloudID($scope.audioUrl);
                    }
                    */

                    //////////////////////////////
                   
                    //Parameters
                    var params = '';

                    if ($scope.playerVars) {
                        for (var key in $scope.playerVars) {
                            params += '&' + key + '=' + $scope.playerVars[key];
                        }
                    }

                    //Actual URL
                    //$scope.soundcloudEmbedUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/231388456&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';
                    $scope.soundcloudEmbedUrl  = "https://w.soundcloud.com/player/?url=" + $scope.trackUrl + "&" + serialize($scope.playerVars);

                    //player.vimeo.com/video/'+ AudioID +'?player_id='+ AudioID + params;
                })


                /////////////////////////////////////


                //The template
                var template = '<iframe width="100%" height="600" scrolling="no" frameborder="no" ng-src="{{soundcloudEmbedUrl}}"></iframe>';
                //var template = '<iframe width="100%" height="600" scrolling="no" frameborder="no" ng-src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/231388456&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';
                //'<iframe ng-src="{{vimeoEmbedURL | trustVimeo}}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

                //Compile the goodness
                var cTemplate = $compile(template)($scope);

                //Replace the original tag with our embed
                $element.replaceWith(cTemplate);
            }
        };
    })

.filter('trustSoundcloud', ['$sce',
    function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }
])
/**/
