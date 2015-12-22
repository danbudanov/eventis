if(Meteor.isClient){
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

    Template.eventTemplate.events({
        'click #name': function(e) {
            Session.set("selected",this._id);
        },
        'click #attending': function(e){
            e.preventDefault();
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
            Session.set('orgID', page)
/*            console.log(orgName);
            var orgDoc = OrgDB.findOne({poster:orgName});
            var page = orgDoc._id;*/
            //Router.go('orgPage', {page: page});
        }
    });
};
