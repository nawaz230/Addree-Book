//Backbone Model

var Item = Backbone.Model.extend({
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

var Items = Backbone.Collection.extend({
    model: Item
});



var items = new Items();


////backbone view for one Item
var ItemViews = Backbone.View.extend({
    model: new Item(),
    
    initialize: function(){
        this.template = _.template($(".items-list-template").html());
        
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
});





///backbone view for all items
var ItemsViews = Backbone.View.extend({
    model: items,
    el: $(".items-list"),
    initialize: function(){
        this.model.on("add", this.render, this);
    },
    render: function(){
        var self = this;
        this.$el.html("");
        _.each(this.model.toArray(), function(item){
        self.$el.append((new ItemViews({model: item})).render().$el);
        });
        return this;
    },
});

    $(document).ready(function(){
       $(".form-row").on("submit", function(event){
           event.preventDefault();
         if(items.length ==10){
            $(".p").append("Cant insert more then 10 Data");
            }else{


       
        var item = new Item({
            name: $(".name-input").val(),
            address: $(".address-input").val(),
            phonenumber: $(".phonenumber-input").val(),}, {validate: true});
            items.add(item);
    }

       });
        var items =new Items([
            new Item ({ name: "Smith ", address:"Route de Blanche ", phonenumber: "0765403554", }),
            new Item ({name: "Jack ", address:"Chemin des Blanchard ", phonenumber: "0762364745"}),
            ]);
        
        var itemsView = new ItemsViews({model: items});

        $("items-list").append(itemsView.render().$el)

      
});