describe("jqResourceHelpers", function(){

  var $r = jqResource;

  describe("urlBuilder", function(){
    it("should map the resourceRoute to the URL", function(){
      expect($r.$services.urlBuilder({ id: 1, post_id: 1 }, {
        id: "id",
        post_id: "post_id"
      }, "/posts/:post_id/item/:id")).toBe("/posts/1/item/1")
    });
  });

  describe("toPrams", function(){
    it("should reduce the given object to url params", function(){
      expect($r.$services.toPrams({ id: 1, post_id: 1 })).toBe("id=1&post_id=1&")
    });
  });

  describe("data", function(){
    it("should reduce the given object to an object with only data attributes", function(){
      expect($r.$services.data({ property: 1, action: function(){ } })).toEqual({ property : 1 })
    });
  });

});
