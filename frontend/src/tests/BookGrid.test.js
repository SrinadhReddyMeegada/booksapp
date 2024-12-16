import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookGrid from "../components/BookGrid";

const mockBooks = [
  {
    id: 1,
    title: "Test Book 1",
    authors: ["Author 1", "Author 2"],
    description:
      "This is a detailed description of Test Book 1 which is quite long and should be truncated.",
    publishedDate: "2023-01-01",
  },
  {
    id: 2,
    title: "Test Book 2",
    authors: [],
    description: "",
    publishedDate: "2022-01-01",
  },
];

describe("BookGrid Component", () => {
  test("renders without crashing", () => {
    render(<BookGrid books={mockBooks} />);

    // Check if titles are rendered correctly
    expect(screen.getByText(/Test Book 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Book 2/i)).toBeInTheDocument();
  });

  test("displays authors correctly", () => {
    render(<BookGrid books={mockBooks} />);

    // Check for unique author display
    expect(
      screen.getByText(/Author 1, Author 2 - Test Book 1/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No authors available - Test Book 2/i)
    ).toBeInTheDocument();
  });

  test("shows truncated description by default", () => {
    render(<BookGrid books={mockBooks} />);

    // Check for truncated description
    expect(
      screen.queryByText(
        /This is a detailed description of Test Book 1 which is quite long and should be truncated./i
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        /This is a detailed description of Test Book 1 which is quite long and should be truncated.../i
      )
    ).toBeInTheDocument();
  });

  test("toggles description on button click", () => {
    render(<BookGrid books={mockBooks} />);

    // Click to view more
    const viewMoreButton = screen.getAllByRole("button", {
      name: /View More/i,
    })[0]; // Select the first button
    fireEvent.click(viewMoreButton);

    // Check if full description is shown
    expect(
      screen.getByText(
        /This is a detailed description of Test Book 1 which is quite long and should be truncated./i
      )
    ).toBeInTheDocument();

    // Click to view less
    const viewLessButton = screen.getAllByRole("button", {
      name: /View Less/i,
    })[0]; // Select the first button
    fireEvent.click(viewLessButton);

    // Check if truncated description is shown again
    expect(
      screen.getByText(
        /This is a detailed description of Test Book 1 which is quite long and should be truncated.../i
      )
    ).toBeInTheDocument();
  });
});
