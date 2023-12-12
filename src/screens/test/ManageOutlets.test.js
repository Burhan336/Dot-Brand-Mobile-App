import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ManageOutlets from "../ManageOutlets"; // Replace this with the correct path

describe("<ManageOutlets />", () => {
  it("renders loading state initially", () => {
    const { getByTestId } = render(<ManageOutlets />);
    const loader = getByTestId("loader"); // Assuming you add a testID for the loader component

    expect(loader).toBeTruthy();
  });

  it("displays no data message when outletData is empty", async () => {
    const { getByText } = render(<ManageOutlets />);
    // Simulate empty outletData state here
    // For example: jest.spyOn(React, 'useState').mockReturnValueOnce([[], jest.fn()]);

    await waitFor(() => {
      expect(getByText("There is no data to show here!")).toBeTruthy();
    });
  });

  it("handles search input change and filters data accordingly", async () => {
    const { getByPlaceholderText, getByText } = render(<ManageOutlets />);
    const searchInput = getByPlaceholderText("Search Outlet");

    fireEvent.changeText(searchInput, "Sample search text");
    await waitFor(() => {
      expect(getByText("Sample Outlet")).toBeTruthy(); // Replace 'Sample Outlet' with an expected outlet name from your data
    });
  });

  it("toggles dark mode correctly", () => {
    const { getByTestId } = render(<ManageOutlets />);
    const darkModeToggle = getByTestId("dark-mode-toggle"); // Assuming you add a testID for the dark mode toggle

    fireEvent.press(darkModeToggle);
    // Add assertions related to toggling dark mode and verifying style changes
  });

  it("applies filter options correctly", async () => {
    const { getByText } = render(<ManageOutlets />);
    const filterButton = getByText("Filter");

    fireEvent.press(filterButton);
    const sortOption = getByText("Sort by Created At");

    fireEvent.press(sortOption);
    // Add assertions related to sorting by created at and verifying the updated data sequence
  });

  it("handles logout correctly", async () => {
    const { getByText } = render(<ManageOutlets />);
    const logoutButton = getByText("Logout");

    fireEvent.press(logoutButton);
    // Add assertions related to logout functionality, maybe checking if the user is navigated to the login screen or state is updated correctly
  });

  // Add more test cases for various functionalities like card press, filter options, etc.
});
