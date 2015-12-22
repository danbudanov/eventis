if(Meteor.isClient){
    Meteor.subscribe('eventsList');

    Template.eventListing.events({
        'click #remove': function() {
            EventDB.remove({_id: Session.get("selected")});
        },
        'click': function() {
            // console.log(Meteor.userId());
            // console.log(Meteor.user().username);
        },
        'click #editProfileLink': function(e) {
            e.preventDefault();
            Router.go('editUser', {user: Meteor.userId()})
        }
    });

    Template.eventListing.helpers({
        'isUser': function() {
            return Meteor.userId() != null;
        },
        'username': function() {
            return Meteor.user().username;
        },
        eventlist: function() {
            var getEvent = {date: Session.get('date'), geo: Session.get('geo'), search: Session.get('search'), org: Session.get('orgID'), tag: Session.get('tag')};
            //suscribe to EventDB data from eventsList by passing the getEvent object
            Meteor.subscribe('eventsList', getEvent);
            //client-side sorting can take place here
            var cursor = EventDB.find({});
            return cursor;
        }
    });
};

if(Meteor.isServer) {
    Meteor.methods({
        'removeEvent': function() {
            EventDB.remove({_id: Session.get("selected")});
        }
    });
}
