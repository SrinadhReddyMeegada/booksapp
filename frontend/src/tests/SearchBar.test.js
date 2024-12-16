import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  let query;
  let onQueryChange;
  let onSearch;

  beforeEach(() => {
    query = "";
    onQueryChange = jest.fn((event) => {
      query = event.target.value;
    });
    onSearch = jest.fn();
  });

  test("renders SearchBar with input and button", () => {
    render(
      <SearchBar
        query={query}
        onQueryChange={onQueryChange}
        onSearch={onSearch}
      />
    );
    const inputElement = screen.getByLabelText(/search books or authors/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("calls onQueryChange when typing in input", () => {
    render(
      <SearchBar
        query={query}
        onQueryChange={onQueryChange}
        onSearch={onSearch}
      />
    );

    const inputElement = screen.getByLabelText(/search books or authors/i);
    fireEvent.change(inputElement, { target: { value: "Harry Potter" } });
    expect(onQueryChange).toHaveBeenCalledTimes(1);
    expect(query).toBe("Harry Potter");
  });
});
