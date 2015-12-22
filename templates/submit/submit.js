if (Meteor.isClient) {
    Template.submit.events({
        'submit #createEvent': function (event) {
            event.preventDefault();
            var poster = Meteor.user().username;
            if(OrgDB.findOne({poster:poster})){
                Session.set('crOrgID', OrgDB.findOne({poster:poster})._id)
            }
            else {
                var dat = {
                    poster: poster,
                    descr: 'Event description goes here',
                    img: '#'
                }
                Meteor.call('addOrg', dat, function(){
                    Session.set('crOrgID', OrgDB.findOne({poster:poster})._id)
                });
                //                var posterID = (OrgDB.findOne({poster:poster}))._id;
            }
            //            var posterID = OrgDB.findOne({poster:poster})._id;
            var dateTime = new Date($('#crDate').val() + "T" + $('#crTime').val() + ":00");
            var data = {
                poster : poster,
                posterID: Meteor.userId(),
                name : $('#crTitle').val(),
                address : $('#crTitle').val(),
                datetime : dateTime,
                description : $('#crInfo').val(),
                tags : $('#crTags').val().split(" "),
                locat: Geolocation.latLng()
            }
            console.log(data.locat)
            Meteor.call('addEvent',data);
        }
    });
}
