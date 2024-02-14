import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HeroContent from "@/app/components/HeroContent";
// import ConnectionUpdates from "@/app/components/ConnectionUpdates";

describe("Home page", () => {
  it("renders hero content with 'Bringing Gamers Together' h1", () => {
    render(<HeroContent />);

    const heading = screen.getByRole("heading", {
      name: /Bringing Gamers Together/i,
    });

    expect(heading).toBeInTheDocument();
  });

  // !cannot use Jest for async server components
  // it("renders link with 'Sign in to see Messages, Connection requests, and more!' for not signed in state", () => {
  //   render(<ConnectionUpdates />);

  //   // const heading = screen.getByRole("heading", { level: 1, });
  //   const link = screen.getByRole("link", {
  //     name: /Sign in to see Messages, Connection requests, and more!/i,
  //   });

  //   expect(link).toBeInTheDocument();
  // });
});
