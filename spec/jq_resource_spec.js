describe("jqResource", function(){

  var $r = jqResource,
      Resource = new $r("/sub_resource/:sub_id/resources/:id", { id: "id", sub_id: "sub_id" }),
      instance,
      request;

  function mockRequest(response, request){
    return function(){
      instance = request();
      request = jasmine.Ajax.requests.mostRecent();
      request.respondWith(response);
    };
  };

  function verifySuccessResponse(){
    var callback = { success:false, fatal: false };
    instance.$state.done(function(response){
      callback.success = true;
    });

    expect(callback.success).toBe(true);
    expect(callback.fatal).toBe(false);
  };

  function verifyFatalResponse(){
    var callback = { success:false, fatal: false };
    instance.$state.fail(function(response){
      callback.fatal = true;
    });

    expect(callback.success).toBe(false);
    expect(callback.fatal).toBe(true);
  };

  it("should be of version 0.0.1", function(){
    expect($r.VERSION).toBe("0.0.1");
  });

  it("should be attached to the window object", function(){
    expect(window.jqResource).toBeDefined();
  });

  it("should be attached to the $", function(){
    expect($.Resource).toBeDefined();
  });


  describe("resource instance", function(){
    beforeEach(function(){
      jasmine.Ajax.install();
    });

    describe("index", function(){
      describe("$.ajax", function(){
        beforeEach(function(){
          spyOn($, 'ajax');
        });

        it("should call $ajax with the given params", function(){
          Resource.index({ sub_id: 20, query: "This is a test" });

          expect($.ajax).toHaveBeenCalledWith({
            type : 'GET',
            url : '/sub_resource/20/resources/',
            data : { sub_id : 20, query: "This is a test" }
          });
        });
      });

      describe("success callback", function(){
        beforeEach(mockRequest(TestResponses.index.success, function(){
          return Resource.index({ query: "test" });
        }));

        it("should execute the success callback", verifySuccessResponse);
      });

      describe("fatal callback", function(){
        beforeEach(mockRequest(TestResponses.index.fatal, function(){
          return Resource.index({ query: "test" });
        }));

        it("should execute the success callback", verifyFatalResponse);
      });
    });

    describe("create", function(){
      describe("$.ajax", function(){
        beforeEach(function(){
          spyOn($, 'ajax');
        });

        it("should call $ajax with the given params", function(){
          Resource.create({ sub_id: 20, data: "This is a test" });

          expect($.ajax).toHaveBeenCalledWith({
            type : 'POST',
            url : '/sub_resource/20/resources/',
            data : { sub_id : 20, data: "This is a test" }
          });
        });
      });

      describe("success callback", function(){
        beforeEach(mockRequest(TestResponses.create.success, function(){
          return Resource.create({ data: "Some data" });
        }));

        it("should execute the success callback", verifySuccessResponse);
      });

      describe("fatal callback", function(){
        beforeEach(mockRequest(TestResponses.create.fatal, function(){
          return Resource.create({ data: "Some data" });
        }));

        it("should execute the success callback", verifyFatalResponse);
      });
    });

    describe("show", function(){
      describe("$.ajax", function(){
        beforeEach(function(){
          spyOn($, 'ajax');
        });

        it("should call $ajax with the given params", function(){
          new Resource({ id: 1, sub_id: 20, data: "This is a test" }).show();

          expect($.ajax).toHaveBeenCalledWith({
            type : 'GET',
            url : '/sub_resource/20/resources/1'
          });
        });
      });

      describe("success callback", function(){
        beforeEach(mockRequest(TestResponses.show.success, function(){
          return new Resource({ sub_id: "1", id: "20" }).show();
        }));

        it("should execute the success callback", verifySuccessResponse);
      });

      describe("fatal callback", function(){
        beforeEach(mockRequest(TestResponses.show.fatal, function(){
          return new Resource({ sub_id: "1", id: "20" }).show();
        }));

        it("should execute the success callback", verifyFatalResponse);
      });
    });

    describe("update", function(){
      describe("$.ajax", function(){
        beforeEach(function(){
          spyOn($, 'ajax');
        });

        it("should call $ajax with the given params", function(){
          new Resource({ id: 1, sub_id: 20, data: "This is a test" }).update();

          expect($.ajax).toHaveBeenCalledWith({
            type : 'PUT',
            url : '/sub_resource/20/resources/1',
            data : { id : 1, sub_id : 20, data : 'This is a test' }
          });
        });
      });

      describe("success callback", function(){
        beforeEach(mockRequest(TestResponses.update.success, function(){
          return new Resource({ sub_id: "1", id: "20" }).update();
        }));

        it("should execute the success callback", verifySuccessResponse);
      });

      describe("fatal callback", function(){
        beforeEach(mockRequest(TestResponses.update.fatal, function(){
          return new Resource({ sub_id: "1", id: "20" }).update();
        }));

        it("should execute the success callback", verifyFatalResponse);
      });
    });

    describe("destroy", function(){
      describe("$.ajax", function(){
        beforeEach(function(){
          spyOn($, 'ajax');
        });

        it("should call $ajax with the given params", function(){
          new Resource({ id: 1, sub_id: 20, data: "This is a test" }).destroy();

          expect($.ajax).toHaveBeenCalledWith({
            type : 'DELETE',
            url : '/sub_resource/20/resources/1'
          });
        });
      });

      describe("success callback", function(){
        beforeEach(mockRequest(TestResponses.destroy.success, function(){
          return new Resource({ sub_id: "1", id: "20" }).destroy();
        }));

        it("should execute the success callback", verifySuccessResponse);
      });

      describe("fatal callback", function(){
        beforeEach(mockRequest(TestResponses.destroy.fatal, function(){
          return new Resource({ sub_id: "1", id: "20" }).destroy();
        }));

        it("should execute the success callback", verifyFatalResponse);
      });
    });


  });
});
