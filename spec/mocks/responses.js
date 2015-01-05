var TestResponses = {
  index: {
    success: {
      status: 200,
      responseText: '[{"id": 1, "name": "India"},{"id": 2, "name": "USA"}]'
    },
    fatal: {
      status: 500,
      responseText: ''
    }
  },
  create: {
    success: {
      status: 200,
      responseText: '{"id": 1, "name": "India"}'
    },
    fatal: {
      status: 500,
      responseText: ''
    }
  },
  show: {
    success: {
      status: 200,
      responseText: '{"id": 1, "name": "India"}'
    },
    fatal: {
      status: 500,
      responseText: ''
    }
  },
  update: {
    success: {
      status: 200,
      responseText: '{"id": 1, "name": "India"}'
    },
    fatal: {
      status: 500,
      responseText: ''
    }
  },
  destroy: {
    success: {
      status: 200,
      responseText: 'true'
    },
    fatal: {
      status: 500,
      responseText: ''
    }
  }
};
