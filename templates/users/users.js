if (Meteor.isClient) {
    Template.users.helpers({
        'userList': function() {
            return Meteor.users.find({});
        }
    });
    Template.users.events({
        'click #deleteUser': function(e) {
            e.preventDefault();
            console.log(this);
            Meteor.users.remove({_id: this._id});
        }
    });
}
