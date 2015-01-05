# jqResource

Restful wrapper around $.ajax which helps you create a data access layer for your javascript applications to encapsulate your domain/business logic and handle sever interactions.

## About

A JavaScript library by Nithin Krishna.

See the [project homepage](http://codebrahma.com/jqResource).

## Installation

Using Bower:

```bash
bower install jq-resource
```

Or grab the [source](https://github.com/codebrahma/jqResource/sc/jqResource.js).

## Usage

Basic usage is as follows:

```javascript

var Question = new $.Resource("/api/test/:test_id/questions/:id",{
  id: "id", test_id: "test_id"
});

var Test = new $.Resource("/api/test/:id",{
  id: "id"
});

var questions = Question.query();
questions.$state.done(handleSuccess).fatal(handleFailure);

var initialTest = new Test({ code: 25 });
initialTest.show();
initialTest.$state.done(handleSuccess).fatal(handleFailure);
```

## Contributing

We'll check out your contribution if you:

* Provide a comprehensive suite of tests for your fork.
* Have a clear and documented rationale for your changes.
* Package these up in a pull request.

We'll do our best to help you out with any contribution issues you may have.

## License

MIT. See `LICENSE.txt` in this directory.
