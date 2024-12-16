// App.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

// Mocking axios
jest.mock("axios");

describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders App component with title", () => {
    render(<App />);
    const titleElement = screen.getByText(/google books search/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("fetches books on search and updates statistics", async () => {
    const mockBooks = [
      {
        id: "1",
        title: "Book One",
        authors: ["Author A"],
        publishedDate: "2020-01-01",
      },
      {
        id: "2",
        title: "Book Two",
        authors: ["Author B"],
        publishedDate: "2021-01-01",
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: {
        books: mockBooks,
        totalItems: 2,
        mostCommonAuthor: "Author A",
        earliestDate: "2020-01-01",
        latestDate: "2021-01-01",
        responseTime: 150,
      },
    });

    render(<App />);

    const searchInput = screen.getByLabelText(/search books or authors/i);
    fireEvent.change(searchInput, { target: { value: "Harry Potter" } });

    // Wait for the API call to complete and update the UI
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/api/books"),
        expect.any(Object)
      );
      expect(screen.getByText(/total items: 2/i)).toBeInTheDocument();
      expect(
        screen.getByText(/most common author: author a/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/earliest publication date: 2020-01-01/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/latest publication date: 2021-01-01/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/response time: 150/i)).toBeInTheDocument();
    });
  });

  test("handles pagination change", async () => {
    const mockBooks = [
      {
        id: "1",
        title: "Book One",
        authors: ["Author A"],
        publishedDate: "2020-01-01",
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: {
        books: mockBooks,
        totalItems: 1,
        mostCommonAuthor: "Author A",
        earliestDate: "2020-01-01",
        latestDate: "2021-01-01",
        responseTime: 100,
      },
    });

    render(<App />);

    const searchInput = screen.getByLabelText(/search books or authors/i);
    fireEvent.change(searchInput, { target: { value: "Harry Potter" } });

    await waitFor(() => {
      expect(screen.getByText(/total items: 1/i)).toBeInTheDocument();
    });

    // Simulate changing the page
    const pageButton = screen.getByRole("button", { name: /next/i }); // Assuming you have a button for next page
    fireEvent.click(pageButton);

    // Check if fetchBooks is called again with updated page number
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2); // First call for initial search, second for pagination
    });
  });

  test("handles limit change", async () => {
    const mockBooks = [
      {
        id: "1",
        title: "Book One",
        authors: ["Author A"],
        publishedDate: "2020-01-01",
      },
      {
        id: "2",
        title: "Book Two",
        authors: ["Author B"],
        publishedDate: "2021-01-01",
      },
    ];

    axios.get.mockResolvedValueOnce({
      data: {
        books: mockBooks,
        totalItems: 2,
        mostCommonAuthor: "Author A",
        earliestDate: "2020-01-01",
        latestDate: "2021-01-01",
        responseTime: 100,
      },
    });

    render(<App />);

    const searchInput = screen.getByLabelText(/search books or authors/i);
    fireEvent.change(searchInput, { target: { value: "Harry Potter" } });

    await waitFor(() => {
      expect(screen.getByText(/total items: 2/i)).toBeInTheDocument();
    });

    // Change limit
    const limitSelect = screen.getByLabelText(/items per page/i); // Assuming you have a label for limit select
    fireEvent.change(limitSelect, { target: { value: 10 } }); // Change limit to 10

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2); // Check that fetchBooks was called again due to limit change
    });
  });
});
