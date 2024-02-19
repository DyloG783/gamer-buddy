import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/components/ConnectionUpdates";
// import HeroContent from "@/app/components/HeroContent";

// cannot render async server components even with work arounds...
describe.skip("Connection Updates component (home page)", () => {
  it("renders", async () => {
    const sc = await Page();

    const component = render(sc);

    //   render(<ConnectionUpdates />);

    const x = component.getByText(
      "Sign in to see Messages, Connection requests, and more!"
    );

    expect(x).toBeInTheDocument();
  });
});
