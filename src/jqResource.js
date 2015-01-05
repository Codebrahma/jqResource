/* jqResource main */

// Base function.
var jqResource = (function() {

  var jqResourceHelpers = {
    urlBuilder: function(object, routeMap, resourceRoute){

      var paramReplace = function(url, v, k){
        return url.replace(new RegExp(":"+k), (object[v] || ""));
      }

      return _.reduce(routeMap, paramReplace, resourceRoute);
    },
    toPrams: function(object){
      return _.reduce(object, function(p,v,k){
        return p + k+"="+v+"&";
      }, "");
    },
    data: function(object){
      return  _.reduce(Object.keys(object), function(o,k){
        if(typeof(object[k]) != "function"){ o[k] = object[k]; };
        return o;
      }, {});
    }
  };

  function jqResource(route, routeMap){

    function Resource(params){
      $.extend(this, (params || {}));
    };

    var R = Resource,
        proto = Resource.prototype,
        helpers = jqResourceHelpers;

    // Private Methods
    var endPoint = function(){
      return helpers.urlBuilder(this, routeMap, route);
    };

    var data = function(){
      return helpers.data(this);
    };

    // Class Methods
    R.getInstance = function(params){
      return new R(params);
    };

    R.index = function(params){
      var instance = this.getInstance(params);

      instance.$state = $.ajax({
        type: "GET",
        url: endPoint.call(params),
        data: params
      });

      return instance;
    };

    R.create = function(params){
      var instance = this.getInstance(params);

      instance.$state = $.ajax({
        type: "POST",
        url: endPoint.call(params),
        data: params
      });

      return instance;
    };

    // Instance Methods
    proto.show = function(){
      this.$state = $.ajax({
        type: "GET",
        url: endPoint.call(this)
      });

      return this;
    };

    proto.update = function(){
      this.$state = $.ajax({
        type: "PUT",
        url: endPoint.call(this),
        data: data.call(this)
      });

      return this;
    };

    proto.destroy = function(){
      this.$state = $.ajax({
        type: "DELETE",
        url: endPoint.call(this)
      });

      return this;
    };

    return Resource;
  };

  // To Test Helper Methods
  jqResource.$services = jqResourceHelpers;

  return jqResource;

}());

// Version.
jqResource.VERSION = '0.0.1';

// Export to the root, which is probably `window`.
window.jqResource = jqResource;

// Export to jQuery root.
$.Resource = jqResource;
