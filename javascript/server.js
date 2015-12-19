EventDB = new Mongo.Collection('eventslist');
OrgDB = new Mongo.Collection('orgslist');

if(Meteor.isServer){
    //these are the index fields that the search runs off of
    EventDB._ensureIndex({
        'name': 'text',
        'descr': 'text'
    });

    //generate list of events from db and send to client
    //getEvents is an object with search, tag, org, date, and geo attriubtes
    Meteor.publish('eventsList', function(getEvents){
    if (getEvents.org){
        return EventDB.find({poster:getEvents.org});
    }
    //if object contains search attribute, search by this string
    else if (getEvents.search){
        return EventDB.find({ $text: {$search: getEvents.search},datetime : {$gte: getEvents.date}},
                            {
            //determines which documents are best match for search
            fields: {
                score: { $meta: "textScore" }
            },
            sort: {
                score: { $meta: "textScore" }
            }});
    }
    //if object(i.e. an array), convert to string and find matching tags
    else if (getEvents.tag){
        return EventDB.find({tags: String(getEvents.tag),datetime : {$gte: getEvents.date}});
    }
    else{
        return EventDB.find({datetime : {$gte: getEvents.date}});
    }
  });
    Meteor.publish('orgsList', function(){
        return OrgDB.find();
    });
    Meteor.methods({
        'attendEvent': function(eventId){
            EventDB.update({'_id':eventId},{$inc:{'num':1}});
        },
        'addEvent': function(data){
            EventDB.insert(data);
        },
        'addOrg': function(data){
            OrgDB.insert(data);
        }
    });
}
