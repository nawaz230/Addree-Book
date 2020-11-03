//Backbone Model

var Blog = Backbone.Model.extend({
    validate: function(attrs){
        var phoneRegex = /^([0][0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[4][1](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/g;
        if(!attrs.phonenumber.match(phoneRegex)){
            $(".p").append("Please use Switzerland Phone number");
            throw "use valide swiss phone number";
        }
       
    },
    
defaults: {
    
    name: "",
    address:"",
    phonenumber: "",
   
},

});

var Blogs = Backbone.Collection.extend({
    model: Blog
});



var blogs = new Blogs();


////backbone view for one Item
var BlogViews = Backbone.View.extend({
    model: new Blog(),
    
    initialize: function(){
        this.template = _.template($(".blogs-list-template").html());
        
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
});





///backbone view for all items
var BlogsViews = Backbone.View.extend({
    model: blogs,
    el: $(".blogs-list"),
    initialize: function(){
        this.model.on("add", this.render, this);
    },
    render: function(){
        var self = this;
        this.$el.html("");
        _.each(this.model.toArray(), function(blog){
        self.$el.append((new BlogViews({model: blog})).render().$el);
        });
        return this;
    },
});

    $(document).ready(function(){
       $(".form-row").on("submit", function(event){
           event.preventDefault();
         if(blogs.length ==10){
            $(".p").append("Cant insert more then 10 Data");
            }else{


       
        var blog = new Blog({
            name: $(".name-input").val(),
            address: $(".address-input").val(),
            phonenumber: $(".phonenumber-input").val(),}, {validate: true});
            blogs.add(blog);
    }

       });
        var blogs =new Blogs([
            new Blog ({ name: "Smith ", address:"Route de Blanche ", phonenumber: "0041 76 54 23 54", }),
            new Blog ({name: "Jack ", address:"Chemin des Blanchard ", phonenumber: "0041 76 23 64 45"}),
            ]);
        
        var blogsView = new BlogsViews({model: blogs});

        $("blogs-list").append(blogsView.render().$el)

      
});