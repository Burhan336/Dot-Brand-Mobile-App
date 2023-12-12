import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import Home from "../tabs/Home"; // Adjust the import path according to your file structure

// Mock the modules that are not relevant for testing this component

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock("../../authentication/AuthStorage", () => ({
  isLoggedIn: jest.fn(),
  clearLoggedIn: jest.fn(),
}));

describe("Home component", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("displays welcome text correctly", () => {
    const { getByText } = render(<Home />);
    const welcomeText = getByText("Hello, Super Admin!");
    expect(welcomeText).toBeTruthy();
  });

  it("toggles dark mode when night mode icon is clicked", () => {
    const { getByTestId } = render(<Home />);
    act(() => {
      const nightModeIcon = getByTestId("night-mode-icon");
      fireEvent.press(nightModeIcon);
    });
  });
});
