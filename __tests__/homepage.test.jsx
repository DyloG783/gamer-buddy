import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeroContent from "@/app/components/HeroContent";

describe("Home page", () => {
  it("renders hero content with 'Bringing Gamers Together' h1", () => {
    render(<HeroContent />);

    const heading = screen.getByRole("heading", {
      name: /Bringing Gamers Together/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
