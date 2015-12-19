if (Meteor.isClient) {
    //initially set fparam to empty
    //Session.setDefault('fparam', '');
//    console.log(Geolocation.latLng().Lat);
//    Session.set('geo', Geolocation.latLng());
    Template.main.helpers({
        //find user geo-location
        geoloc: function() {
            var gloc = Geolocation.latLng();
            Session.set('geo', gloc);
            Session.set('date', new Date());
            return gloc;
        }
    });
    Template.eventListing.helpers({
      eventlist: function(){
          var getEvent = {date: Session.get('date'), geo: Session.get('geo'), search: Session.get('search'), org: Session.get('orgID'), tag: Session.get('tag')};
          //suscribe to EventDB data from eventsList by passing the getEvent object
          Meteor.subscribe('eventsList', getEvent);
          //client-side sorting can take place here
          var cursor = EventDB.find({});
          return cursor;
      }
    });

    Template.search.helpers({
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
}
