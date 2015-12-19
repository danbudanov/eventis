Router.configure({
    layoutTemplate: 'main'
});

Router.route('/',{
    name: 'home',
    template: 'home'
});
Router.route('/browse/:tag',{
    template: 'tagView',
    name: 'tags',
    data: function(){
        //        currentTag: function(){
        var currentTag = this.params.tag;//this.params.tag;
        Session.set('fparam',[currentTag]);
        return currentTag;
        //        }
    }
});

Router.route('/pages/:page',{
    name: 'orgPage',
    template: 'orgPage',
    data: function(){
        var page = this.params.page;
        Session.set('orgID',page);
        return OrgDB.findOne({_id:page});
        //return OrgDB.findOne(_id: Session.get('orgID'));
    }
});