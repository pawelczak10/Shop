export { };

describe("empty spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(`[data-testid="email-newsletter-input"]`).type('test@test2.com')
    cy.get(`[data-testid="email-newsletter-submit"]`).click()
    cy.contains("wszytsko okej")
  });
});
