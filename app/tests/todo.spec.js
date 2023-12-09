const chai = require("chai");
const { expect } = chai;

const { getTodos, addTodo } = require("../services/todos.service");

describe("getTodos function", () => {
  it("should return an empty list of todos", () => {
    const req = {};
    const res = {
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        console.log(data);
        // Assert that the response status code is 200
        expect(res.statusCode).to.equal(200);

        // Assert that the returned data is an empty array
        expect(data).to.eql([]);

        // If you want to check the actual content of the response, you can do more specific checks here
      },
    };

    // Call the function with the mocked request and response
    getTodos(req, res);
  });
});


describe("addTodo function", () => {
  it("should add a todo to the list", () => {
    const req = {
      body: {
        todo: "New Todo",
      },
    };
    const res = {
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        // Assert that the response status code is 200
        expect(res.statusCode).to.equal(200);

        // Assert that the returned data is the added todo
        expect(data).to.equal("New Todo");

        // If you want to check the actual content of the response, you can do more specific checks here
      },
    };

    // Call the function with the mocked request and response
    addTodo(req, res);
  });
});
