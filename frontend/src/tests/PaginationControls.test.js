import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaginationControls from "../components/PaginationControls";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme();

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("PaginationControls Component", () => {
  const onPageChange = jest.fn();
  const onLimitChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders items per page select and pagination buttons", () => {
    renderWithTheme(
      <PaginationControls
        totalItems={50}
        page={1}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );

    expect(screen.getByText(/Items per page:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
  });

  test("calls onPageChange when a page is clicked", () => {
    renderWithTheme(
      <PaginationControls
        totalItems={50}
        page={1}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "2" }));
    expect(onPageChange).toHaveBeenCalledWith(2); // Ensure the correct page number is passed
  });

  test("calls onLimitChange when limit is changed", () => {
    renderWithTheme(
      <PaginationControls
        totalItems={50}
        page={1}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );

    fireEvent.mouseDown(screen.getAllByRole("button", { name: "10" }));
    fireEvent.click(screen.getAllByRole("option", { name: "20" }));

    expect(onLimitChange).toHaveBeenCalledWith(20); // Ensure the correct limit is passed
  });

  test("calculates total pages correctly", () => {
    renderWithTheme(
      <PaginationControls
        totalItems={55}
        page={1}
        limit={10}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    );

    expect(screen.getByText("6")).toBeInTheDocument(); // Check if total pages are displayed correctly
  });
});
