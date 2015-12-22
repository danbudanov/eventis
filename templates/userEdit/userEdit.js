if (Meteor.isClient) {
    Template.userEdit.helpers({
        'tagList': function() {
            var userId = Session.get("editUser");
            Meteor.call("getUser", userId, function(error, user) {
                return user.profile.subscribedTags;
            });
        },
        'orgList': function() {
            var userId = Session.get("editUser");
            Meteor.call("getUser", userId, function(error, user) {
                return user.profile.subscribedOrgs;
            });
        },
        'wordList': function() {
            var userId = Session.get("editUser");
            Meteor.call("getUser", userId, function(error, user) {
                return user.profile.subscribedWords;
            });
        }
    });

    Template.userEdit.events({
        'submit': function(e) {
            e.preventDefault();
            var userId = Session.get("editUser");

            if ($('#tags').val() != "") {
                data = {};
                data["profile.subscribedTags"] = $("#tags").val();
                Meteor.call("updateList", userId, data);
                $('#tags').val("");
            }
            if ($('#orgs').val() != "") {
                Meteor.call("updateList", "profile.subscribedOrgs", $("#orgs").val());
                $('#orgs').val("");
            }
            if ($('#keywords').val() != "") {
                Meteor.call("updateList", "profile.subscribedWords", $("#keywords").val());
                $('#keywords').val("");
            }
        }
    });
}

if (Meteor.isServer) {
    Meteor.methods({
        'updateList': function(user, data) {
            console.log(Meteor.users.findOne({_id:user}));
            Meteor.users.update({_id: user}, {
                $addToSet: {data}
            });
        },
        'getUser': function(userId) {
            return Meteor.users.findOne({_id: userId});
        }
    });
}
