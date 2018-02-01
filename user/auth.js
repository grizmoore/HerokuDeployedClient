$(function() {
    $.extend( WorkoutLog, {
       signup: function() {
             var username = $("#su_username").val();
             var password = $("#su_password").val();
             var user = {user:  {username: username, password: password }};
             var signup = $.ajax({
                type: "POST", 
                url: WorkoutLog.API_BASE + "login", 
                data: JSON.stringify(user), 
                contentType: "application/json"
             });
             signup.done(function(data) {
                if (data.sessionToken) {
                   WorkoutLog.setAuthHeader(data.sessionToken);
                   WorkoutLog.definition.fetchAll();
                   WorkoutLog.log.fetchAll()
                }
                $("#signup-modal").modal("hide");
                $(".disabled").removeClass("disabled");
                $("#loginout").text("Logout");
                // go to define tab
                $('.nav-tabs a[href="#define"]').tab('show');
                $("#su_username").val("");
                $("#su_username").val("");
                $('a[href="#define"]').tab('show')
                $('a[href="#define"]').tab("show")
             })
             .fail(function() {
                $("#su_error").text("There was an issue with your username").show();
             });
       },
       //login method
       login: function() {
            var username = $("#li_username").val();
            var password = $("#li_password").val();
            var user = {
                user:{
                    username: username, 
                    password: password 
                }
            };
            //login post
            var login = $.ajax({
                type: "POST", 
                url: WorkoutLog.API_BASE + "login", 
                data: JSON.stringify(user), 
                contentType: "application/json"
            });
            //login fail/done
            login.done(function(data) {
                if (data.sessionToken) {
                WorkoutLog.setAuthHeader(data.sessionToken);
                WorkoutLog.definition.fetchAll();
                WorkoutLog.log.fetchAll();
                }
                // TODO: add logic to set user and auth token	
                $("#login-modal").modal("hide");
                $(".disabled").removeClass("disabled");
                $("#loginout").text("Logout");

                $('#li_username').val("");
                $('#li_password').val("");
                $('a[href="#define"]').tab("show");
            })
            .fail(function() {
                $("#li_error").text("There was an issue with your username or password").show();
            });
       },
 
       loginout: function() {
          if (window.localStorage.getItem("sessionToken")) {
             window.localStorage.removeItem("sessionToken");
             $("#loginout").text("Login");
          }
          //TODO: on logout make sure these things are disabled
          
       }
    });
 
    // bind events
    $("#login").on("click", WorkoutLog.login);
    $("#signup").on("click", WorkoutLog.signup);
    $("#loginout").on("click", WorkoutLog.loginout);
 
    if (window.localStorage.getItem("sessionToken")) {
       $("#loginout").text("Logout");
    }
 
 });