const request = require("supertest");
const express = require("express");
const sinon = require("sinon");
const axios = require("axios");
const booksRouter = require("../routes/books");

const app = express();
app.use("/books", booksRouter);

let should;

before(async () => {
  const chai = await import("chai");
  should = chai.should();
});

describe("GET /books", () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it("should return 400 if query parameter is missing", async () => {
    const res = await request(app).get("/books");
    res.status.should.equal(400);
    res.body.should.have.property("error", "Query parameter is required");
  });

  it("should return books data with valid query", async () => {
    const mockResponse = {
      data: {
        items: [
          {
            id: "1",
            volumeInfo: {
              title: "Book 1",
              authors: ["Author 1"],
              description: "Description 1",
              publishedDate: "2001-01-01",
            },
          },
          {
            id: "2",
            volumeInfo: {
              title: "Book 2",
              authors: ["Author 1", "Author 2"],
              description: "Description 2",
              publishedDate: "2002-02-02",
            },
          },
        ],
        totalItems: 2,
      },
    };

    axiosGetStub.resolves(mockResponse);

    const res = await request(app).get("/books").query({ query: "test" });

    res.status.should.equal(200);
    res.body.should.have.property("books").with.lengthOf(2);
    res.body.should.have.property("totalItems", 2);
    res.body.should.have.property("mostCommonAuthor", "Author 1");
    res.body.should.have.property("earliestDate", "2001-01-01");
    res.body.should.have.property("latestDate", "2002-02-02");
    res.body.should.have.property("responseTime");
  });

  it("should handle errors from Google Books API", async () => {
    axiosGetStub.rejects(new Error("Google Books API error"));

    const res = await request(app).get("/books").query({ query: "test" });

    res.status.should.equal(500);
    res.body.should.have.property("error", "Error fetching data from Google Books API");
  });
});
