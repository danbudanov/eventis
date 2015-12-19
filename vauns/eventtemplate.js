if(Meteor.isClient){
    /*    Template.tagsTemplate.helpers({
        tags: function(){
            return this.tags;
        },*/
    Meteor.subscribe('orgsList');
    Template.eventTemplate.helpers({
        dateF: function(){
            var date = this.datetime;//new Date(this.date)
            //var day=date.getDay();
            var month=date.getMonth();
            var out = String(month+1)+'/'
            out+=date.getDate().toString();//+' ';
            console.log(out);
            return out;
        },
        time: function(){
            var date = this.datetime;//new Date(this.date)
            var out=date.getHours().toString()+':'+date.getMinutes().toString();
            return out;
        },
        address: function(){
            return this.address;
        },
        selected: function() {
            if (this._id == Session.get("selected")) {
                return "selected";
            }
        }
    });
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
    Template.eventTemplate.events({
        'click #name': function(e) {
            Session.set("selected",this._id);
            console.log(this._id);
        },
        'click #attending': function(e){
            e.preventDefault();
            console.log(this._id._str);
            Meteor.call('attendEvent', this._id);
            //$('.'+this._id._str).toggle();
        },
        'click .tag': function(e){
            e.preventDefault();
            Session.set('orgID',undefined);//added to prevent organization page dominating
            Session.set('search', undefined);
            Session.set('tag', String(this));
            // Session.set('orgID',null);//added to prevent organization page dominating
            // Router.go('tags',{tag:String(this)});
        },
        'click .theposter': function(e){
            e.preventDefault();
            console.log(this.posterID);
            var page = this.posterID;
            Session.set('org', page)
/*            console.log(orgName);
            var orgDoc = OrgDB.findOne({poster:orgName});
            var page = orgDoc._id;*/
            //Router.go('orgPage', {page: page});
        }
    });
    Template.eventListing.events({
        'click #remove': function() {
            EventDB.remove({_id: Session.get("selected")});
            console.log(Session.get("selected"));
        },
        'click': function() {
            console.log(Meteor.userId());
            console.log(Meteor.user().username);
        }
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
};

/*if(Meteor.isServer){
    if(!EventDB.findOne()){
        EventDB.insert({name: 'Come Meet Ron Burgandy!',descr:'Come meet Ron Burgandy, Who has a rockin Burgandy suit. His suit will hurt your eyes, but at least it is Armani',tags:['Ron Burgandy', 'Kick-Ass','fun','nice suit'], date: Date(1995, 11, 17, 3, 24, 0),address: '4132 PeachTree St, Atlanta Ga, 23504'}, num:43)
    }
};*/
