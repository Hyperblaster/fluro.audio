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
                function serialize(obj) {
                    var str = [];
                    for(var p in obj)
                        if (obj.hasOwnProperty(p)) {
                            str.push(p + "=" + obj[p]);
                        }
                    return str.join("&");
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
                var template = '<iframe width="100%" height="130" scrolling="no" frameborder="no" ng-src="{{soundcloudEmbedUrl | trustSoundcloud}}"></iframe>';
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
