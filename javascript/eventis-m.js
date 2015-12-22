if (Meteor.isClient) {
    Template.main.helpers({
        //find user geo-location
        geoloc: function() {
            var gloc = Geolocation.latLng();
            Session.set('geo', gloc);
            //set user's date
            Session.set('date', new Date());
            return gloc;
        }
    });

    Template.search.events({
/*        'click #crEventTitle': function(e){
            $('#eventCreate').toggle();
        },*/
        'submit #searchbar': function(event){
            event.preventDefault();
            Session.set('tag', undefined)
            Session.set('orgID',undefined);
            Session.set('search', $('[name="searchbar"]').val());
            //if searchbar moves with scroll, uncomment below
            //$('*').animate({ scrollTop: 0 }, "slow");
        }
    });
    Template.header.events({
        'click .logo': function(event){
            Session.set('tag', undefined)
            Session.set('orgID',undefined);
            Session.set('search', undefined);
            Session.set('orgID', undefined);
        }
    });
    Template.tagView.helpers({
        currentTag : function(){
            //Session.set('orgID',null);
            var tag = String(Session.get('fparam'));
            return tag;
        }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}
if (Meteor.isServer) {
    Meteor.startup(function () {
        console.log('Server started');
        // code to run on server at startup
        EventDB._ensureIndex({
            'name': 'text',
            'descr': 'text'
        });
    });

    Accounts.onCreateUser(function(options, user) {
        user.profile = options.profile ? options.profile :{};
        user.profile.subscribedTags = [];
        user.profile.subscribedOrgs = [];
        user.profile.subscribedWords = [];
        console.log(user._id);
        return user;
    });
}
