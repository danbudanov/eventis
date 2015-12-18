EventDB = new Mongo.Collection('eventslist');
OrgDB = new Mongo.Collection('orgslist');

if(Meteor.isServer){
    //these are the index fields that the search runs off of
    EventDB._ensureIndex({
        'name': 'text',
        'descr': 'text'
    });

    //generate list of events from db and send to client
    Meteor.publish('eventsList', function(fparam, geo, date, org){
        if (org){
            return EventDB.find({poster:org});
        }
        //if argument string empty, return all documents in DB
        else if (!fparam){
            console.log('retrieving all entries')
            console.log(fparam);
            return EventDB.find({datetime : {$gte: date}});
        }
        //if input is a string, search for it and return all search results
        else if (typeof(fparam)==='string'){
            return EventDB.find({ $text: {$search: fparam},datetime : {$gte: date}},
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
        else if (typeof(fparam)==='object'){
            return EventDB.find({tags: String(fparam),datetime : {$gte: date}});
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
