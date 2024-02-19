import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavigationBar from "@/app/components/NavigationBar";

// cant test third party components!?!?!?!?!
describe.skip("Navigation component", () => {
  it("renders navigation with 'home page - GamerBuddy' link", () => {
    render(<NavigationBar />);

    const link = screen.getByRole("link", {
      name: /GamerBuddy/i,
    });

    // const link = screen.getByText("test");

    screen.debug();

    expect(link).toBeInTheDocument();
  });
});
