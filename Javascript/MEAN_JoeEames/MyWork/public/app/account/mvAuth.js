angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
    return {
        authenticateUser: function(username, password){
            var dfd = $q.defer();

            $http.post('/login', {username:username, password:password}).then(function(res){
                if (res.data.success) {
                    var user = new mvUser;
                    angular.extend(user, response.data.user);
                    mvIdentity.currentUser = res.data.user;
                    dfd.resolve(true)
                }
                else {
                    dfd.resolve(false)
                }
                return dfd.promise;

            });
        },

        createUser:  function(newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();

            newuser.$save().then(function() {
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            })
            return dfd.promise;
        },
        logoutUser: function() {
            var dfd = $d.defer();
            $http.post('/logout', {logout:true}).then(function(){
                mvIdentity..currentUser = undefined;
                dfd.resolve();
            })
            return dfd.promise;
        },

        updateCurrentUser: function(newUserData) {
        var dfd = $q.defer();
            var clone - angular.copy(myIdentiy.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(function() {
                mvIdentity.currentUser = clone;
                dfd.resolve();
            }, funciton (response){dfd.reject(response.data.reason)});
            return dfd.promise;
        }
    }
        authorizeCurrentUserForRoute : function(role) {
            if (mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            },
            authorizeAuthenticatedUserForRoute : function() {
                if (mvIdentity.isAuthenticated()) {
                    return true;
                } else {
                    return $q.reject('not authorized');
                }

        }
    }
});